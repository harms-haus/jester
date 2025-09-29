# Context Generation

## Muse Agent Context Generation

### Initial Greeting
"Hello! I'm the Muse agent, your creative storytelling partner. I'm excited to help you create a rich, detailed story context for your bedtime story. Let's start by exploring your story idea and building a world that will captivate your child's imagination."

### Information Gathering Prompts

**Story Concept:**
"What's the core story idea you'd like to explore? Tell me about the adventure, characters, or themes you have in mind."

**Target Audience:**
"What age is your child? This helps me tailor the story's complexity, themes, and language appropriately."

**Target Audience Members:**
"Do you have any saved target audience member profiles? I can use their preferences to automatically calculate the perfect age range and story length for your story. Use '/jester audience list' to see available profiles, or '/jester audience select [name1] [name2]' to choose active members."

**Story Length:**
"How long would you like the story to be? I can create stories ranging from short bedtime tales (200-500 words) to longer adventures (1000+ words)."

**Plot Template:**
"Which story structure appeals to you?
- Hero's Journey: Classic adventure with challenges and growth
- Pixar Method: Emotional story with clear character arc
- Golden Circle: Simple three-act structure"

**Character Preferences:**
"Do you have any existing characters from your story universe, or would you like me to suggest new ones? I can also help you develop character relationships and backstories."

**Setting Preferences:**
"What kind of world should this story take place in? A magical forest, a cozy home, a distant planet, or something else entirely?"

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for context generation."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Story requirements**: Concept, target audience, length, preferences
  - **Plot templates**: Available story structure templates
  - **Character templates**: Character development templates
  - **Location templates**: Setting development templates

### 1. Story Requirements Gathering

- **Concept collection**: Collect story concept and theme
- **Audience analysis**: Analyze target audience and age requirements
- **Length determination**: Determine appropriate story length
- **Preference collection**: Collect user preferences and requirements
- **Template selection**: Select appropriate plot template

### 2. Plot Template Selection

- **Template analysis**: Analyze available plot templates
- **Template selection**: Choose appropriate story structure
- **Structure planning**: Plan story structure according to template
- **Plot point definition**: Define key plot points
- **Theme integration**: Integrate moral lessons and educational elements

### 3. Character Profile Creation

- **Main character development**: Develop detailed main character profile
- **Supporting character creation**: Create supporting character profiles
- **Relationship establishment**: Establish character relationships
- **Character arc planning**: Plan character development throughout story
- **Personality definition**: Define character personalities and traits

### 4. Setting Establishment

- **Location creation**: Create rich, immersive locations
- **Setting details**: Develop detailed setting descriptions
- **Atmosphere creation**: Create appropriate atmosphere and mood
- **Connection establishment**: Establish connections between locations
- **Sensory details**: Include sensory details for immersion

### 5. Plot Structure Development

- **Plot point organization**: Organize story according to chosen template
- **Scene planning**: Plan individual scenes and transitions
- **Pacing establishment**: Establish appropriate pacing
- **Conflict development**: Develop conflicts and resolutions
- **Theme integration**: Weave themes throughout plot

### 6. Content Validation

- **Age appropriateness**: Ensure content is appropriate for target audience
- **Story coherence**: Verify story coherence and logical flow
- **Character consistency**: Ensure character consistency
- **Setting consistency**: Ensure setting consistency
- **Theme integration**: Verify theme integration

### 7. Context File Creation

- **File structure**: Create context file with proper structure from template: `./.jester/templates/context.yaml`
- **Metadata inclusion**: Include necessary metadata:
  - **Status**: Status must be set to "DRAFT" on first creation
- **File saving**: Save context file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verification**: Verify file creation and content
- **File name**: Name the file `context-NNN.yaml`

### 8. Generate Context Report

Provide a structured context generation report including:

#### Context Summary
- Story concept and theme
- Target audience and length
- Plot template selected
- Character count and types
- Setting details

#### Character Development
- Main character profile
- Supporting character profiles
- Character relationships
- Character arcs planned
- Personality traits defined

#### Setting Development
- Locations created
- Setting details developed
- Atmosphere established
- Location connections
- Sensory details included

#### Plot Structure
- Plot template used
- Plot points defined
- Scene structure planned
- Pacing established
- Theme integration

#### Validation Results
- Age appropriateness check
- Story coherence validation
- Character consistency check
- Setting consistency check
- Theme integration verification

#### Final Assessment
- **SUCCESS**: Context generated successfully
- **PARTIAL**: Context generated with minor issues
- **FAILED**: Context generation failed, manual intervention required
- **Ready for Outline**: Context ready for outline generation

### Error Handling Prompts

**Missing Story Concept:**
"I need more information about your story idea. Could you tell me more about the adventure, characters, or themes you have in mind?"

**Incomplete Requirements:**
"The story requirements appear to be incomplete. I can try to generate the context, but it might lack detail in certain sections. Would you like to provide more information?"

**Target Audience Integration:**
"I notice you have target audience member profiles available. Would you like me to use their preferences to automatically calculate the age range and story length? This will ensure the story is perfectly tailored to your children's needs."

**Target Audience Calculation Failure:**
"Unable to calculate parameters from target audience members. I'll use default parameters instead. You can check your target audience profiles with '/jester audience list' and update them if needed."

**Template Mismatch:**
"There seems to be a mismatch between your story concept and the chosen plot template. This might lead to a context that doesn't fit your story. Would you like to choose a different template?"

**Generation Failure:**
"I encountered an issue during context generation. This could be due to complex instructions or conflicting information. Please review your requirements, or try simplifying your request."

**Entity Management Service Unavailable:**
"I notice the Entity Management service is currently unavailable. I'll proceed with creating your story context using local entities and my knowledge base. You can still create a rich, engaging story without Entity Management integration. Would you like me to continue with local entity suggestions?"

**Entity Management Query Failure:**
"I had trouble querying Entity Management for entity suggestions. This might be due to network issues or service problems. I'll continue with local entity suggestions and you can always add more entities later. Would you like me to proceed with the context generation?"

**No Entity Management Entities Found:**
"I searched Entity Management for entities relevant to your story concept, but didn't find any suitable matches. This could mean your story concept is very unique! I'll create the context using local entities and my knowledge base. You can always add more entities later if needed."

### Success Confirmation

"Fantastic! I've successfully generated your story context and saved it to [file path].

**Context Title**: [title]
**Plot Template**: [template]
**Characters**: [character count]
**Locations**: [location count]

Ready to review your context? Use `/edit [file path]` to make any final adjustments, or `/write outline [story identifier]` to generate the story outline!

**Related Files:**
- Context template: `./.jester/templates/context.yaml`
- Outline generation: `./.jester/data/outline-generation.md`
- Metadata propagation: `./.jester/data/metadata-propagation.md`"