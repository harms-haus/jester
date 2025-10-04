# Editing Workflow: Renaming Entities

## Purpose

To safely rename an entity (character, location, or item) and update all references across the entire system to maintain consistency and integrity.

## Files That Need Reference Updates

### Entity Files

- **Entity files themselves**: `characters/{Character Name}.md`, `locations/{Location Name}.md`, `items/{Item Name}.md`
- **Entity patch files**: `characters/{Character Name}.patch`, etc.
- **Universe entity files**: `universe/characters/{Entity Name}.md`, etc.

### Story Files

- **Context files**: `draft/{NNN}/context-{NNN}.yaml`, `reading/{NNN} - Story Title}/{Story Title}-context.yaml`, `universe/contexts/{Story Title}-context.yaml`
- **Outline files**: `draft/{NNN}/outline-{NNN}.md`, `reading/{NNN} - Story Title}/{Story Title}-outline.md`, `universe/outlines/{Story Title}-outline.md`
- **Story files**: `draft/{NNN}/story-{NNN}.md`, `reading/{NNN} - Story Title}/{Story Title}-story.md`, `universe/stories/{Story Title}.md`

### Cross-Reference Files

- **Entity relationship files**: All entity files that reference the renamed entity
- **Story metadata**: Files containing story metadata that reference the entity
- **Wiki-link references**: All `[[Entity Name]]` references in any markdown file
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

### 1. Pre-Rename Analysis
- Identify entity type (character, location, item)
- Validate current name exists and is accessible
- Check new name doesn't conflict with existing entities
- Create comprehensive rename plan

### 2. Reference Discovery
- Scan all entity files in either `reading/`, or `universe/` directory, depending on the context (eg: reading folder for stories in the reading folder)
- DO NOT: cross-contaminate `reading/` and `universe/`
- Find all `[[Entity Name]]` wiki-links in story files
- Identify unlinked references and nickname references
- Find related entity references (habitations, containers, neighbors)
- Scan entity relationship sections in all entity files

### 3. File Rename Execution
- Rename entity files in all directories
- Rename entity patch files

### 4. Reference Update Execution
- Update all `[[Entity Name]]` wiki-links
- Update entity references in context files
- Update entity references in outline files
- Update entity references in story files
- Update cross-references in entity relationship sections
- Update unlinked references and nicknames
- Update half-names ("that raccoon" -> "that cat")

### 5. Validation and Verification
- Verify all files renamed successfully
- Check all references updated correctly
- Validate link integrity
- Ensure system consistency
- Validate no cross-contamination happened between `reading/` and `universe/`

## Quality Standards

### Consistency Checks

- Character descriptions match across files
- Setting details are consistent
- References and links are accurate
- Entity relationships are bidirectional
- Wiki-links resolve to existing files

### Validation Requirements

- All `[[Entity Name]]` links have corresponding entity files
- No orphaned references
- No broken wiki-link syntax
- Entity names are consistent across all references
- Entity types match their usage context
- Reference context is appropriate

### Success Metrics

- **Reference Integrity**: All references updated correctly
- **Link Integrity**: All wiki-links resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Changes maintain story quality
- **User Experience**: Changes are seamless and intuitive
