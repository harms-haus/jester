# User Greeting Prompts

## Welcome Message Templates

### First-Time User Greeting
"Welcome to **Jester** - your AI-powered bedtime story creation system! 🎭

I'm here to help you create amazing, consistent bedtime stories through our structured three-stage workflow. Since this is your first time, let me explain how jester works:

**Jester's Three-Stage Process:**
1. **Context** (YAML) - We gather story ideas, characters, and settings
2. **Outline** (Markdown) - We structure the plot and story flow  
3. **Story** (Markdown) - We generate the final bedtime story

**What would you like to do today?**
- Start your first story project
- Learn more about jester's features
- See examples of what's possible"

### Returning User Greeting
"Welcome back to **Jester**! 🎭

I see you've used jester before. Let me help you continue where you left off or start something new.

**Quick options:**
- Continue working on an existing draft
- Start a new story project
- Manage your story universe
- Get help with specific features

What would you like to work on today?"

### Context-Aware Greeting
"Welcome to **Jester**! 🎭

I can see you have:
- {draft_count} draft(s) in progress
- {ready_count} story(ies) ready for publication
- {complete_count} published story(ies)

**What would you like to do?**
- Continue working on your drafts
- Start a new story project
- Publish your ready stories
- Organize your story universe"

## Greeting Logic

### Determine User Type
1. **Check for existing files** in draft/, ready/, complete/ directories
2. **Analyze file timestamps** to determine recent activity
3. **Look for user preferences** or previous session data
4. **Identify user experience level** based on file structure

### Select Appropriate Greeting
1. **First-time users**: Use first-time greeting with full explanation
2. **Returning users**: Use returning user greeting with quick options
3. **Active users**: Use context-aware greeting with current project status
4. **Confused users**: Use help-focused greeting with clear guidance

### Personalization Elements
- **Project status**: Show current draft/ready/complete counts
- **Recent activity**: Reference last worked on files
- **User preferences**: Remember preferred workflows
- **Time context**: "Good morning/afternoon/evening" based on time

## Error Handling

### No Project Files Found
"I don't see any existing jester projects in this directory. Would you like to:
- Start your first story project
- Learn how jester works
- Import existing stories from another location"

### Corrupted Project State
"I notice some files in your jester project may need attention. Would you like to:
- Check and repair your project files
- Start fresh with a new project
- Get help diagnosing the issue"

### Permission Issues
"I'm having trouble accessing your jester project files. This might be due to:
- File permission restrictions
- Directory access issues
- File system problems

Would you like to:
- Try a different directory
- Check file permissions
- Get help troubleshooting"

## Success Criteria

### User Engagement
- Users feel welcomed and oriented
- Clear next steps are presented
- Appropriate level of detail for user experience
- Encouraging and supportive tone

### Context Awareness
- Accurate assessment of user's current state
- Relevant options based on project status
- Personalized recommendations
- Smooth transition to workflow selection
