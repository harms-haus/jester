<!-- Powered by BMAD™ Core -->

# Audience Profile Editing

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

#### Birthday Editing
**Prompt:**
```
Current birthday: [current_birthday] (age [current_age])
New birthday: [user_input]

Validation:
- Must be valid date format
- Cannot be in the future
- Should be reasonable (not too far in past)
```

#### Length Preferences Editing
**Prompt:**
```
Current length preferences: [min]-[max] words (target: [target])

New preferences:
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

#### Theme Preferences Editing
**Prompt:**
```
Current themes: [current_themes]

Select new themes (or specify custom):
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

#### Character Preferences Editing
**Prompt:**
```
Current characters: [current_characters]

Select new character types:
- Brave Heroes
- Clever Problem Solvers
- Friendly Animals
- Magical Creatures
- Family Members
- Teachers & Mentors
- Custom: [user_input]
```

#### Setting Preferences Editing
**Prompt:**
```
Current settings: [current_settings]

Select new settings:
- Magical Forests
- Cozy Homes
- Mysterious Caves
- Underwater Worlds
- Space Adventures
- Historical Places
- Custom: [user_input]
```

### 4. Profile Update
**Update Profile:**
```yaml
name: [updated_name]
birthday: [updated_birthday]
age: [recalculated_age]
preferences:
  length:
    min: [updated_min_words]
    max: [updated_max_words]
    target: [updated_target_words]
  themes: [updated_themes]
  characters: [updated_characters]
  settings: [updated_settings]
created_at: [original_created_at]
last_modified: [new_timestamp]
```

### 5. Confirmation
**Display Updated Profile:**
```
✅ Profile updated successfully for [name]!

Updated Profile:
- Name: [name]
- Age: [age]
- Story Length: [min]-[max] words (target: [target])
- Themes: [themes]
- Characters: [characters]
- Settings: [settings]
- Last Modified: [timestamp]

Profile saved to .memory/target-audience-profiles.yaml
```

## Validation Rules

### Name Validation
- Must be non-empty string
- Must be unique within system (if changed)
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

### Preference Validation
- Themes, characters, and settings should be from approved lists or custom
- Custom entries should be reasonable and appropriate
- All preferences should be age-appropriate