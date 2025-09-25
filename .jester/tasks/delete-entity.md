<!-- Powered by BMAD™ Core -->

# Entity Deletion Task

## Purpose

To safely delete entities from the story universe with proper confirmation, impact assessment, and reference cleanup.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for entity deletion."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Entity type**: Character, location, or item
  - **Entity name**: Name of entity to delete
  - **Entity files**: Files in reading/ and universe/ directories
  - **Reference files**: Files that reference the entity
  - **Entity deletion validation checklist**: entity-deletion-validation.md for validation

### 1. Deletion Analysis

- **Entity identification**: Identify the entity to be deleted
- **Deletion type determination**: Determine if this is character, location, or item deletion
- **Impact assessment**: Assess impact and consequences of deletion
- **Dependency analysis**: Check for dependencies and references
- **Deletion approach planning**: Plan deletion approach and strategy

### 2. Confirmation Process

- **Confirmation requirements**: Determine confirmation level required
- **Impact presentation**: Present detailed impact assessment to user
- **User consultation**: Request user confirmation for deletion
- **Backup options**: Offer backup creation options
- **Confirmation validation**: Validate user confirmation

### 3. Backup Creation (if requested)

- **Backup planning**: Plan backup creation strategy
- **Backup execution**: Create backup of entity files
- **Backup storage**: Store backup in safe location
- **Backup verification**: Verify backup integrity
- **Backup documentation**: Document backup location and contents

### 4. Reference Discovery

- **File system scan**: Find all entity files in reading/ and universe/
- **Internal reference scan**: Find all internal references within entity files
- **Cross-reference scan**: Find all cross-references between files
- **Relationship scan**: Find all entity relationships
- **Dependency scan**: Find all dependencies on the entity

### 5. Deletion Execution

- **Entity file deletion**: Remove entity files from reading/ and universe/
- **Reference cleanup**: Clean up all references to the entity
- **Relationship cleanup**: Clean up entity relationships
- **Dependency cleanup**: Clean up entity dependencies
- **Verification**: Verify deletion completion

### 6. Post-Deletion Validation

- **Deletion verification**: Verify all entity files have been deleted
- **Reference validation**: Verify all references have been cleaned up
- **System integrity**: Check system integrity after deletion
- **Functionality testing**: Test system functionality
- **Backup verification**: Verify backup integrity if created

### 7. Generate Deletion Report

Provide a structured entity deletion report including:

#### Deletion Summary
- Entity type and name deleted
- Total files deleted
- Total references cleaned up
- Deletion completion status

#### Deletion Details
- **Entity Files**: List of entity files deleted
- **References Cleaned**: List of references cleaned up
- **Relationships Cleaned**: List of relationships cleaned up
- **Dependencies Cleaned**: List of dependencies cleaned up

#### Confirmation Process
- Confirmation level required
- User confirmation received
- Backup created (if any)
- Impact assessment results

#### Validation Results
- Deletion verification results
- Reference cleanup validation
- System integrity check results
- Functionality test results

#### Final Assessment
- **SUCCESS**: Entity deletion completed successfully
- **PARTIAL**: Some references may need manual cleanup
- **FAILED**: Deletion operation failed, rollback required
- **System Status**: System integrity maintained/compromised