# API Specification

## Entity Management OpenAPI Integration

**API Style:** REST API with JSON payloads  
**Base URL:** `http://localhost:9621` (configurable)  
**Authentication:** X-API-Key header  
**Rate Limits:** As defined by Entity Management service configuration  

**Key Endpoints Used:**
- `POST /query` - Natural language queries with reranking support
- `POST /query/stream` - Streaming query results with reranking
- `POST /query/data` - Structured data queries for knowledge graph entities and relationships
- `GET /graph/label/list` - Retrieve all node labels (IDs) in the datastore
- `GET /graphs` - Get graph node data
- `GET /graph/entity/exists` - Check entity existence (for local file validation)
- `GET /health` - Health check endpoint
- `GET /api/*` - Additional API endpoints (whitelisted)

**Request/Response Format:**
```typescript
// Query Request
interface QueryRequest {
  query: string;
  documents?: Array<{
    content: string;
    id: string;
  }>;
  enable_rerank?: boolean; // Defaults to true
}

// Query Response
interface QueryResponse {
  reranked_documents: Array<{
    content: string;
    id: string;
    score: number;
  }>;
}

// Data Query Request (for structured knowledge graph queries)
interface DataQueryRequest {
  query: string;
  return_format?: 'json' | 'csv' | 'excel' | 'md' | 'txt';
  include_vector_data?: boolean;
}

// Data Query Response (structured knowledge graph data)
interface DataQueryResponse {
  entities: Array<{
    entity_name: string;
    entity_type: 'person' | 'location' | 'item' | 'technology' | string;
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

// Graph Label List Response
interface GraphLabelListResponse {
  labels: string[];
  total_count: number;
}

// Graph Node Data Response
interface GraphNodeDataResponse {
  nodes: Array<{
    id: string;
    label: string;
    properties: Record<string, any>;
    relationships: string[];
  }>;
  total_count: number;
}

// Entity Exists Request
interface EntityExistsRequest {
  entity_id: string;
  entity_type?: string;
}

// Entity Exists Response
interface EntityExistsResponse {
  exists: boolean;
  entity_id: string;
  entity_type?: string;
  last_modified?: string;
}

// Streaming Query Response
interface StreamResponse {
  content: string;
  id: string;
  score: number;
}
```

**TypeScript Client Interface:**
```typescript
interface Entity ManagementClient {
  query(query: string, enableRerank?: boolean): Promise<QueryResponse>;
  queryStream(query: string, enableRerank?: boolean): Promise<AsyncIterable<StreamResponse>>;
  queryData(query: string, format?: string, includeVectors?: boolean): Promise<DataQueryResponse>;
  getGraphLabels(): Promise<GraphLabelListResponse>;
  getGraphNodes(): Promise<GraphNodeDataResponse>;
  checkEntityExists(entityId: string, entityType?: string): Promise<EntityExistsResponse>;
  healthCheck(): Promise<boolean>;
}

class Entity ManagementClientImpl implements Entity ManagementClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async query(query: string, enableRerank = true): Promise<QueryResponse> {
    const response = await fetch(`${this.baseUrl}/query?enable_rerank=${enableRerank}`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    return response.json();
  }

  async queryData(query: string, format = 'json', includeVectors = false): Promise<DataQueryResponse> {
    const response = await fetch(`${this.baseUrl}/query/data`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query, 
        return_format: format,
        include_vector_data: includeVectors 
      }),
    });
    return response.json();
  }

  async getGraphLabels(): Promise<GraphLabelListResponse> {
    const response = await fetch(`${this.baseUrl}/graph/label/list`, {
      method: 'GET',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async getGraphNodes(): Promise<GraphNodeDataResponse> {
    const response = await fetch(`${this.baseUrl}/graphs`, {
      method: 'GET',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async checkEntityExists(entityId: string, entityType?: string): Promise<EntityExistsResponse> {
    const params = new URLSearchParams({ entity_id: entityId });
    if (entityType) params.append('entity_type', entityType);
    
    const response = await fetch(`${this.baseUrl}/graph/entity/exists?${params}`, {
      method: 'GET',
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
```

**Integration Notes:**
- Entity Management client handles all Entity Management communication through HTTP requests
- Responses cached locally to minimize API calls and costs
- Error handling for network failures, authentication issues, and rate limits
- Offline mode when Entity Management service unavailable
- Reranking enabled by default for better relevance
- Streaming support for real-time query results
- **Structured data queries** via `/query/data` for knowledge graph entities and relationships
- **Graph management** via `/graph/label/list` and `/graphs` for comprehensive entity discovery
- **Entity validation** via `/graph/entity/exists` for local file consistency checks
- Support for multiple export formats (JSON, CSV, Excel, Markdown, Text)

**Detailed Rationale**: These additional endpoints provide comprehensive graph management capabilities for jester. The `/graph/label/list` endpoint allows the `/muse` agent to discover all available entities without complex queries. The `/graphs` endpoint provides detailed node information for relationship mapping. The `/graph/entity/exists` endpoint is crucial for the local file system integration, allowing jester to validate that entities referenced in local markdown files actually exist in the Entity Management knowledge graph, ensuring consistency between the local files and the centralized knowledge base.
