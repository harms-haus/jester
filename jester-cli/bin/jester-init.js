#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

/**
 * Jester CLI - Project Initialization
 * 
 * This script handles the initial setup of a Jester project,
 * including IDE selection and basic project structure creation.
 */

const FRAMEWORK_SOURCE = path.join(__dirname, '..', '.jester');
const TARGET_DIR = '.jester';
const IDES_DIR = path.join(__dirname, '..', 'ides');

// IDE options
const IDE_OPTIONS = [
  { 
    id: 'cursor', 
    name: 'Cursor IDE', 
    available: true, 
    description: 'AI-powered code editor with agent support'
  },
  { 
    id: 'claude', 
    name: 'Claude Code', 
    available: true, 
    description: 'Anthropic\'s AI coding assistant with terminal integration'
  },
  { 
    id: 'opencode', 
    name: 'OpenCode', 
    available: true, 
    description: 'OpenCode CLI agent'
  }
];

async function main() {
  console.log(chalk.cyan.bold('🎭 Jester CLI - Project Initialization'));
  console.log(chalk.gray('=====================================\n'));

  // Check if framework source exists
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error(chalk.red('❌ Error: Framework source not found!'));
    console.error(chalk.yellow('   The .jester framework directory is missing.'));
    console.error(chalk.yellow('   This usually means the package needs to be built first.'));
    console.error(chalk.cyan('   Please run: npm run build'));
    console.error(chalk.gray(`   Expected location: ${FRAMEWORK_SOURCE}`));
    process.exit(1);
  }

  // Check if .jester directory already exists
  if (fs.existsSync(TARGET_DIR)) {
    const shouldContinue = await handleExistingJesterDirectory();
    if (!shouldContinue) {
      console.log('\nInstallation cancelled.');
      process.exit(0);
    }
  }

  try {
    // IDE selection
    const selectedIDE = await selectIDE();
    
    // Create .jester directory
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(chalk.green('✅ Created .jester directory'));

    // Copy framework files
    await copyFrameworkFiles(FRAMEWORK_SOURCE, TARGET_DIR);
    
    // Convert files for the selected IDE
    await convertForIDE(selectedIDE, TARGET_DIR);
    
    console.log(chalk.green.bold('\n🎉 Jester framework initialized successfully!'));
    console.log(chalk.cyan(`🎯 Configured for: ${selectedIDE.name}`));
    
    // Show next steps
    showNextSteps(selectedIDE);

  } catch (error) {
    console.error(chalk.red('❌ Error initializing Jester framework:'), error.message);
    process.exit(1);
  }
}

/**
 * Handle existing .jester directory
 */
async function handleExistingJesterDirectory() {
  console.log(chalk.yellow.bold('⚠️  Warning: .jester directory already exists!'));
  console.log(chalk.yellow('   This appears to be an existing Jester installation.'));
  console.log(chalk.yellow('   Continuing will delete the existing installation and create a fresh one.'));
  
  const response = await prompts({
    type: 'confirm',
    name: 'continue',
    message: 'Do you want to continue? This will delete the existing .jester folder.',
    initial: false
  });
  
  if (response.continue) {
    console.log(chalk.red('\n🗑️  Removing existing .jester directory...'));
    try {
      fs.rmSync(TARGET_DIR, { recursive: true, force: true });
      console.log(chalk.green('✅ Existing .jester directory removed'));
      return true;
    } catch (error) {
      console.error(chalk.red('❌ Error removing existing directory:'), error.message);
      console.log(chalk.yellow('Please manually remove the .jester directory and try again.'));
      return false;
    }
  } else {
    console.log(chalk.gray('\nInstallation cancelled. Existing .jester directory preserved.'));
    return false;
  }
}

/**
 * IDE selection interface
 */
