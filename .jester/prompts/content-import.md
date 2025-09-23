# Content Import Prompts

## Directory Processing Prompts

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
```

### Batch Processing Progress
```
Track the progress of batch import processing:

**Batch Details:**
- **Total Files**: {{TOTAL_FILES}}
- **Files Processed**: {{FILES_PROCESSED}}
- **Files Remaining**: {{FILES_REMAINING}}
- **Current File**: {{CURRENT_FILE}}

**Progress Status:**
- **Current Step**: {{CURRENT_STEP}}
- **Success Count**: {{SUCCESS_COUNT}}
- **Error Count**: {{ERROR_COUNT}}
- **Skipped Count**: {{SKIPPED_COUNT}}

**Progress Instructions:**
1. Show current file being processed
2. Display overall progress percentage
3. List any errors encountered so far
4. Show estimated time remaining
5. Provide option to continue or stop

**Response Format:**
```
Processing file {{CURRENT_FILE}} ({{FILES_PROCESSED}}/{{TOTAL_FILES}})
Progress: {{PROGRESS_PERCENTAGE}}%
Status: {{CURRENT_STEP}}

✅ Successfully processed: {{SUCCESS_COUNT}} files
❌ Errors encountered: {{ERROR_COUNT}} files
⏭️ Skipped: {{SKIPPED_COUNT}} files

{{ERROR_DETAILS_IF_ANY}}
```
```

### Duplicate Detection
```
Detect and handle duplicate files during directory import:

**Directory Contents:** {{DIRECTORY_FILES}}
**Existing Content:** {{EXISTING_CONTENT}}

**Duplicate Detection Rules:**
1. Check if file name matches existing content file
2. Check if content is similar to existing structured content
3. Check if file is already in structured format
4. Identify files that are clearly duplicates or variations

**Detection Instructions:**
- Compare file names (case-insensitive, normalized)
- Check for similar content in existing files
- Look for template structure indicators
- Identify files that are clearly the same content

**Response Format:**
```json
{
  "duplicates_found": [
    {
      "file_path": "string",
      "existing_content": "string",
      "similarity_score": number,
      "reason": "same_name|similar_content|already_structured"
    }
  ],
  "files_to_process": ["file_path1", "file_path2", ...],
  "files_to_skip": ["file_path1", "file_path2", ...]
}
```
```

## Content Analysis Prompts

### Content Type Detection
```
Analyze the following markdown content and determine if it describes a character, location, item, or story. Consider these indicators:

**Character indicators:**
- Personal names or character references
- Personality traits, motivations, fears
- Physical descriptions or appearance details
- Relationships with other entities
- Abilities, skills, or special powers

**Location indicators:**
- Place names or geographical references
- Physical features or environmental descriptions
- Atmosphere, mood, or setting details
- Inhabitants or entities that reside there
- Historical significance or backstory

**Item indicators:**
- Object names or item references
- Physical properties or characteristics
- Function, purpose, or special abilities
- Rarity, value, or significance
- History or origin details

**Story indicators:**
- Narrative structure with beginning, middle, end
- Character interactions and dialogue
- Plot progression and events
- Story themes and morals
- Bedtime story elements (age-appropriate content)

Content to analyze:
{{FILE_CONTENT}}

Respond with: CHARACTER, LOCATION, ITEM, or STORY
```

### Entity Content Extraction
```
Extract relevant information from the following unstructured content and map it to the appropriate template fields:

**Content:**
{{FILE_CONTENT}}

**Target Template:** {{TEMPLATE_TYPE}}

**Extraction Instructions:**
1. Identify the entity name and basic information
2. Extract descriptive content for the main description field
3. Look for personality traits, motivations, and fears (characters)
4. Identify physical features and atmosphere (locations)
5. Find special properties and functions (items)
6. Extract relationship information and create appropriate references
7. Look for backstory or historical context
8. Identify any story appearances or usage references

**Template Fields to Populate:**
{{TEMPLATE_FIELDS}}

Respond in JSON format with the extracted information mapped to template fields.
```

### Story Content Analysis
```
Analyze the following story content and extract information for updating to fit current knowledge base:

