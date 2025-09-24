# Target Audience Validation Prompt

## Purpose
Provide comprehensive validation for target audience management system, including data validation, error handling, and recovery mechanisms.

## Validation Types

### 1. Input Validation

#### Name Validation
**Rules:**
- Must be non-empty string
- Must be reasonable length (1-50 characters)
- Must not contain special characters that could cause issues
- Must be unique within the system

**Validation Function:**
```pseudocode
validateName(name):
  if not name or not string(name): return { valid: false, error: "Name must be provided" }
  if name.trim().length == 0: return { valid: false, error: "Name cannot be empty" }
  if name.length > 50: return { valid: false, error: "Name must be 50 characters or less" }
  if not match(name, /^[a-zA-Z0-9\s\-']+$/): return { valid: false, error: "Name contains invalid characters" }
  return { valid: true, value: name.trim() }
```

**Error Messages:**
- Empty name: "Name must be provided"
- Too long: "Name must be 50 characters or less"
- Invalid characters: "Name contains invalid characters. Use only letters, numbers, spaces, hyphens, and apostrophes"

#### Birthday Validation
**Rules:**
- Must be valid ISO date format (YYYY-MM-DD)
- Cannot be in the future
- Must be reasonable (not too far in the past)
- Must result in reasonable age (0-18 years)

**Validation Function:**
```pseudocode
validateBirthday(birthday):
  if not birthday or not string(birthday): return { valid: false, error: "Birthday must be provided" }
  if not match(birthday, /^\d{4}-\d{2}-\d{2}$/): return { valid: false, error: "Birthday must be in YYYY-MM-DD format" }
  
  birthDate = parseDate(birthday)
  today = now()
  
  if not validDate(birthDate): return { valid: false, error: "Invalid date" }
  if birthDate > today: return { valid: false, error: "Birthday cannot be in the future" }
  if birthDate < (today - 18 years): return { valid: false, error: "Birthday is too far in the past" }
  
  return { valid: true, value: birthday }
```

**Error Messages:**
- Invalid format: "Birthday must be in YYYY-MM-DD format. Example: 2019-03-15"
- Invalid date: "Invalid date. Please provide a valid date in YYYY-MM-DD format"
- Future date: "Birthday cannot be in the future. Please provide a valid past date"
- Too old: "Birthday is too far in the past. Please provide a date within the last 18 years"

#### Word Count Validation
**Rules:**
- All values must be positive integers
- Minimum ≤ target ≤ maximum
- Values must be reasonable for the age
- Range must be meaningful (not too narrow or too wide)

**Validation Function:**
```pseudocode
validateWordCounts(minWords, maxWords, targetWords):
  if not integer(minWords) or minWords <= 0: return { valid: false, error: "Minimum words must be a positive integer" }
  if not integer(maxWords) or maxWords <= 0: return { valid: false, error: "Maximum words must be a positive integer" }
  if not integer(targetWords) or targetWords <= 0: return { valid: false, error: "Target words must be a positive integer" }
  if minWords > maxWords: return { valid: false, error: "Minimum words cannot be greater than maximum words" }
  if targetWords < minWords or targetWords > maxWords: return { valid: false, error: "Target words must be between minimum and maximum" }
  if maxWords - minWords < 50: return { valid: false, error: "Word count range is too narrow" }
  if maxWords - minWords > 2000: return { valid: false, error: "Word count range is too wide" }
  return { valid: true, value: { minWords, maxWords, targetWords } }
```

**Error Messages:**
- Invalid integers: "Word count values must be positive integers"
- Invalid ordering: "Word count ranges must be logical: min ≤ target ≤ max"
- Too narrow: "Word count range is too narrow. Minimum range is 50 words"
- Too wide: "Word count range is too wide. Maximum range is 2000 words"

#### Preferences Validation
**Rules:**
- Must be non-empty arrays
- Each item must be non-empty string
- Items must be reasonable length
- No duplicates allowed

**Validation Function:**
```pseudocode
validatePreferences(preferences):
  { themes, characters, settings } = preferences
  
  if not array(themes) or themes.length == 0: return { valid: false, error: "Themes must be non-empty array" }
  if not array(characters) or characters.length == 0: return { valid: false, error: "Characters must be non-empty array" }
  if not array(settings) or settings.length == 0: return { valid: false, error: "Settings must be non-empty array" }
  
  allItems = themes + characters + settings
  for item in allItems:
    if not string(item) or item.trim().length == 0: return { valid: false, error: "All items must be non-empty strings" }
    if item.length > 100: return { valid: false, error: "Items must be 100 characters or less" }
  
  uniqueThemes = unique(themes.map(t => t.toLowerCase().trim()))
  uniqueCharacters = unique(characters.map(c => c.toLowerCase().trim()))
  uniqueSettings = unique(settings.map(s => s.toLowerCase().trim()))
  
  if uniqueThemes.length != themes.length: return { valid: false, error: "Themes contain duplicates" }
  if uniqueCharacters.length != characters.length: return { valid: false, error: "Characters contain duplicates" }
  if uniqueSettings.length != settings.length: return { valid: false, error: "Settings contain duplicates" }
  
  return { valid: true, value: { themes: uniqueThemes, characters: uniqueCharacters, settings: uniqueSettings } }
```

**Error Messages:**
- Empty arrays: "Preferences must be provided as non-empty arrays"
- Invalid items: "All preference items must be non-empty strings"
- Too long: "Preference items must be 100 characters or less"
- Duplicates: "Preferences contain duplicates. Please remove duplicate entries"

### 2. Profile Validation

