# Story Generation

## Purpose

Transform story outline into a complete, engaging bedtime story while ensuring age-appropriate content, coherent narrative flow, and proper integration of all story elements

## Definitions

- a `story` is a complete narrative with beginning, middle, and end that captivates children
- an `outline` is a structured plan that organizes story elements into scenes and plot points
- a `draft` is an initial version of the story that may require refinement
- `story generation` is the process of creating a complete story from an outline
- `narrative flow` is the smooth progression of events and ideas throughout the story
- `engagement elements` are components that keep children interested such as dialogue, action, and suspense
- `age-appropriate content` is story material suitable for the target age group's comprehension and emotional development

## Sequential Tasks

***CRITICAL: Do not proceed to the next task until the current task is complete***

### 1. Load Core Configuration and Inputs

- **Identify inputs**: Identify and load the following inputs:
  - **Outline file**: The outline file from draft/ directory
  - **Context file**: The context file for reference
  - **Character information**: Character details from context
  - **Location information**: Location details from context

### 2. Outline Processing

- **Load outline**: Load the outline file from `draft/{NNN}/` directory
- **Extract structure**: Extract scene structure and plot points
- **Load context reference**: Load context file for reference information
- **Load entity information**: Load character, location, and item information
- **Validate outline**: Validate outline completeness and coherence

### 3. Story Structure Development

- **Plan beginning**: Plan engaging story opening
- **Plan middle**: Plan story development and conflict
- **Plan ending**: Plan satisfying story resolution
- **Ensure flow**: Ensure smooth narrative flow between sections
- **Integrate elements**: Integrate all story elements cohesively

### 4. Scene Development

- **Expand scenes**: Expand each outline scene into full narrative
- **Develop dialogue**: Develop character dialogue and interactions
- **Add descriptions**: Add setting and action descriptions
- **Create atmosphere**: Create appropriate atmosphere and mood
- **Maintain pacing**: Maintain appropriate pacing for target audience

### 5. Character Integration

- **Integrate characters**: Integrate characters into scenes naturally
- **Show character growth**: Show character development and arcs
- **Maintain consistency**: Maintain character voice and behavior consistency
- **Enhance relationships**: Enhance character relationships and interactions
- **Support plot**: Ensure characters support plot progression

### 6. Content Refinement

- **Refine language**: Refine language for target age group
- **Check appropriateness**: Check content appropriateness for audience
- **Enhance engagement**: Enhance engagement elements
- **Improve flow**: Improve narrative flow and transitions
- **Verify themes**: Verify theme and moral lesson integration

### 7. Story File Creation

- **Create structure**: Create story file with proper structure from template: `./.jester/templates/story.md`
- **Include metadata**: Include necessary metadata:
  - **Status**: Status must be set to "DRAFT" on first creation
- **Save file**: Save story file in `./draft/{NNN}/` directory (NNN is the current project index)
- **Verify creation**: Verify file creation and content
- **Name file**: Name the file `story-{NNN}.md`

### 8. Generate Story Report

Provide a structured story generation report including:

#### Story Summary

- Story title and theme
- Target audience and length
- Main characters featured
- Key plot points covered
- Moral lessons integrated

#### Structural Elements

- Story beginning effectiveness
- Middle section development
- Ending satisfaction level
- Narrative flow quality
- Scene transitions

#### Character Development

- Character integration success
- Character growth depiction
- Character consistency maintenance
- Relationship development
- Character support of plot

#### Content Quality

- Language appropriateness
- Engagement elements effectiveness
- Theme integration success
- Moral lesson clarity
- Overall content quality

#### Validation Results

- Age appropriateness check
- Coherence validation
- Character consistency check
- Theme integration verification
- Engagement level assessment

#### Final Assessment

- **SUCCESS**: Story generated successfully
- **PARTIAL**: Story generated with minor issues
- **FAILED**: Story generation failed, manual intervention required
- **Ready for Review**: Story ready for user review and refinement

## Error Handling

***CRITICAL: Handle errors gracefully to maintain user experience***

### Common Error Scenarios

- **Missing Outline:**
  *Note: not as important as regular error handling*
  "I can't find the specified outline file. Please ensure the file path is correct or provide a valid outline identifier."

- **Incomplete Outline:**
  *Note: not as important as regular error handling*
  "The outline appears to be incomplete. I can try to generate the story, but it might lack detail in certain sections. Would you like to proceed or refine the outline first using `/edit`?"

- **Generation Failure:**
  *Note: not as important as regular error handling*
  "I encountered an issue during story generation. This could be due to complex instructions or conflicting information. Please review your outline, or try simplifying your request."

## Success Confirmation

**Summary:** After successful story generation, provide confirmation to the user with relevant details

"Wonderful! I've successfully generated your bedtime story and saved it to [file path].

**Story Title**: [title]
**Target Age**: [age range]
**Estimated Reading Time**: [time]
**Word Count**: [count]

Ready to review your story? Use `/edit [file path]` to make any final adjustments, or `/publish [story identifier]` to prepare it for sharing!

**Related Files:**
- Story template: `./.jester/templates/story.md`
- Publishing workflow: `./.jester/data/publishing.md`
- Metadata propagation: `./.jester/data/metadata-propagation.md`"