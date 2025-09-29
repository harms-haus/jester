#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Jester CLI - Validation & Testing
 * 
 * This script validates Jester project structure, files, and configuration,
 * and runs various tests to ensure everything is working correctly.
 */

const JESTER_DIR = '.jester';
const CONFIG_FILE = path.join(JESTER_DIR, 'jester-config.json');

// Validation rules
const VALIDATION_RULES = {
  structure: {
    required: ['.jester', '.jester/agents', '.jester/templates', '.jester/config'],
    optional: ['.jester/cursor', '.jester/assets', '.jester/output']
  },
  files: {
    required: [
      '.jester/agents/jester.md',
      '.jester/agents/muse.md',
      '.jester/agents/write.md',
      '.jester/agents/edit.md',
      '.jester/agents/validate.md',
      '.jester/agents/publish.md'
    ],
    optional: [
      '.jester/cursor/.cursorrules',
      '.jester/cursor/cursor-config.json',
      '.jester/jester-config.json'
    ]
  },
  content: {
    markdown: {
      requiredSections: ['# ', '## ', '### '],
      minLength: 100
    }
  }
};

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  console.log(chalk.cyan.bold('🔍 Jester CLI - Validation & Testing'));
  console.log(chalk.gray('=====================================\n'));
  
  // Check if .jester directory exists
  if (!fs.existsSync(JESTER_DIR)) {
    console.error(chalk.red('❌ Error: .jester directory not found!'));
    console.error(chalk.yellow('   Please run: npx jester-cli init'));
    process.exit(1);
  }
  
  try {
    let allPassed = true;
    
    if (args.includes('--structure') || args.length === 0) {
      allPassed = await validateStructure() && allPassed;
    }
    
    if (args.includes('--files') || args.length === 0) {
      allPassed = await validateFiles() && allPassed;
    }
    
    if (args.includes('--content') || args.length === 0) {
      allPassed = await validateContent() && allPassed;
    }
    
    if (args.includes('--config') || args.length === 0) {
      allPassed = await validateConfig() && allPassed;
    }
    
    if (args.includes('--test') || args.length === 0) {
      allPassed = await runTests() && allPassed;
    }
    
    // Summary
    console.log(chalk.gray('\n' + '='.repeat(50)));
    if (allPassed) {
      console.log(chalk.green.bold('✅ All validations passed!'));
      console.log(chalk.green('🎉 Your Jester project is ready to use!'));
    } else {
      console.log(chalk.red.bold('❌ Some validations failed!'));
      console.log(chalk.yellow('   Please fix the issues above and try again.'));
      process.exit(1);
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Error during validation:'), error.message);
    process.exit(1);
  }
}

/**
 * Validate project structure
 */
async function validateStructure() {
  console.log(chalk.blue('📁 Validating project structure...'));
  
  let passed = true;
  const rules = VALIDATION_RULES.structure;
  
  // Check required directories
  for (const dir of rules.required) {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      console.log(chalk.green(`  ✅ ${dir}`));
    } else {
      console.log(chalk.red(`  ❌ ${dir} (required)`));
      passed = false;
    }
  }
  
  // Check optional directories
  for (const dir of rules.optional) {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      console.log(chalk.green(`  ✅ ${dir}`));
    } else {
      console.log(chalk.gray(`  ⚪ ${dir} (optional)`));
    }
  }
  
  return passed;
}

/**
 * Validate required files
 */
async function validateFiles() {
  console.log(chalk.blue('\n📄 Validating required files...'));
  
  let passed = true;
  const rules = VALIDATION_RULES.files;
  
  // Check required files
  for (const file of rules.required) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        console.log(chalk.green(`  ✅ ${file}`));
      } else {
        console.log(chalk.red(`  ❌ ${file} (not a file)`));
        passed = false;
      }
    } else {
      console.log(chalk.red(`  ❌ ${file} (missing)`));
      passed = false;
    }
  }
  
  // Check optional files
  for (const file of rules.optional) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      console.log(chalk.green(`  ✅ ${file}`));
    } else {
      console.log(chalk.gray(`  ⚪ ${file} (optional)`));
    }
  }
  
  return passed;
}

/**
 * Validate file content
 */
async function validateContent() {
  console.log(chalk.blue('\n📝 Validating file content...'));
  
  let passed = true;
  const rules = VALIDATION_RULES.content;
  
  // Get all markdown files
  const markdownFiles = getAllMarkdownFiles(JESTER_DIR);
  
  for (const file of markdownFiles) {
    const relativePath = path.relative(process.cwd(), file);
    const content = fs.readFileSync(file, 'utf8');
    
    // Check minimum length
    if (content.length < rules.markdown.minLength) {
      console.log(chalk.red(`  ❌ ${relativePath} (too short: ${content.length} chars)`));
      passed = false;
    } else {
      console.log(chalk.green(`  ✅ ${relativePath} (${content.length} chars)`));
    }
    
    // Check for required sections
    const hasRequiredSections = rules.markdown.requiredSections.some(section => 
      content.includes(section)
    );
    
    if (!hasRequiredSections) {
      console.log(chalk.yellow(`  ⚠️  ${relativePath} (missing required sections)`));
    }
  }
  
  return passed;
}

