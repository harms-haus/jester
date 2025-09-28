#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Claude IDE Converter
 * 
 * Converts Jester framework files to Claude IDE-specific formats:
 * - Creates .claude/ directory with proper structure
 * - Creates settings.json with permissions and configuration
 * - Creates agents/ directory with subagent definitions
 * - Creates CLAUDE.md files for project context
 * - Sets up MCP server configurations
 */

/**
 * Convert Jester framework files for Claude IDE
 * @param {string} sourceDir - Source directory containing .jester files
 * @param {string} targetDir - Target directory (usually .jester)
 * @returns {Promise<boolean>} - Success status
 */
async function convertForClaude(sourceDir, targetDir) {
  try {
    console.log(chalk.blue('🎯 Converting files for Claude IDE...'));
    
    // Create .claude directory structure at project root level
    const projectRoot = path.dirname(targetDir);
    const claudeDir = path.join(projectRoot, '.claude');
    await createClaudeDirectoryStructure(claudeDir);
    
    // Create Claude configuration files
    await createClaudeSettings(claudeDir);
    await createClaudeAgents(claudeDir, sourceDir);
    await createClaudeMarkdown(claudeDir, sourceDir);
    await createMCPConfig(claudeDir);
    
    console.log(chalk.green('✅ Claude conversion completed successfully!'));
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ Claude conversion failed:'), error.message);
    return false;
  }
}

/**
 * Create Claude directory structure
 */
async function createClaudeDirectoryStructure(claudeDir) {
  console.log(chalk.gray('📁 Creating .claude directory structure...'));
  
  // Create main .claude directory
  fs.mkdirSync(claudeDir, { recursive: true });
  
  // Create subdirectories
  const subdirs = ['agents', 'memories', 'mcp'];
  for (const subdir of subdirs) {
    const subdirPath = path.join(claudeDir, subdir);
    fs.mkdirSync(subdirPath, { recursive: true });
    console.log(chalk.green(`  ✅ Created .claude/${subdir}/`));
  }
}

/**
 * Create Claude settings.json
 */
async function createClaudeSettings(claudeDir) {
  console.log(chalk.gray('⚙️  Creating settings.json...'));
  
  const settingsPath = path.join(claudeDir, 'settings.json');
  const settingsContent = {
    "permissions": {
      "allow": [
        "Bash(npx jester-cli *)",
        "Bash(npm run *)",
        "Bash(git status)",
        "Bash(git diff *)",
        "Bash(git add *)",
        "Bash(git commit *)",
        "Read(./.jester/**)",
        "Read(./stories/**)",
        "Read(./assets/**)",
        "Read(./output/**)",
        "Edit(./stories/**)",
        "Edit(./assets/**)",
        "Edit(./output/**)"
      ],
      "deny": [
        "Bash(rm -rf *)",
        "Bash(sudo *)",
        "Read(./.env)",
        "Read(./.env.*)",
        "Read(./secrets/**)",
        "Read(./node_modules/**)",
        "Read(./.git/**)"
      ]
    },
    "env": {
      "JESTER_FRAMEWORK": "true",
      "JESTER_AGENTS_ENABLED": "jester,muse,write,edit,validate,publish"
    },
    "model": "claude-3-5-sonnet-20241022",
    "defaultMode": "acceptEdits"
  };
  
  fs.writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created settings.json'));
}

/**
 * Create Claude agents (subagents)
 */
