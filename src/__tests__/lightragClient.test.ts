/**
 * Unit tests for LightRAG Client
 */

import { jest } from '@jest/globals';
import axios from 'axios';
import { LightRAGClient, createLightRAGClient } from '../clients/lightragClient.js';
import { LightRAGClientConfig } from '../types/lightrag.js';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LightRAGClient', () => {
  let client: LightRAGClient;
  let mockAxiosInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    
    const config: LightRAGClientConfig = {
      apiUrl: 'http://localhost:9621',
      apiKey: 'test-api-key',
      timeout: 5000,
      retryAttempts: 2,
      retryDelay: 100
    };

    client = new LightRAGClient(config);
  });

  describe('constructor', () => {
    it('should create client with default configuration', () => {
      const defaultClient = createLightRAGClient();
      expect(defaultClient).toBeInstanceOf(LightRAGClient);
    });

    it('should create client with custom configuration', () => {
      const config: LightRAGClientConfig = {
        apiUrl: 'http://custom-url:8080',
        apiKey: 'custom-key',
        timeout: 10000
      };
      
      const customClient = new LightRAGClient(config);
      expect(customClient).toBeInstanceOf(LightRAGClient);
    });
  });

  describe('healthCheck', () => {
    it('should return true when service is healthy', async () => {
      mockAxiosInstance.get.mockResolvedValue({ status: 200 });

      const result = await client.healthCheck();
      
      expect(result).toBe(true);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health');
    });

    it('should return false when service is unhealthy', async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error('Service unavailable'));

      const result = await client.healthCheck();
      
      expect(result).toBe(false);
    });
  });

  describe('query', () => {
    it('should execute query successfully', async () => {
      const mockResponse = {
        data: {
          response: 'Test response',
          entities: [
            { name: 'Test Entity', type: 'character', description: 'A test entity' }
          ]
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        query: 'test query',
        mode: 'hybrid' as const,
        enable_rerank: true
      };

      const result = await client.query(request);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/query', request);
    });

    it('should handle query errors', async () => {
      mockAxiosInstance.post.mockRejectedValue(new Error('Query failed'));

      const request = {
        query: 'test query'
      };

      await expect(client.query(request)).rejects.toThrow('Query failed');
    });
  });

  describe('uploadDocument', () => {
    it('should upload document successfully', async () => {
      const mockResponse = {
        data: {
          track_id: 'test-track-id',
          status: 'processing'
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        file: new File(['test content'], 'test.txt', { type: 'text/plain' }),
        filename: 'test.txt',
        track_id: 'custom-track-id'
      };

      const result = await client.uploadDocument(request);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/documents/upload',
        expect.any(FormData),
        expect.objectContaining({
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      );
    });
  });

  describe('insertText', () => {
    it('should insert text successfully', async () => {
      const mockResponse = {
        data: {
          track_id: 'test-track-id',
          status: 'processing'
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        content: 'Test content to insert',
        track_id: 'custom-track-id'
      };

      const result = await client.insertText(request);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/documents/text', request);
    });
  });

  describe('getDocumentStatus', () => {
    it('should get document status successfully', async () => {
      const mockResponse = {
        data: {
          track_id: 'test-track-id',
          status: 'completed'
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getDocumentStatus('test-track-id');

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/track_status/test-track-id');
    });
  });

  describe('deleteDocument', () => {
    it('should delete document successfully', async () => {
      mockAxiosInstance.delete.mockResolvedValue({ data: {} });

      await client.deleteDocument('test-doc-id');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/documents/test-doc-id');
    });
  });

  describe('getEntityLabels', () => {
    it('should get entity labels successfully', async () => {
      const mockResponse = {
        data: [
          { name: 'character', type: 'entity_type', count: 10, description: 'Story characters' },
          { name: 'location', type: 'entity_type', count: 5, description: 'Story locations' }
        ]
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getEntityLabels();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/graph/label/list');
    });
  });

  describe('getKnowledgeGraphData', () => {
    it('should get knowledge graph data successfully', async () => {
      const mockResponse = {
        data: {
          entities: [
            {
              entity_name: 'Test Entity',
              entity_type: 'character',
              description: 'A test entity',
              source_id: 'source-1',
              file_path: 'test.md'
            }
          ],
          relationships: [],
          chunks: []
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.getKnowledgeGraphData();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/graphs');
    });
  });

  describe('queryStructuredData', () => {
    it('should query structured data successfully', async () => {
      const mockResponse = {
        data: {
          results: [
            { id: '1', content: 'Test result', score: 0.9 }
          ]
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await client.queryStructuredData('test query');

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/query/data', { query: 'test query' });
    });
  });

  describe('caching', () => {
    it('should cache query results', async () => {
      const mockResponse = {
        data: {
          response: 'Cached response',
          entities: []
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = { query: 'test query' };

      // First call
      await client.query(request);
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);

      // Second call should use cache
      await client.query(request);
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
    });

    it('should clear cache', () => {
      const stats = client.getCacheStats();
      expect(stats.size).toBe(0);
      
      // Clear cache should not throw
      expect(() => client.clearCache()).not.toThrow();
    });
  });

  describe('circuit breaker', () => {
    it('should track circuit breaker state', () => {
      const state = client.getCircuitBreakerState();
      expect(['CLOSED', 'OPEN', 'HALF_OPEN']).toContain(state);
    });
  });

  describe('queryStream', () => {
    it('should handle streaming queries', async () => {
      const mockStream = {
        on: jest.fn()
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockStream });

      const request = { query: 'test query' };
      const onData = jest.fn();
      const onError = jest.fn();
      const onComplete = jest.fn();

      await client.queryStream(request, onData, onError, onComplete);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/query/stream', request, {
        responseType: 'stream'
      });
      expect(mockStream.on).toHaveBeenCalledWith('data', expect.any(Function));
      expect(mockStream.on).toHaveBeenCalledWith('end', expect.any(Function));
      expect(mockStream.on).toHaveBeenCalledWith('error', expect.any(Function));
    });
  });
});

describe('createLightRAGClient', () => {
  it('should create client with environment variables', () => {
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      LIGHTRAG_API_URL: 'http://env-url:8080',
      LIGHTRAG_API_KEY: 'env-api-key'
    };

    const client = createLightRAGClient();
    expect(client).toBeInstanceOf(LightRAGClient);

    process.env = originalEnv;
  });

  it('should create client with custom config overriding env', () => {
    const originalEnv = process.env;
    process.env = {
      ...originalEnv,
      LIGHTRAG_API_URL: 'http://env-url:8080',
      LIGHTRAG_API_KEY: 'env-api-key'
    };

    const customConfig = {
      apiUrl: 'http://custom-url:9090',
      apiKey: 'custom-key'
    };

    const client = createLightRAGClient(customConfig);
    expect(client).toBeInstanceOf(LightRAGClient);

    process.env = originalEnv;
  });
});
