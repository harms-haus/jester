#!/usr/bin/env node

/**
 * LightRAG MCP Server
 * 
 * A standalone Model Context Protocol (MCP) server that provides
 * LightRAG functionality to Cursor and other MCP-compatible clients.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  InitializeRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { LightRAGClient, createLightRAGClient } from './lightragClient.js';
import { LightRAGService, createLightRAGService } from './lightragService.js';

console.error('Starting LightRAG MCP Server...');

// Initialize LightRAG service
const lightragService = createLightRAGService({
  enabled: true,
  fallbackMode: true,
  clientConfig: {
    apiUrl: process.env.LIGHTRAG_API_URL || 'http://localhost:9621',
    apiKey: process.env.LIGHTRAG_API_KEY || ''
  }
});

// Initialize LightRAG client for direct access
const lightragClient = createLightRAGClient({
  apiUrl: process.env.LIGHTRAG_API_URL || 'http://localhost:9621',
  apiKey: process.env.LIGHTRAG_API_KEY || ''
});

// Create MCP server
const server = new Server(
  {
    name: 'lightrag-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Handle initialization
server.setRequestHandler(InitializeRequestSchema, async (request) => {
  console.error('Received initialize request');
  return {
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {},
      resources: {},
    },
    serverInfo: {
      name: 'lightrag-mcp-server',
      version: '1.0.0',
    },
  };
});

// Handle tools list
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error('Received tools/list request');
  return {
    tools: [
      {
        name: 'lightrag_query',
        description: 'Query the LightRAG knowledge graph for information',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query to execute',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'lightrag_search_entities',
        description: 'Search for entities in the LightRAG knowledge graph',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query for entities',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'lightrag_search_relationships',
        description: 'Search for relationships in the LightRAG knowledge graph',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query for relationships',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'lightrag_get_entity_labels',
        description: 'Get all available entity labels from LightRAG',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'lightrag_get_knowledge_graph',
        description: 'Get knowledge graph data from LightRAG',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Maximum number of results to return',
            },
          },
        },
      },
      {
        name: 'lightrag_health_check',
        description: 'Check the health status of the LightRAG service',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.error('Received tool call:', request.params.name);
  
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'lightrag_query': {
        const query = typeof args?.query === 'string' ? args.query : '';
        const result = await lightragService.enhanceStoryContext(query, '');
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag_search_entities': {
        const query = typeof args?.query === 'string' ? args.query : '';
        const entities = await lightragService.searchEntities(query, 10);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(entities, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag_search_relationships': {
        const query = typeof args?.query === 'string' ? args.query : '';
        const relationships = await lightragService.searchRelationships(query, undefined, 10);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(relationships, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag_get_entity_labels': {
        const labels = await lightragService.getEntityLabels();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(labels, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag_get_knowledge_graph': {
        const kgData = await lightragService.getKnowledgeGraphData();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(kgData, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag_health_check': {
        const isHealthy = await lightragService.isAvailable();
        const status = await lightragService.getStatus();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                healthy: isHealthy,
                status: status,
                timestamp: new Date().toISOString(),
              }, null, 2),
            },
          ],
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    console.error('Tool call error:', error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Handle resources list
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  console.error('Received resources/list request');
  return {
    resources: [
      {
        uri: 'lightrag://status',
        name: 'LightRAG Status',
        description: 'Current status of the LightRAG service',
        mimeType: 'application/json',
      },
      {
        uri: 'lightrag://entity-labels',
        name: 'Entity Labels',
        description: 'Available entity labels in the knowledge graph',
        mimeType: 'application/json',
      },
      {
        uri: 'lightrag://knowledge-graph',
        name: 'Knowledge Graph',
        description: 'Knowledge graph data and relationships',
        mimeType: 'application/json',
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  console.error('Received resource read request:', request.params.uri);
  
  const { uri } = request.params;
  
  try {
    switch (uri) {
      case 'lightrag://status': {
        const isHealthy = await lightragService.isAvailable();
        const status = await lightragService.getStatus();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({
                healthy: isHealthy,
                status: status,
                timestamp: new Date().toISOString(),
              }, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag://entity-labels': {
        const labels = await lightragService.getEntityLabels();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(labels, null, 2),
            },
          ],
        };
      }
      
      case 'lightrag://knowledge-graph': {
        const kgData = await lightragService.getKnowledgeGraphData();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(kgData, null, 2),
            },
          ],
        };
      }
      
      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  } catch (error) {
    console.error('Resource read error:', error);
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
    };
  }
});

// Main execution
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('LightRAG MCP Server started successfully');
}

// Handle process termination
process.on('SIGINT', () => {
  console.error('LightRAG MCP Server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('LightRAG MCP Server shutting down...');
  process.exit(0);
});

// Start the server
main().catch(console.error);