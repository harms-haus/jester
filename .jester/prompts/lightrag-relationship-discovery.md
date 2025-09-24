# LightRAG Relationship Discovery Prompts

## Entity Discovery Commands

### `/muse discover-relationships [entity-name]`
Discovers relationships for a specific entity using LightRAG knowledge graph:

**Process:**
1. **Entity Validation**: Verify the entity exists in local files (universe/characters/, universe/locations/, universe/items/)
2. **LightRAG Query**: Use LightRAG MCP client to query for similar entities and relationships
3. **Similarity Analysis**: Analyze discovered entities for similarity and relevance
4. **Relationship Generation**: Generate relationship suggestions based on knowledge graph data
5. **Result Presentation**: Display discovered relationships with confidence scores and reasoning

**LLM Agent Instructions:**
- Use the LightRAG MCP client to query the knowledge graph
- Analyze entity descriptions and properties for similarity
- Generate confidence scores based on content matching
- Provide clear reasoning for relationship suggestions
- Handle LightRAG service unavailability gracefully

**Detailed Implementation Steps:**
1. **Read Local Entity**: Load entity file from universe/ directory
2. **Query LightRAG**: Use MCP client to search for similar entities
3. **Analyze Results**: Compare entity descriptions, types, and properties
4. **Score Similarity**: Calculate confidence scores (0.0-1.0) based on:
   - Name similarity (exact match = 1.0, partial match = 0.7)
   - Type compatibility (character/location/item matching)
   - Description keyword overlap
   - Property similarity
5. **Generate Relationships**: Create relationship suggestions with:
   - Source and target entity names
   - Relationship type and description
   - Confidence score and reasoning
   - Suggested properties for the relationship

**Output Format:**
```
🔍 Relationship Discovery Results for [Entity Name]

📊 Similar Entities Found:
- [Entity Name] (Confidence: 0.85) - [Reasoning]
- [Entity Name] (Confidence: 0.72) - [Reasoning]

🔗 Relationship Suggestions:
- [Source] → [Target]: [Relationship Type] (Confidence: 0.78)
  Reasoning: [Explanation]
- [Source] → [Target]: [Relationship Type] (Confidence: 0.65)
  Reasoning: [Explanation]

💡 Recommendations:
- [Actionable suggestion based on discovered relationships]
```

### `/muse discover-all-relationships`
Discovers relationships for all entities in the story universe:

**Process:**
1. **Entity Inventory**: Scan universe/ directory for all entities
2. **Batch Processing**: Process entities in batches to avoid overwhelming LightRAG
3. **Relationship Mapping**: Create comprehensive relationship map
4. **Conflict Detection**: Identify potential relationship conflicts
5. **Summary Report**: Generate summary of all discovered relationships

**LLM Agent Instructions:**
- Scan universe/characters/, universe/locations/, universe/items/ directories
- Process entities in batches of 5-10 to avoid overwhelming LightRAG
- Use LightRAG MCP client to query for relationships between entities
- Build comprehensive relationship map with confidence scores
- Identify conflicting or duplicate relationship suggestions
- Generate summary statistics and top discoveries

**Output Format:**
```
🌐 Universe Relationship Discovery Complete

📈 Statistics:
- Total Entities Processed: [count]
- Relationships Discovered: [count]
- High Confidence Relationships: [count]
- New Entity Connections: [count]

🔍 Top Discoveries:
1. [Entity] → [Entity]: [Relationship] (Confidence: 0.92)
2. [Entity] → [Entity]: [Relationship] (Confidence: 0.89)
3. [Entity] → [Entity]: [Relationship] (Confidence: 0.87)

⚠️ Potential Conflicts:
- [Conflict description and resolution suggestion]

💾 Export Options:
- Export to JSON: `/muse export-relationships json`
- Export to CSV: `/muse export-relationships csv`
```

## Relationship Management Commands

### `/muse filter-relationships [options]`
Filters discovered relationships based on criteria:

**Options:**
- `--type [character|location|item]`: Filter by entity type
- `--confidence [min-max]`: Filter by confidence range (e.g., 0.7-1.0)
- `--relationship [type]`: Filter by relationship type
- `--source [local|lightrag|both]`: Filter by data source

**LLM Agent Instructions:**
- Parse command line options and extract filter criteria
- Load previously discovered relationships from memory or cache
- Apply filters based on specified criteria:
  - Entity type matching (character/location/item)
  - Confidence score range filtering
  - Relationship type matching
  - Data source filtering (local vs LightRAG)
- Display filtered results with applied criteria summary

**Example:**
```
/muse filter-relationships --type character --confidence 0.8-1.0 --source lightrag
```

### `/muse export-relationships [format] [options]`
Exports discovered relationships to specified format:

