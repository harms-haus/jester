<!-- Powered by BMAD™ Core -->

# Import Workflows

## Purpose

Comprehensive import workflows for bringing external content and entities into the Jester system.

## Import Process Overview

### What is Content Import?
Content import allows you to bring existing stories and entities into the Jester system from external files or directories. This is useful when you have content created outside of Jester that you want to integrate into your story universe.

### Import Workflow
The import process follows these steps:

1. **File Discovery**: Scan directories for potential content files
2. **Content Analysis**: Analyze files to determine content type and structure
3. **Content Processing**: Extract and structure information according to Jester templates
4. **Validation**: Ensure content meets Jester quality standards
5. **Staging**: Place processed content in import-staging directory
6. **Integration**: Use approval workflow to move content to ready stage

## Supported Content Types

### Entity Files
- Character descriptions and profiles
- Location descriptions and settings
- Item descriptions and properties

### Story Files
- Complete bedtime stories
- Story outlines and drafts
- Story fragments and ideas

## Entity Import Details

### Character Entities
- Character names and descriptions
- Personality traits and motivations
- Character relationships and connections
- Character roles and significance

### Location Entities
- Location names and descriptions
- Setting details and atmosphere
- Key features and landmarks
- Location connections and significance

### Item Entities
- Item names and descriptions
- Item properties and characteristics
- Item purpose and significance
- Item relationships and connections

## Import Staging Process

All imported content goes through a staging process:

1. **import-staging/stories/**: For story content
2. **import-staging/characters/**: For character entities
3. **import-staging/locations/**: For location entities
4. **import-staging/items/**: For item entities

## Quality Standards

Imported content must meet these standards:

### Structure Requirements
- Character entities: Use .jester/templates/character-template.md
- Location entities: Use .jester/templates/location-template.md
- Item entities: Use .jester/templates/item-template.md
- Stories: Use .jester/templates/story-template.md
- Outlines: Use .jester/templates/outline-template.md
- Contexts: Use .jester/templates/context-template.yaml

### Content Requirements
- **Completeness**: Include all required fields
- **Consistency**: Align with existing story universe
- **Quality**: Meet content quality standards

## Integration Process

After importing content:

1. Review staged content in import-staging/
2. Use `/approve` to move content to ready stage
3. Use `/edit` to refine and improve content
4. Use `/publish` to integrate into complete universe
5. Entities become available for story creation and editing

## Import Validation

### Pre-Import Checks
- File format validation
- Content structure verification
- Template compliance checking
- Quality standard assessment

### Post-Import Validation
- Staging directory verification
- Content integrity checks
- Reference validation
- Universe consistency checks
