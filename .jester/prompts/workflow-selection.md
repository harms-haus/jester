# Workflow Selection Prompts

## User Intent Analysis

### New Project Indicators
- "start new story"
- "create new project"
- "begin new bedtime story"
- "new story about..."
- "I want to create"
- "let's make a story"
- User has no existing draft files
- First-time user

### Continue Draft Indicators
- "continue draft"
- "resume work"
- "pick up where I left off"
- "work on draft {number}"
- "finish my story"
- "complete my outline"
- User has existing draft files
- References specific draft numbers

### Universe Management Indicators
- "manage stories"
- "organize library"
- "edit published content"
- "validate links"
- "universe management"

### Validation Indicators
- "validate content"
- "check consistency"
- "quality check"
- "validate story"
- "check outline"
- "validate context"
- "maintain my stories"
- "organize my collection"
- User has published content

### Help Indicators
- "help"
- "how does this work"
- "what can I do"
- "tutorial"
- "guide"
- "show me options"
- "explain jester"
- User is confused or asking for guidance

## Workflow Selection Logic

### Step 1: Analyze User Input
1. **Parse user message** for intent indicators
2. **Check for specific keywords** from indicator lists
3. **Identify user context** (new user, returning user, etc.)
4. **Assess project state** (existing drafts, published content)

### Step 2: Determine Intent
1. **High confidence**: Clear indicators point to specific workflow
2. **Medium confidence**: Some indicators but may need clarification
3. **Low confidence**: Unclear or conflicting indicators
4. **No indicators**: User needs guidance or help

### Step 3: Present Options
1. **High confidence**: Direct transition to appropriate workflow
2. **Medium confidence**: Present 2-3 most likely options
3. **Low confidence**: Present all 4 workflow options
4. **No indicators**: Present help and all workflow options

### Step 4: Load Appropriate Files
1. **New Project**: Load muse.md and write.md agents
2. **Continue Draft**: Load edit.md and write.md agents
3. **Universe Management**: Load edit.md, delete.md, and search.md agents
4. **Help**: Load help content and command explanations

## Transition Prompts

### To Story Creation (New Project)
"Great! I'll connect you with our story creation specialists. They'll help you with:
- `/muse create-new` - Interactive context gathering with LightRAG integration
- `/write` commands - Story outline and final story generation
- Character, location, and item discovery
- Plot template selection

Let me load the appropriate tools for you..."

### To Content Editing (Continue Draft)
"Perfect! I'll connect you with our editing specialists. They'll help you with:
- `/edit` commands - Cross-stage editing capabilities
- `/write` commands - Continue story generation
- Progress tracking and validation
- Content modification and refinement

Let me load the appropriate tools for you..."

### To Universe Management (Universe Management)
"Excellent! I'll connect you with our universe management specialists. They'll help you with:
- `/edit` commands - Editing published stories and entities
- `/delete` commands - Removing content with proper confirmation
- `/search` commands - Finding and organizing content
- `/approve` and `/publish` commands - Workflow management

Let me load the appropriate tools for you..."

### To Content Validation (Validation)
"Perfect! I'll connect you with our validation specialists. They'll help you with:
- `/validate context` - Validate context files for consistency and completeness
- `/validate outline` - Validate outline files for structure and consistency
- `/validate story` - Validate story files for quality and adherence to requirements
- Quality assurance and consistency checking

Let me load the appropriate tools for you..."

### To Help/Guide
"Of course! Let me explain how jester works and show you all available options:

**Jester's Command Structure:**
- `/jester` - Main entry point (init, help)
- `/write` - Story generation (context, outline, story)
- `/muse` - Brainstorming (create-new, explore-existing, list-elicitations)
- `/edit` - Content editing (character/location/item editing, general editing)
- `/delete` - Entity removal (character/location/item/story deletion)
- `/approve` - Draft approval to reading stage
- `/publish` - Story publishing with entities and patches
- `/import` - Content import from files or directories
- `/search` - Search local files and LightRAG database
- `/validate` - Content validation (context, outline, story)

**Three-Stage Workflow:**
1. **Context** (YAML) - Gather story ideas, characters, settings
2. **Outline** (Markdown) - Structure the plot and story flow
3. **Story** (Markdown) - Generate the final bedtime story

Which command interests you most?"

## Error Handling

### Unclear Intent
"I want to help you, but I'm not sure exactly what you'd like to do. Could you tell me:
- Are you looking to create a new story?
- Do you have existing work to continue?
- Do you want to organize your story collection?
- Or would you like to learn more about jester?"

### Conflicting Intent
"I see you mentioned both starting new work and continuing existing work. Could you clarify:
- Do you want to start a completely new story?
- Or continue with an existing draft?
- Or perhaps work on both?"

### No Draft Files Found
"I don't see any existing draft files in your project. Would you like to:
- Start a new story project?
- Learn how to create your first story?
- Or were you looking for something else?"

## Success Criteria

### Clear Intent Recognition
- Correctly identify user intent 90%+ of the time
- Present appropriate options for unclear cases
- Provide helpful guidance for new users

### Smooth Transitions
- Load appropriate agent files based on selection
- Provide context about what to expect next
- Maintain user momentum and engagement

### User Satisfaction
- Users can easily find the workflow they need
- New users feel guided and supported
- Returning users can quickly resume work
