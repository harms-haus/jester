#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Jester CLI Initialization Tool
 * 
 * This tool initializes a new Jester project by copying the framework files
 * to the current working directory.
 */

const FRAMEWORK_SOURCE = path.join(__dirname, '..', '.jester');
const TARGET_DIR = '.jester';

function main() {
  console.log('🎭 Jester CLI Initializer');
  console.log('=====================================\n');

  // Check if framework source exists
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error('❌ Error: Framework source not found!');
    console.error('   The package appears to be corrupted or incomplete.');
    console.error('   Please reinstall the package: npm uninstall jester-cli && npm install jester-cli');
    process.exit(1);
  }

  // Check if .jester directory already exists
  if (fs.existsSync(TARGET_DIR)) {
    console.log('⚠️  Warning: .jester directory already exists!');
    console.log('   This tool will not overwrite existing files.');
    console.log('   If you want to reinitialize, please remove the .jester directory first.\n');
    process.exit(1);
  }

  try {
    // Create .jester directory
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log('✅ Created .jester directory');

    // Copy framework files
    copyFrameworkFiles(FRAMEWORK_SOURCE, TARGET_DIR);
    
    console.log('\n🎉 Jester framework initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Use @jester in your IDE to start creating stories');
    console.log('2. The @jester agent will help you discover and import existing content');
    console.log('3. Run @jester and select "Import Content" to scan for existing stories');
    console.log('\nHappy storytelling! 🎭');

  } catch (error) {
    console.error('❌ Error initializing Jester framework:', error.message);
    process.exit(1);
  }
}

function copyFrameworkFiles(source, target) {
  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      // Create directory and copy contents
      fs.mkdirSync(targetPath, { recursive: true });
      console.log(`📁 Created directory: ${item}/`);
      copyFrameworkFiles(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`📄 Copied file: ${item}`);
    }
  }
}

// Handle test mode
if (process.argv.includes('--test')) {
  console.log('🧪 Running in test mode...');
  // Test mode - just verify the framework files exist
  if (!fs.existsSync(FRAMEWORK_SOURCE)) {
    console.error('❌ Framework source directory not found:', FRAMEWORK_SOURCE);
    process.exit(1);
  }
  console.log('✅ Framework source directory found');
  console.log('✅ Test passed');
  process.exit(0);
}

// Run the main initialization
main();
