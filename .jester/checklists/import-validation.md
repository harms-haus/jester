

# Import Validation Checklist

## Purpose

To validate imported content for format, quality, and compatibility before integration into the Jester system.

## Instructions for Import Agent

Before integrating imported content, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - IMPORT VALIDATION

This checklist is for IMPORT AGENTS to validate imported content before integration.

IMPORTANT: This is a critical validation step. Be thorough about what's actually importable vs what should be rejected. It's better to reject problematic content than to corrupt the system.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or compatibility issues

The goal is safe content integration, not just checking boxes.]]

## Checklist Items

### 1. **File Format Validation:**

   [[LLM: File format is critical for system compatibility. Check each item carefully]]
   - [ ] Imported files are in supported format (Markdown, YAML, JSON)
   - [ ] File encoding is UTF-8 compatible
   - [ ] File structure follows expected patterns
   - [ ] No corrupted or malformed files detected
   - [ ] File extensions are correct and recognized

### 2. **Content Structure Validation:**

   [[LLM: Content structure must match system expectations]]
   - [ ] Required sections/fields are present
   - [ ] Content follows expected template structure
   - [ ] Metadata is properly formatted
   - [ ] Content hierarchy is logical and consistent
   - [ ] No missing or incomplete sections

### 3. **Entity Validation:**

   [[LLM: Entities must be valid for system integration]]
   - [ ] Character entities have required fields (name, description, etc.)
   - [ ] Location entities have required fields (name, description, etc.)
   - [ ] Item entities have required fields (name, description, etc.)
   - [ ] Entity relationships are properly defined
   - [ ] Entity properties are consistent and logical

### 4. **Story Content Validation:**

   [[LLM: Story content must meet quality standards]]
   - [ ] Story has clear beginning, middle, and end
   - [ ] Story content is complete and coherent
   - [ ] Character references are consistent
   - [ ] Location references are consistent
   - [ ] Plot progression is logical

### 5. **Conflict Detection:**

   [[LLM: Conflicts must be identified before integration]]
   - [ ] No naming conflicts with existing content
   - [ ] No content conflicts with existing entities
   - [ ] No structural conflicts with system expectations
   - [ ] No reference conflicts with existing content
   - [ ] No metadata conflicts with system standards

### 6. **Quality Standards:**

   [[LLM: Quality standards must be met for integration]]
   - [ ] Content is age-appropriate for target audience
   - [ ] Language is clear and appropriate
   - [ ] Content meets minimum quality thresholds
   - [ ] Educational value is present (if applicable)
   - [ ] Content is engaging and well-written

### 7. **System Compatibility:**

   [[LLM: Content must be compatible with system requirements]]
   - [ ] Content fits within system constraints
   - [ ] File sizes are within acceptable limits
   - [ ] Content references are resolvable
   - [ ] Metadata is compatible with system schema
   - [ ] Content can be properly indexed and searched

### 8. **Integration Readiness:**

   [[LLM: Content must be ready for system integration]]
   - [ ] All dependencies are available
   - [ ] Required templates are accessible
   - [ ] Target directories are prepared
   - [ ] System permissions are sufficient
   - [ ] Integration process can proceed safely

## Validation Results

### Summary
- **Total Items Checked**: ___/40
- **Items Passed**: ___
- **Items Failed**: ___
- **Items Not Applicable**: ___

### Critical Issues
[List any critical issues that prevent import]

### Warning Issues
[List any warning issues that should be addressed]

### Recommendations
[List specific recommendations for addressing issues]

## Final Assessment

- [ ] **APPROVED**: Content is ready for import
- [ ] **CONDITIONAL**: Content can be imported with modifications
- [ ] **REJECTED**: Content cannot be imported due to critical issues
- [ ] **NEEDS REVIEW**: Content requires manual review before import

## Comments
[Add any additional comments or observations about the import validation process]
