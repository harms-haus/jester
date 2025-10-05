#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Claude Code Converter for Jester Framework
 * 
 * Converts .jester files to Claude Code sub-agent format
 * - Converts agents/jester.md to a Claude Code sub-agent
 * - Preserves file references and locations
 * - Creates .claude/agents directory structure
 */

/**
 * Parse YAML block from markdown content
 */
function parseYamlBlock(content) {
  const yamlMatch = content.match(/```yaml\n([\s\S]*?)\n```/);
  if (!yamlMatch) {
    throw new Error('Could not find YAML block in content');
  }
  
  const yamlText = yamlMatch[1];
  const config = {};
  
  // Simple YAML parser for our specific structure
  const lines = yamlText.split('\n');
  let currentKey = null;
  let currentValue = [];
  let inList = false;
  let indentLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Check for key-value pairs
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      if (value) {
        // Simple key-value
        config[key] = value;
        currentKey = null;
        currentValue = [];
        inList = false;
      } else {
        // Start of a complex value
        currentKey = key;
        currentValue = [];
        inList = false;
        indentLevel = line.length - line.trimStart().length;
      }
    } else if (currentKey) {
      // Part of a complex value
      const currentIndent = line.length - line.trimStart().length;
      
      if (trimmed.startsWith('-')) {
        // List item
        if (!inList) {
          inList = true;
          currentValue = [];
        }
        currentValue.push(trimmed.substring(1).trim());
      } else if (currentIndent > indentLevel) {
        // Indented content (preserve as string)
        if (!config[currentKey]) {
          config[currentKey] = '';
        }
        config[currentKey] += (config[currentKey] ? '\n' : '') + trimmed;
      } else {
        // End of complex value
        if (inList && currentValue.length > 0) {
          config[currentKey] = currentValue;
        }
        currentKey = null;
        currentValue = [];
        inList = false;
      }
    }
  }
  
  // Handle final value
  if (currentKey && inList && currentValue.length > 0) {
    config[currentKey] = currentValue;
  }
  
  return config;
}

/**
 * Convert Jester files for Claude Code
 * @param {string} sourceDir - Source .jester directory
 * @param {string} targetDir - Target directory (usually same as source)
 * @returns {boolean} - Success status
 */
async function convertForClaude(sourceDir, targetDir) {
  try {
    console.log('🤖 Converting Jester files for Claude Code...');
    
    // Create .claude directory structure in target directory
    const claudeDir = path.join(targetDir, '.claude');
    const agentsDir = path.join(claudeDir, 'agents');
    
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }
    if (!fs.existsSync(agentsDir)) {
      fs.mkdirSync(agentsDir, { recursive: true });
    }
    
    // Convert agents/jester.md to Claude Code sub-agent
    await convertJesterAgent(sourceDir, agentsDir);
    
    // Create CLAUDE.md configuration file
    await createClaudeConfig(sourceDir, claudeDir);
    
    console.log('✅ Claude Code conversion completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Error during Claude Code conversion:', error.message);
    return false;
  }
}

/**
 * Convert agents/jester.md to Claude Code sub-agent format
 */
async function convertJesterAgent(sourceDir, agentsDir) {
  const jesterAgentPath = path.join(sourceDir, 'agents', 'jester.md');
  
  if (!fs.existsSync(jesterAgentPath)) {
    console.warn('⚠️  agents/jester.md not found, skipping agent conversion');
    return;
  }
  
  const jesterContent = fs.readFileSync(jesterAgentPath, 'utf8');
  
  // Extract YAML configuration from jester.md
  let jesterConfig;
  try {
    jesterConfig = parseYamlBlock(jesterContent);
  } catch (error) {
    throw new Error(`Failed to parse YAML configuration: ${error.message}`);
  }
  
  // Create Claude Code sub-agent format
  const claudeAgent = {
    name: jesterConfig.agent?.name || 'Jester',
    description: jesterConfig.agent?.whenToUse || 'Main entry point for Jester story framework workflows',
    tools: 'Read, Write, Edit, Bash, Grep, Glob'
  };
  
  // Build the agent content
  let agentContent = `---
name: ${claudeAgent.name.toLowerCase().replace(/\s+/g, '-')}
description: ${claudeAgent.description}
tools: ${claudeAgent.tools}
---

You are ${claudeAgent.name}, ${jesterConfig.persona?.role || 'a story framework assistant'}.

${jesterConfig.persona?.identity ? `Identity: ${jesterConfig.persona.identity}` : ''}
${jesterConfig.persona?.style ? `Style: ${jesterConfig.persona.style}` : ''}
${jesterConfig.persona?.focus ? `Focus: ${jesterConfig.persona.focus}` : ''}

## Core Principles
${jesterConfig.core_principles?.map(principle => `- ${principle}`).join('\n') || ''}

## Available Commands
${jesterConfig.commands?.map(cmd => {
  if (typeof cmd === 'object') {
    const cmdName = Object.keys(cmd)[0];
    const cmdDesc = cmd[cmdName];
    return `- \`*${cmdName}\`: ${cmdDesc}`;
  }
  return `- ${cmd}`;
}).join('\n') || ''}

