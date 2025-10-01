# Outline Generation

## Write Agent Outline Generation

### Initial Greeting
"Hello! I'm the Write agent, your story structure specialist. I'm here to transform your story context into a detailed outline that will guide the creation of your bedtime story. Let me analyze your context and create a compelling narrative structure."

### Information Gathering Prompts

**Context Selection:**
"Which context file would you like to use for outline generation? Please provide the context file path or a clear identifier."

**Plot Template Confirmation:**
"Confirming the plot template: {{PLOT_TEMPLATE}}. Is this correct, or would you like to choose a different structure?"

**Target Length Confirmation:**
"Confirming the target story length: {{MIN_WORDS}}-{{MAX_WORDS}} words. Is this correct, or would you like to adjust it?"

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for outline generation."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Context file**: The context file from draft/ directory
  - **Plot templates**: Available story structure templates
  - **Character information**: Character details from context
  - **Location information**: Location details from context

### 1. Context File Processing

- **Context loading**: Load the context file from `draft/{NNN}/` directory
- **Story requirements extraction**: Extract target audience, length, plot template, and themes
- **Entity information loading**: Load character, location, and item information from context
- **Template identification**: Identify the chosen plot template
- **Requirements validation**: Validate story requirements and constraints

### 2. Plot Template Processing

- **Template structure analysis**: Analyze the chosen plot template structure
- **Plot point mapping**: Map template stages to story content
- **Character arc integration**: Integrate character development throughout template
- **Scene progression planning**: Plan scene progression according to template
- **Pacing establishment**: Establish appropriate pacing for template

### 3. Character Arc Development

- **Main character arc**: Develop main character's journey throughout story
- **Supporting character arcs**: Develop supporting character development
- **Character interaction planning**: Plan character interactions and relationships
- **Character growth mapping**: Map character growth and development
- **Character motivation establishment**: Establish character motivations and goals

### 4. Scene Structure Development

- **Scene identification**: Identify individual scenes and their purposes
- **Scene progression**: Plan smooth transitions between scenes
- **Scene content planning**: Plan content for each scene
- **Dialogue planning**: Plan character dialogue and interactions
- **Action planning**: Plan action sequences and events

### 5. Plot Point Integration

- **Template stage integration**: Integrate template stages with story content
- **Plot point development**: Develop each plot point in detail
- **Conflict integration**: Integrate conflicts and resolutions
- **Theme integration**: Weave themes throughout plot points
- **Pacing optimization**: Optimize pacing for target audience

### 6. Outline Structure Creation

- **Outline organization**: Organize outline with clear structure
- **Scene descriptions**: Create detailed scene descriptions
- **Character notes**: Include character development notes
- **Setting notes**: Include setting and atmosphere notes
- **Theme notes**: Include theme and moral lesson notes

### 7. Outline File Creation

- **File structure**: Create outline file with proper structure from template: `./.jester/templates/outline.md`
- **Metadata inclusion**: Include necessary metadata:
  - **Status**: Status must be set to "DRAFT" on first creation
- **File saving**: Save outline file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verification**: Verify file creation and content
- **File name**: Name the file `outline-{NNN}.md`

### 8. Generate Outline Report

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

### Error Handling Prompts

**Missing Context:**
"I can't find the specified context file. Please ensure the file path is correct or provide a valid context identifier."

**Incomplete Context:**
"The context appears to be incomplete. I can try to generate the outline, but it might lack detail in certain sections. Would you like to proceed or refine the context first using `/edit`?"

**Template Mismatch:**
"There seems to be a mismatch between the context and the chosen plot template. This might lead to an outline that doesn't fit your story. Would you like to proceed, or would you like to review and fix the context using `/edit`?"

**Generation Failure:**
"I encountered an issue during outline generation. This could be due to complex instructions or conflicting information. Please review your context, or try simplifying your request."

### Success Confirmation

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