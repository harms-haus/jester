<!-- Powered by BMAD™ Core -->

# Comprehensive Validation Task

## Purpose

To perform comprehensive validation of draft stories, ensuring they meet quality standards and are ready for progression to the reading stage.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for comprehensive validation."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Draft story**: The draft story to validate
  - **Validation checklists**: Required validation checklists (context-validation.md, outline-validation.md, story-validation.md, age-appropriateness-validation.md, system-integrity-validation.md)
  - **Quality standards**: Quality standards and criteria
  - **Template requirements**: Template compliance requirements

### 1. Individual File Validation

- **Context file validation**: Validate context file consistency, completeness, and logical coherence
- **Outline file validation**: Validate outline file structure, consistency, and length estimation
- **Story file validation**: Validate story file quality, length, and audience appropriateness
- **File format validation**: Validate file formats and structure
- **Content validation**: Validate content quality and completeness

### 2. Cross-File Consistency Validation

- **Character consistency**: Check character consistency across context, outline, and story
- **Location consistency**: Check location consistency across all files
- **Item consistency**: Check item consistency across all files
- **Plot consistency**: Check plot consistency between outline and story
- **Theme consistency**: Check theme consistency across all files

### 3. Destination Readiness Check

- **Reading directory verification**: Verify reading directory exists and is accessible
- **Naming conflict check**: Check for naming conflicts in reading directory
- **File organization structure**: Ensure proper file organization structure
- **Metadata compatibility**: Validate metadata compatibility
- **System readiness**: Verify system readiness for progression

### 4. Quality Standards Validation

- **Content quality**: Validate content quality meets standards
- **Age appropriateness**: Ensure content is appropriate for target audience
- **Length requirements**: Verify length meets requirements
- **Theme integration**: Validate theme integration and delivery
- **Educational value**: Assess educational value and moral lessons

### 5. Template Compliance Validation

- **Template structure**: Validate template structure compliance
- **Required sections**: Check all required sections are present
- **Section completeness**: Validate section completeness
- **Format compliance**: Check format compliance
- **Metadata compliance**: Validate metadata compliance

### 6. System Integration Validation

- **File system integration**: Validate file system integration
- **Reference integrity**: Check reference integrity
- **Link validation**: Validate internal and external links
- **Dependency validation**: Validate dependencies
- **System compatibility**: Check system compatibility

### 7. Generate Validation Report

Provide a structured comprehensive validation report including:

#### Validation Summary
- Draft story identification
- Validation completion status
- Overall validation results
- Critical issues identified
- Warning issues identified

#### Individual File Validation
- Context file validation results
- Outline file validation results
- Story file validation results
- File format validation results
- Content validation results

#### Cross-File Consistency
- Character consistency results
- Location consistency results
- Item consistency results
- Plot consistency results
- Theme consistency results

#### Destination Readiness
- Reading directory verification
- Naming conflict check results
- File organization validation
- Metadata compatibility check
- System readiness verification

#### Quality Standards
- Content quality assessment
- Age appropriateness check
- Length requirements validation
- Theme integration validation
- Educational value assessment

#### Template Compliance
- Template structure compliance
- Required sections check
- Section completeness validation
- Format compliance check
- Metadata compliance validation

#### System Integration
- File system integration validation
- Reference integrity check
- Link validation results
- Dependency validation results
- System compatibility check

#### Final Assessment
- **PASS**: Validation passed, ready for progression
- **FAIL**: Validation failed, issues must be addressed
- **WARN**: Validation passed with warnings
- **Action Required**: Specific actions needed to pass validation