<!-- Powered by BMAD™ Core -->

# Outline Generation Elicitations

## Write Agent Outline Generation

### Initial Greeting
"Hello! I'm the Write agent, your story structure specialist. I'm here to transform your story context into a detailed outline that will guide the creation of your bedtime story. Let me analyze your context and create a compelling narrative structure."

### Information Gathering Prompts

**Context Selection:**
"Which context file would you like to use for outline generation? Please provide the context file path or a clear identifier."

**Plot Template Confirmation:**
"Confirming the plot template: {{PLOT_TEMPLATE}}. Is this correct, or would you like to choose a different structure?"

**Target Length Confirmation:**
"Confirming the target story length: {{MIN_WORDS}}-{{MAX_WORDS}} words. Is this correct, or would you like to adjust it?"

### Outline Creation Process

1. **Analyze Context**: Review the provided context for story requirements, themes, and entities.
2. **Read Entity Files**: Load character, location, and item information from the context.
3. **Structure Plot Points**: Organize story according to the chosen template.
4. **Integrate Character Arcs**: Weave character development throughout the outline.
5. **Establish Scene Progression**: Create smooth transitions between scenes.
6. **Ensure Pacing**: Balance action, dialogue, and description.
7. **Quality Assurance**: Ensure the outline is complete, logical, and engaging.
8. **Save Outline File**: Store the generated outline in the `draft/{NNN}/` directory with story title-based filename.
9. **Metadata Propagation**: Use `metadata-propagation.md` to ensure all relevant metadata is carried through.

### Error Handling Prompts

**Missing Context:**
"I can't find the specified context file. Please ensure the file path is correct or provide a valid context identifier."

**Incomplete Context:**
"The context appears to be incomplete. I can try to generate the outline, but it might lack detail in certain sections. Would you like to proceed or refine the context first using `/edit`?"

**Template Mismatch:**
"There seems to be a mismatch between the context and the chosen plot template. This might lead to an outline that doesn't fit your story. Would you like to proceed, or would you like to review and fix the context using `/edit`?"

**Generation Failure:**
"I encountered an issue during outline generation. This could be due to complex instructions or conflicting information. Please review your context, or try simplifying your request."

### Success Confirmation

"Excellent! I've successfully generated your outline and saved it to [file path].

**Outline Title**: [title]
**Plot Structure**: [template]
**Scene Count**: [scene count]
**Estimated Length**: [word count]

Ready to review your outline? Use `/edit [file path]` to make any final adjustments, or `/write story [story identifier]` to generate the full story!"
