

# Audience Validation

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
  if length(name) < 1 or length(name) > 50: return { valid: false, error: "Name must be 1-50 characters" }
  if containsSpecialChars(name): return { valid: false, error: "Name cannot contain special characters" }
  if nameExists(name): return { valid: false, error: "Name already exists" }
  return { valid: true }
```

#### Birthday Validation
**Rules:**
- Must be valid date format
- Cannot be in the future
- Should be reasonable (not too far in past)
- Should result in reasonable age

**Validation Function:**
```pseudocode
validateBirthday(birthday):
  if not isValidDate(birthday): return { valid: false, error: "Invalid date format" }
  if birthday > today: return { valid: false, error: "Birthday cannot be in the future" }
  age = calculateAge(birthday)
  if age < 0 or age > 120: return { valid: false, error: "Age must be reasonable (0-120)" }
  return { valid: true, age: age }
```

#### Length Preferences Validation
**Rules:**
- Minimum must be positive integer
- Maximum must be greater than minimum
- Target should be between min and max
- Values should be age-appropriate

**Validation Function:**
```pseudocode
validateLengthPreferences(min, max, target, age):
  if not isPositiveInteger(min): return { valid: false, error: "Minimum must be positive integer" }
  if not isPositiveInteger(max): return { valid: false, error: "Maximum must be positive integer" }
  if not isPositiveInteger(target): return { valid: false, error: "Target must be positive integer" }
  if max <= min: return { valid: false, error: "Maximum must be greater than minimum" }
  if target < min or target > max: return { valid: false, error: "Target must be between min and max" }
  if not isAgeAppropriate(min, max, target, age): return { valid: false, error: "Length preferences not age-appropriate" }
  return { valid: true }
```

### 2. Profile Validation

#### Complete Profile Validation
**Rules:**
- All required fields must be present
- All fields must pass individual validation
- Profile must be internally consistent
- Profile must be unique within system

**Validation Function:**
```pseudocode
validateProfile(profile):
  // Check required fields
  if not profile.name: return { valid: false, error: "Name is required" }
  if not profile.birthday: return { valid: false, error: "Birthday is required" }
  if not profile.preferences: return { valid: false, error: "Preferences are required" }
  
  // Validate individual fields
  nameResult = validateName(profile.name)
  if not nameResult.valid: return nameResult
  
  birthdayResult = validateBirthday(profile.birthday)
  if not birthdayResult.valid: return birthdayResult
  
  lengthResult = validateLengthPreferences(
    profile.preferences.length.min,
    profile.preferences.length.max,
    profile.preferences.length.target,
    birthdayResult.age
  )
  if not lengthResult.valid: return lengthResult
  
  return { valid: true }
```

### 3. System Validation

#### File System Validation
**Rules:**
- Target audience profiles file must exist
- File must be valid YAML format
- File must contain valid profile data
- File must be writable

**Validation Function:**
```pseudocode
validateFileSystem():
  if not fileExists(".memory/target-audience-profiles.yaml"): 
    return { valid: false, error: "Target audience profiles file not found" }
  
  try:
    profiles = loadYAML(".memory/target-audience-profiles.yaml")
  except:
    return { valid: false, error: "Invalid YAML format in profiles file" }
  
  if not isWritable(".memory/target-audience-profiles.yaml"):
    return { valid: false, error: "Profiles file is not writable" }
  
  return { valid: true, profiles: profiles }
```

### 4. Error Handling

#### Error Recovery
**Common Errors and Solutions:**
- File not found: Create new file with empty profiles array
- Invalid YAML: Backup file and create new one
- Permission denied: Check file permissions and suggest fix
- Duplicate names: Suggest alternative names or editing existing profile

#### Error Messages
**User-Friendly Error Messages:**
- "Profile file not found. Creating new file..."
- "Invalid date format. Please use YYYY-MM-DD format."
- "Name already exists. Use '/jester audience edit [name]' to update existing profile."
- "Length preferences not age-appropriate. Please check the guidelines."

### 5. Validation Results

#### Success Response
```yaml
validation_result:
  valid: true
  message: "Validation successful"
  profile: [validated_profile]
  warnings: [any_warnings]
```

#### Error Response
```yaml
validation_result:
  valid: false
  error: "Error message"
  field: "field_name"
  suggestion: "Suggested fix"
  recovery: "Recovery action"
```