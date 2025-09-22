---
prompt:
  name: Relationship Fallback
  id: relationship-fallback
  purpose: Simple fallback for relationship discovery when LightRAG MCP is unavailable
  whenToUse: When LightRAG MCP is down or not configured
  customization: null
---

# Relationship Fallback Prompt

## Purpose
This is a simple fallback system for basic relationship discovery and management when LightRAG MCP is unavailable. The primary relationship discovery should be handled by LightRAG MCP.

## Basic Relationship Discovery

### 1. Find Entity Relationships
**When LightRAG is unavailable:**
1. **Read entity files** from `complete/characters/`, `complete/locations/`, `complete/items/`
2. **Look for wiki-style links** using `[[entity-name]]` format
3. **List connected entities** with basic relationship info
4. **Suggest new connections** based on simple content analysis

**Simple Analysis:**
- Look for shared themes, locations, or characteristics
- Check for complementary traits or roles
- Find entities that appear together in stories
- Suggest obvious connections (e.g., character lives in location)

### 2. Create Simple Relationships
**When user wants to link entities:**
1. **Validate both entities exist**
2. **Add wiki-style links** to both entity files
3. **Update entity files** with simple relationship info
4. **Confirm creation** with user

**Simple Link Format:**
```markdown
## Relationships
- [[entity-name]] - [brief description]
```

## Commands

### `/muse relationships <entity-name>`
**Show relationships for an entity:**
1. Read entity file
2. Extract `[[links]]` from file
3. List connected entities
4. Suggest new connections if LightRAG unavailable

### `/edit link-entities <entity1> <entity2> [description]`
**Create a simple link between entities:**
1. Check both entities exist
2. Add `[[entity2]]` to entity1's file
3. Add `[[entity1]]` to entity2's file
4. Confirm link creation

## LightRAG Integration

### Primary System
- **LightRAG MCP** handles complex relationship discovery
- **LightRAG MCP** provides relationship analysis and statistics
- **LightRAG MCP** manages relationship data and exports

### Fallback System
- **This prompt** only when LightRAG is unavailable
- **Simple wiki-style links** for basic connectivity
- **Basic suggestions** based on content analysis
- **Manual relationship creation** when needed

## Error Handling

### LightRAG Unavailable
- **Show message**: "LightRAG MCP unavailable, using fallback system"
- **Provide basic functionality**: Simple relationship discovery
- **Suggest alternatives**: Manual relationship creation
- **Offer to retry**: Check LightRAG connection

### Entity Not Found
- **List available entities**: Show what entities exist
- **Suggest similar names**: Help with typos or similar entities
- **Offer to create**: Suggest creating missing entity

## Usage Examples

### Example 1: Show Relationships
**Command:** `/muse relationships lily`
**Response:**
```
🔗 Lily's Relationships (Fallback Mode)

**Connected Entities:**
- [[Rascal]] - Adventure partner
- [[Sunny Beach]] - Visits frequently
- [[Magic Snorkel]] - Owns and uses

**Suggested Connections:**
- [[Stella Stingray]] - Both are adventurous
- [[Red Scarf]] - Lily's signature item

Note: Using fallback system. For advanced relationship analysis, use LightRAG MCP.
```

### Example 2: Create Link
**Command:** `/edit link-entities lily stella-stingray "Adventure friends"`
**Response:**
```
✅ Created link between Lily and Stella Stingray

**Updated Files:**
- Lily's file: Added [[Stella Stingray]] - Adventure friends
- Stella Stingray's file: Added [[Lily]] - Adventure friends

Note: Using fallback system. For advanced relationship management, use LightRAG MCP.
```

## Best Practices

### When to Use Fallback
- **LightRAG MCP is down** or unavailable
- **Simple relationship discovery** needed
- **Quick manual linking** of entities
- **Basic connectivity** maintenance

### When to Use LightRAG
- **Complex relationship analysis** needed
- **Relationship statistics** and metrics
- **Advanced relationship discovery** from published data
- **Relationship exports** and data analysis

### Keep It Simple
- **Don't over-engineer** the fallback system
- **Focus on basic connectivity** between entities
- **Let LightRAG handle** the complex stuff
- **Maintain simple wiki-style links** for basic relationships

## Conclusion

This fallback system provides basic relationship functionality when LightRAG MCP is unavailable. It's intentionally simple and focused on maintaining basic connectivity between entities in the story universe. The real relationship intelligence comes from LightRAG MCP.