**Story Content:**
{{STORY_CONTENT}}

**Current Knowledge Base Entities:**
{{KNOWLEDGE_BASE_ENTITIES}}

**Analysis Instructions:**
1. Identify all entity references in the story (characters, locations, items)
2. Map story entities to current knowledge base entities
3. Identify wording that needs updating to match current entity descriptions
4. Check for template compliance (heroes_journey, pixar, golden_circle)
5. Identify story structure and plot elements
6. Note any inconsistencies with current knowledge base

**Response Format:**
```json
{
  "story_title": "string",
  "entity_references": [
    {
      "story_entity": "string",
      "knowledge_base_entity": "string",
      "confidence": "high|medium|low",
      "update_needed": boolean,
      "current_description": "string"
    }
  ],
  "template_compliance": {
    "current_template": "string",
    "target_template": "string",
    "compliance_score": number,
    "adjustments_needed": ["string"]
  },
  "wording_updates": [
    {
      "original_text": "string",
      "suggested_update": "string",
      "reason": "string"
    }
  ]
}
```
```

### Content Enrichment
```
Enhance the following extracted entity information to create a rich, detailed character/location/item description:

**Original Content:**
{{ORIGINAL_CONTENT}}

**Extracted Information:**
{{EXTRACTED_INFO}}

**Enrichment Instructions:**
1. Expand brief descriptions into detailed, engaging content
2. Add missing template fields with reasonable inferences
3. Create appropriate [[wiki-links]] for entity relationships
4. Enhance personality traits with specific examples (characters)
5. Add atmospheric details and sensory descriptions (locations)
6. Expand on special properties and functions (items)
7. Create compelling backstory elements where appropriate
8. Ensure content is appropriate for bedtime story context

**Target Audience:** {{TARGET_AUDIENCE}}
**Entity Type:** {{ENTITY_TYPE}}

Respond with the enriched content ready for template population.
```

### Story Content Update
```
Update the following story content to fit the current knowledge base entities and ensure template compliance:

**Original Story:**
{{ORIGINAL_STORY}}

**Knowledge Base Entities:**
{{KNOWLEDGE_BASE_ENTITIES}}

**Target Template:** {{TARGET_TEMPLATE}}

**Update Instructions:**
1. Replace entity references with current knowledge base entity names
2. Update entity descriptions to match current knowledge base descriptions
3. Ensure story follows the target template structure
4. Maintain story flow and narrative quality
5. Preserve original story themes and morals
6. Update any [[wiki-links]] to reference current entities
7. Ensure age-appropriate content for bedtime stories

**Response Format:**
```markdown
# {{UPDATED_STORY_TITLE}}

{{UPDATED_STORY_CONTENT}}

---
*Updated: {{UPDATE_TIMESTAMP}}*
*Template: {{TARGET_TEMPLATE}}*
*Entities: {{UPDATED_ENTITIES}}*
```
```

## Validation Prompts

### Import Validation
```
Validate the following imported content against the template requirements:

**Imported Content:**
{{IMPORTED_CONTENT}}

**Template Requirements:**
{{TEMPLATE_REQUIREMENTS}}

**Validation Checklist:**
1. All required fields are present and populated
2. Content quality is appropriate for the target audience
3. [[wiki-links]] are properly formatted and reference valid entities
4. Metadata fields (created, modified, version) are correctly set
5. Content follows the established template structure
6. No critical information is missing or malformed

**Issues Found:**
[List any validation issues]

**Recommendations:**
[Provide specific recommendations for improvement]
```

### Story Import Validation
```
Validate the following imported story against template compliance and knowledge base consistency:

**Imported Story:**
{{IMPORTED_STORY}}

**Target Template:** {{TARGET_TEMPLATE}}
**Knowledge Base Entities:** {{KNOWLEDGE_BASE_ENTITIES}}

**Validation Checklist:**
1. Story follows the target template structure
2. All entity references match current knowledge base
3. Story maintains narrative flow and quality
4. Content is age-appropriate for bedtime stories
5. [[wiki-links]] are properly formatted and reference valid entities
6. Story has clear beginning, middle, and end
7. Themes and morals are appropriate

