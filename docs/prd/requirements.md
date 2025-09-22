# Requirements

## Functional

1. **FR1**: The system shall provide a `/muse` command that initiates interactive context gathering for story creation
2. **FR2**: The `/muse` agent shall query LightRAG knowledge graph to discover existing entities and relationships
3. **FR3**: The `/muse` agent shall generate structured YAML context files containing entities, plot structure, morals, and metadata
4. **FR4**: The system shall provide a `/write outline` command that generates detailed story outlines from context files
5. **FR5**: The `/write outline` command shall propagate metadata (target length, audience) from context to outline
6. **FR6**: The system shall provide a `/write story` command that converts outlines into complete bedtime stories
7. **FR7**: The `/write story` command shall generate stories at the target length specified in the outline metadata
8. **FR8**: The system shall provide an `/edit` command for cross-stage editing of outlines and stories
9. **FR9**: The system shall maintain a strict file pipeline: YAML context → Markdown outline → Markdown story
10. **FR10**: The system shall support multiple plot templates (Hero's Journey, Pixar method, Golden Circle)
11. **FR11**: The system shall integrate with LightRAG via MCP for entity discovery and relationship mapping
12. **FR12**: The system shall prevent context bleeding between pipeline stages (each stage reads only its designated input)
13. **FR13**: The system shall maintain local markdown files for all entities organized in subdirectories (entities/characters/, entities/locations/, entities/items/)
14. **FR14**: The system shall create and maintain a local story universe wiki with interconnected entity files using proper wiki-style [[links]]
15. **FR15**: The system shall use local entity files as the primary source of truth for story generation
16. **FR16**: The system shall query LightRAG only for relationship discovery and entity connections
17. **FR17**: The system shall support Obsidian-compatible markdown formatting and linking
18. **FR18**: The system shall provide fine-grained control over which entity information is available to story generation
19. **FR19**: The system shall maintain proper [[link]] syntax for bidirectional entity relationships across subdirectories
20. **FR20**: The system shall organize local files in a structured directory hierarchy:
    - `complete/characters/` - Character entity files
    - `complete/locations/` - Location entity files  
    - `complete/items/` - Item entity files
    - `stories/` - Generated story files
    - `outlines/` - Generated outline files
    - `contexts/` - Generated context files
21. **FR21**: The system shall organize framework files in a hidden `.jester/` directory structure:
    - `.jester/agents/` - Agent definitions
    - `.jester/templates/` - Story and context templates  
    - `.jester/tasks/` - Reusable workflow tasks
    - `.jester/data/` - Knowledge base and reference data
    - `.jester/utils/` - Utility functions and helpers
22. **FR22**: The system shall expose only user-facing directories in the root:
    - `complete/` - Entity files (characters/, locations/, items/)
    - `stories/` - Generated story files
    - `outlines/` - Generated outline files
    - `contexts/` - Generated context files

## Non Functional

1. **NFR1**: Token usage costs must remain under $1 per complete story generation (context → outline → story)
2. **NFR2**: The system shall operate within IDE environments (Cursor, VS Code) with command-line interface
3. **NFR3**: File operations shall be fast and efficient for pipeline management
4. **NFR4**: Story generation and information extraction may be slower but must be thorough and accurate
5. **NFR5**: The system shall maintain character consistency across stories 90% of the time
6. **NFR6**: The system shall be cross-platform compatible (Windows, macOS, Linux)
7. **NFR7**: The system shall use prompt-based agents with minimal Python dependencies (only for LightRAG MCP)
8. **NFR8**: The system shall preserve user privacy by keeping all story content local
9. **NFR9**: The system shall be maintainable and extensible for future enhancements
10. **NFR10**: The system shall provide clear error messages and graceful handling of LightRAG query failures
11. **NFR11**: The system shall maintain local file consistency and prevent broken [[links]] across entity subdirectories
12. **NFR12**: The system shall provide fast local file operations for entity lookup and story generation
13. **NFR13**: The system shall support manual LightRAG updates without automatic synchronization
14. **NFR14**: The system shall maintain clean separation between framework files (hidden) and user content (visible)
15. **NFR15**: The system shall provide intuitive user experience with minimal visible complexity