async function selectIDE() {
  console.log(chalk.cyan.bold('\n🎯 IDE Selection'));
  console.log(chalk.gray('Please select your preferred IDE:'));
  
  const ideChoices = IDE_OPTIONS.map(option => ({
    title: `${option.available ? '✅' : '🚧'} ${option.name}`,
    description: option.description,
    value: option,
    disabled: !option.available
  }));
  
  const ideResponse = await prompts({
    type: 'select',
    name: 'ide',
    message: 'Select your IDE:',
    choices: ideChoices,
    initial: 0
  });
  
  if (!ideResponse.ide) {
    console.log(chalk.red('\n❌ No IDE selected. Installation cancelled.'));
    process.exit(0);
  }
  
  const selectedIDE = ideResponse.ide;
  console.log(chalk.green(`\n✅ Selected IDE: ${selectedIDE.name}`));
  console.log(chalk.gray('📦 All agents will be installed automatically'));
  
  return selectedIDE;
}

/**
 * Copy framework files
 */
async function copyFrameworkFiles(source, target) {
  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      console.log(chalk.blue(`📁 ${item}/`));
      await copyFrameworkFiles(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(chalk.green(`📄 ${item}`));
    }
  }
}

/**
 * Convert files for the selected IDE using modular converters
 */
async function convertForIDE(selectedIDE, targetDir) {
  try {
    console.log(chalk.blue(`\n🔄 Converting files for ${selectedIDE.name}...`));
    
    // Load the IDE-specific converter
    const converterPath = path.join(IDES_DIR, `${selectedIDE.id}.js`);
    
    if (!fs.existsSync(converterPath)) {
      console.log(chalk.yellow(`⚠️  No converter found for ${selectedIDE.name}, skipping conversion`));
      return;
    }
    
    // Load the converter module
    const ideConverter = require(converterPath);
    
    // Execute the conversion using proper function name mapping
    const functionMap = {
      'cursor': 'convertForCursor',
      'claude': 'convertForClaude',
      'opencode': 'convertForOpenCode'
    };
    
    const functionName = functionMap[selectedIDE.id];
    if (!functionName || !ideConverter[functionName]) {
      console.log(chalk.yellow(`⚠️  No conversion function found for ${selectedIDE.name}`));
      return;
    }
    
    const success = await ideConverter[functionName](targetDir, targetDir);
    
    if (success) {
      console.log(chalk.green(`✅ ${selectedIDE.name} conversion completed`));
    } else {
      console.log(chalk.yellow(`⚠️  ${selectedIDE.name} conversion had issues`));
    }
    
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Error converting for ${selectedIDE.name}: ${error.message}`));
  }
}

/**
 * Show next steps
 */
function showNextSteps(selectedIDE) {
  console.log(chalk.cyan.bold('\nNext steps:'));
  
  console.log(chalk.white('• Files have been converted for your selected IDE'));
  console.log(chalk.white('• Use @jester in your IDE to start creating stories'));
  
  if (selectedIDE.id === 'cursor') {
    console.log(chalk.white('• Cursor-specific files are in .cursor/'));
    console.log(chalk.white('• .mdc files are ready for Cursor\'s AI features'));
  } else if (selectedIDE.id === 'vscode') {
    console.log(chalk.white('• OpenCode workspace is in .opencode/'));
    console.log(chalk.white('• Use @agent-jester to start creating stories'));
  } else if (selectedIDE.id === 'claude') {
    console.log(chalk.white('• Claude-specific files are in .claude/'));
    console.log(chalk.white('• Agents are configured in .claude/agents/'));
    console.log(chalk.white('• Use @jester, @muse, @write, @edit, @validate, @publish'));
  }
  
  console.log(chalk.white('• Run: npx jester-cli validate (to check everything)'));
  console.log(chalk.white('• Run: npx jester-cli config --show (to see settings)'));
  
  console.log(chalk.cyan.bold('\nHappy storytelling! 🎭'));
}

// Handle test mode
if (process.argv.includes('--test')) {
  console.log(chalk.blue('🧪 Running in test mode...'));
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error(chalk.red('❌ Framework source directory not found:'), FRAMEWORK_SOURCE);
    console.error(chalk.yellow('   Please run: npm run build'));
    process.exit(1);
  }
  console.log(chalk.green('✅ Framework source directory found'));
  console.log(chalk.green('✅ Test passed'));
  process.exit(0);
}

// Run the main initialization
main().catch((error) => {
  console.error(chalk.red('❌ Fatal error:'), error.message);
  process.exit(1);
});
