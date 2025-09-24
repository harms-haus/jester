# Approval Workflow Prompts

## Approve Agent Workflow Management

### Approval Workflow Process
"Let me guide you through the approval workflow to move your draft to the reading stage."

### Workflow Steps
"Here's the approval workflow process:

**Step 1: Draft Identification**
- Identify the draft to be approved
- Verify draft exists and is accessible
- Check draft status and completeness

**Step 2: Validation Check**
- Run comprehensive validation checks
- Verify all required files are present
- Ensure content quality meets standards

**Step 3: Approval Decision**
- Review validation results
- Make approval decision based on criteria
- Provide feedback on approval status

**Step 4: Entity File Creation**
- Extract *new* entity information from context file
- Create new individual character, location, and item files
- Extract *changed* entity information from context file
- Create patch (like git-patch) character, location, and item files
- Store entity files in reading/{NNN} - Story Title/ directories
- Use `/edit rename` task if entity names need to be changed during creation

**Step 5: File Movement**
- Move approved story, outline, context files to reading stage
- Update file metadata and status
- Maintain proper file organization

**Step 6: Cleanup and Notification**
- Clean up any temporary files
- Clean up draft stage files
- Update draft status tracking
- Notify user of approval completion"

### Workflow Status Tracking
"Tracking approval workflow progress:

**Current Step:** [Step Name]
**Progress:** [X% Complete]
**Status:** [In Progress/Completed/Failed]
**Next Action:** [Next Step Description]

**Timeline:**
- Started: [Timestamp]
- Estimated Completion: [Timestamp]
- Actual Completion: [Timestamp]"

### Workflow Error Handling
"Workflow encountered an error:

**Error Type:** [Error Description]
**Current Step:** [Step Where Error Occurred]
**Impact:** [Impact on Workflow]

**Recovery Actions:**
1. [Recovery action 1]
2. [Recovery action 2]
3. [Recovery action 3]

**User Guidance:**
- [Specific guidance for user]
- [Next steps to resolve issue]
- [Contact information if needed]"

### Workflow Completion
"🎉 Approval workflow completed successfully!

**Summary:**
- Draft successfully approved and moved to reading stage
- All validation checks passed
- Files properly organized and accessible
- Status updated and tracked

**Next Steps:**
- Draft is now reading for final review
- Entity files created from context data
- Can proceed to publish when reading
- All files accessible in reading/ directory"

### Entity File Creation Process
"Creating entity files from context data:

**Step 1: Context Analysis**
- Read context file from draft directory
- Extract newly-created entity information (characters, locations, items)
- Extract existing entities' new information (characters, locations, items)
- Parse entity metadata and relationships

**Step 2: Character File Creation**
- Create individual character files for each newly-created character in context
- Use character template format from .jester/templates/character-template.md
- Store in reading/{NNN} - Story Title/characters/ directory
- Include character descriptions, relationships, and metadata
- Create individual character patch files for each existing character in context with any new information, otherwise skip this step
- Use git-patch-like format

**Step 3: Location File Creation**
- Create individual location files for each newly-created location in context
- Use location template format from .jester/templates/location-template.md
- Store in reading/{NNN} - Story Title/locations/ directory
- Include location descriptions, atmosphere, and metadata
- Create individual location patch files for each existing location in context with any new information, otherwise skip this step
- Use git-patch-like format

**Step 4: Item File Creation**
- Create individual item files for each newly-created item in context
- Use item template format from .jester/templates/item-template.md
- Store in reading/{NNN} - Story Title/items/ directory
- Include item descriptions, purpose, and metadata
- Create individual item patch files for each existing item in context with any new information, otherwise skip this step
- Use git-patch-like format

**Step 5: Entity Validation**
- Verify all newly-created entities' files were created successfully
- Verify all existing entities' patch files were created with changed information
- Check entity and patch file formatting and completeness
- Validate entity relationships and references
- Ensure proper file naming conventions"
