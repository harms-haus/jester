/**
 * LightRAG Service - Provides LightRAG integration for agents
 * 
 * This service acts as a bridge between the LightRAG MCP client and the agent system,
 * providing high-level methods for entity discovery, relationship querying, and
 * knowledge graph operations that agents can use.
 */

import { LightRAGClient, createLightRAGClient } from './lightragClient.js';
import {
  LightRAGQueryRequest,
  LightRAGQueryResponse,
  LightRAGEntityLabel,
  LightRAGKnowledgeGraphData,
  LightRAGClientConfig
} from './lightrag.js';

export interface LightRAGServiceConfig {
  enabled: boolean;
  fallbackMode: boolean;
  clientConfig?: Partial<LightRAGClientConfig>;
}

export interface EntitySearchResult {
  name: string;
  type: string;
  description: string;
  relevanceScore: number;
  relationships: string[];
}

export interface RelationshipSearchResult {
  source: string;
  target: string;
  description: string;
  weight: number;
  type: string;
}

export class LightRAGService {
  private client: LightRAGClient | null = null;
  private config: LightRAGServiceConfig;
  private isHealthy: boolean = false;
  private lastHealthCheck: number = 0;
  private readonly healthCheckInterval = 60000; // 1 minute

  constructor(config: LightRAGServiceConfig) {
    this.config = config;
    this.initializeClient();
  }

  /**
   * Initialize the LightRAG client
   */
  private async initializeClient(): Promise<void> {
    if (!this.config.enabled) {
      console.log('[LightRAG Service] Service disabled');
      return;
    }

    try {
      this.client = createLightRAGClient(this.config.clientConfig);
      await this.performHealthCheck();
    } catch (error) {
      console.error('[LightRAG Service] Failed to initialize client:', error);
      if (this.config.fallbackMode) {
        console.log('[LightRAG Service] Running in fallback mode');
      }
    }
  }

  /**
   * Perform health check on LightRAG service
   */
  private async performHealthCheck(): Promise<boolean> {
    if (!this.client) {
      this.isHealthy = false;
      return false;
    }

    try {
      this.isHealthy = await this.client.healthCheck();
      this.lastHealthCheck = Date.now();
      return this.isHealthy;
    } catch (error) {
      console.error('[LightRAG Service] Health check failed:', error);
      this.isHealthy = false;
      return false;
    }
  }

  /**
   * Check if service is available and healthy
   */
  public async isAvailable(): Promise<boolean> {
    if (!this.config.enabled) {
      return false;
    }

    if (!this.client) {
      return false;
    }

    // Check if we need to perform a health check
    if (Date.now() - this.lastHealthCheck > this.healthCheckInterval) {
      await this.performHealthCheck();
    }

    return this.isHealthy;
  }

  /**
   * Search for entities related to a query
   */
  public async searchEntities(query: string, limit: number = 10): Promise<EntitySearchResult[]> {
    if (!await this.isAvailable()) {
      if (this.config.fallbackMode) {
        return this.getFallbackEntities(query, limit);
      }
      throw new Error('LightRAG service is not available');
    }

    try {
      const request: LightRAGQueryRequest = {
        query,
        mode: 'hybrid',
        top_k: limit,
        enable_rerank: true
      };

      const response = await this.client!.query(request);
      
      return this.parseEntitySearchResults(response, query);
    } catch (error) {
      console.error('[LightRAG Service] Entity search failed:', error);
      if (this.config.fallbackMode) {
        return this.getFallbackEntities(query, limit);
      }
      throw error;
    }
  }

