# jester Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Enable parents to create consistent, personalized bedtime stories through a structured three-stage workflow
- Maintain character continuity and entity relationships across multiple stories using LightRAG integration
- Provide AI-assisted story creation while preserving the collaborative human creative process
- Create a growing library of interconnected stories that evolve with children's development
- Establish a sustainable workflow that parents can use regularly without technical barriers
- Demonstrate measurable improvement in story consistency compared to unstructured approaches

### Background Context

jester addresses a critical gap in current bedtime story creation tools. While existing solutions focus on either pre-written stories lacking personalization or simple AI generation missing the collaborative element, parents need a system that provides structure without constraining creativity. The current unstructured approach leads to character inconsistencies, repetitive content, and lost story elements over time.

jester adapts proven software development methodologies (BMAD principles) to create a structured, three-stage storytelling workflow. The system uses specialized AI agents for context gathering and story generation, integrated with LightRAG knowledge graphs to ensure entity consistency and suggest meaningful connections. This approach enables parents to build rich, interconnected story universes that grow with their children while maintaining the collaborative creative process they value.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2024-12-19 | 1.0 | Initial PRD creation from project brief | John (PM) |

## Requirements

### Functional

1. **FR1**: The system shall provide a `/jester` command that serves as the main entry point for core functionalities including initialization, help, and project management
2. **FR2**: The `/jester` command shall provide sub-commands:
   - `init` - Initialize git repo if installed (help user install otherwise)
   - `help` - Describe how jester works, answer questions, load necessary prompts/agents
3. **FR3**: The system shall provide a `/write` command for core generation functionalities:
   - No sub-command: Take remaining text as prompt to generate new story project or update current story context
   - `context` - Write out the context
   - `outline` - Write out the outline  
   - `story` - Write out the story
4. **FR4**: The system shall provide a `/muse` command for core brainstorming functionalities:
   - `create-new` - Start new brainstorming session about new story, create context file at end
   - `explore-existing` - Explore existing draft to tease out new details
   - `list-elicitations` - List various ways jester elicits details, allow choosing one for brainstorming
5. **FR5**: The system shall provide an `/edit` command for core editing functionalities:
   - No sub-command: Take remaining text as prompt to generate new entity or change entity/story across stories, outlines, contexts
   - `character`/`location`/`item` - Edit entity by name, ask user to describe change if not provided
   - Assume "reading" universe unless prompt specifies "universe"
   - Use "patch" system for changes to "universe" when entity not in "reading"
6. **FR6**: The system shall provide a `/delete` command to remove entities from universe:
   - No sub-command: Take remaining text as prompt to remove entity from universe
   - `character`/`location`/`item`/`story` - Delete entity by name
   - Double-confirm story deletion in any context
   - Double-confirm entity deletion in "universe"
