

# Audience Profile Creation

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
- Target should be between min and max
- All values should be reasonable for age

### 4. Theme Preferences
**Prompt for Theme Preferences:**
```
What themes does [name] enjoy in stories?

Select from common themes (or specify custom):
- Adventure & Exploration
- Friendship & Relationships
- Problem Solving
- Magic & Fantasy
- Animals & Nature
- Learning & Discovery
- Family & Home
- Creativity & Imagination
- Custom: [user_input]
```

### 5. Character Preferences
**Prompt for Character Preferences:**
```
What types of characters does [name] like?

Select from common character types:
- Brave Heroes
- Clever Problem Solvers
- Friendly Animals
- Magical Creatures
- Family Members
- Teachers & Mentors
- Custom: [user_input]
```

### 6. Setting Preferences
**Prompt for Setting Preferences:**
```
What settings does [name] enjoy?

Select from common settings:
- Magical Forests
- Cozy Homes
- Mysterious Caves
- Underwater Worlds
- Space Adventures
- Historical Places
- Custom: [user_input]
```

### 7. Profile Creation
**Create Profile:**
```yaml
name: [name]
birthday: [birthday]
age: [calculated_age]
preferences:
  length:
    min: [min_words]
    max: [max_words]
    target: [target_words]
  themes: [selected_themes]
  characters: [selected_characters]
  settings: [selected_settings]
created_at: [timestamp]
last_modified: [timestamp]
```

### 8. Confirmation
**Display Created Profile:**
```
✅ Profile created successfully for [name]!

Profile Summary:
- Name: [name]
- Age: [age]
- Story Length: [min]-[max] words (target: [target])
- Themes: [themes]
- Characters: [characters]
- Settings: [settings]

Profile saved to .memory/target-audience-profiles.yaml
```

## Validation Rules

### Name Validation
- Must be non-empty string
- Must be unique within system
- Should be reasonable length (1-50 characters)
- Should not contain special characters

### Birthday Validation
- Must be valid date format
- Cannot be in the future
- Should be reasonable (not too far in past)

### Length Validation
- Minimum must be positive integer
- Maximum must be greater than minimum
- Target should be between min and max
- Values should be age-appropriate