  /**
   * Search for relationships between entities
   */
  public async searchRelationships(
    sourceEntity: string, 
    targetEntity?: string, 
    limit: number = 10
  ): Promise<RelationshipSearchResult[]> {
    if (!await this.isAvailable()) {
      if (this.config.fallbackMode) {
        return this.getFallbackRelationships(sourceEntity, targetEntity, limit);
      }
      throw new Error('LightRAG service is not available');
    }

    try {
      const query = targetEntity 
        ? `relationships between ${sourceEntity} and ${targetEntity}`
        : `relationships involving ${sourceEntity}`;

      const request: LightRAGQueryRequest = {
        query,
        mode: 'hybrid',
        top_k: limit,
        enable_rerank: true
      };

      const response = await this.client!.query(request);
      
      return this.parseRelationshipSearchResults(response);
    } catch (error) {
      console.error('[LightRAG Service] Relationship search failed:', error);
      if (this.config.fallbackMode) {
        return this.getFallbackRelationships(sourceEntity, targetEntity, limit);
      }
      throw error;
    }
  }

  /**
   * Get entity labels from knowledge graph
   */
  public async getEntityLabels(): Promise<LightRAGEntityLabel[]> {
    if (!await this.isAvailable()) {
      if (this.config.fallbackMode) {
        return this.getFallbackEntityLabels();
      }
      throw new Error('LightRAG service is not available');
    }

    try {
      return await this.client!.getEntityLabels();
    } catch (error) {
      console.error('[LightRAG Service] Failed to get entity labels:', error);
      if (this.config.fallbackMode) {
        return this.getFallbackEntityLabels();
      }
      throw error;
    }
  }

  /**
   * Get knowledge graph data
   */
  public async getKnowledgeGraphData(): Promise<LightRAGKnowledgeGraphData> {
    if (!await this.isAvailable()) {
      if (this.config.fallbackMode) {
        return this.getFallbackKnowledgeGraphData();
      }
      throw new Error('LightRAG service is not available');
    }

    try {
      return await this.client!.getKnowledgeGraphData();
    } catch (error) {
      console.error('[LightRAG Service] Failed to get knowledge graph data:', error);
      if (this.config.fallbackMode) {
        return this.getFallbackKnowledgeGraphData();
      }
      throw error;
    }
  }

  /**
   * Query for story context enhancement
   */
  public async enhanceStoryContext(
    storyIdea: string, 
    context: any
  ): Promise<{ entities: EntitySearchResult[]; relationships: RelationshipSearchResult[] }> {
    if (!await this.isAvailable()) {
      if (this.config.fallbackMode) {
        return {
          entities: this.getFallbackEntities(storyIdea, 5),
          relationships: this.getFallbackRelationships(storyIdea, undefined, 5)
        };
      }
      throw new Error('LightRAG service is not available');
    }

    try {
      const [entities, relationships] = await Promise.all([
        this.searchEntities(storyIdea, 5),
        this.searchRelationships(storyIdea, undefined, 5)
      ]);

      return { entities, relationships };
    } catch (error) {
      console.error('[LightRAG Service] Story context enhancement failed:', error);
      if (this.config.fallbackMode) {
        return {
          entities: this.getFallbackEntities(storyIdea, 5),
          relationships: this.getFallbackRelationships(storyIdea, undefined, 5)
        };
      }
      throw error;
    }
  }

  /**
   * Parse entity search results from LightRAG response
   */
  private parseEntitySearchResults(response: LightRAGQueryResponse, query: string): EntitySearchResult[] {
    const results: EntitySearchResult[] = [];

    // Parse entities from response
    if (response.entities) {
      for (const entity of response.entities) {
        results.push({
          name: entity.name,
          type: entity.type,
          description: entity.description,
          relevanceScore: 0.8, // Default score
          relationships: []
        });
      }
    }

    // Parse reranked documents for additional entities
    if (response.reranked_documents) {
      for (const doc of response.reranked_documents) {
        // Extract entity names from content (simple heuristic)
        const entityMatches = doc.content.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
        if (entityMatches) {
          for (const entityName of entityMatches) {
            if (!results.find(r => r.name === entityName)) {
              results.push({
                name: entityName,
                type: 'unknown',
                description: doc.content.substring(0, 100) + '...',
                relevanceScore: doc.score,
                relationships: []
              });
            }
          }
        }
      }
    }

    return results.slice(0, 10); // Limit results
  }

