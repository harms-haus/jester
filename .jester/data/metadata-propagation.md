

# Metadata Propagation Prompts

## Write Agent Metadata Management

### Metadata Flow Process
"Ensuring all metadata flows correctly through the story pipeline from context → outline → story. This maintains consistency and provides proper tracking information."

### Context Metadata Extraction
"Extracting metadata from your context file:
- **Story Title**: {story_title}
- **Target Audience**: {age_range} years old
- **Target Length**: {min_words}-{max_words} words (target: {final_target})
- **Plot Template**: {template_type}
- **Theme/Moral**: {moral_lesson}
- **Created**: {created_timestamp}
- **Version**: {version_number}"

### Outline Metadata Inheritance
"Propagating metadata from context to outline:
- **Inherited Fields**: All context metadata is preserved
- **Added Fields**: 
  - Outline-specific metadata (estimated_word_count, plot_structure)
  - Context file reference for traceability
  - Outline creation timestamp
- **Validation**: Ensuring all required fields are present"

### Story Metadata Finalization
"Finalizing metadata for the completed story:
- **Inherited Fields**: All context and outline metadata preserved
- **Added Fields**:
  - Actual word count (validated against target)
  - Reading time calculation
  - Story completion timestamp
  - Outline file reference for traceability
- **Validation**: Final check of all metadata consistency"

### Metadata Validation Rules
"Ensuring metadata consistency across all stages:

**Required Fields**:
- story_title (string)
- target_audience.age_range (string)
- target_length.min_words (number)
- target_length.max_words (number)
- target_length.final_target (number)
- plot_template (string)
- created_at (timestamp)
- last_modified (timestamp)
- version (number)

**Outline-Specific Fields**:
- context_file (string) - reference to source context
- estimated_word_count (number)
- plot_structure (object)

**Story-Specific Fields**:
- outline_file (string) - reference to source outline
- actual_word_count (number)
- reading_time_minutes (number)
- word_count_validation (boolean)"

### Metadata Error Handling

**Missing Required Fields:**
"I notice some required metadata is missing. Let me add default values and flag this for your review:
- Missing: {missing_fields}
- Default Values: {default_values}
- Please review and update as needed"

**Inconsistent Metadata:**
"I found some inconsistencies in the metadata:
- **Issue**: {inconsistency_description}
- **Context Value**: {context_value}
- **Outline Value**: {outline_value}
- **Resolution**: {suggested_fix}"

**Version Mismatch:**
"The metadata versions don't match across files:
- **Context Version**: {context_version}
- **Outline Version**: {outline_version}
- **Story Version**: {story_version}
- **Recommendation**: Update all files to version {latest_version}"

### Metadata Templates

**Context Metadata Template:**
```yaml
metadata:
  created_at: "{{timestamp}}"
  last_modified: "{{timestamp}}"
  version: 1
  story_title: "{{title}}"
  target_audience:
    age_range: "{{age_range}}"
    reading_level: "{{reading_level}}"
  target_length:
    min_words: {{min_words}}
    max_words: {{max_words}}
    final_target: {{final_target}}
  plot_template: "{{template_type}}"
  themes: ["{{theme1}}", "{{theme2}}"]
  morals: ["{{moral1}}", "{{moral2}}"]
```

**Outline Metadata Template:**
```yaml
metadata:
  context_file: "{{context_file_path}}"
  created_at: "{{timestamp}}"
  last_modified: "{{timestamp}}"
  version: 1
  story_title: "{{inherited_title}}"
  target_audience: {{inherited_audience}}
  target_length: {{inherited_length}}
  plot_template: "{{inherited_template}}"
  estimated_word_count: {{estimated_count}}
  plot_structure:
    template_used: "{{template_type}}"
    plot_points: {{plot_point_count}}
    character_arc: "{{arc_description}}"
```

**Story Metadata Template:**
```yaml
metadata:
  outline_file: "{{outline_file_path}}"
  context_file: "{{context_file_path}}"
  created_at: "{{timestamp}}"
  last_modified: "{{timestamp}}"
  version: 1
  story_title: "{{inherited_title}}"
  target_audience: {{inherited_audience}}
  target_length: {{inherited_length}}
  plot_template: "{{inherited_template}}"
  actual_word_count: {{actual_count}}
  reading_time_minutes: {{reading_time}}
  word_count_validation: {{validation_status}}
```

### Metadata Success Confirmation

"✅ Metadata propagation complete! Here's the summary:

**Context → Outline**:
- All required fields inherited ✓
- Outline-specific fields added ✓
- Version consistency maintained ✓

**Outline → Story**:
- All metadata preserved ✓
- Story-specific fields added ✓
- Word count validated ✓

**Final Metadata**:
- **Title**: {final_title}
- **Target Audience**: {final_audience}
- **Word Count**: {actual_words}/{target_words}
- **Reading Time**: {reading_time} minutes
- **Template**: {template_used}
- **Version**: {final_version}

All metadata is consistent and properly tracked through the pipeline! 🎯"
