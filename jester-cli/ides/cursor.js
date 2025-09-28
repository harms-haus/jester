#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Cursor IDE Converter
 * 
 * Converts Jester framework files to Cursor-specific formats:
 * - Converts .md files to .mdc files with proper front matter
 * - Creates .cursorrules file for project-specific AI rules
 * - Creates cursor-config.json for IDE configuration
 * - Places files in the .cursor/ directory as per Cursor documentation
 */

/**
 * Convert Jester framework files for Cursor IDE
 * @param {string} sourceDir - Source directory containing .jester files
 * @param {string} targetDir - Target directory (usually .jester)
 * @returns {Promise<boolean>} - Success status
 */
async function convertForCursor(sourceDir, targetDir) {
  try {
    console.log(chalk.blue('🎯 Converting files for Cursor IDE...'));
    
    // Create .cursor directory structure at project root level
    const projectRoot = path.dirname(targetDir);
    const cursorDir = path.join(projectRoot, '.cursor');
    await createCursorDirectoryStructure(cursorDir);
    
    // Convert markdown files to .mdc format
    await convertMarkdownToMdc(sourceDir, cursorDir);
    
    // Create .cursorrules file
    await createCursorRules(cursorDir);
    
    // Create cursor-config.json
    await createCursorConfig(cursorDir);
    
    console.log(chalk.green('✅ Cursor conversion completed successfully!'));
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ Cursor conversion failed:'), error.message);
    return false;
  }
}

/**
 * Create Cursor directory structure
 */
async function createCursorDirectoryStructure(cursorDir) {
  console.log(chalk.gray('📁 Creating .cursor directory structure...'));
  
  // Create main .cursor directory
  fs.mkdirSync(cursorDir, { recursive: true });
  
  // Create subdirectories
  const subdirs = ['rules', 'config', 'docs'];
  for (const subdir of subdirs) {
    const subdirPath = path.join(cursorDir, subdir);
    fs.mkdirSync(subdirPath, { recursive: true });
    console.log(chalk.green(`  ✅ Created .cursor/${subdir}/`));
  }
}

/**
 * Convert markdown files to .mdc format
 */
async function convertMarkdownToMdc(sourceDir, cursorDir) {
  console.log(chalk.gray('📄 Converting markdown files to .mdc format...'));
  
  const markdownFiles = getAllMarkdownFiles(sourceDir);
  let convertedCount = 0;
  
  for (const file of markdownFiles) {
    const relativePath = path.relative(sourceDir, file);
    const filename = path.basename(file, '.md');
    const dir = path.dirname(path.join(cursorDir, 'docs', relativePath));
    
    // Create directory structure in .cursor/docs
    fs.mkdirSync(dir, { recursive: true });
    
    // Convert to .mdc
    await convertToMdc(file, dir, filename);
    convertedCount++;
  }
  
  console.log(chalk.green(`  ✅ Converted ${convertedCount} markdown files to .mdc`));
}

/**
 * Convert a single markdown file to .mdc format
 */
async function convertToMdc(sourceFile, targetDir, filename) {
  const content = fs.readFileSync(sourceFile, 'utf8');
  
  // Generate MDC front matter based on Cursor documentation
  const frontMatter = generateMdcFrontMatter(filename, content);
  const mdcContent = frontMatter + '\n' + content;
  
  // Write .mdc file
  const mdcPath = path.join(targetDir, `${filename}.mdc`);
  fs.writeFileSync(mdcPath, mdcContent, 'utf8');
  
  console.log(chalk.green(`    ✅ ${filename}.md → ${filename}.mdc`));
}

/**
 * Generate MDC front matter according to Cursor documentation
 */
