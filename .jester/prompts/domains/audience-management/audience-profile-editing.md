# Target Audience Profile Editing Prompt

## Purpose
Guide the editing of existing target audience member profiles with comprehensive validation and user-friendly prompts.

## Process Flow

### 1. Profile Lookup
When user provides `/jester audience edit [name]`:

**Load Profile:**
1. Load all profiles from `.memory/target-audience-profiles.yaml`
2. Find profile with matching name (case-insensitive)
3. If not found, show error and suggest available profiles

**Error Messages:**
- Profile not found: "No profile found with name '[name]'. Use '/jester audience list' to see available profiles."
- Multiple matches: "Multiple profiles found matching '[name]'. Please be more specific or use the exact name."

### 2. Display Current Profile
**Show Profile Information:**
```
Editing profile for [name] (age [calculated_age]):

Current Profile:
- Name: [name]
- Birthday: [birthday] (age [age])
- Preferred Length: [min]-[max] words (target: [target])
- Themes: [themes]
- Characters: [characters]
- Settings: [settings]
- Created: [created_at]
- Last Modified: [last_modified]

What would you like to edit? (name/birthday/length/themes/characters/settings/all)
```

### 3. Field-by-Field Editing

#### Name Editing
**Prompt:**
```
Current name: [current_name]
New name: [user_input]

Validation:
- Name must be non-empty
- Name must be unique (not already used by another profile)
- Name should be reasonable (not too long or containing special characters)
```

**Error Messages:**
- Empty name: "Name cannot be empty. Please provide a valid name."
- Duplicate name: "A profile with name '[new_name]' already exists. Please choose a different name."

#### Birthday Editing
**Prompt:**
```
Current birthday: [current_birthday] (age [current_age])
New birthday (YYYY-MM-DD): [user_input]

Validation:
- Must be valid ISO date format
- Cannot be in the future
- Should be reasonable (not too far in the past)
```

**Error Messages:**
- Invalid format: "Please provide a valid birthday in YYYY-MM-DD format. Example: 2019-03-15"
- Future date: "Birthday cannot be in the future. Please provide a valid past date."
- Unreasonable date: "Please provide a reasonable birthday date."

#### Length Preferences Editing
**Prompt:**
```
Current preferred length: [min]-[max] words (target: [target])
New preferred length:
- Minimum words: [user_input]
- Maximum words: [user_input]
- Target words: [user_input]

Age-appropriate guidelines:
- Ages 2-3: 200-400 words (target: 300)
- Ages 4-5: 400-800 words (target: 600)
- Ages 6-7: 600-1000 words (target: 800)
- Ages 8-9: 800-1200 words (target: 1000)
- Ages 10+: 1000-1500 words (target: 1250)
```

**Validation:**
- All values must be positive integers
- Minimum ≤ target ≤ maximum
- Values should be reasonable for the age

**Error Messages:**
- Invalid range: "Word count ranges must be logical: min ≤ target ≤ max. Please check your values."
- Unreasonable values: "Please provide reasonable word counts for age [age]."

#### Themes Editing
**Prompt:**
```
Current themes: [current_themes]
New themes (comma-separated): [user_input]

Popular themes include:
- adventure, friendship, animals, magic, family, learning, problem-solving, creativity, kindness, courage

You can also add custom themes. Examples:
- adventure, friendship, animals
- magic, family, learning
- problem-solving, creativity, kindness
```

**Processing:**
- Split by commas
- Trim whitespace
- Remove duplicates
- Convert to lowercase
- Validate themes are reasonable

#### Characters Editing
**Prompt:**
```
Current characters: [current_characters]
New characters (comma-separated): [user_input]

Available characters from the universe:
- brave, stella-stoat, theo-bear, lily, oliver-owl, ember-fox, aurora-arctis, benny-shark, freddie-fish, giggly-stream, gruff-goat, kevin-cupcake, mira-meadow-mouse, molly-mole, patricia-pirate, pink-axolotl, poe-raven, polly, rascal, scurry, sir-sammy-sandwich, starlight-unicorn, steve, tigress-tess, wally-wolf, wendy-whisk, wilma-worm, zephyr-falcon

You can also add custom characters. Examples:
- brave, stella-stoat, theo-bear
- lily, oliver-owl, ember-fox
- custom-character-name
```

**Processing:**
- Split by commas
- Trim whitespace
- Remove duplicates
- Convert to lowercase
- Validate characters are reasonable

#### Settings Editing
**Prompt:**
```
Current settings: [current_settings]
New settings (comma-separated): [user_input]

Available settings from the universe:
- forest, village, magical-places, underwater, sky, mountain, garden, library, kitchen, playground, bedroom, school, park, beach, farm, castle, cave, treehouse, meadow, stream, pond, field, woods, clearing, path, bridge, house, yard, street, neighborhood

You can also add custom settings. Examples:
- forest, village, magical-places
- underwater, sky, mountain
- custom-setting-name
```

