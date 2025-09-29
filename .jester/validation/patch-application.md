

# Patch Application Validation Checklist

## Purpose

To validate patch application for safety, accuracy, and system integrity before applying patches to the universe.

## Instructions for Publish Agent

Before applying patches, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - PATCH APPLICATION VALIDATION

This checklist is for PUBLISH AGENTS to validate patch application before applying patches to the universe.

IMPORTANT: This is a critical validation step. Be thorough about what patches are actually safe to apply vs what should be rejected. It's better to reject problematic patches than to corrupt the system.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or potential issues

The goal is safe patch application, not just checking boxes.]]

## Checklist Items

### 1. **Patch Discovery:**

   [[LLM: All pending patches must be identified and validated]]
   - [ ] All pending patches have been discovered (verify all patch files in `patches/` directory are identified)
   - [ ] Patch files are accessible and readable (verify patch files can be opened and parsed)
   - [ ] Patch integrity has been verified (verify patch files are not corrupted and contain valid data)
   - [ ] Patch dependencies have been identified (verify all required files for patch application exist)
   - [ ] Patch application order has been determined (verify patches are ordered by dependency and priority)

### 2. **Patch Format Validation:**

   [[LLM: Patch format must be correct for application]]
   - [ ] Patch files are in correct format (verify patches use supported format: .yaml, .json, .md)
   - [ ] Patch structure is valid and complete (verify patch structure matches `./.jester/templates/patch.yaml`)
   - [ ] Patch metadata is properly formatted (verify metadata follows `./.jester/data/metadata-propagation.md` format)
   - [ ] Patch versioning is compatible (verify patch version is compatible with current system version)
   - [ ] Patch syntax is correct and parseable (verify patches can be parsed without syntax errors)

### 3. **Target Validation:**

   [[LLM: Patch targets must be valid and accessible]]
   - [ ] Target entities exist in the universe
   - [ ] Target entities are accessible for modification
   - [ ] Target entity structure matches patch expectations
   - [ ] Target entity relationships are intact
   - [ ] Target entity dependencies are available

### 4. **Conflict Detection:**

   [[LLM: Conflicts must be identified before application]]
   - [ ] No conflicts with existing content detected
   - [ ] No conflicts with other pending patches
   - [ ] No conflicts with system constraints
   - [ ] No conflicts with entity relationships
   - [ ] No conflicts with reference integrity

### 5. **Safety Validation:**

   [[LLM: Patches must be safe to apply]]
   - [ ] Patches don't introduce security vulnerabilities
   - [ ] Patches don't corrupt existing data
   - [ ] Patches don't break system functionality
   - [ ] Patches can be safely rolled back
   - [ ] Patches don't cause data loss

### 6. **Compatibility Validation:**

   [[LLM: Patches must be compatible with current system]]
   - [ ] Patches are compatible with current system version
   - [ ] Patches don't conflict with system constraints
   - [ ] Patches maintain system integrity
   - [ ] Patches preserve existing functionality
   - [ ] Patches are compatible with system schema

### 7. **Application Readiness:**

   [[LLM: System must be ready for patch application]]
   - [ ] System is in stable state
   - [ ] Required backups have been created
   - [ ] System permissions are sufficient
   - [ ] Target directories are accessible
   - [ ] Application process can proceed safely

### 8. **Rollback Preparation:**

   [[LLM: Rollback procedures must be prepared]]
   - [ ] Rollback procedures are documented
   - [ ] Rollback data has been preserved
   - [ ] Rollback process has been tested
   - [ ] Rollback triggers are identified
   - [ ] Rollback validation is possible

## Validation Results

### Summary
- **Total Items Checked**: ___/40
- **Items Passed**: ___
- **Items Failed**: ___
- **Items Not Applicable**: ___

### Critical Issues
[List any critical issues that prevent patch application]

### Warning Issues
[List any warning issues that should be addressed]

### Recommendations
[List specific recommendations for addressing issues]

## Final Assessment

- [ ] **APPROVED**: Patches are ready for application
- [ ] **CONDITIONAL**: Patches can be applied with modifications
- [ ] **REJECTED**: Patches cannot be applied due to critical issues
- [ ] **NEEDS REVIEW**: Patches require manual review before application

## Comments
[Add any additional comments or observations about the patch application validation process]
