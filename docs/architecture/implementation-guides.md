# Implementation Guides

This document provides detailed implementation guidance for each component of the Jester system, including specific patterns, examples, and best practices.

## Table of Contents

1. [Agent System Implementation](#agent-system-implementation)
2. [LightRAG MCP Client Implementation](#lightrag-mcp-client-implementation)
3. [File System Operations Implementation](#file-system-operations-implementation)
4. [Template System Implementation](#template-system-implementation)
5. [Configuration Manager Implementation](#configuration-manager-implementation)
6. [Analytics Engine Implementation](#analytics-engine-implementation)
7. [Validation System Implementation](#validation-system-implementation)
8. [CLI Initialization Tool Implementation](#cli-initialization-tool-implementation)

## Agent System Implementation

### Overview
The agent system is the core of Jester, providing hierarchical command structure and specialized functionality through prompt-based agents.

### Agent Structure
Each agent follows this structure:

```
.jester/agents/
├── jester.md              # Main entry point agent
├── write.md               # Story generation agent
├── muse.md                # Brainstorming agent
├── edit.md                # Cross-stage editor agent
├── delete.md              # Entity management agent
├── approve.md             # Workflow management agent
├── publish.md             # Publishing agent
├── import.md              # Content import agent
└── search.md              # Search agent
```

### Agent Template
Each agent file should follow this template:

```markdown
# Agent Name

## Purpose
[Brief description of the agent's purpose and responsibilities]

## Commands
- `command-name`: [Description of what the command does]

## Implementation Instructions

### Command Recognition
[How the agent should recognize and route commands]

### File Operations
[Specific file operations the agent should perform]

### Error Handling
[How the agent should handle errors and edge cases]

### User Interaction
[How the agent should interact with users]

## Examples
[Concrete examples of agent behavior]

## Dependencies
[List of other agents, templates, or systems this agent depends on]
```

### Agent Implementation Patterns

#### 1. Command Routing Pattern
```markdown
## Command Routing
When a user provides input, analyze it to determine:
1. Is this a direct command (e.g., `/write outline`)?
2. Is this a natural language request (e.g., "create an outline")?
3. What specific action is being requested?

Route to appropriate sub-command or procedure based on analysis.
```

#### 2. File Operation Pattern
```markdown
## File Operations
For each file operation:
1. Validate input parameters
2. Check file existence and permissions
3. Perform the operation
4. Validate the result
5. Provide user feedback
6. Log the operation for debugging
```

#### 3. Error Handling Pattern
```markdown
## Error Handling
For each operation:
1. Try the operation
2. If it fails, provide specific error message
3. Suggest corrective actions
4. Log error details for debugging
5. Gracefully degrade if possible
```

### Agent-Specific Implementation Details

#### Jester Agent (Main Entry Point)
- **Purpose**: Core functionalities, initialization, help, and project management
- **Key Commands**: `init`, `help`, `status`, `personas`
- **Implementation**: Handle project setup, provide guidance, manage personas

#### Write Agent (Story Generation)
- **Purpose**: Context, outline, and story generation
- **Key Commands**: `context`, `outline`, `story`
- **Implementation**: Generate content following templates and user requirements

#### Muse Agent (Brainstorming)
- **Purpose**: Context gathering, entity discovery, and creative exploration
- **Key Commands**: `create-new`, `explore-existing`, `list-elicitations`
- **Implementation**: Interactive dialogue for idea exploration and context creation

#### Edit Agent (Cross-Stage Editor)
- **Purpose**: Content modification, entity editing, and maintenance
- **Key Commands**: `character`, `location`, `item`, general editing
- **Implementation**: Modify existing content while maintaining consistency

#### Delete Agent (Entity Management)
- **Purpose**: Entity and story removal with confirmation workflows
- **Key Commands**: `character`, `location`, `item`, `story`
- **Implementation**: Safe deletion with confirmation and cleanup

#### Approve Agent (Workflow Management)
- **Purpose**: Draft approval and progression to reading stage
- **Key Commands**: `draft`, `validate`, `progress`
- **Implementation**: Validate content and move between workflow stages

#### Publish Agent (Publishing)
- **Purpose**: Story publishing with entity patches and cleanup
- **Key Commands**: `story`, `entities`, `cleanup`
- **Implementation**: Publish content to universe with proper entity management

#### Import Agent (Content Import)
- **Purpose**: Entity and story import from files or directories
- **Key Commands**: `file`, `directory`, `validate`
- **Implementation**: Import external content with validation and organization

#### Search Agent (Search)
- **Purpose**: Local file and LightRAG database search capabilities
- **Key Commands**: `local`, `lightrag`, `entities`
- **Implementation**: Search across local files and knowledge graph

## LightRAG MCP Client Implementation

### Overview
The LightRAG MCP client is the only TypeScript implementation in the system, providing reliable API communication with the LightRAG knowledge graph service.

### Client Structure
```
src/clients/
├── lightragClient.ts      # Main client implementation
├── lightragService.ts     # Service layer
├── lightragMcpServer.ts   # MCP server implementation
└── types/
    └── lightrag.ts        # TypeScript interfaces
```

### Implementation Details

#### 1. Client Interface
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
```

#### 2. Error Handling
```typescript
class LightRAGClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'LightRAGClientError';
  }
}

// Error handling pattern
try {
  const response = await this.query(query);
  return response;
} catch (error) {
  if (error instanceof LightRAGClientError) {
    // Handle specific LightRAG errors
    throw new Error(`LightRAG query failed: ${error.message}`);
  } else {
    // Handle network or other errors
    throw new Error(`Network error: ${error.message}`);
  }
}
```

#### 3. Caching Strategy
```typescript
class LightRAGClientWithCache implements LightRAGClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async query(query: string, enableRerank = true): Promise<QueryResponse> {
    const cacheKey = `query:${query}:${enableRerank}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    const response = await this.performQuery(query, enableRerank);
    this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
    return response;
  }
}
```

#### 4. Offline Mode
```typescript
class LightRAGClientWithOfflineMode implements LightRAGClient {
  private offlineMode = false;
  private offlineData = new Map<string, any>();

  async query(query: string, enableRerank = true): Promise<QueryResponse> {
    if (this.offlineMode) {
      return this.getOfflineData(query);
    }
    
    try {
      return await this.performQuery(query, enableRerank);
    } catch (error) {
      this.offlineMode = true;
      return this.getOfflineData(query);
    }
  }
}
```

### Integration with Agents
The MCP client is integrated with agents through prompt instructions:

```markdown
## LightRAG Integration
When querying LightRAG:
1. Use the MCP client to perform queries
2. Handle errors gracefully with fallback to cached data
3. Cache responses for offline operation
4. Provide user feedback about query status
5. Log all queries for debugging
```

## File System Operations Implementation

### Overview
File system operations are performed by LLM agents following prompt instructions, ensuring human-readable intermediate results and easy debugging.

### File Operation Patterns

#### 1. File Creation Pattern
```markdown
## File Creation
When creating a new file:
1. Validate the file path and name
2. Check if the file already exists
3. Create the directory structure if needed
4. Write the file content
5. Validate the file was created successfully
6. Provide user confirmation
```

#### 2. File Reading Pattern
```markdown
## File Reading
When reading a file:
1. Check if the file exists
2. Validate file permissions
3. Read the file content
4. Parse the content if needed (YAML, Markdown)
5. Handle parsing errors gracefully
6. Return the parsed content
```

#### 3. File Modification Pattern
```markdown
## File Modification
When modifying a file:
1. Read the current file content
2. Create a backup of the original file
3. Apply the modifications
4. Validate the modified content
5. Write the modified content
6. Provide user confirmation
7. Log the changes for debugging
```

### Directory Management

#### 1. Directory Creation
```markdown
## Directory Creation
When creating directories:
1. Check if the directory already exists
2. Create parent directories if needed
3. Set appropriate permissions
4. Validate the directory was created
5. Provide user confirmation
```

#### 2. Directory Scanning
```markdown
## Directory Scanning
When scanning directories:
1. Check directory permissions
2. List all files and subdirectories
3. Filter files by type or pattern
4. Return organized file list
5. Handle permission errors gracefully
```

### File Validation

#### 1. Content Validation
```markdown
## Content Validation
When validating file content:
1. Check file format (YAML, Markdown)
2. Validate required fields
3. Check for syntax errors
4. Validate entity references
5. Check for broken links
6. Provide detailed error messages
```

#### 2. Structure Validation
```markdown
## Structure Validation
When validating file structure:
1. Check required directories exist
2. Validate file naming conventions
3. Check for missing files
4. Validate file relationships
5. Check for circular references
6. Provide structure report
```

## Template System Implementation

### Overview
The template system provides structured templates for LLM agents to use in story generation, ensuring consistency and quality.

### Template Structure
```
.jester/templates/
├── story/
│   ├── context-template.yaml
│   ├── outline-template.md
│   └── story-template.md
├── plot/
│   ├── heroes-journey.yaml
│   ├── pixar-method.yaml
│   └── golden-circle.yaml
├── entity/
│   ├── character-template.md
│   ├── location-template.md
│   └── item-template.md
└── memory/
    ├── persona-settings-template.yaml
    └── target-audience-profiles-template.yaml
```

### Template Implementation Patterns

#### 1. YAML Template Pattern
```yaml
# context-template.yaml
title: "{{story_title}}"
target_audience:
  age_range: "{{age_range}}"
  reading_level: "{{reading_level}}"
target_length:
  min_words: {{min_words}}
  max_words: {{max_words}}
  final_target: {{final_target}}
entities:
  characters: []
  locations: []
  items: []
plot_template: "{{plot_template}}"
plot_points: []
location_progression: []
morals: []
themes: []
metadata:
  created_at: "{{timestamp}}"
  last_modified: "{{timestamp}}"
  version: 1
```

#### 2. Markdown Template Pattern
```markdown
# {{entity_name}}

## Description
{{entity_description}}

## Properties
- **Type**: {{entity_type}}
- **Appearance**: {{appearance}}
- **Personality**: {{personality}}

## Relationships
{{#each relationships}}
- [[{{this}}]]
{{/each}}

## Story Appearances
{{#each appearances}}
- [[{{this}}]]
{{/each}}

## Metadata
- **Created**: {{created_at}}
- **Last Modified**: {{last_modified}}
- **Usage Count**: {{usage_count}}
```

#### 3. Template Processing
```markdown
## Template Processing
When processing templates:
1. Load the appropriate template
2. Replace placeholders with actual values
3. Validate the processed content
4. Handle missing or invalid values
5. Return the processed content
6. Log template usage for debugging
```

## Configuration Manager Implementation

### Overview
The configuration manager handles project settings, LightRAG connection, and user preferences through YAML configuration files.

### Configuration Structure
```
.jester/
├── config/
│   ├── project.yaml
│   ├── lightrag.yaml
│   └── user-preferences.yaml
└── templates/
    └── config/
        ├── project-template.yaml
        ├── lightrag-template.yaml
        └── user-preferences-template.yaml
```

### Configuration Implementation

#### 1. Project Configuration
```yaml
# project.yaml
project:
  name: "jester"
  version: "1.0.0"
  description: "Prompt-based bedtime story generation system"
  
directories:
  draft: "draft/"
  reading: "reading/"
  universe: "universe/"
  import_staging: "import-staging/"
  
file_patterns:
  context: "context-{number}.yaml"
  outline: "outline-{number}.md"
  story: "story-{number}.md"
  
validation:
  enabled: true
  strict_mode: false
  backup_enabled: true
```

#### 2. LightRAG Configuration
```yaml
# lightrag.yaml
lightrag:
  base_url: "http://localhost:9621"
  api_key: "${LIGHTRAG_API_KEY}"
  timeout: 30000
  retry_attempts: 3
  cache_enabled: true
  cache_timeout: 300
  
endpoints:
  query: "/query"
  query_stream: "/query/stream"
  query_data: "/query/data"
  graph_labels: "/graph/label/list"
  graph_nodes: "/graphs"
  entity_exists: "/graph/entity/exists"
  health: "/health"
```

#### 3. Configuration Loading
```markdown
## Configuration Loading
When loading configuration:
1. Check for configuration files
2. Load default templates if files don't exist
3. Validate configuration values
4. Handle missing or invalid values
5. Provide user feedback about configuration status
6. Log configuration loading for debugging
```

## Analytics Engine Implementation

### Overview
The analytics engine tracks story universe growth, entity usage, and system performance through Git log analysis and file system monitoring.

### Analytics Implementation

#### 1. Git Analytics
```markdown
## Git Analytics
When analyzing Git history:
1. Parse Git log for file changes
2. Track entity usage and modifications
3. Analyze story generation patterns
4. Generate usage statistics
5. Identify growth trends
6. Provide analytics reports
```

#### 2. File System Analytics
```markdown
## File System Analytics
When monitoring file system:
1. Track file creation and modification
2. Monitor directory structure changes
3. Analyze file size and content patterns
4. Track entity relationship evolution
5. Generate growth reports
6. Identify optimization opportunities
```

#### 3. Performance Analytics
```markdown
## Performance Analytics
When tracking performance:
1. Monitor operation execution times
2. Track resource usage
3. Analyze error rates and patterns
4. Identify performance bottlenecks
5. Generate performance reports
6. Suggest optimization strategies
```

## Validation System Implementation

### Overview
The validation system ensures consistency between local files and LightRAG, validates content quality, and prevents data loss during story progression.

### Validation Implementation

#### 1. Content Validation
```markdown
## Content Validation
When validating content:
1. Check file format and syntax
2. Validate required fields
3. Check entity references
4. Validate story structure
5. Check for consistency issues
6. Provide detailed validation reports
```

#### 2. Entity Validation
```markdown
## Entity Validation
When validating entities:
1. Check entity file structure
2. Validate entity properties
3. Check entity relationships
4. Validate entity references
5. Check for duplicate entities
6. Provide entity validation reports
```

#### 3. Workflow Validation
```markdown
## Workflow Validation
When validating workflow progression:
1. Check file completeness
2. Validate content quality
3. Check for conflicts
4. Validate entity consistency
5. Check for missing dependencies
6. Provide workflow validation reports
```

## CLI Initialization Tool Implementation

### Overview
The CLI initialization tool provides user-friendly project setup and content discovery, preparing the environment for prompt-based agents.

### CLI Implementation

#### 1. Project Initialization
```markdown
## Project Initialization
When initializing a project:
1. Check if .jester directory exists
2. Create directory structure
3. Copy template files
4. Initialize Git repository if needed
5. Validate setup
6. Provide setup confirmation
```

#### 2. Content Discovery
```markdown
## Content Discovery
When discovering content:
1. Scan directory for markdown files
2. Identify potential stories, outlines, and contexts
3. Detect entity files
4. Analyze content structure
5. Suggest import candidates
6. Provide discovery report
```

#### 3. Import Workflow
```markdown
## Import Workflow
When importing content:
1. Present import suggestions
2. Get user confirmation
3. Move files to import-staging
4. Validate imported content
5. Provide import summary
6. Guide user to next steps
```

## Implementation Best Practices

### 1. Error Handling
- Always provide specific error messages
- Suggest corrective actions
- Log errors for debugging
- Gracefully degrade when possible

### 2. User Feedback
- Provide clear confirmation messages
- Show progress for long operations
- Explain what's happening
- Offer help when needed

### 3. Validation
- Validate all inputs
- Check file operations
- Verify content quality
- Provide validation reports

### 4. Logging
- Log all operations
- Include context information
- Use structured logging
- Enable debug mode

### 5. Testing
- Test all file operations
- Validate error handling
- Check user interactions
- Verify system integration

## Common Pitfalls and Solutions

### 1. File Operation Failures
**Problem**: File operations fail due to permissions or path issues
**Solution**: Always check permissions and validate paths before operations

### 2. Template Processing Errors
**Problem**: Templates fail to process due to missing or invalid values
**Solution**: Validate all template values and provide defaults for missing values

### 3. Agent Command Confusion
**Problem**: Agents don't recognize commands or route them correctly
**Solution**: Implement robust command recognition and provide clear error messages

### 4. LightRAG Connection Issues
**Problem**: LightRAG service is unavailable or returns errors
**Solution**: Implement offline mode and graceful error handling

### 5. Validation Failures
**Problem**: Content validation fails due to strict rules
**Solution**: Provide user override options and clear validation messages

## Debugging Guidelines

### 1. Enable Debug Mode
```markdown
## Debug Mode
When debug mode is enabled:
1. Log all operations
2. Show loaded context files
3. Display intermediate results
4. Provide detailed error messages
5. Show validation details
6. Log performance metrics
```

### 2. Common Debug Scenarios
- File operation failures
- Template processing errors
- Agent command issues
- LightRAG connection problems
- Validation failures
- Performance issues

### 3. Debug Information
- Operation logs
- Error details
- Context information
- Performance metrics
- Validation results
- User interactions
