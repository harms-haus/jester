<!-- Powered by BMAD™ Core -->

# Rename Entity Task

## Purpose

To safely rename an entity (character, location, or item) and update all references across the entire system to maintain consistency and integrity.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for entity rename operations."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Entity type**: Character, location, or item
  - **Current name**: The existing entity name
  - **New name**: The desired new entity name
  - **Entity files**: Files in reading/ and universe/ directories

### 1. Rename Analysis

- **Identify entity type**: Determine if this is a character, location, or item
- **Current name validation**: Verify the current name exists and is accessible
- **New name validation**: Check that the new name doesn't conflict with existing entities
- **Impact assessment**: Determine scope of changes required
- **Create rename plan**: Document all files and references that need updating

### 2. Reference Discovery

- **File system scan**: Find all entity files in reading/ and universe/ directories
- **Internal reference scan**: Find all internal references within entity files
- **Back-reference scan**: Find all back-references to the entity
- **Wiki-link scan**: Find all [[wiki-links]] in stories that reference the entity
- **Unlinked reference scan**: Find unlinked references and nickname references
- **Relationship scan**: Find related entity references (habitations, containers, neighbors)

### 3. File Rename Execution

- **Entity file rename**: Rename entity files in reading/ and universe/ directories
- **Directory structure**: Ensure proper directory organization
- **File permissions**: Maintain proper file permissions
- **Backup creation**: Create backup of original files if requested
- **Verification**: Confirm all files renamed successfully

### 4. Reference Update Execution

- **Internal references**: Update all internal references within entity files
- **Back-references**: Update all back-references to the entity
- **Wiki-links**: Update all [[wiki-links]] in stories
- **Unlinked references**: Update unlinked references and nicknames
- **Relationship references**: Update related entity references
- **Cross-references**: Update cross-references between files

### 5. Validation and Verification

- **File system validation**: Verify all files are in correct locations
- **Reference validation**: Verify all references are updated correctly
- **Link integrity**: Check for any broken links or references
- **Consistency check**: Ensure all references are consistent
- **System integrity**: Verify system integrity is maintained

### 6. Generate Rename Report

Provide a structured rename report including:

#### Rename Summary
- Entity type and names (old → new)
- Total files renamed
- Total references updated
- Rename completion status

#### Files Modified
- List of entity files renamed
- List of files with updated references
- Backup files created (if any)

#### References Updated
- Internal references updated
- Back-references updated
- Wiki-links updated
- Unlinked references updated
- Relationship references updated

#### Validation Results
- File system validation results
- Reference validation results
- Link integrity check results
- System integrity verification

#### Final Assessment
- **SUCCESS**: Entity rename completed successfully
- **PARTIAL**: Some references may need manual review
- **FAILED**: Rename operation failed, rollback required
- **Integrity Status**: System integrity maintained/compromised