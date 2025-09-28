

# Approval Workflow Task

## Purpose

To comprehensively validate and approve draft stories for progression to the reading stage, including validation, user approval, and entity file creation.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for approval workflow."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Draft story**: The draft story to be approved
  - **Validation checklists**: Required validation checklists
  - **Entity templates**: Entity file templates for creation

### 1. Draft Identification

- **Draft identification**: Identify the draft to be approved
- **Accessibility verification**: Verify draft exists and is accessible
- **Status check**: Check draft status and completeness
- **File validation**: Validate all required files are present
- **Readiness assessment**: Assess draft readiness for approval

### 2. Comprehensive Validation

- **Content completeness**: Run comprehensive validation checks
- **File presence**: Verify all required files are present
- **Quality standards**: Ensure content quality meets standards
- **Consistency check**: Check for internal and external consistency
- **Entity validation**: Validate entity relationships and references
- **Conflict detection**: Check for any conflicts or issues

### 3. User Approval Request

- **Validation summary**: Present validation results to user
- **Issue identification**: Identify critical and warning issues
- **Approval options**: Present approval options to user
- **User consultation**: Request user decision on approval
- **Confirmation process**: Confirm user approval decision

### 4. Approval Confirmation

- **Approval processing**: Process user approval decision
- **Decision validation**: Validate approval decision
- **Action planning**: Plan actions based on approval decision
- **Execution preparation**: Prepare for approval execution
- **Status update**: Update approval status

### 5. Entity File Creation

- **New entity extraction**: Extract new entity information from context file
- **Entity file creation**: Create new individual character, location, and item files
- **Changed entity extraction**: Extract changed entity information from context file
- **Patch file creation**: Create patch files for entities that exist in universe but not in reading
- **File organization**: Ensure proper file naming and organization

### 6. File Movement

- **File relocation**: Move approved files to reading directory
- **Metadata update**: Update file metadata and status
- **Directory structure**: Ensure proper directory structure
- **Accessibility verification**: Verify file accessibility
- **Status update**: Update system status

### 7. Post-Approval Validation

- **Approval verification**: Verify approval process completed successfully
- **File validation**: Validate all files are in correct locations
- **Entity validation**: Validate entity files created correctly
- **Reference validation**: Validate all references are correct
- **System integrity**: Check system integrity

### 8. Generate Approval Report

Provide a structured approval workflow report including:

#### Approval Summary
- Draft number and title
- Approval status
- Validation results
- Entity files created
- Approval completion status

#### Validation Results
- Content completeness validation
- Entity consistency validation
- Story quality validation
- Conflict detection results
- Overall validation status

#### User Approval Process
- Approval request details
- User decision and rationale
- Confirmation process results
- Approval options selected

#### Entity File Creation
- New entity files created
- Patch files created
- Entity file organization
- File naming and structure

#### File Movement Results
- Files moved to reading directory
- Metadata updates completed
- Directory structure updates
- Accessibility verification results

#### Final Assessment
- **APPROVED**: Draft approved and moved to reading stage
- **REJECTED**: Draft rejected, returned to draft stage
- **CONDITIONAL**: Draft approved with conditions
- **System Status**: System integrity maintained/compromised