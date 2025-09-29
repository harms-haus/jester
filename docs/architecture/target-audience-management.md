# Target Audience Management System Architecture

## Overview

The Target Audience Management System enhances jester's story generation pipeline by allowing parents to create personalized profiles for their children, with automatic age calculation and intelligent parameter adjustment when multiple children are selected.

## System Architecture

### Core Components

**1. Target Audience Profile Manager**
- **Purpose**: Manages individual target audience member profiles
- **Technology**: YAML configuration files in `.memory/`
- **Key Features**:
  - Member profile creation, editing, and deletion
  - Birthday-based age calculation
  - Preference storage (themes, characters, settings)
  - Profile validation and error handling

**2. Parameter Calculation Engine**
- **Purpose**: Calculates story generation parameters from selected members
- **Technology**: Prompt-based agent logic with mathematical calculations
- **Key Features**:
  - Age range calculation with wiggle room
  - Target word count averaging with flexibility
  - Multi-member parameter aggregation
  - Caching of calculated parameters

**3. Integration Layer**
- **Purpose**: Integrates target audience system with existing story generation pipeline
- **Technology**: Enhanced agent prompts and template modifications
- **Key Features**:
  - Context template integration
  - Story generation parameter injection
  - Backward compatibility maintenance
  - Fallback to default parameters

## Data Flow Architecture

### Profile Management Flow
1. User creates target audience member via `/jester audience create [name] [birthday]`
2. System validates birthday format and calculates current age
3. System prompts for preferred story length and preferences
4. Profile saved to `.memory/target-audience-profiles.yaml` (created from `.jester/templates/memory/target-audience-profiles.yaml` if needed)
5. System confirms profile creation and offers to set as active

### Story Generation Integration Flow
1. User initiates story creation via `/muse create-new`
2. System loads target audience profiles from memory
3. System prompts for target audience member selection
4. Parameter calculation engine processes selected members
5. Calculated parameters injected into context template
6. Story generation proceeds with personalized parameters

### Parameter Calculation Algorithm

**Age Range Calculation:**
```text
For multiple members:
- min_age = minimum(calculated_ages) - 1
- max_age = maximum(calculated_ages) + 1
- expanded_range = [min_age - 1, max_age + 1]

Example: Zoe (5), Max (3)
- min_age = 3 - 1 = 2
- max_age = 5 + 1 = 6
- expanded_range = [2, 6]
```

**Word Count Calculation Algorithm:**
```javascript
function calculateTargetLength(memberPreferences):
  if memberPreferences.length == 1:
    return singleMemberCalculation(memberPreferences[0])
  
  // Step 1: Find overlap range
  overlapRange = findOverlapRange(memberPreferences)
  
  if overlapRange.exists:
    // Step 2: Calculate centered range with minimum 200 words
    centeredRange = centerRangeAroundOverlap(overlapRange, minWords: 200)
    
    // Step 3: Validate against outer range
    outerRange = findOuterRange(memberPreferences)
    if centeredRange.exceeds(outerRange):
      // Step 4: Adjust to fit within outer range
      adjustedRange = adjustRangeToFit(centeredRange, outerRange)
      return {
        range: adjustedRange,
        method: 'overlap_range',
        adjustments: { applied: true, reason: 'exceeded_outer_range' }
      }
    else:
      return {
        range: centeredRange,
        method: 'overlap_range',
        adjustments: { applied: false }
      }
  else:
    // No overlap - average the centers
    averageCenter = averageCenters(memberPreferences)
    return {
      range: createRangeAroundCenter(averageCenter, minWords: 200),
      method: 'average_centers',
      adjustments: { applied: false }
    }

function findOverlapRange(preferences):
  maxMin = max(preferences.map(p => p.min_words))
  minMax = min(preferences.map(p => p.max_words))
  
  if maxMin <= minMax:
    return { min_words: maxMin, max_words: minMax }
  else:
    return null

function centerRangeAroundOverlap(overlapRange, minWords):
  overlapSize = overlapRange.max_words - overlapRange.min_words
  if overlapSize < minWords:
    // Expand to minimum size, centered around overlap
    expansion = (minWords - overlapSize) / 2
    return {
      min_words: overlapRange.min_words - expansion,
      max_words: overlapRange.max_words + expansion
    }
  else:
    // Add ±50 word flexibility around existing overlap
    return {
      min_words: overlapRange.min_words - 50,
      max_words: overlapRange.max_words + 50
    }

function adjustRangeToFit(centeredRange, outerRange):
  excess = 0
  
  if centeredRange.min_words < outerRange.min_words:
    excess += outerRange.min_words - centeredRange.min_words
    centeredRange.min_words = outerRange.min_words
  
  if centeredRange.max_words > outerRange.max_words:
    excess += centeredRange.max_words - outerRange.max_words
    centeredRange.max_words = outerRange.max_words
  
  // Redistribute excess to maintain range size
  if excess > 0:
    centeredRange.min_words -= excess / 2
    centeredRange.max_words += excess / 2
  
  return centeredRange
```

