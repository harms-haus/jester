# Components

## Core Components

**1. Agent System**
- **Purpose**: Orchestrates the 3-stage story generation workflow through prompt rules
- **Technology**: Markdown prompt rule files following BMAD pattern
- **Key Components**:
  - `@jester` (Main Entry Point): Unified workflow selection and user guidance
  - **Publishing Domain**: `/muse` (Story Context Agent) and `/write` (Story Generation Agent)
  - **Editing Domain**: `/edit` (Cross-Stage Editor) for content modification
  - **Entity Management Domain**: Entity creation and relationship management
  - **Validation Domain**: Content validation and quality assurance
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
1. User initiates `@jester` command
2. Entry Point Management analyzes user intent and presents workflow options
3. User selects workflow (new project, continue draft, universe management, help)
4. Entry Point Management loads appropriate agent files based on selection
5. **For New Project**:
   - User initiates `/muse` command via @jester
   - External LLM follows Muse prompt rules to query LightRAG for entities
   - LLM generates context file and saves to `contexts/` per prompt instructions
   - User edits context file
   - User runs `/write outline` via @jester
   - External LLM follows Write prompt rules to read context, generate outline
   - LLM saves outline to `outlines/` per prompt instructions
   - User runs `/write story` via @jester
   - External LLM follows Write prompt rules to read outline, generate story
   - LLM saves story to `stories/` per prompt instructions
   - User runs `/edit approve-draft {number}` via @jester
   - External LLM follows Edit prompt rules to move files to ready/ directory
   - **LLM creates entity files in ready/ directory and patch files for existing entities**
   - User runs `/edit publish "{title}"` via @jester
   - **External LLM follows Edit prompt rules to apply patches, copy files, and cleanup**
6. **For Continue Draft**: User runs `/edit` commands via @jester as needed
7. **For Universe Management**: User accesses entity management and validation tools via @jester
8. External LLM follows appropriate prompt rules to track changes via Git

**Error Handling**:
- LightRAG connection failures → Prompt rules instruct LLM to use offline mode with cached data
- File system errors → Prompt rules instruct LLM to provide graceful degradation with user notification
- Validation failures → Prompt rules instruct LLM to provide detailed error messages with suggested fixes
- LLM failures → Prompt rules provide fallback to manual editing mode instructions
