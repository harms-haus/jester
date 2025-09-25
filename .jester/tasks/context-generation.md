<!-- Powered by BMAD™ Core -->

# Context Generation Task

## Purpose

To create comprehensive story contexts that establish characters, settings, themes, and plot structure for engaging bedtime stories.

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

- **File structure**: Create context file with proper structure
- **Content organization**: Organize content logically
- **Metadata inclusion**: Include necessary metadata
- **File saving**: Save context file in draft/ directory
- **Verification**: Verify file creation and content

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