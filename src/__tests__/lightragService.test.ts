/**
 * Unit tests for LightRAG Service
 */

import { jest } from '@jest/globals';
import { LightRAGService, createLightRAGService } from '../services/lightragService.js';
import { LightRAGServiceConfig } from '../services/lightragService.js';

// Mock the LightRAG client
jest.mock('../clients/lightragClient.js', () => ({
  createLightRAGClient: jest.fn(),
  LightRAGClient: jest.fn()
}));

describe('LightRAGService', () => {
  let service: LightRAGService;
  let mockClient: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock client
    mockClient = {
      healthCheck: jest.fn(),
      query: jest.fn(),
      searchEntities: jest.fn(),
      searchRelationships: jest.fn(),
      getEntityLabels: jest.fn(),
      getKnowledgeGraphData: jest.fn()
    };

    // Mock the client creation
    const { createLightRAGClient } = require('../clients/lightragClient.js');
    createLightRAGClient.mockReturnValue(mockClient);

    const config: LightRAGServiceConfig = {
      enabled: true,
      fallbackMode: true
    };

    service = new LightRAGService(config);
    
    // Manually set the client and health status for testing
    (service as any).client = mockClient;
    (service as any).isHealthy = true;
  });

  describe('constructor', () => {
    it('should create service with default configuration', () => {
      const defaultService = createLightRAGService();
      expect(defaultService).toBeInstanceOf(LightRAGService);
    });

    it('should create service with custom configuration', () => {
      const config: LightRAGServiceConfig = {
        enabled: false,
        fallbackMode: false
      };
      
      const customService = new LightRAGService(config);
      expect(customService).toBeInstanceOf(LightRAGService);
    });
  });

  describe('isAvailable', () => {
    it('should return false when service is disabled', async () => {
      const disabledService = new LightRAGService({ enabled: false, fallbackMode: false });
      const result = await disabledService.isAvailable();
      expect(result).toBe(false);
    });

    it('should return true when service is healthy', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      
      const result = await service.isAvailable();
      
      expect(result).toBe(true);
      expect(mockClient.healthCheck).toHaveBeenCalled();
    });

    it('should return false when service is unhealthy', async () => {
      mockClient.healthCheck.mockResolvedValue(false);
      
      const result = await service.isAvailable();
      
      expect(result).toBe(false);
    });

    it('should return false when health check throws', async () => {
      mockClient.healthCheck.mockRejectedValue(new Error('Health check failed'));
      
      const result = await service.isAvailable();
      
      expect(result).toBe(false);
    });
  });

  describe('searchEntities', () => {
    it('should search entities when service is available', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.query.mockResolvedValue({
        entities: [
          { name: 'Test Entity', type: 'character', description: 'A test entity' }
        ],
        reranked_documents: []
      });

      const result = await service.searchEntities('test query', 5);

      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Test Entity');
      expect(mockClient.query).toHaveBeenCalledWith({
        query: 'test query',
        mode: 'hybrid',
        top_k: 5,
        enable_rerank: true
      });
    });

    it('should return fallback entities when service is unavailable and fallback mode is enabled', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.searchEntities('hero', 5);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]?.name).toBe('Hero');
      expect(result[0]?.type).toBe('character');
    });

    it('should throw error when service is unavailable and fallback mode is disabled', async () => {
      const noFallbackService = new LightRAGService({ enabled: true, fallbackMode: false });
      mockClient.healthCheck.mockResolvedValue(false);

      await expect(noFallbackService.searchEntities('test query')).rejects.toThrow('LightRAG service is not available');
    });

    it('should handle query errors with fallback', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.query.mockRejectedValue(new Error('Query failed'));

      const result = await service.searchEntities('test query', 5);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]?.name).toBe('Hero');
    });
  });

  describe('searchRelationships', () => {
    it('should search relationships when service is available', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.query.mockResolvedValue({
        relationships: [
          { source: 'Hero', target: 'Helper', description: 'works with', weight: 0.8 }
        ]
      });

      const result = await service.searchRelationships('Hero', 'Helper', 5);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]?.source).toBe('Hero');
      expect(result[0]?.target).toBe('Helper');
    });

    it('should return fallback relationships when service is unavailable', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.searchRelationships('Hero', undefined, 5);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]?.source).toBe('Hero');
      expect(result[0]?.target).toBe('Helper');
    });
  });

  describe('getEntityLabels', () => {
    it('should get entity labels when service is available', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.getEntityLabels.mockResolvedValue([
        { name: 'character', type: 'entity_type', count: 10, description: 'Story characters' }
      ]);

      const result = await service.getEntityLabels();

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]?.name).toBe('character');
      expect(mockClient.getEntityLabels).toHaveBeenCalled();
    });

    it('should return fallback entity labels when service is unavailable', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.getEntityLabels();

      expect(result).toHaveLength(3);
      expect(result[0]?.name).toBe('character');
    });
  });

  describe('getKnowledgeGraphData', () => {
    it('should get knowledge graph data when service is available', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.getKnowledgeGraphData.mockResolvedValue({
        entities: [],
        relationships: [],
        chunks: []
      });

      const result = await service.getKnowledgeGraphData();

      expect(result).toEqual({
        entities: [],
        relationships: [],
        chunks: []
      });
      expect(mockClient.getKnowledgeGraphData).toHaveBeenCalled();
    });

    it('should return fallback knowledge graph data when service is unavailable', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.getKnowledgeGraphData();

      expect(result).toEqual({
        entities: [],
        relationships: [],
        chunks: []
      });
    });
  });

  describe('enhanceStoryContext', () => {
    it('should enhance story context when service is available', async () => {
      mockClient.healthCheck.mockResolvedValue(true);
      mockClient.query.mockResolvedValue({
        entities: [
          { name: 'Hero', type: 'character', description: 'Main character' }
        ],
        relationships: [
          { source: 'Hero', target: 'Helper', description: 'works with', weight: 0.8 }
        ]
      });

      const result = await service.enhanceStoryContext('A brave hero', {});

      expect(result.entities.length).toBeGreaterThan(0);
      expect(result.relationships.length).toBeGreaterThan(0);
      expect(result.entities[0]?.name).toBe('Hero');
    });

    it('should return fallback enhancement when service is unavailable', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.enhanceStoryContext('A brave hero', {});

      expect(result.entities.length).toBeGreaterThan(0);
      expect(result.relationships.length).toBeGreaterThan(0);
      expect(result.entities[0]?.name).toBe('Hero');
    });
  });

  describe('getStatus', () => {
    it('should return service status', () => {
      const status = service.getStatus();
      
      expect(status).toHaveProperty('enabled');
      expect(status).toHaveProperty('healthy');
      expect(status).toHaveProperty('fallbackMode');
    });
  });

  describe('fallback methods', () => {
    it('should provide fallback entities for common queries', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.searchEntities('adventure', 3);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('type');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('relevanceScore');
      expect(result[0]).toHaveProperty('relationships');
    });

    it('should provide fallback relationships', async () => {
      mockClient.healthCheck.mockResolvedValue(false);

      const result = await service.searchRelationships('Hero', 'Villain', 3);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('source');
      expect(result[0]).toHaveProperty('target');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('weight');
      expect(result[0]).toHaveProperty('type');
    });
  });
});

describe('createLightRAGService', () => {
  it('should create service with environment variables', () => {
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      LIGHTRAG_ENABLED: 'true',
      LIGHTRAG_FALLBACK_MODE: 'true',
      LIGHTRAG_API_URL: 'http://env-url:8080',
      LIGHTRAG_API_KEY: 'env-api-key'
    };

    const service = createLightRAGService();
    expect(service).toBeInstanceOf(LightRAGService);

    process.env = originalEnv;
  });

  it('should create service with custom config overriding env', () => {
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      LIGHTRAG_ENABLED: 'true',
      LIGHTRAG_FALLBACK_MODE: 'true'
    };

    const customConfig = {
      enabled: false,
      fallbackMode: false
    };

    const service = createLightRAGService(customConfig);
    expect(service).toBeInstanceOf(LightRAGService);

    process.env = originalEnv;
  });
});
