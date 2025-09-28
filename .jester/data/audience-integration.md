

# Audience Integration

## Purpose

Guide the integration of target audience profiles with story generation and content creation workflows.

## Integration Points

### 1. Story Generation Integration

#### Profile Selection
**Process:**
1. Load all available profiles from `.memory/target-audience-profiles.yaml`
2. Display profiles with key information
3. Allow user to select one or more profiles
4. Calculate combined preferences for multiple profiles

**Profile Display:**
```
Available Target Audience Profiles:

1. [name] (age [age]) - [min]-[max] words, themes: [themes]
2. [name] (age [age]) - [min]-[max] words, themes: [themes]
3. [name] (age [age]) - [min]-[max] words, themes: [themes]

Select profiles (1,2,3 or all): [user_input]
```

#### Preference Calculation
**Single Profile:**
- Use profile preferences directly
- Apply age-appropriate adjustments
- Validate against story requirements

**Multiple Profiles:**
- Calculate average age
- Combine theme preferences
- Determine appropriate length range
- Merge character and setting preferences

### 2. Content Customization

#### Story Length Customization
**Process:**
1. Use calculated length preferences
2. Apply age-appropriate adjustments
3. Consider story complexity
4. Validate against content requirements

#### Theme Integration
**Process:**
1. Prioritize selected themes
2. Ensure age-appropriate content
3. Balance multiple themes if multiple profiles
4. Validate theme combinations

#### Character Integration
**Process:**
1. Select characters based on preferences
2. Ensure age-appropriate character types
3. Balance character diversity
4. Validate character-story fit

#### Setting Integration
**Process:**
1. Select settings based on preferences
2. Ensure age-appropriate environments
3. Balance setting variety
4. Validate setting-story fit

### 3. Content Validation

#### Age Appropriateness
**Validation Rules:**
- Language complexity matches age
- Themes are age-appropriate
- Content is suitable for age group
- Length is appropriate for attention span

### 4. Integration Results

#### Success Response
```yaml
integration_result:
  success: true
  profile_used: [profile_name]
  preferences_applied:
    length: [calculated_length]
    themes: [selected_themes]
    characters: [selected_characters]
    settings: [selected_settings]
  customizations:
    language_complexity: [level]
    content_appropriateness: [level]
    engagement_factors: [factors]
```

#### Integration Summary
```
✅ Audience integration successful!

Profile: [name] (age [age])
Applied Preferences:
- Story Length: [length] words
- Themes: [themes]
- Characters: [characters]
- Settings: [settings]

Content Customized:
- Language complexity: [level]
- Age appropriateness: [level]
- Engagement factors: [factors]
```