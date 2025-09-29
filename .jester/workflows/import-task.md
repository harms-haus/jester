

# Import Workflow Task

## Purpose

To comprehensively import entities and stories from external files or directories, including validation, conflict resolution, and integration.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for import workflow."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Source directory**: Directory containing files to import
  - **Content type filter**: Entity, story, or both
  - **Entity type filter**: Character, location, item (optional)
  - **Import templates**: Templates for import processing
  - **Import validation checklist**: `./.jester/validation/import.md` for content validation

### 1. Content Detection

- **File discovery**: Identify importable files in specified directory
- **Content type filtering**: Filter by content type (entity, story, or both)
- **Entity type filtering**: Filter by entity type if specified
- **File selection**: Select up to 10 files for processing
- **Priority assessment**: Prioritize unstructured content

### 2. File Analysis

- **File structure analysis**: Check if files contain structured template headers
- **Content type identification**: Identify entity-like or story content
- **Quality assessment**: Assess content quality and structure
- **Compatibility check**: Check compatibility with import system
- **Selection criteria**: Apply selection criteria for import

### 3. Content Validation

- **Format validation**: Validate imported content format and structure
- **Field validation**: Check for required fields and data types
- **Quality validation**: Verify content quality and consistency
- **Conflict identification**: Identify potential conflicts with existing content
- **Readiness assessment**: Assess import readiness

### 4. Conflict Detection

- **Naming conflict check**: Check for naming conflicts with existing entities/stories
- **Content conflict identification**: Identify content conflicts and inconsistencies
- **Structural conflict detection**: Detect structural conflicts and format mismatches
- **Reference conflict detection**: Find reference conflicts and broken links
- **Impact assessment**: Assess impact of conflicts

### 5. Conflict Resolution

- **Resolution strategy selection**: Select appropriate resolution strategies
- **User consultation**: Present resolution options to user
- **Approval process**: Get user approval for resolution approaches
- **Resolution execution**: Execute approved resolution strategies
- **Verification**: Verify resolution success

### 6. Content Integration

- **File import**: Import valid files to import-staging/ directory
- **File organization**: Organize files by type (stories/, characters/, locations/, items/)
- **Structure preservation**: Preserve original content structure and formatting
- **Metadata update**: Update metadata and references
- **Naming conventions**: Ensure proper file naming conventions

### 7. Post-Import Validation

- **Import verification**: Verify all files imported successfully
- **Content validation**: Validate imported content
- **Reference validation**: Validate references and links
- **System integrity**: Check system integrity
- **Functionality testing**: Test system functionality

### 8. Generate Import Report

Provide a structured import workflow report including:

#### Import Summary
- Total files processed
- Files imported successfully
- Files failed to import
- Import completion status

#### Content Detection Results
- Files discovered
- Content types identified
- Selection criteria applied
- Priority assessment results

#### Validation Results
- Format validation results
- Content validation results
- Quality validation results
- Conflict detection results

#### Conflict Resolution
- Conflicts detected
- Resolution strategies applied
- User decisions made
- Resolution results

#### Integration Results
- Files imported
- File organization results
- Metadata updates completed
- Naming convention compliance

#### Final Assessment
- **SUCCESS**: Import completed successfully
- **PARTIAL**: Some files imported, manual review required
- **FAILED**: Import failed, manual intervention required
- **System Status**: System integrity maintained/compromised