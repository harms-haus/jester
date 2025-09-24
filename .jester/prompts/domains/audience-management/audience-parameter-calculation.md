# Target Audience Parameter Calculation Prompt

## Purpose
Implement the sophisticated parameter calculation algorithms for target audience management, including age range calculation and the advanced word count overlap range algorithm.

## Age Range Calculation

### Algorithm
```pseudocode
calculateAgeRange(activeMembers):
  if activeMembers.length == 0: return null
  
  ages = activeMembers.map(member => calculateAge(member.birthday))
  minAge = min(ages)
  maxAge = max(ages)
  
  return {
    min_age: minAge,
    max_age: maxAge,
    expanded_range: { min_age: max(0, minAge - 1), max_age: maxAge + 1 }
  }

calculateAge(birthday):
  return (today - birthday) / (365.25 * 24 * 60 * 60 * 1000)
```

### Display Format
```
Age Range Calculation:
- Individual ages: [age1], [age2], [age3]
- Combined range: [min_age]-[max_age]
- Expanded range: [expanded_min]-[expanded_max] (with wiggle room)
```

## Word Count Calculation (Sophisticated Overlap Range Algorithm)

### Main Algorithm
```pseudocode
calculateTargetLength(activeMembers):
  if activeMembers.length == 0: return null
  if activeMembers.length == 1: return singleMemberCalculation(activeMembers[0])
  
  overlapRange = findOverlapRange(activeMembers)
  if overlapRange:
    centeredRange = centerRangeAroundOverlap(overlapRange, 200)
    outerRange = findOuterRange(activeMembers)
    if centeredRange.exceeds(outerRange):
      return { range: adjustRangeToFit(centeredRange, outerRange), method: 'overlap_range', adjustments: { applied: true, reason: 'exceeded_outer_range' } }
    else:
      return { range: centeredRange, method: 'overlap_range', adjustments: { applied: false } }
  else:
    return { range: createRangeAroundCenter(averageCenters(activeMembers), 200), method: 'average_centers', adjustments: { applied: false } }
```

### Helper Functions

#### Find Overlap Range
```pseudocode
findOverlapRange(members):
  maxMin = max(members.map(m => m.preferred_length.min_words))
  minMax = min(members.map(m => m.preferred_length.max_words))
  return maxMin <= minMax ? { min_words: maxMin, max_words: minMax } : null
```

#### Center Range Around Overlap
```pseudocode
centerRangeAroundOverlap(overlapRange, minWords):
  overlapSize = overlapRange.max_words - overlapRange.min_words
  if overlapSize < minWords:
    expansion = (minWords - overlapSize) / 2
    return { min_words: max(0, overlapRange.min_words - expansion), max_words: overlapRange.max_words + expansion }
  else:
    return { min_words: max(0, overlapRange.min_words - 50), max_words: overlapRange.max_words + 50 }
```

#### Find Outer Range
```pseudocode
findOuterRange(members):
  return { min_words: min(members.map(m => m.preferred_length.min_words)), max_words: max(members.map(m => m.preferred_length.max_words)) }
```

#### Adjust Range to Fit
```pseudocode
adjustRangeToFit(centeredRange, outerRange):
  excess = 0
  if centeredRange.min_words < outerRange.min_words:
    excess += outerRange.min_words - centeredRange.min_words
    centeredRange.min_words = outerRange.min_words
  if centeredRange.max_words > outerRange.max_words:
    excess += centeredRange.max_words - outerRange.max_words
    centeredRange.max_words = outerRange.max_words
  if excess > 0:
    centeredRange.min_words -= floor(excess / 2)
    centeredRange.max_words += ceil(excess / 2)
  return centeredRange
```

#### Average Centers
```pseudocode
averageCenters(members):
  return round(sum(members.map(m => m.preferred_length.target_words)) / members.length)
```

#### Create Range Around Center
```pseudocode
createRangeAroundCenter(center, minWords):
  return { min_words: max(0, center - minWords/2), max_words: center + minWords/2 }
```

#### Single Member Calculation
```pseudocode
singleMemberCalculation(member):
  return { range: member.preferred_length, method: 'single_member', adjustments: { applied: false } }
```

## Calculation Examples

### Example 1: With Overlap
**Members:**
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)

**Calculation:**
1. **Overlap range**: 500-600 words (100 words)
2. **Minimum range requirement**: 200 words
3. **Centered range**: 500-600 ± 50 = 450-650
4. **Outer range**: 400-700
5. **Validation**: 450-650 fits within 400-700 ✓
6. **Final result**: 450-650 words (target: 550)

**Display:**
```
Word Count Calculation:
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)
- Overlap range: 500-600 words (100 words)
- Minimum range requirement: 200 words
- Centered range: 450-650 words
- Final target: 550 words
- Method: overlap_range
- Adjustments: none
```