**Issues Found:**
[List any validation issues]

**Recommendations:**
[Provide specific recommendations for improvement]
```

### Error Handling
```
Handle the following import error and provide user guidance:

**Error Type:** {{ERROR_TYPE}}
**Error Details:** {{ERROR_DETAILS}}
**File Path:** {{FILE_PATH}}
**Content Type:** {{CONTENT_TYPE}}

**Error Handling Instructions:**
1. Explain the error in user-friendly terms
2. Provide specific steps to resolve the issue
3. Suggest alternative approaches if applicable
4. Offer to retry with different parameters
5. Provide contact information for complex issues

**User Guidance:**
[Provide clear, actionable guidance for the user]
```

## Batch Import Summary Prompts

### Batch Import Success Summary
```
Generate a comprehensive summary of a successful batch import operation:

**Batch Import Details:**
- **Directory Processed:** {{DIRECTORY_PATH}}
- **Total Files Found:** {{TOTAL_FILES_FOUND}}
- **Files Processed:** {{FILES_PROCESSED}}
- **Files Skipped:** {{FILES_SKIPPED}}
- **Success Rate:** {{SUCCESS_RATE}}%

**Import Results:**
{{IMPORT_RESULTS}}

**Content Created:**
{{CONTENT_CREATED}}

**Files Skipped (with reasons):**
{{SKIPPED_FILES}}

**Summary Instructions:**
1. Provide an overview of the batch import operation
2. List all successfully imported content with their types
3. Show any files that were skipped and why
4. Highlight any issues or warnings encountered
5. Suggest next steps for the user
6. Provide paths to all generated files

**Response Format:**
```
🎉 Batch Import Complete!

📁 Directory: {{DIRECTORY_PATH}}
📊 Processed: {{FILES_PROCESSED}}/{{TOTAL_FILES_FOUND}} files
✅ Success Rate: {{SUCCESS_RATE}}%

📝 Content Created:
{{CONTENT_LIST}}

⏭️ Files Skipped:
{{SKIPPED_LIST}}

{{WARNINGS_OR_ISSUES}}

📂 Generated Files:
{{GENERATED_FILES_LIST}}

💡 Next Steps:
{{NEXT_STEPS}}
```
```

### Batch Import Error Summary
```
Generate a summary of a failed or partially failed batch import operation:

**Batch Import Details:**
- **Directory Processed:** {{DIRECTORY_PATH}}
- **Total Files Found:** {{TOTAL_FILES_FOUND}}
- **Files Processed:** {{FILES_PROCESSED}}
- **Files Failed:** {{FILES_FAILED}}
- **Files Skipped:** {{FILES_SKIPPED}}

**Error Details:**
{{ERROR_DETAILS}}

**Successful Imports:**
{{SUCCESSFUL_IMPORTS}}

**Failed Imports:**
{{FAILED_IMPORTS}}

**Summary Instructions:**
1. Explain what went wrong in the batch import
2. List which files were successfully processed
3. Detail which files failed and why
4. Provide specific suggestions for fixing issues
5. Offer to retry with corrections
6. Show any partial successes

**Response Format:**
```
⚠️ Batch Import Completed with Issues

📁 Directory: {{DIRECTORY_PATH}}
📊 Processed: {{FILES_PROCESSED}}/{{TOTAL_FILES_FOUND}} files
❌ Failed: {{FILES_FAILED}} files
⏭️ Skipped: {{FILES_SKIPPED}} files

✅ Successfully Imported:
{{SUCCESS_LIST}}

❌ Failed to Import:
{{FAILURE_LIST}}

🔧 Suggested Fixes:
{{FIX_SUGGESTIONS}}

💡 Next Steps:
{{NEXT_STEPS}}
```
```

### Directory Validation
```
Validate a directory before processing for import:

**Directory Path:** {{DIRECTORY_PATH}}
**Directory Contents:** {{DIRECTORY_CONTENTS}}

