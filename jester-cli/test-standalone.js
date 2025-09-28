#!/usr/bin/env node

/**
 * Standalone test script for Jester CLI
 * Tests the CLI without requiring external dependencies
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

async function runTest(testName, testFunction) {
  console.log(colorize(`\n🧪 Testing: ${testName}`, 'blue'));
  try {
    await testFunction();
    console.log(colorize(`✅ ${testName} - PASSED`, 'green'));
    return true;
  } catch (error) {
    console.log(colorize(`❌ ${testName} - FAILED`, 'red'));
    console.log(colorize(`   Error: ${error.message}`, 'yellow'));
    return false;
  }
}

async function testFrameworkSource() {
  const frameworkPath = path.join(__dirname, '.jester');
  if (!fs.existsSync(frameworkPath)) {
    throw new Error(`Framework source not found at: ${frameworkPath}`);
  }
  
  const expectedFiles = ['agents', 'docs', 'templates'];
  for (const file of expectedFiles) {
    const filePath = path.join(frameworkPath, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Expected framework file/directory not found: ${file}`);
    }
  }
}

async function testIDEConverters() {
  const idesDir = path.join(__dirname, 'ides');
  if (!fs.existsSync(idesDir)) {
    throw new Error(`IDEs directory not found at: ${idesDir}`);
  }
  
  const expectedConverters = ['cursor.js', 'vscode.js', 'claude.js', 'windsurf.js'];
  for (const converter of expectedConverters) {
    const converterPath = path.join(idesDir, converter);
    if (!fs.existsSync(converterPath)) {
      throw new Error(`IDE converter not found: ${converter}`);
    }
    
    // Test that the converter can be required
    try {
      const converterModule = require(converterPath);
      const ideId = converter.replace('.js', '');
      const functionMap = {
        'cursor': 'convertForCursor',
        'vscode': 'convertForVSCode',
        'claude': 'convertForClaude',
        'windsurf': 'convertForWindsurf'
      };
      
      const functionName = functionMap[ideId];
      if (!functionName || !converterModule[functionName]) {
        throw new Error(`Converter function not found: ${functionName}`);
      }
    } catch (error) {
      throw new Error(`Failed to load converter ${converter}: ${error.message}`);
    }
  }
}

async function testStandaloneCLI() {
  const standalonePath = path.join(__dirname, 'bin', 'jester-init-standalone.js');
  if (!fs.existsSync(standalonePath)) {
    throw new Error(`Standalone CLI not found at: ${standalonePath}`);
  }
  
  // Test that the standalone CLI can be required
  try {
    require(standalonePath);
  } catch (error) {
    throw new Error(`Failed to load standalone CLI: ${error.message}`);
  }
}

async function testPackageStructure() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json not found');
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Check required fields
  if (!packageJson.name || !packageJson.version) {
    throw new Error('package.json missing required fields');
  }
  
  // Check bin entries
  const expectedBins = ['jester-init', 'jester-convert', 'jester-config', 'jester-validate'];
  for (const bin of expectedBins) {
    if (!packageJson.bin || !packageJson.bin[bin]) {
      throw new Error(`Missing bin entry: ${bin}`);
    }
  }
}

async function main() {
  console.log(colorize('🎭 Jester CLI - Standalone Test Suite', 'cyan'));
  console.log(colorize('=====================================', 'gray'));
  
  const tests = [
    ['Framework Source Structure', testFrameworkSource],
    ['IDE Converters', testIDEConverters],
    ['Standalone CLI', testStandaloneCLI],
    ['Package Structure', testPackageStructure]
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const [testName, testFunction] of tests) {
    const success = await runTest(testName, testFunction);
    if (success) passed++;
  }
  
  console.log(colorize(`\n📊 Test Results: ${passed}/${total} tests passed`, passed === total ? 'green' : 'yellow'));
  
  if (passed === total) {
    console.log(colorize('🎉 All tests passed! The CLI is ready to use.', 'green'));
    console.log(colorize('\nTo test the CLI manually:', 'cyan'));
    console.log(colorize('  node bin/jester-init-standalone.js --test', 'white'));
    console.log(colorize('  node bin/jester-init-standalone.js', 'white'));
  } else {
    console.log(colorize('❌ Some tests failed. Please fix the issues above.', 'red'));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(colorize('❌ Test suite failed:', 'red'), error.message);
  process.exit(1);
});



