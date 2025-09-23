# Entity Consistency Validation

## Purpose
Comprehensive validation prompts for ensuring entity consistency during story progression.

## Validation Templates

### Entity Relationship Validation (8.2.1)

**Prompt Template:**
```
VALIDATE ENTITY RELATIONSHIPS

You are validating entity relationships for story progression consistency.

1. **Relationship Integrity Check:**
   - [ ] All entity relationships are bidirectional
   - [ ] Relationship types are consistent (friend, enemy, family, etc.)
   - [ ] No circular or contradictory relationships
   - [ ] Relationship strength is appropriate

2. **Cross-Reference Validation:**
   - [ ] Character A mentions Character B, and Character B mentions Character A
   - [ ] Location references are consistent across entity files
   - [ ] Item ownership is logically consistent
   - [ ] Entity interactions make sense

3. **Relationship Metadata Check:**
   - [ ] Relationship descriptions are consistent
   - [ ] Relationship history is coherent
   - [ ] No conflicting relationship information
   - [ ] Relationship context is appropriate

**Validation Result:**
- PASS: All relationships are consistent
- FAIL: Inconsistent relationships found
- WARN: Minor relationship issues detected

**Error Reporting:**
List inconsistent relationships with specific entity names and suggested corrections.
```

### Entity Reference Integrity Checking (8.2.2)

**Prompt Template:**
```
VALIDATE ENTITY REFERENCE INTEGRITY

You are validating entity reference integrity across all files.

1. **Reference Completeness:**
   - [ ] All [[entity-name]] links have corresponding entity files
   - [ ] No orphaned references (links to non-existent entities)
   - [ ] No broken wiki-link syntax
   - [ ] All entity references are properly formatted

2. **Reference Consistency:**
   - [ ] Entity names are consistent across all references
   - [ ] Entity types match their usage context
   - [ ] No duplicate references with different names
   - [ ] Reference context is appropriate

3. **Cross-File Validation:**
   - [ ] Context file entities match story file references
   - [ ] Outline file entities match story file references
   - [ ] Entity files reference each other correctly
   - [ ] No circular reference issues

**Validation Result:**
- PASS: All references are intact and consistent
- FAIL: Broken or inconsistent references found
- WARN: Minor reference issues detected

**Error Reporting:**
List broken references with file locations and provide fix suggestions.
```

### Entity Metadata Consistency Validation (8.2.3)

**Prompt Template:**
```
VALIDATE ENTITY METADATA CONSISTENCY

You are validating entity metadata consistency across the story universe.

1. **Metadata Completeness:**
   - [ ] All entities have required metadata fields
   - [ ] No missing essential information
   - [ ] All metadata fields are properly formatted
   - [ ] No placeholder or empty metadata

2. **Metadata Accuracy:**
   - [ ] Entity descriptions match their usage in stories
   - [ ] Entity properties are consistent with story context
   - [ ] Entity characteristics are coherent
   - [ ] No contradictory metadata

3. **Metadata Relationships:**
   - [ ] Entity metadata supports their relationships
   - [ ] Entity characteristics are compatible
   - [ ] No conflicting entity information
   - [ ] Entity metadata enhances story consistency

**Validation Result:**
- PASS: All metadata is consistent and complete
- FAIL: Inconsistent or incomplete metadata found
- WARN: Minor metadata issues detected

**Error Reporting:**
List metadata inconsistencies with specific entity names and field names.
```

### Entity Link Validation (8.2.4)

**Prompt Template:**
```
VALIDATE ENTITY LINKS

You are validating entity link syntax and functionality.

1. **Link Syntax Validation:**
   - [ ] All [[entity-name]] links use correct wiki syntax
   - [ ] No malformed link syntax
   - [ ] Link names match entity file names exactly
   - [ ] No special characters in link names

2. **Link Functionality:**
   - [ ] All links point to existing entity files
   - [ ] Link targets are accessible
   - [ ] No broken or dead links
   - [ ] Links work in both directions

3. **Link Consistency:**
   - [ ] Entity names are consistent across all links
   - [ ] No duplicate links with different names
   - [ ] Link context is appropriate
   - [ ] No orphaned links

**Validation Result:**
- PASS: All links are valid and functional
- FAIL: Broken or malformed links found
- WARN: Minor link issues detected

**Error Reporting:**
List broken links with file locations and provide correction suggestions.
```

## Comprehensive Entity Consistency Report

**Prompt Template:**
```
ENTITY CONSISTENCY VALIDATION REPORT
====================================
Draft Number: {draft-number}
Validation Date: {timestamp}
Overall Status: {PASS/FAIL/WARN}

ENTITY RELATIONSHIPS:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

REFERENCE INTEGRITY:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

METADATA CONSISTENCY:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

LINK VALIDATION:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

SUMMARY:
- Total Entities Checked: {number}
- Consistent Entities: {number}
- Inconsistent Entities: {number}
- Broken References: {number}

RECOMMENDATIONS:
- {list actionable recommendations for fixing issues}

NEXT STEPS:
- {specific actions required before progression}
```

## Usage Instructions

1. **Run Entity Relationship Validation** first
2. **Run Entity Reference Integrity Checking** second
3. **Run Entity Metadata Consistency Validation** third
4. **Run Entity Link Validation** fourth
5. **Generate Comprehensive Report** with all results
6. **Present report to user** for approval or fixes

## Integration Points

- Integrates with draft → reading progression workflow
- Uses existing entity files in reading/ directory
- Follows existing prompt-based agent architecture
- Provides detailed entity consistency feedback
