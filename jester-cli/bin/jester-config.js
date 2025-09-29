#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');

/**
 * Jester CLI - Configuration Management
 * 
 * This script manages Jester project configuration, including
 * IDE settings, agent preferences, and project metadata.
 */

const JESTER_DIR = '.jester';
const CONFIG_FILE = path.join(JESTER_DIR, 'jester-config.json');

// Default configuration
const DEFAULT_CONFIG = {
  version: '1.0.0',
  project: {
    name: '',
    description: '',
    author: '',
    created: new Date().toISOString()
  },
  ide: {
    type: 'cursor',
    settings: {
      autoConvert: true,
      backupOriginals: true,
      validateOnSave: true
    }
  },
  agents: {
    enabled: ['@jester', '@muse', '@write', '@edit', '@validate', '@publish'],
    preferences: {
      '@jester': { priority: 'high', autoActivate: true },
      '@muse': { priority: 'medium', autoActivate: false },
      '@write': { priority: 'high', autoActivate: true },
      '@edit': { priority: 'high', autoActivate: true },
      '@validate': { priority: 'medium', autoActivate: false },
      '@publish': { priority: 'low', autoActivate: false }
    }
  },
  paths: {
    stories: 'stories/',
    assets: 'assets/',
    output: 'output/'
  }
};

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  console.log(chalk.cyan.bold('⚙️  Jester CLI - Configuration Management'));
  console.log(chalk.gray('=====================================\n'));
  
  // Check if .jester directory exists
  if (!fs.existsSync(JESTER_DIR)) {
    console.error(chalk.red('❌ Error: .jester directory not found!'));
    console.error(chalk.yellow('   Please run: npx jester-cli init'));
    process.exit(1);
  }
  
  try {
    if (args.includes('--init')) {
      await initializeConfig();
    } else if (args.includes('--show')) {
      await showConfig();
    } else if (args.includes('--edit')) {
      await editConfig();
    } else if (args.includes('--reset')) {
      await resetConfig();
    } else if (args.includes('--validate')) {
      await validateConfig();
    } else {
      // Interactive mode
      await interactiveConfig();
    }
  } catch (error) {
    console.error(chalk.red('❌ Error managing configuration:'), error.message);
    process.exit(1);
  }
}

/**
 * Initialize configuration file
 */
async function initializeConfig() {
  console.log(chalk.blue('🔧 Initializing Jester configuration...'));
  
  if (fs.existsSync(CONFIG_FILE)) {
    const response = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'Configuration file already exists. Overwrite?',
      initial: false
    });
    
    if (!response.overwrite) {
      console.log(chalk.yellow('Configuration initialization cancelled.'));
      return;
    }
  }
  
  // Get project information
  const projectInfo = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Project name:',
      initial: path.basename(process.cwd())
    },
    {
      type: 'text',
      name: 'description',
      message: 'Project description:',
      initial: 'A Jester storytelling project'
    },
    {
      type: 'text',
      name: 'author',
      message: 'Author name:',
      initial: process.env.USER || 'Anonymous'
    }
  ]);
  
  // Create configuration
  const config = { ...DEFAULT_CONFIG };
  config.project = {
    ...config.project,
    ...projectInfo
  };
  
  // Save configuration
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
  console.log(chalk.green('✅ Configuration initialized successfully!'));
  console.log(chalk.gray(`   Config file: ${CONFIG_FILE}`));
}

/**
 * Show current configuration
 */
