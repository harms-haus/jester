# System Validation Checklist

## Purpose

To validate overall system integrity, ensuring all components work together correctly and maintain data consistency.

## Instructions for System Agent

Before performing system operations, please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

[[LLM: INITIALIZATION INSTRUCTIONS - SYSTEM VALIDATION

This checklist is for SYSTEM AGENTS to validate overall system integrity before performing operations.

IMPORTANT: This is a critical validation step. Be thorough about what system components are actually functioning vs what needs attention. It's better to identify issues early than to have system failures.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Done, [ ] Not Done, or [N/A] Not Applicable
3. Add brief comments explaining any [ ] or [N/A] items
4. Be specific about what was actually validated
5. Flag any concerns or quality issues

The goal is ensuring system integrity and data consistency across all components.]]

## Checklist Items

1. **Core System Validation:**

   [[LLM: Verify core system components are functioning]]
   - [ ] Core configuration file exists and is accessible (`.jester/core-config.yaml` is present and readable)
   - [ ] System directories are properly structured (all required directories exist and are accessible)
   - [ ] File permissions are correct (all files have appropriate read/write permissions)
   - [ ] System resources are available (sufficient disk space and memory)
   - [ ] System logging is functional (debug logs are being written correctly)

2. **Data Integrity Validation:**

   [[LLM: Check data integrity across all files]]
   - [ ] All required files are present and accessible
   - [ ] File formats are valid and parseable
   - [ ] Data consistency is maintained across files
   - [ ] No corrupted or malformed data detected
   - [ ] File relationships are intact and logical

3. **Template System Validation:**

   [[LLM: Verify template system is functioning correctly]]
   - [ ] All template files are present and accessible
   - [ ] Template structures are valid and complete
   - [ ] Template references are working correctly
   - [ ] Template validation is functioning
   - [ ] Template updates are properly propagated

4. **Validation System Validation:**

   [[LLM: Check validation system is working properly]]
   - [ ] All validation checklists are present and accessible
   - [ ] Validation logic is functioning correctly
   - [ ] Validation results are being recorded properly
   - [ ] Validation errors are being handled appropriately
   - [ ] Validation reports are being generated correctly

5. **Workflow System Validation:**

   [[LLM: Verify workflow system is operational]]
   - [ ] All workflow files are present and accessible
   - [ ] Workflow logic is functioning correctly
   - [ ] Workflow transitions are working properly
   - [ ] Workflow error handling is functioning
   - [ ] Workflow reporting is operational

6. **Entity Management Validation:**

   [[LLM: Check entity management system is working]]
   - [ ] Entity files are properly organized and accessible
   - [ ] Entity relationships are maintained correctly
   - [ ] Entity references are working properly
   - [ ] Entity validation is functioning
   - [ ] Entity updates are being propagated correctly

7. **File System Validation:**

   [[LLM: Verify file system operations are working]]
   - [ ] File creation operations are working
   - [ ] File reading operations are working
   - [ ] File updating operations are working
   - [ ] File deletion operations are working
   - [ ] File backup operations are working

8. **Integration Validation:**

   [[LLM: Check system integration is working properly]]
   - [ ] All system components are communicating correctly
   - [ ] Data flow between components is working
   - [ ] Error propagation is working correctly
   - [ ] System recovery is functioning
   - [ ] System monitoring is operational

9. **Performance Validation:**

   [[LLM: Verify system performance is acceptable]]
   - [ ] System response times are within acceptable limits
   - [ ] Memory usage is within acceptable limits
   - [ ] Disk usage is within acceptable limits
   - [ ] CPU usage is within acceptable limits
   - [ ] Network operations are functioning properly

10. **Security Validation:**

    [[LLM: Check system security is maintained]]
    - [ ] File access permissions are appropriate
    - [ ] Data encryption is working where required
    - [ ] System authentication is functioning
    - [ ] Data backup security is maintained
    - [ ] System audit logging is working

## Final Confirmation

[[LLM: FINAL SYSTEM VALIDATION SUMMARY

After completing the checklist:

1. Summarize what was validated in system integrity
2. List any items marked as [ ] Not Done with explanations
3. Identify any system issues or concerns
4. Note any recommendations for improvement
5. Confirm whether the system is ready for operations

Be thorough - it's better to identify system issues now than have them cause failures later.]]

- [ ] I, the System Agent, confirm that all applicable items above have been addressed and the system is ready for operations.

