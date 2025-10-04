# Context Generation

## Purpose

Generate rich, detailed story contexts for bedtime stories that captivate children's imagination while ensuring age-appropriate content and coherent narrative structure

## Definitions

- a `context` is the foundational story information including concept, characters, setting, and plot structure
- a `story concept` is the core idea or theme of the story
- a `target audience` is the intended age group and preferences of the story's readers
- a `plot template` is a predefined story structure such as Hero's Journey or Pixar Method
- a `character profile` is a detailed description of a story character including personality, traits, and role
- a `setting` is the world or environment where the story takes place
- `context generation` is the process of creating all foundational story elements before writing begins

## Sequential Tasks

***CRITICAL: Do not proceed to the next task until the current task is complete***

### 1. Load Core Configuration and Inputs

- **Load configuration**: Load `.jester/core-config.yaml`
- **Halt on missing config**: If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for context generation."
- **Extract configurations**: Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- **Identify inputs**: Identify and load the following inputs:
  - **Story requirements**: Concept, target audience, length, preferences
  - **Plot templates**: Available story structure templates
  - **Character templates**: Character development templates
  - **Location templates**: Setting development templates

### 2. Story Requirements Gathering

- **Collect concept**: Collect story concept and theme
- **Analyze audience**: Analyze target audience and age requirements
- **Determine length**: Determine appropriate story length
- **Gather preferences**: Collect user preferences and requirements
- **Select template**: Select appropriate plot template

### 3. Plot Template Selection

- **Analyze templates**: Analyze available plot templates
- **Choose structure**: Choose appropriate story structure
- **Plan structure**: Plan story structure according to template
- **Define points**: Define key plot points
- **Integrate themes**: Integrate moral lessons and educational elements

### 4. Character Profile Creation

- **Develop main character**: Develop detailed main character profile
- **Create supporting characters**: Create supporting character profiles
- **Establish relationships**: Establish character relationships
- **Plan character arcs**: Plan character development throughout story
- **Define personalities**: Define character personalities and traits

### 5. Setting Establishment

- **Create locations**: Create rich, immersive locations
- **Develop settings**: Develop detailed setting descriptions
- **Create atmosphere**: Create appropriate atmosphere and mood
- **Connect locations**: Establish connections between locations
- **Include sensory details**: Include sensory details for immersion

### 6. Plot Structure Development

- **Organize plot points**: Organize story according to chosen template
- **Plan scenes**: Plan individual scenes and transitions
- **Establish pacing**: Establish appropriate pacing
- **Develop conflicts**: Develop conflicts and resolutions
- **Weave themes**: Weave themes throughout plot

### 7. Content Validation

- **Check age appropriateness**: Ensure content is appropriate for target audience
- **Verify coherence**: Verify story coherence and logical flow
- **Ensure character consistency**: Ensure character consistency
- **Ensure setting consistency**: Ensure setting consistency
- **Verify theme integration**: Verify theme integration
- **Check appropriate messaging**: `./.jester/data/audience-appropriateness.md`

### 8. Context File Creation

- **Create file structure**: Create context file with proper structure from template: `./.jester/templates/context.yaml`
- **Include metadata**: Include necessary metadata:
  - **Status**: Status must be set to "DRAFT" on first creation
- **Save file**: Save context file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verify creation**: Verify file creation and content
- **Name file**: Name the file `context-{NNN}.yaml`

### 9. Generate Context Report

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

## Error Handling

***CRITICAL: Handle errors gracefully to maintain user experience***

### Common Error Scenarios

*Note: not as important as regular error handling*

- **Missing Story Concept:**
  "I need more information about your story idea. Could you tell me more about the adventure, characters, or themes you have in mind?"

- **Incomplete Requirements:**
  "The story requirements appear to be incomplete. I can try to generate the context, but it might lack detail in certain sections. Would you like to provide more information?"

- **Target Audience Integration:**
  "I notice you have target audience member profiles available. Would you like me to use their preferences to automatically calculate the age range and story length? This will ensure the story is perfectly tailored to your children's needs."

- **Target Audience Calculation Failure:**
  "Unable to calculate parameters from target audience members. I'll use default parameters instead. You can check your target audience profiles with '/jester audience list' and update them if needed."

- **Template Mismatch:**
  "There seems to be a mismatch between your story concept and the chosen plot template. This might lead to a context that doesn't fit your story. Would you like to choose a different template?"

- **Generation Failure:**
  "I encountered an issue during context generation. This could be due to complex instructions or conflicting information. Please review your requirements, or try simplifying your request."
  
## Success Confirmation

**Summary:** After successful context generation, provide confirmation to the user with relevant details

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