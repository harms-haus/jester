

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
   - [ ] Imported files are in supported format (.md, .yaml, .yml, .json extensions)
   - [ ] File encoding is UTF-8 compatible (no encoding errors when reading files)
   - [ ] File structure follows expected patterns (files match `./.jester/templates/` structure)
   - [ ] No corrupted or malformed files detected (files can be parsed without errors)
   - [ ] File extensions are correct and recognized (extensions match content type)

### 2. **Content Structure Validation:**

   [[LLM: Content structure must match system expectations]]
   - [ ] Required sections/fields are present (all template placeholders are filled)
   - [ ] Content follows expected template structure (structure matches `./.jester/templates/` files)
   - [ ] Metadata is properly formatted (metadata follows `./.jester/data/metadata-propagation.md` format)
   - [ ] Content hierarchy is logical and consistent (heading structure and organization)
   - [ ] No missing or incomplete sections (all required sections from templates are present)

### 3. **Entity Validation:**

   [[LLM: Entities must be valid for system integration]]
   - [ ] Character entities have required fields (each character has name, description, type, and at least 2 traits)
   - [ ] Location entities have required fields (each location has name, description, type, and atmosphere details)
   - [ ] Item entities have required fields (each item has name, description, type, and purpose)
   - [ ] Entity relationships are properly defined (all relationships are bidirectional and logical)
   - [ ] Entity properties are consistent and logical (no contradictory properties within entities)

### 4. **Story Content Validation:**

   [[LLM: Story content must meet quality standards]]
   - [ ] Story content is complete and coherent (no missing plot points or logical gaps)
   - [ ] Character references are consistent (all character names match entity definitions)
   - [ ] Location references are consistent (all location names match entity definitions)
   - [ ] Plot progression is logical (story events follow logical sequence)

### 5. **Conflict Detection:**

   [[LLM: Conflicts must be identified before integration]]
   - [ ] No naming conflicts with existing content
   - [ ] No content conflicts with existing entities
   - [ ] No structural conflicts with system expectations
   - [ ] No reference conflicts with existing content
   - [ ] No metadata conflicts with system standards

### 6. **Quality Standards:**

   [[LLM: Quality standards must be met for integration]]
   - [ ] Language is clear and appropriate (reading level matches target audience)
   - [ ] Content meets minimum quality thresholds (check against `./.jester/checklists/story-validation.md`)
   - [ ] Educational value is present (if applicable) (themes and morals are clear and positive)
   - [ ] Content is engaging and well-written (narrative flow and character development)

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
