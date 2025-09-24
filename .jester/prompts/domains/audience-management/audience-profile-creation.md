# Target Audience Profile Creation Prompt

## Purpose
Guide the creation of new target audience member profiles with comprehensive validation and user-friendly prompts.

## Process Flow

### 1. Initial Validation
When user provides `/jester audience create [name] [birthday]`:

**Validate Input:**
- Check if name is provided
- Check if birthday is not in the future
- Check if profile with same name already exists

**Error Messages:**
- Missing name: "Please provide a name for the target audience member. Usage: `/jester audience create [name] [birthday]`"
- Future birthday: "Birthday cannot be in the future. Please provide a valid past date."
- Duplicate name: "A profile with name '[name]' already exists. Use `/jester audience edit [name]` to update it, or choose a different name."

### 2. Age Calculation
**Calculate Current Age:**
```pseudocode
calculateAge(birthday):
  return (today - birthday).milliseconds / (365.25 * 24 * 60 * 60 * 1000)
```

**Display Age:**
"Creating profile for [name] (age [calculated_age])..."

### 3. Story Length Preferences
**Prompt for Word Count Preferences:**
```
What is [name]'s preferred story length?

Please provide:
- Minimum words: [default: age-appropriate minimum]
- Maximum words: [default: age-appropriate maximum]  
- Target words: [default: middle of range]

Age-appropriate guidelines:
- Ages 2-3: 200-400 words (target: 300)
- Ages 4-5: 400-800 words (target: 600)
- Ages 6-7: 600-1000 words (target: 800)
- Ages 8-9: 800-1200 words (target: 1000)
- Ages 10+: 1000-1500 words (target: 1250)
```

**Validation:**
- Minimum must be positive integer
- Maximum must be greater than minimum
- Target must be between minimum and maximum
- All values must be reasonable (not too high or too low)

**Error Messages:**
- Invalid range: "Word count ranges must be logical: min ≤ target ≤ max. Please check your values."
- Unreasonable values: "Please provide reasonable word counts. For age [age], typical ranges are [min]-[max] words."

### 4. Theme Preferences
**Prompt for Themes:**
```
What themes does [name] enjoy? (comma-separated)

Popular themes include:
- adventure, friendship, animals, magic, family, learning, problem-solving, creativity, kindness, courage

You can also add custom themes. Examples:
- adventure, friendship, animals
- magic, family, learning
- problem-solving, creativity, kindness
```

**Validation:**
- Themes must be non-empty
- Remove duplicates
- Trim whitespace
- Convert to lowercase for consistency

### 5. Character Preferences
**Prompt for Characters:**
```
What characters does [name] like? (comma-separated)

Available characters from the universe:
- brave, stella-stoat, theo-bear, lily, oliver-owl, ember-fox, aurora-arctis, benny-shark, freddie-fish, giggly-stream, gruff-goat, kevin-cupcake, mira-meadow-mouse, molly-mole, patricia-pirate, pink-axolotl, poe-raven, polly, rascal, scurry, sir-sammy-sandwich, starlight-unicorn, steve, tigress-tess, wally-wolf, wendy-whisk, wilma-worm, zephyr-falcon

You can also add custom characters. Examples:
- brave, stella-stoat, theo-bear
- lily, oliver-owl, ember-fox
- custom-character-name
```

**Validation:**
- Characters must be non-empty
- Remove duplicates
- Trim whitespace
- Convert to lowercase for consistency

### 6. Setting Preferences
**Prompt for Settings:**
```
What settings does [name] prefer? (comma-separated)

Available settings from the universe:
- forest, village, magical-places, underwater, sky, mountain, garden, library, kitchen, playground, bedroom, school, park, beach, farm, castle, cave, treehouse, meadow, stream, pond, field, woods, clearing, path, bridge, house, yard, street, neighborhood

You can also add custom settings. Examples:
- forest, village, magical-places
- underwater, sky, mountain
- custom-setting-name
```

**Validation:**
- Settings must be non-empty
- Remove duplicates
- Trim whitespace
- Convert to lowercase for consistency

### 7. Profile Creation
**Generate Profile:**
```pseudocode
createProfile(name, birthday, preferences):
  return {
    id: generateUniqueId(name),
    name: name,
    birthday: birthday,
    preferred_length: preferences,
    preferences: preferences,
    metadata: { created_at: now(), last_modified: now(), version: 1 }
  }

generateUniqueId(name):
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + timestamp()
```

### 8. Save and Confirm
**Save Profile:**
1. Load existing profiles from `.memory/target-audience-profiles.yaml`
2. Add new profile to members array
3. Save updated profiles to memory
4. Create file from template if it doesn't exist

**Confirmation Message:**
```
Profile created successfully! 

[name] is now [age] years old and prefers [min]-[max] word stories (target: [target] words).

Preferences:
- Themes: [themes]
- Characters: [characters]  
- Settings: [settings]

Profile ID: [id]
Created: [timestamp]

Would you like to set [name] as an active member for story generation? (y/n)
```

### 9. Active Member Setup
**If user chooses to set as active:**
1. Add member ID to active_members array
2. Recalculate parameters for all active members
3. Save updated active members and calculated parameters
4. Display calculated parameters

**Confirmation:**
```
[name] has been set as an active member for story generation.

Current active members: [active_member_names]
Calculated parameters:
- Age range: [calculated_age_range]
- Word count: [calculated_word_count]
- Method: [calculation_method]

Ready for story generation!
```

## Error Handling

### File System Errors
- **Template not found**: "Unable to find target audience profiles template. Please ensure the system is properly installed."
- **Memory directory not found**: "Unable to access memory directory. Please ensure the system is properly initialized."
- **Save failed**: "Unable to save profile. Please check file permissions and try again."

### Validation Errors
- **Invalid input**: Provide specific error message and example of correct format
- **Missing required fields**: Prompt for missing information with clear guidance
- **Conflicting data**: Explain the conflict and suggest resolution

### Recovery Actions
- **Partial creation failure**: Allow user to retry with corrected information
- **File corruption**: Offer to restore from backup or recreate
- **Permission issues**: Guide user to fix file permissions

## Examples

### Successful Creation
```
User: /jester audience create Zoe 2019-03-15
Agent: Creating profile for Zoe (age 5)...

What is Zoe's preferred story length?
- Minimum words: 700
- Maximum words: 900
- Target words: 800

What themes does Zoe enjoy? (comma-separated)
- adventure, friendship, animals

What characters does Zoe like? (comma-separated)
- brave, stella-stoat, theo-bear

What settings does Zoe prefer? (comma-separated)
- forest, village, magical-places

Profile created successfully! 

Zoe is now 5 years old and prefers 700-900 word stories (target: 800 words).

Preferences:
- Themes: adventure, friendship, animals
- Characters: brave, stella-stoat, theo-bear
- Settings: forest, village, magical-places

Profile ID: zoe-1703001234567
Created: 2024-12-19T10:30:00Z

Would you like to set Zoe as an active member for story generation? (y/n)
```

### Error Handling
```
User: /jester audience create Zoe 2025-01-01
Agent: Birthday cannot be in the future. Please provide a valid past date.

User: /jester audience create Zoe 2019-03-15
Agent: Creating profile for Zoe (age 5)...

What is Zoe's preferred story length?
- Minimum words: 1000
- Maximum words: 500
- Target words: 750

Agent: Word count ranges must be logical: min ≤ target ≤ max. Please check your values.
- Minimum words: 700
- Maximum words: 900
- Target words: 800
```
