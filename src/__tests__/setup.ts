/**
 * Jest test setup file
 */

import * as fs from 'fs-extra';
import * as path from 'path';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore console.log in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Set test timeout
jest.setTimeout(10000);

// Clean up test artifacts after each test
afterEach(async () => {
  try {
    // Clean up debug log
    const debugLogPath = path.join(process.cwd(), '.ai', 'debug-log.md');
    if (await fs.pathExists(debugLogPath)) {
      await fs.remove(debugLogPath);
    }
    
    // Clean up test-generated context files
    const contextsDir = path.join(process.cwd(), 'contexts');
    if (await fs.pathExists(contextsDir)) {
      const files = await fs.readdir(contextsDir);
      for (const file of files) {
        if (file.startsWith('context_') && file.endsWith('.yaml')) {
          await fs.remove(path.join(contextsDir, file));
        }
      }
    }
  } catch (error) {
    // Ignore cleanup errors
  }
});
