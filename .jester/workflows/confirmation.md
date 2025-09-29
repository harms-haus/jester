

# Confirmation Workflow Task

## Purpose

To manage confirmation processes for deletion operations, ensuring proper user confirmation and impact assessment before executing destructive operations.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for confirmation workflow."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Operation type**: Deletion operation type
  - **Target items**: Items to be deleted
  - **Impact scope**: Scope of impact assessment
  - **Confirmation requirements**: Confirmation level requirements

### 1. Confirmation Requirements Analysis

- **Operation type identification**: Identify the type of deletion operation
- **Confirmation level determination**: Determine required confirmation level
- **Impact assessment scope**: Define scope of impact assessment
- **User guidance requirements**: Determine user guidance needs
- **Confirmation process planning**: Plan confirmation process

### 2. Impact Assessment

- **Direct impact analysis**: Analyze direct impact of deletion
- **Reference impact analysis**: Analyze impact on references
- **Relationship impact analysis**: Analyze impact on relationships
- **System impact analysis**: Analyze impact on system integrity
- **User impact analysis**: Analyze impact on user experience

### 3. Confirmation Process

- **Confirmation presentation**: Present deletion details to user
- **Impact explanation**: Explain impact and consequences
- **Confirmation request**: Request explicit user confirmation
- **Backup options**: Offer backup creation options
- **Confirmation validation**: Validate user confirmation

### 4. Confirmation Types

- **Standard confirmation**: Standard confirmation for most operations
- **Double confirmation**: Double confirmation for critical operations
- **Enhanced confirmation**: Enhanced confirmation for universe operations
- **Bulk confirmation**: Individual confirmation for bulk operations
- **Custom confirmation**: Custom confirmation for special cases

### 5. User Decision Processing

- **Decision validation**: Validate user decision
- **Action planning**: Plan actions based on user decision
- **Execution preparation**: Prepare for operation execution
- **Rollback preparation**: Prepare rollback procedures if needed
- **Status update**: Update operation status

### 6. Post-Confirmation Actions

- **Operation execution**: Execute confirmed operation
- **Verification**: Verify operation completion
- **Cleanup**: Perform necessary cleanup operations
- **Status update**: Update system status
- **User notification**: Notify user of completion

### 7. Generate Confirmation Report

Provide a structured confirmation workflow report including:

#### Confirmation Summary
- Operation type and scope
- Confirmation level required
- User decision received
- Confirmation completion status
- Operation execution status

#### Impact Assessment
- Direct impact analysis
- Reference impact analysis
- Relationship impact analysis
- System impact analysis
- User impact analysis

#### Confirmation Process
- Confirmation requirements
- Impact presentation
- User consultation
- Confirmation validation
- Decision processing

#### Confirmation Types
- Standard confirmation results
- Double confirmation results
- Enhanced confirmation results
- Bulk confirmation results
- Custom confirmation results

#### User Decision
- User decision details
- Decision rationale
- Action planning
- Execution preparation
- Rollback preparation

#### Post-Confirmation Actions
- Operation execution results
- Verification results
- Cleanup operations
- Status updates
- User notifications

#### Final Assessment
- **CONFIRMED**: Operation confirmed and executed
- **CANCELLED**: Operation cancelled by user
- **MODIFIED**: Operation modified based on user input
- **PENDING**: Confirmation pending user decision