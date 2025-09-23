# Content Import Explanations

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

### Supported Content Types

**Entity Files:**
- Character descriptions and profiles
- Location descriptions and settings
- Item descriptions and properties

**Story Files:**
- Complete bedtime stories
- Story outlines and drafts
- Story fragments and ideas

### Import Staging Process
All imported content goes through a staging process:

1. **import-staging/stories/**: For story content
2. **import-staging/characters/**: For character entities
3. **import-staging/locations/**: For location entities
4. **import-staging/items/**: For item entities

### Quality Standards
Imported content must meet these standards:

- **Structure**: Follow Jester template formats
- **Completeness**: Include all required fields
- **Consistency**: Align with existing story universe
- **Quality**: Meet content quality standards

### Next Steps After Import
After importing content:

1. Review staged content in import-staging/
2. Use `/approve` to move content to ready stage
3. Use `/edit` to refine and improve content
4. Use `/publish` to integrate into complete universe
