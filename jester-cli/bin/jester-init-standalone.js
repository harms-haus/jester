#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Standalone Jester CLI Initializer
 * 
 * This version doesn't require external dependencies like prompts or chalk.
 * It uses basic Node.js built-ins for a simple but functional CLI.
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
    id: 'vscode', 
    name: 'VS Code', 
    available: true, 
    description: 'Popular code editor with extensions'
  },
  { 
    id: 'claude', 
    name: 'Claude Code', 
    available: true, 
    description: 'Anthropic\'s AI coding assistant with terminal integration'
  },
  { 
    id: 'windsurf', 
    name: 'Windsurf', 
    available: true, 
    description: 'AI-native development environment with Cascade'
  }
];

// Simple color functions (no external dependencies)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

async function main() {
  console.log(colorize('🎭 Jester CLI - Project Initialization', 'cyan'));
  console.log(colorize('=====================================', 'gray'));
  console.log('');

  // Check if framework source exists
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error(colorize('❌ Error: Framework source not found!', 'red'));
    console.error(colorize('   The .jester framework directory is missing.', 'yellow'));
    console.error(colorize('   This usually means the package needs to be built first.', 'yellow'));
    console.error(colorize('   Please run: npm run build', 'cyan'));
    console.error(colorize(`   Expected location: ${FRAMEWORK_SOURCE}`, 'gray'));
    process.exit(1);
  }

  // Simple IDE selection
  console.log(colorize('Available IDEs:', 'blue'));
  IDE_OPTIONS.forEach((ide, index) => {
    const status = ide.available ? '✅' : '🚧';
    console.log(`  ${index + 1}. ${status} ${ide.name}`);
    console.log(`     ${ide.description}`);
  });
  
  console.log('');
  console.log(colorize('Select an IDE (1-4):', 'cyan'));
  
  // Simple input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const selectedIndex = await new Promise((resolve) => {
    rl.question('> ', (answer) => {
      rl.close();
      const index = parseInt(answer) - 1;
      resolve(index >= 0 && index < IDE_OPTIONS.length ? index : 0);
    });
  });
  
  const selectedIDE = IDE_OPTIONS[selectedIndex];
  console.log(colorize(`✅ Selected IDE: ${selectedIDE.name}`, 'green'));
  console.log(colorize('📦 All agents will be installed automatically', 'gray'));
  console.log('');

  // Check if .jester directory already exists
  if (fs.existsSync(TARGET_DIR)) {
    console.log(colorize('⚠️  Warning: .jester directory already exists!', 'yellow'));
    console.log(colorize('   This appears to be an existing Jester installation.', 'yellow'));
    console.log(colorize('   Continuing will delete the existing installation and create a fresh one.', 'yellow'));
    console.log('');
    console.log(colorize('Do you want to continue? (y/N):', 'cyan'));
    
    const shouldContinue = await new Promise((resolve) => {
      const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl2.question('> ', (answer) => {
        rl2.close();
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
    
    if (!shouldContinue) {
      console.log(colorize('Installation cancelled.', 'gray'));
      process.exit(0);
    }
    
    console.log(colorize('🗑️  Removing existing .jester directory...', 'red'));
    try {
      fs.rmSync(TARGET_DIR, { recursive: true, force: true });
      console.log(colorize('✅ Existing .jester directory removed', 'green'));
    } catch (error) {
      console.error(colorize('❌ Error removing existing directory:', 'red'), error.message);
      return;
    }
  }

  try {
    // Create .jester directory
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(colorize('✅ Created .jester directory', 'green'));

    // Copy framework files
    await copyFrameworkFiles(FRAMEWORK_SOURCE, TARGET_DIR);
    
    // Convert files for the selected IDE
    await convertForIDE(selectedIDE, TARGET_DIR);
    
    console.log('');
    console.log(colorize('🎉 Jester framework initialized successfully!', 'green'));
    console.log(colorize(`🎯 Configured for: ${selectedIDE.name}`, 'cyan'));
    
    // Show next steps
    showNextSteps(selectedIDE);

  } catch (error) {
    console.error(colorize('❌ Error initializing Jester framework:', 'red'), error.message);
    process.exit(1);
  }
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
      console.log(colorize(`📁 ${item}/`, 'blue'));
      await copyFrameworkFiles(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(colorize(`📄 ${item}`, 'green'));
    }
  }
}

/**
 * Convert files for the selected IDE using modular converters
 */
async function convertForIDE(selectedIDE, targetDir) {
  try {
    console.log(colorize(`🔄 Converting files for ${selectedIDE.name}...`, 'blue'));
    
    // Load the IDE-specific converter
    const converterPath = path.join(IDES_DIR, `${selectedIDE.id}.js`);
    
    if (!fs.existsSync(converterPath)) {
      console.log(colorize(`⚠️  No converter found for ${selectedIDE.name}, skipping conversion`, 'yellow'));
      return;
    }
    
    // Load the converter module
    const ideConverter = require(converterPath);
    
    // Execute the conversion using proper function name mapping
    const functionMap = {
      'cursor': 'convertForCursor',
      'vscode': 'convertForVSCode', 
      'claude': 'convertForClaude',
      'windsurf': 'convertForWindsurf'
    };
    
    const functionName = functionMap[selectedIDE.id];
    if (!functionName || !ideConverter[functionName]) {
      console.log(colorize(`⚠️  No conversion function found for ${selectedIDE.name}`, 'yellow'));
      return;
    }
    
    const success = await ideConverter[functionName](targetDir, targetDir);
    
    if (success) {
      console.log(colorize(`✅ ${selectedIDE.name} conversion completed`, 'green'));
    } else {
      console.log(colorize(`⚠️  ${selectedIDE.name} conversion had issues`, 'yellow'));
    }
    
  } catch (error) {
    console.log(colorize(`⚠️  Error converting for ${selectedIDE.name}: ${error.message}`, 'yellow'));
  }
}

/**
 * Show next steps
 */
function showNextSteps(selectedIDE) {
  console.log(colorize('Next steps:', 'cyan'));
  
  console.log(colorize('• Files have been converted for your selected IDE', 'white'));
  console.log(colorize('• Use @jester in your IDE to start creating stories', 'white'));
  
  if (selectedIDE.id === 'cursor') {
    console.log(colorize('• Cursor-specific files are in .cursor/', 'white'));
    console.log(colorize('• .mdc files are ready for Cursor\'s AI features', 'white'));
  } else if (selectedIDE.id === 'vscode') {
    console.log(colorize('• VS Code workspace is in .vscode/', 'white'));
    console.log(colorize('• Open jester.code-workspace to start', 'white'));
  } else if (selectedIDE.id === 'claude') {
    console.log(colorize('• Claude-specific files are in .claude/', 'white'));
    console.log(colorize('• Agents are configured in .claude/agents/', 'white'));
    console.log(colorize('• Use @jester, @muse, @write, @edit, @validate, @publish', 'white'));
  } else if (selectedIDE.id === 'windsurf') {
    console.log(colorize('• Windsurf-specific files are in .windsurf/', 'white'));
    console.log(colorize('• .windsurfrules file contains AI coding guidelines', 'white'));
    console.log(colorize('• Cascade rules are configured for agent workflows', 'white'));
  }
  
  console.log(colorize('• Run: npx jester-cli validate (to check everything)', 'white'));
  console.log(colorize('• Run: npx jester-cli config --show (to see settings)', 'white'));
  
  console.log('');
  console.log(colorize('Happy storytelling! 🎭', 'cyan'));
}

// Handle test mode
if (process.argv.includes('--test')) {
  console.log(colorize('🧪 Running in test mode...', 'blue'));
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error(colorize('❌ Framework source directory not found:', 'red'), FRAMEWORK_SOURCE);
    console.error(colorize('   Please run: npm run build', 'yellow'));
    process.exit(1);
  }
  console.log(colorize('✅ Framework source directory found', 'green'));
  console.log(colorize('✅ Test passed', 'green'));
  process.exit(0);
}

// Run the main initialization
main().catch((error) => {
  console.error(colorize('❌ Fatal error:', 'red'), error.message);
  process.exit(1);
});