/**
 * Validate configuration
 */
async function validateConfig() {
  console.log(chalk.blue('\n⚙️  Validating configuration...'));
  
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(chalk.yellow('  ⚠️  No configuration file found (optional)'));
    return true;
  }
  
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    let passed = true;
    
    // Check required fields
    const requiredFields = ['project', 'ide', 'agents', 'paths'];
    for (const field of requiredFields) {
      if (config[field]) {
        console.log(chalk.green(`  ✅ ${field} section`));
      } else {
        console.log(chalk.red(`  ❌ ${field} section (missing)`));
        passed = false;
      }
    }
    
    // Check project fields
    if (config.project) {
      const projectFields = ['name', 'description', 'author'];
      for (const field of projectFields) {
        if (config.project[field]) {
          console.log(chalk.green(`  ✅ project.${field}`));
        } else {
          console.log(chalk.red(`  ❌ project.${field} (missing)`));
          passed = false;
        }
      }
    }
    
    // Check agents
    if (config.agents && config.agents.enabled) {
      if (Array.isArray(config.agents.enabled) && config.agents.enabled.length > 0) {
        console.log(chalk.green(`  ✅ agents.enabled (${config.agents.enabled.length} agents)`));
      } else {
        console.log(chalk.red('  ❌ agents.enabled (empty or invalid)'));
        passed = false;
      }
    }
    
    return passed;
    
  } catch (error) {
    console.log(chalk.red(`  ❌ Configuration file is invalid: ${error.message}`));
    return false;
  }
}

/**
 * Run tests
 */
async function runTests() {
  console.log(chalk.blue('\n🧪 Running tests...'));
  
  let passed = true;
  
  // Test 1: File system access
  try {
    fs.readdirSync(JESTER_DIR);
    console.log(chalk.green('  ✅ File system access'));
  } catch (error) {
    console.log(chalk.red('  ❌ File system access failed'));
    passed = false;
  }
  
  // Test 2: Agent file readability
  const agentFiles = [
    'agents/jester.md',
    'agents/muse.md',
    'agents/write.md',
    'agents/edit.md',
    'agents/validate.md',
    'agents/publish.md'
  ];
  
  for (const agentFile of agentFiles) {
    const fullPath = path.join(JESTER_DIR, agentFile);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.length > 0) {
        console.log(chalk.green(`  ✅ ${agentFile} readable`));
      } else {
        console.log(chalk.red(`  ❌ ${agentFile} empty`));
        passed = false;
      }
    } catch (error) {
      console.log(chalk.red(`  ❌ ${agentFile} not readable`));
      passed = false;
    }
  }
  
  // Test 3: Configuration file (if exists)
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      console.log(chalk.green('  ✅ Configuration file valid JSON'));
    } catch (error) {
      console.log(chalk.red('  ❌ Configuration file invalid JSON'));
      passed = false;
    }
  }
  
  // Test 4: Cursor integration (if exists)
  const cursorDir = path.join(JESTER_DIR, 'cursor');
  if (fs.existsSync(cursorDir)) {
    const cursorFiles = ['.cursorrules', 'cursor-config.json'];
    for (const file of cursorFiles) {
      const fullPath = path.join(cursorDir, file);
      if (fs.existsSync(fullPath)) {
        console.log(chalk.green(`  ✅ Cursor ${file}`));
      } else {
        console.log(chalk.yellow(`  ⚠️  Cursor ${file} missing`));
      }
    }
  }
  
  return passed;
}

/**
 * Get all markdown files recursively
 */
function getAllMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Show help information
 */
function showHelp() {
  console.log(chalk.cyan.bold('Jester CLI - Validation & Testing'));
  console.log(chalk.gray('=====================================\n'));
  
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  npx jester-cli validate [options]'));
  console.log('');
  
  console.log(chalk.white('Options:'));
  console.log(chalk.gray('  --structure     Validate project structure'));
  console.log(chalk.gray('  --files         Validate required files'));
  console.log(chalk.gray('  --content       Validate file content'));
  console.log(chalk.gray('  --config        Validate configuration'));
  console.log(chalk.gray('  --test          Run tests'));
  console.log(chalk.gray('  --help, -h      Show this help message'));
  console.log('');
  
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  npx jester-cli validate'));
  console.log(chalk.gray('  npx jester-cli validate --structure'));
  console.log(chalk.gray('  npx jester-cli validate --files --content'));
  console.log(chalk.gray('  npx jester-cli validate --test'));
}

// Run the main function
main().catch((error) => {
  console.error(chalk.red('❌ Fatal error:'), error.message);
  process.exit(1);
});






