<!-- Powered by BMAD™ Core -->

# Search Queries Prompts

## Search Agent Query Processing

### Natural Language Query Understanding
"Let me help you find exactly what you're looking for in your story universe. I can search through your local files and the LightRAG database to discover relevant content."

### Query Types and Processing

**Character Queries:**
- "Find characters who..."
- "Show me characters related to..."
- "What characters appear in..."
- "Find characters with personality traits like..."
- "Show me characters who live in..."

**Location Queries:**
- "Find locations that..."
- "Show me places where..."
- "What locations are mentioned in..."
- "Find settings that feel like..."
- "Show me locations connected to..."

**Story Queries:**
- "Find stories about..."
- "Show me stories with themes of..."
- "What stories feature..."
- "Find bedtime stories for..."
- "Show me stories that teach..."

**Item Queries:**
- "Find items that..."
- "Show me objects used in..."
- "What items are important to..."
- "Find magical items that..."
- "Show me tools or weapons..."

**Relationship Queries:**
- "How are {character1} and {character2} connected?"
- "What stories feature both {character} and {location}?"
- "Show me all relationships involving {entity}"
- "Find connections between {theme} stories"

### Query Processing Steps

**1. Intent Recognition**
"Let me understand what you're looking for:
- **Query Type**: {character|location|story|item|relationship}
- **Search Scope**: {local|lightrag|both}
- **Specificity**: {broad|specific|exact}
- **Context**: {story_universe|specific_story|general}"

**2. Query Expansion**
"Expanding your query to find the most relevant results:
- **Original Query**: {user_query}
- **Expanded Terms**: {expanded_terms}
- **Synonyms**: {synonym_terms}
- **Related Concepts**: {related_concepts}"

**3. Search Execution**
"Searching through your content:
- **Local Files**: Scanning {file_count} files
- **LightRAG Database**: Querying knowledge graph
- **Search Methods**: {semantic|keyword|fuzzy}
- **Confidence Threshold**: {confidence_level}"

### Search Result Processing

**Result Ranking:**
"Ranking results by relevance and confidence:
- **Exact Matches**: {exact_count} results
- **High Confidence**: {high_confidence_count} results
- **Medium Confidence**: {medium_confidence_count} results
- **Low Confidence**: {low_confidence_count} results"

**Result Presentation:**
"Presenting your search results in order of relevance:

**🎯 Exact Matches:**
{exact_match_results}

**⭐ High Confidence:**
{high_confidence_results}

**🔍 Medium Confidence:**
{medium_confidence_results}

**💡 Related Suggestions:**
{related_suggestions}"

### Advanced Search Features

**Semantic Search:**
"Using semantic understanding to find conceptually related content:
- **Concept**: {main_concept}
- **Related Ideas**: {related_concepts}
- **Contextual Matches**: {contextual_matches}
- **Thematic Connections**: {thematic_connections}"

**Fuzzy Matching:**
"Finding content even with slight variations in terms:
- **Original Term**: {original_term}
- **Variations Found**: {term_variations}
- **Confidence Scores**: {confidence_scores}
- **Best Matches**: {best_matches}"

**Cross-Reference Search:**
"Finding connections between different content types:
- **Character-Location**: {character_location_connections}
- **Story-Theme**: {story_theme_connections}
- **Item-Usage**: {item_usage_connections}
- **Relationship Mapping**: {relationship_mapping}"

### Search Result Actions

**View Content:**
"Would you like to:
- View the full content of {result_name}
- Edit {result_name} using `/edit`
- See related content
- Search for more similar items"

**Refine Search:**
"To narrow down your results, you can:
- Add more specific terms
- Use filters (character, location, story, item)
- Search within results
- Try a different search approach"

**Explore Connections:**
"Discover more about {result_name}:
- Show all relationships
- Find stories featuring this
- See similar content
- Explore the story universe"

### Search Error Handling

**No Results Found:**
"I couldn't find any content matching '{query}'. Let me suggest some alternatives:
- **Similar Terms**: {similar_terms}
- **Broader Search**: {broader_terms}
- **Different Approach**: {alternative_approaches}
- **Content Creation**: Would you like to create this content?"

**Ambiguous Query:**
"Your query '{query}' could mean several things. Could you clarify:
- **Option 1**: {interpretation_1}
- **Option 2**: {interpretation_2}
- **Option 3**: {interpretation_3}
- **Or be more specific**: {specificity_suggestion}"

**Too Many Results:**
"I found {result_count} results for '{query}'. Let me help you narrow it down:
- **Add Filters**: {filter_suggestions}
- **Be More Specific**: {specificity_suggestions}
- **Search Within Results**: {refinement_suggestions}
- **Show Top Results**: {top_results}"

### Search Success Confirmation

"🔍 Search complete! Here's what I found:

**Query**: {original_query}
**Results Found**: {total_results}
**Search Time**: {search_duration}
**Confidence**: {average_confidence}

**Top Results**:
{formatted_results}

**Next Steps**:
- Use `/edit` to modify any of these results
- Use `/search` with more specific terms to narrow down
- Use `/muse` to explore new ideas
- Use `/write` to create new content

Found what you were looking for? Let me know if you need more specific results! 🎯"
