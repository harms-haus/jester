/**
 * Relationship mapping utilities for jester storytelling system
 * Handles entity relationship visualization and analysis
 */

import { EntityRelationship, WikiLink, EntityLink } from '../types/index.js';
import { WikiLinkUtils } from './wikiLinkUtils.js';
import { errorHandler } from './errorHandler.js';

export class RelationshipMapper {
  private wikiLinkUtils: WikiLinkUtils;

  constructor(wikiLinkUtils: WikiLinkUtils) {
    this.wikiLinkUtils = wikiLinkUtils;
  }

  /**
   * Generate entity relationship graph data
   */
  public generateRelationshipGraph(): {
    nodes: Array<{
      id: string;
      label: string;
      type: 'character' | 'location' | 'item';
      usageCount: number;
      lastUsed: string;
    }>;
    edges: Array<{
      source: string;
      target: string;
      type: 'forward' | 'backward';
      createdAt: string;
    }>;
  } {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const linkData = this.wikiLinkUtils.exportRelationshipData();

      const nodes = relationships.map(rel => ({
        id: rel.entity,
        label: rel.entity,
        type: rel.entityType,
        usageCount: rel.usageCount,
        lastUsed: rel.lastUsed
      }));

      const edges = linkData.linkData.flatMap((item: any) =>
        item.links.map((link: any) => ({
          source: item.entity,
          target: link.target,
          type: link.type,
          createdAt: link.createdAt
        }))
      );

      return { nodes, edges };
    } catch (error) {
      errorHandler.logError('Failed to generate relationship graph', error);
      throw error;
    }
  }

  /**
   * Get entity usage statistics
   */
  public getEntityUsageStats(): {
    totalEntities: number;
    totalLinks: number;
    entityTypeCounts: Record<string, number>;
    mostUsedEntities: Array<{
      entity: string;
      type: string;
      usageCount: number;
    }>;
    leastUsedEntities: Array<{
      entity: string;
      type: string;
      usageCount: number;
    }>;
  } {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const linkData = this.wikiLinkUtils.exportRelationshipData();

      const entityTypeCounts: Record<string, number> = {};
      relationships.forEach(rel => {
        entityTypeCounts[rel.entityType] = (entityTypeCounts[rel.entityType] || 0) + 1;
      });

      const mostUsedEntities = relationships
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 10)
        .map(rel => ({
          entity: rel.entity,
          type: rel.entityType,
          usageCount: rel.usageCount
        }));

      const leastUsedEntities = relationships
        .sort((a, b) => a.usageCount - b.usageCount)
        .slice(0, 10)
        .map(rel => ({
          entity: rel.entity,
          type: rel.entityType,
          usageCount: rel.usageCount
        }));

      return {
        totalEntities: relationships.length,
        totalLinks: linkData.totalLinks,
        entityTypeCounts,
        mostUsedEntities,
        leastUsedEntities
      };
    } catch (error) {
      errorHandler.logError('Failed to get entity usage stats', error);
      throw error;
    }
  }

  /**
   * Find entities with no relationships (orphaned entities)
   */
  public findOrphanedEntities(): Array<{
    entity: string;
    type: 'character' | 'location' | 'item';
    filePath: string;
  }> {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const orphanedEntities: Array<{
        entity: string;
        type: 'character' | 'location' | 'item';
        filePath: string;
      }> = [];

      // Get all entities that have relationships
      const entitiesWithRelationships = new Set<string>();
      relationships.forEach(rel => {
        entitiesWithRelationships.add(rel.entity);
        rel.relationships.linkedTo.forEach(linked => entitiesWithRelationships.add(linked));
        rel.relationships.linkedFrom.forEach(linked => entitiesWithRelationships.add(linked));
      });

      // Find entities that have no relationships
      relationships.forEach(rel => {
        if (rel.relationships.linkedTo.length === 0 && rel.relationships.linkedFrom.length === 0) {
          // This is an orphaned entity
          orphanedEntities.push({
            entity: rel.entity,
            type: rel.entityType,
            filePath: '' // We'd need to get this from the entity index
          });
        }
      });

      return orphanedEntities;
    } catch (error) {
      errorHandler.logError('Failed to find orphaned entities', error);
      throw error;
    }
  }

  /**
   * Find highly connected entities (hubs)
   */
  public findHubEntities(threshold: number = 5): Array<{
    entity: string;
    type: 'character' | 'location' | 'item';
    connectionCount: number;
    connections: string[];
  }> {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const hubEntities: Array<{
        entity: string;
        type: 'character' | 'location' | 'item';
        connectionCount: number;
        connections: string[];
      }> = [];

      relationships.forEach(rel => {
        const totalConnections = rel.relationships.linkedTo.length + rel.relationships.linkedFrom.length;
        if (totalConnections >= threshold) {
          const allConnections = [
            ...rel.relationships.linkedTo,
            ...rel.relationships.linkedFrom
          ];
          
          hubEntities.push({
            entity: rel.entity,
            type: rel.entityType,
            connectionCount: totalConnections,
            connections: allConnections
          });
        }
      });

      return hubEntities.sort((a, b) => b.connectionCount - a.connectionCount);
    } catch (error) {
      errorHandler.logError('Failed to find hub entities', error);
      throw error;
    }
  }

  /**
   * Generate relationship suggestions based on content similarity
   */
  public generateRelationshipSuggestions(entityName: string): Array<{
    suggestedEntity: string;
    reason: string;
    confidence: number;
  }> {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const currentEntity = relationships.find(rel => rel.entity === entityName);
      
      if (!currentEntity) {
        return [];
      }

      const suggestions: Array<{
        suggestedEntity: string;
        reason: string;
        confidence: number;
      }> = [];

      // Find entities that are connected to entities connected to this entity (2nd degree connections)
      const secondDegreeConnections = new Set<string>();
      const firstDegreeConnections = new Set([
        ...currentEntity.relationships.linkedTo,
        ...currentEntity.relationships.linkedFrom
      ]);

      relationships.forEach(rel => {
        if (rel.entity !== entityName && !firstDegreeConnections.has(rel.entity)) {
          const hasCommonConnection = rel.relationships.linkedTo.some(conn => 
            firstDegreeConnections.has(conn)
          ) || rel.relationships.linkedFrom.some(conn => 
            firstDegreeConnections.has(conn)
          );

          if (hasCommonConnection) {
            secondDegreeConnections.add(rel.entity);
          }
        }
      });

      // Generate suggestions for 2nd degree connections
      secondDegreeConnections.forEach(entity => {
        const entityRel = relationships.find(rel => rel.entity === entity);
        if (entityRel) {
          suggestions.push({
            suggestedEntity: entity,
            reason: `Connected through mutual relationships`,
            confidence: 0.7
          });
        }
      });

      // Find entities of the same type that might be related
      const sameTypeEntities = relationships.filter(rel => 
        rel.entity !== entityName && 
        rel.entityType === currentEntity.entityType &&
        !firstDegreeConnections.has(rel.entity)
      );

      sameTypeEntities.forEach(rel => {
        suggestions.push({
          suggestedEntity: rel.entity,
          reason: `Same type (${rel.entityType}) with potential relationship`,
          confidence: 0.5
        });
      });

      return suggestions.sort((a, b) => b.confidence - a.confidence);
    } catch (error) {
      errorHandler.logError('Failed to generate relationship suggestions', error);
      throw error;
    }
  }

  /**
   * Export relationship data in various formats
   */
  public exportRelationshipData(format: 'json' | 'csv' | 'graphml' = 'json'): string {
    try {
      const graphData = this.generateRelationshipGraph();
      const stats = this.getEntityUsageStats();

      switch (format) {
        case 'json':
          return JSON.stringify({
            graph: graphData,
            statistics: stats,
            exportDate: new Date().toISOString()
          }, null, 2);

        case 'csv':
          const csvNodes = graphData.nodes.map(node => 
            `${node.id},${node.label},${node.type},${node.usageCount},${node.lastUsed}`
          ).join('\n');
          const csvEdges = graphData.edges.map(edge => 
            `${edge.source},${edge.target},${edge.type},${edge.createdAt}`
          ).join('\n');
          
          return `# Nodes\nid,label,type,usageCount,lastUsed\n${csvNodes}\n\n# Edges\nsource,target,type,createdAt\n${csvEdges}`;

        case 'graphml':
          return this.generateGraphML(graphData);

        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } catch (error) {
      errorHandler.logError('Failed to export relationship data', error);
      throw error;
    }
  }

  /**
   * Generate GraphML format for relationship data
   */
  private generateGraphML(graphData: any): string {
    const nodes = graphData.nodes.map((node: any) => 
      `  <node id="${node.id}">
    <data key="label">${node.label}</data>
    <data key="type">${node.type}</data>
    <data key="usageCount">${node.usageCount}</data>
    <data key="lastUsed">${node.lastUsed}</data>
  </node>`
    ).join('\n');

    const edges = graphData.edges.map((edge: any) => 
      `  <edge source="${edge.source}" target="${edge.target}">
    <data key="type">${edge.type}</data>
    <data key="createdAt">${edge.createdAt}</data>
  </edge>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <key id="label" for="node" attr.name="label" attr.type="string"/>
  <key id="type" for="node" attr.name="type" attr.type="string"/>
  <key id="usageCount" for="node" attr.name="usageCount" attr.type="int"/>
  <key id="lastUsed" for="node" attr.name="lastUsed" attr.type="string"/>
  <key id="type" for="edge" attr.name="type" attr.type="string"/>
  <key id="createdAt" for="edge" attr.name="createdAt" attr.type="string"/>
  <graph id="entity-relationships" edgedefault="directed">
${nodes}
${edges}
  </graph>
</graphml>`;
  }

  /**
   * Analyze relationship patterns
   */
  public analyzeRelationshipPatterns(): {
    averageConnectionsPerEntity: number;
    maxConnections: number;
    minConnections: number;
    connectionDistribution: Record<string, number>;
    relationshipTypes: {
      characterToCharacter: number;
      characterToLocation: number;
      characterToItem: number;
      locationToLocation: number;
      locationToItem: number;
      itemToItem: number;
    };
  } {
    try {
      const relationships = this.wikiLinkUtils.getAllEntityRelationships();
      const linkData = this.wikiLinkUtils.exportRelationshipData();

      const connectionCounts = relationships.map(rel => 
        rel.relationships.linkedTo.length + rel.relationships.linkedFrom.length
      );

      const averageConnectionsPerEntity = connectionCounts.reduce((sum, count) => sum + count, 0) / connectionCounts.length;
      const maxConnections = Math.max(...connectionCounts);
      const minConnections = Math.min(...connectionCounts);

      const connectionDistribution: Record<string, number> = {};
      connectionCounts.forEach(count => {
        const range = Math.floor(count / 5) * 5;
        const key = `${range}-${range + 4}`;
        connectionDistribution[key] = (connectionDistribution[key] || 0) + 1;
      });

      const relationshipTypes = {
        characterToCharacter: 0,
        characterToLocation: 0,
        characterToItem: 0,
        locationToLocation: 0,
        locationToItem: 0,
        itemToItem: 0
      };

      linkData.linkData.forEach((item: any) => {
        const sourceType = relationships.find(rel => rel.entity === item.entity)?.entityType;
        item.links.forEach((link: any) => {
          const targetType = relationships.find(rel => rel.entity === link.target)?.entityType;
          if (sourceType && targetType) {
            const key = `${sourceType}To${targetType.charAt(0).toUpperCase() + targetType.slice(1)}` as keyof typeof relationshipTypes;
            if (key in relationshipTypes) {
              relationshipTypes[key]++;
            }
          }
        });
      });

      return {
        averageConnectionsPerEntity,
        maxConnections,
        minConnections,
        connectionDistribution,
        relationshipTypes
      };
    } catch (error) {
      errorHandler.logError('Failed to analyze relationship patterns', error);
      throw error;
    }
  }
}
