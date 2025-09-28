



# Entity Templates

## Purpose

Comprehensive entity templates for characters, locations, and items with consistent structure and metadata.

## Common Entity Structure

### Base Metadata
```markdown
# {{ENTITY_NAME}}

**Type:** {{ENTITY_TYPE}}  
**Created:** {{CREATED_AT}}  
**Last Modified:** {{LAST_MODIFIED}}  
**Version:** {{VERSION}}
```

## Character Template

```markdown
# {{CHARACTER_NAME}}

**Type:** character  
**Created:** {{CREATED_AT}}  
**Last Modified:** {{LAST_MODIFIED}}  
**Version:** {{VERSION}}

## Description

{{CHARACTER_DESCRIPTION}}

## Personality

- **Traits**: {{PERSONALITY_TRAITS}}
- **Motivations**: {{MOTIVATIONS}}
- **Fears**: {{FEARS}}
- **Strengths**: {{STRENGTHS}}
- **Weaknesses**: {{WEAKNESSES}}

## Relationships

- **Family**: {{FAMILY_RELATIONSHIPS}}
- **Friends**: {{FRIEND_RELATIONSHIPS}}
- **Enemies**: {{ENEMY_RELATIONSHIPS}}
- **Acquaintances**: {{ACQUAINTANCE_RELATIONSHIPS}}

## Story Appearances

- **Stories**: {{STORY_APPEARANCES}}
- **Role**: {{CHARACTER_ROLE}}
- **Significance**: {{CHARACTER_SIGNIFICANCE}}

## Development

- **Character Arc**: {{CHARACTER_ARC}}
- **Growth**: {{CHARACTER_GROWTH}}
- **Challenges**: {{CHARACTER_CHALLENGES}}

## Additional Notes

{{ADDITIONAL_NOTES}}
```

## Location Template

```markdown
# {{LOCATION_NAME}}

**Type:** location  
**Created:** {{CREATED_AT}}  
**Last Modified:** {{LAST_MODIFIED}}  
**Version:** {{VERSION}}

## Basic Information

- **Name**: {{LOCATION_NAME}}
- **Type**: {{LOCATION_TYPE}}
- **Climate**: {{CLIMATE}}
- **Size**: {{SIZE}}

## Description

{{LOCATION_DESCRIPTION}}

## Physical Features

- **Terrain**: {{TERRAIN_DESCRIPTION}}
- **Landmarks**: 
  {{#LANDMARKS}}
  - [[{{LANDMARK_NAME}}]] - {{LANDMARK_DESCRIPTION}}
  {{/LANDMARKS}}
- **Natural Resources**: {{NATURAL_RESOURCES}}

## Atmosphere & Mood

- **Feeling**: {{ATMOSPHERE_FEELING}}
- **Sounds**: {{ATMOSPHERE_SOUNDS}}
- **Smells**: {{ATMOSPHERE_SMELLS}}
- **Lighting**: {{ATMOSPHERE_LIGHTING}}

## Inhabitants

- **Primary Residents**: {{PRIMARY_RESIDENTS}}
- **Visitors**: {{VISITORS}}
- **Creatures**: {{CREATURES}}

## Story Significance

- **Role in Stories**: {{STORY_ROLE}}
- **Importance**: {{LOCATION_IMPORTANCE}}
- **Connections**: {{LOCATION_CONNECTIONS}}

## Additional Notes

{{ADDITIONAL_NOTES}}
```

## Item Template

```markdown
# {{ITEM_NAME}}

**Type:** item  
**Created:** {{CREATED_AT}}  
**Last Modified:** {{LAST_MODIFIED}}  
**Version:** {{VERSION}}

## Basic Information

- **Name**: {{ITEM_NAME}}
- **Type**: {{ITEM_TYPE}}
- **Rarity**: {{RARITY}}
- **Value**: {{VALUE}}

## Description

{{ITEM_DESCRIPTION}}

## Physical Properties

- **Material**: {{MATERIAL}}
- **Size**: {{SIZE}}
- **Weight**: {{WEIGHT}}
- **Appearance**: {{APPEARANCE}}
- **Condition**: {{CONDITION}}

## Magical Properties

- **Powers**: {{MAGICAL_POWERS}}
- **Limitations**: {{MAGICAL_LIMITATIONS}}
- **Activation**: {{ACTIVATION_METHOD}}
- **Duration**: {{DURATION}}

## Usage

- **Primary Use**: {{PRIMARY_USE}}
- **Secondary Use**: {{SECONDARY_USE}}
- **Activation**: {{USAGE_ACTIVATION}}
- **Requirements**: {{USAGE_REQUIREMENTS}}

## Story Significance

- **Role in Stories**: {{STORY_ROLE}}
- **Importance**: {{ITEM_IMPORTANCE}}
- **Connections**: {{ITEM_CONNECTIONS}}

## Additional Notes

{{ADDITIONAL_NOTES}}
```

## Usage Guidelines

### Template Selection
- **Character Template**: Use for all character entities
- **Location Template**: Use for all location entities
- **Item Template**: Use for all item entities

### Field Customization
- Replace all `{{PLACEHOLDER}}` values with actual data
- Maintain consistent field naming across all entity types
- Use appropriate data types for each field

### Integration
- Templates are designed to work with all Jester agents
- Consistent structure enables easy data exchange
- Supports both automated and manual entity creation workflows
