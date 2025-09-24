# Entity Import Tasks

## Directory Processing Tasks

### Directory Scan and File Selection
```
Scan the specified directory and select up to 10 .md files for import processing:

**Directory Path:** {{DIRECTORY_PATH}}
**Entity Type Filter:** {{ENTITY_TYPE_FILTER}} (optional)

**Selection Criteria:**
1. Find all .md files in the directory (and subdirectories if specified)
2. Filter out files that are already structured (contain template headers)
3. Filter by entity type if specified (character, location, item)
4. Select up to 10 files for processing
5. Prioritize files that appear to be unstructured entity descriptions

**File Analysis Instructions:**
- Check if file contains structured template headers (Basic Information, Description, etc.)
- Look for entity-like content (names, descriptions, properties)
- Avoid files that are clearly stories, outlines, or other non-entity content
- Prioritize files with entity names in the filename

**Response Format:**
```json
{
  "total_files_found": number,
  "files_selected": [
    {
      "file_path": "string",
      "entity_type": "character|location|item|unknown",
      "confidence": "high|medium|low",
      "reason": "string"
    }
  ],
  "files_skipped": [
    {
      "file_path": "string",
      "reason": "already_structured|not_entity|low_confidence"
    }
  ],
  "processing_order": ["file_path1", "file_path2", ...]
}
```

### Entity Processing Task
```
Process the selected entity file for import:

**File Path:** {{FILE_PATH}}
**Entity Type:** {{ENTITY_TYPE}} (character|location|item)

**Processing Steps:**
1. Read and analyze the entity file content
2. Extract entity name, description, and properties
3. Identify entity type and characteristics
4. Extract relationships and connections
5. Structure according to appropriate entity template:
   - Character entities: Use .jester/templates/character-template.md
   - Location entities: Use .jester/templates/location-template.md
   - Item entities: Use .jester/templates/item-template.md
6. Validate the structured content
7. Generate import staging file

**For Character Entities:**
- Extract character name, description, and personality traits
- Identify motivations, goals, and fears
- Extract relationships with other characters
- Identify character role and significance

**For Location Entities:**
- Extract location name, description, and atmosphere
- Identify key features and landmarks
- Extract location significance and purpose
- Identify connections to other locations

**For Item Entities:**
- Extract item name, description, and properties
- Identify item purpose and significance
- Extract item relationships and connections
- Identify item rarity and value

**Response Format:**
```json
{
  "processing_status": "success|error",
  "extracted_entity": {
    "name": "string",
    "type": "character|location|item",
    "description": "string",
    "properties": {},
    "relationships": [],
    "metadata": {}
  },
  "validation_results": {
    "is_valid": boolean,
    "errors": ["string"],
    "warnings": ["string"]
  },
  "staging_file_path": "string"
}
```

### Entity Staging Task
```
Move processed entity to import staging directory:

**Source File:** {{SOURCE_FILE_PATH}}
**Staging Directory:** import-staging/
**Entity Type:** {{ENTITY_TYPE}}

**Staging Steps:**
1. Create appropriate staging subdirectory
2. Copy processed entity file to staging location with proper entity name (e.g., `Stella Stoat.md`)
3. Update entity metadata
4. Generate staging confirmation

**Response Format:**
```json
{
  "staging_status": "success|error",
  "staging_path": "string",
  "entity_metadata": {},
  "next_steps": ["string"]
}
```
