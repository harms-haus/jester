# Entity Import Explanations

## Entity Import Process Overview

### What is Entity Import?
Entity import allows you to bring existing character, location, and item descriptions into the Jester system from external files. This is useful when you have entity descriptions created outside of Jester that you want to integrate into your story universe.

### Entity Import Workflow
The entity import process follows these steps:

1. **Directory Scanning**: Scan directories for potential entity files
2. **Entity Analysis**: Analyze files to determine entity type and content
3. **Entity Processing**: Extract and structure entity information
4. **Validation**: Ensure entities meet Jester quality standards
5. **Staging**: Place processed entities in import-staging directory
6. **Integration**: Use approval workflow to move entities to ready stage

### Supported Entity Types

**Character Entities:**
- Character names and descriptions
- Personality traits and motivations
- Character relationships and connections
- Character roles and significance

**Location Entities:**
- Location names and descriptions
- Setting details and atmosphere
- Key features and landmarks
- Location connections and significance

**Item Entities:**
- Item names and descriptions
- Item properties and characteristics
- Item purpose and significance
- Item relationships and connections

### Entity Staging Process
All imported entities go through a staging process:

1. **import-staging/characters/**: For character entities
2. **import-staging/locations/**: For location entities
3. **import-staging/items/**: For item entities

### Entity Quality Standards
Imported entities must meet these standards:

- **Structure**: Follow Jester entity template formats
- **Completeness**: Include all required entity fields
- **Consistency**: Align with existing story universe
- **Quality**: Meet entity description quality standards

### Entity Integration
After importing entities:

1. Review staged entities in import-staging/
2. Use `/approve` to move entities to ready stage
3. Use `/edit` to refine and improve entities
4. Use `/publish` to integrate into complete universe
5. Entities become available for story creation and editing
