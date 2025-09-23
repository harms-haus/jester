# Context Generation Tasks

## Muse Agent Context Generation

### Context Creation Process

1. **Gather Story Requirements**: Collect story concept, target audience, length, and preferences
2. **Select Plot Template**: Choose appropriate story structure (Hero's Journey, Pixar Method, Golden Circle)
3. **Create Character Profiles**: Develop detailed character information with relationships
4. **Establish Settings**: Create rich, immersive locations with connections
5. **Define Plot Points**: Structure the story according to chosen template
6. **Integrate Themes**: Weave moral lessons and educational elements throughout
7. **Validate Content**: Ensure age-appropriateness and story coherence
8. **Save Context File**: Store in draft/{NNN}/ directory with story title-based filename
9. **Metadata Propagation**: Use `metadata-propagation.md` to ensure all relevant metadata is carried through

## CRITICAL: DO NOT CREATE ENTITY FILES

- Only create the context file (YAML format)
- Do NOT create individual character, location, or item files
- Do NOT create files in universe/ or reading/ directories
- Entity files are created only after /approve command
- Context file should contain entity information as structured data only

## Character Profile Creation
"Creating detailed character profiles:
- **Main Character**: {character_name} - {character_description}
- **Supporting Characters**: {supporting_character_list}
- **Character Relationships**: {relationship_dynamics}
- **Character Motivations**: {motivation_analysis}"

## Setting Development
"Establishing rich story settings:
- **Primary Location**: {main_location} - {location_description}
- **Secondary Locations**: {other_locations}
- **Atmosphere**: {mood_and_tone}
- **Sensory Details**: {sensory_elements}"

## Plot Structure Integration
"Integrating plot structure with story elements:
- **Template**: {chosen_template}
- **Plot Points**: {plot_point_list}
- **Character Arcs**: {character_development}
- **Theme Integration**: {moral_lesson_weaving}"

## Context Validation
"Performing context quality checks:
- **Completeness**: {required_fields_check}
- **Age Appropriateness**: {age_verification}
- **Coherence**: {story_logic_check}
- **Character Consistency**: {character_verification}
- **Setting Consistency**: {location_verification}"

## Context Completion
"🎭 Your story context is complete!

**Context Details:**
- **Title**: {story_title}
- **Template**: {plot_template}
- **Characters**: {character_count}
- **Locations**: {location_count}
- **File Location**: {context_file_path}

**IMPORTANT: Only context file created**

- No entity files were created (characters, locations, items)
- Entity files will be created only after /approve command
- Context contains all entity information as structured data

**Next Steps:**
- Review your context using `/read {context_file_path}`
- Make edits using `/edit context {story_title}`
- Generate outline using `/write outline {story_title}`
- Continue with story development"
