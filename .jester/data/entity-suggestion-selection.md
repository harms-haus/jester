<!-- Powered by BMAD™ Core -->

# Entity Suggestion and Selection

## Entity Suggestion System

**IMPORTANT: READ-ONLY LightRAG Integration**
All LightRAG operations are read-only. The system only queries LightRAG to discover and suggest entities, never modifies the LightRAG knowledge graph. Local entity files remain the primary source of truth.

### Entity Suggestion Algorithm

**LLM Agent Instructions for Entity Suggestions:**

1. **Analyze Story Context**: Review the story concept, themes, and target audience to understand entity requirements.

2. **Score Entity Relevance**: For each discovered LightRAG entity, calculate relevance scores based on:
   - **Story Fit** (0.0-1.0): How well the entity fits the story concept and themes
   - **Age Appropriateness** (boolean): Whether the entity is suitable for the target audience age
   - **Thematic Alignment** (0.0-1.0): How well the entity matches the story's themes and morals
   - **Character Diversity** (0.0-1.0): Whether the entity adds diversity to the character mix

3. **Generate Entity Suggestions**: Create structured suggestions with:
   - Entity name and description
   - Relevance score and reasoning
   - Suggested role in the story
   - Age-appropriateness assessment
   - Thematic fit evaluation

4. **Present Suggestions**: Display entity suggestions in organized format with clear selection options.

### Entity Suggestion Format

**Character Suggestions:**
```
🎭 Character Suggestions for Your Story

1. **Stella Stoat** (Relevance: 0.85)
   - Description: A curious and honest woodland creature
   - Suggested Role: Main character or helpful friend
   - Age Appropriate: ✅ Perfect for ages 3-8
   - Story Fit: Excellent - matches themes of honesty and curiosity
   - Reasoning: This character embodies the moral lessons you want to teach

2. **Oliver Owl** (Relevance: 0.72)
   - Description: A wise and patient forest guardian
   - Suggested Role: Mentor or guide character
   - Age Appropriate: ✅ Suitable for all ages
   - Story Fit: Good - provides wisdom and guidance
   - Reasoning: Adds depth and educational value to your story

Would you like to include any of these characters? (Type the number or name)
```

**Location Suggestions:**
```
🏞️ Location Suggestions for Your Story

1. **Dandelion Plains** (Relevance: 0.88)
   - Description: A vast, sunny meadow filled with golden dandelions
   - Suggested Role: Main setting for the adventure
   - Age Appropriate: ✅ Perfect for ages 3-8
   - Story Fit: Excellent - provides safe, magical environment
   - Reasoning: Creates a beautiful, safe space for your child's imagination

2. **Whispering Woods** (Relevance: 0.75)
   - Description: A mysterious forest where trees seem to whisper secrets
   - Suggested Role: Secondary location for discovery
   - Age Appropriate: ✅ Suitable for ages 5-10
   - Story Fit: Good - adds mystery and adventure
   - Reasoning: Provides opportunities for exploration and discovery

Would you like to include any of these locations? (Type the number or name)
```

**Item Suggestions:**
```
🎒 Item Suggestions for Your Story

1. **Magic Snorkel** (Relevance: 0.82)
   - Description: A special snorkel that allows breathing underwater
   - Suggested Role: Key tool for the adventure
   - Age Appropriate: ✅ Perfect for ages 4-8
   - Story Fit: Excellent - enables underwater exploration
   - Reasoning: Adds magical element while teaching about exploration

2. **Golden Compass** (Relevance: 0.68)
   - Description: A compass that always points to what you need most
   - Suggested Role: Navigation tool or moral guide
   - Age Appropriate: ✅ Suitable for ages 6-10
   - Story Fit: Good - provides guidance and direction
   - Reasoning: Teaches about following your heart and intuition

Would you like to include any of these items? (Type the number or name)
```

### Entity Selection Process

**LLM Agent Instructions for Entity Selection:**

1. **Present Entity Options**: Show 3-5 top suggestions per category with clear formatting.

2. **Handle User Selection**: Process user choices:
   - Accept specific entity selections
   - Handle "none" or "skip" responses
   - Allow "more" requests for additional suggestions
   - Process "all" selections for categories

3. **Integrate Selected Entities**: Add selected entities to the context template:
   - Include LightRAG metadata (source, confidence, query used)
   - Set appropriate entity properties and relationships
   - Maintain entity source tracking (local vs LightRAG)

4. **Provide Confirmation**: Confirm selected entities and their roles in the story.

### Entity Integration Workflow

**LLM Agent Instructions for Entity Integration:**

1. **Validate Selected Entities**: Ensure selected entities are appropriate and consistent.

2. **Generate Entity Metadata**: Create comprehensive metadata for each selected entity:
   - Source tracking (LightRAG vs local)
   - Discovery timestamp and query used
   - Confidence scores and reasoning
   - Suggested properties and relationships

3. **Update Context Template**: Integrate entities into the context file:
   - Add entities to appropriate sections (characters, locations, items)
   - Include LightRAG metadata for tracking
   - Set entity relationships and properties
   - Maintain consistency with story requirements

4. **Quality Assurance**: Verify entity integration:
   - Check for conflicts or inconsistencies
   - Ensure age-appropriateness
   - Validate thematic alignment
   - Confirm entity diversity and balance

### Error Handling for Entity Suggestions

**No Suitable Entities Found:**
```
🔍 No Suitable Entities Found

I searched LightRAG for entities relevant to your story concept, but didn't find any that perfectly match your requirements. This could mean:

- Your story concept is very unique and original
- The LightRAG knowledge graph doesn't have entities for this specific theme
- The search criteria were too specific

🔄 Options:
1. Try broader search terms
2. Use local entities from your story universe
3. Create new entities based on your story concept
4. Continue without additional entities

What would you like to do?
```

**LightRAG Service Unavailable:**
```
⚠️ LightRAG Service Unavailable

The LightRAG service is currently not accessible, so I can't search for additional entities. However, I can still help you create a rich story context using:

🔄 Available Options:
1. Local entities from your story universe
2. My knowledge base for entity suggestions
3. Create new entities based on your story concept
4. Use existing entities and expand them

Would you like me to proceed with local entity suggestions?
```

**Entity Selection Conflicts:**
```
⚠️ Entity Selection Conflict

I notice you've selected entities that might conflict with each other or your story concept:

- [Entity A] and [Entity B] have conflicting themes
- [Entity C] might not be age-appropriate for your target audience
- [Entity D] doesn't match your chosen plot template

🔄 Resolution Options:
1. Choose alternative entities
2. Modify the conflicting entities
3. Adjust your story concept to accommodate the entities
4. Remove the conflicting entities

How would you like to resolve this conflict?
```

### Success Confirmation

**Entity Integration Complete:**
```
✅ Entity Integration Complete

I've successfully integrated the selected entities into your story context:

📊 **Selected Entities:**
- Characters: [list of selected characters]
- Locations: [list of selected locations]  
- Items: [list of selected items]

🔗 **Entity Relationships:**
- [Relationship description]
- [Relationship description]

💾 **Context File Updated:**
Your story context has been saved with all selected entities and their metadata.

Ready to continue with story development? Use `/write outline` to generate your story outline!
```
