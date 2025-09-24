# Target Audience Integration Prompt

## Purpose
Guide the integration of target audience management system with the existing story generation pipeline, including context generation and story creation.

## Integration Points

### 1. Context Generation Integration

#### Load Target Audience Profiles
**Process:**
1. Check if `.memory/target-audience-profiles.yaml` exists
2. If not, create from `.jester/templates/memory/target-audience-profiles-template.yaml`
3. Load active members and calculated parameters
4. Use parameters for context generation

**Prompt:**
```
Loading target audience profiles...

[If profiles exist]
Found target audience profiles:
- Active members: [member_names]
- Calculated age range: [age_range]
- Calculated word count: [word_count]
- Last calculated: [timestamp]

Using these parameters for story generation.

[If no profiles exist]
No target audience profiles found. Using default parameters.
You can create profiles with '/jester audience create [name] [birthday]' for personalized stories.
```

#### Parameter Integration
**Context Template Integration:**
```yaml
target_audience:
  age_range: "{{CALCULATED_AGE_RANGE}}"  # From target audience calculation
  reading_level: "{{READING_LEVEL}}"  # Derived from age range
  selected_members: ["{{MEMBER_ID_1}}", "{{MEMBER_ID_2}}"]  # Active member IDs
  calculated_from_members: true  # Flag indicating parameters were calculated

target_length:
  min_words: {{CALCULATED_MIN_WORDS}}  # From target audience calculation
  max_words: {{CALCULATED_MAX_WORDS}}  # From target audience calculation
  final_target: {{CALCULATED_TARGET_WORDS}}  # From target audience calculation
  calculated_from_members: true  # Flag indicating parameters were calculated
  member_preferences:  # Details about member preferences used
    "{{MEMBER_ID_1}}":
      preferred_words: {{MEMBER_PREFERRED_WORDS_1}}
      weight: {{MEMBER_WEIGHT_1}}
    "{{MEMBER_ID_2}}":
      preferred_words: {{MEMBER_PREFERRED_WORDS_2}}
      weight: {{MEMBER_WEIGHT_2}}
```

### 2. Story Generation Integration

#### Parameter Validation
**Before Story Generation:**
```
Validating story parameters against target audience preferences...

Target Audience Parameters:
- Age range: [age_range]
- Word count: [word_count]
- Selected members: [member_names]

Story Generation Parameters:
- Target length: [story_length]
- Age appropriateness: [age_check]

[If parameters match]
Parameters validated successfully. Story generation will respect target audience preferences.

[If parameters don't match]
Warning: Story parameters don't match target audience preferences.
- Target audience: [audience_params]
- Story generation: [story_params]

Continue with story generation? (y/n)
```

#### Story Length Enforcement
**During Story Generation:**
```
Generating story with target audience parameters:

Target Audience Requirements:
- Age range: [age_range]
- Word count: [min_words]-[max_words] words (target: [target_words])
- Selected members: [member_names]

Story Generation Guidelines:
- Ensure story length fits within [min_words]-[max_words] words
- Target approximately [target_words] words
- Use age-appropriate language and themes
- Incorporate member preferences: [themes], [characters], [settings]
```

### 3. Parameter Calculation Integration

#### Automatic Calculation
**When Active Members Change:**
```
Active target audience members updated: [member_names]

Calculating new parameters...

Age Range Calculation:
- Individual ages: [ages]
- Combined range: [combined_range]
- Expanded range: [expanded_range]

Word Count Calculation:
- [Member1]: [min]-[max] words (target: [target])
- [Member2]: [min]-[max] words (target: [target])
- Overlap range: [overlap_range]
- Final range: [final_range]
- Method: [calculation_method]

Parameters calculated successfully!
- Age range: [final_age_range]
- Word count: [final_word_count]
- Last updated: [timestamp]
```

#### Manual Override
**When User Wants to Override:**
```
Current calculated parameters:
- Age range: [calculated_age_range]
- Word count: [calculated_word_count]

You can override these parameters if needed:
- Use '/jester audience clear' to clear active members
- Use '/jester audience select [different_members]' to change selection
- Or continue with current parameters

Continue with current parameters? (y/n)
```

### 4. Error Handling Integration

#### Profile Loading Errors
**Template Creation:**
```
Target audience profiles not found. Creating from template...

Template created successfully at .memory/target-audience-profiles.yaml

You can now create target audience member profiles with:
'/jester audience create [name] [birthday]'
```

**File Corruption:**
```
Target audience profiles file appears corrupted.

Options:
1. Restore from backup (if available)
2. Recreate from template
3. Continue without target audience profiles

What would you like to do? (1/2/3)
```

