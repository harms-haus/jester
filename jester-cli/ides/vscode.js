#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * VS Code IDE Converter
 * 
 * Converts Jester framework files to VS Code-specific formats:
 * - Creates .vscode/ directory with workspace settings
 * - Creates settings.json for Jester-specific configurations
 * - Creates extensions.json for recommended extensions
 * - Creates tasks.json for Jester workflow tasks
 * - Creates launch.json for debugging configurations
 */

/**
 * Convert Jester framework files for VS Code IDE
 * @param {string} sourceDir - Source directory containing .jester files
 * @param {string} targetDir - Target directory (usually .jester)
 * @returns {Promise<boolean>} - Success status
 */
async function convertForVSCode(sourceDir, targetDir) {
  try {
    console.log(chalk.blue('🎯 Converting files for VS Code IDE...'));
    
    // Create .vscode directory structure at project root level
    const projectRoot = path.dirname(targetDir);
    const vscodeDir = path.join(projectRoot, '.vscode');
    await createVSCodeDirectoryStructure(vscodeDir);
    
    // Create VS Code configuration files
    await createVSCodeSettings(vscodeDir);
    await createVSCodeExtensions(vscodeDir);
    await createVSCodeTasks(vscodeDir);
    await createVSCodeLaunch(vscodeDir);
    
    // Create workspace-specific files
    await createWorkspaceFiles(projectRoot);
    
    console.log(chalk.green('✅ VS Code conversion completed successfully!'));
    return true;
    
  } catch (error) {
    console.error(chalk.red('❌ VS Code conversion failed:'), error.message);
    return false;
  }
}

/**
 * Create VS Code directory structure
 */
async function createVSCodeDirectoryStructure(vscodeDir) {
  console.log(chalk.gray('📁 Creating .vscode directory structure...'));
  
  // Create main .vscode directory
  fs.mkdirSync(vscodeDir, { recursive: true });
  console.log(chalk.green('  ✅ Created .vscode/'));
}

/**
 * Create VS Code settings.json
 */
async function createVSCodeSettings(vscodeDir) {
  console.log(chalk.gray('⚙️  Creating settings.json...'));
  
  const settingsPath = path.join(vscodeDir, 'settings.json');
  const settingsContent = {
    "// Jester Framework Settings": "Configuration for Jester storytelling framework",
    "files.associations": {
      "*.jester": "markdown",
      "*.story": "markdown"
    },
    "files.exclude": {
      "**/.jester/output/**": true,
      "**/.jester/temp/**": true
    },
    "search.exclude": {
      "**/.jester/output/**": true,
      "**/.jester/temp/**": true,
      "**/node_modules/**": true
    },
    "markdown.preview.breaks": true,
    "markdown.preview.linkify": true,
    "markdown.extension.toc.levels": "1..6",
    "markdown.extension.toc.orderedList": false,
    "markdown.extension.toc.updateOnSave": true,
    "editor.wordWrap": "on",
    "editor.wordWrapColumn": 80,
    "editor.rulers": [80, 120],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": true
    },
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "emmet.includeLanguages": {
      "markdown": "html"
    },
    "// Jester-specific settings": "Custom settings for Jester framework",
    "jester.agents.enabled": [
      "@jester",
      "@muse", 
      "@write",
      "@edit",
      "@validate",
      "@publish"
    ],
    "jester.autoValidate": true,
    "jester.autoSave": true,
    "jester.previewMode": "live"
  };
  
  fs.writeFileSync(settingsPath, JSON.stringify(settingsContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created settings.json'));
}

/**
 * Create VS Code extensions.json
 */
async function createVSCodeExtensions(vscodeDir) {
  console.log(chalk.gray('🔌 Creating extensions.json...'));
  
  const extensionsPath = path.join(vscodeDir, 'extensions.json');
  const extensionsContent = {
    "recommendations": [
      "yzhang.markdown-all-in-one",
      "davidanson.vscode-markdownlint",
      "bierner.markdown-mermaid",
      "ms-vscode.vscode-json",
      "redhat.vscode-yaml",
      "ms-vscode.vscode-typescript-next",
      "bradlc.vscode-tailwindcss",
      "esbenp.prettier-vscode",
      "ms-vscode.vscode-eslint",
      "formulahendry.auto-rename-tag",
      "christian-kohler.path-intellisense",
      "ms-vscode.vscode-json",
      "ms-vscode.hexeditor",
      "ms-vscode.vscode-json"
    ],
    "unwantedRecommendations": [
      "ms-vscode.vscode-typescript"
    ]
  };
  
  fs.writeFileSync(extensionsPath, JSON.stringify(extensionsContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created extensions.json'));
}

/**
 * Create VS Code tasks.json
 */
async function createVSCodeTasks(vscodeDir) {
  console.log(chalk.gray('📋 Creating tasks.json...'));
  
  const tasksPath = path.join(vscodeDir, 'tasks.json');
  const tasksContent = {
    "version": "2.0.0",
    "tasks": [
      {
        "label": "Jester: Initialize Project",
        "type": "shell",
        "command": "npx",
        "args": ["jester-cli", "init"],
        "group": "build",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        },
        "problemMatcher": []
      },
      {
        "label": "Jester: Convert Files",
        "type": "shell",
        "command": "npx",
        "args": ["jester-cli", "convert", "--ide=vscode"],
        "group": "build",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        },
        "problemMatcher": []
      },
      {
        "label": "Jester: Validate Project",
        "type": "shell",
        "command": "npx",
        "args": ["jester-cli", "validate"],
        "group": "test",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        },
        "problemMatcher": []
      },
      {
        "label": "Jester: Show Configuration",
        "type": "shell",
        "command": "npx",
        "args": ["jester-cli", "config", "--show"],
        "group": "build",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        },
        "problemMatcher": []
      },
      {
        "label": "Jester: Edit Configuration",
        "type": "shell",
        "command": "npx",
        "args": ["jester-cli", "config", "--edit"],
        "group": "build",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        },
        "problemMatcher": []
      }
    ]
  };
  
  fs.writeFileSync(tasksPath, JSON.stringify(tasksContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created tasks.json'));
}

/**
 * Create VS Code launch.json
 */
async function createVSCodeLaunch(vscodeDir) {
  console.log(chalk.gray('🚀 Creating launch.json...'));
  
  const launchPath = path.join(vscodeDir, 'launch.json');
  const launchContent = {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Jester: Debug CLI",
        "type": "node",
        "request": "launch",
        "program": "${workspaceFolder}/node_modules/.bin/jester-cli",
        "args": ["--test"],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
        "skipFiles": ["<node_internals>/**"]
      },
      {
        "name": "Jester: Debug Init",
        "type": "node",
        "request": "launch",
        "program": "${workspaceFolder}/node_modules/.bin/jester-cli",
        "args": ["init"],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
        "skipFiles": ["<node_internals>/**"]
      },
      {
        "name": "Jester: Debug Convert",
        "type": "node",
        "request": "launch",
        "program": "${workspaceFolder}/node_modules/.bin/jester-cli",
        "args": ["convert", "--ide=vscode"],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
        "skipFiles": ["<node_internals>/**"]
      }
    ]
  };
  
  fs.writeFileSync(launchPath, JSON.stringify(launchContent, null, 2), 'utf8');
  console.log(chalk.green('  ✅ Created launch.json'));
}

