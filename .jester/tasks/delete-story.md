<!-- Powered by BMAD™ Core -->

# Story Deletion Task

## Purpose

To safely delete stories from the story universe with proper confirmation, impact assessment, and reference cleanup.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story deletion."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Story title**: Title of story to delete
  - **Story files**: Context, outline, and story files
  - **Reference files**: Files that reference the story
  - **Entity files**: Entity files that reference the story

### 1. Deletion Analysis

- **Story identification**: Identify the story to be deleted
- **Impact assessment**: Assess impact and consequences of deletion
- **Dependency analysis**: Check for dependencies and references
- **Entity impact analysis**: Analyze impact on related entities
- **Deletion approach planning**: Plan deletion approach and strategy

### 2. Confirmation Process

- **Double confirmation required**: Story deletion is permanent and irreversible
- **Impact presentation**: Present detailed impact assessment to user
- **User consultation**: Request explicit user confirmation
- **Backup options**: Offer backup creation options
- **Confirmation validation**: Validate user confirmation

### 3. Backup Creation (if requested)

- **Backup planning**: Plan backup creation strategy
- **Backup execution**: Create backup of story files
- **Backup storage**: Store backup in safe location
- **Backup verification**: Verify backup integrity
- **Backup documentation**: Document backup location and contents

### 4. Reference Discovery

- **File system scan**: Find context, outline, and story files
- **Entity reference scan**: Find all references to the story in entity files
- **Cross-reference scan**: Find all cross-references between files
- **Metadata scan**: Find story metadata and cross-references
- **Dependency scan**: Find all dependencies on the story

### 5. Deletion Execution

- **Story file deletion**: Remove context, outline, and story files
- **Reference cleanup**: Clean up all references to the story
- **Entity reference cleanup**: Clean up story references in entity files
- **Metadata cleanup**: Clean up story metadata
- **Verification**: Verify deletion completion

### 6. Post-Deletion Validation

- **Deletion verification**: Verify all story files have been deleted
- **Reference validation**: Verify all references have been cleaned up
- **Entity validation**: Verify entity files are updated correctly
- **System integrity**: Check system integrity after deletion
- **Functionality testing**: Test system functionality

### 7. Generate Deletion Report

Provide a structured story deletion report including:

#### Deletion Summary
- Story title deleted
- Total files deleted
- Total references cleaned up
- Deletion completion status

#### Deletion Details
- **Story Files**: List of story files deleted
- **References Cleaned**: List of references cleaned up
- **Entity References Cleaned**: List of entity references cleaned up
- **Metadata Cleaned**: List of metadata cleaned up

#### Confirmation Process
- Double confirmation received
- User confirmation details
- Backup created (if any)
- Impact assessment results

#### Impact Assessment
- **Direct Impact**: Story file permanently deleted, all content lost
- **Reference Impact**: All story references broken
- **Entity Impact**: Related entities affected
- **Metadata Impact**: Story metadata removed

#### Validation Results
- Deletion verification results
- Reference cleanup validation
- Entity validation results
- System integrity check results

#### Final Assessment
- **SUCCESS**: Story deletion completed successfully
- **PARTIAL**: Some references may need manual cleanup
- **FAILED**: Deletion operation failed, rollback required
- **System Status**: System integrity maintained/compromised