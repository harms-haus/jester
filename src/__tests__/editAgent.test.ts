/**
 * Tests for EditAgent
 */

import { EditAgent, EditAgentOptions, EditOperation } from '../agents/editAgent.js';
import fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';

describe('EditAgent', () => {
  let editAgent: EditAgent;
  let testDir: string;
  let testContextFile: string;
  let testOutlineFile: string;
  let testStoryFile: string;

  beforeEach(() => {
    editAgent = new EditAgent();
    testDir = path.join(process.cwd(), 'test-edit-files');
    
    // Create test files
    testContextFile = path.join(testDir, 'test-context.yaml');
    testOutlineFile = path.join(testDir, 'test-outline.md');
    testStoryFile = path.join(testDir, 'test-story.md');

    // Ensure test directory exists
    fs.ensureDirSync(testDir);
  });

  afterEach(() => {
    // Clean up test files
    if (fs.pathExistsSync(testDir)) {
      fs.removeSync(testDir);
    }
  });

  describe('editFile', () => {
    it('should edit YAML context file successfully', async () => {
      // Create test context file
      const testContext = {
        title: 'Original Title',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        entities: {
          characters: ['Hero', 'Mentor'],
          locations: ['Forest', 'Castle'],
          items: ['Sword', 'Shield']
        },
        themes: ['Courage', 'Friendship'],
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      await fs.writeFile(testContextFile, yaml.stringify(testContext), 'utf-8');

      const options: EditAgentOptions = {
        filePath: testContextFile,
        editInstructions: 'replace: title -> New Adventure Title'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(true);
      expect(result.message).toContain('File edited successfully');

      // Verify the file was actually modified
      const modifiedContent = await fs.readFile(testContextFile, 'utf-8');
      const modifiedData = yaml.parse(modifiedContent);
      expect(modifiedData.title).toBe('New Adventure Title');
    });

    it('should add character to YAML context file', async () => {
      const testContext = {
        title: 'Test Story',
        entities: {
          characters: ['Hero', 'Mentor'],
          locations: ['Forest'],
          items: ['Sword']
        },
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      await fs.writeFile(testContextFile, yaml.stringify(testContext), 'utf-8');

      const options: EditAgentOptions = {
        filePath: testContextFile,
        editInstructions: 'add: entities.characters -> New Character'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(true);

      // Verify the character was added
      const modifiedContent = await fs.readFile(testContextFile, 'utf-8');
      const modifiedData = yaml.parse(modifiedContent);
      expect(modifiedData.entities.characters).toContain('New Character');
      expect(modifiedData.entities.characters).toHaveLength(3);
    });

    it('should remove character from YAML context file', async () => {
      const testContext = {
        title: 'Test Story',
        entities: {
          characters: ['Hero', 'Mentor', 'Villain'],
          locations: ['Forest'],
          items: ['Sword']
        },
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      await fs.writeFile(testContextFile, yaml.stringify(testContext), 'utf-8');

      const options: EditAgentOptions = {
        filePath: testContextFile,
        editInstructions: 'remove: entities.characters -> Villain'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(true);

      // Verify the character was removed
      const modifiedContent = await fs.readFile(testContextFile, 'utf-8');
      const modifiedData = yaml.parse(modifiedContent);
      expect(modifiedData.entities.characters).not.toContain('Villain');
      expect(modifiedData.entities.characters).toHaveLength(2);
    });

    it('should edit Markdown outline file successfully', async () => {
      const testOutline = `# Test Story Outline

## Characters
- Hero
- Mentor

## Plot Points
1. The hero begins their journey
2. They meet a wise mentor
3. They face their greatest challenge

## Themes
- Courage
- Friendship`;

      await fs.writeFile(testOutlineFile, testOutline, 'utf-8');

      const options: EditAgentOptions = {
        filePath: testOutlineFile,
        editInstructions: 'replace: Test Story Outline -> Amazing Adventure Outline'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(true);

      // Verify the file was modified
      const modifiedContent = await fs.readFile(testOutlineFile, 'utf-8');
      expect(modifiedContent).toContain('Amazing Adventure Outline');
      expect(modifiedContent).not.toContain('Test Story Outline');
    });

    it('should create backup file when requested', async () => {
      const testContext = {
        title: 'Original Title',
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      await fs.writeFile(testContextFile, yaml.stringify(testContext), 'utf-8');

      const options: EditAgentOptions = {
        filePath: testContextFile,
        editInstructions: 'replace: title -> New Title',
        createBackup: true
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(true);
      expect(result.data?.backupCreated).toBe(true);

      // Check that backup file exists
      const backupFiles = fs.readdirSync(testDir).filter(file => file.includes('.backup.'));
      expect(backupFiles.length).toBeGreaterThan(0);
    });

    it('should return error for non-existent file', async () => {
      const options: EditAgentOptions = {
        filePath: 'non-existent-file.yaml',
        editInstructions: 'replace: title -> New Title'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('File not found');
    });

    it('should return error when file path is not provided', async () => {
      const options: EditAgentOptions = {
        editInstructions: 'replace: title -> New Title'
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('File path is required');
    });

    it('should return error when edit instructions are not provided', async () => {
      const options: EditAgentOptions = {
        filePath: testContextFile
      };

      const result = await editAgent.editFile(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Edit instructions are required');
    });
  });

  describe('parseEditInstructions', () => {
    it('should parse replace instructions correctly', () => {
      const instructions = 'replace: title -> New Title';
      const operations = (editAgent as any).parseEditInstructions(instructions, 'yaml');
      
      expect(operations).toHaveLength(1);
      expect(operations[0]).toEqual({
        type: 'replace',
        target: 'title',
        value: 'New Title',
        oldValue: 'title'
      });
    });

    it('should parse add instructions correctly', () => {
      const instructions = 'add: characters -> New Character';
      const operations = (editAgent as any).parseEditInstructions(instructions, 'yaml');
      
      expect(operations).toHaveLength(1);
      expect(operations[0]).toEqual({
        type: 'add',
        target: 'characters',
        value: 'New Character'
      });
    });

    it('should parse remove instructions correctly', () => {
      const instructions = 'remove: characters -> Old Character';
      const operations = (editAgent as any).parseEditInstructions(instructions, 'yaml');
      
      expect(operations).toHaveLength(1);
      expect(operations[0]).toEqual({
        type: 'remove',
        target: 'characters',
        value: 'Old Character'
      });
    });

    it('should parse update instructions correctly', () => {
      const instructions = 'update: plot_point.1.description -> New description';
      const operations = (editAgent as any).parseEditInstructions(instructions, 'yaml');
      
      expect(operations).toHaveLength(1);
      expect(operations[0]).toEqual({
        type: 'update',
        target: 'plot_point.1.description',
        value: 'New description'
      });
    });

    it('should parse multiple instructions', () => {
      const instructions = `replace: title -> New Title
add: characters -> New Character
remove: themes -> Old Theme`;
      const operations = (editAgent as any).parseEditInstructions(instructions, 'yaml');
      
      expect(operations).toHaveLength(3);
      expect(operations[0].type).toBe('replace');
      expect(operations[1].type).toBe('add');
      expect(operations[2].type).toBe('remove');
    });
  });

  describe('getEditHelp', () => {
    it('should return help information', () => {
      const result = editAgent.getEditHelp();

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('usage');
      expect(result.data).toHaveProperty('options');
      expect(result.data).toHaveProperty('instructions');
      expect(result.data).toHaveProperty('examples');
    });
  });
});
