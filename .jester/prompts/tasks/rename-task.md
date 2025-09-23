# Rename Task

## Comprehensive Rename Process

### Rename Task Overview
"Let me help you rename an entity or story title. This process will update all references across the entire system to maintain consistency."

### Rename Types
**Entity Rename (Character/Location/Item):**
- Rename entity files in reading/ and universe/ directories
- Update all internal references within entity files
- Update all back-references to the entity
- Update all [[wiki-links]] in stories that reference the entity
- Update unlinked references and nickname references
- Update related entity references (habitations, containers, neighbors)

**Story Title Rename:**
- Rename context, outline, and story files
- Update all references to the story in entity files
- Update story metadata and cross-references

### Rename Process Steps

**Step 1: Rename Analysis**
- Identify the current name and new name
- Determine rename type (entity or story title)
- Scan for all references across the system
- Create comprehensive rename plan

**Step 2: Reference Discovery**
- Search for direct file references
- Search for [[wiki-links]] in stories
- Search for unlinked references and nicknames
- Search for related entity references
- Search for story title references

**Step 3: File Rename Execution**
- Rename entity files in reading/ and universe/
- Rename story files (context, outline, story)
- Update file metadata and timestamps

**Step 4: Content Update Execution**
- Update internal references within renamed files
- Update all [[wiki-links]] in stories
- Update unlinked references and nicknames
- Update related entity references
- Update story title references in entity files

**Step 5: Natural Language Flow Check**
- Review story and outline files for awkward phrasing
- Check for redundant or repetitive references (e.g., "Oscar went to Oscar's Tide Pool")
- Identify dialogue that sounds unnatural after rename
- Suggest and implement wording improvements for better flow
- Ensure narrative reads naturally and smoothly

**Step 6: Validation and Cleanup**
- Verify all references were updated correctly
- Check for broken links or references
- Validate file integrity
- Clean up any temporary files

### Entity Rename Scenarios

**Character Rename:**
- Rename character file: `{old-name}.md` → `{new-name}.md`
- Update character's own description and metadata
- Update all stories that reference the character
- Update location references (e.g., "Oscar's Tide Pool" → "Octavia's Tide Pool")
- Update item references (e.g., "Oscar's Shell" → "Octavia's Shell")
- Update other character references to this character

**Location Rename:**
- Rename location file: `{old-name}.md` → `{new-name}.md`
- Update location's own description and metadata
- Update all stories that reference the location
- Update character references to this location
- Update neighboring location references
- Update item references to this location

**Item Rename:**
- Rename item file: `{old-name}.md` → `{new-name}.md`
- Update item's own description and metadata
- Update all stories that reference the item
- Update character references to this item
- Update location references to this item
- Update container references

### Story Title Rename Scenarios

**Story Title Rename:**
- Rename context file: `{old-title}-context.yaml` → `{new-title}-context.yaml`
- Rename outline file: `{old-title}-outline.md` → `{new-title}-outline.md`
- Rename story file: `{old-title}-story.md` → `{new-title}-story.md`
- Update story references in character entity files
- Update story references in location entity files
- Update story references in item entity files
- Update story metadata and cross-references

### Reference Types to Update

**Direct References:**
- Entity file names in reading/ and universe/
- Story file names in draft/ and reading/
- Internal file references and metadata

**Wiki-Link References:**
- [[entity-name]] links in stories
- [[story-title]] links in entity files
- Cross-references between entities

**Unlinked References:**
- Character names mentioned in stories without [[links]]
- Location names mentioned in stories without [[links]]
- Item names mentioned in stories without [[links]]
- Story titles mentioned in entity files

**Nickname References:**
- Shortened versions of names
- Alternative names or titles
- Descriptive references

**Related Entity References:**
- Character habitation references (e.g., "Oscar's Tide Pool")
- Item container references (e.g., "Oscar's Shell")
- Location neighbor references
- Character relationship references

### Natural Language Flow Guidelines

**Awkward Phrasing Examples:**
- "Oscar went to Oscar's Tide Pool" → "Oscar went to his tide pool" or "Oscar went to the tide pool"
- "Stella found Stella's Shell" → "Stella found her shell" or "Stella found the shell"
- "The Magic Forest was in the Magic Forest" → "The forest was magical" or "The enchanted woods"

**Dialogue Flow Improvements:**
- "Oscar said, 'I love Oscar's Tide Pool'" → "Oscar said, 'I love my tide pool'" or "Oscar said, 'I love this place'"
- "Stella thought about Stella's Shell" → "Stella thought about her shell" or "Stella thought about the shell"

**Narrative Flow Improvements:**
- "Oscar walked to Oscar's Tide Pool where Oscar lived" → "Oscar walked to his tide pool where he lived"
- "The Magic Shell was in the Magic Shell's container" → "The shell was in its special container"

**Wording Strategies:**
- Use possessive pronouns (his, her, its) when appropriate
- Use definite articles (the) for locations and items
- Use descriptive phrases instead of repetitive names
- Vary sentence structure to avoid redundancy
- Maintain character voice and narrative style

### Rename Validation

**Pre-Rename Validation:**
- Verify old name exists and is accessible
- Check for naming conflicts with new name
- Validate new name format and conventions
- Confirm rename scope and impact

**Post-Rename Validation:**
- Verify all files were renamed correctly
- Check all references were updated
- Validate no broken links remain
- Confirm system consistency
- Review natural language flow in stories and outlines
- Check for awkward phrasing or redundant references
- Ensure dialogue sounds natural and smooth

### Error Handling

**Rename Conflicts:**
- Check for existing files with new name
- Suggest alternative names if conflict exists
- Provide conflict resolution options

**Reference Update Failures:**
- Identify failed reference updates
- Provide manual update instructions
- Offer retry options for failed updates

**System Consistency Issues:**
- Detect broken links or references
- Provide repair suggestions
- Offer system integrity checks

### Rename Success Confirmation

**Entity Rename Success:**
"✅ Entity rename completed successfully!

**Summary:**
- Entity file renamed: {old-name} → {new-name}
- {X} direct references updated
- {Y} [[wiki-links]] updated
- {Z} unlinked references updated
- {W} related entity references updated
- {V} natural language flow improvements made

**Files Modified:**
- [List of all modified files]

**Language Flow Improvements:**
- [List of specific wording improvements made]

**Next Steps:**
- Review renamed entity and references
- Verify all links work correctly
- Check that dialogue and narrative flow naturally
- Continue with story development"

**Story Title Rename Success:**
"✅ Story title rename completed successfully!

**Summary:**
- Story files renamed: {old-title} → {new-title}
- {X} entity file references updated
- {Y} story metadata updated
- {Z} cross-references updated
- {V} natural language flow improvements made

**Files Modified:**
- [List of all modified files]

**Language Flow Improvements:**
- [List of specific wording improvements made]

**Next Steps:**
- Review renamed story and references
- Verify all links work correctly
- Check that dialogue and narrative flow naturally
- Continue with story development"
