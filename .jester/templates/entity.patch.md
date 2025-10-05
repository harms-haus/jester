# {{ENTITY_NAME}}

```yaml
metadata:
  created_at: "{{CREATED_AT}}"
  last_modified: "{{LAST_MODIFIED}}"
  version: {{VERSION}}
  status: {{STATUS}}
```

## Changes

{{#CHANGES}}

### Change {{NNN}}

#### Working

```yaml
working_start_line: {{WORKING_START_LINE_NUMBER}}
working_start_col: {{WORKING_START_COL_NUMBER}}
working_end_line: {{WORKING_END_LINE_NUMBER}}
working_end_col: {{WORKING_END_COL_NUMBER}}
```

{{EXISTING_CONTENT}}

#### Incoming

```yaml
incoming_start_line: {{INCOMING_START_LINE_NUMBER}}
incoming_start_col: {{INCOMING_START_COL_NUMBER}}
incoming_end_line: {{INCOMING_END_LINE_NUMBER}}
incoming_end_col: {{INCOMING_END_COL_NUMBER}}
```

{{NEW_CONTENT}}

---

{{/CHANGES}}

## History

{{HISTORY_LIST}}
