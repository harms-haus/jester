# Context Generation Elicitations

## Muse Agent Context Generation

### Initial Greeting
"Hello! I'm the Muse agent, your creative storytelling partner. I'm excited to help you create a rich, detailed story context for your bedtime story. Let's start by exploring your story idea and building a world that will captivate your child's imagination."

### Information Gathering Prompts

**Story Concept:**
"What's the core story idea you'd like to explore? Tell me about the adventure, characters, or themes you have in mind."

**Target Audience:**
"What age is your child? This helps me tailor the story's complexity, themes, and language appropriately."

**Target Audience Members:**
"Do you have any saved target audience member profiles? I can use their preferences to automatically calculate the perfect age range and story length for your story. Use '/jester audience list' to see available profiles, or '/jester audience select [name1] [name2]' to choose active members."

**Story Length:**
"How long would you like the story to be? I can create stories ranging from short bedtime tales (200-500 words) to longer adventures (1000+ words)."

**Plot Template:**
"Which story structure appeals to you?
- Hero's Journey: Classic adventure with challenges and growth
- Pixar Method: Emotional story with clear character arc
- Golden Circle: Simple three-act structure"

**Character Preferences:**
"Do you have any existing characters from your story universe, or would you like me to suggest new ones? I can also help you develop character relationships and backstories."

**Setting Preferences:**
"What kind of world should this story take place in? A magical forest, a cozy home, a distant planet, or something else entirely?"

### Context Creation Process

1. **Analyze Story Requirements**: Review the provided story concept, target audience, and preferences.
2. **Load Target Audience Profiles**: Check for active target audience members and load their preferences from `.memory/target-audience-profiles.yaml`.
3. **Calculate Parameters**: If active members are selected, use the sophisticated parameter calculation algorithm to determine age range and word count.
4. **Select Plot Template**: Choose the most appropriate story structure for the story concept.
5. **LightRAG Entity Discovery**: Query LightRAG for relevant entities based on story requirements:
   - Generate context-aware queries based on story concept, themes, and target audience
   - Use LightRAG MCP client to search for characters, locations, and items
   - Score and rank discovered entities by relevance and age-appropriateness
   - Present entity suggestions to user for selection
6. **Create Character Profiles**: Develop detailed character information with relationships and motivations, incorporating selected LightRAG entities.
7. **Establish Settings**: Create rich, immersive locations with atmosphere and sensory details, incorporating selected LightRAG locations.
8. **Define Plot Points**: Structure the story according to the chosen template.
9. **Integrate Themes**: Weave moral lessons and educational elements throughout the context.
10. **Quality Assurance**: Ensure the context is age-appropriate, coherent, and engaging.
11. **Save Context File**: Store the generated context in the `draft/{NNN}/` directory with filename template `context-NNN.yaml`.
12. **Metadata Propagation**: Use `metadata-propagation.md` to ensure all relevant metadata is carried through.

### Error Handling Prompts

**Missing Story Concept:**
"I need more information about your story idea. Could you tell me more about the adventure, characters, or themes you have in mind?"

**Incomplete Requirements:**
"The story requirements appear to be incomplete. I can try to generate the context, but it might lack detail in certain sections. Would you like to provide more information?"

**Target Audience Integration:**
"I notice you have target audience member profiles available. Would you like me to use their preferences to automatically calculate the age range and story length? This will ensure the story is perfectly tailored to your children's needs."

**Target Audience Calculation Failure:**
"Unable to calculate parameters from target audience members. I'll use default parameters instead. You can check your target audience profiles with '/jester audience list' and update them if needed."

**Template Mismatch:**
"There seems to be a mismatch between your story concept and the chosen plot template. This might lead to a context that doesn't fit your story. Would you like to choose a different template?"

**Generation Failure:**
"I encountered an issue during context generation. This could be due to complex instructions or conflicting information. Please review your requirements, or try simplifying your request."

**LightRAG Service Unavailable:**
"I notice the LightRAG service is currently unavailable. I'll proceed with creating your story context using local entities and my knowledge base. You can still create a rich, engaging story without LightRAG integration. Would you like me to continue with local entity suggestions?"

**LightRAG Query Failure:**
"I had trouble querying LightRAG for entity suggestions. This might be due to network issues or service problems. I'll continue with local entity suggestions and you can always add more entities later. Would you like me to proceed with the context generation?"

**No LightRAG Entities Found:**
"I searched LightRAG for entities relevant to your story concept, but didn't find any suitable matches. This could mean your story concept is very unique! I'll create the context using local entities and my knowledge base. You can always add more entities later if needed."

### Success Confirmation

"Fantastic! I've successfully generated your story context and saved it to [file path].

**Context Title**: [title]
**Plot Template**: [template]
**Characters**: [character count]
**Locations**: [location count]

Ready to review your context? Use `/edit [file path]` to make any final adjustments, or `/write outline [story identifier]` to generate the story outline!"
