# Draft to Ready Progression Validation

## Purpose
Comprehensive validation prompts for ensuring draft content is complete and ready for progression to the ready stage.

## Validation Checklist

### Content Completeness Validation (8.1.1)

**Prompt Template:**
```
VALIDATE DRAFT COMPLETENESS

You are validating a draft story for progression to ready stage. Check the following:

1. **File Existence Check:**
   - [ ] context-{number}.md exists and is readable
   - [ ] outline-{number}.md exists and is readable  
   - [ ] story-{number}.md exists and is readable

2. **Content Quality Check:**
   - [ ] Context file contains valid YAML structure
   - [ ] Context file has required fields: title, target_length, audience, entities
   - [ ] Outline file contains structured plot points
   - [ ] Story file contains complete narrative content
   - [ ] All files have meaningful content (not just placeholders)

3. **Metadata Validation:**
   - [ ] Target length is specified and reasonable
   - [ ] Audience age range is appropriate
   - [ ] Story title is descriptive and unique
   - [ ] All required metadata fields are present

**Validation Result:**
- PASS: All checks pass, ready for progression
- FAIL: Issues found, list specific problems
- WARN: Minor issues, user approval required

**Error Reporting:**
List any failed checks with specific file names and line numbers where possible.
```

### Entity Reference Validation (8.1.2)

**Prompt Template:**
```
VALIDATE ENTITY REFERENCES

You are validating entity references in draft files for progression to ready stage.

1. **Entity Reference Check:**
   - [ ] All [[entity-name]] links in story files reference existing entities
   - [ ] Entity references use correct wiki-link syntax
   - [ ] No broken or malformed entity links
   - [ ] Entity names are consistent across all files

2. **Entity Consistency Check:**
   - [ ] Character names match between context and story
   - [ ] Location names are consistent
   - [ ] Item references are accurate
   - [ ] Entity relationships are logical

3. **Entity File Validation:**
   - [ ] Referenced entities exist in ready/ directory
   - [ ] Entity files are properly formatted
   - [ ] Entity metadata is complete

**Validation Result:**
- PASS: All entity references are valid
- FAIL: Broken references found, list specific issues
- WARN: Inconsistent references, user review recommended

**Error Reporting:**
List broken references with file locations and suggest corrections.
```

### Story Quality Validation (8.1.3)

**Prompt Template:**
```
VALIDATE STORY QUALITY

You are validating story quality for progression to ready stage.

1. **Narrative Quality Check:**
   - [ ] Story has clear beginning, middle, and end
   - [ ] Plot progression is logical and engaging
   - [ ] Character development is consistent
   - [ ] Dialogue is appropriate for target audience
   - [ ] Story length matches target length (within 10% tolerance)

2. **Content Appropriateness:**
   - [ ] Language is appropriate for target age
   - [ ] Themes are suitable for bedtime story
   - [ ] No inappropriate content or themes
   - [ ] Story maintains positive tone

3. **Technical Quality:**
   - [ ] No spelling or grammar errors
   - [ ] Consistent formatting throughout
   - [ ] Proper paragraph structure
   - [ ] Clear sentence structure

**Validation Result:**
- PASS: Story meets quality standards
- FAIL: Quality issues found, list specific problems
- WARN: Minor quality concerns, user review recommended

**Error Reporting:**
List quality issues with specific examples and suggestions for improvement.
```

### Validation Error Reporting (8.1.4)

**Prompt Template:**
```
VALIDATION ERROR REPORTING

You are creating a comprehensive validation error report for draft progression.

**Report Format:**
```
DRAFT VALIDATION REPORT
=======================
Draft Number: {draft-number}
Validation Date: {timestamp}
Overall Status: {PASS/FAIL/WARN}

SUMMARY:
- Total Checks: {number}
- Passed: {number}
- Failed: {number}
- Warnings: {number}

DETAILED RESULTS:
================

CONTENT COMPLETENESS:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

ENTITY REFERENCES:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

STORY QUALITY:
- Status: {PASS/FAIL/WARN}
- Issues: {list specific issues or "None"}

RECOMMENDATIONS:
- {list actionable recommendations}

NEXT STEPS:
- {specific actions required before progression}
```

**Error Severity Levels:**
- CRITICAL: Must be fixed before progression
- WARNING: Should be addressed but not blocking
- INFO: Suggestions for improvement

**User Action Required:**
- If FAIL: User must address critical issues
- If WARN: User should review and approve
- If PASS: Ready for progression
```

## Usage Instructions

1. **Run Content Completeness Validation** first
2. **Run Entity Reference Validation** second
3. **Run Story Quality Validation** third
4. **Generate Validation Error Report** with all results
5. **Present report to user** for approval or fixes

## Integration Points

- Integrates with `/edit approve-draft {draft-number}` command
- Uses existing entity files in ready/ directory
- Follows existing prompt-based agent architecture
- Provides clear user feedback and approval workflows