  /**
   * Parse relationship search results from LightRAG response
   */
  private parseRelationshipSearchResults(response: LightRAGQueryResponse): RelationshipSearchResult[] {
    const results: RelationshipSearchResult[] = [];

    if (response.relationships) {
      for (const rel of response.relationships) {
        results.push({
          source: rel.source,
          target: rel.target,
          description: rel.description,
          weight: rel.weight,
          type: 'relationship'
        });
      }
    }

    return results;
  }

  /**
   * Fallback entity search when LightRAG is unavailable
   */
  private getFallbackEntities(query: string, limit: number): EntitySearchResult[] {
    // Simple fallback based on common story elements
    const commonEntities = [
      { name: 'Hero', type: 'character', description: 'The main character of the story' },
      { name: 'Villain', type: 'character', description: 'The antagonist of the story' },
      { name: 'Helper', type: 'character', description: 'A supporting character who helps the hero' },
      { name: 'Forest', type: 'location', description: 'A magical or mysterious forest setting' },
      { name: 'Castle', type: 'location', description: 'A grand castle or palace' },
      { name: 'Magic Sword', type: 'item', description: 'A powerful magical weapon' },
      { name: 'Treasure', type: 'item', description: 'Valuable treasure or reward' }
    ];

    return commonEntities
      .filter(entity => 
        entity.name.toLowerCase().includes(query.toLowerCase()) ||
        entity.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit)
      .map(entity => ({
        ...entity,
        relevanceScore: 0.5,
        relationships: []
      }));
  }

  /**
   * Fallback relationship search when LightRAG is unavailable
   */
  private getFallbackRelationships(
    sourceEntity: string, 
    targetEntity?: string, 
    limit: number = 10
  ): RelationshipSearchResult[] {
    const commonRelationships = [
      { source: 'Hero', target: 'Helper', description: 'works with', weight: 0.8, type: 'alliance' },
      { source: 'Hero', target: 'Villain', description: 'fights against', weight: 0.9, type: 'conflict' },
      { source: 'Hero', target: 'Magic Sword', description: 'wields', weight: 0.7, type: 'possession' },
      { source: 'Hero', target: 'Treasure', description: 'seeks', weight: 0.6, type: 'goal' }
    ];

    return commonRelationships
      .filter(rel => 
        rel.source.toLowerCase().includes(sourceEntity.toLowerCase()) ||
        (targetEntity && rel.target.toLowerCase().includes(targetEntity.toLowerCase()))
      )
      .slice(0, limit);
  }

  /**
   * Fallback entity labels when LightRAG is unavailable
   */
  private getFallbackEntityLabels(): LightRAGEntityLabel[] {
    return [
      { name: 'character', type: 'entity_type', count: 10, description: 'Story characters' },
      { name: 'location', type: 'entity_type', count: 5, description: 'Story locations' },
      { name: 'item', type: 'entity_type', count: 8, description: 'Story items' }
    ];
  }

  /**
   * Fallback knowledge graph data when LightRAG is unavailable
   */
  private getFallbackKnowledgeGraphData(): LightRAGKnowledgeGraphData {
    return {
      entities: [],
      relationships: [],
      chunks: []
    };
  }

  /**
   * Get service status
   */
  public getStatus(): { enabled: boolean; healthy: boolean; fallbackMode: boolean } {
    return {
      enabled: this.config.enabled,
      healthy: this.isHealthy,
      fallbackMode: this.config.fallbackMode && !this.isHealthy
    };
  }
}

/**
 * Create a LightRAG service instance with default configuration
 */
export function createLightRAGService(config?: Partial<LightRAGServiceConfig>): LightRAGService {
  const defaultConfig: LightRAGServiceConfig = {
    enabled: process.env.LIGHTRAG_ENABLED !== 'false',
    fallbackMode: process.env.LIGHTRAG_FALLBACK_MODE !== 'false',
    clientConfig: {
      apiUrl: process.env.LIGHTRAG_API_URL || 'http://localhost:9621',
      apiKey: process.env.LIGHTRAG_API_KEY || ''
    }
  };

  return new LightRAGService({ ...defaultConfig, ...config });
}

export default LightRAGService;
