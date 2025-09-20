/**
 * Unit tests for FileUtils
 */

import { FileUtils } from '../utils/fileUtils';
import { StoryContext, StoryOutline, Story } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('FileUtils', () => {
  let fileUtils: FileUtils;
  const testDir = path.join(process.cwd(), 'test-temp');
  const createdFiles: string[] = [];

  beforeEach(() => {
    fileUtils = new FileUtils();
    createdFiles.length = 0; // Clear the array
  });

  afterEach(async () => {
    // Cleanup specific files created during tests
    for (const file of createdFiles) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    }
    
    // Cleanup test directory if it exists
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
    
    // Cleanup any test files in contexts directory
    const contextsDir = path.join(process.cwd(), 'contexts');
    if (await fs.pathExists(contextsDir)) {
      const files = await fs.readdir(contextsDir);
      for (const file of files) {
        if (file.startsWith('test-') || file.includes('test-story')) {
          await fs.remove(path.join(contextsDir, file));
        }
      }
    }
  });

  describe('createContextFile', () => {
    it('should create context file from template', async () => {
      const context: StoryContext = {
        title: 'Test Story',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        entities: {
          characters: [],
          locations: [],
          items: []
        },
        plot_template: 'heroes_journey',
        plot_points: [],
        location_progression: [],
        morals: ['Be kind to others'],
        themes: ['Friendship'],
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      const filePath = await fileUtils.createContextFile(context);
      createdFiles.push(filePath); // Track created file
      
      expect(await fs.pathExists(filePath)).toBe(true);
      expect(filePath).toContain('test-story');
    });
  });

  describe('validateFile', () => {
    it('should validate existing file', async () => {
      const testFile = path.join(testDir, 'test.yaml');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'title: "Test"\ndescription: "Test file"');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(true);
    });

    it('should return false for non-existent file', async () => {
      const isValid = await fileUtils.validateFile('non-existent.yaml');
      expect(isValid).toBe(false);
    });

    it('should validate YAML file content', async () => {
      const testFile = path.join(testDir, 'test.yaml');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'invalid yaml content: [');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(false);
    });

    it('should validate Markdown file content', async () => {
      const testFile = path.join(testDir, 'test.md');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, '# Test\n\nThis is a test markdown file.');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(true);
    });
  });

  describe('ensureDirectory', () => {
    it('should create directory if it does not exist', async () => {
      const testDirPath = path.join(testDir, 'new-dir');
      
      await fileUtils.ensureDirectory(testDirPath);
      createdFiles.push(testDirPath); // Track created directory
      
      expect(await fs.pathExists(testDirPath)).toBe(true);
    });

    it('should not fail if directory already exists', async () => {
      const testDirPath = path.join(testDir, 'existing-dir');
      await fs.ensureDir(testDirPath);
      createdFiles.push(testDirPath); // Track created directory
      
      await expect(fileUtils.ensureDirectory(testDirPath)).resolves.not.toThrow();
    });
  });

  describe('getFileStats', () => {
    it('should return file stats for existing file', async () => {
      const testFile = path.join(testDir, 'test.txt');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'test content');
      createdFiles.push(testFile); // Track created file
      
      const stats = await fileUtils.getFileStats(testFile);
      
      expect(stats).toBeDefined();
      expect(stats?.isFile()).toBe(true);
    });

    it('should return null for non-existent file', async () => {
      const stats = await fileUtils.getFileStats('non-existent.txt');
      expect(stats).toBeNull();
    });
  });
});