## File References
All file references remain in their original .jester/ locations:
- Agent configurations: \`.jester/agents/\`
- Workflows: \`.jester/workflows/\`
- Templates: \`.jester/templates/\`
- Data files: \`.jester/data/\`
- Core config: \`.jester/core-config.yaml\`

## Usage Examples
${jesterContent.split('## Examples')[1]?.split('##')[0]?.trim() || ''}

## Activation Instructions
${jesterConfig.activation_instructions?.map((instruction, index) => 
  `${index + 1}. ${instruction}`
).join('\n') || ''}

## Critical Rules
- Load \`.jester/core-config.yaml\` before any greeting
- Only load context files when user requests specific command execution
- Follow workflow instructions exactly as written
- Tasks with elicit=true require user interaction
- Maintain character throughout all interactions
- Use numbered lists when presenting choices to users
`;
  
  // Write the Claude Code agent file
  const agentFilePath = path.join(agentsDir, 'jester.md');
  fs.writeFileSync(agentFilePath, agentContent);
  
  console.log('📝 Created Claude Code agent: .claude/agents/jester.md');
}

/**
 * Create CLAUDE.md configuration file
 */
async function createClaudeConfig(sourceDir, claudeDir) {
  const claudeConfig = `# Claude Code Configuration for Jester Framework

## Active Agents

### Jester Agent
This project uses the Jester story framework agent that specializes in:
- Story creation and management workflows
- Character, location, and item development
- Plot structure generation using various templates
- Age-appropriate content validation
- Interactive storytelling sessions

The Jester agent is automatically activated for story-related tasks and maintains the full Jester framework functionality while working within Claude Code's environment.

## Project Structure

The Jester framework files are maintained in their original \`.jester/\` directory structure:
- **Agents**: \`.jester/agents/\` - Agent definitions and configurations
- **Workflows**: \`.jester/workflows/\` - Step-by-step workflow definitions
- **Templates**: \`.jester/templates/\` - File templates for various content types
- **Data**: \`.jester/data/\` - Reference data, plot structures, and core information
- **Core Config**: \`.jester/core-config.yaml\` - Main framework configuration

## Usage

Start using the Jester agent by:
1. \`/agents\` - Open the agent selection interface
2. \`Use the jester sub agent\` - Explicitly invoke the Jester agent
3. \`*help\` - Show available Jester commands once the agent is active

## Key Features

- **Command System**: All Jester commands use the \`*\` prefix (e.g., \`*write\`, \`*edit\`, \`*muse\`)
- **Interactive Workflows**: Step-by-step guided processes for complex tasks
- **File Management**: Automatic file creation and management in the appropriate directories
- **Context Preservation**: Maintains story context across sessions
- **Age Appropriateness**: Built-in validation for target audience suitability

## Integration Notes

- All file references remain pointing to the original \`.jester/\` locations
- The agent maintains full compatibility with existing Jester projects
- Workflow execution follows the exact same patterns as the original framework
- No migration of existing story files is required
`;
  
  const claudeConfigPath = path.join(claudeDir, 'CLAUDE.md');
  fs.writeFileSync(claudeConfigPath, claudeConfig);
  
  console.log('📄 Created Claude Code configuration: .claude/CLAUDE.md');
}

module.exports = {
  convertForClaude
};