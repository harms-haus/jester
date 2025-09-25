<!-- Powered by BMAD™ Core -->

# Conflict Detection Task

## Purpose

To detect conflicts during story progression, import operations, and system maintenance, ensuring system integrity and preventing data corruption.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for conflict detection."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Operation context**: Story progression, import, or maintenance operation
  - **Target directories**: Directories to scan for conflicts
  - **Content types**: Types of content to check for conflicts

### 1. Directory Structure Check

- **Target directory validation**: Verify target directory exists and is accessible
- **Subdirectory validation**: Check required subdirectories exist
- **Permission validation**: Verify directory permissions are correct
- **Accessibility check**: Ensure no locked or inaccessible files
- **Structure integrity**: Validate directory structure integrity

### 2. File Conflict Detection

- **Naming conflict scan**: Check for existing files with same names
- **Case sensitivity check**: Identify case sensitivity issues
- **Duplicate content scan**: Check for duplicate content
- **File format conflicts**: Detect format mismatches
- **Path conflicts**: Identify path conflicts and inconsistencies

### 3. Content Conflict Detection

- **Entity definition conflicts**: Check for conflicting entity definitions
- **Property conflicts**: Identify inconsistent property values
- **Relationship conflicts**: Detect mismatched relationships
- **Metadata conflicts**: Check for contradictory metadata
- **Reference conflicts**: Identify conflicting references

### 4. Reference Conflict Detection

- **Broken link detection**: Find broken internal links
- **Orphaned reference detection**: Identify orphaned references
- **Circular reference detection**: Find circular dependencies
- **Missing dependency detection**: Identify missing dependencies
- **Cross-reference validation**: Validate cross-references between files

### 5. Conflict Analysis

- **Conflict categorization**: Categorize conflicts by type and severity
- **Impact assessment**: Assess impact of each conflict
- **Resolution strategy**: Determine appropriate resolution strategies
- **Priority ranking**: Rank conflicts by priority and urgency
- **Dependency analysis**: Analyze conflict dependencies

### 6. Generate Conflict Report

Provide a structured conflict detection report including:

#### Detection Summary
- Total conflicts detected
- Conflict types identified
- Severity distribution
- Detection completion status

#### Conflict Details
- **Naming Conflicts**: Duplicate names, naming violations
- **Content Conflicts**: Conflicting descriptions, inconsistent properties
- **Structural Conflicts**: Format mismatches, missing fields
- **Reference Conflicts**: Broken links, circular dependencies

#### Severity Assessment
- **Critical**: Conflicts that prevent operation or cause data loss
- **High**: Conflicts that affect functionality or data integrity
- **Medium**: Conflicts that cause warnings or minor issues
- **Low**: Conflicts that are cosmetic or non-functional

#### Resolution Recommendations
- **Automatic Resolution**: Conflicts that can be resolved automatically
- **Manual Resolution**: Conflicts requiring user intervention
- **Resolution Strategies**: Recommended approaches for each conflict
- **Priority Actions**: High-priority conflicts requiring immediate attention

#### Final Assessment
- **CLEAN**: No conflicts detected
- **WARNINGS**: Minor conflicts detected, system functional
- **CRITICAL**: Critical conflicts detected, operation blocked
- **Action Required**: Specific actions needed to resolve conflicts