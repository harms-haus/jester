# Rename Task Elicitations

## Rename Task User Interaction

### Initial Greeting
"Hello! I'm here to help you rename an entity or story title. This process will update all references across the entire system to maintain consistency. Let me guide you through this comprehensive rename process."

### Rename Type Selection
"What would you like to rename?

**Entity Rename:**
- Character (e.g., Oscar → Octavia)
- Location (e.g., Dandelion Plains → Sunflower Meadows)
- Item (e.g., Magic Shell → Enchanted Shell)

**Story Title Rename:**
- Story title (e.g., 'Oscar's Adventure' → 'Octavia's Journey')

Please specify what you'd like to rename and provide both the current name and the new name."

### Rename Confirmation
"Let me confirm the rename details:

**Rename Type:** {entity_type|story_title}
**Current Name:** {current_name}
**New Name:** {new_name}

**Rename Scope:**
- Entity files in reading/ and universe/ directories
- All [[wiki-links]] in stories
- All unlinked references and nicknames
- All related entity references
- All story title references

Is this correct? Would you like to proceed with the rename?"

### Reference Discovery
"Let me scan the system for all references to '{current_name}':

**Scanning for references:**
- Direct file references
- [[wiki-links]] in stories
- Unlinked references and nicknames
- Related entity references
- Story title references

**Found References:**
- [X] direct file references
- [Y] [[wiki-links]] in stories
- [Z] unlinked references
- [W] related entity references
- [V] story title references

**Files that will be modified:**
- [List of files that will be updated]

Would you like me to proceed with updating all these references?"

### Rename Execution
"Executing rename process:

**Step 1: File Rename**
- Renaming entity files: {old-name} → {new-name}
- Updating file metadata and timestamps

**Step 2: Reference Updates**
- Updating internal file references
- Updating [[wiki-links]] in stories
- Updating unlinked references
- Updating related entity references

**Step 3: Natural Language Flow Check**
- Reviewing story and outline files for awkward phrasing
- Checking for redundant or repetitive references
- Improving dialogue and narrative flow
- Ensuring natural language throughout

**Step 4: Validation**
- Verifying all references updated correctly
- Checking for broken links
- Validating system consistency

**Progress:** [X% Complete]"

### Rename Completion
"🎉 Rename process completed successfully!

**Summary:**
- {entity_type|story_title} renamed: {old-name} → {new-name}
- {X} files modified
- {Y} references updated
- {Z} links verified
- {V} natural language flow improvements made

**Files Modified:**
- [List of all modified files]

**Language Flow Improvements:**
- [List of specific wording improvements made]

**Next Steps:**
- Review renamed content and references
- Verify all links work correctly
- Check that dialogue and narrative flow naturally
- Continue with story development"

### Error Handling

**Rename Conflicts:**
"I found a conflict with the new name '{new_name}'. There's already a {entity_type} with that name. 

**Options:**
1. Choose a different name
2. Overwrite the existing {entity_type} (this will merge the content)
3. Cancel the rename

What would you like to do?"

**Reference Update Failures:**
"Some references couldn't be updated automatically:

**Failed Updates:**
- [List of failed reference updates]

**Manual Updates Needed:**
- [List of files that need manual updates]

Would you like me to provide specific instructions for manual updates?"

**System Consistency Issues:**
"I detected some system consistency issues after the rename:

**Issues Found:**
- [List of consistency issues]

**Repair Options:**
1. Automatic repair (recommended)
2. Manual repair with guidance
3. Skip repair (not recommended)

What would you like to do?"

### Rename Cancellation
"Rename process cancelled. No changes were made to the system.

**Current State:**
- All files remain unchanged
- All references remain intact
- System consistency maintained

**Next Steps:**
- Review rename requirements
- Consider alternative names
- Restart rename process when ready"
