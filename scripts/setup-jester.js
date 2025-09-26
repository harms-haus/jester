#!/usr/bin/env node

/**
 * Jester Complete Setup Script
 * 
 * This script sets up the complete Jester story creation framework for Cursor IDE.
 * It configures Jester agents for Cursor IDE integration.
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { setupCursor } from './setup-cursor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Main setup function
 */
async function setupJester() {
  console.log(chalk.blue('🎭 Setting up Jester Story Creation Framework...\n'));

  try {
    // Step 1: Verify project structure
    await verifyProjectStructure();
    
    // Step 2: Setup Cursor integration
    await setupCursor();
    
    // Step 3: Display completion message
    displayCompletionMessage();
    
    console.log(chalk.green('\n🎉 Jester setup completed successfully!'));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Setup failed:'), error.message);
    process.exit(1);
  }
}

/**
 * Verify project structure
 */
async function verifyProjectStructure() {
  console.log(chalk.yellow('🔍 Verifying project structure...'));
  
  const requiredPaths = [
    '.jester',
    '.jester/agents',
    '.jester/tasks',
    '.jester/templates',
    '.jester/data',
    'universe',
    'reading',
    'draft'
  ];
  
  for (const requiredPath of requiredPaths) {
    const fullPath = path.join(projectRoot, requiredPath);
    if (!await fs.pathExists(fullPath)) {
      console.log(chalk.yellow(`⚠️  Creating missing directory: ${requiredPath}`));
      await fs.ensureDir(fullPath);
    }
  }
  
  // Verify core config exists
  const coreConfigPath = path.join(projectRoot, '.jester/core-config.yaml');
  if (!await fs.pathExists(coreConfigPath)) {
    throw new Error('Core configuration file not found. Please ensure .jester/core-config.yaml exists.');
  }
  
  console.log('✅ Project structure verified');
}


/**
 * Display completion message
 */
function displayCompletionMessage() {
  console.log(chalk.blue('\n🎭 Jester Framework Ready!'));
  console.log(chalk.white('\nQuick Start:'));
  console.log(chalk.gray('1. Restart Cursor to load the new configuration'));
  console.log(chalk.gray('2. Open a new chat and try: @jester *help'));
  console.log(chalk.gray('3. Initialize a new project: @jester *init'));
  console.log(chalk.gray('4. Start brainstorming: @muse *create-new'));
  
  console.log(chalk.white('\nAvailable Agents:'));
  console.log(chalk.gray('  @jester  - Main entry point & project manager'));
  console.log(chalk.gray('  @muse    - Creative brainstorming specialist'));
  console.log(chalk.gray('  @write   - Story generation specialist'));
  console.log(chalk.gray('  @edit    - Content editor & entity manager'));
  console.log(chalk.gray('  @delete  - Deletion specialist'));
  console.log(chalk.gray('  @approve - Approval workflow manager'));
  console.log(chalk.gray('  @publish - Publishing workflow manager'));
  console.log(chalk.gray('  @import  - Import workflow manager'));
  console.log(chalk.gray('  @search  - Search specialist'));
  console.log(chalk.gray('  @validate - Validation specialist'));
  
  console.log(chalk.white('\nDocumentation:'));
  console.log(chalk.gray('  - README.md - Project overview'));
  console.log(chalk.gray('  - .jester/ - Framework configuration'));
  console.log(chalk.gray('  - docs/ - Architecture and stories'));
  
  console.log(chalk.white('\nNeed help?'));
  console.log(chalk.gray('  - Use @jester *help for command reference'));
  console.log(chalk.gray('  - Use @jester *debug for system introspection'));
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupJester();
}

export { setupJester };