async function showConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(chalk.yellow('⚠️  No configuration file found.'));
    console.log(chalk.cyan('   Run: npx jester-cli config --init'));
    return;
  }
  
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  
  console.log(chalk.cyan.bold('📋 Current Configuration:'));
  console.log(chalk.gray('========================\n'));
  
  // Project info
  console.log(chalk.white.bold('Project:'));
  console.log(chalk.gray(`  Name: ${config.project.name}`));
  console.log(chalk.gray(`  Description: ${config.project.description}`));
  console.log(chalk.gray(`  Author: ${config.project.author}`));
  console.log(chalk.gray(`  Created: ${new Date(config.project.created).toLocaleDateString()}`));
  
  // IDE info
  console.log(chalk.white.bold('\nIDE:'));
  console.log(chalk.gray(`  Type: ${config.ide.type}`));
  console.log(chalk.gray(`  Auto-convert: ${config.ide.settings.autoConvert ? 'Yes' : 'No'}`));
  console.log(chalk.gray(`  Backup originals: ${config.ide.settings.backupOriginals ? 'Yes' : 'No'}`));
  console.log(chalk.gray(`  Validate on save: ${config.ide.settings.validateOnSave ? 'Yes' : 'No'}`));
  
  // Agents info
  console.log(chalk.white.bold('\nAgents:'));
  console.log(chalk.gray(`  Enabled: ${config.agents.enabled.join(', ')}`));
  
  // Paths info
  console.log(chalk.white.bold('\nPaths:'));
  console.log(chalk.gray(`  Stories: ${config.paths.stories}`));
  console.log(chalk.gray(`  Assets: ${config.paths.assets}`));
  console.log(chalk.gray(`  Output: ${config.paths.output}`));
}

/**
 * Edit configuration interactively
 */
async function editConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(chalk.yellow('⚠️  No configuration file found.'));
    console.log(chalk.cyan('   Run: npx jester-cli config --init'));
    return;
  }
  
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  
  console.log(chalk.blue('✏️  Editing configuration...'));
  
  const editOptions = [
    { title: 'Project Information', value: 'project' },
    { title: 'IDE Settings', value: 'ide' },
    { title: 'Agent Preferences', value: 'agents' },
    { title: 'Path Settings', value: 'paths' },
    { title: 'Done', value: 'done' }
  ];
  
  let editing = true;
  while (editing) {
    const response = await prompts({
      type: 'select',
      name: 'section',
      message: 'What would you like to edit?',
      choices: editOptions
    });
    
    if (response.section === 'done') {
      editing = false;
    } else {
      await editConfigSection(config, response.section);
    }
  }
  
  // Save updated configuration
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
  console.log(chalk.green('✅ Configuration updated successfully!'));
}

/**
 * Edit a specific configuration section
 */
async function editConfigSection(config, section) {
  switch (section) {
    case 'project':
      const projectInfo = await prompts([
        {
          type: 'text',
          name: 'name',
          message: 'Project name:',
          initial: config.project.name
        },
        {
          type: 'text',
          name: 'description',
          message: 'Project description:',
          initial: config.project.description
        },
        {
          type: 'text',
          name: 'author',
          message: 'Author name:',
          initial: config.project.author
        }
      ]);
      config.project = { ...config.project, ...projectInfo };
      break;
      
    case 'ide':
      const ideSettings = await prompts([
        {
          type: 'confirm',
          name: 'autoConvert',
          message: 'Auto-convert files?',
          initial: config.ide.settings.autoConvert
        },
        {
          type: 'confirm',
          name: 'backupOriginals',
          message: 'Backup original files?',
          initial: config.ide.settings.backupOriginals
        },
        {
          type: 'confirm',
          name: 'validateOnSave',
          message: 'Validate on save?',
          initial: config.ide.settings.validateOnSave
        }
      ]);
      config.ide.settings = { ...config.ide.settings, ...ideSettings };
      break;
      
    case 'agents':
      const agentChoices = [
        { title: '@jester - Story generation', value: '@jester' },
        { title: '@muse - Creative inspiration', value: '@muse' },
        { title: '@write - Content creation', value: '@write' },
        { title: '@edit - Story refinement', value: '@edit' },
        { title: '@validate - Quality assurance', value: '@validate' },
        { title: '@publish - Publication', value: '@publish' }
      ];
      
      const agentResponse = await prompts({
        type: 'multiselect',
        name: 'enabled',
        message: 'Select enabled agents:',
        choices: agentChoices,
        initial: config.agents.enabled.map(agent => 
          agentChoices.findIndex(choice => choice.value === agent)
        )
      });
      
      config.agents.enabled = agentResponse.enabled;
      break;
      
    case 'paths':
      const pathSettings = await prompts([
        {
          type: 'text',
          name: 'stories',
          message: 'Stories directory:',
          initial: config.paths.stories
        },
        {
          type: 'text',
          name: 'assets',
          message: 'Assets directory:',
          initial: config.paths.assets
        },
        {
          type: 'text',
          name: 'output',
          message: 'Output directory:',
          initial: config.paths.output
        }
      ]);
      config.paths = { ...config.paths, ...pathSettings };
      break;
  }
}

