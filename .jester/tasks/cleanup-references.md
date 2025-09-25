<!-- Powered by BMAD™ Core -->

# Reference Cleanup Task

## Purpose

To clean up metadata and references after operations, maintaining reference integrity and ensuring proper connections between files.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for reference cleanup."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Operation context**: Post-publishing, post-deletion, post-import, or post-patch
  - **Reference types**: Types of references to clean up
  - **Cleanup scope**: Scope of reference cleanup

### 1. File Metadata Cleanup

- **Metadata update**: Update file metadata after operations
- **Old reference removal**: Clean up old references in metadata
- **Status information update**: Update status information
- **Consistency maintenance**: Maintain metadata consistency
- **Timestamp updates**: Update relevant timestamps

### 2. Internal Link Cleanup

- **Link validation**: Validate internal links within files
- **Broken link repair**: Fix broken internal links
- **Link integrity maintenance**: Maintain link integrity
- **Navigation structure preservation**: Preserve navigation structure
- **Link consistency**: Ensure link consistency

### 3. Cross-Reference Cleanup

- **Cross-reference update**: Update cross-references between files
- **Orphaned reference removal**: Remove orphaned references
- **Reference consistency maintenance**: Maintain reference consistency
- **Connection validation**: Validate proper connections
- **Dependency updates**: Update dependency references

### 4. Entity Relationship Cleanup

- **Relationship update**: Update entity relationships
- **Broken relationship repair**: Fix broken relationship references
- **Relationship integrity maintenance**: Maintain relationship integrity
- **Connection validation**: Validate proper connections
- **Dependency updates**: Update relationship dependencies

### 5. System State Cleanup

- **Status update**: Update system status after operations
- **Configuration cleanup**: Clean up old configuration files
- **Log management**: Manage log files appropriately
- **State consistency**: Maintain system state consistency
- **Performance optimization**: Optimize system performance

### 6. Validation and Verification

- **Reference validation**: Verify all references are valid
- **Link integrity check**: Check for broken links
- **Connection validation**: Ensure proper connections
- **Metadata consistency**: Validate metadata consistency
- **System integrity**: Verify overall system integrity

### 7. Generate Reference Cleanup Report

Provide a structured reference cleanup report including:

#### Cleanup Summary
- Total references processed
- References updated
- References removed
- Cleanup completion status

#### Cleanup Details
- **File Metadata**: Metadata cleanup results
- **Internal Links**: Internal link cleanup results
- **Cross-References**: Cross-reference cleanup results
- **Entity Relationships**: Relationship cleanup results
- **System State**: System state cleanup results

#### Validation Results
- Reference validation results
- Link integrity check results
- Connection validation results
- Metadata consistency validation
- System integrity verification

#### Reference Types
- **Internal Links**: Links within files
- **Cross-References**: References between files
- **Metadata References**: File metadata references
- **Relationship References**: Entity relationship references

#### Final Assessment
- **SUCCESS**: Reference cleanup completed successfully
- **PARTIAL**: Some references may need manual review
- **FAILED**: Reference cleanup failed, manual intervention required
- **System Status**: Reference integrity maintained/compromised