/**
 * LightRAG API type definitions
 */

export interface LightRAGQueryRequest {
  query: string;
  mode?: 'structured' | 'unstructured';
  limit?: number;
}

export interface LightRAGQueryResponse {
  results: LightRAGResult[];
  total: number;
}

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
