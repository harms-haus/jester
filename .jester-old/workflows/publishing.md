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

- **Load configuration**: Load `.jester/core-config.yaml`
- **Halt on missing config**: If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for publishing workflow."
- **Extract configurations**: Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- **Identify inputs**: Identify and load the following inputs:
  - **Story files**: Story files in reading/ directory
  - **Entity files**: Entity files in reading/ directory
  - **Patch files**: Pending patches for application
  - **Universe structure**: Current universe structure
  - **Publishing readiness checklist**: publishing-readiness.md for validation

### 2. Pre-Publish Validation

- **Validate story completeness**: Validate story completeness and quality
- **Check file presence**: Check all required files are present
- **Verify status**: Check ready core files' status: It MUST be "PUBLISH" for every core file. Prompt the user to override this block or this workflow must terminate early, reverting any changes made so far.
- **Verify entity consistency**: Verify entity consistency and integrity
- **Check organization**: Ensure proper file organization
- **Verify readiness**: Verify story readiness for publishing

### 3. Story Publishing

- **Manage files**: *COPY* core files from reading to universe stage
- **Update metadata**: Update story metadata and status
- **Place files**: Ensure proper file placement and naming
- **Verify accessibility**: Verify story accessibility
- **Update status**: Update system status

### 4. New Entity Integration

- **Manage entities**: *COPY* story's *new* entity files into universe
- **Integrate system**: Integrate entities into system

### 5. Existing Entity Patching

- **Apply patches**: Patch the universe's existing entity file using the `.patch` file for the entity in the project's reading folder
- **Follow procedure**: Use the `./.jester/workflows/patch-apply.md` file to apply the patches
- **Update references**: Update entity references if the name changed
- **Rename files**: Rename the file if the name changed

### 6. Post-Publish Validation

- **Verify publishing**: Verify publishing process completed successfully
- **Validate files**: Validate all files are in correct locations
- **Validate entities**: Validate entity integration
- **Validate references**: Validate all references are correct
- **Check integrity**: Check system integrity

### 7. Cleanup Operations

- **Clean temporary files**: Remove temporary files
- **Clean staging**: Clean up staging directories
- **Update references**: Update references and metadata
- **Perform cleanup**: Perform system cleanup operations
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
