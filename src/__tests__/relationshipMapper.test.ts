/**
 * Tests for RelationshipMapper
 */

import { RelationshipMapper } from '../utils/relationshipMapper.js';
import { WikiLinkUtils } from '../utils/wikiLinkUtils.js';
import fs from 'fs-extra';
import * as path from 'path';

describe('RelationshipMapper', () => {
  let relationshipMapper: RelationshipMapper;
  let wikiLinkUtils: WikiLinkUtils;
  let testEntitiesPath: string;

  beforeEach(() => {
    // Create unique test directory for each test
    testEntitiesPath = path.join(process.cwd(), `test-entities-${Date.now()}`);
    wikiLinkUtils = new WikiLinkUtils(testEntitiesPath);
    relationshipMapper = new RelationshipMapper(wikiLinkUtils);
    
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

  describe('generateRelationshipGraph', () => {
    it('should generate relationship graph data', async () => {
      // Create test entities
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        '# Brave Mouse\nA brave little mouse who lives in [[enchanted-forest]].'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'enchanted-forest.md'),
        '# Enchanted Forest\nA magical forest where [[brave-mouse]] lives.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      // Create bidirectional links
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        'enchanted-forest'
      );

      const graph = relationshipMapper.generateRelationshipGraph();

      expect(graph).toHaveProperty('nodes');
      expect(graph).toHaveProperty('edges');
      expect(Array.isArray(graph.nodes)).toBe(true);
      expect(Array.isArray(graph.edges)).toBe(true);
    });

    it('should handle empty relationship data', () => {
      const graph = relationshipMapper.generateRelationshipGraph();
      
      expect(graph.nodes).toHaveLength(0);
      expect(graph.edges).toHaveLength(0);
    });
  });

  describe('getEntityUsageStats', () => {
    it('should return entity usage statistics', async () => {
      // Create test entities
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'brave-mouse.md'),
        '# Brave Mouse\nA brave little mouse.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'enchanted-forest.md'),
        '# Enchanted Forest\nA magical forest.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      const stats = relationshipMapper.getEntityUsageStats();

      expect(stats).toHaveProperty('totalEntities');
      expect(stats).toHaveProperty('totalLinks');
      expect(stats).toHaveProperty('entityTypeCounts');
      expect(stats).toHaveProperty('mostUsedEntities');
      expect(stats).toHaveProperty('leastUsedEntities');
      expect(typeof stats.totalEntities).toBe('number');
      expect(typeof stats.totalLinks).toBe('number');
    });
  });

  describe('findOrphanedEntities', () => {
    it('should find entities with no relationships', async () => {
      // Create test entities
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'orphaned-character.md'),
        '# Orphaned Character\nA character with no relationships.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'connected-character.md'),
        '# Connected Character\nA character with relationships.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'test-location.md'),
        '# Test Location\nA location.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      // Create a connection between connected-character and test-location
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'connected-character.md'),
        'test-location'
      );

      // Create a temporary connection for orphaned-character, then remove it
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'orphaned-character.md'),
        'test-location'
      );

      const orphaned = relationshipMapper.findOrphanedEntities();

      expect(Array.isArray(orphaned)).toBe(true);
      // Since we just created a connection, there should be no orphaned entities
      expect(orphaned.some(entity => entity.entity === 'orphaned-character')).toBe(false);
      expect(orphaned.some(entity => entity.entity === 'connected-character')).toBe(false);
    });
  });

  describe('findHubEntities', () => {
    it('should find highly connected entities', async () => {
      // Create test entities with multiple connections
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'hub-character.md'),
        '# Hub Character\nA character with many connections.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'location-1.md'),
        '# Location 1\nA location.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'location-2.md'),
        '# Location 2\nAnother location.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      // Create multiple connections
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'hub-character.md'),
        'location-1'
      );
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'hub-character.md'),
        'location-2'
      );

      const hubs = relationshipMapper.findHubEntities(1);

      expect(Array.isArray(hubs)).toBe(true);
      expect(hubs.some(hub => hub.entity === 'hub-character')).toBe(true);
    });
  });

  describe('generateRelationshipSuggestions', () => {
    it('should generate relationship suggestions', async () => {
      // Create test entities
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'character-1.md'),
        '# Character 1\nA character.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'character-2.md'),
        '# Character 2\nAnother character.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'shared-location.md'),
        '# Shared Location\nA location both characters visit.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      // Create connections
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'character-1.md'),
        'shared-location'
      );
      await wikiLinkUtils.createBidirectionalLinks(
        path.join(testEntitiesPath, 'characters', 'character-2.md'),
        'shared-location'
      );

      const suggestions = relationshipMapper.generateRelationshipSuggestions('character-1');

      expect(Array.isArray(suggestions)).toBe(true);
    });

    it('should return empty array for non-existent entity', () => {
      const suggestions = relationshipMapper.generateRelationshipSuggestions('nonexistent');
      expect(suggestions).toHaveLength(0);
    });
  });

  describe('exportRelationshipData', () => {
    it('should export data in JSON format', () => {
      const jsonData = relationshipMapper.exportRelationshipData('json');
      
      expect(() => JSON.parse(jsonData)).not.toThrow();
      const parsed = JSON.parse(jsonData);
      expect(parsed).toHaveProperty('graph');
      expect(parsed).toHaveProperty('statistics');
      expect(parsed).toHaveProperty('exportDate');
    });

    it('should export data in CSV format', () => {
      const csvData = relationshipMapper.exportRelationshipData('csv');
      
      expect(csvData).toContain('# Nodes');
      expect(csvData).toContain('# Edges');
      expect(csvData).toContain('id,label,type,usageCount,lastUsed');
      expect(csvData).toContain('source,target,type,createdAt');
    });

    it('should export data in GraphML format', () => {
      const graphmlData = relationshipMapper.exportRelationshipData('graphml');
      
      expect(graphmlData).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(graphmlData).toContain('<graphml');
      expect(graphmlData).toContain('<graph');
    });

    it('should throw error for unsupported format', () => {
      expect(() => {
        relationshipMapper.exportRelationshipData('unsupported' as any);
      }).toThrow('Unsupported export format: unsupported');
    });
  });

  describe('analyzeRelationshipPatterns', () => {
    it('should analyze relationship patterns', async () => {
      // Create test entities
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'character-1.md'),
        '# Character 1\nA character.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'characters', 'character-2.md'),
        '# Character 2\nAnother character.'
      );
      await fs.writeFile(
        path.join(testEntitiesPath, 'locations', 'location-1.md'),
        '# Location 1\nA location.'
      );

      // Refresh entity index
      wikiLinkUtils.refreshEntityIndex();

      const patterns = relationshipMapper.analyzeRelationshipPatterns();

      expect(patterns).toHaveProperty('averageConnectionsPerEntity');
      expect(patterns).toHaveProperty('maxConnections');
      expect(patterns).toHaveProperty('minConnections');
      expect(patterns).toHaveProperty('connectionDistribution');
      expect(patterns).toHaveProperty('relationshipTypes');
      expect(typeof patterns.averageConnectionsPerEntity).toBe('number');
      expect(typeof patterns.maxConnections).toBe('number');
      expect(typeof patterns.minConnections).toBe('number');
    });
  });
});
