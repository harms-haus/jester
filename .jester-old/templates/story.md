

# Story Template for Write Agent
# This template is used by the Write agent for story generation

# {{STORY_TITLE}}

**A bedtime story for {{AGE_RANGE}} year olds**  
**Reading time: {{READING_TIME_MINUTES}} minutes**  
**Word count: {{WORD_COUNT}} words**

---

{{STORY_SUMMARY}}

## {{STORY_TITLE}}

{{STORY_CONTENT}}

---

## About This Story

**Outline:** {{OUTLINE_FILE}}  
**Context:** {{CONTEXT_FILE}}  

### Themes
{{#THEMES}}
- {{THEME}}
{{/THEMES}}

### Moral Lessons
{{#MORALS}}
- {{MORAL}}
{{/MORALS}}

### Characters
{{#CHARACTERS}}
- **{{NAME}}:** {{DESCRIPTION}}
{{/CHARACTERS}}

### Settings
{{#LOCATIONS}}
- **{{NAME}}:** {{DESCRIPTION}}
{{/LOCATIONS}}

---

```yaml
metadata:
  created_at: "{{CREATED_AT}}"
  last_modified: "{{LAST_MODIFIED}}"
  version: {{VERSION}}
  status: {{STATUS}}
```

## History

{{HISTORY_LIST}}
