#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build script for jester-story-framework package
 * 
 * This script temporarily copies the .jester/ framework files from the main project
 * into the package directory for distribution, then cleans up after build.
 */

const SOURCE_DIR = path.join(__dirname, '..', '..', '.jester');
const TARGET_DIR = path.join(__dirname, '..', '.jester');

function build() {
  console.log('🔨 Building jester-story-framework package...');
  
  // Check if source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('❌ Error: Source .jester directory not found!');
    console.error('   Make sure you\'re running this from the jester project root.');
    console.error('   Expected source:', SOURCE_DIR);
    process.exit(1);
  }

  // Remove existing target directory
  if (fs.existsSync(TARGET_DIR)) {
    console.log('🧹 Removing existing .jester directory...');
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  }

  // Create target directory
  console.log('📁 Creating .jester directory...');
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // Copy framework files
  console.log('📋 Copying framework files...');
  copyFrameworkFiles(SOURCE_DIR, TARGET_DIR);
  
  console.log('✅ Package build complete!');
  console.log('   Framework files copied to package directory.');
  console.log('   Ready for npm publish or local testing.');
}

function cleanup() {
  console.log('🧹 Cleaning up temporary files...');
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
    console.log('✅ Cleanup complete!');
  }
}

function copyFrameworkFiles(source, target) {
  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const srcPath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyFrameworkFiles(srcPath, targetPath);
    } else {
      fs.copyFileSync(srcPath, targetPath);
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--cleanup')) {
  cleanup();
} else if (args.includes('--build-and-cleanup')) {
  build();
  cleanup();
} else {
  // Default: just build
  build();
}

