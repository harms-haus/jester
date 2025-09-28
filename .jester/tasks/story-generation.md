

# Story Generation Task

## Purpose

To transform structured outlines into engaging, age-appropriate bedtime stories that captivate young readers while delivering meaningful themes.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `.jester/core-config.yaml`
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story generation."
- Extract key configurations: `jesterStoryLocation`, `jesterDebugLog`
- Identify and load the following inputs:
  - **Outline file**: The outline markdown file from draft/ directory
  - **Context file**: The context file with character and setting details
  - **Target audience**: Age range and reading level
  - **Length requirements**: Target word count and pacing
  - **Age appropriateness validation checklist**: age-appropriateness-validation.md for validation

### 1. Outline File Processing

- **Outline loading**: Load the outline markdown file from draft/ directory
- **Metadata extraction**: Extract target length, audience, and theme information
- **Scene structure analysis**: Analyze scene structure and progression
- **Character information extraction**: Extract character details from outline
- **Plot point analysis**: Analyze plot points and story flow

### 2. Character Integration

- **Character profile loading**: Load character information from context file
- **Character voice development**: Develop distinct character voices and dialogue
- **Character interaction creation**: Create engaging character interactions
- **Character arc implementation**: Implement character development throughout story
- **Personality expression**: Express character personalities through actions and dialogue

### 3. Setting Integration

- **Location details loading**: Load location descriptions from context file
- **Atmosphere creation**: Create immersive atmosphere and mood
- **Sensory detail integration**: Integrate sensory details for immersion
- **Setting consistency**: Maintain setting consistency throughout story
- **Environmental storytelling**: Use setting to enhance story elements

### 4. Plot Development

- **Scene transformation**: Transform outline points into engaging narrative
- **Dialogue creation**: Add age-appropriate character dialogue
- **Action sequence development**: Develop action sequences and events
- **Conflict resolution**: Implement conflicts and resolutions
- **Pacing optimization**: Optimize pacing for target audience

### 5. Theme Integration

- **Moral lesson weaving**: Weave moral lessons throughout the story
- **Educational element integration**: Integrate educational elements naturally
- **Theme consistency**: Maintain theme consistency throughout story
- **Message delivery**: Deliver themes through story events and character actions
- **Age-appropriate messaging**: Ensure themes are appropriate for target age

### 6. Language and Style

- **Age-appropriate language**: Use language appropriate for target audience
- **Reading level optimization**: Optimize for target reading level
- **Engagement techniques**: Use techniques to maintain reader engagement
- **Flow and rhythm**: Create smooth flow and rhythm
- **Voice consistency**: Maintain consistent narrative voice

### 7. Length and Quality Validation

- **Word count validation**: Ensure story meets target word count
- **Quality assessment**: Assess story quality and engagement
- **Age appropriateness check**: Verify content is appropriate for target audience
- **Coherence validation**: Verify story coherence and logical flow
- **Theme integration check**: Verify theme integration and delivery

### 8. Story File Creation

- **File structure**: Create outline file with proper structure from template: `./.jester/templates/story-template.md`
- **Metadata inclusion**: Include necessary metadata
- **File saving**: Save context file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verification**: Verify file creation and content
- **File name**: Name the file `story-NNN.md`

### 9. Generate Story Report

Provide a structured story generation report including:

#### Story Summary
- Story title and theme
- Target audience and length
- Word count achieved
- Character count and types
- Setting details

#### Character Development
- Character voices developed
- Character interactions created
- Character arcs implemented
- Personality expression
- Dialogue quality

#### Setting Integration
- Location details integrated
- Atmosphere created
- Sensory details included
- Setting consistency maintained
- Environmental storytelling

#### Plot Development
- Scenes transformed
- Dialogue created
- Action sequences developed
- Conflicts resolved
- Pacing optimized

#### Theme Integration
- Moral lessons woven
- Educational elements integrated
- Theme consistency maintained
- Message delivery
- Age-appropriate messaging

#### Validation Results
- Word count validation
- Quality assessment
- Age appropriateness check
- Coherence validation
- Theme integration check

#### Final Assessment
- **SUCCESS**: Story generated successfully
- **PARTIAL**: Story generated with minor issues
- **FAILED**: Story generation failed, manual intervention required
- **Ready for Approval**: Story ready for approval workflow