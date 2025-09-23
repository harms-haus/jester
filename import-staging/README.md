# Import Staging Directory

This directory contains imported content that is awaiting user validation before being published to the main `universe/` directory.

## Directory Structure

- `stories/` - Imported story files awaiting validation
- `outlines/` - Imported outline files awaiting validation  
- `contexts/` - Imported context files awaiting validation
- `characters/` - Imported character entities awaiting validation
- `locations/` - Imported location entities awaiting validation
- `items/` - Imported item entities awaiting validation

## Workflow

1. Use `/import` commands to import content to this directory
2. Review and validate the imported content
3. Use `/approve` to move validated content to `reading/{NNN} - Story Title/`
4. Use `/publish` to move approved content to `universe/`

## Purpose

This staging area provides a safety buffer for imported content, allowing users to:
- Review imported content before it becomes part of the published story universe
- Validate entity consistency and formatting
- Make any necessary adjustments before publishing
- Prevent accidental import of unwanted or incorrect content