function generateMdcFrontMatter(filename, content) {
  // Extract description from content
  const lines = content.split('\n');
  let description = 'Jester framework file';
  
  // Try to find a description from the first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('*') && line.length > 10) {
      description = line.replace(/[#*`]/g, '').trim();
      break;
    }
  }
  
  // Determine globs based on filename and content
  let globs = ['**/*'];
  let alwaysApply = true;
  
  if (filename.includes('agent')) {
    globs = ['**/*.md', '**/*.mdc', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'];
    alwaysApply = true;
  } else if (filename.includes('config')) {
    globs = ['**/*.json', '**/*.yaml', '**/*.yml', '**/*.config.*'];
    alwaysApply = true;
  } else if (filename.includes('template')) {
    globs = ['**/*.md', '**/*.mdc'];
    alwaysApply = false;
  } else if (filename.includes('prompt')) {
    globs = ['**/*.md', '**/*.mdc', '**/*.txt'];
    alwaysApply = true;
  }
  
  // Generate front matter according to Cursor's .mdc format
  return `---
description: "${description}"
globs: ${JSON.stringify(globs)}
alwaysApply: ${alwaysApply}
context: "jester-framework"
---`;
}

/**
 * Create .cursorrules file for project-specific AI rules
 */
async function createCursorRules(cursorDir) {
  console.log(chalk.gray('📝 Creating .cursorrules file...'));
  
  const cursorRulesPath = path.join(cursorDir, '.cursorrules');
  const cursorRulesContent = `# Jester Framework Rules for Cursor

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
- \`.cursor/\` contains Cursor-specific files and configurations
- Use \`.mdc\` files for Cursor-specific markdown with front matter
- Keep original \`.md\` files as backup

## Best Practices
1. **Always use the appropriate agent** for the task at hand
2. **Follow the established story structure** defined in templates
3. **Maintain consistency** across all content and characters
4. **Use validation tools** before publishing any content
5. **Respect the hierarchical command structure** of the framework

## Code Style
- Use clear, descriptive variable and function names
- Follow the existing code patterns in the framework
- Add comments for complex logic
- Maintain consistent formatting

## Story Creation Guidelines
- Start with @jester for overall structure
- Use @muse for creative brainstorming
- Write content with @write
- Refine with @edit
- Validate with @validate
- Publish with @publish

## Context Awareness
- Always consider the target audience (children)
- Maintain age-appropriate content
- Ensure stories are educational and entertaining
- Follow the established character and world consistency rules
`;
  
  fs.writeFileSync(cursorRulesPath, cursorRulesContent, 'utf8');
  console.log(chalk.green('  ✅ Created .cursorrules'));
}

/**
 * Create cursor-config.json for IDE configuration
 */
async function createCursorConfig(cursorDir) {
  console.log(chalk.gray('⚙️  Creating cursor-config.json...'));
  
  const configPath = path.join(cursorDir, 'cursor-config.json');
  const configContent = {
    "version": "1.0.0",
    "framework": "jester",
    "description": "Jester storytelling framework configuration for Cursor IDE",
    "agents": {
      "@jester": {
        "description": "Main story generation and management agent",
        "commands": ["generate", "manage", "organize", "structure"],
        "priority": "high",
        "autoActivate": true,
        "context": "project-wide"
      },
      "@muse": {
        "description": "Creative inspiration and brainstorming agent",
        "commands": ["inspire", "brainstorm", "ideate", "create"],
        "priority": "medium",
        "autoActivate": false,
        "context": "creative"
      },
      "@write": {
        "description": "Content creation and editing agent",
        "commands": ["write", "create", "compose", "draft"],
        "priority": "high",
        "autoActivate": true,
        "context": "content"
      },
      "@edit": {
        "description": "Story refinement and revision agent",
        "commands": ["edit", "revise", "refine", "polish"],
        "priority": "high",
        "autoActivate": true,
        "context": "revision"
      },
      "@validate": {
        "description": "Quality assurance and testing agent",
        "commands": ["validate", "test", "check", "verify"],
        "priority": "medium",
        "autoActivate": false,
        "context": "quality"
      },
      "@publish": {
        "description": "Final publication and distribution agent",
        "commands": ["publish", "deploy", "release", "distribute"],
        "priority": "low",
        "autoActivate": false,
        "context": "publication"
      }
    },
    "settings": {
      "autoConvert": true,
      "backupOriginals": true,
      "validateOnSave": true,
      "enableAgentShortcuts": true,
      "showAgentSuggestions": true
    },
    "paths": {
      "framework": ".jester/",
      "cursor": ".cursor/",
      "stories": "stories/",
      "assets": "assets/",
      "output": "output/"
    },
    "features": {
      "mdcSupport": true,
      "agentIntegration": true,
      "contextAwareness": true,
      "autoCompletion": true
    }
  };
  
  fs.writeFileSync(configPath, JSON.stringify(configContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created cursor-config.json'));
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

// Export the main conversion function
module.exports = {
  convertForCursor
};

// If run directly, execute the conversion
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node cursor.js <sourceDir> <targetDir>');
    process.exit(1);
  }
  
  convertForCursor(args[0], args[1])
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}
