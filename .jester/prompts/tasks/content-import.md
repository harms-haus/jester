# Content Import Tasks

## Directory Processing Tasks

### Directory Scan and File Selection
```
Scan the specified directory and select up to 10 .md files for import processing:

**Directory Path:** {{DIRECTORY_PATH}}
**Content Type Filter:** {{CONTENT_TYPE_FILTER}} (entity|story|both)
**Entity Type Filter:** {{ENTITY_TYPE_FILTER}} (character|location|item) (optional)

**Selection Criteria:**
1. Find all .md files in the directory (and subdirectories if specified)
2. Filter out files that are already structured (contain template headers)
3. Filter by content type if specified (entity, story, or both)
4. Filter by entity type if specified (character, location, item)
5. Select up to 10 files for processing
6. Prioritize files that appear to be unstructured content

**File Analysis Instructions:**
- Check if file contains structured template headers (Basic Information, Description, etc.)
- Look for entity-like content (names, descriptions, properties) or story content
- Avoid files that are clearly outlines, contexts, or other non-content files
- Prioritize files with descriptive names
- For stories: look for narrative content, character interactions, plot elements
- For entities: look for entity names in the filename or content

**Response Format:**
```json
{
  "total_files_found": number,
  "files_selected": [
    {
      "file_path": "string",
      "content_type": "entity|story",
      "entity_type": "character|location|item|unknown",
      "confidence": "high|medium|low",
      "reason": "string"
    }
  ],
  "files_skipped": [
    {
      "file_path": "string",
      "reason": "already_structured|not_content|low_confidence"
    }
  ],
  "processing_order": ["file_path1", "file_path2", ...]
}
```

### File Processing Task
```
Process the selected file for import:

**File Path:** {{FILE_PATH}}
**Content Type:** {{CONTENT_TYPE}} (entity|story)
**Entity Type:** {{ENTITY_TYPE}} (character|location|item) (if applicable)

**Processing Steps:**
1. Read and analyze the file content
2. Extract relevant information based on content type
3. Structure the information according to the appropriate template
4. Validate the structured content
5. Generate import staging file with proper entity name (e.g., `Stella Stoat.md`)

**For Entity Files:**
- Extract entity name, description, and properties
- Identify entity type (character, location, item)
- Extract relationships and connections
- Structure according to appropriate entity template:
  - Character entities: Use .jester/templates/character-template.md
  - Location entities: Use .jester/templates/location-template.md
  - Item entities: Use .jester/templates/item-template.md

**For Story Files:**
- Extract story title, content, and metadata
- Identify characters, locations, and items mentioned
- Extract themes, morals, and target audience
- Structure according to story template

**Response Format:**
```json
{
  "processing_status": "success|error",
  "extracted_content": {
    "title": "string",
    "type": "entity|story",
    "entity_type": "character|location|item|unknown",
    "description": "string",
    "properties": {},
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

### Import Staging Task
```
Move processed content to import-staging directory:

**Source File:** {{SOURCE_FILE_PATH}}
**Staging Directory:** import-staging/
**Content Type:** {{CONTENT_TYPE}}

**Staging Steps:**
1. Create appropriate `import-staging/` subdirectory (characters, locations, items, contexts, outlines, stories)
2. Copy processed file to `import-staging/` location into the new format
3. Update file metadata
4. Generate staging confirmation

**Response Format:**
```json
{
  "staging_status": "success|error",
  "staging_path": "string",
  "file_metadata": {},
  "next_steps": ["string"]
}
```