**Formats:**
- `json`: JSON format with full metadata
- `csv`: CSV format for spreadsheet analysis

**Options:**
- `--include-metadata`: Include detailed metadata in export
- `--filter [criteria]`: Apply filters before export

**LLM Agent Instructions:**
- Parse export format and options from command
- Load discovered relationships from memory or cache
- Apply any specified filters before export
- Generate export file in requested format:
  - JSON: Structured data with metadata and timestamps
  - CSV: Tabular format with headers for spreadsheet import
- Save export file to appropriate location
- Provide confirmation of export completion with file path

**Example:**
```
/muse export-relationships json --include-metadata --filter "confidence>0.7"
```

### `/muse validate-relationships`
Validates discovered relationships for consistency and accuracy:

**Process:**
1. **Consistency Check**: Verify relationships make logical sense
2. **Conflict Detection**: Identify conflicting relationship suggestions
3. **Accuracy Assessment**: Evaluate relationship quality
4. **Recommendation Generation**: Provide improvement suggestions

**LLM Agent Instructions:**
- Load all discovered relationships from memory or cache
- Perform consistency validation:
  - Check for logical relationship types (e.g., character can't be "located in" another character)
  - Verify entity types match relationship expectations
  - Validate confidence scores are within valid range (0.0-1.0)
- Detect conflicts:
  - Identify contradictory relationship suggestions
  - Flag relationships with very low confidence scores
  - Check for duplicate or redundant relationships
- Generate quality assessment:
  - Evaluate reasoning quality and clarity
  - Check for missing or incomplete relationship data
  - Assess overall relationship network coherence
- Provide actionable recommendations for improvement

**Output Format:**
```
✅ Relationship Validation Complete

📊 Validation Results:
- Total Relationships: [count]
- Valid Relationships: [count]
- Invalid Relationships: [count]
- Conflicts Detected: [count]

⚠️ Issues Found:
- [Issue description and resolution]

💡 Recommendations:
- [Improvement suggestion]
- [Quality enhancement tip]
```

## Error Handling and Fallback

### LightRAG Service Unavailable
When LightRAG service is not available:

**LLM Agent Instructions:**
- Check LightRAG service availability using health check
- If unavailable, provide graceful fallback options:
  1. Use local entity analysis for basic relationship discovery
  2. Suggest manual relationship creation based on entity descriptions
  3. Retry LightRAG connection with exponential backoff
  4. Continue with existing relationships only
- Display clear error message with fallback options
- Log error for debugging purposes

```
⚠️ LightRAG Service Unavailable

The LightRAG service is currently not accessible. Using fallback mode:

🔄 Fallback Options:
1. Use local entity analysis for basic relationship discovery
2. Suggest manual relationship creation
3. Retry LightRAG connection
4. Continue with existing relationships only

💡 Recommendations:
- Check LightRAG service status
- Verify network connectivity
- Consider using local relationship discovery
```

### No Relationships Found
When no relationships are discovered:

```
🔍 No Relationships Discovered

No relationships were found for the specified criteria. This could mean:

📝 Possible Reasons:
- Entity is unique and has no similar entities in LightRAG
- Confidence threshold is too high
- LightRAG knowledge graph lacks relevant data
- Query parameters are too restrictive

💡 Suggestions:
- Lower confidence threshold
- Try broader search criteria
- Check if entity exists in LightRAG
- Consider manual relationship creation
```

## Integration with Existing Commands

### Enhanced `/muse create-new`
When creating new stories, automatically discover relationships:

**Process:**
1. **Entity Discovery**: Find entities relevant to story concept
2. **Relationship Analysis**: Discover relationships between story entities
3. **Context Enhancement**: Include relationship data in context file
4. **Suggestion Presentation**: Present relationship suggestions to user

### Enhanced `/muse explore-existing`
When exploring existing drafts, discover new relationships:

**Process:**
1. **Entity Extraction**: Extract entities from existing context/outline/story
2. **Relationship Discovery**: Find new relationships for extracted entities
3. **Enhancement Suggestions**: Suggest relationship improvements
4. **Context Update**: Update context with new relationship data

## Quality Assurance

### Relationship Quality Metrics
- **Confidence Score**: 0.0-1.0 scale for relationship strength
- **Reasoning Quality**: Clear explanation for relationship suggestion
- **Consistency Check**: Logical relationship validation
- **Source Verification**: LightRAG vs local source tracking

### Validation Criteria
- Relationships must have confidence score > 0.3
- Reasoning must be provided for all suggestions
- Entity names must match existing entities
- Relationship types must be meaningful and clear

### Performance Considerations
- Batch processing for large entity sets
- Caching of frequently accessed relationships
- Rate limiting for LightRAG API calls
- Graceful degradation when service unavailable
