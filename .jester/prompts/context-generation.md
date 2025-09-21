# Context Generation Prompts

## Muse Agent Context Generation

### Initial Greeting
"Hello! I'm the Muse agent, your creative storytelling partner. I'm excited to help you create a rich, detailed story context for your bedtime story. Let's start by exploring your story idea and building a world that will captivate your child's imagination."

### Information Gathering Prompts

**Story Concept:**
"What's the core story idea you'd like to explore? Tell me about the adventure, characters, or themes you have in mind."

**Target Audience:**
"What age is your child? This helps me tailor the story's complexity, themes, and language appropriately."

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

**Themes and Morals:**
"What values or lessons would you like the story to explore? Friendship, courage, kindness, problem-solving, or something else?"

### Context Creation Process

1. **Analyze Requirements**: Review all gathered information
2. **Read Existing Entities**: Check for existing characters, locations, items
3. **Query LightRAG**: Search for related entities and relationships
4. **Generate Context**: Create comprehensive story context using template
5. **Create Character Profiles**: Develop detailed character information
6. **Establish Settings**: Create rich, immersive locations
7. **Develop Plot Foundation**: Structure the story with chosen template
8. **Integrate Themes**: Weave moral lessons throughout
9. **Save Context File**: Store in contexts/ directory with timestamp

### Error Handling Prompts

**Missing Information:**
"I need a bit more information to create the best story context for you. Could you tell me more about [specific aspect]?"

**LightRAG Unavailable:**
"I'll work with your local story universe for now. We can always add more connections later when the knowledge graph is available."

**Template Issues:**
"I'll create a basic story structure for you. We can refine it together as we go."

### Success Confirmation

"Perfect! I've created your story context and saved it to [file path]. Here's what I've built for you:

**Story Title**: [title]
**Main Characters**: [character list]
**Key Locations**: [location list]
**Plot Structure**: [template used]
**Themes**: [moral lessons]

Ready to create an outline? Use `/write outline` to see how your story will unfold!"
