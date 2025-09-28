<!-- Powered by BMAD™ Core -->

# Rename Story Task

## Purpose

To safely rename a story title and update all references across the entire system to maintain consistency and integrity.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story rename operations."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Current title**: The existing story title
  - **New title**: The desired new story title
  - **Story files**: Context, outline, and story files in draft/ directory

### 1. Rename Analysis

- **Current title validation**: Verify the current title exists and is accessible
- **New title validation**: Check that the new title doesn't conflict with existing stories
- **Impact assessment**: Determine scope of changes required
- **Create rename plan**: Document all files and references that need updating

### 2. Reference Discovery

- **File system scan**: Find context, outline, and story files
- **Entity reference scan**: Find all references to the story in entity files
- **Story metadata scan**: Find story metadata and cross-references
- **Directory structure scan**: Find directory structure and file names
- **Cross-reference scan**: Find all cross-references between files

### 3. File Rename Execution

- **DO NOT rename**: Core file in `./draft/{NNN}/` directory, they should remain generically named: `outline-{NNN}.md`, etc.
- **Core files rename**: Rename context, outline, story files in `./reading/{NNN} - Story Title` directory
- **Directory structure**: Ensure proper directory organization: rename directories thate reference the old title
- **File permissions**: Maintain proper file permissions
- **Backup creation**: Create backup of original files if requested
- **Verification**: Confirm all files renamed successfully

### 4. Reference Update Execution

- **Entity references**: Update all references to the story in entity files
- **Story metadata**: Update story metadata and cross-references
- **Directory references**: Update directory structure references
- **Cross-references**: Update cross-references between files
- **File path references**: Update any file path references

### 5. Validation and Verification

- **File system validation**: Verify all files are in correct locations
- **Reference validation**: Verify all references are updated correctly
- **Link integrity**: Check for any broken links or references
- **Consistency check**: Ensure all references are consistent
- **System integrity**: Verify system integrity is maintained

### 6. Generate Rename Report

Provide a structured rename report including:

#### Rename Summary
- Story titles (old → new)
- Total files renamed
- Total references updated
- Rename completion status

#### Files Modified
- List of story files renamed
- List of files with updated references
- Backup files created (if any)

#### References Updated
- Entity references updated
- Story metadata updated
- Directory references updated
- Cross-references updated

#### Validation Results
- File system validation results
- Reference validation results
- Link integrity check results
- System integrity verification

#### Final Assessment
- **SUCCESS**: Story rename completed successfully
- **PARTIAL**: Some references may need manual review
- **FAILED**: Rename operation failed, rollback required
- **Integrity Status**: System integrity maintained/compromised