**Processing:**
- Split by commas
- Trim whitespace
- Remove duplicates
- Convert to lowercase
- Validate settings are reasonable

### 4. All Fields Editing
**Prompt:**
```
Editing all fields for [name]:

1. Name: [current_name] → [new_name]
2. Birthday: [current_birthday] → [new_birthday]
3. Preferred Length: [current_min]-[current_max] (target: [current_target]) → [new_min]-[new_max] (target: [new_target])
4. Themes: [current_themes] → [new_themes]
5. Characters: [current_characters] → [new_characters]
6. Settings: [current_settings] → [new_settings]

Please provide new values for each field (press Enter to keep current value):
```

### 5. Validation and Confirmation
**Validate All Changes:**
1. Check all new values are valid
2. Ensure no conflicts with existing profiles
3. Validate age calculation from new birthday
4. Check word count ranges are logical

**Confirmation Prompt:**
```
Profile changes validated successfully!

Updated Profile:
- Name: [new_name]
- Birthday: [new_birthday] (age [new_age])
- Preferred Length: [new_min]-[new_max] words (target: [new_target])
- Themes: [new_themes]
- Characters: [new_characters]
- Settings: [new_settings]

Save these changes? (y/n)
```

### 6. Save Changes
**Update Profile:**
1. Update profile with new values
2. Update metadata (last_modified, version)
3. Save to `.memory/target-audience-profiles.yaml`
4. If profile is active, recalculate parameters

**Success Message:**
```
Profile updated successfully!

Changes saved:
- [list of changed fields]

Profile ID: [id]
Last Modified: [timestamp]

[If active member] Parameters have been recalculated for all active members.
```

### 7. Active Member Recalculation
**If edited profile is active:**
1. Recalculate parameters for all active members
2. Update calculated_parameters in memory
3. Display new calculated parameters

**Recalculation Message:**
```
Since [name] is an active member, parameters have been recalculated:

Current active members: [active_member_names]
New calculated parameters:
- Age range: [new_age_range]
- Word count: [new_word_count]
- Method: [calculation_method]
- Last updated: [timestamp]
```

## Error Handling

### Profile Lookup Errors
- **Profile not found**: "No profile found with name '[name]'. Use '/jester audience list' to see available profiles."
- **Multiple matches**: "Multiple profiles found matching '[name]'. Please be more specific or use the exact name."
- **Empty name**: "Please provide a name to edit. Usage: '/jester audience edit [name]'"

### Validation Errors
- **Invalid input**: Provide specific error message and example of correct format
- **Conflicting data**: Explain the conflict and suggest resolution
- **Missing required fields**: Prompt for missing information with clear guidance

### Save Errors
- **File system error**: "Unable to save profile changes. Please check file permissions and try again."
- **Corrupted data**: "Profile data appears corrupted. Please recreate the profile."
- **Permission denied**: "Unable to write to memory file. Please check file permissions."

### Recovery Actions
- **Partial save failure**: Allow user to retry with corrected information
- **Data corruption**: Offer to restore from backup or recreate
- **Validation failure**: Guide user to fix invalid data

## Examples

### Successful Editing
```
User: /jester audience edit Zoe
Agent: Editing profile for Zoe (age 5):

Current Profile:
- Name: Zoe
- Birthday: 2019-03-15 (age 5)
- Preferred Length: 700-900 words (target: 800)
- Themes: adventure, friendship, animals
- Characters: brave, stella-stoat, theo-bear
- Settings: forest, village, magical-places
- Created: 2024-12-19T10:30:00Z
- Last Modified: 2024-12-19T10:30:00Z

What would you like to edit? (name/birthday/length/themes/characters/settings/all)
User: length
Agent: Current preferred length: 700-900 words (target: 800)
New preferred length:
- Minimum words: 600
- Maximum words: 1000
- Target words: 800

Profile updated successfully!

Changes saved:
- Preferred Length: 700-900 → 600-1000 words (target: 800)

Profile ID: zoe-1703001234567
Last Modified: 2024-12-19T11:15:00Z

Since Zoe is an active member, parameters have been recalculated:

Current active members: Zoe, Max
New calculated parameters:
- Age range: 2-6 years
- Word count: 450-650 words (target: 550)
- Method: overlap_range
- Last updated: 2024-12-19T11:15:00Z
```

### Error Handling
```
User: /jester audience edit John
Agent: No profile found with name 'John'. Use '/jester audience list' to see available profiles.

User: /jester audience edit Zoe
Agent: Editing profile for Zoe (age 5):
...
User: length
Agent: Current preferred length: 700-900 words (target: 800)
New preferred length:
- Minimum words: 1000
- Maximum words: 500
- Target words: 750

Agent: Word count ranges must be logical: min ≤ target ≤ max. Please check your values.
- Minimum words: 600
- Maximum words: 1000
- Target words: 800
```
