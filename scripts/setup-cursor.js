#!/usr/bin/env node

/**
 * Jester Cursor Setup Script
 * 
 * This script sets up Cursor IDE integration for the Jester story creation framework.
 * It creates Cursor rules and ensures proper IDE integration.
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configuration
const CURSORRULES_FILE = path.join(projectRoot, '.cursorrules');

// Jester agent information
const JESTER_AGENTS = [
  { name: 'jester', title: 'Main Entry Point & Project Manager', icon: '🎭' },
  { name: 'write', title: 'Story Generation Specialist', icon: '✍️' },
  { name: 'muse', title: 'Creative Brainstorming Specialist', icon: '💭' },
  { name: 'edit', title: 'Content Editor & Entity Manager', icon: '✏️' },
  { name: 'delete', title: 'Deletion Specialist', icon: '🗑️' },
  { name: 'approve', title: 'Approval Workflow Manager', icon: '✅' },
  { name: 'publish', title: 'Publishing Workflow Manager', icon: '📤' },
  { name: 'import', title: 'Import Workflow Manager', icon: '📥' },
  { name: 'search', title: 'Search Specialist', icon: '🔍' },
  { name: 'validate', title: 'Validation Specialist', icon: '🔍' }
];


/**
 * Main setup function
 */
async function setupCursor() {
  console.log(chalk.blue('🎭 Setting up Jester Cursor Integration...\n'));

  try {
    // Step 1: Create .cursorrules file
    await createCursorRules();
    
    // Step 2: Display usage instructions
    displayUsageInstructions();
    
    console.log(chalk.green('\n✅ Jester Cursor setup completed successfully!'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Setup failed:'), error.message);
    process.exit(1);
  }
}


/**
 * Create .cursorrules file
 */
async function createCursorRules() {
  console.log(chalk.yellow('📋 Creating .cursorrules file...'));
  
  const cursorRules = generateCursorRules();
  await fs.writeFile(CURSORRULES_FILE, cursorRules);
  console.log(`✅ .cursorrules file created at ${CURSORRULES_FILE}`);
}

/**
 * Generate Cursor rules content
 */
function generateCursorRules() {
  return `# Jester Story Creation Framework - Cursor Rules

You are working with the Jester story creation framework, a prompt-based bedtime story generation system.

## Available Agents

Use the @ symbol to invoke Jester agents:

${JESTER_AGENTS.map(agent => `- @${agent.name} - ${agent.icon} ${agent.title}`).join('\n')}

## Core Workflow

1. **@jester** - Main entry point for project management and initialization
2. **@muse** - Creative brainstorming and context generation
3. **@write** - Story generation (context → outline → story)
4. **@edit** - Content editing and entity management
5. **@validate** - Quality assurance and validation
6. **@publish** - Publishing and distribution

## Key Commands

All Jester commands start with * (asterisk):
- *help - Show available commands for current agent
- *init - Initialize project structure
- *create-new - Start new brainstorming session
- *context - Generate story context
- *outline - Generate story outline
- *story - Generate full story
- *edit - Edit content or entities

## Project Structure

- \`universe/\` - Global entity library (characters, locations, items)
- \`reading/\` - Story-specific content and patches
- \`draft/\` - Work-in-progress content
- \`.jester/\` - Framework configuration and agents
- \`.memory/\` - User preferences and settings


## Best Practices

1. Always start with @jester for project initialization
2. Use @muse for creative exploration and brainstorming
3. Follow the context → outline → story pipeline
4. Use @edit for content modifications
5. Validate with @validate before publishing
6. Keep entity files in universe/ for reuse across stories

## File Naming Conventions

- Stories: \`{number} - {Title}.md\`
- Characters: \`{name}.md\` (kebab-case)
- Locations: \`{name}.md\` (kebab-case)
- Items: \`{name}.md\` (kebab-case)
- Contexts: \`{story-title}-context.yaml\`
- Outlines: \`{story-title}-outline.md\`

## Agent Switching

When switching between agents, start a new chat session for optimal performance. Each agent has specialized capabilities and maintains its own context.

## Debug Mode

Use @jester *debug to activate debug mode for system introspection and troubleshooting.

Remember: Jester is designed for creating engaging bedtime stories with educational value. Focus on age-appropriate content, clear moral themes, and engaging characters.
`;
}


/**
 * Display usage instructions
 */
function displayUsageInstructions() {
  console.log(chalk.blue('\n📖 Usage Instructions:'));
  console.log(chalk.white('\n1. Restart Cursor to load the new configuration'));
  console.log(chalk.white('2. Open a new chat and try: @jester *help'));
  console.log(chalk.white('3. Initialize a new project: @jester *init'));
  console.log(chalk.white('4. Start brainstorming: @muse *create-new'));
  
  console.log(chalk.blue('\n🎭 Available Jester Agents:'));
  JESTER_AGENTS.forEach(agent => {
    console.log(chalk.white(`  @${agent.name} - ${agent.icon} ${agent.title}`));
  });
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupCursor();
}

export { setupCursor };
