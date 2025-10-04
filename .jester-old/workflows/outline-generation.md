# Outline Generation

## Purpose

Transform story context into a detailed outline that guides the creation of bedtime stories while ensuring coherent narrative structure and age-appropriate content

## Definitions

- an `outline` is a structured plan that organizes story elements into scenes and plot points
- a `context file` is the foundational story information including concept, characters, setting, and plot structure
- a `plot template` is a predefined story structure such as Hero's Journey or Pixar Method
- a `character arc` is the transformation or inner journey of a character throughout the story
- a `scene` is a distinct segment of the story with a specific purpose and setting
- `outline generation` is the process of creating a structured story plan from context information
- `plot points` are key events or turning points that drive the story forward

## Sequential Tasks

***CRITICAL: Do not proceed to the next task until the current task is complete***

### 1. Load Core Configuration and Inputs

- **Load configuration**: Load `.jester/core-config.yaml`
- **Halt on missing config**: If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for outline generation."
- **Extract configurations**: Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- **Identify inputs**: Identify and load the following inputs:
  - **Context file**: The context file from draft/ directory
  - **Plot templates**: Available story structure templates
  - **Character information**: Character details from context
  - **Location information**: Location details from context

### 2. Context File Processing

- **Load context**: Load the context file from `draft/{NNN}/` directory
- **Extract requirements**: Extract target audience, length, plot template, and themes
- **Load entity information**: Load character, location, and item information from context
- **Identify template**: Identify the chosen plot template
- **Validate requirements**: Validate story requirements and constraints

### 3. Plot Template Processing

- **Analyze structure**: Analyze the chosen plot template structure
- **Map points**: Map template stages to story content
- **Integrate character arcs**: Integrate character development throughout template
- **Plan progression**: Plan scene progression according to template
- **Establish pacing**: Establish appropriate pacing for template

### 4. Character Arc Development

- **Develop main arc**: Develop main character's journey throughout story
- **Create supporting arcs**: Develop supporting character development
- **Plan interactions**: Plan character interactions and relationships
- **Map growth**: Map character growth and development
- **Establish motivations**: Establish character motivations and goals

### 5. Scene Structure Development

- **Identify scenes**: Identify individual scenes and their purposes
- **Plan progression**: Plan smooth transitions between scenes
- **Plan content**: Plan content for each scene
- **Plan dialogue**: Plan character dialogue and interactions
- **Plan action**: Plan action sequences and events

### 6. Plot Point Integration

- **Integrate stages**: Integrate template stages with story content
- **Develop points**: Develop each plot point in detail
- **Integrate conflicts**: Integrate conflicts and resolutions
- **Weave themes**: Weave themes throughout plot points
- **Optimize pacing**: Optimize pacing for target audience

### 7. Outline Structure Creation

- **Organize outline**: Organize outline with clear structure
- **Create descriptions**: Create detailed scene descriptions
- **Include character notes**: Include character development notes
- **Include setting notes**: Include setting and atmosphere notes
- **Include theme notes**: Include theme and moral lesson notes
- **Check messaging**: `./.jester/data/audience-appropriateness.md`

### 8. Outline File Creation

- **Create structure**: Create outline file with proper structure from template: `./.jester/templates/outline.md`
- **Include metadata**: Include necessary metadata:
  - **Status**: Status must be set to "DRAFT" on first creation
- **Save file**: Save outline file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verify creation**: Verify file creation and content
- **Name file**: Name the file `outline-{NNN}.md`

### 9. Generate Outline Report

Provide a structured outline generation report including:

#### Outline Summary

- Plot template used
- Number of scenes planned
- Character arcs developed
- Plot points defined
- Theme integration

#### Plot Structure

- Template stages mapped
- Plot points developed
- Scene progression planned
- Pacing established
- Conflict integration

#### Character Development

- Main character arc
- Supporting character arcs
- Character interactions planned
- Character growth mapped
- Motivations established

#### Scene Structure

- Scenes identified
- Scene progression planned
- Scene content developed
- Dialogue planned
- Action sequences planned

#### Validation Results

- Template compliance check
- Character consistency validation
- Scene coherence validation
- Pacing appropriateness check
- Theme integration verification

#### Final Assessment

- **SUCCESS**: Outline generated successfully
- **PARTIAL**: Outline generated with minor issues
- **FAILED**: Outline generation failed, manual intervention required
- **Ready for Story**: Outline ready for story generation

## Error Handling

***CRITICAL: Handle errors gracefully to maintain user experience***

### Common Error Scenarios

- **Missing Context:**
  *Note: not as important as regular error handling*
  "I can't find the specified context file. Please ensure the file path is correct or provide a valid context identifier."

- **Incomplete Context:**
  *Note: not as important as regular error handling*
  "The context appears to be incomplete. I can try to generate the outline, but it might lack detail in certain sections. Would you like to proceed or refine the context first using `/edit`?"

- **Template Mismatch:**
  *Note: not as important as regular error handling*
  "There seems to be a mismatch between the context and the chosen plot template. This might lead to an outline that doesn't fit your story. Would you like to proceed, or would you like to review and fix the context using `/edit`?"

- **Generation Failure:**
  *Note: not as important as regular error handling*
  "I encountered an issue during outline generation. This could be due to complex instructions or conflicting information. Please review your context, or try simplifying your request."

## Success Confirmation

**Summary:** After successful outline generation, provide confirmation to the user with relevant details

"Excellent! I've successfully generated your outline and saved it to [file path].

**Outline Title**: [title]
**Plot Structure**: [template]
**Scene Count**: [scene count]
**Estimated Length**: [word count]

Ready to review your outline? Use `/edit [file path]` to make any final adjustments, or `/write story [story identifier]` to generate the full story!

**Related Files:**
- Outline template: `./.jester/templates/outline.md`
- Story generation: `./.jester/data/story-generation.md`
- Metadata propagation: `./.jester/data/metadata-propagation.md`"