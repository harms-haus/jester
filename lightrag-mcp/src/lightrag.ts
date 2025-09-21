/**
 * LightRAG API type definitions based on actual API documentation
 */

// Core Query Interfaces
export interface LightRAGQueryRequest {
  query: string;
  documents?: Array<{
    content: string;
    id: string;
  }>;
  enable_rerank?: boolean;
  mode?: 'local' | 'global' | 'hybrid' | 'naive' | 'mix';
  top_k?: number;
  max_entity_tokens?: number;
  max_relation_tokens?: number;
  max_total_tokens?: number;
}

export interface LightRAGQueryResponse {
  reranked_documents?: Array<{
    content: string;
    id: string;
    score: number;
  }>;
  response?: string;
  context?: string;
  entities?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  relationships?: Array<{
    source: string;
    target: string;
    description: string;
    weight: number;
  }>;
}

// Streaming Query Interface
export interface LightRAGStreamResponse {
  content: string;
  id: string;
  score?: number;
}

// Document Management Interfaces
export interface LightRAGDocumentUploadRequest {
  file: File | Buffer;
  filename: string;
  track_id?: string;
}

export interface LightRAGTextInsertRequest {
  content: string;
  track_id?: string;
}

export interface LightRAGDocumentResponse {
  track_id: string;
  status?: 'processing' | 'completed' | 'failed';
  message?: string;
}

// Entity and Knowledge Graph Interfaces
export interface LightRAGEntityLabel {
  name: string;
  type: string;
  count: number;
  description?: string;
}

export interface LightRAGKnowledgeGraphData {
  entities: Array<{
    entity_name: string;
    entity_type: string;
    description: string;
    source_id: string;
    file_path: string;
  }>;
  relationships: Array<{
    src_id: string;
    tgt_id: string;
    description: string;
    keywords: string;
    weight: number;
    source_id: string;
    file_path: string;
  }>;
  chunks: Array<{
    content: string;
    source_id: string;
    file_path: string;
  }>;
}

// Configuration Interfaces
export interface LightRAGClientConfig {
  apiUrl: string;
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  enableCircuitBreaker?: boolean;
  circuitBreakerThreshold?: number;
}

// Error Interfaces
export interface LightRAGError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface LightRAGApiError extends Error {
  status?: number;
  response?: any;
  code?: string;
}

// Legacy interfaces for backward compatibility
export interface LightRAGResult {
  id: string;
  content: string;
  score: number;
  metadata?: Record<string, any>;
}

export interface LightRAGGraphNode {
  id: string;
  label: string;
  properties: Record<string, any>;
  relationships: LightRAGRelationship[];
}

export interface LightRAGRelationship {
  targetId: string;
  type: string;
  properties: Record<string, any>;
}

export interface LightRAGGraphResponse {
  nodes: LightRAGGraphNode[];
  relationships: LightRAGRelationship[];
}
