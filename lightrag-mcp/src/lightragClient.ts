/**
 * LightRAG MCP Client Implementation
 * 
 * This client provides a comprehensive interface to the LightRAG API
 * with support for querying, document management, and knowledge graph operations.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  LightRAGClientConfig,
  LightRAGQueryRequest,
  LightRAGQueryResponse,
  LightRAGStreamResponse,
  LightRAGDocumentUploadRequest,
  LightRAGTextInsertRequest,
  LightRAGDocumentResponse,
  LightRAGEntityLabel,
  LightRAGKnowledgeGraphData,
  LightRAGError,
  LightRAGApiError
} from './lightrag.js';

/**
 * Circuit Breaker State
 */
enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

/**
 * Circuit Breaker Implementation
 */
class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;
  private readonly threshold: number;
  private readonly timeout: number;

  constructor(threshold: number = 5, timeout: number = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
  }

  public async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = CircuitBreakerState.HALF_OPEN;
      } else {
        throw new Error('Circuit breaker is OPEN - service unavailable');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = CircuitBreakerState.CLOSED;
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = CircuitBreakerState.OPEN;
    }
  }

  public getState(): CircuitBreakerState {
    return this.state;
  }
}

/**
 * LightRAG MCP Client
 * 
 * Provides a comprehensive interface to the LightRAG API with:
 * - Connection management and authentication
 * - Retry logic with exponential backoff
 * - Circuit breaker pattern for fault tolerance
 * - Caching for frequently accessed data
 * - Error handling and fallback mechanisms
 */
