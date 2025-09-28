#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Windsurf IDE Converter
 * 
 * Converts Jester framework files to Windsurf-specific formats:
 * - Creates .windsurf/ directory with proper structure
 * - Creates .windsurfrules file for AI coding guidelines
 * - Creates mcp_config.json for MCP server configuration
 * - Creates workspace settings and configurations
 * - Sets up Cascade rules and memories
 */

/**
 * Convert Jester framework files for Windsurf IDE
 * @param {string} sourceDir - Source directory containing .jester files
 * @param {string} targetDir - Target directory (usually .jester)
 * @returns {Promise<boolean>} - Success status
 */
async function convertForWindsurf(sourceDir, targetDir) {
  try {
    console.log(chalk.blue('🎯 Converting files for Windsurf IDE...'));
    
    // Create .windsurf directory structure at project root level
    const projectRoot = path.dirname(targetDir);
    const windsurfDir = path.join(projectRoot, '.windsurf');
    await createWindsurfDirectoryStructure(windsurfDir);
    
    // Create Windsurf configuration files
    await createWindsurfRules(projectRoot);
    await createMCPConfig(windsurfDir);
    await createWindsurfSettings(windsurfDir);
    await createCascadeRules(windsurfDir);
    await createWindsurfWorkspace(projectRoot);
    
    console.log(chalk.green('✅ Windsurf conversion completed successfully!'));
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ Windsurf conversion failed:'), error.message);
    return false;
  }
}

/**
 * Create Windsurf directory structure
 */
async function createWindsurfDirectoryStructure(windsurfDir) {
  console.log(chalk.gray('📁 Creating .windsurf directory structure...'));
  
  // Create main .windsurf directory
  fs.mkdirSync(windsurfDir, { recursive: true });
  
  // Create subdirectories
  const subdirs = ['cascade', 'memories', 'mcp', 'settings'];
  for (const subdir of subdirs) {
    const subdirPath = path.join(windsurfDir, subdir);
    fs.mkdirSync(subdirPath, { recursive: true });
    console.log(chalk.green(`  ✅ Created .windsurf/${subdir}/`));
  }
}

/**
 * Create .windsurfrules file
 */
async function createWindsurfRules(targetDir) {
  console.log(chalk.gray('📝 Creating .windsurfrules file...'));
  
  const rulesPath = path.join(targetDir, '.windsurfrules');
  const rulesContent = `# Jester Framework Rules for Windsurf

## Project Overview
This is a Jester storytelling framework project. Jester is an AI-powered bedtime story creation system that helps create consistent, personalized stories through a hierarchical command structure.

## Agent System
The project uses a multi-agent system with the following agents:

### Core Agents
- **@jester** - Main story generation and management agent
  - Commands: generate, manage, organize, structure
  - Use for: Overall story planning and coordination
  
- **@muse** - Creative inspiration and brainstorming agent
  - Commands: inspire, brainstorm, ideate, create
  - Use for: Creative concepts, character development, plot ideas
  
- **@write** - Content creation and editing agent
  - Commands: write, create, compose, draft
  - Use for: Writing story content, dialogue, descriptions
  
- **@edit** - Story refinement and revision agent
  - Commands: edit, revise, refine, polish
  - Use for: Improving existing content, fixing issues
  
- **@validate** - Quality assurance and testing agent
  - Commands: validate, test, check, verify
  - Use for: Ensuring story quality and consistency
  
- **@publish** - Final publication and distribution agent
  - Commands: publish, deploy, release, distribute
  - Use for: Finalizing and sharing completed stories

## File Structure
- \`.jester/\` contains all framework files
- \`stories/\` contains story content and narratives
- \`assets/\` contains images, audio, and other story assets
- \`output/\` contains published and distribution-ready content

## Coding Guidelines
- Use clear, descriptive variable and function names
- Follow the existing code patterns in the framework
- Add comments for complex logic
- Maintain consistent formatting
- Always create age-appropriate content for children

## Story Creation Guidelines
- Start with @jester for overall structure
- Use @muse for creative brainstorming
- Write content with @write
- Refine with @edit
- Validate with @validate
- Publish with @publish

## Best Practices
- Always use the appropriate agent for the task at hand
- Follow the established story structure defined in templates
- Maintain consistency across all content and characters
- Use validation tools before publishing any content
- Respect the hierarchical command structure of the framework

## Context Awareness
- Always consider the target audience (children)
- Maintain age-appropriate content
- Ensure stories are educational and entertaining
- Follow the established character and world consistency rules
- Use the Jester templates and prompts for guidance

## File Access Patterns
- Read framework files from .jester/ directory
- Create and edit stories in stories/ directory
- Manage assets in assets/ directory
- Output final content to output/ directory
- Use appropriate file extensions (.md for stories, .json for config)

## Quality Standards
- Ensure all content is age-appropriate for children
- Maintain consistent character development
- Follow established narrative structures
- Include educational elements in stories
- Test content for engagement and clarity
`;

  fs.writeFileSync(rulesPath, rulesContent, 'utf8');
  console.log(chalk.green('  ✅ Created .windsurfrules'));
}

