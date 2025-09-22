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

### `/edit create-draft {draft-number}`
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

### `/edit approve-draft {draft-number}`
**Purpose**: Move draft to ready/ directory
**Process**:
1. Validate draft completeness (all three files exist)
2. Read draft files and extract story title
3. Move files to ready/ with clean naming
4. Update entity references
5. Confirm approval

**File Operations**:
- `draft/context-{number}.md` → `ready/stories/{title}.md`
- `draft/outline-{number}.md` → `ready/outlines/{title}.md`
- `draft/story-{number}.md` → `ready/stories/{title}.md`

### `/edit publish "{story-title}"`
**Purpose**: Move ready story to complete/ directory
**Process**:
1. Find ready story by title
2. Move story and related files to complete/
3. Update entity references to final locations
4. Confirm publication

**File Operations**:
- `ready/stories/{title}.md` → `complete/stories/{title}.md`
- `ready/outlines/{title}.md` → `complete/outlines/{title}.md`
- `ready/characters/*.md` → `complete/characters/*.md`
- `ready/locations/*.md` → `complete/locations/*.md`
- `ready/items/*.md` → `complete/items/*.md`

### `/edit list-drafts`
**Purpose**: List all current drafts
**Process**:
1. Scan draft/ directory
2. Read metadata from each draft
3. Display organized list with status
4. Provide summary statistics

### `/edit list-ready`
**Purpose**: List all ready content
**Process**:
1. Scan ready/ directory
2. Read content metadata
3. Display organized list by type
4. Provide summary statistics

### `/edit list-complete`
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
