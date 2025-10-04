

# Project Initialization Prompts

## New Project Setup

### Project Discovery
"Let me help you set up a new story project! First, I need to understand what kind of story you'd like to create.

**Tell me about your story:**
- What's the main character like?
- Where does the story take place?
- What's the central theme or moral?
- Who is your target audience (age range)?

**Or, if you prefer, I can:**
- Suggest some story ideas based on popular themes
- Help you choose from our plot templates
- Start with a character you already have in your universe"

### Project Requirements Gathering
"Great! Let me gather some details to create the perfect story for you:

**Story Details:**
- **Title**: What would you like to call this story?
- **Target Length**: How long should the story be? (5-10 minutes, 10-15 minutes, 15-20 minutes)
- **Audience Age**: What age group is this for?
- **Theme/Moral**: What lesson or message should the story convey?

**Character Preferences:**
- **Main Character**: Who is the protagonist?
- **Supporting Characters**: Any specific characters you want to include?
- **Character Sources**: Should I use existing characters from your universe or create new ones?

**Setting Preferences:**
- **Location**: Where should the story take place?
- **Time Period**: Modern day, fantasy, historical, etc.?
- **Mood**: Adventurous, cozy, mysterious, educational, etc.?"

### Project Structure Creation
"Perfect! I'll now create your project structure:

**Creating project files:**
- Setting up context file with your requirements
- Initializing character and location references
- Preparing plot template structure
- Setting up metadata and tracking

**Project ID**: {draft_number}
**Files Created**:
- `draft/{draft_number}/{story-title}-context.yaml` - Your story context and requirements
- `draft/{draft_number}/{story-title}-outline.md` - Will be created when you're ready
- `draft/{draft_number}/{story-title}-story.md` - Will be created when you're ready

**Next Steps:**
1. Review and edit your context file
2. Use `/write outline` when reading to create the story structure
3. Use `/write story` when reading to generate the final story"

## Draft Continuation

### Draft Discovery
"I can see you have existing draft work! Let me show you what's available:

**Your Current Drafts:**
{draft_list}

**Which draft would you like to continue working on?**
- Select a draft number to resume work
- Create a new draft if you want to start fresh
- Get help choosing the right draft"

### Draft Status Assessment
"Let me check the status of draft {draft_number}:

**Current Status:**
- **Context**: {context_status} - {context_description}
- **Outline**: {outline_status} - {outline_description}  
- **Story**: {story_status} - {story_description}

**What would you like to do?**
- Continue with the next stage
- Edit existing content
- Review and refine what you have
- Start over with this draft"

### Draft Progression Guidance
"Based on your current progress, here are your next steps:

**If you have context but no outline:**
- Use `/write outline` to create the story structure
- Use `/edit` to edit the context file if you want to make changes first

**If you have outline but no story:**
- Use `/write story` to generate the final bedtime story
- Use `/edit` to edit the outline if you want to adjust the plot first

**If you have a complete story:**
- Review the story for any final edits
- Use `/approve` to move to reading stage
- Use `/edit` to continue editing if you want to make changes"

## Universe Management

### Universe Overview
"Let me show you the current state of your story universe:

**Published Stories**: {universe_count}
**Reading for Publication**: {reading_count}
**Drafts in Progress**: {draft_count}

**What would you like to manage?**
- **Stories**: Use `/edit` to edit, `/publish` to publish stories
- **Characters**: Use `/edit character` to manage character files and relationships
- **Locations**: Use `/edit location` to update location descriptions and connections
- **Items**: Use `/edit item` to organize item files and properties
- **Search**: Use `/search` to find and organize content"

### Universe Maintenance
"Here are some maintenance tasks I can help you with:

**Content Management:**
- Use `/edit` to edit published stories and entities
- Use `/edit character|location|item` to update relationships
- Use `/search` to find and organize content
- Use `/delete` to remove unwanted content

**Quality Assurance:**
- Use `/search` to validate story consistency
- Use `/edit` to check entity file integrity
- Use `/approve` and `/publish` for workflow management
- Use `/search` to review relationships

**Organization:**
- Use `/search` to categorize stories by theme or character
- Use `/import` to add new content
- Use `/search` to find content easily
- Use `/delete` to archive old or unused content"

## Error Handling

### Project Creation Errors
"I encountered an issue creating your project. This might be due to:
- Invalid draft number format
- File permission issues
- Directory access problems

**Let me help you resolve this:**
- Try a different draft number
- Check file permissions
- Use a different directory
- Get technical support"

### Draft Access Errors
"I'm having trouble accessing draft {draft_number}. This could be because:
- The draft doesn't exist
- File corruption
- Permission issues

**Options:**
- List all available drafts
- Create a new draft
- Check file integrity
- Get help troubleshooting"

### Universe Access Errors
"I can't access your universe files. This might be due to:
- Missing directory structure
- File permission issues
- Corrupted project state

**Let me help:**
- Check project structure
- Repair missing files
- Recreate directory structure
- Get technical support"

## Success Criteria

### Project Creation
- Clear requirements gathering process
- Proper project structure initialization
- User understands next steps
- All files created successfully

### Draft Continuation
- Accurate status assessment
- Clear progression guidance
- Easy access to existing work
- Smooth workflow transitions

### Universe Management
- Comprehensive universe overview
- Clear maintenance options
- Easy access to all content
- Effective organization tools
