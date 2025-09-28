

# Patch Creation Validation Checklist

## Purpose

To validate patch creation for accuracy, completeness, and system compatibility before patch files are generated.

## Instructions for Edit Agent

Before creating patches, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - PATCH CREATION VALIDATION

This checklist is for EDIT AGENTS to validate patch creation before generating patch files.

IMPORTANT: This is a critical validation step. Be thorough about what changes are actually needed vs what should be preserved. It's better to create accurate patches than to corrupt the system.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what changes were actually identified
5. Flag any concerns or potential issues

The goal is accurate patch creation, not just checking boxes.]]

## Checklist Items

### 1. **Change Identification:**

   [[LLM: Changes must be clearly identified and documented]]
   - [ ] All required changes have been identified
   - [ ] Change scope is clearly defined
   - [ ] Change rationale is documented
   - [ ] Change impact has been assessed
   - [ ] Change dependencies have been identified

### 2. **Target Entity Validation:**

   [[LLM: Target entities must be valid for patching]]
   - [ ] Target entities exist in the universe
   - [ ] Target entities are accessible for modification
   - [ ] Target entity structure is compatible with changes
   - [ ] Target entity relationships are understood
   - [ ] Target entity dependencies are identified

### 3. **Change Accuracy Validation:**

   [[LLM: Changes must be accurate and complete]]
   - [ ] Changes reflect actual modifications needed
   - [ ] Changes are complete and not partial
   - [ ] Changes are consistent with user intent
   - [ ] Changes preserve entity integrity
   - [ ] Changes maintain system consistency

### 4. **Patch Format Validation:**

   [[LLM: Patch format must be correct for application]]
   - [ ] Patch format follows system standards
   - [ ] Patch structure is correct and complete
   - [ ] Patch metadata is properly formatted
   - [ ] Patch versioning is appropriate
   - [ ] Patch dependencies are correctly specified

### 5. **Compatibility Validation:**

   [[LLM: Patches must be compatible with target system]]
   - [ ] Patches are compatible with current system version
   - [ ] Patches don't conflict with existing patches
   - [ ] Patches don't break existing functionality
   - [ ] Patches maintain system integrity
   - [ ] Patches are reversible if needed

### 6. **Content Validation:**

   [[LLM: Patch content must be valid and complete]]
   - [ ] Patch content is logically consistent
   - [ ] Patch content maintains entity relationships
   - [ ] Patch content preserves reference integrity
   - [ ] Patch content is complete and not fragmented
   - [ ] Patch content follows system conventions

### 7. **Safety Validation:**

   [[LLM: Patches must be safe to apply]]
   - [ ] Patches don't introduce security vulnerabilities
   - [ ] Patches don't corrupt existing data
   - [ ] Patches don't break system functionality
   - [ ] Patches can be safely rolled back
   - [ ] Patches don't cause data loss

### 8. **Documentation Validation:**

   [[LLM: Patch documentation must be complete and accurate]]
   - [ ] Patch purpose is clearly documented
   - [ ] Patch changes are thoroughly described
   - [ ] Patch application instructions are provided
   - [ ] Patch rollback procedures are documented
   - [ ] Patch dependencies are clearly listed

## Validation Results

### Summary
- **Total Items Checked**: ___/40
- **Items Passed**: ___
- **Items Failed**: ___
- **Items Not Applicable**: ___

### Critical Issues
[List any critical issues that prevent patch creation]

### Warning Issues
[List any warning issues that should be addressed]

### Recommendations
[List specific recommendations for addressing issues]

## Final Assessment

- [ ] **APPROVED**: Patches are ready for creation
- [ ] **CONDITIONAL**: Patches can be created with modifications
- [ ] **REJECTED**: Patches cannot be created due to critical issues
- [ ] **NEEDS REVIEW**: Patches require manual review before creation

## Comments
[Add any additional comments or observations about the patch creation validation process]
