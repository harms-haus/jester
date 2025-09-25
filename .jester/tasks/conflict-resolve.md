<!-- Powered by BMAD™ Core -->

# Conflict Resolution Task

## Purpose

To resolve conflicts detected during operations using appropriate strategies, ensuring system integrity and maintaining data consistency.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for conflict resolution."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Conflict report**: Results from conflict detection
  - **Resolution preferences**: User preferences for resolution strategies
  - **Backup requirements**: Backup requirements for resolution

### 1. Resolution Strategy Selection

- **Conflict analysis**: Analyze each detected conflict
- **Strategy identification**: Identify appropriate resolution strategies
- **User consultation**: Present resolution options to user
- **Approval process**: Get user approval for resolution approaches
- **Backup preparation**: Prepare backups before resolution

### 2. Automatic Resolution

- **Rename conflicts**: Automatically rename conflicting items with suffixes
- **Merge compatible content**: Combine non-conflicting content automatically
- **Skip non-critical**: Skip conflicts that don't affect operation
- **Update references**: Automatically fix broken references
- **Format standardization**: Standardize formats where possible

### 3. Manual Resolution

- **Conflict presentation**: Present conflicts to user with detailed information
- **Resolution options**: Offer multiple resolution approaches
- **User decision**: Execute user-selected resolution
- **Validation**: Validate resolution results
- **Documentation**: Document resolution decisions and rationale

### 4. Resolution Execution

- **Sequential processing**: Process conflicts in priority order
- **Change application**: Apply approved resolution strategies
- **Reference updates**: Update affected references and metadata
- **Validation**: Validate each resolution step
- **Error handling**: Handle any resolution errors

### 5. Post-Resolution Validation

- **Resolution verification**: Verify all conflicts have been resolved
- **System integrity**: Check system integrity after resolution
- **Reference integrity**: Validate reference integrity and consistency
- **Functionality testing**: Test system functionality
- **Backup verification**: Verify backup integrity if created

### 6. Generate Resolution Report

Provide a structured conflict resolution report including:

#### Resolution Summary
- Total conflicts processed
- Number of conflicts resolved automatically
- Number of conflicts resolved manually
- Resolution completion status

#### Resolution Details
- **Automatic Resolutions**: List of automatically resolved conflicts
- **Manual Resolutions**: List of manually resolved conflicts
- **Resolution Strategies**: Strategies used for each conflict
- **User Decisions**: User decisions and rationale

#### Validation Results
- Resolution verification results
- System integrity check results
- Reference integrity validation
- Functionality test results

#### Error Handling
- Resolution errors encountered
- Error resolution actions taken
- Rollback procedures executed (if any)
- Manual intervention required (if any)

#### Final Assessment
- **SUCCESS**: All conflicts resolved successfully
- **PARTIAL**: Some conflicts resolved, manual review required
- **FAILED**: Conflict resolution failed, rollback required
- **System Status**: System integrity maintained/compromised