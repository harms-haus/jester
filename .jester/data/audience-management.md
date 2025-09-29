# Audience Management

## Purpose

Comprehensive target audience management system for personalized story generation, including profile creation, editing, parameter calculation, and integration.

## Profile Creation

### Process Flow
When user provides `/jester audience create [name] [birthday]`:

**Validate Input:**
- Check if name is provided
- Check if birthday is not in the future
- Check if profile with same name already exists

**Error Messages:**
- Missing name: "Please provide a name for the target audience member. Usage: `/jester audience create [name] [birthday]`"
- Invalid birthday: "Please provide a valid birthday in YYYY-MM-DD format."
- Duplicate name: "A profile with name '[name]' already exists. Use '/jester audience edit [name]' to modify it."

**Profile Creation Steps:**
1. Calculate age from birthday
2. Generate default preferences based on age
3. Create profile structure
4. Save to `.memory/target-audience-profiles.yaml`
5. Confirm creation with user

## Profile Editing

### Process Flow
When user provides `/jester audience edit [name]`:

**Load Profile:**
1. Load all profiles from `.memory/target-audience-profiles.yaml`
2. Find profile with matching name (case-insensitive)
3. If not found, show error and suggest available profiles

**Error Messages:**
- Profile not found: "No profile found with name '[name]'. Use '/jester audience list' to see available profiles."

**Editing Steps:**
1. Display current profile information
2. Allow user to modify specific fields
3. Validate changes
4. Save updated profile
5. Confirm changes with user

## Parameter Calculation

### Length Parameters

#### Word Count Calculation
**Base Calculation:**
```pseudocode
calculateWordCount(age, preferences):
  baseLength = preferences.length.target
  
  // Age adjustments
  if age < 3: baseLength *= 0.7  // Very short for toddlers
  else if age < 5: baseLength *= 0.8  // Short for preschoolers
  else if age < 8: baseLength *= 1.0  // Standard for early readers
  else if age < 12: baseLength *= 1.2  // Longer for middle grade
  else: baseLength *= 1.5  // Longest for young adults
  
  // Preference adjustments
  if preferences.length.short: baseLength *= 0.8
  if preferences.length.long: baseLength *= 1.3
  
  return round(baseLength)
```

#### Reading Time Calculation
```pseudocode
calculateReadingTime(wordCount, age):
  // Average reading speeds by age
  if age < 5: wpm = 20  // Very slow for toddlers
  else if age < 8: wpm = 50  // Slow for early readers
  else if age < 12: wpm = 100  // Moderate for middle grade
  else: wpm = 150  // Fast for young adults
  
  readingTime = wordCount / wpm
  return round(readingTime, 1)
```

### Content Parameters

#### Theme Selection
```pseudocode
selectThemes(age, preferences):
  themes = []
  
  // Age-appropriate themes
  if age < 5:
    themes = ["friendship", "family", "sharing", "kindness"]
  else if age < 8:
    themes = ["adventure", "friendship", "problem-solving", "courage"]
  else if age < 12:
    themes = ["growth", "identity", "challenges", "relationships"]
  else:
    themes = ["self-discovery", "responsibility", "independence", "values"]
  
  // Apply user preferences
  if preferences.themes:
    themes = preferences.themes
  
  return themes
```

#### Character Complexity
```pseudocode
calculateCharacterComplexity(age):
  if age < 5: return "simple"  // 1-2 main characters
  else if age < 8: return "moderate"  // 2-3 main characters
  else if age < 12: return "complex"  // 3-4 main characters
  else: return "advanced"  // 4+ main characters
```

## Integration Points

### Story Generation Integration

#### Profile Selection
**Process:**
1. Load all available profiles from `.memory/target-audience-profiles.yaml`
2. Display profiles with key information
3. Allow user to select one or more profiles
4. Calculate combined preferences for multiple profiles

**Profile Display:**
```
Available Target Audience Members:
1. Emma (Age 6) - Adventure, Friendship themes
2. Liam (Age 4) - Family, Sharing themes
3. Sophia (Age 8) - Problem-solving, Growth themes
```

#### Parameter Application
**Process:**
1. Calculate combined parameters from selected profiles
2. Apply parameters to story generation
3. Adjust content based on calculated preferences
4. Validate final content against audience requirements

### Content Validation Integration

#### Age Appropriateness
**Process:**
1. Check content against age-appropriate guidelines
2. Validate language complexity
3. Ensure themes are suitable
4. Verify character behavior appropriateness

#### Preference Alignment
**Process:**
1. Check content against user preferences
2. Validate theme selection
3. Ensure length requirements are met
4. Verify character complexity matches audience

## Validation System

### Input Validation

#### Name Validation
**Rules:**
- Must be non-empty string
- Must be reasonable length (1-50 characters)
- Must not contain special characters that could cause issues
- Must be unique within the system

#### Birthday Validation
**Rules:**
- Must be valid date in YYYY-MM-DD format
- Must not be in the future
- Must be reasonable (not more than 18 years ago for children)

#### Preference Validation
**Rules:**
- All preference values must be valid
- Theme selections must be age-appropriate
- Length preferences must be reasonable
- Character preferences must be valid

### Data Integrity Validation

#### Profile Consistency
**Checks:**
- All required fields are present
- Data types are correct
- Values are within expected ranges
- Relationships between fields are logical

#### System Integration
**Checks:**
- Profile can be loaded successfully
- Parameters can be calculated correctly
- Integration points work properly
- No conflicts with existing profiles

## Error Handling

### Common Errors
- **Profile not found**: Suggest available profiles
- **Invalid input**: Provide clear error messages
- **Calculation errors**: Fall back to default values
- **Integration failures**: Provide alternative approaches

### Recovery Mechanisms
- **Data corruption**: Restore from backup
- **Calculation failures**: Use default parameters
- **Integration issues**: Provide manual override options
- **Validation failures**: Suggest corrections