/**
 * Create workspace-specific files
 */
async function createWorkspaceFiles(targetDir) {
  console.log(chalk.gray('📄 Creating workspace files...'));
  
  // Create .vscode-workspace file
  const workspacePath = path.join(targetDir, 'jester.code-workspace');
  const workspaceContent = {
    "folders": [
      {
        "name": "Jester Framework",
        "path": "."
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
        "**/.jester/temp/**": true
      },
      "search.exclude": {
        "**/.jester/output/**": true,
        "**/.jester/temp/**": true
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
  console.log(chalk.green('  ✅ Created jester.code-workspace'));
  
  // Create VS Code specific README
  const readmePath = path.join(targetDir, '.vscode', 'README.md');
  const readmeContent = `# VS Code Configuration for Jester Framework

This directory contains VS Code-specific configuration files for the Jester storytelling framework.

## Files

- \`settings.json\` - Workspace settings and Jester-specific configurations
- \`extensions.json\` - Recommended extensions for Jester development
- \`tasks.json\` - Predefined tasks for common Jester operations
- \`launch.json\` - Debug configurations for Jester CLI tools

## Usage

1. **Open the workspace**: Use \`jester.code-workspace\` to open the complete Jester project
2. **Install recommended extensions**: VS Code will prompt you to install recommended extensions
3. **Use tasks**: Press \`Ctrl+Shift+P\` and type "Tasks: Run Task" to access Jester tasks
4. **Debug**: Use the debug configurations to debug Jester CLI tools

## Tasks

- **Jester: Initialize Project** - Run \`npx jester-cli init\`
- **Jester: Convert Files** - Run \`npx jester-cli convert --ide=vscode\`
- **Jester: Validate Project** - Run \`npx jester-cli validate\`
- **Jester: Show Configuration** - Run \`npx jester-cli config --show\`
- **Jester: Edit Configuration** - Run \`npx jester-cli config --edit\`

## Agent Usage

In VS Code, you can use the Jester agents by typing their names in comments or documentation:

- \`@jester\` - Main story generation and management
- \`@muse\` - Creative inspiration and brainstorming
- \`@write\` - Content creation and editing
- \`@edit\` - Story refinement and revision
- \`@validate\` - Quality assurance and testing
- \`@publish\` - Final publication and distribution
`;
  
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log(chalk.green('  ✅ Created .vscode/README.md'));
}

// Export the main conversion function
module.exports = {
  convertForVSCode
};

// If run directly, execute the conversion
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node vscode.js <sourceDir> <targetDir>');
    process.exit(1);
  }
  
  convertForVSCode(args[0], args[1])
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}
