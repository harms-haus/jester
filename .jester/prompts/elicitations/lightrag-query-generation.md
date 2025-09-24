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

### Context-Aware Query Generation for Muse Agent

**LLM Agent Instructions for Context Generation:**
1. **Analyze Story Requirements**: Extract key elements from user's story concept:
   - Story themes and genre (adventure, friendship, mystery, fantasy)
   - Target audience age and reading level
   - Plot template and structure
   - Existing character/location/item preferences

2. **Generate Targeted Queries**: Create specific LightRAG queries based on analysis:
   - Character queries: "characters suitable for [age] [genre] stories with [theme]"
   - Location queries: "locations perfect for [story_type] adventures for [age_group]"
   - Item queries: "magical items and tools for [genre] stories for [age]"
   - Relationship queries: "relationships between characters in [genre] stories"

3. **Execute LightRAG Queries**: Use LightRAG MCP client to search for entities:
   - Query for characters, locations, and items separately
   - Use progressive querying (broad to specific)
   - Handle query failures gracefully with fallback queries

4. **Score and Rank Results**: Evaluate discovered entities:
   - Calculate relevance scores (0.0-1.0) based on story fit
   - Check age-appropriateness for target audience
   - Assess thematic alignment with story concept
   - Rank entities by overall suitability

5. **Present Entity Suggestions**: Display results to user:
   - Show top 3-5 entities per category (characters, locations, items)
   - Include relevance scores and reasoning
   - Allow user to select which entities to include
   - Provide option to search for more entities

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
