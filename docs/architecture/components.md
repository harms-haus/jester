# Components

## Core Components

**1. Agent System**
- **Purpose**: Orchestrates the hierarchical command workflow through prompt rules
- **Technology**: Markdown prompt rule files following BMAD pattern
- **Key Agents**:
  - `/jester` (Main Entry Point): Core functionalities, initialization, help, and project management
  - `/write` (Story Generation Agent): Context, outline, and story generation (Dev role)
  - `/muse` (Brainstorming Agent): Context gathering, entity discovery, and creative exploration (Analyst role)
  - `/edit` (Cross-Stage Editor): Content modification, entity editing, and maintenance (QA role)
  - `/delete` (Entity Management Agent): Entity and story removal with confirmation workflows
  - `/approve` (Workflow Management Agent): Draft approval and progression to ready stage
  - `/publish` (Publishing Agent): Story publishing with entity patches and cleanup
  - `/import` (Content Import Agent): Entity and story import from files or directories
  - `/search` (Search Agent): Local file and LightRAG database search capabilities
- **Communication**: LLM agents follow prompt rules to use file-based pipeline (YAML → Markdown → Markdown)
- **Dependencies**: LightRAG MCP client, external LLM capable of file operations

**1a. Entry Point Management**
- **Purpose**: Provides unified workflow selection and user guidance
- **Technology**: Markdown prompt rule file with workflow selection logic
- **Key Features**:
  - User greeting and intent analysis
  - Workflow selection (new project, continue draft, universe management, help)
  - Dynamic agent file loading based on user selection
  - Seamless transitions to specialized agents
- **Dependencies**: All agent files, workflow selection prompts

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
  - **Patch file management (patches/) via LLM operations**
  - **Conflict detection and validation via LLM operations**
  - **Cleanup operations after successful publish via LLM operations**
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
