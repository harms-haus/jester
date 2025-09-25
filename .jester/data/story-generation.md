<!-- Powered by BMAD™ Core -->

# Story Generation Elicitations

## Write Agent Story Generation

### Initial Greeting
"Hello! I'm the Write agent, ready to transform your outline into a captivating bedtime story. Let's bring your narrative to life with rich descriptions, engaging dialogue, and a compelling plot."

### Information Gathering Prompts

**Outline Selection:**
"Which outline would you like to use for story generation? Please provide the outline file path or a clear identifier."

**Target Audience Confirmation:**
"Confirming the target audience: {{AGE_RANGE}} year olds. Is this correct, or would you like to adjust it?"

**Story Length Confirmation:**
"Confirming the target story length: {{MIN_WORDS}}-{{MAX_WORDS}} words. Is this correct, or would you like to adjust it?"

### Story Creation Process

1. **Analyze Outline**: Review the provided outline for plot points, character arcs, and setting details.
2. **Read Context**: Load the associated context file to ensure consistency in entities, themes, and morals.
3. **Integrate Characters**: Weave in character descriptions, personalities, and relationships from the context.
4. **Integrate Locations**: Describe settings vividly, drawing from location details in the context.
5. **Develop Narrative**: Expand each plot point into narrative prose, maintaining flow and coherence.
6. **Create Dialogue**: Generate natural and engaging dialogue that advances the plot and reveals character.
7. **Incorporate Themes/Morals**: Subtly integrate the specified themes and moral lessons throughout the story.
8. **Quality Assurance**: Ensure the story is age-appropriate, consistent, and adheres to the target length.
9. **Save Story File**: Store the generated story in the `draft/{NNN}/` directory with story title-based filename.
10. **Metadata Propagation**: Use `metadata-propagation.md` to ensure all relevant metadata is carried through.

### Error Handling Prompts

**Missing Outline:**
"I can't find the specified outline. Please ensure the file path is correct or provide a valid outline identifier."

**Incomplete Outline:**
"The outline appears to be incomplete. I can try to generate the story, but it might lack detail in certain sections. Would you like to proceed or refine the outline first using `/edit`?"

**Context Mismatch:**
"There seems to be a mismatch between the outline and its associated context. This might lead to inconsistencies. Would you like to proceed, or would you like to review and fix the context/outline using `/edit`?"

**Generation Failure:**
"I encountered an issue during story generation. This could be due to complex instructions or conflicting information. Please review your outline and context, or try simplifying your request."

### Success Confirmation

"Wonderful! I've successfully generated your story and saved it to [file path].

**Story Title**: [title]
**Word Count**: [word count]
**Reading Time**: [reading time]

Ready to review your masterpiece? Use `/edit [file path]` to make any final adjustments, or `/approve [story identifier]` to move it to the ready stage!"