#### Profile Completeness
**Rules:**
- All required fields must be present
- All fields must be valid
- Profile must be internally consistent

**Validation Function:**
```pseudocode
validateProfile(profile):
  errors = []
  
  if not profile.id: errors.push("Profile ID is required")
  if not profile.name: errors.push("Profile name is required")
  if not profile.birthday: errors.push("Profile birthday is required")
  if not profile.preferred_length: errors.push("Profile preferred length is required")
  if not profile.preferences: errors.push("Profile preferences are required")
  if not profile.metadata: errors.push("Profile metadata is required")
  
  nameValidation = validateName(profile.name)
  if not nameValidation.valid: errors.push(nameValidation.error)
  
  birthdayValidation = validateBirthday(profile.birthday)
  if not birthdayValidation.valid: errors.push(birthdayValidation.error)
  
  if profile.preferred_length:
    wordCountValidation = validateWordCounts(profile.preferred_length.min_words, profile.preferred_length.max_words, profile.preferred_length.target_words)
    if not wordCountValidation.valid: errors.push(wordCountValidation.error)
  
  if profile.preferences:
    preferencesValidation = validatePreferences(profile.preferences)
    if not preferencesValidation.valid: errors.push(preferencesValidation.error)
  
  return { valid: errors.length == 0, errors: errors }
```

#### Profile Uniqueness
**Rules:**
- Profile ID must be unique
- Profile name must be unique (case-insensitive)

**Validation Function:**
```pseudocode
validateProfileUniqueness(profile, existingProfiles):
  errors = []
  
  existingIds = existingProfiles.map(p => p.id)
  if profile.id in existingIds: errors.push("Profile ID already exists")
  
  existingNames = existingProfiles.map(p => p.name.toLowerCase())
  if profile.name.toLowerCase() in existingNames: errors.push("Profile name already exists")
  
  return { valid: errors.length == 0, errors: errors }
```

### 3. System Validation

#### File System Validation
**Rules:**
- Memory directory must exist
- Template files must exist
- File permissions must be correct

**Validation Function:**
```pseudocode
validateFileSystem():
  errors = []
  
  if not exists('.memory'): errors.push("Memory directory (.memory) does not exist")
  if not exists('.jester/templates/memory/target-audience-profiles-template.yaml'): errors.push("Template does not exist")
  if exists('.memory') and not writable('.memory'): errors.push("Memory directory is not writable")
  
  return { valid: errors.length == 0, errors: errors }
```

#### Data Integrity Validation
**Rules:**
- YAML files must be valid
- Data structures must match expected format
- References must be valid

**Validation Function:**
```pseudocode
validateDataIntegrity(profilesData):
  errors = []
  
  if not profilesData.target_audience_profiles: errors.push("Invalid YAML structure: missing target_audience_profiles")
  
  if profilesData.target_audience_profiles:
    { members, active_members, calculated_parameters } = profilesData.target_audience_profiles
    
    if not array(members): errors.push("Members must be an array")
    if not array(active_members): errors.push("Active members must be an array")
    
    if array(active_members) and array(members):
      memberIds = members.map(m => m.id)
      for activeId in active_members:
        if activeId not in memberIds: errors.push("Active member " + activeId + " does not exist in members list")
  
  return { valid: errors.length == 0, errors: errors }
```

### 4. Error Recovery

#### Validation Error Recovery
**Process:**
1. Display validation errors clearly
2. Provide specific guidance for fixing errors
3. Offer to retry validation after fixes
4. Provide fallback options if validation continues to fail

**Error Display:**
```
Validation failed with the following errors:
1. [Error 1]
2. [Error 2]
3. [Error 3]

Please fix these errors and try again:
- [Specific guidance for each error]

Options:
1. Fix errors and retry
2. Use default values
3. Cancel operation

What would you like to do? (1/2/3)
```

#### Data Corruption Recovery
**Process:**
1. Detect data corruption
2. Attempt to recover valid data
3. Offer to restore from backup
4. Provide option to recreate from template

**Recovery Options:**
```
Data corruption detected in target audience profiles.

Recovery options:
1. Attempt to recover valid data (may lose some information)
2. Restore from backup (if available)
3. Recreate from template (will lose all profiles)
4. Continue with default parameters

What would you like to do? (1/2/3/4)
```

### 5. Validation Examples

#### Successful Validation
```
User: /jester audience create Zoe 2019-03-15
Agent: Validating input...

✓ Name validation passed
✓ Birthday validation passed
✓ Age calculation: 5 years old

Creating profile for Zoe (age 5)...
```

#### Validation Errors
```
User: /jester audience create Zoe 2025-01-01
Agent: Validating input...

✗ Birthday validation failed: Birthday cannot be in the future. Please provide a valid past date.

Please provide a valid birthday in YYYY-MM-DD format. Example: 2019-03-15
```

#### Profile Validation
```
User: /jester audience edit Zoe
Agent: Validating profile...

✗ Profile validation failed:
1. Preferred length range is too narrow (minimum range is 50 words)
2. Themes contain duplicates: "adventure" appears twice

Please fix these errors:
- Increase word count range to at least 50 words
- Remove duplicate themes

Options:
1. Fix errors and retry
2. Use default values
3. Cancel operation

What would you like to do? (1/2/3)
```

#### System Validation
```
User: /jester audience list
Agent: Validating system...

✗ System validation failed:
1. Memory directory (.memory) does not exist
2. Target audience profiles template does not exist

Creating missing components...
✓ Memory directory created
✓ Template file created

System validation passed. You can now create target audience profiles.
```