async function createClaudeAgents(claudeDir, sourceDir) {
  console.log(chalk.gray('🤖 Creating Claude agents...'));
  
  const agentsDir = path.join(claudeDir, 'agents');
  
  // Create Jester agent
  const jesterAgent = `---
name: jester
description: Main story generation and management agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: purple
---

You are @jester, the main story generation and management agent for the Jester storytelling framework.

## Your Role
- Generate and manage story structures
- Coordinate with other agents (@muse, @write, @edit, @validate, @publish)
- Maintain story consistency and narrative flow
- Organize story elements and character development

## Commands
- \`generate\` - Create new story ideas and structures
- \`manage\` - Organize existing stories and content
- \`organize\` - Structure story elements and plot points
- \`coordinate\` - Work with other agents on story development

## Guidelines
- Always maintain age-appropriate content for children
- Ensure stories follow the established Jester framework structure
- Coordinate with other agents for comprehensive story development
- Focus on narrative consistency and character development
- Use the Jester templates and prompts for guidance

## File Access
- Read and edit files in ./stories/
- Read framework files in ./.jester/
- Create and manage story outlines and structures
`;

  fs.writeFileSync(path.join(agentsDir, 'jester.md'), jesterAgent, 'utf8');
  console.log(chalk.green('  ✅ Created jester agent'));

  // Create Muse agent
  const museAgent = `---
name: muse
description: Creative inspiration and brainstorming agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: orange
---

You are @muse, the creative inspiration and brainstorming agent for the Jester storytelling framework.

## Your Role
- Provide creative inspiration and ideas
- Brainstorm character concepts and plot developments
- Generate creative solutions to story challenges
- Inspire innovative storytelling approaches

## Commands
- \`inspire\` - Generate creative ideas and concepts
- \`brainstorm\` - Explore multiple creative possibilities
- \`ideate\` - Create innovative story elements
- \`create\` - Develop new creative content

## Guidelines
- Focus on creativity and innovation
- Generate age-appropriate ideas for children
- Work collaboratively with @jester for story structure
- Provide multiple creative options and alternatives
- Use imagination and creative thinking

## File Access
- Read and edit files in ./stories/
- Read framework files in ./.jester/
- Create creative content and character concepts
`;

  fs.writeFileSync(path.join(agentsDir, 'muse.md'), museAgent, 'utf8');
  console.log(chalk.green('  ✅ Created muse agent'));

  // Create Write agent
  const writeAgent = `---
name: write
description: Content creation and editing agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: blue
---

You are @write, the content creation and editing agent for the Jester storytelling framework.

## Your Role
- Write and create story content
- Develop dialogue and narrative text
- Create engaging descriptions and scenes
- Produce high-quality written content

## Commands
- \`write\` - Create new written content
- \`create\` - Develop story content and dialogue
- \`compose\` - Write narrative text and descriptions
- \`draft\` - Create initial versions of content

## Guidelines
- Write clear, engaging content for children
- Use appropriate vocabulary and sentence structure
- Maintain consistent tone and style
- Focus on storytelling and narrative flow
- Ensure content is age-appropriate and educational

## File Access
- Read and edit files in ./stories/
- Read framework files in ./.jester/
- Create and modify story content and dialogue
`;

  fs.writeFileSync(path.join(agentsDir, 'write.md'), writeAgent, 'utf8');
  console.log(chalk.green('  ✅ Created write agent'));

  // Create Edit agent
  const editAgent = `---
name: edit
description: Story refinement and revision agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: green
---

You are @edit, the story refinement and revision agent for the Jester storytelling framework.

## Your Role
- Refine and improve existing content
- Revise stories for better flow and clarity
- Polish writing and fix issues
- Enhance story quality and consistency

## Commands
- \`edit\` - Refine and improve content
- \`revise\` - Make structural and content changes
- \`refine\` - Polish and enhance existing text
- \`polish\` - Finalize and perfect content

## Guidelines
- Improve clarity and readability
- Fix grammatical and structural issues
- Enhance story flow and pacing
- Maintain consistency with established style
- Ensure content meets quality standards

## File Access
- Read and edit files in ./stories/
- Read framework files in ./.jester/
- Modify and improve existing content
`;

  fs.writeFileSync(path.join(agentsDir, 'edit.md'), editAgent, 'utf8');
  console.log(chalk.green('  ✅ Created edit agent'));

  // Create Validate agent
  const validateAgent = `---
name: validate
description: Quality assurance and testing agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: yellow
---

You are @validate, the quality assurance and testing agent for the Jester storytelling framework.

## Your Role
- Validate story quality and consistency
- Test content for age-appropriateness
- Check for errors and issues
- Ensure framework compliance

## Commands
- \`validate\` - Check content quality and compliance
- \`test\` - Test stories for issues and problems
- \`check\` - Verify content meets standards
- \`verify\` - Confirm quality and consistency

## Guidelines
- Ensure age-appropriate content for children
- Check for consistency with framework rules
- Validate story structure and flow
- Test for educational value and engagement
- Verify compliance with Jester standards

## File Access
- Read files in ./stories/
- Read framework files in ./.jester/
- Validate and test content quality
`;

  fs.writeFileSync(path.join(agentsDir, 'validate.md'), validateAgent, 'utf8');
  console.log(chalk.green('  ✅ Created validate agent'));

  // Create Publish agent
  const publishAgent = `---
name: publish
description: Final publication and distribution agent for the Jester framework
tools: Read, Edit, Bash, Grep, Glob
color: red
---

You are @publish, the final publication and distribution agent for the Jester storytelling framework.

## Your Role
- Prepare stories for final publication
- Format content for distribution
- Create publication-ready materials
- Handle final publishing tasks

## Commands
- \`publish\` - Prepare content for publication
- \`deploy\` - Deploy stories to distribution channels
- \`release\` - Release completed stories
- \`distribute\` - Distribute published content

## Guidelines
- Ensure content is publication-ready
- Format stories for target audience
- Create appropriate distribution materials
- Handle final quality checks
- Manage publication workflow

## File Access
- Read files in ./stories/
- Read framework files in ./.jester/
- Create files in ./output/
- Prepare publication materials
`;

  fs.writeFileSync(path.join(agentsDir, 'publish.md'), publishAgent, 'utf8');
  console.log(chalk.green('  ✅ Created publish agent'));
}

