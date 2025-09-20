# Components

## Core Components

**1. Agent System**
- **Purpose**: Orchestrates the 3-stage story generation workflow
- **Technology**: Prompt-based agents (no custom code)
- **Key Agents**:
  - `/muse` (Story Context Agent): Interactive context gathering and entity discovery
  - `/write` (Story Generation Agent): Outline and story generation
  - `/edit` (Cross-Stage Editor): Content modification and maintenance
- **Communication**: File-based pipeline (YAML → Markdown → Markdown)
- **Dependencies**: LightRAG MCP client, local file system

**2. LightRAG MCP Client**
- **Purpose**: Provides structured access to knowledge graph entities and relationships
- **Technology**: TypeScript/Node.js with OpenAPI integration
- **Key Features**:
  - Entity discovery and relationship queries
  - Structured data retrieval for story context
  - Graph management and entity validation
  - Local caching and offline mode support
- **Dependencies**: LightRAG service, local file system

**3. File System Manager**
- **Purpose**: Manages local markdown files and directory structure
- **Technology**: Node.js file system operations
- **Key Features**:
  - Entity file management (characters/, locations/, items/)
  - Story file management (stories/, outlines/, contexts/)
  - Wiki-style link parsing and validation
  - Git integration for versioning and analytics
- **Dependencies**: Git, local file system

**4. Template System**
- **Purpose**: Provides structured templates for story generation
- **Technology**: YAML templates with prompt injection
- **Key Features**:
  - Plot template management (Hero's Journey, Pixar method, etc.)
  - Story context templates
  - Entity relationship templates
  - Customizable prompt structures
- **Dependencies**: Local file system

## Supporting Components

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

## Component Interactions

**Data Flow**:
1. User initiates `/muse` command
2. Story Context Agent queries LightRAG for entities
3. Context file generated and saved to `contexts/`
4. User edits context file
5. User runs `/write outline`
6. Story Generation Agent reads context, generates outline
7. Outline saved to `outlines/`
8. User runs `/write story`
9. Story Generation Agent reads outline, generates story
10. Story saved to `stories/`
11. User runs `/edit` commands as needed
12. Analytics Engine tracks changes via Git

**Error Handling**:
- LightRAG connection failures → Offline mode with cached data
- File system errors → Graceful degradation with user notification
- Validation failures → Detailed error messages with suggested fixes
- Agent failures → Fallback to manual editing mode
