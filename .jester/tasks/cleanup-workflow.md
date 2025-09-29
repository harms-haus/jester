# Cleanup Workflow

## Purpose

To clean up files, references, and system state after operations, maintaining system organization and ensuring proper connections between files.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for cleanup operations."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Operation context**: Post-publishing, post-deletion, post-import, or post-patch
  - **Target directories**: Directories to clean up
  - **Cleanup scope**: Types of files and references to clean up

### 1. File Cleanup

- **Temporary file identification**: Identify temporary files created during operations
- **Staging directory cleanup**: Clean up staging directories
- **Orphaned file detection**: Find and remove orphaned files
- **Duplicate file detection**: Find and remove duplicate files
- **Corrupted file detection**: Find and remove corrupted files
- **File organization**: Organize remaining files properly
- **Permission updates**: Update file permissions as needed

### 2. Directory Structure Cleanup

- **Directory organization**: Organize directory structure
- **Empty directory removal**: Remove empty directories
- **Directory structure validation**: Validate directory structure integrity
- **Accessibility check**: Ensure proper accessibility
- **Naming consistency**: Ensure consistent naming conventions
- **Directory hierarchy optimization**: Optimize directory hierarchy

### 3. Reference Cleanup

- **Link validation**: Validate internal links within files
- **Broken link repair**: Fix broken internal links
- **Cross-reference update**: Update cross-references between files
- **Orphaned reference removal**: Remove orphaned references
- **Reference consistency maintenance**: Maintain reference consistency
- **Connection validation**: Validate proper connections
- **Dependency updates**: Update dependency references

### 4. Metadata Cleanup

- **Metadata update**: Update file metadata after operations
- **Old reference removal**: Clean up old references in metadata
- **Status information update**: Update status information
- **Consistency maintenance**: Maintain metadata consistency
- **Timestamp updates**: Update relevant timestamps
- **Inconsistent metadata correction**: Fix inconsistent metadata
- **Missing metadata addition**: Add missing metadata

### 5. Entity Relationship Cleanup

- **Relationship update**: Update entity relationships
- **Broken relationship repair**: Fix broken relationship references
- **Relationship integrity maintenance**: Maintain relationship integrity
- **Connection validation**: Validate proper connections
- **Dependency updates**: Update relationship dependencies

### 6. System State Cleanup

- **Status update**: Update system status after operations
- **Configuration cleanup**: Clean up old configuration files
- **Log management**: Manage log files appropriately
- **State consistency**: Maintain system state consistency
- **Performance optimization**: Optimize system performance
- **Cache clearing**: Clear system cache
- **Temporary file removal**: Remove system temporary files

### 7. Data Cleanup

- **Inconsistent data correction**: Fix inconsistent data
- **Duplicate data removal**: Remove duplicate data
- **Outdated data update**: Update outdated data
- **Corrupted data repair**: Repair corrupted data
- **Data integrity maintenance**: Maintain data integrity

### 8. Validation and Verification

- **File system validation**: Verify all files are in correct locations
- **Orphaned file check**: Check for any remaining orphaned files
- **Directory structure validation**: Validate directory structure
- **Permission validation**: Verify file permissions are correct
- **Accessibility verification**: Ensure proper accessibility
- **Reference validation**: Verify all references are valid
- **Link integrity check**: Check for broken links
- **Connection validation**: Ensure proper connections
- **Metadata consistency**: Validate metadata consistency
- **System integrity**: Verify overall system integrity

### 9. Generate Cleanup Report

Provide a structured cleanup report including:

#### Cleanup Summary
- Total files processed
- Files removed
- Files relocated
- References updated
- References removed
- Cleanup completion status

#### File Cleanup Details
- **Temporary Files**: List of temporary files removed
- **Orphaned Files**: List of orphaned files removed
- **Duplicate Files**: List of duplicate files removed
- **Corrupted Files**: List of corrupted files removed
- **Relocated Files**: List of files relocated
- **Directory Changes**: Directory structure changes made

#### Reference Cleanup Details
- **File Metadata**: Metadata cleanup results
- **Internal Links**: Internal link cleanup results
- **Cross-References**: Cross-reference cleanup results
- **Entity Relationships**: Relationship cleanup results
- **System State**: System state cleanup results

#### Validation Results
- File system validation results
- Orphaned file check results
- Directory structure validation
- Permission validation results
- Reference validation results
- Link integrity check results
- Connection validation results
- Metadata consistency validation
- System integrity verification

#### Cleanup Types
- **Post-Publishing**: Publishing cleanup results
- **Post-Deletion**: Deletion cleanup results
- **Post-Import**: Import cleanup results
- **Post-Patch**: Patch cleanup results

#### Final Assessment
- **SUCCESS**: Cleanup completed successfully
- **PARTIAL**: Some cleanup operations may need manual review
- **FAILED**: Cleanup operation failed, manual intervention required
- **System Status**: System organization and integrity maintained/compromised

## Cleanup Validation Checklist

### File Cleanup Validation
- [ ] Temporary files have been removed
- [ ] Orphaned files have been identified and removed
- [ ] Duplicate files have been identified and removed
- [ ] Corrupted files have been identified and removed
- [ ] Unnecessary files have been removed

### Directory Cleanup Validation
- [ ] Empty directories have been removed
- [ ] Directory structure has been organized
- [ ] Directory permissions have been corrected
- [ ] Directory naming has been standardized
- [ ] Directory hierarchy has been optimized

### Reference Cleanup Validation
- [ ] Broken references have been identified and fixed
- [ ] Orphaned references have been identified and removed
- [ ] Inconsistent references have been identified and corrected
- [ ] Duplicate references have been identified and removed
- [ ] Reference integrity has been maintained

### Metadata Cleanup Validation
- [ ] Inconsistent metadata has been identified and corrected
- [ ] Outdated metadata has been identified and updated
- [ ] Duplicate metadata has been identified and removed
- [ ] Missing metadata has been identified and added
- [ ] Metadata integrity has been maintained

### System Cleanup Validation
- [ ] System logs have been cleaned and organized
- [ ] System cache has been cleared and optimized
- [ ] System temporary files have been removed
- [ ] System configuration has been optimized
- [ ] System performance has been maintained

### Data Cleanup Validation
- [ ] Inconsistent data has been identified and corrected
- [ ] Duplicate data has been identified and removed
- [ ] Outdated data has been identified and updated
- [ ] Corrupted data has been identified and repaired
- [ ] Data integrity has been maintained

### Performance Cleanup Validation
- [ ] System performance has been optimized
- [ ] Memory usage has been optimized
- [ ] Storage usage has been optimized
- [ ] Processing efficiency has been improved
- [ ] System responsiveness has been maintained

### Final Validation
- [ ] All cleanup operations have been completed
- [ ] System integrity has been maintained
- [ ] Data consistency has been preserved
- [ ] System functionality has been restored
- [ ] System performance has been optimized