/**
 * Create CLAUDE.md files for project context
 */
async function createClaudeMarkdown(claudeDir, sourceDir) {
  console.log(chalk.gray('📝 Creating CLAUDE.md files...'));
  
  // Create main CLAUDE.md
  const mainClaudeMd = `# Jester Storytelling Framework

This is a Jester storytelling framework project. Jester is an AI-powered bedtime story creation system that helps create consistent, personalized stories through a hierarchical command structure.

## Project Structure

- \`.jester/\` - Framework files and configurations
- \`stories/\` - Story content and narratives
- \`assets/\` - Images, audio, and other story assets
- \`output/\` - Published and distribution-ready content

## Agent System

The project uses a multi-agent system with specialized roles:

- **@jester** - Main story generation and management
- **@muse** - Creative inspiration and brainstorming
- **@write** - Content creation and editing
- **@edit** - Story refinement and revision
- **@validate** - Quality assurance and testing
- **@publish** - Final publication and distribution

## Usage

Use the appropriate agent for your task:
- Start with @jester for overall story planning
- Use @muse for creative brainstorming
- Write content with @write
- Refine with @edit
- Validate with @validate
- Publish with @publish

## Framework Files

See @.jester/agents/ for detailed agent definitions and capabilities.

## Best Practices

- Always use age-appropriate content for children
- Maintain consistency across all stories
- Follow the established framework structure
- Use the validation tools before publishing
- Coordinate between agents for comprehensive development
`;

  fs.writeFileSync(path.join(claudeDir, 'CLAUDE.md'), mainClaudeMd, 'utf8');
  console.log(chalk.green('  ✅ Created CLAUDE.md'));

  // Create memories directory with coding guidelines
  const memoriesDir = path.join(claudeDir, 'memories');
  const codingGuidelines = `# Coding Guidelines for Jester Framework

## Project Language
- Primary language: JavaScript/Node.js for CLI tools
- Markdown for story content and documentation
- JSON for configuration files

## Code Style
- Use clear, descriptive variable and function names
- Follow existing code patterns in the framework
- Add comments for complex logic
- Maintain consistent formatting

## Story Content Guidelines
- Always create age-appropriate content for children
- Use clear, engaging language
- Maintain consistent character development
- Follow established story structures
- Ensure educational value and entertainment

## File Organization
- Keep framework files in .jester/ directory
- Store stories in stories/ directory
- Place assets in assets/ directory
- Output final content to output/ directory

## Agent Coordination
- Use appropriate agents for specific tasks
- Coordinate between agents for comprehensive development
- Follow the hierarchical command structure
- Maintain consistency across all agent interactions
`;

  fs.writeFileSync(path.join(memoriesDir, 'coding-guidelines.md'), codingGuidelines, 'utf8');
  console.log(chalk.green('  ✅ Created coding guidelines'));
}

/**
 * Create MCP configuration
 */
async function createMCPConfig(claudeDir) {
  console.log(chalk.gray('🔌 Creating MCP configuration...'));
  
  const mcpDir = path.join(claudeDir, 'mcp');
  const mcpConfigPath = path.join(mcpDir, 'mcp.json');
  
  const mcpConfig = {
    "mcpServers": {
      "jester-framework": {
        "command": "node",
        "args": ["./.jester/mcp/jester-mcp-server.js"],
        "env": {
          "JESTER_FRAMEWORK_PATH": "./.jester"
        }
      }
    }
  };
  
  fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created MCP configuration'));
  
  // Create MCP server placeholder
  const mcpServerPath = path.join(mcpDir, 'jester-mcp-server.js');
  const mcpServerContent = `#!/usr/bin/env node

/**
 * Jester Framework MCP Server
 * 
 * This is a placeholder for a future MCP server that will provide
 * Jester framework-specific tools and capabilities to Claude IDE.
 */

console.log('Jester Framework MCP Server - Coming Soon!');
console.log('This will provide Jester-specific tools and capabilities.');
`;

  fs.writeFileSync(mcpServerPath, mcpServerContent, 'utf8');
  console.log(chalk.green('  ✅ Created MCP server placeholder'));
}

// Export the main conversion function
module.exports = {
  convertForClaude
};

// If run directly, execute the conversion
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node claude.js <sourceDir> <targetDir>');
    process.exit(1);
  }
  
  convertForClaude(args[0], args[1])
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}