7. **FR7**: The system shall provide an `/approve` command to approve draft to move to "reading" universe
8. **FR8**: The system shall provide a `/publish` command to publish "reading" story with all included entities and patches
9. **FR9**: The system shall provide an `/import` command to import entity or story from file, or many entities/stories from directory
10. **FR10**: The system shall provide a `/search` command to search local files and LightRAG database with natural-language queries
11. **FR11**: The system shall maintain a strict file pipeline: YAML context → Markdown outline → Markdown story
12. **FR12**: The system shall support multiple plot templates (Hero's Journey, Pixar method, Golden Circle)
13. **FR13**: The system shall integrate with LightRAG via MCP for entity discovery and relationship mapping
14. **FR14**: The system shall prevent context bleeding between pipeline stages (each stage reads only its designated input)
15. **FR15**: The system shall maintain local markdown files for all entities organized in subdirectories (universe/characters/, universe/locations/, universe/items/)
16. **FR16**: The system shall create and maintain a local story universe wiki with interconnected entity files using proper wiki-style [[links]]
17. **FR17**: The system shall use local entity files as the primary source of truth for story generation
18. **FR18**: The system shall query LightRAG only for relationship discovery and entity connections
19. **FR19**: The system shall support Obsidian-compatible markdown formatting and linking
20. **FR20**: The system shall provide fine-grained control over which entity information is available to story generation
21. **FR21**: The system shall maintain proper [[link]] syntax for bidirectional entity relationships across subdirectories
22. **FR22**: The system shall organize files in a three-stage workflow with story-project-based organization:
    - `draft/{NNN}/` - Work in progress organized by story project number (001/, 002/, 013/, etc.)
    - `reading/{NNN} - Story Title/` - Approved work ready for review and reading
    - `universe/` - Published work in the story universe
    - `import-staging/` - Imported content awaiting user validation
    - `contexts/` - Context files (no staging needed)
23. **FR23**: The system shall maintain story project organization:
    - Each story project has a unique 3-digit number (001, 002, 013, etc.)
    - Draft projects use format: `draft/{NNN}/` with subdirectories for characters/, contexts/, items/, locations/, outlines/, stories/
    - Reading projects use format: `reading/{NNN} - Story Title/` with same subdirectory structure
    - All files within a project maintain the same project number
24. **FR24**: The system shall organize framework files in a hidden `.jester/` directory structure:
    - `.jester/agents/` - Agent definitions
    - `.jester/templates/` - Story and context templates  
    - `.jester/tasks/` - Reusable workflow tasks
    - `.jester/data/` - Knowledge base and reference data
    - `.jester/utils/` - Utility functions and helpers
25. **FR25**: The system shall validate draft completeness before progression to reading stage, ensuring all required files exist and contain valid content
26. **FR26**: The system shall validate entity files and patch formatting before progression to published stage
27. **FR27**: The system shall detect and warn users about target directory conflicts before story progression
28. **FR28**: The system shall require user approval before overwriting existing files during story progression
29. **FR29**: The system shall provide the standardized command structure as defined in FR1-FR10, replacing all previous command patterns with the new hierarchical structure
30. **FR30**: The system shall use consistent entity file naming conventions:
    - New entities: `{Entity Name with Proper Casing, Punctuation and Spacing}.md` (e.g., `Stella Stoat.md`)
    - Entity patches: `{Entity Name with Proper Casing, Punctuation and Spacing}.patch.md` (e.g., `Stella Stoat.patch.md`)
31. **FR31**: The system shall use git-patch format for entity patch files with proper "incoming" and "current" sections and expected line start/end markers
32. **FR32**: The system shall implement comprehensive conflict detection before story progression:
    - Scan target directories for existing files with matching names
    - Warn users about potential overwrites
    - Require explicit user approval for conflicts
    - Provide detailed conflict summary before proceeding
33. **FR33**: The system shall apply entity patches before copying files during reading → universe progression
34. **FR34**: The system shall perform complete cleanup of reading/ directory after successful publish
35. **FR35**: The system shall maintain change history by updating universe/ entity files with patch information and deleting patch files after successful application
36. **FR36**: The system shall validate patch file format before applying patches
37. **FR37**: The system shall provide a CLI initialization tool accessible via `npx jester-story-framework` that:
    - Initializes a new Jester project with universe `.jester/` directory structure
    - Scans the current working directory for existing story documents
    - Suggests discovered content for import into the import-staging/ directory
    - Provides user-friendly setup guidance and next steps
    - Detects if `.jester/` structure already exists and provides appropriate messaging

### Non Functional

1. **NFR1**: Token usage costs must remain under $1 per universe story generation (context → outline → story)
2. **NFR2**: The system shall operate within IDE environments (Cursor, VS Code) with command-line interface
3. **NFR3**: File operations shall be fast and efficient for pipeline management
4. **NFR4**: Story generation and information extraction may be slower but must be thorough and accurate
5. **NFR5**: The system shall maintain character consistency across stories 90% of the time
6. **NFR6**: The system shall be cross-platform compatible (Windows, macOS, Linux)
7. **NFR7**: The system shall use prompt-based agents with minimal TypeScript dependencies (only for LightRAG MCP client)
8. **NFR8**: The system shall preserve user privacy by keeping all story content local
9. **NFR9**: The system shall be maintainable and extensible for future enhancements
10. **NFR10**: The system shall provide clear error messages and graceful handling of LightRAG query failures
11. **NFR11**: The system shall maintain local file consistency and prevent broken [[links]] across entity subdirectories
12. **NFR12**: The system shall provide fast local file operations for entity lookup and story generation
13. **NFR13**: The system shall support manual LightRAG updates without automatic synchronization
14. **NFR14**: The system shall maintain clean separation between framework files (hidden) and user content (visible)
15. **NFR15**: The system shall provide intuitive user experience with minimal visible complexity

## User Interface Design Goals

### Overall UX Vision

jester provides an intuitive, conversational interface that feels natural to parents creating bedtime stories. The system should feel like collaborating with a knowledgeable storytelling partner who understands your family's unique story universe. The command-line interface should be approachable and engaging, with clear prompts and helpful suggestions that guide users through the creative process without overwhelming them.

### Key Interaction Paradigms

- **Hierarchical Commands**: Clear, organized slash commands (`/jester`, `/write`, `/muse`, `/edit`, `/delete`, `/approve`, `/publish`, `/import`, `/search`) that provide contextual guidance
- **Interactive Dialogue**: The `/muse` agent engages in back-and-forth conversation to explore ideas and discover connections
- **File-Based Workflow**: Clear visual feedback through file creation and modification in the IDE
- **Contextual Help**: Built-in guidance and examples that appear when needed
- **Progressive Disclosure**: Information revealed gradually as users become more comfortable with the system

### Core Screens and Views

- **Command Interface**: Primary interaction point for all agent commands
- **File Explorer**: IDE file tree showing context.yaml, outline.md, and story.md files
- **Story Library**: Directory view of generated stories organized by date or theme
- **LightRAG Query Results**: Display of entity connections and relationships discovered
- **Edit Interface**: In-place editing capabilities for outlines and stories

### Accessibility: None

jester is designed for personal use by tech-savvy parents in IDE environments, with command-line interface optimized for efficiency and developer workflows.

### Branding

- **Playful yet Professional**: The "jester" name reflects the playful, creative nature of storytelling while maintaining the systematic approach of the tool
- **Clean and Minimal**: Interface design should be unobtrusive, letting the creative content shine
- **Family-Friendly**: Visual elements should feel warm and approachable, suitable for bedtime story creation

### Target Device and Platforms: Cross-Platform

- **Primary**: IDE environments (Cursor, VS Code) with command-line interface
- **Secondary**: Terminal/command-line applications on Windows, macOS, and Linux
- **Future**: Potential web interface for easier access (post-MVP)

## Technical Assumptions

### Repository Structure: Monorepo

jester will use a monorepo structure containing all agent definitions, templates, tasks, and generated content in a single repository. This approach simplifies development, deployment, and maintenance for a personal project while keeping all related files together.

### Service Architecture

**Prompt-Based Agent System**: jester uses a microservices-inspired architecture with specialized agents (`/muse`, `/write`, `/edit`) that communicate through file-based pipelines. Each agent is a self-contained markdown file with YAML configuration, following BMAD principles. The system uses minimal TypeScript dependencies (only for LightRAG MCP client) while maintaining pure prompt-based agent behavior.

**Development Target**: The development process produces **markdown prompt rule files** that external LLM agents can follow to perform story generation tasks. These prompt files follow the same BMAD pattern as the current analyst/qa/dev agent rules, where:
- **Muse Agent** = Analyst role (context gathering and requirements)
- **Edit Agent** = QA role (validation and refinement) 
- **Write Agent** = Dev role (implementation and generation)

**TypeScript Exception**: The LightRAG MCP client is the only TypeScript implementation in the system, required for reliable API communication. All other functionality uses prompt-based agents.

The dev agent does NOT write TypeScript or other programming languages - only prompt engineering for LLM agents, except for the LightRAG client implementation.

### Testing Requirements

**Prompt Engineering Validation**: The system requires validation of prompt rule effectiveness and LLM agent compliance. Testing should cover:
- Prompt rule clarity and completeness for LLM agents
- Agent behavior consistency when following prompt rules
- File pipeline integrity (YAML → Markdown → Markdown) through LLM execution
- LightRAG integration and query handling via prompt instructions
- Entity file management and [[link]] consistency through LLM operations
- Cross-platform compatibility of generated files

### Additional Technical Assumptions and Requests

- **Prompt Rule Engineering**: The system must produce clear, actionable prompt rules that LLM agents can follow to perform file operations
- **Markdown Processing**: LLM agents must handle markdown parsing and generation for entity files, stories, and outlines with proper [[wiki-link]] support
- **File System Operations**: Prompt rules must instruct LLM agents to perform robust file creation, reading, and modification with proper error handling
- **LightRAG MCP Integration**: TypeScript MCP client for querying relationships and entity connections only (not part of prompt rules)
- **Cross-Platform File Paths**: Prompt rules must instruct LLM agents to handle file paths across Windows, macOS, and Linux
- **Entity File Templates**: Prompt rules must reference standardized markdown templates for characters, locations, and items with consistent structure
- **Link Validation**: Prompt rules must instruct LLM agents to detect and report broken [[links]] in the entity wiki
- **Directory Management**: Prompt rules must instruct LLM agents to create and organize entity subdirectories
- **Content Versioning**: Prompt rules must instruct LLM agents to track changes to entity files and stories

## Epic List

1. **Epic 1: Foundation & Core Infrastructure** - Establish project setup, agent framework, and basic file pipeline with a simple story generation capability
2. **Epic 2: Entity Management System** - Create the wiki-style entity file system with subdirectories, markdown templates, and [[link]] support for characters, locations, and items
3. **Epic 3: LightRAG Integration** - Implement basic MCP integration for relationship discovery and entity connections while maintaining local files as primary source
4. **Epic 4: Advanced Story Generation** - Enhance story generation with plot templates, metadata propagation, cross-stage editing capabilities, story library management, and story consistency checking
5. **Epic 5: Story Universe Management** - Add link validation and content management for the universe storytelling ecosystem

## Epic 1: Foundation & Core Infrastructure

**Epic Goal**: Establish the fundamental project infrastructure, agent framework, and basic file pipeline that enables simple story generation. This epic delivers a working proof-of-concept that demonstrates the core three-stage workflow (context → outline → story) with minimal functionality, providing the foundation for all subsequent development.

### Story 1.1: Project Setup and Agent Framework

As a **developer**,
I want **to establish the basic project structure and agent framework with the new standardized command structure**,
so that **I have a foundation for building the jester storytelling system with clear, hierarchical commands**.

#### Acceptance Criteria

1. **Project directory structure is created** with agents/, templates/, tasks/, data/, utils/, entities/, stories/, outlines/, and contexts/ directories
2. **New command structure is implemented** with `/jester`, `/write`, `/muse`, `/edit`, `/delete`, `/approve`, `/publish`, `/import`, `/search` commands
3. **Agent command system is functional** with hierarchical command recognition and routing
4. **File pipeline structure is established** with placeholder files for context.yaml, outline.md, and story.md
5. **Basic error handling is implemented** for invalid commands and missing files
6. **Cross-platform compatibility is verified** on Windows, macOS, and Linux
7. **README.md is updated** with new command structure and usage instructions
8. **CLI initialization tool is available** via `npx jester-story-framework` command
9. **CLI tool creates universe `.jester/` structure** in target directory
10. **CLI tool provides setup guidance** and next steps for users

### Story 1.2: Basic Context Generation

As a **parent creating bedtime stories**,
I want **to use the `/muse create-new` command to generate basic story context**,
so that **I can start the story creation process with essential information**.

#### Acceptance Criteria

1. **`/muse create-new` command accepts user input** for story ideas and basic requirements
2. **Context YAML file is generated** with basic structure including entities, plot, morals, and metadata
3. **User can specify target audience age** and story length requirements
4. **Basic plot template selection is available** (Hero's Journey, Pixar method, Golden Circle)
5. **Context file is saved** to draft/ directory with incrementing draft number
6. **Metadata is properly formatted** and includes all required fields
7. **User receives confirmation** of context file creation with file path

### Story 1.3: Basic Outline Generation

As a **parent creating bedtime stories**,
I want **to use the `/write outline` command to generate a story outline**,
so that **I can see the plot structure before generating the full story**.

#### Acceptance Criteria

1. **`/write outline` command reads context YAML file** and generates outline
2. **Outline Markdown file is created** with plot points and character integration
3. **Metadata is propagated** from context to outline (target length, audience)
4. **Plot points are structured** with 2-3 sentence descriptions
5. **Character roles are integrated** into plot points based on context
6. **Outline file is saved** to draft/ directory with incrementing draft number
7. **User receives confirmation** of outline creation with file path

### Story 1.4: Basic Story Generation

As a **parent creating bedtime stories**,
I want **to use the `/write story` command to generate a universe story**,
so that **I can create a bedtime story from the outline**.

#### Acceptance Criteria

1. **`/write story` command reads outline Markdown file** and generates story
2. **Story Markdown file is created** with universe narrative at target length
3. **Story includes title and summary** generated from outline content
4. **Character names and details are consistent** with outline specifications
5. **Story follows the plot structure** defined in the outline
6. **Story file is saved** to draft/ directory with incrementing draft number
7. **User receives confirmation** of story creation with file path

### Story 1.5: Basic Edit Functionality

As a **parent creating bedtime stories**,
I want **to use the `/edit` command to modify outlines and stories**,
so that **I can refine the content without regenerating from scratch**.

#### Acceptance Criteria

1. **`/edit` command accepts file path and edit instructions** for outlines and stories
2. **Edit operations are applied** to the specified file without regeneration
3. **File integrity is maintained** after edit operations
4. **User can edit character names, plot points, and story content** directly
5. **Edit changes are saved** to the original file
6. **User receives confirmation** of successful edit operations
7. **Backup files are created** before major edit operations

### Story 1.6: LightRAG MCP Client Implementation

As a **prompt engineer building a story universe**,
I want **to implement a LightRAG MCP client for entity discovery and relationship querying**,
so that **I can leverage knowledge graph capabilities for enhanced story generation and entity management**.

#### Acceptance Criteria

1. **LightRAG MCP client is implemented** in TypeScript with proper error handling and connection management
2. **Entity label listing functionality** is available through `/graph/label/list` endpoint integration
3. **Knowledge graph querying** is supported through `/graphs` endpoint for relationship discovery
4. **Structured data querying** is implemented through `/query/data` endpoint for content retrieval
5. **Client integration** works with existing agents (Muse, Entity, Write) for enhanced functionality
6. **Error handling and fallback** mechanisms are in place for when LightRAG is unavailable
7. **TypeScript interfaces** are defined for all LightRAG API responses and requests

### Story 1.7: CLI Content Discovery and Import Suggestion

As a **parent migrating existing stories to Jester**,
I want **the CLI tool to scan my directory and suggest content for import**,
so that **I can easily migrate my existing story collection without manual file management**.

#### Acceptance Criteria

1. **CLI tool scans current directory** for markdown files that could be stories, outlines, or contexts
2. **Content detection identifies** potential story files based on content patterns and structure
3. **Entity detection identifies** potential character, location, and item files
4. **Import suggestions are presented** to user with clear descriptions of discovered content
5. **User confirmation workflow** allows selective import of suggested content
6. **Suggested content is moved** to appropriate `import-staging/` subdirectories
7. **Import summary is provided** showing what was imported and next steps
8. **Content validation** ensures imported files are properly formatted
9. **Error handling** gracefully handles invalid or corrupted files
10. **User guidance** explains how to use `@jester` agent after initialization

## Epic 2: Entity Management System

**Epic Goal**: Create a comprehensive wiki-style entity management system with organized subdirectories, markdown templates, and bidirectional [[link]] support. This epic delivers the core entity management functionality that enables parents to build and maintain a rich, interconnected story universe with fine-grained control over entity information.

### Story 2.1: Entity Directory Structure and Templates

As a **parent building a story universe**,
I want **to have organized entity directories with standardized templates**,
so that **I can maintain consistent entity information across my story universe**.

#### Acceptance Criteria

1. **Entity subdirectories are created** (entities/characters/, entities/locations/, entities/items/)
2. **Markdown templates are defined** for each entity type with consistent structure
3. **Template fields include** name, description, relationships, story appearances, and metadata
4. **Entity files are created** using templates with proper naming conventions
5. **Directory structure is maintained** automatically when new entities are added
6. **Template validation ensures** all required fields are present
7. **Entity files are properly formatted** with markdown headers and sections

### Story 2.2: Wiki-Style Linking System

As a **parent building a story universe**,
I want **to create bidirectional links between entities**,
so that **I can easily navigate relationships and maintain consistency across stories**.

#### Acceptance Criteria

1. **[[wiki-link]] syntax is supported** for entity references in all files
2. **Bidirectional linking is maintained** between related entities
3. **Link validation detects** broken or missing entity references
4. **Link suggestions are provided** when creating new entity relationships
5. **Entity relationship mapping** shows connected entities and their connections
6. **Link integrity is preserved** when entities are renamed or moved
7. **Cross-entity references work** across different entity types (characters, locations, items)

### Story 2.3: Entity Creation and Management

As a **parent building a story universe**,
I want **to easily create and manage entity files using the new command structure**,
so that **I can build a rich knowledge base for my stories**.

#### Acceptance Criteria

1. **New entity creation** via `/edit` command prompts for required information and generates files
2. **Entity editing** via `/edit character|location|item` allows modification of existing entity information
3. **Entity deletion** via `/delete character|location|item` removes files and updates all references
4. **Entity search** via `/search` finds entities by name, type, or content
5. **Entity listing** shows all entities organized by type and directory
6. **Entity validation** ensures consistency and universe
7. **Entity backup** creates copies before major changes

### Story 2.4: Entity Integration with Story Generation

As a **parent creating bedtime stories**,
I want **the story generation to use my entity files**,
so that **my stories maintain consistency with my established story universe**.

#### Acceptance Criteria

1. **Story generation reads** entity files from local directories
2. **Entity information is integrated** into story context and generation
3. **Character consistency** is maintained across all generated stories
4. **Location details** are used consistently in story descriptions
5. **Item references** are accurate and consistent with entity definitions
6. **Entity relationships** influence story plot and character interactions
7. **Generated stories reference** existing entities using proper [[links]]

### Story 2.5: Entity Relationship Discovery

As a **parent building a story universe**,
I want **to discover new relationships between entities**,
so that **I can create more complex and interconnected stories**.

#### Acceptance Criteria

1. **Relationship suggestions** are provided based on entity content and context
2. **Entity connection mapping** shows potential relationships between entities
3. **Relationship validation** ensures suggested connections make sense
4. **Relationship creation** automatically updates both entity files
5. **Relationship browsing** allows exploration of entity connections
6. **Relationship statistics** show entity usage and connection patterns
7. **Relationship export** provides data for external analysis

## Epic 3: LightRAG Integration

**Epic Goal**: Implement MCP integration with LightRAG for relationship discovery and entity connections while maintaining local entity files as the primary source of truth. This epic delivers the AI-powered relationship discovery that enhances the story universe without replacing the local file management system.

### Story 3.1: Entity Relationship Discovery

**Note**: The foundational LightRAG MCP client implementation is covered in Story 1.6 of Epic 1. This story focuses on advanced relationship discovery features.

As a **parent building a story universe**,
I want **to discover new entity relationships through LightRAG**,
so that **I can find connections I might have missed in my local files**.

#### Acceptance Criteria

1. **LightRAG queries** search for entities similar to local entities
2. **Relationship suggestions** are generated based on LightRAG knowledge graph
3. **Entity connections** are discovered between local and LightRAG entities
4. **Relationship confidence** scores indicate the strength of suggested connections
5. **Relationship filtering** allows filtering by entity type and connection strength
6. **Relationship export** saves discovered connections for local use
7. **Relationship validation** ensures suggested connections make sense

### Story 3.2: LightRAG Query Integration

As a **parent creating bedtime stories**,
I want **the system to query LightRAG for relevant entities**,
so that **my stories can include discovered characters, locations, and items**.

#### Acceptance Criteria

1. **Context generation** queries LightRAG for relevant entities during `/muse create-new` command
2. **Entity suggestions** are provided based on story context and requirements
3. **Entity filtering** allows selection of relevant entities from LightRAG results
4. **Entity integration** incorporates selected entities into local story context
5. **Entity validation** ensures suggested entities fit the story requirements
6. **Entity export** saves selected entities to local entity files
7. **Query optimization** minimizes LightRAG queries while maximizing relevance


## Epic 4: Advanced Story Generation

**Epic Goal**: Enhance story generation with plot templates, metadata propagation, and cross-stage editing capabilities to create sophisticated, consistent bedtime stories that leverage the full entity management system. This epic delivers the advanced storytelling features that make jester a powerful creative tool.

### Story 4.1: Plot Template System

As a **parent creating bedtime stories**,
I want **to choose from different plot templates**,
so that **I can create stories with varied structures and pacing**.

#### Acceptance Criteria

1. **Plot template selection** is available during context generation
2. **Hero's Journey template** provides 12-stage story structure
3. **Pixar method template** offers 6-stage emotional story arc
4. **Golden Circle template** delivers 3-act story structure
5. **Template customization** allows modification of template stages
6. **Template validation** ensures plot points are properly structured
7. **Template export** saves custom templates for reuse

### Story 4.2: Metadata Propagation System

As a **parent creating bedtime stories**,
I want **metadata to flow correctly through the pipeline**,
so that **my stories maintain consistent target length and audience information**.

#### Acceptance Criteria

1. **Context metadata** includes target length, audience age, and story requirements
2. **Outline metadata** inherits and preserves context metadata
3. **Story metadata** maintains target length and audience information
4. **Metadata validation** ensures consistency across pipeline stages
5. **Metadata editing** allows modification at any pipeline stage
6. **Metadata export** provides metadata summary for review
7. **Metadata templates** allow saving common metadata configurations

### Story 4.3: Cross-Stage Editing System

As a **parent creating bedtime stories**,
I want **to edit content at any stage without regeneration**,
so that **I can refine stories efficiently and maintain creative control**.

#### Acceptance Criteria

1. **Outline editing** allows modification of plot points and character integration
2. **Story editing** enables direct modification of story content and structure
3. **Character editing** updates character information across all stages
4. **Plot editing** modifies story structure while maintaining consistency
5. **Edit validation** ensures changes don't break story coherence
6. **Edit history** tracks changes made to each file
7. **Edit rollback** allows undoing changes if needed

### Story 4.4: Advanced Character Integration

As a **parent creating bedtime stories**,
I want **characters to be deeply integrated into stories**,
so that **my stories feel rich and consistent with my story universe**.

#### Acceptance Criteria

1. **Character consistency** is maintained across all story stages
2. **Character relationships** influence story plot and interactions
3. **Character development** shows growth and change over time
4. **Character dialogue** reflects individual personality and speech patterns
5. **Character actions** are consistent with established character traits
6. **Character integration** uses local entity files as primary source
7. **Character validation** ensures character information is accurate

### Story 4.5: Story Quality Enhancement

As a **parent creating bedtime stories**,
I want **stories to be polished and engaging**,
so that **my children enjoy the stories and want to hear more**.

#### Acceptance Criteria

1. **Story pacing** is appropriate for target audience age
2. **Story language** is engaging and age-appropriate
3. **Story structure** follows chosen plot template effectively
4. **Story coherence** maintains logical flow and consistency
5. **Story engagement** includes elements that capture attention
6. **Story validation** checks for common issues and inconsistencies
7. **Story enhancement** suggests improvements for better quality

## Epic 5: Story Universe Management

**Epic Goal**: Add link validation to create a universe storytelling ecosystem that enables parents to maintain their story universe effectively. This epic delivers the essential link management tools that make jester a sustainable long-term solution.

### Story 5.1: Link Validation System

As a **parent maintaining a story universe**,
I want **to detect and fix broken links**,
so that **my entity relationships remain consistent and navigable**.

#### Acceptance Criteria

1. **Link scanning** detects all [[wiki-links]] in entity and story files
2. **Link validation** checks if linked entities exist and are accessible
3. **Broken link reporting** shows which links are broken and where
4. **Link fixing** suggests corrections for broken links
5. **Link updating** automatically updates links when entities are renamed
6. **Link statistics** shows link usage and relationship patterns
7. **Link export** provides link relationship data for analysis

### Story 5.3: Story Universe Analytics

As a **parent building a story universe**,
I want **to understand how my story universe is growing**,
so that **I can make informed decisions about future stories**.

#### Acceptance Criteria

1. **Git log analysis** reads repository history to track entity and story changes
2. **Entity usage statistics** show which entities appear most frequently based on git history
3. **Story creation patterns** reveal when and how often stories are created from git commits
4. **Character development tracking** shows how characters evolve over time using git diff analysis
5. **Relationship mapping** visualizes entity connections and relationships from git history
6. **Content analysis** provides insights into story themes and patterns using git log data
7. **Growth metrics** track the expansion of the story universe through git commit analysis

### Story 5.4: Maintenance Check System

As a **parent maintaining a story universe**,
I want **to run maintenance checks on demand**,
so that **my story universe stays organized and consistent**.

#### Acceptance Criteria

1. **`/edit` command with maintenance prompt** runs comprehensive maintenance checks
2. **Orphaned file detection** finds files that are no longer referenced
3. **Unused file detection** identifies files that haven't been used recently
4. **Entity consistency validation** checks entity information accuracy
5. **Story consistency validation** verifies story coherence and structure
6. **Duplicate detection** finds and reports duplicate content
7. **Maintenance reporting** shows what changes were made and what issues were found

## Checklist Results Report

*This section will be populated after running the PM checklist validation.*

## Next Steps

### UX Expert Prompt

This section will contain the prompt for the UX Expert, keep it short and to the point to initiate create architecture mode using this document as input.

### Architect Prompt

This section will contain the prompt for the Architect, keep it short and to the point to initiate create architecture mode using this document as input.
