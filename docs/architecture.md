# Fullstack Architecture Document

## Executive Summary

This document outlines the technical architecture for **jester**, a prompt-based bedtime story generation system that adapts BMAD principles for interactive storytelling. The system uses a hierarchical command structure with a 3-stage workflow (context → outline → story), specialized agents for different functions, LightRAG integration for entity management, and local file-based storage with wiki-style linking.

## High-Level Architecture

### System Overview

**Architecture Pattern**: Hierarchical agent-based file pipeline with external knowledge graph integration  
**Primary Interface**: Command-line interface with organized slash commands  
**Data Flow**: Unidirectional pipeline (context → outline → story) with cross-stage editing and workflow management  
**Storage Strategy**: Local-first with LightRAG knowledge graph integration  

### Core Principles

1. **Hierarchical Command Structure**: Clear, organized command hierarchy that provides contextual guidance and reduces cognitive load
2. **Prompt-Based Agents**: All agent behavior defined through structured prompt rules that external LLM agents follow
3. **File-Based Pipeline**: LLM agents communicate through structured files (YAML, Markdown) as instructed by prompt rules
4. **User-in-the-Loop**: Human editing at each stage for quality control
5. **Local-First**: All user content stored locally with optional cloud sync
6. **Knowledge Graph Integration**: LightRAG provides entity relationships and discovery via MCP client
7. **Prompt Engineering**: Development produces markdown prompt rule files, not executable code

### Validation Framework

**Story Progression Validation**: The system implements comprehensive validation checks during story progression between stages to ensure content quality and prevent data loss.

**Validation Components**:
1. **Draft → Reading Validation**: Content completeness, entity consistency, file integrity
2. **Reading → Universe Validation**: Entity file validation, patch formatting, conflict detection
3. **Conflict Resolution**: Target directory checking, user approval workflows
4. **Quality Gates**: Automated validation with user override capabilities

**Implementation**: Validation is implemented through prompt-based agents following structured validation templates and checklists.

## Platform and Infrastructure

### Deployment Strategy

**Option 1: Local-First with Optional Cloud Integration** ✅ **SELECTED**

**Rationale**: 
- Maintains complete control over personal story content
- Enables offline operation for bedtime story generation
- Provides flexibility for future cloud features without vendor lock-in
- Aligns with family-focused, privacy-conscious approach

**Infrastructure Requirements**:
- Local development environment (Node.js, Git)
- LightRAG service (local or cloud-hosted)
- File system with Git versioning
- Optional: Cloud storage for backup/sync

### Technology Stack

**Core Runtime**: External LLM agents following prompt rules  
**Agent Framework**: Markdown prompt rule files (BMAD pattern)  
**Knowledge Graph**: LightRAG with OpenAPI integration via TypeScript MCP client  
**File Management**: LLM agents performing file operations per prompt rules  
**Configuration**: YAML files  
**Templates**: YAML with prompt injection for LLM agents  

**Dependencies**:
- **MCP Client Only**: TypeScript MCP client for LightRAG API integration (exception to prompt-based rule)
- **Prompt Rules**: Markdown files with YAML configuration (BMAD pattern)
- **Templates**: YAML/Markdown templates for LLM agent use
- **External LLM**: Any LLM capable of following prompt rules and performing file operations

## Data Models

### Core Data Structures

```typescript
interface StoryContext {
  title: string;
  target_audience: {
    age_range: string;
    reading_level: string;
  };
  target_length: {
    min_words: number;
    max_words: number;
    final_target: number; // After editing
  };
  entities: {
    characters: EntityReference[];
    locations: EntityReference[];
    items: EntityReference[];
  };
  plot_template: string; // 'heroes_journey', 'pixar', 'golden_circle'
  plot_points: PlotPoint[];
  location_progression: LocationTransition[];
  morals: string[];
  themes: string[];
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

interface StoryOutline {
  title: string;
  target_audience: StoryContext['target_audience'];
  target_length: StoryContext['target_length'];
  plot_points: DetailedPlotPoint[];
  estimated_word_count: number;
  metadata: {
    context_file: string;
    created_at: string;
    last_modified: string;
  };
}

interface Story {
  title: string;
  content: string;
  word_count: number;
  metadata: {
    outline_file: string;
    context_file: string;
    created_at: string;
    last_modified: string;
    reading_time_minutes: number;
  };
}

interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'item';
  description: string;
  properties: Record<string, any>;
  relationships: string[];
  last_used: string;
  usage_count: number;
}
```

### File System Structure

