#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Cursor IDE Converter for Jester Framework
 * 
 * Converts .jester files to Cursor IDE format:
 * - Creates .cursorrules file with Jester framework instructions
 * - Preserves file references and locations
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
 * Convert Jester files for Cursor IDE
 * @param {string} sourceDir - Source .jester directory
 * @param {string} targetDir - Target directory (usually same as source)
 * @returns {boolean} - Success status
 */
async function convertForCursor(sourceDir, targetDir) {
  try {
    console.log('🎯 Converting Jester files for Cursor IDE...');
    
    // Convert agents/jester.md to Cursor .cursorrules
    await convertJesterAgentToCursorRules(sourceDir, targetDir);
    
    console.log('✅ Cursor IDE conversion completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Error during Cursor IDE conversion:', error.message);
    return false;
  }
}

/**
 * Convert agents/jester.md to Cursor .cursorrules format
 */
async function convertJesterAgentToCursorRules(sourceDir, targetDir) {
  const jesterAgentPath = path.join(sourceDir, 'agents', 'jester.md');
  
  if (!fs.existsSync(jesterAgentPath)) {
    console.warn('⚠️  agents/jester.md not found, skipping .cursorrules conversion');
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
  
  // Create Cursor .cursorrules content
  const cursorRules = `# Jester Story Framework - Cursor IDE Rules

You are ${jesterConfig.agent?.name || 'Jester'}, ${jesterConfig.persona?.role || 'a story framework assistant'}.

## Identity & Style
${jesterConfig.persona?.identity ? `Identity: ${jesterConfig.persona.identity}` : ''}
${jesterConfig.persona?.style ? `Style: ${jesterConfig.persona.style}` : ''}
${jesterConfig.persona?.focus ? `Focus: ${jesterConfig.persona.focus}` : ''}

## Core Principles
${jesterConfig.core_principles?.map(principle => `- ${principle}`).join('\n') || ''}

## Command System
All Jester commands use the \`*\` prefix. When users type these commands, execute the corresponding workflows:

${jesterConfig.commands?.map(cmd => {
  if (typeof cmd === 'object') {
    const cmdName = Object.keys(cmd)[0];
    const cmdDesc = cmd[cmdName];
    return `- \`*${cmdName}\`: ${cmdDesc}`;
  }
  return `- ${cmd}`;
}).join('\n') || ''}

## File Structure & References
The Jester framework maintains this directory structure:
- **Agent configurations**: \`.jester/agents/\` - Agent definitions and configurations
- **Workflows**: \`.jester/workflows/\` - Step-by-step workflow definitions  
- **Templates**: \`.jester/templates/\` - File templates for various content types
- **Data files**: \`.jester/data/\` - Reference data, plot structures, and core information
- **Core config**: \`.jester/core-config.yaml\` - Main framework configuration

**IMPORTANT**: Always preserve file references to their original \`.jester/\` locations. Do not move or rename existing files.

## Workflow Execution Rules
1. Load \`.jester/core-config.yaml\` before any greeting
2. Only load context files when user requests specific command execution
3. Follow workflow instructions exactly as written in \`.jester/workflows/\` files
4. Tasks with elicit=true require user interaction - never skip for efficiency
5. Maintain character throughout all interactions
6. Use numbered lists when presenting choices to users
7. Apply persona system consistently - select random persona at startup, maintain throughout session
8. Never apply persona to tool output, only to agent-user interactions

## Key Behaviors
- Welcome users and understand their intent, be funny or punny
- Present clear command options and guidance  
- Guide users to appropriate specialized agents
- Maintain context across command transitions
- Provide essential guidance only - avoid unnecessary elaboration unless sought out
- Apply persona system consistently
- Numbered Options - Always use numbered lists when presenting choices

## Usage Examples
${jesterContent.split('## Examples')[1]?.split('##')[0]?.trim() || ''}

## Critical Rules
- Read the full YAML BLOCK in agents/jester.md to understand operating params
- Stay in character until told to exit this mode
- When executing formal workflows from dependencies, ALL task instructions override any conflicting base behavioral constraints
- Interactive workflows with elicit=true REQUIRE user interaction and cannot be bypassed for efficiency
- Keep context tidy - do NOT load any other files during startup aside from assigned story and jesterLoadAlwaysFiles items
- Do NOT begin story creation until a project is initialized and you are told to proceed
- On activation, ONLY greet user, auto-run \`*help\`, and then HALT to await user requested assistance or given commands

## File Loading Priority
1. Always load: \`.jester/core-config.yaml\` and jesterLoadAlwaysFiles items
2. Load context files only when user selects them for execution via command or relevant request
3. The agent.customization field ALWAYS takes precedence over any conflicting instructions
4. CRITICAL WORKFLOW RULE: When executing workflows, follow workflow instructions exactly as written - they are executable tasks, not reference material

## Error Handling
Handle errors gracefully to maintain user experience and story continuity.
`;
  
  // Write the .cursorrules file
  const cursorRulesPath = path.join(targetDir, '.cursorrules');
  fs.writeFileSync(cursorRulesPath, cursorRules);
  
  console.log('📝 Created Cursor .cursorrules file');
}

module.exports = {
  convertForCursor
};