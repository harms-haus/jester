# Components

## Core Components

**1. Agent System**
- **Purpose**: Orchestrates the 3-stage story generation workflow through prompt rules
- **Technology**: Markdown prompt rule files following BMAD pattern
- **Key Agents**:
  - `/muse` (Story Context Agent): Prompt rules for context gathering and entity discovery (Analyst role)
  - `/write` (Story Generation Agent): Prompt rules for outline and story generation (Dev role)
  - `/edit` (Cross-Stage Editor): Prompt rules for content modification and maintenance (QA role)
- **Communication**: LLM agents follow prompt rules to use file-based pipeline (YAML → Markdown → Markdown)
- **Dependencies**: LightRAG MCP client, external LLM capable of file operations

**2. LightRAG MCP Client**
- **Purpose**: Provides structured access to knowledge graph entities and relationships
- **Technology**: Python MCP client with OpenAPI integration
- **Key Features**:
  - Entity discovery and relationship queries
  - Structured data retrieval for story context
  - Graph management and entity validation
  - Local caching and offline mode support
- **Dependencies**: LightRAG service, Python runtime

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
2. External LLM follows Muse prompt rules to query LightRAG for entities
3. LLM generates context file and saves to `contexts/` per prompt instructions
4. User edits context file
5. User runs `/write outline`
6. External LLM follows Write prompt rules to read context, generate outline
7. LLM saves outline to `outlines/` per prompt instructions
8. User runs `/write story`
9. External LLM follows Write prompt rules to read outline, generate story
10. LLM saves story to `stories/` per prompt instructions
11. User runs `/edit` commands as needed
12. External LLM follows Edit prompt rules to track changes via Git

**Error Handling**:
- LightRAG connection failures → Prompt rules instruct LLM to use offline mode with cached data
- File system errors → Prompt rules instruct LLM to provide graceful degradation with user notification
- Validation failures → Prompt rules instruct LLM to provide detailed error messages with suggested fixes
- LLM failures → Prompt rules provide fallback to manual editing mode instructions