```
jester/
├── .jester/                    # Framework files (hidden)
│   ├── agents/                 # Agent prompt definitions
│   ├── templates/              # Story and plot templates
│   ├── tasks/                  # Task definitions
│   ├── data/                   # Reference data
│   └── utils/                  # Utility scripts
├── universe/                   # Published work
│   ├── characters/             # Character markdown files
│   ├── locations/              # Location markdown files
│   └── items/                  # Item markdown files
├── import-staging/             # Imported content awaiting validation
│   ├── stories/                # Imported stories
│   ├── outlines/               # Imported outlines
│   ├── contexts/               # Imported contexts
│   ├── characters/             # Imported characters
│   ├── locations/              # Imported locations
│   └── items/                  # Imported items
├── stories/                    # Generated story files
├── outlines/                   # Generated outline files
├── contexts/                   # Generated context files
├── .gitignore                  # Git ignore rules
└── README.md                   # Project overview

**Initialization Process:**
1. User runs `npx jester-story-framework` in target directory
2. CLI tool creates `.jester/` directory structure
3. CLI tool scans directory for existing content (markdown files, story-like content)
4. CLI tool suggests discovered content for import
5. User confirms import suggestions
6. CLI tool moves suggested content to `import-staging/` directory
7. User can then use `@jester` agent for normal workflow
```

## API Specification

### LightRAG OpenAPI Integration

**API Style:** REST API with JSON payloads  
**Base URL:** `http://localhost:9621` (configurable)  
**Authentication:** X-API-Key header  
**Rate Limits:** As defined by LightRAG service configuration  

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
interface LightRAGClient {
  query(query: string, enableRerank?: boolean): Promise<QueryResponse>;
  queryStream(query: string, enableRerank?: boolean): Promise<AsyncIterable<StreamResponse>>;
  queryData(query: string, format?: string, includeVectors?: boolean): Promise<DataQueryResponse>;
  getGraphLabels(): Promise<GraphLabelListResponse>;
  getGraphNodes(): Promise<GraphNodeDataResponse>;
  checkEntityExists(entityId: string, entityType?: string): Promise<EntityExistsResponse>;
  healthCheck(): Promise<boolean>;
}

