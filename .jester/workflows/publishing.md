

# Publishing Workflow Task

## Purpose

To guide stories through the publishing process from reading to universe stage, including validation, patch application, and system integration.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for publishing workflow."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Story files**: Story files in reading/ directory
  - **Entity files**: Entity files in reading/ directory
  - **Patch files**: Pending patches for application
  - **Universe structure**: Current universe structure
  - **Publishing readiness checklist**: publishing-readiness.md for validation

### 1. Pre-Publish Validation

- **Story completeness**: Validate story completeness and quality
- **File presence**: Check all required files are present
- **Status check**: Check ready core files' status: It MUST be "PUBLISH" for every core file. Prompt the user to override this block or this workflow must terminate early, reverting any changes made so far.
- **Entity consistency**: Verify entity consistency and integrity
- **File organization**: Ensure proper file organization
- **Story readiness**: Verify story readiness for publishing

### 2. Story Publishing

- **File management**: *COPY* core files from reading to universe stage
- **Metadata update**: Update story metadata and status
- **File placement**: Ensure proper file placement and naming
- **Accessibility verification**: Verify story accessibility
- **Status update**: Update system status

### 3. New Entity Integration

- **Entity management**: *COPY* story's *new* entity files into universe
- **System integration**: Integrate entities into system

### 4. Existing Entity Patching

- **Entity Patching**: Patch the universe's existing entity file using the `.patch` file for the entity in the project's reading folder
- **Patch Procedure**: Use the `./.jester/workflows/patch-apply.md` file to apply the patches
- **Reference update**: Update entity references if the name changed
- **Rename file**: Rename the file if the name changed.

### 5. Post-Publish Validation

- **Publishing verification**: Verify publishing process completed successfully
- **File validation**: Validate all files are in correct locations
- **Entity validation**: Validate entity integration
- **Reference validation**: Validate all references are correct
- **System integrity**: Check system integrity

### 6. Cleanup Operations

- **Temporary file cleanup**: Remove temporary files
- **Staging cleanup**: Clean up staging directories
- **Reference cleanup**: Update references and metadata
- **System cleanup**: Perform system cleanup operations
- **Status update**: Update metadata for all files:
  - **Update version**: Increase major version by 1
  - **Update times**: Update last edit
  - **Update status**: Ensure status reads: "PUBLISHED"
- **Core file cleanup**: Remove story core files from reading directory
- **Entity file cleanup**: Remove story entity files and patches from reading directory

### 7. Generate Publishing Report

Provide a structured publishing workflow report including:

#### Publishing Summary
- Story title and status
- Publishing completion status
- Files moved
- Entities integrated
- Patches applied

#### Pre-Publish Validation
- Story completeness validation
- File presence check
- Entity consistency validation
- File organization check
- System readiness verification

#### Patch Application
- Patches discovered
- Patch validation results
- Patch application results
- Application verification
- Conflict resolution

#### Story Publishing
- Files moved to universe
- Metadata updates completed
- File placement verification
- Accessibility verification
- Status updates

#### Entity Integration
- Entities integrated
- Reference updates completed
- Relationships established
- Consistency maintained
- System integration

#### Post-Publish Validation
- Publishing verification
- File validation results
- Entity validation results
- Reference validation results
- System integrity check

#### Cleanup Operations
- Temporary files removed
- Staging cleanup completed
- Reference cleanup completed
- System cleanup completed
- Status updates

#### Final Assessment
- **SUCCESS**: Publishing completed successfully
- **PARTIAL**: Publishing completed with minor issues
- **FAILED**: Publishing failed, manual intervention required
- **System Status**: System integrity maintained/compromised
