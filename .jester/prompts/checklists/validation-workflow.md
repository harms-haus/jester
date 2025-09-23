# Validation Workflow

## Purpose
Comprehensive workflow prompt for executing story progression validation systematically.

## Workflow Steps

### Step 1: Pre-Validation Setup

**Prompt Template:**
```
VALIDATION WORKFLOW SETUP

You are setting up validation for draft story progression.

1. **Initialize Validation:**
   - Load draft files: context-{number}.md, outline-{number}.md, story-{number}.md
   - Load validation checklist template
   - Set validation timestamp
   - Initialize error tracking

2. **Environment Check:**
   - Verify ready/ directory exists
   - Check entity files in ready/ directory
   - Confirm target directory structure
   - Validate file permissions

3. **Validation Context:**
   - Draft number: {draft-number}
   - Target progression: draft → ready
   - Validation scope: content, entities, quality
   - User approval required: {yes/no}

**Status:**
- Setup complete: [PASS/FAIL]
- Ready for validation: [YES/NO]
- Issues found: {list any setup issues}
```

### Step 2: Content Validation Execution

**Prompt Template:**
```
EXECUTE CONTENT VALIDATION

You are executing content validation for draft progression.

1. **File Existence Validation:**
   - Check context-{number}.md exists and is readable
   - Check outline-{number}.md exists and is readable
   - Check story-{number}.md exists and is readable
   - Update checklist with results

2. **Content Quality Validation:**
   - Validate YAML structure in context file
   - Check required fields are present
   - Verify outline has structured plot points
   - Confirm story has complete narrative
   - Update checklist with results

3. **Metadata Validation:**
   - Verify target length is specified
   - Check audience age is appropriate
   - Validate story title is descriptive
   - Confirm all metadata is present
   - Update checklist with results

**Results:**
- Content validation: [PASS/FAIL/WARN]
- Issues found: {list specific issues}
- Recommendations: {list recommendations}
```

### Step 3: Entity Validation Execution

**Prompt Template:**
```
EXECUTE ENTITY VALIDATION

You are executing entity validation for draft progression.

1. **Entity Reference Validation:**
   - Check all [[entity-name]] links are valid
   - Verify entity files exist in ready/ directory
   - Validate wiki-link syntax is correct
   - Check entity names are consistent
   - Update checklist with results

2. **Entity Consistency Validation:**
   - Verify character names match across files
   - Check location names are consistent
   - Validate item references are accurate
   - Confirm entity relationships are logical
   - Update checklist with results

3. **Entity File Validation:**
   - Check referenced entities exist
   - Verify entity files are properly formatted
   - Validate entity metadata is complete
   - Confirm entity relationships are valid
   - Update checklist with results

**Results:**
- Entity validation: [PASS/FAIL/WARN]
- Issues found: {list specific issues}
- Recommendations: {list recommendations}
```

### Step 4: Quality Validation Execution

**Prompt Template:**
```
EXECUTE QUALITY VALIDATION

You are executing quality validation for draft progression.

1. **Narrative Quality Validation:**
   - Check story has clear structure
   - Verify plot progression is logical
   - Validate character development is consistent
   - Check dialogue is appropriate
   - Verify story length matches target
   - Update checklist with results

2. **Content Appropriateness Validation:**
   - Check language is age-appropriate
   - Verify themes are suitable
   - Validate no inappropriate content
   - Confirm positive tone throughout
   - Update checklist with results

3. **Technical Quality Validation:**
   - Check for spelling and grammar errors
   - Verify consistent formatting
   - Validate proper paragraph structure
   - Check clear sentence structure
   - Update checklist with results

**Results:**
- Quality validation: [PASS/FAIL/WARN]
- Issues found: {list specific issues}
- Recommendations: {list recommendations}
```

### Step 5: Validation Summary and Reporting

**Prompt Template:**
```
GENERATE VALIDATION SUMMARY

You are generating a comprehensive validation summary.

1. **Calculate Summary Statistics:**
   - Count total checks performed
   - Count passed checks
   - Count failed checks
   - Count warning checks
   - Determine overall status

2. **Categorize Issues:**
   - List critical issues (blocking progression)
   - List warning issues (user review recommended)
   - List informational issues (suggestions)
   - Prioritize by severity

3. **Generate Recommendations:**
   - List specific actions to fix critical issues
   - Suggest improvements for warning issues
   - Provide general recommendations
   - Estimate effort required for fixes

4. **Determine Progression Status:**
   - If all critical issues resolved: READY
   - If critical issues remain: NOT READY
   - If only warnings: USER APPROVAL REQUIRED
   - If mixed status: REVIEW REQUIRED

**Final Status:**
- Overall validation: [PASS/FAIL/WARN]
- Ready for progression: [YES/NO]
- User approval required: [YES/NO]
- Next steps: {list specific next steps}
```

### Step 6: User Approval Workflow

**Prompt Template:**
```
REQUEST USER APPROVAL

You are requesting user approval for draft progression.

**Validation Summary:**
- Draft number: {draft-number}
- Overall status: {PASS/FAIL/WARN}
- Critical issues: {number}
- Warning issues: {number}
- Ready for progression: {YES/NO}

**Issues Requiring Attention:**
{list critical and warning issues}

**Recommendations:**
{list specific recommendations}

**User Decision Required:**
- [ ] Approve progression despite warnings
- [ ] Request fixes before progression
- [ ] Cancel progression
- [ ] Request additional validation

**Next Steps:**
- If approved: Proceed with draft → ready progression
- If fixes requested: Return to draft for corrections
- If cancelled: Stop progression workflow
- If additional validation: Run specific validations
```

## Workflow Integration

### Command Integration
- Integrates with `/edit approve-draft {draft-number}` command
- Uses existing workflow-management.md prompts
- Follows existing prompt-based agent architecture

### Template Integration
- Uses draft-to-ready-validation-checklist.yaml
- Integrates with entity-consistency-validation.md
- Follows existing YAML template structure

### Error Handling
- Graceful handling of validation failures
- Clear error reporting and recovery
- User-friendly error messages
- Rollback capabilities for failed validations

## Usage Instructions

1. **Initialize**: Run validation workflow setup
2. **Execute**: Run each validation step systematically
3. **Summarize**: Generate comprehensive validation summary
4. **Approve**: Request user approval for progression
5. **Proceed**: Continue with approved progression or handle issues
