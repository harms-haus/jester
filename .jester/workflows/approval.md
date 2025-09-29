

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
  - **Draft file status**: Each core file's status from the metadata yaml at the end of the file.

### 1. Draft Identification

- **Draft identification**: Identify the directory of the draft to be approved
- **File availability**: Verify that the 3 main draft files exist and are accessible
- **Status check**: Check draft core files' status: It MUST be "APPROVED" for every core file. Prompt the user to override this block or this workflow must terminate early, reverting any changes made so far.
- **Readiness assessment**: Assess draft readiness for approval

### 2. Comprehensive Validation

- **Content completeness**: Run comprehensive validation checks: `./.jester/validation/content.md`
- **Quality standards**: Ensure content quality meets high standards
- **Internal consistency**: Check for internal (in-story) consistency with valid transitions between scenes etc.
- **External consistency**: Check for external (in-universe) consistency with valid character traits, etc.
- **Entity validation**: Validate entity relationships are valid (e.g. a predator animal is less likely to be a friend, but it's possible)
- **Conflict detection**: Check for any conflicting sentences or easily-confused object-subject mixups

### 3. User Approval Request

- **Validation summary**: Present validation results to user
- **Issue identification**: Identify and number critical and warning issues
- **Critical resolutions**: For each *critical* issue, present a potential resolution to the user
- **Warning resolutions**: If no critical issues remain, for each *warning* issue, present a potential resolution to the user
- **User approval**: User may agree to zero or more resolutions -> 4.a.
- **Confirmation process**: Confirm user approval decision -> 4.b.

### 4.a. Resolving issues

- **Adapt to the User**: Be flexible and creative with your resolutions, incorporating the user's prompt, or replacing yours with theirs
- **Methodical execution**: Execute each resolution without pausing until it is complete
- **On completion**: Present a summary of the changes to the user
- **Continuing resolve**: Present any remaining issues to the user for review -> 4.a.
- **Confirmation process**: Confirm user approval decision -> 4.b.

### 4.b. Approval Confirmation

- **Approval processing**: Process user approval decision
- **Decision validation**: Validate approval decision
- **Status update**: Update approval status

### 5.a. Entity File Creation

- **New entity extraction**: Extract new entity information from context file
- **Entity file creation**: Create new individual character, location, and item files based on one of these templates:
  - **Character**: `./.jester/templates/character.md`
  - **Location**: `./.jester/templates/location.md`
  - **Item**: `./.jester/templates/item.md`
- **File organization**: Ensure proper file naming and organization

### 5.b. Changed Entity Patches

- **Changed entity extraction**: Extract changed entity information from context file
- **Patch file creation**: Create *patch* files for entities that exist in universe but not in reading: `./.jester/tasks/patch-create.md`
- **File structure**: Format the file following the templates in: `./.jester/templates/entity.patch`
- **File organization**: Ensure proper file naming and organization

### 6. File Management

- **File relocation**: *Copy* approved core files to project reading directory
- **Metadata update**: Update file metadata and status
- **Directory structure**: Ensure proper directory structure
- **Accessibility verification**: Verify file accessibility
- **Status update**: Update metadata for all files:
  - **Update version**: Increase major version by 1
  - **Update times**: Update last edit
  - **Update status**: Ensure status reads: "APPROVED"

### 7. Post-Approval Validation

- **Approval verification**: Verify approval process completed successfully
- **File validation**: Validate all files are in correct locations
- **Entity validation**: Validate entity files created correctly
- **Reference validation**: Validate all references are correct
- **System integrity**: Check system integrity

### 8. Clean Up

- **Delete old files**: Delete the core files in `./draft/{NNN}/`
- **Delete old directory**: Delete the draft directory if no files remain

### 9. Generate Approval Report

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