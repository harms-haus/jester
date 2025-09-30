# Editing Workflows

## Purpose

Comprehensive editing workflows for content, entities, and cross-stage editing operations in the Jester system. These workflows ensure consistency and integrity when making changes to entities, stories, and plot points.

## Available Editing Workflows

This directory contains specialized editing workflows for different types of changes:

### 1. Entity Management Workflows

- **[Renaming Entities](rename-entity.md)** - Safely rename entities and update all references
- **[Adding Entities to Stories](add-entity.md)** - Add entities to stories with proper integration
- **[Removing Entities from Stories](remove-entity.md)** - Remove entities while maintaining integrity
- **[Generic Entity Changes](entity-change.md)** - Handle entity description, relationship, and property changes

### 2. Story Management Workflows

- **[Renaming Stories](rename-story.md)** - Safely rename stories and update all references

### 3. Plot Structure Workflows

- **[Generic Plot Point Changes](plotpoint-change.md)** - Handle plot point modifications and structure changes

## Key Principles

### Cross-Contamination Prevention

All workflows emphasize preventing cross-contamination between `reading/` and `universe/` directories:

- Edits in `reading/` should only trigger secondary edits in `reading/`
- If a `universe/` file needs changes due to `reading/` edits, create or edit a `.patch` file instead
- Never directly modify `universe/` files when working in `reading/`

### Reference Integrity

All workflows maintain reference integrity through:

- Wiki-link validation (`[[Entity Name]]` syntax)
- Bidirectional relationship updates
- Entity story appearances tracking
- Cross-reference consistency checks

### Quality Standards

All editing workflows follow these quality standards:

#### Consistency Checks

- Character descriptions match across files
- Setting details are consistent
- Plot points align with story structure
- References and links are accurate
- Entity relationships are bidirectional
- Wiki-links resolve to existing files

#### Validation Requirements

- All `[[Entity Name]]` links have corresponding entity files
- No orphaned references
- No broken wiki-link syntax
- Entity names are consistent across all references
- Entity types match their usage context
- Reference context is appropriate

#### Success Metrics

- **Reference Integrity**: All references updated correctly
- **Link Integrity**: All wiki-links resolve properly
- **System Consistency**: No broken relationships
- **Content Quality**: Changes maintain story quality
- **User Experience**: Changes are seamless and intuitive

## Workflow Selection Guide

Choose the appropriate workflow based on your editing task:

| Task | Workflow |
|------|----------|
| Rename a character, location, or item | [Renaming Entities](rename-entity.md) |
| Rename a story title | [Renaming Stories](rename-story.md) |
| Add an entity to a story | [Adding Entities](add-entity.md) |
| Remove an entity from a story | [Removing Entities](remove-entity.md) |
| Update entity description or properties | [Generic Entity Changes](entity-change.md) |
| Modify plot points or structure | [Generic Plot Point Changes](plotpoint-change.md) |

## Next Steps

1. Select the appropriate workflow for your editing task
2. Follow the workflow steps carefully
3. Validate all references and links
4. Check entity relationship integrity
5. Proceed with next workflow stage
6. Continue content development
