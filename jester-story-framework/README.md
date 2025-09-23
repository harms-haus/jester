# jester-story-framework

🎭 **CLI tool to initialize Jester story framework in your project**

Jester is an AI-powered bedtime story creation system that helps parents create consistent, personalized stories through a hierarchical command structure. This CLI tool sets up the Jester framework in your project directory.

## Installation

```bash
npx jester-story-framework
```

No global installation required! The tool runs directly via npx.

## Usage

1. **Navigate to your project directory** where you want to set up Jester
2. **Run the initialization command**:
   ```bash
   npx jester-story-framework
   ```
3. **The tool will create** a `.jester/` directory with all framework files
4. **Use @jester in your IDE** to start creating stories

## What It Does

- ✅ Creates `.jester/` directory structure
- ✅ Copies all framework files (agents, prompts, templates, etc.)
- ✅ Sets up the complete Jester story creation system
- ✅ Provides guidance for next steps

## Framework Structure

The tool creates the following structure in your project:

```
.jester/
├── agents/           # AI agent definitions
├── prompts/          # Prompt templates
├── templates/        # Story and entity templates
├── tasks/            # Workflow tasks
├── data/             # Reference data
└── utils/            # Utility functions
```

## After Initialization

1. **Use @jester in your IDE** (Cursor, VS Code) to access the story creation workflow
2. **The @jester agent will detect** if you have existing content and suggest importing it
3. **Start creating stories** using the command structure:
   - Use `/jester help` for guidance and project setup
   - Use `/muse create-new` for context gathering
   - Use `/write outline` for outline generation
   - Use `/write story` for story creation
   - Use `/edit`, `/delete`, `/approve`, `/publish` for content management

## Requirements

- Node.js 14.0.0 or higher
- IDE with AI agent support (Cursor, VS Code)

## Safety

- The tool will **not overwrite** existing `.jester/` directories
- All framework files are **read-only** and safe to use
- Your existing project files are **never modified**

## Troubleshooting

**Q: The tool says ".jester directory already exists"**
A: Remove the existing `.jester/` directory first, or use a different project directory.

**Q: I don't see the @jester agent in my IDE**
A: Make sure you're using an IDE with AI agent support (Cursor, VS Code) and that the `.jester/` directory was created successfully.

**Q: How do I import my existing stories?**
A: After initialization, use @jester in your IDE and select "Import Content" to scan for existing stories.

## License

MIT

## Support

For issues and questions, please visit the [Jester GitHub repository](https://github.com/jester-story-framework/jester-story-framework).

---

**Happy storytelling! 🎭**

