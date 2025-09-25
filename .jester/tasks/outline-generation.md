<!-- Powered by BMAD™ Core -->

# Outline Generation Task

## Purpose

To create detailed story outlines that transform context information into structured plot points, character arcs, and scene progression.

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

- **Context loading**: Load the context file from draft/ directory
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

- **File structure**: Create outline file with proper structure
- **Content organization**: Organize content logically
- **Metadata inclusion**: Include necessary metadata
- **File saving**: Save outline file in draft/ directory
- **Verification**: Verify file creation and content

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