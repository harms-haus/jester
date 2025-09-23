# Workflow Management Prompts

## Draft Numbering System

### 3-Digit Number Generation
- Use 3-digit format: 001, 002, 003, etc.
- Numbers are permanent and never renumbered
- Check for conflicts before assigning new numbers
- Maintain consistency across all files in a draft

### Draft Number Validation
- Format: Exactly 3 digits (001-999)
- No leading zeros except for single digits (001, not 1)
- No gaps in numbering sequence
- No duplicate numbers

### Draft File Naming
- Context files: `context-{number}.md`
- Outline files: `outline-{number}.md`
- Story files: `story-{number}.md`
- All files in a draft must use the same number

## Workflow Commands

**Note**: All workflow commands are accessed via the `@jester` entry point. Users should initiate workflows through the main entry point for optimal experience.

### `@jester` - Main Entry Point
**Purpose**: Unified access to all jester workflows
**Process**:
1. Welcome user and analyze intent
2. Present workflow options (new project, continue draft, universe management, help)
3. Load appropriate agent files based on user selection
4. Guide user to specialized agents

### `/edit create-draft {draft-number}` (via @jester)
**Purpose**: Create a new draft with specified number
**Process**:
1. Validate draft number format (3-digit)
2. Check if number already exists
3. Create draft directory structure
4. Initialize basic file templates
5. Set creation timestamps

**File Structure Created**:
```
draft/
├── context-{number}.md
├── outline-{number}.md
└── story-{number}.md
```

### `/edit approve-draft {draft-number}` (via @jester)
**Purpose**: Move draft to ready/ directory with comprehensive validation
**Process**:
1. Validate draft completeness (all three files exist)
2. **NEW**: Validate content quality and completeness
3. **NEW**: Check for entity consistency and references
4. **NEW**: Validate target directory for conflicts
5. **NEW**: Request user approval for any conflicts
6. Read draft files and extract story title
7. Move files to ready/ with clean naming
8. Update entity references
9. Confirm approval

**File Operations**:
- `draft/context-{number}.md` → `ready/contexts/{title} (context).md`
- `draft/outline-{number}.md` → `ready/outlines/{title} (outline).md`
- `draft/story-{number}.md` → `ready/stories/{title}.md`

### `/edit publish "{story-title}"` (via @jester)
**Purpose**: Move ready story to complete/ directory with comprehensive validation and patch processing
**Process**:
1. Find ready story by title
2. **NEW**: Scan ready/characters/, ready/locations/, ready/items/ for .patch.md files
3. **NEW**: Validate all patch files are properly formatted (git-patch format)
4. **NEW**: Check for target directory conflicts (existing files with same names)
5. **NEW**: Request user approval for any conflicts found
6. **NEW**: Apply patches to existing entities in complete/ directory
7. **NEW**: Update complete/ entity files with change history and delete patch files
8. Move story and related files to complete/
9. Move new entity files from ready/ to complete/
10. **NEW**: Clean up ready/ directory (remove published files)
11. Update entity references to final locations
12. Confirm publication

**File Operations**:
- `ready/stories/{title}.md` → `complete/stories/{title}.md`
- `ready/outlines/{title} (outline).md` → `complete/outlines/{title} (outline).md`
- `ready/contexts/{title} (context).md` → `complete/contexts/{title} (context).md`
- `ready/characters/*.md` → `complete/characters/*.md`
- `ready/locations/*.md` → `complete/locations/*.md`
- `ready/items/*.md` → `complete/items/*.md`
- **NEW**: Apply patches to existing complete/ entities and delete patch files
- **NEW**: Remove published files from ready/ directory

### `/import <file-path>` (via @jester)
**Purpose**: Import content to import-staging/ directory for user validation
**Process**:
1. Auto-detect content type (character, location, item, story)
2. Parse and structure content using appropriate templates
3. Save to import-staging/{type}s/ directory
4. Validate imported content for completeness and consistency
5. Provide user feedback on import success and any issues
6. Inform user to use `/publish import-staging` when ready to publish

**File Operations**:
- `{source-file}` → `import-staging/{type}s/{structured-file}.md`

### `/import story <file-path>` (via @jester)
**Purpose**: Import story content to import-staging/ directory for validation
**Process**:
1. Read existing .md story file
2. Analyze story content for entity references
3. Map story entities to current knowledge base entities
4. Update story wording to match current entity descriptions
5. Ensure story fits provided templates (heroes_journey, pixar, golden_circle)
6. Generate updated story file with proper formatting
7. Save to import-staging/stories/ directory with timestamp
8. Provide user feedback on import success and changes made
9. Inform user to use `/publish import-staging` when ready to publish

**File Operations**:
- `{source-story}` → `import-staging/stories/{updated-story}.md`

### `/publish import-staging` (via @jester)
**Purpose**: Move validated import-staging content to complete/ directory
**Process**:
1. Scan import-staging/ directory for content
2. Validate all content is ready for publication
3. Check for target directory conflicts (existing files with same names)
4. Request user approval for any conflicts found
5. Move content from import-staging/ to complete/
6. Clean up import-staging/ directory
7. Confirm publication

**File Operations**:
- `import-staging/stories/*.md` → `complete/stories/*.md`
- `import-staging/outlines/*.md` → `complete/outlines/*.md`
- `import-staging/contexts/*.md` → `complete/contexts/*.md`
- `import-staging/characters/*.md` → `complete/characters/*.md`
- `import-staging/locations/*.md` → `complete/locations/*.md`
- `import-staging/items/*.md` → `complete/items/*.md`
- Remove published files from import-staging/ directory

### `/edit list-drafts` (via @jester)
**Purpose**: List all current drafts
**Process**:
1. Scan draft/ directory
2. Read metadata from each draft
3. Display organized list with status
4. Provide summary statistics

### `/edit list-ready` (via @jester)
**Purpose**: List all ready content
**Process**:
1. Scan ready/ directory
2. Read content metadata
3. Display organized list by type
4. Provide summary statistics

### `/edit list-complete` (via @jester)
**Purpose**: List all complete content
**Process**:
1. Scan complete/ directory
2. Read content metadata
3. Display organized list by type
4. Provide summary statistics

## File History Tracking

### Creation Timestamps
- Set when files are first created
- Format: ISO 8601 (2025-01-27T21:45:00.000Z)
- Include in file metadata

### Modification History
- Track all changes to files
- Include change summaries
- Maintain version numbers
- Update last modified timestamps

### Change Summaries
- Brief description of what changed
- Include reason for change
- Track who made the change
- Maintain chronological order

## Error Handling

### Draft Number Conflicts
- Check for existing numbers before assignment
- Suggest alternative numbers if conflict
- Provide clear error messages
- Offer to list existing drafts

### File Validation Errors
- Check file integrity before operations
- Validate required fields are present
- Provide specific error details
- Suggest fixes for common issues

### Workflow State Errors
- Ensure proper workflow progression
- Validate prerequisites are met
- Provide clear next steps
- Offer rollback options if needed

## Integration Points

### Agent Coordination
- Edit agent handles workflow commands
- Write agent creates draft content
- Muse agent generates context
- Entity agent manages entity creation

### File System Operations
- Use consistent file paths
- Maintain proper permissions
- Handle file conflicts gracefully
- Provide clear operation feedback

### Template System
- Use templates for consistency
- Validate against template structure
- Maintain template compatibility
- Update templates as needed
