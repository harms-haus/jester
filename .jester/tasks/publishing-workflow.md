<!-- Powered by BMAD™ Core -->

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
  - **Publishing readiness checklist**: publishing-readiness-validation.md for validation

### 1. Pre-Publish Validation

- **Story completeness**: Validate story completeness and quality
- **File presence**: Check all required files are present
- **Entity consistency**: Verify entity consistency and integrity
- **File organization**: Ensure proper file organization
- **System readiness**: Verify system readiness for publishing

### 2. Patch Application

- **Patch discovery**: Identify all pending patches
- **Patch validation**: Validate patch format and structure
- **Patch application**: Apply patches to universe entities
- **Application verification**: Verify patch application success
- **Conflict handling**: Handle any patch conflicts

### 3. Story Publishing

- **File movement**: Move story from reading to universe stage
- **Metadata update**: Update story metadata and status
- **File placement**: Ensure proper file placement
- **Accessibility verification**: Verify story accessibility
- **Status update**: Update system status

### 4. Entity Integration

- **Entity integration**: Integrate story entities into universe
- **Reference update**: Update entity references
- **Relationship establishment**: Establish entity relationships
- **Consistency maintenance**: Maintain entity consistency
- **System integration**: Integrate entities into system

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
- **Status update**: Update system status

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