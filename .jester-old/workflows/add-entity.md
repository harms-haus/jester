# Editing Workflow: Adding Entities to Stories

## Purpose

To safely add an entity to a story while maintaining system consistency and updating all references.

## Files That Need Reference Updates

### Story Files

- **Context files**: Add entity to `entities` section
- **Outline files**: Add entity references to relevant plot points
- **Story files**: Add entity references to story content

### Entity Files

- **Entity story appearances**: Add story to entity's "Story Appearances" section
- **Entity relationships**: Update relationship sections if needed

### Cross-Reference Files

- **Wiki-link references**: Add appropriate `[[Entity Name]]` references
- **Entity metadata**: Update entity usage statistics
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

1. **Pre-Addition Analysis**
   - Identify entity to be added
   - Determine integration points in story
   - Check for existing relationships
   - Create addition plan

2. **Integration Planning**
   - Plan entity integration into story structure
   - Identify appropriate plot points
   - Plan relationship development
   - Design entity introduction

3. **Content Update Execution**
   - Add entity to context file entities section
   - Add entity references to outline plot points
   - Add entity references to story content
   - Add appropriate wiki-link references

4. **Entity File Updates**
   - Add story to entity's story appearances
   - Update entity relationships if needed
   - Update entity usage statistics
   - DO NOT: cross-contaminate `reading/` and `universe/`

5. **Validation and Verification**
   - Verify entity added to all story files
   - Check entity files updated correctly
   - Validate story structure integrity
   - Ensure all references are consistent

## Quality Standards

### Consistency Checks

- Entity is added to all story files
- Entity story appearances are updated
- All references are consistent
- Story structure is maintained

### Validation Requirements

- All entity references are added correctly
- Wiki-links are properly formatted
- Entity story appearances are correct
- Story integrity is maintained

### Success Metrics

- **Reference Integrity**: All references added correctly
- **Link Integrity**: All wiki-links resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Story maintains coherence
- **User Experience**: Changes are seamless and intuitive
