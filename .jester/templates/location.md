# Location Template

## Purpose

Template for creating location entities with consistent structure and metadata.

## Template Structure

```markdown
# {{LOCATION_NAME}}

## Description

{{LOCATION_DESCRIPTION}}

## Atmosphere

- **Mood**: {{MOOD}}
- **Weather**: {{WEATHER}}
- **Time of Day**: {{TIME_OF_DAY}}
- **Season**: {{SEASON}}

## Features

- **Key Landmarks**: {{KEY_LANDMARKS}}
- **Notable Objects**: {{NOTABLE_OBJECTS}}
- **Sensory Details**: {{SENSORY_DETAILS}}

## Story Role

- **Primary Purpose**: {{PRIMARY_PURPOSE}}
- **Key Scenes**: {{KEY_SCENES}}
- **Significance**: {{SIGNIFICANCE}}

## Metadata

- **Type**: {{LOCATION_TYPE}}
- **Size**: {{SIZE}}
- **Accessibility**: {{ACCESSIBILITY}}
- **Population**: {{POPULATION}}
```

---

```yaml
metadata:
  created_at: "{{CREATED_AT}}"
  last_modified: "{{LAST_MODIFIED}}"
  version: {{VERSION}}
  status: {{STATUS}}
```

