# Requirements

## Functional

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
   - Double-confirm entity deletion in "universe" universe
7. **FR7**: The system shall provide an `/approve` command to approve draft to move to "reading" universe
8. **FR8**: The system shall provide a `/publish` command to publish "reading" story with all included entities and patches
9. **FR9**: The system shall provide an `/import` command to import entity or story from file, or many entities/stories from directory
10. **FR10**: The system shall provide a `/search` command to search local files and Entity Management database with natural-language queries
11. **FR11**: The system shall maintain a strict file pipeline: YAML context → Markdown outline → Markdown story
12. **FR12**: The system shall support multiple plot templates (Hero's Journey, Pixar method, Golden Circle)
13. **FR13**: The system shall integrate with Entity Management via Entity Management for entity discovery and relationship mapping
14. **FR14**: The system shall prevent context bleeding between pipeline stages (each stage reads only its designated input)
15. **FR15**: The system shall maintain local markdown files for all entities organized in subdirectories (universe/characters/, universe/locations/, universe/items/)
16. **FR16**: The system shall create and maintain a local story universe wiki with interconnected entity files using proper wiki-style [[links]]
17. **FR17**: The system shall use local entity files as the primary source of truth for story generation
18. **FR18**: The system shall query Entity Management only for relationship discovery and entity connections
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
    - Draft projects use format: `draft/{NNN}/` with NO subdirectories, containing only context-NNN.yaml, outline-NNN.md, and story-NNN.md
    - Reading projects use format: `reading/{NNN} - Story Title/` with same subdirectory structure
    - All files within a project maintain the same project number
24. **FR24**: The system shall organize framework files in a hidden `.jester/` directory structure:
    - `.jester/agents/` - Agent definitions
    - `.jester/templates/` - Story and context templates  
    - `.jester/tasks/` - Reusable workflow tasks
    - `.jester/data/` - Knowledge base and reference data
    - `.jester/utils/` - Utility functions and helpers
25. **FR25**: The system shall provide the standardized command structure as defined in FR1-FR10, replacing all previous command patterns with the new hierarchical structure

## Non Functional

1. **NFR1**: Token usage costs must remain under $1 per complete story generation (context → outline → story)
2. **NFR2**: The system shall operate within IDE environments (Cursor, VS Code) with command-line interface
3. **NFR3**: File operations shall be fast and efficient for pipeline management
4. **NFR4**: Story generation and information extraction may be slower but must be thorough and accurate
5. **NFR5**: The system shall maintain character consistency across stories 90% of the time
6. **NFR6**: The system shall be cross-platform compatible (Windows, macOS, Linux)
7. **NFR7**: The system shall use prompt-based agents with minimal Python dependencies (only for Entity Management)
8. **NFR8**: The system shall preserve user privacy by keeping all story content local
9. **NFR9**: The system shall be maintainable and extensible for future enhancements
10. **NFR10**: The system shall provide clear error messages and graceful handling of Entity Management query failures
11. **NFR11**: The system shall maintain local file consistency and prevent broken [[links]] across entity subdirectories
12. **NFR12**: The system shall provide fast local file operations for entity lookup and story generation
13. **NFR13**: The system shall support manual Entity Management updates without automatic synchronization
14. **NFR14**: The system shall maintain clean separation between framework files (hidden) and user content (visible)
15. **NFR15**: The system shall provide intuitive user experience with minimal visible complexity
