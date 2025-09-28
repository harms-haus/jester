

# Audience Parameter Calculation

## Purpose

Calculate and optimize story parameters based on target audience profiles for personalized content generation.

## Parameter Types

### 1. Length Parameters

#### Word Count Calculation
**Base Calculation:**
```pseudocode
calculateWordCount(age, preferences):
  baseLength = preferences.length.target
  
  // Age adjustments
  if age < 3: baseLength *= 0.7  // Very short for toddlers
  if age >= 3 and age < 5: baseLength *= 0.8  // Short for preschoolers
  if age >= 5 and age < 8: baseLength *= 1.0  // Standard for school age
  if age >= 8 and age < 12: baseLength *= 1.2  // Longer for older kids
  if age >= 12: baseLength *= 1.5  // Much longer for teens
  
  // Ensure within bounds
  finalLength = clamp(baseLength, preferences.length.min, preferences.length.max)
  
  return finalLength
```

#### Reading Time Estimation
**Calculation:**
```pseudocode
estimateReadingTime(wordCount, age):
  // Average reading speeds by age
  if age < 5: wordsPerMinute = 50  // Picture book pace
  if age >= 5 and age < 8: wordsPerMinute = 100  // Early reader
  if age >= 8 and age < 12: wordsPerMinute = 150  // Fluent reader
  if age >= 12: wordsPerMinute = 200  // Advanced reader
  
  readingTime = wordCount / wordsPerMinute
  return readingTime
```

### 2. Complexity Parameters

#### Language Complexity
**Calculation:**
```pseudocode
calculateLanguageComplexity(age):
  if age < 3: return "very_simple"  // Single words, short phrases
  if age >= 3 and age < 5: return "simple"  // Short sentences
  if age >= 5 and age < 8: return "moderate"  // Varied sentences
  if age >= 8 and age < 12: return "complex"  // Complex sentences
  if age >= 12: return "advanced"  // Sophisticated language
```

#### Sentence Structure
**Parameters:**
- **Very Simple**: 3-5 words per sentence, simple structure
- **Simple**: 5-8 words per sentence, basic structure
- **Moderate**: 8-12 words per sentence, varied structure
- **Complex**: 12-18 words per sentence, complex structure
- **Advanced**: 18+ words per sentence, sophisticated structure

#### Vocabulary Level
**Calculation:**
```pseudocode
calculateVocabularyLevel(age):
  if age < 3: return "basic"  // Common words only
  if age >= 3 and age < 5: return "simple"  // Common + some descriptive
  if age >= 5 and age < 8: return "intermediate"  // Varied vocabulary
  if age >= 8 and age < 12: return "advanced"  // Rich vocabulary
  if age >= 12: return "sophisticated"  // Complex vocabulary
```

### 3. Content Parameters

#### Theme Complexity
**Calculation:**
```pseudocode
calculateThemeComplexity(age, themes):
  baseComplexity = 1
  
  // Age-based complexity
  if age < 5: baseComplexity = 1  // Simple themes
  if age >= 5 and age < 8: baseComplexity = 2  // Moderate themes
  if age >= 8 and age < 12: baseComplexity = 3  // Complex themes
  if age >= 12: baseComplexity = 4  // Sophisticated themes
  
  // Theme-based adjustments
  for theme in themes:
    if theme in ["friendship", "family"]: baseComplexity += 0.5
    if theme in ["adventure", "problem_solving"]: baseComplexity += 1
    if theme in ["magic", "fantasy"]: baseComplexity += 1.5
    if theme in ["mystery", "science"]: baseComplexity += 2
  
  return clamp(baseComplexity, 1, 5)
```

#### Character Complexity
**Calculation:**
```pseudocode
calculateCharacterComplexity(age, characterCount):
  baseComplexity = 1
  
  // Age-based complexity
  if age < 5: baseComplexity = 1  // Simple characters
  if age >= 5 and age < 8: baseComplexity = 2  // Moderate characters
  if age >= 8 and age < 12: baseComplexity = 3  // Complex characters
  if age >= 12: baseComplexity = 4  // Sophisticated characters
  
  // Character count adjustments
  if characterCount > 3: baseComplexity += 1
  if characterCount > 5: baseComplexity += 1
  
  return clamp(baseComplexity, 1, 5)
```

### 4. Engagement Parameters

#### Attention Span
**Calculation:**
```pseudocode
calculateAttentionSpan(age):
  if age < 3: return 5  // 5 minutes
  if age >= 3 and age < 5: return 10  // 10 minutes
  if age >= 5 and age < 8: return 15  // 15 minutes
  if age >= 8 and age < 12: return 20  // 20 minutes
  if age >= 12: return 30  // 30 minutes
```

#### Interaction Level
**Calculation:**
```pseudocode
calculateInteractionLevel(age):
  if age < 5: return "high"  // Lots of interaction
  if age >= 5 and age < 8: return "moderate"  // Some interaction
  if age >= 8 and age < 12: return "low"  // Minimal interaction
  if age >= 12: return "minimal"  // Very little interaction
```

### 5. Parameter Optimization

#### Multi-Profile Optimization
**Process:**
1. Calculate parameters for each profile
2. Find common ground between profiles
3. Optimize for the most restrictive constraints
4. Balance competing requirements

**Optimization Function:**
```pseudocode
optimizeParameters(profiles):
  if length(profiles) == 1: return calculateParameters(profiles[0])
  
  // Find common constraints
  minLength = max(profiles.map(p => p.preferences.length.min))
  maxLength = min(profiles.map(p => p.preferences.length.max))
  commonThemes = intersect(profiles.map(p => p.preferences.themes))
  
  // Calculate optimal parameters
  optimalLength = (minLength + maxLength) / 2
  optimalComplexity = average(profiles.map(p => calculateComplexity(p.age)))
  optimalThemes = commonThemes.length > 0 ? commonThemes : union(profiles.map(p => p.preferences.themes))
  
  return {
    length: optimalLength,
    complexity: optimalComplexity,
    themes: optimalThemes,
    attentionSpan: min(profiles.map(p => calculateAttentionSpan(p.age)))
  }
```

### 6. Parameter Validation

#### Validation Rules
- Length must be within age-appropriate bounds
- Complexity must match age capabilities
- Themes must be age-appropriate
- Parameters must be internally consistent

#### Validation Function
```pseudocode
validateParameters(parameters, age):
  issues = []
  
  if parameters.length < getMinLength(age):
    issues.append("Length too short for age")
  if parameters.length > getMaxLength(age):
    issues.append("Length too long for age")
  if parameters.complexity > getMaxComplexity(age):
    issues.append("Complexity too high for age")
  if not areThemesAppropriate(parameters.themes, age):
    issues.append("Themes not appropriate for age")
  
  return { valid: length(issues) == 0, issues: issues }
```

### 7. Parameter Results

#### Success Response
```yaml
parameter_calculation:
  success: true
  parameters:
    length: [calculated_length]
    complexity: [calculated_complexity]
    themes: [selected_themes]
    attention_span: [calculated_attention_span]
    interaction_level: [calculated_interaction_level]
  validation:
    valid: true
    warnings: [any_warnings]
```

#### Parameter Summary
```
✅ Parameters calculated successfully!

Calculated Parameters:
- Story Length: [length] words (~[reading_time] minutes)
- Language Complexity: [complexity_level]
- Theme Complexity: [theme_complexity]
- Character Complexity: [character_complexity]
- Attention Span: [attention_span] minutes
- Interaction Level: [interaction_level]

Validation: ✅ All parameters age-appropriate
```