export class LightRAGClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly config: Required<LightRAGClientConfig>;
  private readonly circuitBreaker: CircuitBreaker;
  private readonly cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheTimeout = 300000; // 5 minutes

  constructor(config: LightRAGClientConfig) {
    this.config = {
      apiUrl: config.apiUrl,
      apiKey: config.apiKey || '',
      timeout: config.timeout || 30000,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000,
      enableCircuitBreaker: config.enableCircuitBreaker ?? true,
      circuitBreakerThreshold: config.circuitBreakerThreshold || 5
    };

    this.circuitBreaker = new CircuitBreaker(
      this.config.circuitBreakerThreshold,
      60000 // 1 minute timeout
    );

    this.axiosInstance = axios.create({
      baseURL: this.config.apiUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey })
      }
    });

    this.setupInterceptors();
  }

  /**
   * Setup axios interceptors for retry logic and error handling
   */
  private setupInterceptors(): void {
    // Request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`[LightRAG] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status >= 500 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.retryRequest(originalRequest);
        }
        
        return Promise.reject(this.createApiError(error));
      }
    );
  }

  /**
   * Retry request with exponential backoff
   */
  private async retryRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
      
      console.log(`[LightRAG] Retry attempt ${attempt}/${this.config.retryAttempts} after ${delay}ms`);
      await this.sleep(delay);
      
      try {
        return await this.axiosInstance.request(config);
      } catch (error) {
        if (attempt === this.config.retryAttempts) {
          throw error;
        }
      }
    }
    
    throw new Error('Max retry attempts exceeded');
  }

  /**
   * Create standardized API error
   */
  private createApiError(error: any): LightRAGApiError {
    const apiError = new Error(error.message || 'Unknown API error') as LightRAGApiError;
    apiError.status = error.response?.status;
    apiError.response = error.response?.data;
    apiError.code = error.code;
    return apiError;
  }

  /**
   * Sleep utility for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  /**
   * Set cached data
   */
  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Execute request with circuit breaker protection
   */
  private async executeRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    if (this.config.enableCircuitBreaker) {
      return this.circuitBreaker.execute(requestFn).then(response => response.data);
    }
    
    const response = await requestFn();
    return response.data;
  }

  /**
   * Check if the LightRAG service is healthy
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('[LightRAG] Health check failed:', error);
      return false;
    }
  }

  /**
   * Get circuit breaker state
   */
  public getCircuitBreakerState(): CircuitBreakerState {
    return this.circuitBreaker.getState();
  }

  /**
   * Query the LightRAG system
   */
  public async query(request: LightRAGQueryRequest): Promise<LightRAGQueryResponse> {
    const cacheKey = `query:${JSON.stringify(request)}`;
    const cached = this.getCachedData<LightRAGQueryResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.post('/query', request)
      );
      
      this.setCachedData(cacheKey, response);
      return response;
    } catch (error) {
      console.error('[LightRAG] Query failed:', error);
      throw error;
    }
  }

  /**
   * Query with streaming response
   */
  public async queryStream(
    request: LightRAGQueryRequest,
    onData: (data: LightRAGStreamResponse) => void,
    onError?: (error: Error) => void,
    onComplete?: () => void
  ): Promise<void> {
    try {
      const response = await this.axiosInstance.post('/query/stream', request, {
        responseType: 'stream'
      });

      let buffer = '';
      
      response.data.on('data', (chunk: Buffer) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line) as LightRAGStreamResponse;
              onData(data);
            } catch (parseError) {
              console.warn('[LightRAG] Failed to parse stream data:', line);
            }
          }
        }
      });

      response.data.on('end', () => {
        if (onComplete) onComplete();
      });

      response.data.on('error', (error: Error) => {
        if (onError) onError(error);
      });
    } catch (error) {
      console.error('[LightRAG] Stream query failed:', error);
      if (onError) onError(error as Error);
    }
  }

  /**
   * Upload a document for processing
   */
  public async uploadDocument(request: LightRAGDocumentUploadRequest): Promise<LightRAGDocumentResponse> {
    try {
      const formData = new FormData();
      formData.append('file', request.file as any, request.filename);
      if (request.track_id) {
        formData.append('track_id', request.track_id);
      }

      const response = await this.executeRequest(() =>
        this.axiosInstance.post('/documents/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      );

      return response;
    } catch (error) {
      console.error('[LightRAG] Document upload failed:', error);
      throw error;
    }
  }

  /**
   * Insert text content directly
   */
  public async insertText(request: LightRAGTextInsertRequest): Promise<LightRAGDocumentResponse> {
    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.post('/documents/text', request)
      );

      return response;
    } catch (error) {
      console.error('[LightRAG] Text insertion failed:', error);
      throw error;
    }
  }

  /**
   * Get document processing status
   */
  public async getDocumentStatus(trackId: string): Promise<LightRAGDocumentResponse> {
    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.get(`/track_status/${trackId}`)
      );

      return response;
    } catch (error) {
      console.error('[LightRAG] Document status check failed:', error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  public async deleteDocument(docId: string): Promise<void> {
    try {
      await this.executeRequest(() =>
        this.axiosInstance.delete(`/documents/${docId}`)
      );
    } catch (error) {
      console.error('[LightRAG] Document deletion failed:', error);
      throw error;
    }
  }

  /**
   * Get entity labels from knowledge graph
   */
  public async getEntityLabels(): Promise<LightRAGEntityLabel[]> {
    const cacheKey = 'entity_labels';
    const cached = this.getCachedData<LightRAGEntityLabel[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.get('/graph/label/list')
      );

      this.setCachedData(cacheKey, response);
      return response;
    } catch (error) {
      console.error('[LightRAG] Entity labels fetch failed:', error);
      throw error;
    }
  }

  /**
   * Query knowledge graph data
   */
  public async getKnowledgeGraphData(): Promise<LightRAGKnowledgeGraphData> {
    const cacheKey = 'knowledge_graph_data';
    const cached = this.getCachedData<LightRAGKnowledgeGraphData>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.get('/graphs')
      );

      this.setCachedData(cacheKey, response);
      return response;
    } catch (error) {
      console.error('[LightRAG] Knowledge graph query failed:', error);
      throw error;
    }
  }

  /**
   * Query structured data
   */
  public async queryStructuredData(query: string): Promise<any> {
    try {
      const response = await this.executeRequest(() =>
        this.axiosInstance.post('/query/data', { query })
      );

      return response;
    } catch (error) {
      console.error('[LightRAG] Structured data query failed:', error);
      throw error;
    }
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

/**
 * Create a LightRAG client instance with default configuration
 */
export function createLightRAGClient(config?: Partial<LightRAGClientConfig>): LightRAGClient {
  const defaultConfig: LightRAGClientConfig = {
    apiUrl: process.env.LIGHTRAG_API_URL || 'http://localhost:9621',
    apiKey: process.env.LIGHTRAG_API_KEY || '',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    enableCircuitBreaker: true,
    circuitBreakerThreshold: 5
  };

  return new LightRAGClient({ ...defaultConfig, ...config });
}

export default LightRAGClient;