/**
 * Create MCP configuration
 */
async function createMCPConfig(windsurfDir) {
  console.log(chalk.gray('🔌 Creating MCP configuration...'));
  
  const mcpDir = path.join(windsurfDir, 'mcp');
  const mcpConfigPath = path.join(mcpDir, 'mcp_config.json');
  
  const mcpConfig = {
    "mcpServers": {
      "jester-framework": {
        "command": "node",
        "args": ["./.jester/.windsurf/mcp/jester-mcp-server.js"],
        "env": {
          "JESTER_FRAMEWORK_PATH": "./.jester"
        }
      },
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "./.jester"],
        "env": {}
      }
    }
  };
  
  fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created MCP configuration'));
  
  // Create MCP server placeholder
  const mcpServerPath = path.join(mcpDir, 'jester-mcp-server.js');
  const mcpServerContent = `#!/usr/bin/env node

/**
 * Jester Framework MCP Server for Windsurf
 * 
 * This is a placeholder for a future MCP server that will provide
 * Jester framework-specific tools and capabilities to Windsurf IDE.
 */

console.log('Jester Framework MCP Server for Windsurf - Coming Soon!');
console.log('This will provide Jester-specific tools and capabilities.');
`;

  fs.writeFileSync(mcpServerPath, mcpServerContent, 'utf8');
  console.log(chalk.green('  ✅ Created MCP server placeholder'));
}

/**
 * Create Windsurf settings
 */
async function createWindsurfSettings(windsurfDir) {
  console.log(chalk.gray('⚙️  Creating Windsurf settings...'));
  
  const settingsDir = path.join(windsurfDir, 'settings');
  const settingsPath = path.join(settingsDir, 'windsurf-settings.json');
  
  const settingsContent = {
    "jester": {
      "framework": {
        "enabled": true,
        "version": "1.0.0",
        "agents": {
          "jester": { "enabled": true, "priority": "high" },
          "muse": { "enabled": true, "priority": "medium" },
          "write": { "enabled": true, "priority": "high" },
          "edit": { "enabled": true, "priority": "high" },
          "validate": { "enabled": true, "priority": "medium" },
          "publish": { "enabled": true, "priority": "low" }
        }
      },
      "paths": {
        "framework": "./.jester/",
        "stories": "./stories/",
        "assets": "./assets/",
        "output": "./output/"
      },
      "features": {
        "autoValidation": true,
        "contextAwareness": true,
        "agentIntegration": true
      }
    },
    "editor": {
      "fileAssociations": {
        "*.jester": "markdown",
        "*.story": "markdown"
      },
      "exclude": {
        "**/.jester/output/**": true,
        "**/.jester/temp/**": true,
        "**/node_modules/**": true
      }
    },
    "ai": {
      "contextAwareness": true,
      "agentSuggestions": true,
      "frameworkIntegration": true
    }
  };
  
  fs.writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created Windsurf settings'));
}

/**
 * Create Cascade rules
 */