class LightRAGClientImpl implements LightRAGClient {
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
- MCP client handles all LightRAG communication through HTTP requests
- Responses cached locally to minimize API calls and costs
- Error handling for network failures, authentication issues, and rate limits
- Offline mode when LightRAG service unavailable
- Reranking enabled by default for better relevance
- Streaming support for real-time query results
- **Structured data queries** via `/query/data` for knowledge graph entities and relationships
- **Graph management** via `/graph/label/list` and `/graphs` for comprehensive entity discovery
- **Entity validation** via `/graph/entity/exists` for local file consistency checks
- Support for multiple export formats (JSON, CSV, Excel, Markdown, Text)

**Detailed Rationale**: These additional endpoints provide comprehensive graph management capabilities for jester. The `/graph/label/list` endpoint allows the `/muse` agent to discover all available entities without complex queries. The `/graphs` endpoint provides detailed node information for relationship mapping. The `/graph/entity/exists` endpoint is crucial for the local file system integration, allowing jester to validate that entities referenced in local markdown files actually exist in the LightRAG knowledge graph, ensuring consistency between the local files and the centralized knowledge base.

## Components

### Core Components

**1. Agent System**
- **Purpose**: Orchestrates the hierarchical command workflow through prompt rules
- **Technology**: Markdown prompt rule files following BMAD pattern
- **Key Agents**:
  - `/jester` (Main Entry Point): Core functionalities, initialization, help, and project management
  - `/write` (Story Generation Agent): Context, outline, and story generation (Dev role)
  - `/muse` (Brainstorming Agent): Context gathering, entity discovery, and creative exploration (Analyst role)
  - `/edit` (Cross-Stage Editor): Content modification, entity editing, and maintenance (QA role)
  - `/delete` (Entity Management Agent): Entity and story removal with confirmation workflows
  - `/approve` (Workflow Management Agent): Draft approval and progression to reading stage
  - `/publish` (Publishing Agent): Story publishing with entity patches and cleanup
  - `/import` (Content Import Agent): Entity and story import from files or directories
  - `/search` (Search Agent): Local file and LightRAG database search capabilities
- **Communication**: LLM agents follow prompt rules to use file-based pipeline (YAML → Markdown → Markdown)
- **Dependencies**: LightRAG MCP client, external LLM capable of file operations

**2. LightRAG MCP Client**
- **Purpose**: Provides structured access to knowledge graph entities and relationships
- **Technology**: TypeScript client with OpenAPI integration (exception to prompt-based rule)
- **Key Features**:
  - Entity discovery and relationship queries
  - Structured data retrieval for story context
  - Graph management and entity validation
  - Local caching and offline mode support
- **Dependencies**: LightRAG service, Node.js runtime
- **Implementation Note**: This is the only TypeScript implementation in the system, required for reliable API communication

**3. File System Operations**
- **Purpose**: LLM agents perform file operations as instructed by prompt rules
- **Technology**: External LLM agents following prompt instructions
- **Key Features**:
  - Entity file management (characters/, locations/, items/) via LLM operations
  - Story file management (stories/, outlines/, contexts/) via LLM operations
  - Wiki-style link parsing and validation via LLM operations
  - Git integration for versioning and analytics via LLM operations
- **Dependencies**: External LLM, Git, local file system

**4. Template System**
- **Purpose**: Provides structured templates for LLM agents to use in story generation
- **Technology**: YAML/Markdown templates referenced by prompt rules
- **Key Features**:
  - Plot template management (Hero's Journey, Pixar method, etc.)
  - Story context templates
  - Entity relationship templates
  - Customizable prompt structures for LLM agents
- **Dependencies**: Local file system, prompt rules

### Supporting Components

**5. Configuration Manager**
- **Purpose**: Manages project settings and LightRAG connection
- **Technology**: YAML configuration files
- **Key Features**:
  - LightRAG endpoint configuration
  - Story generation parameters
  - Entity type definitions
  - Template selection
- **Dependencies**: Local file system

**6. Analytics Engine**
- **Purpose**: Tracks story universe growth and entity usage
- **Technology**: Git log analysis and file system monitoring
- **Key Features**:
  - Entity usage tracking
  - Story generation metrics
  - Relationship evolution analysis
  - Growth pattern identification
- **Dependencies**: Git, local file system

**7. Validation System**
- **Purpose**: Ensures consistency between local files and LightRAG
- **Technology**: TypeScript validation logic
- **Key Features**:
  - Entity existence validation
  - Link integrity checking
  - File format validation
  - Relationship consistency verification
- **Dependencies**: LightRAG MCP client, local file system

**8. CLI Initialization Tool**
- **Purpose**: Provides user-friendly project setup and content discovery
- **Technology**: Node.js CLI tool with file system scanning
- **Key Features**:
  - Project structure initialization with `.jester/` directory
  - Content discovery scanning for stories, outlines, contexts, and entities
  - Import suggestion workflow with user confirmation
  - Setup validation and guidance messaging
- **Dependencies**: Node.js runtime, file system access
- **Implementation Note**: Standalone CLI tool that prepares environment for prompt-based agents

### Component Interactions

**Data Flow**:
1. User initiates `/jester` command for project management or `/muse create-new` for story creation
2. External LLM follows appropriate prompt rules to query LightRAG via TypeScript MCP client for entities
3. LLM generates context file and saves to `contexts/` per prompt instructions
4. User edits context file
5. User runs `/write outline`
6. External LLM follows Write prompt rules to read context, generate outline
7. LLM saves outline to `outlines/` per prompt instructions
8. User runs `/write story`
9. External LLM follows Write prompt rules to read outline, generate story
10. LLM saves story to `stories/` per prompt instructions
11. User runs `/edit` commands for content modification or `/delete` commands for entity removal
12. User runs `/approve` to move draft to reading stage
13. User runs `/publish` to publish reading story with entities and patches
14. **For Import Management**: User runs `/import` commands to import content to import-staging/
15. **For Search**: User runs `/search` commands to query local files and LightRAG database
16. External LLM follows appropriate prompt rules to track changes via Git

**Error Handling**:
- LightRAG connection failures → Prompt rules instruct LLM to use offline mode with cached data
- File system errors → Prompt rules instruct LLM to provide graceful degradation with user notification
- Validation failures → Prompt rules instruct LLM to provide detailed error messages with suggested fixes
- LLM failures → Prompt rules provide fallback to manual editing mode instructions

## Architectural Patterns

### Agent-Based Architecture

**Pattern**: Hierarchical command structure with specialized prompt rules for different LLM agent roles  
**Benefits**: Clear separation of concerns, contextual guidance, easy to extend and modify  
**Implementation**: Markdown prompt rule files (BMAD pattern) with file-based communication and command routing  
**Trade-offs**: Requires careful prompt engineering, relies on LLM compliance, command hierarchy complexity  

### File-Based Pipeline

**Pattern**: LLM agents communicate through structured files per prompt instructions  
**Benefits**: Human-readable intermediate results, easy debugging  
**Implementation**: YAML for context, Markdown for outlines and stories via LLM operations  
**Trade-offs**: Relies on LLM file operations, potential consistency issues  

### Local-First Storage

**Pattern**: All user data stored locally with optional cloud sync  
**Benefits**: Privacy, offline operation, complete control  
**Implementation**: Git for versioning, local file system for storage via LLM operations  
**Trade-offs**: No automatic backup, requires manual sync management, relies on LLM file operations  

### Knowledge Graph Integration

**Pattern**: External knowledge graph for entity relationships  
**Benefits**: Rich entity discovery, relationship mapping  
**Implementation**: LightRAG OpenAPI integration via TypeScript MCP client, prompt rules instruct LLM to use cached data  
**Trade-offs**: External dependency, potential latency, relies on LLM to follow prompt instructions  

## Security Considerations

### Data Privacy

- **Local Storage**: All story content stored locally
- **No Cloud Sync**: No automatic cloud synchronization
- **LightRAG Access**: Only entity metadata, not story content
- **Git History**: Version control for local content only

### Access Control

- **File Permissions**: Standard file system permissions
- **Git Access**: Local repository access only
- **API Keys**: LightRAG API keys stored in environment variables
- **No Authentication**: Single-user system, no multi-user concerns

### Data Integrity

- **File Validation**: Regular consistency checks between local files and LightRAG
- **Git Versioning**: Complete change history for all content
- **Backup Strategy**: Manual backup through Git repositories
- **Error Recovery**: Graceful degradation with user notification

## Performance Considerations

### Response Time

- **Agent Operations**: Prompt-based, depends on LLM response time
- **File Operations**: Local file I/O, minimal latency
- **LightRAG Queries**: Cached responses, offline mode support
- **Git Operations**: Background operations, non-blocking

### Scalability

- **Story Volume**: Limited by local storage capacity
- **Entity Count**: Limited by LightRAG service capacity
- **Concurrent Operations**: Single-user system, no concurrency concerns
- **Memory Usage**: Minimal, file-based processing

### Optimization Strategies

- **Caching**: LightRAG responses cached locally
- **Lazy Loading**: Entities loaded on demand
- **Batch Operations**: Multiple file operations batched together
- **Background Processing**: Analytics and validation run in background

## Monitoring and Observability

### Logging

- **Agent Operations**: Prompt execution and response logging
- **File Operations**: File read/write operations
- **LightRAG Queries**: API call logging with response times
- **Error Tracking**: Detailed error messages with context

### Metrics

- **Story Generation**: Stories created per day/week
- **Entity Usage**: Most/least used entities
- **Error Rates**: Failed operations and recovery success
- **Performance**: Response times for key operations

### Health Checks

- **LightRAG Connectivity**: Regular health check calls
- **File System**: Disk space and permission checks
- **Git Repository**: Repository integrity checks
- **Configuration**: Settings validation

## Future Considerations

### Potential Enhancements

- **Voice Integration**: Text-to-speech for story reading
- **Visual Elements**: Image generation for story illustrations
- **Multi-Language**: Support for multiple languages
- **Advanced Analytics**: Machine learning insights on story patterns

### Scalability Paths

- **Cloud Integration**: Optional cloud storage and sync
- **Multi-User**: Family sharing capabilities
- **API Access**: External API for story generation
- **Mobile App**: Mobile interface for story management

### Technology Evolution

- **LLM Updates**: Support for newer language models
- **Knowledge Graph**: Migration to different knowledge graph systems
- **File Formats**: Support for additional file formats
- **Integration**: Integration with other storytelling tools

## Conclusion

The jester architecture provides a robust, local-first solution for interactive bedtime story generation. By combining a hierarchical command structure with markdown prompt rule files (BMAD pattern), LightRAG knowledge graph integration, and local file storage, the system offers flexibility, privacy, and extensibility while maintaining simplicity and user control.

The hierarchical command structure provides clear, contextual guidance that reduces cognitive load and improves user experience. The file-based pipeline ensures human-readable intermediate results and easy debugging, while the specialized prompt rules provide clear separation of concerns for external LLM agents. The LightRAG integration enables rich entity discovery and relationship mapping, while local storage ensures complete privacy and control over personal content.

This architecture supports the core requirements of interactive story generation, entity management, and long-term growth with children, while providing a foundation for future enhancements and integrations. The prompt-based approach with hierarchical commands allows for easy modification and extension without requiring code changes, making it accessible to non-programmers while maintaining the structured approach of BMAD principles.