### Example 2: No Overlap
**Members:**
- Child-001: 400-600 words (target: 500)
- Child-002: 800-1000 words (target: 900)

**Calculation:**
1. **Overlap range**: None (600 < 800)
2. **Average centers**: (500 + 900) / 2 = 700
3. **Create range**: 700 ± 100 = 600-800
4. **Final result**: 600-800 words (target: 700)

**Display:**
```
Word Count Calculation:
- Child-001: 400-600 words (target: 500)
- Child-002: 800-1000 words (target: 900)
- Overlap range: None
- Average centers: 700 words
- Final range: 600-800 words
- Final target: 700 words
- Method: average_centers
- Adjustments: none
```

### Example 3: Boundary Adjustment
**Members:**
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)

**Calculation:**
1. **Overlap range**: 500-600 words (100 words)
2. **Centered range**: 500-600 ± 50 = 450-650
3. **Outer range**: 400-700
4. **Validation**: 450-650 fits within 400-700 ✓
5. **Final result**: 450-650 words (target: 550)

**Display:**
```
Word Count Calculation:
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)
- Overlap range: 500-600 words (100 words)
- Minimum range requirement: 200 words
- Centered range: 450-650 words
- Outer range: 400-700 words
- Final target: 550 words
- Method: overlap_range
- Adjustments: none
```

### Example 4: Boundary Exceeded
**Members:**
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)

**Hypothetical outer range constraint: 400-600**

**Calculation:**
1. **Overlap range**: 500-600 words (100 words)
2. **Centered range**: 500-600 ± 50 = 450-650
3. **Outer range**: 400-600 (constrained)
4. **Validation**: 450-650 exceeds 400-600 ✗
5. **Adjustment**: Redistribute excess
   - Excess: 50 words (650 - 600)
   - Adjusted: 400-600
6. **Final result**: 400-600 words (target: 500)

**Display:**
```
Word Count Calculation:
- Child-001: 400-600 words (target: 500)
- Child-002: 500-700 words (target: 600)
- Overlap range: 500-600 words (100 words)
- Minimum range requirement: 200 words
- Centered range: 450-650 words
- Outer range: 400-600 words (constrained)
- Adjustment applied: exceeded_outer_range
- Final range: 400-600 words
- Final target: 500 words
- Method: overlap_range
- Adjustments: applied (exceeded_outer_range)
```

## Parameter Display Format

### Complete Parameter Display
```
Calculated Parameters for Active Members: [member_names]

Age Range Calculation:
- Individual ages: [age1], [age2], [age3]
- Combined range: [min_age]-[max_age]
- Expanded range: [expanded_min]-[expanded_max] (with wiggle room)

Word Count Calculation:
- [Member1]: [min]-[max] words (target: [target])
- [Member2]: [min]-[max] words (target: [target])
- [Member3]: [min]-[max] words (target: [target])
- Overlap range: [overlap_min]-[overlap_max] words ([overlap_size] words)
- Minimum range requirement: 200 words
- Centered range: [centered_min]-[centered_max] words
- Outer range: [outer_min]-[outer_max] words
- Final range: [final_min]-[final_max] words
- Final target: [final_target] words
- Method: [calculation_method]
- Adjustments: [adjustment_status]

Last calculated: [timestamp]
```

### Summary Display
```
Active members: [member_names]
Calculated parameters:
- Age range: [expanded_min]-[expanded_max] years
- Word count: [final_min]-[final_max] words (target: [final_target])
- Method: [calculation_method]
- Last updated: [timestamp]
```

## Error Handling

### Calculation Errors
- **No active members**: "No active target audience members. Use '/jester audience select' to choose members."
- **Invalid member data**: "Some member profiles have invalid data. Please check and update profiles."
- **Calculation failure**: "Unable to calculate parameters. Please check member profiles and try again."

### Validation Errors
- **Invalid word counts**: "Member [name] has invalid word count preferences. Please update the profile."
- **Missing preferences**: "Member [name] is missing required preferences. Please complete the profile."
- **Corrupted data**: "Profile data appears corrupted. Please recreate the profile."

### Recovery Actions
- **Partial calculation failure**: Calculate parameters for valid members only
- **Data corruption**: Offer to recreate corrupted profiles
- **Validation failure**: Guide user to fix invalid data

## Integration Points

### Memory System
- Load active members from `.memory/target-audience-profiles.yaml`
- Save calculated parameters to memory
- Update calculation timestamps

### Story Generation
- Provide calculated parameters to context generation
- Include calculation method and adjustments in metadata
- Ensure story length fits within calculated range

### Context Generation
- Include target audience information in context
- Pass calculated parameters to story generation
- Track parameter source and calculation details
