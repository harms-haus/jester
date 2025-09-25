<!-- Powered by BMAD™ Core -->

# Patch Creation Task

## Purpose

To create patches for changes to the complete universe when entities aren't available in the ready stage, ensuring proper change tracking and application.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for patch creation."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Change source**: Context file or entity modifications
  - **Target entities**: Entities in universe that need updates
  - **Change type**: Character, location, item, or relationship changes
  - **Patch creation validation checklist**: patch-creation-validation.md for validation

### 1. Patch Identification

- **Change analysis**: Identify changes needed in complete universe
- **Entity mapping**: Determine which entities require patches
- **Impact assessment**: Assess impact of changes on existing entities
- **Patch planning**: Plan patch implementation strategy
- **Dependency analysis**: Identify any dependencies or conflicts

### 2. Patch Generation

- **Patch file creation**: Create patch files for entity changes
- **Change documentation**: Document changes and rationale
- **Compatibility check**: Ensure patch compatibility with target entities
- **Format validation**: Validate patch file format and structure
- **Metadata inclusion**: Include necessary metadata and timestamps

### 3. Patch Validation

- **Format validation**: Check patch file format and structure
- **Content validation**: Verify change accuracy and completeness
- **Conflict detection**: Ensure no conflicts or issues with existing content
- **Application testing**: Test patch application process
- **Integrity verification**: Verify patch integrity and completeness

### 4. Patch Documentation

- **Change rationale**: Document why changes were made
- **Implementation notes**: Include implementation guidance
- **Dependencies**: Document any dependencies or requirements
- **Rollback information**: Include rollback procedures if needed
- **Version tracking**: Include version and timestamp information

### 5. Patch Storage

- **Directory organization**: Store patches in appropriate directory
- **File naming**: Use consistent naming conventions
- **Access permissions**: Set appropriate file permissions
- **Backup creation**: Create backup of original entities if needed
- **Index update**: Update patch index or registry

### 6. Generate Patch Report

Provide a structured patch creation report including:

#### Patch Summary
- Number of patches created
- Entity types affected
- Change types implemented
- Patch creation status

#### Patch Details
- List of patch files created
- Entity changes documented
- Dependencies identified
- Compatibility status

#### Validation Results
- Format validation results
- Content validation results
- Conflict detection results
- Application test results

#### Documentation
- Change rationale documented
- Implementation notes included
- Dependencies documented
- Rollback procedures included

#### Final Assessment
- **SUCCESS**: Patches created successfully
- **PARTIAL**: Some patches may need manual review
- **FAILED**: Patch creation failed, manual intervention required
- **Ready for Application**: Patches ready for application process