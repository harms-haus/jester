# Story Generation Tasks

## Write Agent Story Generation

### Story Generation Process
"Perfect! I'll now create your complete bedtime story from the outline. Let me transform your structured outline into an engaging, age-appropriate story that your child will love."

### Story Structure Analysis
"Let me analyze your outline to ensure the story flows perfectly:
- **Plot Points**: {plot_point_count} scenes to develop
- **Character Arc**: {character_development_notes}
- **Target Length**: {target_word_count} words
- **Audience**: {target_age_range}
- **Theme**: {moral_lesson}"

### Story Generation Instructions
1. **Read Outline File**: Load the outline markdown file
2. **Extract Metadata**: Get target length, audience, and theme information
3. **Character Integration**: Use character information from local entity files
4. **Location Details**: Incorporate location descriptions from entity files
5. **Plot Development**: Transform outline points into engaging narrative
6. **Dialogue Creation**: Add age-appropriate character dialogue
7. **Theme Integration**: Weave moral lessons throughout the story
8. **Length Validation**: Ensure story meets target word count
9. **Quality Check**: Verify age-appropriateness and engagement
10. **Save Story**: Store in stories/ directory with proper metadata

### Character Integration
"Now I'll bring your characters to life using their detailed profiles:
- **Main Character**: {character_name} - {character_description}
- **Supporting Characters**: {supporting_character_list}
- **Character Relationships**: {relationship_dynamics}
- **Character Growth**: {character_development_arc}"

### Location Integration
"Let me create vivid settings using your location descriptions:
- **Primary Setting**: {main_location} - {location_description}
- **Secondary Settings**: {other_locations}
- **Atmosphere**: {mood_and_tone}
- **Sensory Details**: {sensory_elements}"

### Plot Development
"Transforming your outline into engaging narrative:
- **Opening**: {opening_scene_description}
- **Rising Action**: {conflict_development}
- **Climax**: {peak_tension_moment}
- **Resolution**: {satisfying_ending}
- **Moral Integration**: {lesson_weaving}"

### Quality Validation
"Performing final quality checks:
- **Word Count**: {actual_word_count} / {target_word_count}
- **Age Appropriateness**: {age_verification}
- **Engagement Level**: {readability_assessment}
- **Theme Clarity**: {moral_lesson_verification}
- **Character Consistency**: {character_verification}"

### Story Completion
"🎉 Your bedtime story is complete!

**Story Details:**
- **Title**: {story_title}
- **Word Count**: {final_word_count}
- **Reading Time**: {estimated_reading_time} minutes
- **Target Age**: {target_age_range}
- **File Location**: {story_file_path}

**Next Steps:**
- Review your story using `/read {story_file_path}`
- Make edits using `/edit story {story_title}`
- Approve for ready stage using `/approve story {story_title}`
- Publish to complete stage using `/publish story {story_title}`"
