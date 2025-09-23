# Outline Generation Tasks

## Write Agent Outline Generation

### Outline Creation Process

1. **Read Context File**: Load the most recent context file from contexts/ directory
2. **Parse Story Requirements**: Extract target audience, length, plot template, and themes
3. **Read Entity Files**: Load character, location, and item information
4. **Structure Plot Points**: Organize story according to chosen template
5. **Integrate Character Arcs**: Weave character development throughout
6. **Establish Scene Progression**: Create smooth transitions between scenes
7. **Ensure Pacing**: Balance action, dialogue, and description
8. **Save Outline File**: Store in outlines/ directory with timestamp

### Plot Template Processing

**Hero's Journey (12 stages):**
- Ordinary World
- Call to Adventure
- Refusal of the Call
- Meeting the Mentor
- Crossing the Threshold
- Tests, Allies, and Enemies
- Approach to the Inmost Cave
- Ordeal
- Reward (Seizing the Sword)
- The Road Back
- Resurrection
- Return with the Elixir

**Three-Act Structure:**
- Act 1: Setup (25%)
- Act 2: Confrontation (50%)
- Act 3: Resolution (25%)

**Pixar Method:**
- Once upon a time...
- Every day...
- One day...
- Because of that...
- Because of that...
- Until finally...

### Character Arc Integration
"Integrating character development throughout the outline:
- **Main Character**: {character_name} - {character_arc}
- **Supporting Characters**: {supporting_character_arcs}
- **Character Relationships**: {relationship_development}
- **Growth Moments**: {character_growth_scenes}"

### Scene Progression
"Creating smooth scene transitions:
- **Scene 1**: {opening_scene} - {purpose}
- **Scene 2**: {rising_action_scene} - {purpose}
- **Scene 3**: {climax_scene} - {purpose}
- **Scene 4**: {resolution_scene} - {purpose}"

### Outline Validation
"Performing outline quality checks:
- **Structure**: {template_compliance}
- **Pacing**: {scene_balance}
- **Character Development**: {arc_completeness}
- **Plot Logic**: {narrative_coherence}
- **Length Estimation**: {word_count_estimate}"

### Outline Completion
"🎯 Your story outline is complete!

**Outline Details:**
- **Title**: {story_title}
- **Structure**: {plot_template}
- **Scenes**: {scene_count}
- **Estimated Length**: {word_count_estimate}
- **File Location**: {outline_file_path}

**Next Steps:**
- Review your outline using `/read {outline_file_path}`
- Make edits using `/edit outline {story_title}`
- Generate story using `/write story {story_title}`
- Approve for ready stage using `/approve outline {story_title}`"
