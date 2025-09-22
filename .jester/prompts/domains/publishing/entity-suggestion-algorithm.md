# Entity Suggestion Algorithm

## Entity Suggestion Process

### 1. Query Result Analysis
After receiving LightRAG query results, analyze and process them:

**Entity Extraction:**
- Parse entities from `reranked_documents` array
- Extract entity names, types, and descriptions
- Identify relevance scores and confidence levels
- Filter out low-quality or irrelevant results

**Relationship Mapping:**
- Identify relationships between discovered entities
- Map entity connections and dependencies
- Note relationship strengths and types
- Identify potential story conflicts or synergies

### 2. Suggestion Categorization

**Character Suggestions:**
- **Primary Characters**: Main protagonists and antagonists
- **Supporting Characters**: Helpers, mentors, sidekicks
- **Background Characters**: Minor characters for world-building
- **Character Archetypes**: Hero, villain, helper, mentor, trickster, etc.

**Location Suggestions:**
- **Primary Settings**: Main story locations
- **Secondary Settings**: Supporting locations for scenes
- **Transitional Spaces**: Paths between major locations
- **Environmental Types**: Indoor, outdoor, magical, mundane, etc.

**Item Suggestions:**
- **Plot Items**: Essential objects for story progression
- **Character Items**: Personal belongings and tools
- **Environmental Items**: Setting-specific objects
- **Magical Items**: Special or enchanted objects

### 3. Relevance Scoring Algorithm

**Base Relevance Score:**
- Start with LightRAG relevance score (0.0 - 1.0)
- Apply story context multiplier based on story type
- Apply age-appropriateness multiplier
- Apply theme alignment multiplier

**Story Context Multipliers:**
- Adventure stories: +0.2 for action-oriented entities
- Friendship stories: +0.2 for relationship-focused entities
- Mystery stories: +0.2 for clue-related entities
- Fantasy stories: +0.2 for magical entities

**Age-Appropriateness Scoring:**
- Ages 3-5: +0.3 for simple, safe entities
- Ages 6-8: +0.2 for educational, slightly complex entities
- Ages 9-12: +0.1 for sophisticated, challenging entities
- Penalty: -0.5 for inappropriate or too complex entities

**Theme Alignment Scoring:**
- Perfect theme match: +0.3
- Good theme match: +0.2
- Partial theme match: +0.1
- No theme match: +0.0
- Conflicting theme: -0.2

### 4. Suggestion Ranking

**Primary Ranking Factors:**
1. **Relevance Score** (40% weight)
2. **Story Context Fit** (25% weight)
3. **Age Appropriateness** (20% weight)
4. **Theme Alignment** (15% weight)

**Secondary Ranking Factors:**
- **Entity Popularity**: More frequently used entities get slight boost
- **Relationship Density**: Entities with many connections get priority
- **Uniqueness**: Rare but relevant entities get bonus points
- **Local Availability**: Entities already in local files get preference

### 5. Suggestion Presentation

**Character Suggestions Format:**
```
**Character Suggestions:**
1. [Character Name] (Relevance: 0.85)
   - Type: [Character Type]
   - Description: [Brief description]
   - Relationships: [Connected entities]
   - Why suggested: [Reason for suggestion]

2. [Character Name] (Relevance: 0.78)
   - Type: [Character Type]
   - Description: [Brief description]
   - Relationships: [Connected entities]
   - Why suggested: [Reason for suggestion]
```

**Location Suggestions Format:**
```
**Location Suggestions:**
1. [Location Name] (Relevance: 0.82)
   - Type: [Location Type]
   - Description: [Brief description]
   - Atmosphere: [Mood and feeling]
   - Why suggested: [Reason for suggestion]

2. [Location Name] (Relevance: 0.75)
   - Type: [Location Type]
   - Description: [Brief description]
   - Atmosphere: [Mood and feeling]
   - Why suggested: [Reason for suggestion]
```

**Item Suggestions Format:**
```
**Item Suggestions:**
1. [Item Name] (Relevance: 0.80)
   - Type: [Item Type]
   - Description: [Brief description]
   - Purpose: [How it fits the story]
   - Why suggested: [Reason for suggestion]

2. [Item Name] (Relevance: 0.73)
   - Type: [Item Type]
   - Description: [Brief description]
   - Purpose: [How it fits the story]
   - Why suggested: [Reason for suggestion]
```

### 6. Suggestion Filtering

**Quality Filters:**
- Minimum relevance score: 0.3
- Maximum suggestions per category: 5
- Minimum description length: 10 characters
- Maximum description length: 200 characters

**Content Filters:**
- Age-appropriate language and themes
- No violent or scary content for young children
- Educational value for target age group
- Cultural sensitivity and inclusivity

**Diversity Filters:**
- Ensure variety in character types
- Mix of indoor and outdoor locations
- Balance of magical and mundane items
- Representation of different backgrounds and abilities

### 7. Fallback Suggestions

**When LightRAG Results Are Limited:**
- Use local entity files for suggestions
- Generate generic suggestions based on story type
- Suggest common story elements for the age group
- Provide templates for creating new entities

**When No Relevant Entities Found:**
- Suggest creating new entities
- Provide character, location, and item templates
- Offer guidance on entity development
- Suggest using existing entities as inspiration