**Validation Checklist:**
1. Directory exists and is accessible
2. Contains .md files
3. Files appear to be content descriptions
4. Not already processed/structured
5. Within reasonable size limits

**Validation Instructions:**
- Check directory permissions and accessibility
- Scan for .md files and analyze their content
- Look for signs of already structured content
- Check file sizes and content quality
- Identify potential issues before processing

**Response Format:**
```json
{
  "directory_valid": boolean,
  "issues_found": [
    {
      "type": "permission|no_files|already_structured|size_limit",
      "description": "string",
      "severity": "error|warning|info"
    }
  ],
  "files_ready_for_import": number,
  "estimated_processing_time": "string",
  "recommendations": ["string"]
}
```
```

## Template Population Prompts

### Character Template Population
```
Populate the character template with the following extracted information:

**Character Name:** {{CHARACTER_NAME}}
**Extracted Data:** {{EXTRACTED_DATA}}

**Template Structure:**
```markdown
# {{CHARACTER_NAME}}

## Basic Information
- **Name**: {{CHARACTER_NAME}}
- **Type**: {{CHARACTER_TYPE}}
- **Age**: {{CHARACTER_AGE}}
- **Species**: {{CHARACTER_SPECIES}}

## Description
{{CHARACTER_DESCRIPTION}}

## Personality
- **Traits**: {{PERSONALITY_TRAITS}}
- **Motivations**: {{MOTIVATIONS}}
- **Fears**: {{FEARS}}

## Relationships
- **Family**: {{FAMILY_RELATIONSHIPS}}
- **Friends**: {{FRIEND_RELATIONSHIPS}}
- **Enemies**: {{ENEMY_RELATIONSHIPS}}

## Story Appearances
- **First Appearance**: {{FIRST_STORY}}
- **Recent Appearance**: {{RECENT_STORY}}
- **Total Stories**: {{STORY_COUNT}}

## Physical Description
- **Appearance**: {{PHYSICAL_DESCRIPTION}}
- **Clothing**: {{CLOTHING_STYLE}}
- **Distinctive Features**: {{DISTINCTIVE_FEATURES}}

## Abilities & Skills
- **Special Powers**: {{SPECIAL_POWERS}}
- **Skills**: {{SKILLS}}
- **Weaknesses**: {{WEAKNESSES}}

## Backstory
{{BACKSTORY}}

## Notes
{{ADDITIONAL_NOTES}}

---
*Created: {{CREATED_AT}}*
*Last Modified: {{LAST_MODIFIED}}*
*Version: {{VERSION}}*
```

**Instructions:**
1. Fill in all template fields with extracted or inferred data
2. Use "Unknown" for fields that cannot be determined
3. Create appropriate [[wiki-links]] for relationships
4. Ensure all content is appropriate for bedtime stories
5. Maintain consistent formatting and structure

Respond with the complete populated template.
```

### Location Template Population
```
Populate the location template with the following extracted information:

**Location Name:** {{LOCATION_NAME}}
**Extracted Data:** {{EXTRACTED_DATA}}

**Template Structure:**
```markdown
# {{LOCATION_NAME}}

## Basic Information
- **Name**: {{LOCATION_NAME}}
- **Type**: {{LOCATION_TYPE}}
- **Climate**: {{CLIMATE}}
- **Size**: {{SIZE}}

## Description
{{LOCATION_DESCRIPTION}}

## Physical Features
{{PHYSICAL_FEATURES}}

## Atmosphere & Mood
{{ATMOSPHERE_MOOD}}

## Inhabitants
{{INHABITANTS}}

## History & Significance
{{HISTORY_SIGNIFICANCE}}

## Story Appearances
{{STORY_APPEARANCES}}

## Connections
{{CONNECTIONS}}

## Special Properties
{{SPECIAL_PROPERTIES}}

## Notes
{{ADDITIONAL_NOTES}}

---
*Created: {{CREATED_AT}}*
*Last Modified: {{LAST_MODIFIED}}*
*Version: {{VERSION}}*
```

