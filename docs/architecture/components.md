# Components

## Core Components

### 1. Agent System

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
  - `/search` (Search Agent): Local file and Entity Management database search capabilities
- **Communication**: LLM agents follow prompt rules to use file-based pipeline (YAML → Markdown → Markdown)
- **Dependencies**: Entity Management client, external LLM capable of file operations

### 1a. Entry Point Management

- **Purpose**: Provides unified workflow selection and user guidance
- **Technology**: Markdown prompt rule file with workflow selection logic
- **Key Features**:
  - User greeting and intent analysis
  - Workflow selection (new project, continue draft, universe management, help)
  - Dynamic agent file loading based on user selection
  - Seamless transitions to specialized agents
- **Dependencies**: All agent files, workflow selection prompts

### 2. Entity Management client

- **Purpose**: Provides structured access to knowledge graph entities and relationships
- **Technology**: Python Entity Management client with OpenAPI integration
- **Key Features**:
  - Entity discovery and relationship queries
  - Structured data retrieval for story context
  - Graph management and entity validation
  - Local caching and offline mode support
- **Dependencies**: Entity Management service, Python runtime

### 3. File System Operations

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

### 4. Template System

- **Purpose**: Provides structured templates for LLM agents to use in story generation
- **Technology**: YAML/Markdown templates referenced by prompt rules
- **Key Features**:
  - Plot template management (Hero's Journey, Pixar method, etc.)
  - Story context templates
  - Entity relationship templates
  - Customizable prompt structures for LLM agents
- **Dependencies**: Local file system, prompt rules

## Supporting Components

### 5. Configuration Manager

- **Purpose**: Manages project settings, Entity Management connection, and user preferences
- **Technology**: YAML configuration files
- **Key Features**:
  - Entity Management endpoint configuration
  - Story generation parameters
  - Entity type definitions
  - Template selection
  - **Target audience member profiles and preferences**
  - **Persona system settings**
- **Dependencies**: Local file system, `.memory` system

### 6. Analytics Engine

- **Purpose**: Tracks story universe growth and entity usage
- **Technology**: Git log analysis and file system monitoring
- **Key Features**:
  - Entity usage tracking
  - Story generation metrics
  - Relationship evolution analysis
  - Growth pattern identification
- **Dependencies**: Git, local file system

### 7. Validation System

- **Purpose**: Ensures consistency between local files and Entity Management
- **Technology**: TypeScript validation logic
- **Key Features**:
  - Entity existence validation
  - Link integrity checking
  - File format validation
  - Relationship consistency verification
- **Dependencies**: Entity Management client, local file system

### 8. Target Audience Management System

- **Purpose**: Manages personalized target audience member profiles and parameter calculation
- **Technology**: YAML configuration files with prompt-based agent integration
- **Key Features**:
  - Target audience member profile creation and management
  - Automatic age calculation from birthday information
  - Intelligent parameter adjustment for multiple members
  - Integration with story generation pipeline
  - Profile persistence in `.memory` system
  - Template-based initialization from `.jester/templates/memory/`
- **Dependencies**: Local file system, agent system, template system

## Component Interactions

### Data Flow

1. User initiates `/jester` command for project management or `/muse create-new` for story creation
2. **Target Audience Integration**: System loads target audience profiles from `.memory` system
3. **Target Audience Selection**: User selects target audience members via `/jester audience select` command
4. **Parameter Calculation**: System calculates age ranges and target lengths from selected members
5. External LLM follows appropriate prompt rules to query Entity Management via TypeScript Entity Management client for entities
6. LLM generates context file with target audience parameters and saves to `contexts/` per prompt instructions
7. User edits context file
8. User runs `/write outline`
9. External LLM follows Write prompt rules to read context, generate outline
10. LLM saves outline to `outlines/` per prompt instructions
11. User runs `/write story`
12. External LLM follows Write prompt rules to read outline, generate story
13. LLM saves story to `stories/` per prompt instructions
14. User runs `/edit` commands for content modification or `/delete` commands for entity removal
15. User runs `/approve` to move draft to reading stage
16. User runs `/publish` to publish reading story with entities and patches
17. **For Import Management**: User runs `/import` commands to import content to import-staging/
18. **For Search**: User runs `/search` commands to query local files and Entity Management database
19. **For Target Audience Management**: User runs `/jester audience` commands to manage member profiles
20. External LLM follows appropriate prompt rules to track changes via Git

### Error Handling

- Entity Management connection failures → Prompt rules instruct LLM to use offline mode with cached data
- File system errors → Prompt rules instruct LLM to provide graceful degradation with user notification
- Validation failures → Prompt rules instruct LLM to provide detailed error messages with suggested fixes
- LLM failures → Prompt rules provide fallback to manual editing mode instructions
- **Target audience calculation failures** → Prompt rules instruct LLM to fall back to default parameters with user notification
- **Invalid birthday data** → Prompt rules instruct LLM to request valid date format and provide examples
- **Missing target audience profiles** → Prompt rules instruct LLM to offer profile creation or use default parameters
