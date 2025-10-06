#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Convert files for Cursor IDE
 * Copies the template file and appends jester.md content
 * @param {string} sourceDir - Source directory (unused, kept for compatibility)
 * @param {string} targetDir - Target directory (unused, kept for compatibility)
 * @returns {boolean} - Success status
 */
async function convertForCursor(sourceDir, targetDir) {
  try {
    // Define paths relative to the script location
    const scriptDir = __dirname;
    const jesterCliDir = path.dirname(scriptDir);
    const projectRoot = path.dirname(jesterCliDir);

    // Source files
    const templateFile = path.join(jesterCliDir, '.jester', '.ides', 'cursor', 'jester.template.mdc');
    const jesterFile = path.join(jesterCliDir, '.jester', 'jester.md');

    // Destination file
    const destDir = path.join(projectRoot, '.cursor', 'rules');
    const destFile = path.join(destDir, 'jester.mdc');

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`Created directory: ${destDir}`);
    }

    // Read the template file
    const templateContent = fs.readFileSync(templateFile, 'utf8');
    
    // Read the jester.md file
    const jesterContent = fs.readFileSync(jesterFile, 'utf8');
    
    // Write the template content to the destination file
    fs.writeFileSync(destFile, templateContent);
    console.log(`Copied template to: ${destFile}`);
    
    // Append the jester.md content to the destination file
    fs.appendFileSync(destFile, '\n\n' + jesterContent);
    console.log(`Appended jester.md content to: ${destFile}`);
    
    console.log('✅ Successfully set up Cursor Jester rule!');
    return true;
  } catch (error) {
    console.error('❌ Error setting up Cursor Jester rule:', error.message);
    return false;
  }
}

// Export the function for use by jester-init.js
module.exports = {
  convertForCursor
};

// Allow script to be run directly
if (require.main === module) {
  convertForCursor().then(success => {
    process.exit(success ? 0 : 1);
  });
}