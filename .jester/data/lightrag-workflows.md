

# Entity Management Workflows

## Purpose

Comprehensive Entity Management integration workflows for knowledge graph queries, relationship discovery, and entity enhancement.

## Integration Methods

### Query Processing
- Converting natural language to Entity Management queries
- Optimizing queries for best results
- Handling complex and multi-part queries
- Managing query timeouts and errors

### Result Enhancement
- Enriching local results with Entity Management data
- Adding relationship information
- Providing context and connections
- Cross-referencing with local content

### Knowledge Graph Navigation
- Exploring entity relationships
- Following connection paths
- Discovering indirect relationships
- Building comprehensive entity maps

## Query Generation

### Story Idea Analysis
Before querying Entity Management, analyze the story idea to generate targeted queries:

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

## Relationship Discovery

### Entity Discovery Process
1. **Entity Validation**: Verify the entity exists in local files
2. **Entity Management Query**: Use Entity Management client to query for similar entities
3. **Similarity Analysis**: Analyze discovered entities for similarity and relevance
4. **Relationship Generation**: Generate relationship suggestions based on knowledge graph data
5. **Result Presentation**: Display discovered relationships with confidence scores

### Similarity Scoring
Calculate confidence scores (0.0-1.0) based on:
- Name similarity (exact match = 1.0, partial match = 0.7)
- Type compatibility (character/location/item matching)
- Description keyword overlap
- Property similarity

### Relationship Types
- **Character Relationships**: Friends, family, rivals, mentors
- **Location Relationships**: Connected places, similar environments
- **Item Relationships**: Related objects, complementary tools
- **Cross-Type Relationships**: Character-location, character-item, location-item

## Context-Aware Query Generation

### LLM Agent Instructions
1. **Analyze Story Requirements**: Extract key elements from user's story concept
2. **Generate Targeted Queries**: Create specific Entity Management queries based on analysis
3. **Execute Entity Management Queries**: Use Entity Management client to search for entities
4. **Score and Rank Results**: Evaluate discovered entities for relevance
5. **Present Entity Suggestions**: Display results to user with scores and reasoning

### Query Optimization
- **Relevance Scoring**: Prioritize entities with high relevance scores
- **Diversity Balancing**: Ensure mix of character types, locations, and items
- **Context Integration**: Cross-reference with existing local entities

## Error Handling

### Fallback Queries
- If specific queries fail, use broader, more general queries
- Example: "characters" instead of "adventurous characters for 6-year-olds"
- Always have backup queries ready

### Progressive Querying
- Start with broad queries, then narrow down
- If too many results, add more specific terms
- If too few results, broaden the search terms

### Query Validation
- Check if query results make sense for the story context
- Verify age-appropriateness of discovered entities
- Ensure discovered entities fit the story's themes and morals

## Integration Status

### Connection Status
- **Connected**: Entity Management service is available and responding
- **Disconnected**: Entity Management service is unavailable
- **Error**: Entity Management service is responding with errors

### Performance Metrics
- **Query Success Rate**: Percentage of successful queries
- **Result Relevance**: Quality of returned results (0-10)
- **Response Time**: Average time for query responses
- **Coverage**: Percentage of queries that return useful results

## Integration Results

### Success Response
```yaml
Entity Management_integration:
  success: true
  entities_found: [count]
  relationships_discovered: [count]
  insights_generated: [count]
  performance_metrics:
    query_success_rate: [percentage]
    result_relevance: [score]
    response_time: [seconds]
    coverage: [percentage]
```

### Integration Summary
```
🔗 Entity Management integration successful!

Summary:
- [X] entities discovered
- [X] relationships found
- [X] insights generated
- [X] connections established

Integration Quality:
- Query Success Rate: [X%]
- Result Relevance: [X/10]
- Response Time: [X seconds]
- Coverage: [X%]
```
