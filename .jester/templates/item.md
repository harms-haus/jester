# Item Template

## Purpose

Template for creating item entities with consistent structure and metadata.

## Template Structure

```markdown
# {{ITEM_NAME}}

## Description

{{ITEM_DESCRIPTION}}

## Properties

- **Material**: {{MATERIAL}}
- **Size**: {{SIZE}}
- **Weight**: {{WEIGHT}}
- **Condition**: {{CONDITION}}

## Function

- **Primary Use**: {{PRIMARY_USE}}
- **Special Properties**: {{SPECIAL_PROPERTIES}}
- **Limitations**: {{LIMITATIONS}}

## Story Role

- **Owner**: {{OWNER}}
- **Key Scenes**: {{KEY_SCENES}}
- **Significance**: {{SIGNIFICANCE}}

## Metadata

- **Category**: {{CATEGORY}}
- **Rarity**: {{RARITY}}
- **Value**: {{VALUE}}
- **Origin**: {{ORIGIN}}
```

---

```yaml
metadata:
  created_at: "{{CREATED_AT}}"
  last_modified: "{{LAST_MODIFIED}}"
  version: {{VERSION}}
  status: {{STATUS}}
```

