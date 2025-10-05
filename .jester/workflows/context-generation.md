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

### 1. Load Inputs

- **Identify inputs**: Identify and load the following inputs:
  - **Story requirements**: Concept, target audience, length, preferences
  - **Plot templates**: Available story structure templates
- **Plot points**: Collect suggested plot points or template
- **Suggested entities**: Collect suggested entities, new and established

### 2. Plot Template Selection

- **Select template**: If no plot template has been suggested, select an *appropriate* plot from `./.jester/data/plot/`:
  - [Fichtean Curve](fichtean-curve.md)
  - [Harmon's Circle](harmons-story-circle.md)
  - [Hero's Journey](heros-journey.md)
  - [Pixar Method](pixar-method.md)
- **Plan structure**: Plan story structure according to template
- **Define points**: Define key plot points
- **Integrate themes**: Integrate moral lessons and educational elements

### 3. Character Development

- **Retrieve established characters**: Find established characters that may fit in the story
- **Design new characters**: For any gaps in characters, create new ones: `./.jester/workflows/character-creation.md`

### 4. Location Establishment

- **Retrieve established locations**: Find established locations that may fit in the story
- **Design new locations**: For any gaps in locations, create new ones: `./.jester/workflows/location-creation.md`

### 5. Item Development

- **Determine necessity**: Determine if any items are required
- **Retrieve established items**: Find established items that may fit in the story
- **Design new items**: For any gaps in items, create new ones: `./.jester/workflows/item-creation.md` 

### 6. Plot Structure Development

- **Organize plot points**: Organize story according to chosen template
- **Plan scenes**: Plan individual scenes and transitions
- **Establish pacing**: Establish appropriate pacing
- **Develop conflicts**: Develop conflicts and resolutions
- **Weave themes**: Weave themes throughout plot

### 7. Content Validation

- **Check age appropriateness**: Ensure content is appropriate for target audience
- **Verify coherence**: Verify story coherence to plot structure and logical flow
- **Ensure character consistency**: Ensure characters develop consistently with their core identity
- **Ensure setting consistency**: Ensure setting is consistently described and supports physical transition logic
- **Ensure item consistency**: Ensure items are tracked through the story and could physically exist there
- **Verify theme integration**: Verify theme integration with story plot points
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

- Driving character profile
- Supporting character profiles
- Character relationships
- Character arcs planned
- Personality traits defined

#### Locations Development

- New Locations
- Chosen established locations

#### Items Development

- New Items
- Chosen established items

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