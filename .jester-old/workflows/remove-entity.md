# Editing Workflow: Removing Entities from Stories

## Purpose

To safely remove an entity from a story while maintaining system integrity and updating all references.

## Files That Need Reference Updates

### Story Files

- **Context files**: Remove entity from `entities` section
- **Outline files**: Remove entity references from plot points
- **Story files**: Remove entity references from story content

### Entity Files

- **Entity story appearances**: Remove story from entity's "Story Appearances" section
- **Entity relationships**: Update relationship sections if needed

### Cross-Reference Files

- **Wiki-link references**: Remove or update `[[Entity Name]]` references
- **Entity metadata**: Update entity usage statistics
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

1. **Pre-Removal Analysis**
   - Identify entity to be removed
   - Assess impact on story structure
   - Check for dependent relationships
   - Create removal plan

2. **Reference Discovery**
   - Find all entity references in story files
   - Identify entity story appearances
   - DO NOT: cross-contaminate `reading/` and `universe/`
   - Find wiki-link references
   - Check for dependent relationships

3. **Content Update Execution**
   - Remove entity from context file entities section
   - Remove entity references from outline plot points
   - Remove entity references from story content
   - Update or remove wiki-link references

4. **Entity File Updates**
   - Remove story from entity's story appearances
   - Update entity relationships if needed
   - Update entity usage statistics

5. **Validation and Verification**
   - Verify entity removed from all story files
   - Check entity files updated correctly
   - Validate story structure integrity
   - Ensure no broken references

## Quality Standards

### Consistency Checks

- Entity is removed from all story files
- Entity story appearances are updated
- No broken references remain
- Story structure is maintained

### Validation Requirements

- All entity references are removed
- No orphaned wiki-links
- Entity story appearances are correct
- Story integrity is maintained

### Success Metrics

- **Reference Integrity**: All references removed correctly
- **Link Integrity**: No broken wiki-links remain
- **System Consistency**: No broken relationships
- **Content Quality**: Story maintains coherence
- **User Experience**: Changes are seamless and intuitive
