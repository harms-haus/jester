# Editing Workflow: Generic Entity Changes

## Purpose

To handle other types of entity modifications (description changes, relationship updates, property modifications) while maintaining system consistency.

## Files That Need Reference Updates

### Entity Files

- **Entity files themselves**: Update entity content, descriptions, properties
- **Entity patch files**: Create patch files for changes in reading directories
- **Universe entity files**: Update published entity files

### Story Files

- **Story content**: Update entity references if descriptions change
- **Context files**: Update entity information if needed
- **Outline files**: Update entity references if needed

### Cross-Reference Files

- **Entity relationships**: Update bidirectional relationships
- **Wiki-link context**: Update context around entity references
- **Cross-contamination**: Ensure that edits made to the `reading/` only trigger secondary edits in the `reading/` folder.
- **Edit create patch**: If a file in `universe/` references an edit in `reading/` and needs to be changed because of an edit in `reading/`, DO NOT edit the file in `universe/`; create or edit the `{Entity Name}.patch` file with the change.

## Workflow Steps

1. **Change Analysis**
   - Identify type of entity change
   - Assess impact on related files
   - Check for dependent relationships
   - Create change plan

2. **Impact Assessment**
   - Determine files affected by change
   - Identify relationship updates needed
   - Plan patch file creation
   - Assess story impact

3. **Change Execution**
   - Update entity files with changes
   - Create patch files for reading directories
   - Update universe entity files
   - Update entity relationships

4. **Cross-Reference Updates**
   - Update story content if needed
   - Update context files if needed
   - Update outline files if needed
   - Update bidirectional relationships
   - DO NOT: cross-contaminate `reading/` and `universe/`

5. **Validation and Verification**
   - Verify all changes applied correctly
   - Check relationship consistency
   - Validate patch file creation
   - Ensure system integrity

## Quality Standards

### Consistency Checks

- Entity changes are consistent across files
- Relationships are updated correctly
- Patch files are properly formatted
- Story content reflects changes

### Validation Requirements

- All entity changes are applied
- Bidirectional relationships are maintained
- Patch files are correct
- No broken references

### Success Metrics

- **Reference Integrity**: All references updated correctly
- **Link Integrity**: All wiki-links resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Changes maintain story quality
- **User Experience**: Changes are seamless and intuitive