/**
 * Reset configuration to defaults
 */
async function resetConfig() {
  console.log(chalk.yellow('⚠️  This will reset your configuration to defaults.'));
  
  const response = await prompts({
    type: 'confirm',
    name: 'reset',
    message: 'Are you sure you want to reset?',
    initial: false
  });
  
  if (response.reset) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf8');
    console.log(chalk.green('✅ Configuration reset to defaults!'));
  } else {
    console.log(chalk.gray('Configuration reset cancelled.'));
  }
}

/**
 * Validate configuration
 */
async function validateConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(chalk.yellow('⚠️  No configuration file found.'));
    return;
  }
  
  console.log(chalk.blue('🔍 Validating configuration...'));
  
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const errors = [];
    
    // Validate required fields
    if (!config.project?.name) errors.push('Project name is required');
    if (!config.project?.description) errors.push('Project description is required');
    if (!config.project?.author) errors.push('Project author is required');
    if (!config.ide?.type) errors.push('IDE type is required');
    if (!config.agents?.enabled?.length) errors.push('At least one agent must be enabled');
    
    // Validate paths
    if (!config.paths?.stories) errors.push('Stories path is required');
    if (!config.paths?.assets) errors.push('Assets path is required');
    if (!config.paths?.output) errors.push('Output path is required');
    
    if (errors.length > 0) {
      console.log(chalk.red('❌ Configuration validation failed:'));
      errors.forEach(error => console.log(chalk.red(`  • ${error}`)));
    } else {
      console.log(chalk.green('✅ Configuration is valid!'));
    }
    
  } catch (error) {
    console.log(chalk.red('❌ Configuration file is invalid JSON:'), error.message);
  }
}

/**
 * Interactive configuration mode
 */
async function interactiveConfig() {
  const options = [
    { title: 'Initialize Configuration', value: 'init' },
    { title: 'Show Current Configuration', value: 'show' },
    { title: 'Edit Configuration', value: 'edit' },
    { title: 'Validate Configuration', value: 'validate' },
    { title: 'Reset to Defaults', value: 'reset' },
    { title: 'Exit', value: 'exit' }
  ];
  
  const response = await prompts({
    type: 'select',
    name: 'action',
    message: 'What would you like to do?',
    choices: options
  });
  
  switch (response.action) {
    case 'init':
      await initializeConfig();
      break;
    case 'show':
      await showConfig();
      break;
    case 'edit':
      await editConfig();
      break;
    case 'validate':
      await validateConfig();
      break;
    case 'reset':
      await resetConfig();
      break;
    case 'exit':
      console.log(chalk.gray('Goodbye!'));
      break;
  }
}

/**
 * Show help information
 */
function showHelp() {
  console.log(chalk.cyan.bold('Jester CLI - Configuration Management'));
  console.log(chalk.gray('=====================================\n'));
  
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  npx jester-cli config [options]'));
  console.log('');
  
  console.log(chalk.white('Options:'));
  console.log(chalk.gray('  --init          Initialize configuration file'));
  console.log(chalk.gray('  --show          Show current configuration'));
  console.log(chalk.gray('  --edit          Edit configuration interactively'));
  console.log(chalk.gray('  --reset         Reset to default configuration'));
  console.log(chalk.gray('  --validate      Validate configuration file'));
  console.log(chalk.gray('  --help, -h      Show this help message'));
  console.log('');
  
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  npx jester-cli config --init'));
  console.log(chalk.gray('  npx jester-cli config --show'));
  console.log(chalk.gray('  npx jester-cli config --edit'));
}

// Run the main function
main().catch((error) => {
  console.error(chalk.red('❌ Fatal error:'), error.message);
  process.exit(1);
});






