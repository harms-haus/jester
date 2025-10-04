# Publishing Workflow

## Purpose

Guide stories through the publishing process from reading to universe stage, including validation, patch application, and system integration to ensure proper story release and entity management

## Definitions

- a `story` is a complete narrative that has been reviewed and approved for publication
- `publishing` is the process of moving stories and related entities from draft status to published status
- a `universe` is the permanent storage area for published stories and entities
- `patches` are updates to existing entities that need to be applied during publishing
- `core files` are the essential story files that must be published
- `entity files` are the individual files that define characters, locations, and items
- `publishing readiness` refers to the state where all requirements for publishing have been met

## Sequential Tasks

***CRITICAL: Do not proceed to the next task until the current task is complete***

### 1. Load Core Configuration and Inputs

- **Identify inputs**: Identify and load the following inputs:
  - **Story files**: Story files in reading/ directory
  - **Entity files**: Entity files in reading/ directory
  - **Patch files**: Pending patches for application
  - **Universe structure**: Current universe structure

### 2. Pre-Publish Validation

- **Check file presence**: Check all required files are present
- **Verify status**: Check ready core files' status: It MUST be "PUBLISH" for every core file. If the status is not PUBLISH, then HALT IMMEDIATELY and prompt the user to override this block or this workflow must terminate early, reverting any changes made so far.
- **Check organization**: Ensure proper file organization

### 3. Story Publishing

- **Validate destination**: Check that the destination path is empty. If a file exists, HALT IMMEDIATELY and ask the user what to do
- **Manage files**: *COPY* core files from reading to universe stage
- **Place files**: Ensure proper file placement and naming
- **Verify accessibility**: Verify story accessibility

### 4. New Entity Integration

- **Validate destination**: Check that the destination path is empty. If a file exists, HALT IMMEDIATELY and ask the user what to do
- **Manage entities**: *COPY* story's *new* entity files into universe

### 5. Existing Entity Patching

- **Validate destination**: Check that the destination path is not empty. If the file is missing, HALT IMMEDIATELY and ask the user what to do
- **Apply patches**: Patch the universe's existing entity file using the `.patch.md` file for the entity in the project's reading folder
- **Follow procedure**: Use the `./.jester/workflows/patch-apply.md` file to apply the patches
- **Update references**: Update entity references if the name changed
- **Rename files**: Rename the file if the name changed

### 6. Post-Publish Validation

- **Verify publishing**: Verify publishing process completed successfully
- **Validate files**: Validate all files are in correct locations

### 7. Cleanup Operations

- **Update metadata**: Update metadata for all files:
  - **Update version**: Increase major version by 1
  - **Update times**: Update last edit
  - **Update status**: Ensure status reads: "PUBLISHED"
- **Remove core files**: Remove story core files from reading directory
- **Remove entity files**: Remove story entity files and patches from reading directory

### 8. Generate Publishing Report

Provide a structured publishing workflow report including:

#### Publishing Summary

- Story title and status
- Publishing completion status
- Files moved
- Entities integrated
- Patches applied

#### Pre-Publish Validation

- File presence check
- File organization check

#### Patch Application

- Patches discovered
- Patch application results
- Conflict resolution

#### Story Publishing

- Files moved to universe
- File placement verification
- Accessibility verification

#### Entity Integration

- Entities integrated
- Reference updates completed
- Relationships established

#### Cleanup Operations

- Reading files deleted

#### Final Assessment

- **SUCCESS**: Publishing completed successfully
- **PARTIAL**: Publishing completed with minor issues
- **FAILED**: Publishing failed, manual intervention required
- **System Status**: System integrity maintained/compromised
