# LightRAG Query Generation Prompts

## Context-Aware Query Generation

### Story Idea Analysis
Before querying LightRAG, analyze the story idea to generate targeted queries:

**Character Queries:**
- Extract character types from story idea (hero, villain, helper, etc.)
- Generate queries like: "characters who are [character_type] in [setting_type] stories"
- Include age-appropriate character traits: "friendly characters for children's stories"

**Location Queries:**
- Extract setting requirements from story idea
- Generate queries like: "locations suitable for [story_theme] adventures"
- Include environmental factors: "magical forests", "cozy homes", "mysterious caves"

**Item Queries:**
- Identify key objects needed for the story
- Generate queries like: "magical items for [age_group] stories"
- Include thematic elements: "treasure items", "tools for adventure", "special gifts"

**Relationship Queries:**
- Identify potential character connections
- Generate queries like: "relationships between [character_type] and [character_type]"
- Include story dynamics: "friendship relationships", "mentor relationships", "rival relationships"

### Query Strategy by Story Type

**Adventure Stories:**
- Focus on quest items, dangerous locations, heroic characters
- Query for: "adventure equipment", "challenging environments", "brave heroes"

**Friendship Stories:**
- Focus on social relationships, community settings, emotional items
- Query for: "friendly characters", "community locations", "sharing items"

**Mystery Stories:**
- Focus on clues, hidden locations, detective characters
- Query for: "mysterious items", "secret places", "curious characters"

**Fantasy Stories:**
- Focus on magical elements, enchanted locations, mystical characters
- Query for: "magical creatures", "enchanted forests", "mystical artifacts"

### Age-Appropriate Query Filtering

**Ages 3-5:**
- Simple, safe characters and locations
- Query for: "gentle characters", "safe places", "simple items"

**Ages 6-8:**
- Slightly more complex but still safe
- Query for: "adventurous but safe characters", "explorable locations", "educational items"

**Ages 9-12:**
- More complex relationships and challenges
- Query for: "complex character relationships", "challenging environments", "sophisticated items"

### Query Optimization

**Relevance Scoring:**
- Prioritize entities with high relevance scores
- Filter out entities with low relevance (< 0.3)
- Consider entity popularity and usage frequency

**Diversity Balancing:**
- Ensure mix of character types (hero, helper, antagonist)
- Include variety of locations (indoor, outdoor, magical, mundane)
- Balance item types (tools, treasures, gifts, clues)

**Context Integration:**
- Cross-reference discovered entities with existing local entities
- Identify potential conflicts or synergies
- Suggest entity combinations that enhance the story

### Error Handling Queries

**Fallback Queries:**
- If specific queries fail, use broader, more general queries
- Example: "characters" instead of "adventurous characters for 6-year-olds"
- Always have backup queries ready

**Progressive Querying:**
- Start with broad queries, then narrow down
- If too many results, add more specific terms
- If too few results, broaden the search terms

**Query Validation:**
- Check if query results make sense for the story context
- Verify age-appropriateness of discovered entities
- Ensure discovered entities fit the story's themes and morals
