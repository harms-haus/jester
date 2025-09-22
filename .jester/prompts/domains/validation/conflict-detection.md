# Conflict Detection

## Purpose
Comprehensive conflict detection prompts for identifying and resolving target directory conflicts during story progression.

## Conflict Detection Templates

### Target Directory Scanning (8.4.1)

**Prompt Template:**
```
SCAN TARGET DIRECTORY FOR CONFLICTS

You are scanning the target directory for potential conflicts before story progression.

1. **Directory Structure Check:**
   - [ ] Target directory exists: ready/
   - [ ] Required subdirectories exist: stories/, outlines/, characters/, locations/, items/
   - [ ] Directory permissions are correct
   - [ ] No locked or inaccessible files

2. **File Conflict Detection:**
   - [ ] Check for existing story file with same title
   - [ ] Check for existing outline file with same title
   - [ ] Check for existing entity files with same names
   - [ ] Check for file naming conflicts

3. **Content Conflict Detection:**
   - [ ] Check for duplicate story content
   - [ ] Check for conflicting entity definitions
   - [ ] Check for overlapping story themes
   - [ ] Check for conflicting metadata

**Scan Results:**
- Directory accessible: [YES/NO]
- File conflicts found: [YES/NO]
- Content conflicts found: [YES/NO]
- Permission issues: [YES/NO]

**Conflict Summary:**
{list all detected conflicts with file paths and descriptions}
```

### File Conflict Detection (8.4.2)

**Prompt Template:**
```
DETECT FILE CONFLICTS

You are detecting specific file conflicts in the target directory.

1. **Story File Conflicts:**
   - Check ready/stories/{title}.md exists
   - Compare file sizes and modification dates
   - Check for content differences
   - Identify conflict type (name, content, metadata)

2. **Outline File Conflicts:**
   - Check ready/outlines/{title}.md exists
   - Compare outline structures
   - Check for plot differences
   - Identify conflict type (structure, content, metadata)

3. **Entity File Conflicts:**
   - Check ready/characters/{name}.md exists
   - Check ready/locations/{name}.md exists
   - Check ready/items/{name}.md exists
   - Compare entity definitions and properties

4. **Metadata Conflicts:**
   - Check for conflicting story titles
   - Check for duplicate entity names
   - Check for conflicting metadata values
   - Check for version conflicts

**Conflict Details:**
- Story conflicts: {list with file paths}
- Outline conflicts: {list with file paths}
- Entity conflicts: {list with file paths}
- Metadata conflicts: {list with details}

**Conflict Severity:**
- CRITICAL: Will overwrite existing content
- WARNING: May cause confusion or duplication
- INFO: Minor differences detected
```

### Conflict Reporting (8.4.3)

**Prompt Template:**
```
GENERATE CONFLICT REPORT

You are generating a comprehensive conflict report for user review.

**CONFLICT DETECTION REPORT**
============================
Draft Number: {draft-number}
Target Directory: ready/
Scan Date: {timestamp}
Overall Status: {CONFLICTS_FOUND/NO_CONFLICTS}

**DIRECTORY SCAN RESULTS:**
- Target directory accessible: [YES/NO]
- Required subdirectories exist: [YES/NO]
- Permission issues: [YES/NO]
- Directory structure valid: [YES/NO]

**FILE CONFLICTS:**
- Story file conflicts: {number}
- Outline file conflicts: {number}
- Entity file conflicts: {number}
- Metadata conflicts: {number}

**DETAILED CONFLICT LIST:**
{list each conflict with:
- File path
- Conflict type
- Severity level
- Description
- Impact assessment}

**CONFLICT RESOLUTION OPTIONS:**
1. **Overwrite**: Replace existing files with new content
2. **Rename**: Create new files with different names
3. **Merge**: Combine existing and new content
4. **Skip**: Keep existing files, skip conflicting ones
5. **Cancel**: Stop progression, return to draft

**RECOMMENDATIONS:**
- {list specific recommendations for each conflict}
- {suggest best resolution strategy}
- {warn about potential data loss}

**USER ACTION REQUIRED:**
- [ ] Approve overwrite for all conflicts
- [ ] Approve rename for all conflicts
- [ ] Approve merge for all conflicts
- [ ] Approve skip for all conflicts
- [ ] Review each conflict individually
- [ ] Cancel progression
```

### Conflict Resolution (8.4.4)

**Prompt Template:**
```
RESOLVE CONFLICTS

You are resolving detected conflicts based on user approval.

1. **Overwrite Resolution:**
   - Backup existing files to conflict-backup/
   - Replace existing files with new content
   - Update file timestamps
   - Log overwrite actions

2. **Rename Resolution:**
   - Generate unique names for conflicting files
   - Update all references to renamed files
   - Create new files with unique names
   - Log rename actions

3. **Merge Resolution:**
   - Compare existing and new content
   - Identify mergeable sections
   - Combine content where possible
   - Flag unresolvable conflicts for user review

4. **Skip Resolution:**
   - Keep existing files unchanged
   - Skip creation of conflicting files
   - Log skipped files
   - Continue with non-conflicting files

**Resolution Status:**
- Conflicts resolved: {number}
- Conflicts remaining: {number}
- Resolution method: {overwrite/rename/merge/skip}
- Backup created: [YES/NO]

**Resolution Log:**
{list each resolution action with:
- File path
- Action taken
- Result status
- Notes}

**Next Steps:**
- If all conflicts resolved: Proceed with progression
- If conflicts remain: Request additional user input
- If resolution failed: Return to conflict detection
```

## Conflict Prevention

### Pre-Progression Checks

**Prompt Template:**
```
PRE-PROGRESSION CONFLICT PREVENTION

You are performing pre-progression checks to prevent conflicts.

1. **Name Uniqueness Check:**
   - Verify story title is unique
   - Check entity names are unique
   - Validate file names are unique
   - Suggest alternatives for duplicates

2. **Content Uniqueness Check:**
   - Compare story content with existing stories
   - Check for duplicate plot elements
   - Validate entity definitions are unique
   - Identify potential content conflicts

3. **Metadata Validation:**
   - Check for conflicting metadata values
   - Validate unique identifiers
   - Ensure consistent naming conventions
   - Verify no duplicate references

**Prevention Results:**
- Name conflicts prevented: [YES/NO]
- Content conflicts prevented: [YES/NO]
- Metadata conflicts prevented: [YES/NO]
- Ready for progression: [YES/NO]

**Prevention Actions:**
{list actions taken to prevent conflicts}
```

## Integration Points

- Integrates with draft-to-ready-validation.md
- Uses existing workflow-management.md commands
- Follows existing prompt-based agent architecture
- Provides comprehensive conflict management

## Usage Instructions

1. **Scan**: Run target directory scanning
2. **Detect**: Run file conflict detection
3. **Report**: Generate comprehensive conflict report
4. **Resolve**: Execute conflict resolution based on user approval
5. **Prevent**: Run pre-progression checks for future conflicts
