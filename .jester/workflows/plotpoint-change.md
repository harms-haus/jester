# Editing Workflow: Generic Plot Point Changes

## Purpose

To handle plot point modifications while maintaining story structure and entity consistency.

## Files That Need Reference Updates

### Story Files

- **Outline files**: Update plot point structure and details
- **Story files**: Update story content to match plot changes
- **Context files**: Update plot template or plot points if needed

### Entity Files

- **Entity story appearances**: Update if plot changes affect entity usage
- **Entity relationships**: Update if plot changes affect relationships

### Cross-Reference Files

- **Story metadata**: Update plot-related metadata
- **Wiki-link context**: Update context around plot-related references
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

1. **Change Analysis**
   - Identify plot point changes
   - Assess impact on story structure
   - Check for entity relationship effects
   - Create change plan

2. **Structure Assessment**
   - Determine plot structure changes
   - Identify entity usage changes
   - Plan story content updates
   - Assess relationship impacts

3. **Change Execution**
   - Update outline files with plot changes
   - Update story content to match plot
   - Update context files if needed
   - Update entity story appearances

4. **Entity Updates**
   - Update entity relationships if needed
   - Update entity story appearances
   - Update entity usage statistics
   - DO NOT: cross-contaminate `reading/` and `universe/`

5. **Validation and Verification**
   - Verify plot structure consistency
   - Check story content alignment
   - Validate entity relationship updates
   - Ensure system integrity

## Quality Standards

### Consistency Checks

- Plot structure is consistent
- Story content matches plot changes
- Entity usage is updated
- Relationships reflect plot changes

### Validation Requirements

- All plot changes are applied
- Story content aligns with outline
- Entity references are correct
- No broken references

### Success Metrics

- **Reference Integrity**: All references updated correctly
- **Link Integrity**: All wiki-links resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Changes maintain story quality
- **User Experience**: Changes are seamless and intuitive
