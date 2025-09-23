# jester

**J**ust **E**nigmatic **S**tory **T**elling

An AI-powered bedtime story creation system that transforms unstructured storytelling into a structured, collaborative workflow.

## Overview

jester adapts BMAD principles to create personalized bedtime stories through a hierarchical command structure:

### Core Commands
- **`/jester`** - Main entry point (init, help)
- **`/write`** - Story generation (context, outline, story)
- **`/muse`** - Brainstorming (create-new, explore-existing, list-elicitations)
- **`/edit`** - Content editing (character/location/item editing, general editing)
- **`/delete`** - Entity removal (character/location/item/story deletion)
- **`/approve`** - Draft approval to ready stage
- **`/publish`** - Story publishing with entities and patches
- **`/import`** - Content import from files or directories
- **`/search`** - Search local files and LightRAG database
- **`/validate`** - Content validation (context, outline, story)

### Three-Stage Workflow
1. **Context** (YAML) - Gather story ideas, characters, settings
2. **Outline** (Markdown) - Structure the plot and story flow
3. **Story** (Markdown) - Generate the final bedtime story

## Architecture

```
Context (YAML) → Outline (Markdown) → Story (Markdown)
```

- **File-based pipeline** with strict one-way flow
- **LightRAG integration** for entity discovery and consistency
- **Pure prompt-based agents** - external LLM agents follow markdown prompt rules
- **No TypeScript agent execution** - only MCP client for LightRAG integration

## Project Structure

```
jester/
├── src/                    # TypeScript source code
│   ├── agents/            # AI agent implementations
│   ├── clients/           # External API clients (LightRAG)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Main entry point
├── complete/              # Published work
│   ├── characters/        # Character definitions
│   ├── locations/         # Location definitions
│   └── items/             # Item definitions
├── stories/               # Generated stories
├── outlines/              # Story outlines
├── contexts/              # Story context files
├── .jester/               # Framework configuration
│   ├── agents/            # Agent rule files
│   ├── templates/         # Document templates
│   ├── tasks/             # Task definitions
│   └── data/              # Reference data
└── docs/                  # Project documentation
```

## Usage

### Pure Prompt-Based System

jester uses a **pure prompt-based architecture** where external LLM agents follow markdown prompt rules. No TypeScript agent execution is needed.

### How to Use

1. **Access Agent Instructions**: Read the prompt files in `.jester/agents/`
   - `/jester` - `.jester/agents/jester.md` (main entry point)
   - `/write` - `.jester/agents/write.md` (story generation)
   - `/muse` - `.jester/agents/muse.md` (brainstorming)
   - `/edit` - `.jester/agents/edit.md` (content editing)
   - `/delete` - `.jester/agents/delete.md` (entity removal)
   - `/approve` - `.jester/agents/approve.md` (draft approval)
   - `/publish` - `.jester/agents/publish.md` (story publishing)
   - `/import` - `.jester/agents/import.md` (content import)
   - `/search` - `.jester/agents/search.md` (knowledge search)

2. **Provide to External LLM**: Copy the agent instructions and provide them to any LLM capable of following prompt rules and performing file operations

3. **Follow the Command Structure**: 
   - Use `/jester help` for guidance and project setup
   - Use `/muse create-new` to generate story context
   - Use `/write outline` to create story outlines
   - Use `/write story` to generate final stories
   - Use `/edit` to modify content as needed
   - Use `/approve` and `/publish` for workflow management

### LightRAG Integration

The system includes a TypeScript MCP client for LightRAG integration:
- **Location**: `src/clients/lightragClient.ts`
- **Service**: `src/services/lightragService.ts`
- **Purpose**: Entity discovery and relationship mapping

## Status

**Current Phase**: Foundation & Core Infrastructure Complete  
**Next Step**: Entity Management System Implementation

See `docs/` for complete project documentation:
- `brief.md` - Project overview and requirements
- `prd.md` - Product Requirements Document
- `architecture.md` - Technical architecture and API specifications

## Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm or yarn
- Git (for versioning and analytics)

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jester
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run the application**
   ```bash
   npm start
   ```

## Usage

### Basic Commands

- **`/jester`** - Main entry point and project management
  - `init` - Initialize git repo if installed
  - `help` - Describe how jester works, answer questions

- **`/write`** - Story generation and content creation
  - `context` - Write out the context
  - `outline` - Write out the outline
  - `story` - Write out the story

- **`/muse`** - Brainstorming and creative exploration
  - `create-new` - Start new brainstorming session
  - `explore-existing` - Explore existing draft for details
  - `list-elicitations` - List brainstorming techniques

- **`/edit`** - Cross-stage editing capabilities
  - `character [name]` - Edit a character by name
  - `location [name]` - Edit a location by name
  - `item [name]` - Edit an item by name
  - General editing for stories, outlines, contexts

- **`/delete`** - Entity removal from universe
  - `character [name]` - Delete a character by name
  - `location [name]` - Delete a location by name
  - `item [name]` - Delete an item by name
  - `story [name]` - Delete a story by name

- **`/approve`** - Draft approval to ready stage
  - `approve [draft]` - Approve a draft to ready stage

- **`/publish`** - Story publishing with entities and patches
  - `publish [story]` - Publish a ready story

- **`/import`** - Content import from files or directories
  - `import [file]` - Import from specific file
  - `import directory [path]` - Import from directory

- **`/search`** - Search local files and LightRAG database
  - `search [query]` - Search with natural language

### Command Examples

```bash
# Get help and project setup
/jester help
/jester init

# Generate a new story context
/muse create-new

# Create outline from existing context
/write outline

# Generate story from outline
/write story

# Edit existing content
/edit character Stella Stoat
/edit location Whispering Woods
/edit story-001.md

# Search for information
/search "characters in the forest"

# Approve and publish
/approve story-001
/publish story-001
```

## Development

### Project Structure

The project follows a modular architecture with clear separation of concerns:

- **`src/agents/`** - Command routing and agent management
- **`src/types/`** - TypeScript interfaces and data models
- **`src/utils/`** - Utility functions for file operations and error handling
- **`.jester/`** - Framework configuration and agent definitions

### Adding New Agents

1. Create agent file in `.jester/agents/` with BMAD format
2. Define YAML configuration with commands and dependencies
3. Implement agent logic in `src/agents/`
4. Register agent in command router

### Testing

```bash
# Run unit tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Troubleshooting

### Common Issues

1. **Command not found**
   - Ensure you're in the project root directory
   - Check that the command router is properly initialized

2. **File permission errors**
   - Verify file permissions on the project directory
   - On Windows, try running as administrator if needed

3. **Template not found**
   - Ensure `.jester/templates/` directory exists
   - Check that template files are properly formatted

4. **Cross-platform issues**
   - Use `path.join()` for file paths
   - Be aware of case sensitivity on different platforms

### Debug Information

- Check `logs/` directory for error logs
- Review `.ai/debug-log.md` for detailed debugging information
- Use `npm run debug` for verbose output

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

[Add your license information here]

## Support

For questions and support:
- Check the documentation in `docs/`
- Review the troubleshooting section above
- Open an issue on the repository
