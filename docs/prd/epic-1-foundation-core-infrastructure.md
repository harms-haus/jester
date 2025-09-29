# Epic 1: Foundation & Core Infrastructure

**Epic Goal**: Establish the fundamental project infrastructure, prompt rule framework, and basic file pipeline that enables simple story generation. This epic delivers a working proof-of-concept that demonstrates the core three-stage workflow (context → outline → story) with minimal functionality through markdown prompt rules that external LLM agents can follow, providing the foundation for all subsequent development.

## Story 1.1: Project Setup and Agent Framework

As a **prompt engineer**,
I want **to establish the basic project structure and prompt rule framework**,
so that **I have a foundation for building the jester storytelling system through markdown prompt rules**.

### Acceptance Criteria

1. **Project directory structure is created** with .jester/agents/, .jester/templates/, .jester/tasks/, .jester/data/, .jester/utils/, entities/, stories/, outlines/, and contexts/ directories
2. **Basic prompt rule files are created** for `/muse`, `/write`, and `/edit` commands following BMAD markdown format with YAML headers
3. **Prompt rule system is functional** with clear instructions for external LLM agents to follow
4. **File pipeline structure is established** with templates for context-template.yaml, outline-template.md, and story-template.md
5. **Basic error handling is implemented** through prompt rules for invalid commands and missing files
6. **Cross-platform compatibility is verified** through prompt rules for Windows, macOS, and Linux
7. **README.md is updated** with basic usage instructions and project overview

## Story 1.2: Basic Context Generation

As a **parent creating bedtime stories**,
I want **to use the `/muse` command to generate basic story context**,
so that **I can start the story creation process with essential information**.

### Acceptance Criteria

1. **`/muse` command accepts user input** for story ideas and basic requirements
2. **Context YAML file is generated** with basic structure including entities, plot, morals, and metadata
3. **User can specify target audience age** and story length requirements
4. **Basic plot template selection is available** (Hero's Journey, Pixar method, Golden Circle)
5. **Context file is saved** to contexts/ directory with timestamp
6. **Metadata is properly formatted** and includes all required fields
7. **User receives confirmation** of context file creation with file path

## Story 1.3: Basic Outline Generation

As a **parent creating bedtime stories**,
I want **to use the `/write outline` command to generate a story outline**,
so that **I can see the plot structure before generating the full story**.

### Acceptance Criteria

1. **`/write outline` command reads context YAML file** and generates outline
2. **Outline Markdown file is created** with plot points and character integration
3. **Metadata is propagated** from context to outline (target length, audience)
4. **Plot points are structured** with 2-3 sentence descriptions
5. **Character roles are integrated** into plot points based on context
6. **Outline file is saved** to outlines/ directory with timestamp
7. **User receives confirmation** of outline creation with file path

## Story 1.4: Basic Story Generation

As a **parent creating bedtime stories**,
I want **to use the `/write story` command to generate a complete story**,
so that **I can create a bedtime story from the outline**.

### Acceptance Criteria

1. **`/write story` command reads outline Markdown file** and generates story
2. **Story Markdown file is created** with complete narrative at target length
3. **Story includes title and summary** generated from outline content
4. **Character names and details are consistent** with outline specifications
5. **Story follows the plot structure** defined in the outline
6. **Story file is saved** to stories/ directory with timestamp
7. **User receives confirmation** of story creation with file path

## Story 1.5: Basic Edit Functionality

As a **parent creating bedtime stories**,
I want **to use the `/edit` command to modify outlines and stories**,
so that **I can refine the content without regenerating from scratch**.

### Acceptance Criteria

1. **`/edit` command accepts file path and edit instructions** for outlines and stories
2. **Edit operations are applied** to the specified file without regeneration
3. **File integrity is maintained** after edit operations
4. **User can edit character names, plot points, and story content** directly
5. **Edit changes are saved** to the original file
6. **User receives confirmation** of successful edit operations
7. **Backup files are created** before major edit operations

## Story 1.6: Entity Management client Implementation

As a **prompt engineer building a story universe**,
I want **to implement a Entity Management client for entity discovery and relationship querying**,
so that **I can leverage knowledge graph capabilities for enhanced story generation and entity management**.

### Acceptance Criteria

1. **Entity Management client is implemented** in TypeScript with proper error handling and connection management
2. **Entity label listing functionality** is available through `/graph/label/list` endpoint integration
3. **Knowledge graph querying** is supported through `/graphs` endpoint for relationship discovery
4. **Structured data querying** is implemented through `/query/data` endpoint for content retrieval
5. **Client integration** works with existing agents (Muse, Entity, Write) for enhanced functionality
6. **Error handling and fallback** mechanisms are in place for when Entity Management is unavailable
7. **TypeScript interfaces** are defined for all Entity Management API responses and requests