**Instructions:**
1. Fill in all template fields with extracted or inferred data
2. Use "Unknown" for fields that cannot be determined
3. Create appropriate [[wiki-links]] for connections and inhabitants
4. Ensure all content is appropriate for bedtime stories
5. Maintain consistent formatting and structure

Respond with the complete populated template.
```

### Item Template Population
```
Populate the item template with the following extracted information:

**Item Name:** {{ITEM_NAME}}
**Extracted Data:** {{EXTRACTED_DATA}}

**Template Structure:**
```markdown
# {{ITEM_NAME}}

## Basic Information
- **Name**: {{ITEM_NAME}}
- **Type**: {{ITEM_TYPE}}
- **Rarity**: {{RARITY}}
- **Value**: {{VALUE}}

## Description
{{ITEM_DESCRIPTION}}

## Physical Properties
{{PHYSICAL_PROPERTIES}}

## Function & Purpose
{{FUNCTION_PURPOSE}}

## Special Properties
{{SPECIAL_PROPERTIES}}

## History & Origin
{{HISTORY_ORIGIN}}

## Current Status
{{CURRENT_STATUS}}

## Story Appearances
{{STORY_APPEARANCES}}

## Relationships
{{RELATIONSHIPS}}

## Cultural Significance
{{CULTURAL_SIGNIFICANCE}}

## Notes
{{ADDITIONAL_NOTES}}

---
*Created: {{CREATED_AT}}*
*Last Modified: {{LAST_MODIFIED}}*
*Version: {{VERSION}}*
```

**Instructions:**
1. Fill in all template fields with extracted or inferred data
2. Use "Unknown" for fields that cannot be determined
3. Create appropriate [[wiki-links]] for relationships
4. Ensure all content is appropriate for bedtime stories
5. Maintain consistent formatting and structure

Respond with the complete populated template.
```

## Story Import Functionality

### Story Import Commands
- `/import story <file-path>` - Import and update single story file
- `/import story <directory-path>` - Import and update multiple story files
- `/import story <file-path> [template-type]` - Import with specific template compliance

### Story Import Process
1. Read existing .md story file
2. Analyze story content for entity references
3. Map story entities to current knowledge base entities
4. Update story wording to match current entity descriptions
5. Ensure story fits provided templates (heroes_journey, pixar, golden_circle)
6. Generate updated story file with proper formatting
7. Save to import-staging/stories/ directory with timestamp
8. Provide user feedback on import success and changes made
9. Inform user to use `/publish import-staging` when ready to publish

## Import Summary Prompts

### Import Success Summary
```
Generate a summary of the successful import operation:

**Import Details:**
- **Original File:** {{ORIGINAL_FILE}}
- **Content Type:** {{CONTENT_TYPE}}
- **Content Name:** {{CONTENT_NAME}}
- **Generated File:** {{GENERATED_FILE}}
- **Backup Created:** {{BACKUP_FILE}}

**Fields Populated:**
{{POPULATED_FIELDS}}

**Fields Inferred:**
{{INFERRED_FIELDS}}

**Fields Left Blank:**
{{BLANK_FIELDS}}

**Relationships Created:**
{{RELATIONSHIPS_CREATED}}

**Summary Instructions:**
1. Provide a clear, concise summary of what was imported
2. Highlight any fields that were inferred or left blank
3. List any relationships that were created
4. Suggest next steps for the user
5. Provide the path to the generated file

Respond with a user-friendly summary of the import operation.
```

### Import Error Summary
```
Generate a summary of the failed import operation:

**Error Details:**
- **Original File:** {{ORIGINAL_FILE}}
- **Content Type:** {{CONTENT_TYPE}}
- **Error Type:** {{ERROR_TYPE}}
- **Error Message:** {{ERROR_MESSAGE}}

**Issues Found:**
{{ISSUES_FOUND}}

**Suggestions:**
{{SUGGESTIONS}}

**Summary Instructions:**
1. Explain what went wrong in user-friendly terms
2. List the specific issues that prevented import
3. Provide actionable suggestions for fixing the issues
4. Offer alternative approaches if applicable
5. Encourage the user to try again with corrections

Respond with a helpful error summary and guidance.
```
