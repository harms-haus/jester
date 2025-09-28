

# System Integrity Validation Checklist

## Purpose

To validate overall system integrity, ensuring all components work together correctly and maintain data consistency.

## Instructions for System Agent

Before performing system operations, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - SYSTEM INTEGRITY VALIDATION

This checklist is for SYSTEM AGENTS to validate overall system integrity before performing operations.

IMPORTANT: This is a critical validation step. Be thorough about what system components are actually functioning vs what needs attention. It's better to identify issues early than to have system failures.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or potential issues

The goal is system reliability, not just checking boxes.]]

## Checklist Items

### 1. **File System Integrity:**

   [[LLM: File system must be intact and accessible]]
   - [ ] All required directories exist and are accessible
   - [ ] File permissions are correct and consistent
   - [ ] No corrupted or inaccessible files detected
   - [ ] Directory structure is intact and organized
   - [ ] File naming conventions are followed

### 2. **Data Consistency:**

   [[LLM: Data must be consistent across the system]]
   - [ ] Entity data is consistent across all files
   - [ ] Reference data is consistent and accurate
   - [ ] Metadata is consistent and up-to-date
   - [ ] Relationship data is consistent and valid
   - [ ] Cross-reference data is consistent

### 3. **Reference Integrity:**

   [[LLM: All references must be valid and accessible]]
   - [ ] Internal links are valid and accessible
   - [ ] Cross-references are accurate and functional
   - [ ] Back-references are consistent and valid
   - [ ] Wiki-links are functional and accurate
   - [ ] Unlinked references are valid and accessible

### 4. **Entity Relationships:**

   [[LLM: Entity relationships must be valid and consistent]]
   - [ ] Character relationships are bidirectional and consistent
   - [ ] Location relationships are logical and consistent
   - [ ] Item relationships are appropriate and consistent
   - [ ] Story relationships are accurate and consistent
   - [ ] Cross-entity relationships are valid and consistent

### 5. **System Configuration:**

   [[LLM: System configuration must be valid and complete]]
   - [ ] Core configuration is valid and complete
   - [ ] Agent configurations are valid and functional
   - [ ] Template configurations are valid and accessible
   - [ ] Workflow configurations are valid and functional
   - [ ] System settings are appropriate and consistent

### 6. **Content Integrity:**

   [[LLM: Content must be intact and valid]]
   - [ ] Story content is complete and coherent
   - [ ] Entity content is complete and consistent
   - [ ] Template content is valid and accessible
   - [ ] Data content is accurate and up-to-date
   - [ ] Reference content is valid and accessible

### 7. **System Performance:**

   [[LLM: System must perform within acceptable parameters]]
   - [ ] File access times are within acceptable limits
   - [ ] Memory usage is within acceptable limits
   - [ ] Processing times are within acceptable limits
   - [ ] Storage usage is within acceptable limits
   - [ ] System responsiveness is acceptable

### 8. **Security Validation:**

   [[LLM: System security must be maintained]]
   - [ ] File permissions are secure and appropriate
   - [ ] Access controls are properly configured
   - [ ] Data integrity is protected
   - [ ] System vulnerabilities are addressed
   - [ ] Security best practices are followed

## Validation Results

### Summary
- **Total Items Checked**: ___/40
- **Items Passed**: ___
- **Items Failed**: ___
- **Items Not Applicable**: ___

### Critical Issues
[List any critical issues that affect system integrity]

### Warning Issues
[List any warning issues that should be addressed]

### Recommendations
[List specific recommendations for addressing issues]

## Final Assessment

- [ ] **HEALTHY**: System integrity is maintained
- [ ] **DEGRADED**: System integrity has minor issues
- [ ] **COMPROMISED**: System integrity has significant issues
- [ ] **CRITICAL**: System integrity is severely compromised

## Comments
[Add any additional comments or observations about the system integrity validation process]