async function createCascadeRules(windsurfDir) {
  console.log(chalk.gray('🌊 Creating Cascade rules...'));
  
  const cascadeDir = path.join(windsurfDir, 'cascade');
  
  // Create main Cascade rules
  const cascadeRulesPath = path.join(cascadeDir, 'jester-rules.md');
  const cascadeRulesContent = `# Jester Framework Cascade Rules

## Agent Activation Rules

<agent_activation>
- Use @jester for story generation and management tasks
- Use @muse for creative inspiration and brainstorming
- Use @write for content creation and editing
- Use @edit for story refinement and revision
- Use @validate for quality assurance and testing
- Use @publish for final publication and distribution
</agent_activation>

## Story Creation Workflow

<story_workflow>
1. Start with @jester for overall story structure and planning
2. Use @muse for creative brainstorming and character development
3. Write content with @write for narrative and dialogue
4. Refine and improve with @edit for quality and flow
5. Validate with @validate for consistency and age-appropriateness
6. Publish with @publish for final distribution
</story_workflow>

## Content Guidelines

<content_guidelines>
- Always create age-appropriate content for children
- Maintain consistent character development across stories
- Use clear, engaging language appropriate for the target audience
- Include educational elements in entertaining ways
- Follow established story structures and templates
- Ensure stories are both fun and educational
</content_guidelines>

## File Management

<file_management>
- Store stories in the stories/ directory
- Keep assets in the assets/ directory
- Output final content to the output/ directory
- Use .md extension for story files
- Use .json for configuration files
- Follow the established directory structure
</file_management>

## Quality Standards

<quality_standards>
- Test all content for age-appropriateness
- Ensure stories are engaging and educational
- Maintain consistency with established characters and worlds
- Validate content against framework guidelines
- Check for grammatical and structural issues
- Ensure proper narrative flow and pacing
</quality_standards>
`;

  fs.writeFileSync(cascadeRulesPath, cascadeRulesContent, 'utf8');
  console.log(chalk.green('  ✅ Created Cascade rules'));

  // Create memories
  const memoriesDir = path.join(windsurfDir, 'memories');
  const memoriesPath = path.join(memoriesDir, 'jester-memories.md');
  const memoriesContent = `# Jester Framework Memories

## Project Context
This is a Jester storytelling framework project designed to create consistent, personalized bedtime stories for children using AI agents.

## Key Concepts
- **Multi-agent system**: Six specialized agents work together
- **Hierarchical structure**: Clear command and coordination system
- **Age-appropriate content**: All content designed for children
- **Educational focus**: Stories combine entertainment with learning
- **Consistency**: Maintained character and world development

## Agent Specializations
- **@jester**: Story structure and management
- **@muse**: Creative inspiration and brainstorming
- **@write**: Content creation and narrative writing
- **@edit**: Refinement and quality improvement
- **@validate**: Quality assurance and testing
- **@publish**: Final publication and distribution

## File Structure
- `.jester/` - Framework files and configurations
- `stories/` - Story content and narratives
- `assets/` - Images, audio, and other story assets
- `output/` - Published and distribution-ready content

## Best Practices
- Always use appropriate agents for specific tasks
- Maintain consistency across all content
- Follow established story structures
- Validate content before publishing
- Coordinate between agents for comprehensive development
`;

  fs.writeFileSync(memoriesPath, memoriesContent, 'utf8');
  console.log(chalk.green('  ✅ Created Jester memories'));
}

/**
 * Create Windsurf workspace configuration
 */
async function createWindsurfWorkspace(targetDir) {
  console.log(chalk.gray('🏢 Creating Windsurf workspace...'));
  
  const workspacePath = path.join(targetDir, 'jester.code-workspace');
  const workspaceContent = {
    "folders": [
      {
        "name": "Jester Framework",
        "path": "."
      },
      {
        "name": "Framework Files",
        "path": "./.jester"
      },
      {
        "name": "Stories",
        "path": "./stories"
      },
      {
        "name": "Assets",
        "path": "./assets"
      },
      {
        "name": "Output",
        "path": "./output"
      }
    ],
    "settings": {
      "files.exclude": {
        "**/.jester/output/**": true,
        "**/.jester/temp/**": true,
        "**/node_modules/**": true
      },
      "search.exclude": {
        "**/.jester/output/**": true,
        "**/.jester/temp/**": true,
        "**/node_modules/**": true
      },
      "files.associations": {
        "*.jester": "markdown",
        "*.story": "markdown"
      }
    },
    "extensions": {
      "recommendations": [
        "yzhang.markdown-all-in-one",
        "davidanson.vscode-markdownlint",
        "bierner.markdown-mermaid"
      ]
    }
  };
  
  fs.writeFileSync(workspacePath, JSON.stringify(workspaceContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created Windsurf workspace'));
}

// Export the main conversion function
module.exports = {
  convertForWindsurf
};

// If run directly, execute the conversion
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node windsurf.js <sourceDir> <targetDir>');
    process.exit(1);
  }
  
  convertForWindsurf(args[0], args[1])
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}
