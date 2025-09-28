#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Jester CLI - File Conversion
 * 
 * This script converts .jester markdown files to IDE-specific formats
 * using the modular IDE converters in the ides/ directory.
 */

const JESTER_DIR = '.jester';
const IDES_DIR = path.join(__dirname, '..', 'ides');

// IDE-specific conversion options
const IDE_CONVERTERS = {
  cursor: {
    name: 'Cursor IDE',
    converter: 'cursor.js',
    description: 'AI-powered code editor with agent support'
  },
  vscode: {
    name: 'VS Code',
    converter: 'vscode.js',
    description: 'Popular code editor with extensions'
  },
  claude: {
    name: 'Claude Code',
    converter: 'claude.js',
    description: 'Anthropic\'s AI coding assistant with terminal integration'
  },
  windsurf: {
    name: 'Windsurf',
    converter: 'windsurf.js',
    description: 'AI-native development environment with Cascade'
  }
};

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const ideArg = args.find(arg => arg.startsWith('--ide='));
  const ide = ideArg ? ideArg.split('=')[1] : 'cursor';
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  console.log(chalk.cyan.bold('🔄 Jester CLI - File Conversion'));
  console.log(chalk.gray('=====================================\n'));
  
  // Validate IDE
  if (!IDE_CONVERTERS[ide]) {
    console.error(chalk.red(`❌ Unsupported IDE: ${ide}`));
    console.error(chalk.yellow('Supported IDEs:'), Object.keys(IDE_CONVERTERS).join(', '));
    process.exit(1);
  }
  
  // Check if .jester directory exists
  if (!fs.existsSync(JESTER_DIR)) {
    console.error(chalk.red('❌ Error: .jester directory not found!'));
    console.error(chalk.yellow('   Please run: npx jester-cli init'));
    process.exit(1);
  }
  
  const converter = IDE_CONVERTERS[ide];
  console.log(chalk.blue(`🎯 Converting files for: ${converter.name}`));
  
  try {
    // Load and execute the IDE-specific converter
    const converterPath = path.join(IDES_DIR, converter.converter);
    
    if (!fs.existsSync(converterPath)) {
      console.error(chalk.red(`❌ Converter not found: ${converterPath}`));
      process.exit(1);
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
    
    const functionName = functionMap[ide];
    if (!functionName || !ideConverter[functionName]) {
      console.error(chalk.red(`❌ No conversion function found for ${converter.name}`));
      process.exit(1);
    }
    
    const success = await ideConverter[functionName](JESTER_DIR, JESTER_DIR);
    
    if (success) {
      console.log(chalk.green.bold('\n✅ Conversion completed successfully!'));
      console.log(chalk.cyan(`🎯 Files converted for: ${converter.name}`));
    } else {
      console.error(chalk.red('❌ Conversion failed'));
      process.exit(1);
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Error during conversion:'), error.message);
    process.exit(1);
  }
}

// Note: Conversion logic is now handled by the modular IDE converters in the ides/ directory

/**
 * Show help information
 */
function showHelp() {
  console.log(chalk.cyan.bold('Jester CLI - File Conversion'));
  console.log(chalk.gray('=====================================\n'));
  
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  npx jester-cli convert [options]'));
  console.log('');
  
  console.log(chalk.white('Options:'));
  console.log(chalk.gray('  --ide=<ide>     Target IDE (default: cursor)'));
  console.log(chalk.gray('  --help, -h      Show this help message'));
  console.log('');
  
  console.log(chalk.white('Supported IDEs:'));
  for (const [id, config] of Object.entries(IDE_CONVERTERS)) {
    console.log(chalk.gray(`  ${id.padEnd(10)} - ${config.name}`));
    console.log(chalk.gray(`  ${' '.repeat(10)}   ${config.description}`));
  }
  console.log('');
  
  console.log(chalk.white('What it does:'));
  console.log(chalk.gray('  • Uses modular IDE converters from ides/ directory'));
  console.log(chalk.gray('  • Converts .jester files to IDE-specific formats'));
  console.log(chalk.gray('  • Creates IDE-specific configuration files'));
  console.log(chalk.gray('  • Places files in appropriate directories'));
  console.log('');
  
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  npx jester-cli convert'));
  console.log(chalk.gray('  npx jester-cli convert --ide=cursor'));
  console.log(chalk.gray('  npx jester-cli convert --ide=vscode'));
}

// Run the main function
main().catch((error) => {
  console.error(chalk.red('❌ Fatal error:'), error.message);
  process.exit(1);
});
