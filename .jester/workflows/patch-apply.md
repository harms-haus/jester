

# Patch Application Task

## Purpose

To apply patches to the complete universe during the publishing process, ensuring proper change application and system integrity.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for patch application."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Pending patches**: All patches waiting for application
  - **Target entities**: Entities in universe that will be updated
  - **Application context**: Publishing workflow context
  - **Patch application validation checklist**: patch-application-validation.md for validation

### 1. Patch Discovery

- **Patch identification**: Identify all pending patches
- **Compatibility verification**: Check patch compatibility with universe files
- **Application readiness**: Assess readiness for patch application
- **Content validation**: Check for conflicts with existing content
- **Target verification**: Verify patch target entities exist

### 2. Patch Application

- **Entity updates**: Update entity files with patch changes
- **Reference updates**: Update any affected references
- **Metadata updates**: Update entity metadata and timestamps

### 3. Post-Application Verification

- **Application verification**: Verify all patches applied successfully
- **Error handling**: Handle any application errors or failures
- **Entity integrity**: Validate entity integrity after changes
- **Reference integrity**: Check reference & [[link]] integrity and consistency

### 4. Cleanup Operations

- **Applied patch cleanup**: Remove successfully applied patch files
- **Temporary file cleanup**: Clean up any temporary files

### 5. Generate Application Report

Provide a structured patch application report including:

#### Application Summary
- Number of patches processed
- Number of patches applied successfully
- Number of patches failed
- Application completion status

#### Patch Results
- List of successfully applied patches
- List of failed patches with reasons
- Entity changes applied
- Reference updates completed

#### Validation Results
- Format validation results
- Content validation results
- Application verification results
- System integrity check results

#### Error Handling
- Application errors encountered
- Error resolution actions taken
- Rollback procedures executed (if any)
- Manual intervention required (if any)

#### Final Assessment
- **SUCCESS**: All patches applied successfully
- **PARTIAL**: Some patches failed, manual review required
- **FAILED**: Patch application failed, rollback required
- **System Status**: System integrity maintained/compromised