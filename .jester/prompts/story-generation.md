# Story Generation Prompts

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
- **Supporting Characters**: {supporting_characters}
- **Character Relationships**: {relationship_dynamics}
- **Personality Traits**: {personality_notes}"

### Location Integration
"Let me set the scene using your location details:
- **Primary Setting**: {location_name} - {location_description}
- **Atmosphere**: {mood_and_tone}
- **Sensory Details**: {sensory_elements}
- **Environmental Features**: {physical_characteristics}"

### Plot Development
"Now I'll develop each plot point into engaging scenes:
- **Opening**: {opening_scene}
- **Rising Action**: {conflict_development}
- **Climax**: {story_peak}
- **Resolution**: {satisfying_ending}
- **Moral Integration**: {lesson_delivery}"

### Dialogue Creation
"Adding character dialogue that feels natural and age-appropriate:
- **Character Voice**: Each character has a distinct speaking style
- **Age-Appropriate Language**: Vocabulary suitable for {target_age_range}
- **Emotional Expression**: Characters express feelings clearly
- **Plot Advancement**: Dialogue moves the story forward"

### Theme Integration
"Ensuring the moral lesson is woven throughout naturally:
- **Subtle Integration**: Lesson emerges through character actions
- **Age-Appropriate**: Message is clear but not preachy
- **Character Growth**: Protagonist learns and grows
- **Satisfying Resolution**: Lesson is reinforced in the ending"

### Length and Pacing
"Adjusting story length and pacing for optimal bedtime reading:
- **Target Length**: {target_word_count} words
- **Reading Time**: Approximately {reading_time_minutes} minutes
- **Pacing**: Balanced action and quiet moments
- **Chapter Breaks**: Natural pause points for bedtime"

### Quality Assurance
"Final quality check to ensure the story meets all requirements:
- **Age Appropriateness**: Content suitable for {target_age_range}
- **Engagement Level**: Captivating for bedtime reading
- **Character Consistency**: Characters act according to their profiles
- **Plot Coherence**: Story flows logically from beginning to end
- **Theme Clarity**: Moral lesson is clear but not heavy-handed"

### Error Handling

**Missing Outline File:**
"I can't find the outline file. Please make sure you have a valid outline file in the outlines/ directory. You can create one using `/write outline`."

**Invalid Outline Format:**
"The outline file doesn't appear to be in the correct format. Please check that it contains proper plot points and metadata."

**Missing Character Information:**
"I'm missing some character details. Let me work with what I have and create a compelling story. You can always edit the character files later using `/edit character`."

**Length Mismatch:**
"The story is {actual_length} words, but your target was {target_length}. I can adjust the length by {adjustment_suggestion}."

### Success Confirmation

"🎉 Your bedtime story is complete! Here's what I've created:

**Story Title**: {story_title}
**Word Count**: {actual_word_count} words
**Reading Time**: {reading_time_minutes} minutes
**Characters**: {character_list}
**Theme**: {moral_lesson}
**File Location**: {file_path}

**Story Summary**: {brief_summary}

**Next Steps:**
- Review the story for any final edits
- Use `/edit` to make any adjustments
- Use `/approve` to move to ready stage when satisfied
- Use `/publish` to publish to your story universe

Your child is going to love this story! 🌟"