#### Calculation Errors
**Invalid Member Data:**
```
Unable to calculate parameters for active members:
- [Member1]: [error_description]
- [Member2]: [error_description]

Please update these profiles or select different members.
Use '/jester audience edit [name]' to fix profiles.
```

**Calculation Failure:**
```
Parameter calculation failed. Using default parameters:
- Age range: 5-8 years
- Word count: 500-1000 words (target: 750)

You can retry calculation after fixing member profiles.
```

### 5. Fallback Mechanisms

#### No Active Members
**Default Parameters:**
```
No active target audience members selected.

Using default parameters:
- Age range: 5-8 years
- Word count: 500-1000 words (target: 750)

To use personalized parameters:
1. Create profiles with '/jester audience create [name] [birthday]'
2. Select members with '/jester audience select [name1] [name2]'
```

#### Profile Unavailable
**Graceful Degradation:**
```
Target audience profiles unavailable. Using default parameters.

Default Story Parameters:
- Age range: 5-8 years
- Word count: 500-1000 words (target: 750)
- Reading level: intermediate

You can create target audience profiles later for personalized stories.
```

### 6. User Experience Integration

#### Seamless Workflow
**Story Creation Flow:**
```
1. User: /muse create-new
2. System: Load target audience profiles
3. System: Display calculated parameters
4. System: Confirm parameters or allow override
5. System: Generate context with target audience parameters
6. System: Generate story respecting target audience preferences
```

#### Parameter Display
**Before Story Generation:**
```
Story Generation Parameters:

Target Audience:
- Selected members: [member_names]
- Age range: [age_range]
- Word count: [word_count]
- Calculation method: [method]

Story Context:
- Title: [story_title]
- Plot template: [template]
- Characters: [characters]
- Settings: [settings]

Ready to generate story with these parameters? (y/n)
```

### 7. Metadata Integration

#### Context Metadata
**Include in Context File:**
```yaml
metadata:
  target_audience_source: "calculated_from_members"  # or "default_parameters"
  active_members: ["member_id_1", "member_id_2"]
  calculation_method: "overlap_range"  # or "average_centers" or "single_member"
  calculation_timestamp: "2024-12-19T10:30:00Z"
  parameter_overrides: false
```

#### Story Metadata
**Include in Story File:**
```yaml
metadata:
  target_audience:
    selected_members: ["member_id_1", "member_id_2"]
    calculated_parameters:
      age_range: "2-6"
      word_count: "450-650"
      target_words: 550
    calculation_method: "overlap_range"
    last_calculated: "2024-12-19T10:30:00Z"
```

## Examples

### Successful Integration
```
User: /muse create-new
Agent: Loading target audience profiles...

Found target audience profiles:
- Active members: Zoe, Max
- Calculated age range: 2-6 years
- Calculated word count: 450-650 words (target: 550)
- Last calculated: 2024-12-19T10:30:00Z

Using these parameters for story generation.

What's the core story idea you'd like to explore?
User: A story about friendship between a bear and a fox
Agent: Great! I'll create a story about friendship between a bear and a fox, tailored for ages 2-6 with 450-650 words.

Story Generation Parameters:
- Target Audience: Zoe (5), Max (3)
- Age range: 2-6 years
- Word count: 450-650 words (target: 550)
- Themes: adventure, friendship, animals
- Characters: theo-bear, ember-fox
- Settings: forest, village

Ready to generate story with these parameters? (y/n)
```

### Error Handling
```
User: /muse create-new
Agent: Loading target audience profiles...

Target audience profiles file appears corrupted.

Options:
1. Restore from backup (if available)
2. Recreate from template
3. Continue without target audience profiles

What would you like to do? (1/2/3)
User: 2
Agent: Template created successfully at .memory/target-audience-profiles.yaml

You can now create target audience member profiles with:
'/jester audience create [name] [birthday]'

Using default parameters for story generation:
- Age range: 5-8 years
- Word count: 500-1000 words (target: 750)

What's the core story idea you'd like to explore?
```

### Parameter Override
```
User: /muse create-new
Agent: Loading target audience profiles...

Found target audience profiles:
- Active members: Zoe, Max
- Calculated age range: 2-6 years
- Calculated word count: 450-650 words (target: 550)

Current calculated parameters:
- Age range: 2-6 years
- Word count: 450-650 words (target: 550)

You can override these parameters if needed:
- Use '/jester audience clear' to clear active members
- Use '/jester audience select [different_members]' to change selection
- Or continue with current parameters

Continue with current parameters? (y/n)
User: n
Agent: Please select your preferred approach:
1. Clear active members and use default parameters
2. Select different target audience members
3. Manually specify age range and word count

What would you like to do? (1/2/3)
```
