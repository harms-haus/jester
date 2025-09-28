

# File Cleanup Task

## Purpose

To clean up files and directory structure after operations, maintaining system organization and removing temporary or orphaned files.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for file cleanup."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Operation context**: Post-publishing, post-deletion, post-import, or post-patch
  - **Target directories**: Directories to clean up
  - **Cleanup scope**: Types of files to clean up

### 1. Temporary File Cleanup

- **Temporary file identification**: Identify temporary files created during operations
- **Staging directory cleanup**: Clean up staging directories
- **Orphaned file detection**: Find and remove orphaned files
- **File organization**: Organize remaining files properly
- **Permission updates**: Update file permissions as needed

### 2. Directory Structure Cleanup

- **Directory organization**: Organize directory structure
- **Empty directory removal**: Remove empty directories
- **Structure validation**: Validate directory structure integrity
- **Accessibility check**: Ensure proper accessibility
- **Naming consistency**: Ensure consistent naming conventions

### 3. File Organization

- **File relocation**: Move files to correct locations
- **File naming**: Ensure proper file naming conventions
- **File permissions**: Update file permissions appropriately
- **File integrity**: Maintain file integrity and consistency
- **Backup management**: Manage backup files appropriately

### 4. Cleanup Type Processing

- **Post-Publishing cleanup**: Remove temporary publishing files
- **Post-Deletion cleanup**: Remove deleted file references
- **Post-Import cleanup**: Remove temporary import files
- **Post-Patch cleanup**: Remove applied patch files
- **General cleanup**: General system cleanup operations

### 5. Validation and Verification

- **File system validation**: Verify all files are in correct locations
- **Orphaned file check**: Check for any remaining orphaned files
- **Directory structure validation**: Validate directory structure
- **Permission validation**: Verify file permissions are correct
- **Accessibility verification**: Ensure proper accessibility

### 6. Generate Cleanup Report

Provide a structured file cleanup report including:

#### Cleanup Summary
- Total files processed
- Files removed
- Files relocated
- Cleanup completion status

#### Cleanup Details
- **Temporary Files**: List of temporary files removed
- **Orphaned Files**: List of orphaned files removed
- **Relocated Files**: List of files relocated
- **Directory Changes**: Directory structure changes made

#### Validation Results
- File system validation results
- Orphaned file check results
- Directory structure validation
- Permission validation results

#### Cleanup Types
- **Post-Publishing**: Publishing cleanup results
- **Post-Deletion**: Deletion cleanup results
- **Post-Import**: Import cleanup results
- **Post-Patch**: Patch cleanup results

#### Final Assessment
- **SUCCESS**: File cleanup completed successfully
- **PARTIAL**: Some cleanup operations may need manual review
- **FAILED**: Cleanup operation failed, manual intervention required
- **System Status**: File system organization maintained/compromised