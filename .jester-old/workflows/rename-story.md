# Editing Workflow: Renaming Stories

## Purpose

To safely rename a story title and update all references across the entire system to maintain consistency and integrity.

## Files That Need Reference Updates

### Story Files

- **Reading directory files**: `reading/{NNN} - Story Title}/{Story Title}-context.yaml`, `reading/{NNN} - Story Title}/{Story Title}-outline.md`, `reading/{NNN} - Story Title}/{Story Title}-story.md`
- **Universe story files**: `universe/stories/{Story Title}.md`, `universe/outlines/{Story Title}.md`, `universe/contexts/{Story Title}.yaml`
- **Directory names**: `reading/{NNN} - Story Title}/` directories

### Entity Files

- **Entity story appearances**: All entity files that reference the story in their "Story Appearances" sections
- **Entity relationship files**: Files that reference the story in relationship contexts

### Cross-Reference Files

- **Story metadata**: Files containing story metadata and cross-references
- **Context files**: Files that reference the story title
- **Outline files**: Files that reference the story title
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

1. **Pre-Rename Analysis**
   - Validate current title exists and is accessible
   - Check new title doesn't conflict with existing stories
   - Create comprehensive rename plan

2. **Reference Discovery**
   - Find context, outline, and story files
   - Scan entity files for story references
   - DO NOT: cross-contaminate `reading/` and `universe/`
   - Find story metadata and cross-references
   - Identify directory structure references

3. **File Rename Execution**
   - **DO NOT rename** core files in `draft/{NNN}/` directory (keep generic names)
   - Rename files in `reading/{NNN} - Story Title}/` directory
   - Rename directory: `reading/{NNN} - Story Title}/`
   - Create backups of original files

4. **Reference Update Execution**
   - Update story title in context files
   - Update story title in outline files
   - Update story title in story files
   - Update entity story appearance references
   - Update story metadata and cross-references
   - Update directory structure references

5. **Validation and Verification**
   - Verify all files renamed successfully
   - Check all references updated correctly
   - Validate link integrity
   - Ensure system consistency

## Quality Standards

### Consistency Checks

- Story title is consistent across all files
- Entity references are updated correctly
- Directory structure is maintained
- Metadata is accurate

### Validation Requirements

- All story file references are updated
- Entity story appearances are correct
- No broken references
- Directory names match story titles

### Success Metrics

- **Reference Integrity**: All references updated correctly
- **Link Integrity**: All references resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Changes maintain story quality
- **User Experience**: Changes are seamless and intuitive
