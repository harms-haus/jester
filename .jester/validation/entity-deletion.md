

# Entity Deletion Validation Checklist

## Purpose

To validate entity deletion for safety, impact assessment, and system integrity before removing entities from the system.

## Instructions for Delete Agent

Before deleting entities, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - ENTITY DELETION VALIDATION

This checklist is for DELETE AGENTS to validate entity deletion before removing entities from the system.

IMPORTANT: This is a critical validation step. Be thorough about what entities are actually safe to delete vs what should be preserved. It's better to preserve important entities than to cause data loss.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or potential issues

The goal is safe entity deletion, not just checking boxes.]]

## Checklist Items

### 1. **Entity Identification:**

   [[LLM: Entities must be clearly identified and validated]]
   - [ ] Entity type has been correctly identified
   - [ ] Entity name is accurate and complete
   - [ ] Entity location has been verified
   - [ ] Entity existence has been confirmed
   - [ ] Entity accessibility has been validated

### 2. **Impact Assessment:**

   [[LLM: Deletion impact must be thoroughly assessed]]
   - [ ] Direct impact on entity files has been assessed
   - [ ] Impact on entity relationships has been evaluated
   - [ ] Impact on referencing content has been analyzed
   - [ ] Impact on system functionality has been considered
   - [ ] Impact on user experience has been evaluated

### 3. **Dependency Analysis:**

   [[LLM: Dependencies must be identified and resolved]]
   - [ ] All entity dependencies have been identified
   - [ ] All referencing content has been located
   - [ ] All relationship connections have been mapped
   - [ ] All system references have been found
   - [ ] All user references have been identified

### 4. **Reference Validation:**

   [[LLM: References must be validated before deletion]]
   - [ ] Internal references have been identified
   - [ ] Cross-references have been located
   - [ ] Back-references have been found
   - [ ] Wiki-links have been identified
   - [ ] Unlinked references have been located

### 5. **Safety Validation:**

   [[LLM: Deletion must be safe for system integrity]]
   - [ ] Deletion won't break system functionality
   - [ ] Deletion won't corrupt existing data
   - [ ] Deletion won't cause data loss
   - [ ] Deletion won't break user workflows
   - [ ] Deletion won't compromise system security

### 6. **Backup Validation:**

   [[LLM: Backups must be created before deletion]]
   - [ ] Backup of entity files has been created
   - [ ] Backup of referencing content has been created
   - [ ] Backup of relationship data has been created
   - [ ] Backup integrity has been verified
   - [ ] Backup accessibility has been confirmed

### 7. **Confirmation Validation:**

   [[LLM: User confirmation must be obtained]]
   - [ ] User has been informed of deletion impact
   - [ ] User has confirmed deletion intent
   - [ ] User has acknowledged potential consequences
   - [ ] User has approved backup creation
   - [ ] User has confirmed deletion scope

### 8. **Cleanup Preparation:**

   [[LLM: Cleanup procedures must be prepared]]
   - [ ] Reference cleanup procedures are ready
   - [ ] Relationship cleanup procedures are prepared
   - [ ] Metadata cleanup procedures are ready
   - [ ] System cleanup procedures are prepared
   - [ ] Validation procedures are ready

## Validation Results

### Summary
- **Total Items Checked**: ___/40
- **Items Passed**: ___
- **Items Failed**: ___
- **Items Not Applicable**: ___

### Critical Issues
[List any critical issues that prevent entity deletion]

### Warning Issues
[List any warning issues that should be addressed]

### Recommendations
[List specific recommendations for addressing issues]

## Final Assessment

- [ ] **APPROVED**: Entity deletion is safe to proceed
- [ ] **CONDITIONAL**: Entity deletion can proceed with modifications
- [ ] **REJECTED**: Entity deletion cannot proceed due to critical issues
- [ ] **NEEDS REVIEW**: Entity deletion requires manual review

## Comments
[Add any additional comments or observations about the entity deletion validation process]