**Target Length Calculation:**
```text
For multiple members:
1. Find overlap range between all member preferences
2. If overlap exists:
   - Calculate overlap range (intersection of all ranges)
   - Ensure minimum range of 200 words
   - Center the range around overlap with ±50 word flexibility
   - Validate against outer range (union of all ranges)
   - Adjust if exceeds outer range boundaries
3. If no overlap exists:
   - Average the target ranges' centers
   - Apply minimum 200-word range

Example 1 - With Overlap: Child-001 (400-600), Child-002 (500-700)
- Overlap range: 500-600 (100 words)
- Minimum range requirement: 200 words
- Centered range: 500-600 ± 50 = 450-650
- Outer range: 400-700
- Validation: 450-650 is within 400-700 ✓
- Final range: 450-650

Example 2 - No Overlap: Child-001 (300-500), Child-002 (600-800)
- No overlap between 300-500 and 600-800
- Average centers: (400 + 700) / 2 = 550
- Minimum range: 550 ± 100 = 450-650
- Final range: 450-650

Example 3 - Overlap Exceeds Outer Range: Child-001 (400-600), Child-002 (500-700)
- Overlap range: 500-600
- Centered range: 450-650
- Outer range: 400-700
- Validation: 650 exceeds outer max of 700
- Adjustment: Subtract 50 from max, add to min
- Final range: 500-600

Example 4 - Very Small Overlap: Child-001 (400-450), Child-002 (440-600)
- Overlap range: 440-450 (10 words)
- Minimum range requirement: 200 words
- Expansion needed: (200 - 10) / 2 = 95 words
- Centered range: 440-450 ± 95 = 345-545
- Outer range: 400-600
- Validation: 345-545 is within 400-600 ✓
- Final range: 345-545

Example 5 - No Overlap, Wide Ranges: Child-001 (200-400), Child-002 (600-800)
- No overlap between 200-400 and 600-800
- Average centers: (300 + 700) / 2 = 500
- Minimum range: 500 ± 100 = 400-600
- Final range: 400-600

Example 6 - Single Member: Child-001 (500-700)
- Single member calculation
- Use member's preferred range directly
- Final range: 500-700
```

## Error Handling Architecture

### Validation Rules
- **Birthday Format**: Must be ISO date format (YYYY-MM-DD)
- **Age Range**: Calculated age must be between 0 and 18 years
- **Word Count Range**: Each member's preferred word count range must be between 100 and 2000 words
- **Range Validity**: min_words must be less than max_words for each member
- **Minimum Range Size**: Each member's range must be at least 50 words wide
- **Member Selection**: At least one member must be selected for story generation
- **Overlap Validation**: When overlap exists, it must be at least 1 word wide
- **Calculation Result**: Final calculated range must be at least 200 words wide

### Fallback Mechanisms
- **Invalid Birthday**: Prompt for valid date format with examples
- **Missing Profiles**: Offer profile creation or use default parameters
- **Calculation Failure**: Fall back to default age range (5-8) and word count (500-1000)
- **No Overlap Found**: Use average centers method with minimum 200-word range
- **Overlap Too Small**: Expand overlap to minimum 200-word range, centered around overlap
- **Range Adjustment Required**: Log adjustment reason and apply boundary constraints
- **File System Error**: Graceful degradation with user notification

## Security Considerations

### Data Privacy
- All target audience data stored locally in `.memory/`
- No cloud synchronization of personal information
- Birthday information used only for age calculation
- Profile data not shared with external services

### Data Integrity
- Profile validation on creation and modification
- Backup creation before major changes
- Version tracking for profile modifications
- Atomic operations for profile updates

## Performance Considerations

### Caching Strategy
- Calculated parameters cached until member selection changes
- Age calculations cached with daily refresh
- Profile data loaded once per session
- Template rendering optimized for parameter injection

### Scalability
- Profile storage scales linearly with number of children
- Parameter calculation complexity O(n) where n = selected members
- Memory usage minimal (profiles typically < 1KB each)
- No performance impact on existing story generation

## Integration Points

### Agent System Integration
- **Jester Agent**: New `/jester audience` commands
- **Muse Agent**: Enhanced context generation with target audience awareness
- **Write Agent**: Story generation with personalized parameters

### Template System Integration
- **Context Template**: Enhanced with target audience parameter placeholders
- **Story Template**: Age-appropriate content generation
- **Outline Template**: Parameter-aware plot structure

### Memory System Integration
- **Profile Storage**: YAML-based profile persistence in `.memory/` directory
- **Template System**: Templates in `.jester/templates/memory/` for initial file creation
- **Preference Tracking**: User choice memory in `.memory/persona-settings.yaml` (from template)
- **Session State**: Active member selection tracking in `.memory/target-audience-profiles.yaml` (from template)

## Future Enhancements

### Potential Extensions
- **Reading Level Assessment**: Automatic reading level calculation
- **Interest Tracking**: Story preference learning over time
- **Growth Tracking**: Age-appropriate content evolution
- **Family Sharing**: Multi-parent profile management

### Technical Improvements
- **Advanced Analytics**: Story engagement tracking per member
- **Machine Learning**: Preference prediction and content optimization
- **API Integration**: External reading level assessment services
- **Mobile Interface**: Profile management on mobile devices

## Implementation Notes

### Development Phases
1. **Phase 1**: Core profile management and parameter calculation
2. **Phase 2**: Story generation integration and template updates
3. **Phase 3**: Advanced features and error handling
4. **Phase 4**: Performance optimization and analytics

### Testing Strategy
- **Unit Tests**: Parameter calculation algorithms
- **Integration Tests**: Agent and template integration
- **User Acceptance Tests**: Profile management workflows
- **Performance Tests**: Large profile set handling

### Deployment Considerations
- **Backward Compatibility**: Existing stories continue to work
- **Migration Path**: Gradual adoption of target audience features
- **Documentation**: User guides for profile management
- **Training**: Agent prompt updates for new functionality
