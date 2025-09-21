/**
 * Tests for WikiLinkUtils
 */

import { WikiLinkUtils } from '../utils/wikiLinkUtils.js';
import fs from 'fs-extra';
import * as path from 'path';

describe('WikiLinkUtils', () => {
  let wikiLinkUtils: WikiLinkUtils;
  const testEntitiesPath = path.join(process.cwd(), 'test-entities');

  beforeEach(() => {
    wikiLinkUtils = new WikiLinkUtils(testEntitiesPath);
    // Create test entities directory
    fs.ensureDirSync(testEntitiesPath);
    fs.ensureDirSync(path.join(testEntitiesPath, 'characters'));
    fs.ensureDirSync(path.join(testEntitiesPath, 'locations'));
    fs.ensureDirSync(path.join(testEntitiesPath, 'items'));
  });

  afterEach(() => {
    // Clean up test entities directory
    if (fs.existsSync(testEntitiesPath)) {
      try {
        fs.removeSync(testEntitiesPath);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  });

  describe('parseWikiLinks', () => {
    it('should parse wiki links from content', () => {
      const content = 'This is a story about [[brave-mouse]] who lives in [[enchanted-forest]].';
      const filePath = '/test/file.md';
      
      const links = wikiLinkUtils.parseWikiLinks(content, filePath);
      
      expect(links).toHaveLength(2);
      expect(links[0]).toEqual({
        text: '[[brave-mouse]]',
        entityName: 'brave-mouse',
        startIndex: 22,
        endIndex: 37,
        filePath: '/test/file.md'
      });
      expect(links[1]).toEqual({
        text: '[[enchanted-forest]]',
        entityName: 'enchanted-forest',
        startIndex: 51,
        endIndex: 71,
        filePath: '/test/file.md'
      });
    });

    it('should handle content with no wiki links', () => {
      const content = 'This is a story with no links.';
      const filePath = '/test/file.md';
      
      const links = wikiLinkUtils.parseWikiLinks(content, filePath);
      
      expect(links).toHaveLength(0);
    });

    it('should handle malformed wiki links', () => {
      const content = 'This has [[incomplete and [malformed] links.';
      const filePath = '/test/file.md';
      
      const links = wikiLinkUtils.parseWikiLinks(content, filePath);
      
      expect(links).toHaveLength(0);
    });
  });

  describe('validateWikiLinks', () => {
    beforeEach(async () => {
      // Create test entity files
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        '# Brave Mouse\nA brave little mouse.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'enchanted-forest.md'),
        '# Enchanted Forest\nA magical forest.'
      );
    });

    it('should validate existing wiki links', async () => {
      const links = [
        {
          text: '[[brave-mouse]]',
          entityName: 'brave-mouse',
          startIndex: 0,
          endIndex: 15,
          filePath: '/test/file.md'
        }
      ];

      const result = await wikiLinkUtils.validateWikiLinks(links);
      
      expect(result.isValid).toBe(true);
      expect(result.brokenLinks).toHaveLength(0);
      expect(result.missingEntities).toHaveLength(0);
    });

    it('should detect broken wiki links', async () => {
      const links = [
        {
          text: '[[nonexistent-entity]]',
          entityName: 'nonexistent-entity',
          startIndex: 0,
          endIndex: 22,
          filePath: '/test/file.md'
        }
      ];

      const result = await wikiLinkUtils.validateWikiLinks(links);
      
      expect(result.isValid).toBe(false);
      expect(result.brokenLinks).toHaveLength(1);
      expect(result.missingEntities).toContain('nonexistent-entity');
    });

    it('should provide suggestions for similar entities', async () => {
      // Create test entity first
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        '# Brave Mouse\nA brave little mouse.'
      );

      // Refresh entity index to include the new entity
      wikiLinkUtils.refreshEntityIndex();

      const links = [
        {
          text: '[[brave-mice]]',
          entityName: 'brave-mice',
          startIndex: 0,
          endIndex: 15,
          filePath: '/test/file.md'
        }
      ];

      const result = await wikiLinkUtils.validateWikiLinks(links);
      
      expect(result.suggestions).toContain('brave-mouse');
    });
  });

  describe('createBidirectionalLinks', () => {
    beforeEach(async () => {
      // Create test entity files
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        '# Brave Mouse\nA brave little mouse.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'enchanted-forest.md'),
        '# Enchanted Forest\nA magical forest.'
      );
    });

    it('should create bidirectional links between entities', async () => {
      const sourceFile = path.join(testEntitiesPath, 'characters', 'brave-mouse.md');
      const targetEntity = 'enchanted-forest';

      await wikiLinkUtils.createBidirectionalLinks(sourceFile, targetEntity);

      const relationships = wikiLinkUtils.getEntityRelationships('brave-mouse');
      expect(relationships).toBeDefined();
      expect(relationships!.relationships.linkedTo).toContain('enchanted-forest');
    });
  });

  describe('getEntityRelationships', () => {
    it('should return null for non-existent entity', () => {
      const relationships = wikiLinkUtils.getEntityRelationships('nonexistent');
      expect(relationships).toBeNull();
    });

    it('should return relationships for existing entity', async () => {
      // Create test entity file
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'test-character.md'),
        '# Test Character\nA test character.'
      );

      // Refresh entity index to include the new entity
      wikiLinkUtils.refreshEntityIndex();

      const relationships = wikiLinkUtils.getEntityRelationships('test-character');
      expect(relationships).toBeDefined();
      expect(relationships!.entity).toBe('test-character');
      expect(relationships!.entityType).toBe('character');
    });
  });

  describe('case-insensitive entity lookup', () => {
    beforeEach(async () => {
      // Create test entity files with different cases
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'Brave-Mouse.md'),
        '# Brave Mouse\nA brave little mouse.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'enchanted-forest.md'),
        '# Enchanted Forest\nA magical forest.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'items', 'Magic-Sword.md'),
        '# Magic Sword\nA powerful weapon.'
      );
      
      // Refresh entity index to include the new entities
      wikiLinkUtils.refreshEntityIndex();
    });

    it('should find entities case-insensitively', async () => {
      const testCases = [
        { input: 'brave-mouse', expected: 'Brave-Mouse' },
        { input: 'BRAVE-MOUSE', expected: 'Brave-Mouse' },
        { input: 'Brave-Mouse', expected: 'Brave-Mouse' },
        { input: 'enchanted-forest', expected: 'enchanted-forest' },
        { input: 'ENCHANTED-FOREST', expected: 'enchanted-forest' },
        { input: 'magic-sword', expected: 'Magic-Sword' },
        { input: 'MAGIC-SWORD', expected: 'Magic-Sword' }
      ];

      for (const testCase of testCases) {
        const links = [
          {
            text: `[[${testCase.input}]]`,
            entityName: testCase.input,
            startIndex: 0,
            endIndex: testCase.input.length + 4,
            filePath: '/test/file.md'
          }
        ];

        const result = await wikiLinkUtils.validateWikiLinks(links);
        expect(result.isValid).toBe(true);
        expect(result.brokenLinks).toHaveLength(0);
      }
    });

    it('should preserve original case in entity index', () => {
      // The entity index should store the original case from the filename
      const relationships = wikiLinkUtils.getEntityRelationships('brave-mouse');
      expect(relationships).toBeDefined();
      expect(relationships!.entity).toBe('Brave-Mouse'); // Should preserve original case
    });
  });

  describe('case-preservation in link updates', () => {
    beforeEach(async () => {
      // Create test entity files
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'the-falcon.md'),
        '# The Falcon\nA mysterious character.\nReferences: [[the-falcon]]'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'items', 'spoon.md'),
        '# Spoon\nA simple utensil.\nReferences: [[Spoon]]'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'test-character.md'),
        'The [[the-falcon]] and the [[Spoon]] are connected.'
      );
      
      // Refresh entity index to include the new entities
      wikiLinkUtils.refreshEntityIndex();
    });

    it('should preserve target case when renaming from lower-case to upper-case', async () => {
      const oldName = 'the-falcon';
      const newName = 'Zephyr Falcon';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated with new case
      const filePath = path.join(testEntitiesPath, 'characters', 'the-falcon.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[Zephyr Falcon]]');
      expect(content).not.toContain('[[the-falcon]]');

      // Check that other files were updated too
      const testFile = path.join(testEntitiesPath, 'characters', 'test-character.md');
      const testContent = await fs.readFile(testFile, 'utf-8');
      expect(testContent).toContain('[[Zephyr Falcon]]');
      expect(testContent).not.toContain('[[the-falcon]]');
    });

    it('should preserve target case when renaming from upper-case to lower-case', async () => {
      const oldName = 'spoon';
      const newName = 'wooden spoon';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated with new case
      const filePath = path.join(testEntitiesPath, 'items', 'spoon.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[wooden spoon]]');
      expect(content).not.toContain('[[Spoon]]');

      // Check that other files were updated too
      const testFile = path.join(testEntitiesPath, 'characters', 'test-character.md');
      const testContent = await fs.readFile(testFile, 'utf-8');
      expect(testContent).toContain('[[wooden spoon]]');
      expect(testContent).not.toContain('[[Spoon]]');
    });

    it('should handle context-aware replacement for nearby words', async () => {
      // Create a file with context that should be preserved
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'context-test.md'),
        'Lily used her [[spoon]] to fight. Lily used her wooden [[spoon]] to fight.'
      );

      const oldName = 'spoon';
      const newName = 'wooden spoon';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated correctly
      const filePath = path.join(testEntitiesPath, 'characters', 'context-test.md');
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Should replace:
      // "Lily used her [[spoon]] to fight" -> "Lily used her [[wooden spoon]] to fight"
      // "Lily used her wooden [[spoon]] to fight" -> "Lily used her [[wooden spoon]] to fight"
      expect(content).toContain('Lily used her [[wooden spoon]] to fight.');
      expect(content).toContain('Lily used her [[wooden spoon]] to fight.');
      expect(content).not.toContain('[[spoon]]');
      expect(content).not.toContain('wooden [[wooden spoon]]'); // Should not duplicate "wooden"
    });

    it('should handle multiple case variations in the same file', async () => {
      // Create a file with multiple case variations
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'case-variations.md'),
        'The [[falcon]] and [[Falcon]] and [[FALCON]] are all the same.'
      );

      const oldName = 'falcon';
      const newName = 'Zephyr Falcon';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that all variations were updated
      const filePath = path.join(testEntitiesPath, 'characters', 'case-variations.md');
      const content = await fs.readFile(filePath, 'utf-8');
      
      expect(content).toContain('[[Zephyr Falcon]]');
      expect(content).not.toContain('[[falcon]]');
      expect(content).not.toContain('[[Falcon]]');
      expect(content).not.toContain('[[FALCON]]');
    });
  });

  describe('edge cases for link updates', () => {
    beforeEach(async () => {
      // Create test entity files
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'edge-case.md'),
        'This is a test with [[edge-case]] references.'
      );
      
      // Refresh entity index to include the new entity
      wikiLinkUtils.refreshEntityIndex();
    });

    it('should handle empty entity names', async () => {
      const oldName = '';
      const newName = 'new-name';

      // Should not throw an error
      await expect(wikiLinkUtils.updateLinksForRename(oldName, newName)).resolves.not.toThrow();
    });

    it('should handle special characters in entity names', async () => {
      const oldName = 'edge-case';
      const newName = 'edge_case_v2';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated
      const filePath = path.join(testEntitiesPath, 'characters', 'edge-case.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[edge_case_v2]]');
      expect(content).not.toContain('[[edge-case]]');
    });

    it('should handle very long entity names', async () => {
      const oldName = 'edge-case';
      const newName = 'this-is-a-very-long-entity-name-that-might-cause-issues';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated
      const filePath = path.join(testEntitiesPath, 'characters', 'edge-case.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[this-is-a-very-long-entity-name-that-might-cause-issues]]');
      expect(content).not.toContain('[[edge-case]]');
    });

    it('should handle entity names with numbers', async () => {
      const oldName = 'edge-case';
      const newName = 'edge-case-v2';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated
      const filePath = path.join(testEntitiesPath, 'characters', 'edge-case.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[edge-case-v2]]');
      expect(content).not.toContain('[[edge-case]]');
    });
  });

  describe('updateLinksForRename', () => {
    beforeEach(async () => {
      // Create test entity files
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'old-name.md'),
        '# Old Name\nThis character was renamed.\nReferences: [[old-name]]'
      );
      
      // Refresh entity index to include the new entity
      wikiLinkUtils.refreshEntityIndex();
    });

    it('should update links when entity is renamed', async () => {
      const oldName = 'old-name';
      const newName = 'new-name';

      await wikiLinkUtils.updateLinksForRename(oldName, newName);

      // Check that the file content was updated
      const filePath = path.join(testEntitiesPath, 'characters', 'old-name.md');
      const content = await fs.readFile(filePath, 'utf-8');
      expect(content).toContain('[[new-name]]');
      expect(content).not.toContain('[[old-name]]');
    });
  });

  describe('exportRelationshipData', () => {
    it('should export relationship data', () => {
      const data = wikiLinkUtils.exportRelationshipData();
      
      expect(data).toHaveProperty('relationships');
      expect(data).toHaveProperty('linkData');
      expect(data).toHaveProperty('exportDate');
      expect(data).toHaveProperty('totalEntities');
      expect(data).toHaveProperty('totalLinks');
      expect(Array.isArray(data.relationships)).toBe(true);
      expect(Array.isArray(data.linkData)).toBe(true);
    });
  });
});
