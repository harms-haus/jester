# jester

**J**ust **E**nigmatic **S**tory **T**elling

An AI-powered bedtime story creation system that transforms unstructured storytelling into a structured, collaborative workflow. jester provides a complete framework for creating consistent, personalized bedtime stories through specialized AI agents and a three-stage content pipeline.

## Overview

jester adapts BMAD (Build-Measure-Analyze-Develop) principles to create personalized bedtime stories through a hierarchical command structure and specialized AI agents:

### Core Commands
- **`/jester`** - Main entry point (init, help, setup)
- **`/muse`** - Context gathering and brainstorming (create-new, explore-existing, list-elicitations)
- **`/write`** - Story generation (context, outline, story)
- **`/edit`** - Content editing (character/location/item editing, general editing, publish)
- **`/entity`** - Entity management (create, update, delete characters/locations/items)
- **`/delete`** - Entity removal (character/location/item/story deletion)
- **`/approve`** - Draft approval to reading stage
- **`/publish`** - Story publishing with entities and patches
- **`/import`** - Content import from files or directories
- **`/search`** - Search local files and entities
- **`/validate`** - Content validation (context, outline, story)

### Three-Stage Workflow
1. **Context** (YAML) - Gather story ideas, characters, settings
2. **Outline** (Markdown) - Structure the plot and story flow
3. **Story** (Markdown) - Generate the final bedtime story

### Content Pipeline
- **Draft** - Initial content creation and development (`draft/` directory)
- **Reading** - Content ready for review and reading (`reading/{NNN} - Story Title/` directories)
- **Universe** - Published content in the story universe (`universe/` directory)

## Architecture

```text
Context (YAML) → Outline (Markdown) → Story (Markdown)
```

- **File-based pipeline** with strict one-way flow
- **Entity Management integration** for entity discovery and consistency
- **Pure prompt-based agents** - external LLM agents follow markdown prompt rules
- **No TypeScript agent execution** - only Entity Management client for Entity Management integration

## Project Structure

```text
jester/
├── jester-cli/                # CLI tool for initializing Jester
│   ├── bin/                   # CLI executable
│   ├── jester-cli/             # Framework files
│   ├── scripts/               # Build and setup scripts
│   └── package.json           # CLI package configuration
├── src/                       # Core TypeScript source code
│   ├── agents/                # AI agent implementations
│   ├── clients/               # External API clients (Entity Management)
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── index.ts               # Main entry point
├── universe/                  # Published work
│   ├── characters/            # Published characters
│   ├── contexts/              # Published contexts
│   ├── items/                 # Published items
│   ├── locations/             # Published locations
│   ├── outlines/              # Published outlines
│   └── stories/               # Published stories
├── reading/                   # Approved work organized by story project
│   ├── 001 - Story Title/     # Story project 001
│   │   ├── characters/        # Project characters
│   │   ├── contexts/          # Project contexts
│   │   ├── items/             # Project items
│   │   ├── locations/         # Project locations
│   │   ├── outlines/          # Project outlines
│   │   └── stories/           # Project stories
│   └── {NNN} - Story Title/   # Additional story projects
├── draft/                     # Work in progress organized by story project
│   ├── 001/                   # Draft project 001
│   │   ├── context-001.yaml   # Draft context
│   │   ├── outline-001.md     # Draft outline
│   │   └── story-001.md       # Draft story
│   └── {NNN}/                 # Additional draft projects
├── .jester/                   # Framework configuration
│   ├── agents/                # Agent rule files
│   ├── templates/             # Document templates
│   ├── tasks/                 # Task definitions
│   ├── data/                  # Reference data
│   └── utils/                 # Utility functions
└── docs/                      # Comprehensive project documentation
    ├── architecture/          # Technical architecture documents
    ├── prd/                   # Product Requirements Document
    ├── qa/                    # Quality assurance gates and validation
    ├── stories/               # Development story documentation
    └── brief.md               # Project brief
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

### Entity Management Integration

The system includes a TypeScript Entity Management client for Entity Management integration:
- **Location**: `src/clients/Entity ManagementClient.ts`
- **Service**: `src/services/Entity ManagementService.ts`
- **Purpose**: Entity discovery and relationship mapping

## Status

**Current Phase**: Entity Management System Implementation
**Completed Stories**: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 2.1, 2.2, 2.3, 2.4, 2.5, 4.7
**Next Step**: Advanced Story Generation and LightRAG Integration

### Project Progress

- ✅ **Foundation & Core Infrastructure** (Epic 1) - Complete
- ✅ **Entity Management System** (Epic 2) - In Progress
- 🔄 **LightRAG Integration** (Epic 3) - Planned
- 🔄 **Advanced Story Generation** (Epic 4) - Planned

### Recent Achievements

- Complete CLI framework for easy project initialization
- Comprehensive QA system with validation gates
- Cursor IDE integration for seamless development
- Extensive documentation and architecture specifications

See `docs/` for complete project documentation:
- `brief.md` - Project overview and requirements
- `prd/` - Product Requirements Document sections
- `architecture/` - Technical architecture and API specifications
- `stories/` - Development story documentation
- `qa/` - Quality assurance gates and validation

## Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm or yarn
- Git (for versioning and analytics)

## Installation and Setup

### Quick Start with CLI Framework

The easiest way to get started with jester is using the CLI framework:

```bash
# Initialize jester in your project directory
npx jester-cli
```

This will create a `.jester/` directory with all framework files and set up the complete story creation system.

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jester
   ```

2. **Install dependencies**
   ```bash
   # Install core dependencies
   npm install

   # Install CLI framework dependencies
   cd jester-cli
   npm install

   ```

3. **Build the project**
   ```bash
   # Build core project
   npm run build

   # Build CLI framework
   cd jester-cli
   npm run build

   ```

4. **Setup Cursor IDE integration**
   ```bash
   # Run setup scripts for Cursor integration
   npm run setup
   ```

5. **Run the application**
   ```bash
   npm start
   ```

## Usage

### Basic Commands

- **`/jester`** - Main entry point and project management
  - `init` - Initialize git repo if installed
  - `help` - Describe how jester works, answer questions
  - `setup` - Configure Cursor IDE integration

- **`/muse`** - Context gathering and brainstorming
  - `create-new` - Start new brainstorming session
  - `explore-existing` - Explore existing draft for details
  - `list-elicitations` - List brainstorming techniques

- **`/write`** - Story generation and content creation
  - `context` - Write out the context from brainstorming
  - `outline` - Write out the outline from context
  - `story` - Write out the story from outline

- **`/entity`** - Entity management and creation
  - `create character [name]` - Create a new character
  - `create location [name]` - Create a new location
  - `create item [name]` - Create a new item
  - `update [type] [name]` - Update existing entity
  - `list [type]` - List all entities of a type

- **`/edit`** - Cross-stage editing capabilities
  - `character [name]` - Edit a character by name
  - `location [name]` - Edit a location by name
  - `item [name]` - Edit an item by name
  - `publish [story]` - Publish story to universe
  - General editing for stories, outlines, contexts

- **`/delete`** - Entity removal from universe
  - `character [name]` - Delete a character by name
  - `location [name]` - Delete a location by name
  - `item [name]` - Delete an item by name
  - `story [name]` - Delete a story by name

- **`/approve`** - Draft approval to reading stage
  - `approve [draft]` - Approve a draft to reading stage

- **`/publish`** - Story publishing with entities and patches
  - `publish [story]` - Publish a reading story

- **`/import`** - Content import from files or directories
  - `import [file]` - Import from specific file
  - `import directory [path]` - Import from directory

- **`/search`** - Search local files and entities
  - `search [query]` - Search with natural language

- **`/validate`** - Content validation
  - `validate context [file]` - Validate context file
  - `validate outline [file]` - Validate outline file
  - `validate story [file]` - Validate story file

### Command Examples

```bash
# Get help and project setup
/jester help
/jester init
/jester setup

# Generate a new story context
/muse create-new

# Create outline from existing context
/write outline

# Generate story from outline
/write story

# Create and manage entities
/entity create character "Stella Stoat"
/entity create location "Whispering Woods"
/entity list characters

# Edit existing content
/edit character Stella Stoat
/edit location Whispering Woods
/edit story-001.md

# Search for information
/search "characters in the forest"

# Validate content
/validate context context-001.yaml
/validate outline outline-001.md

# Approve and publish
/approve story-001
/edit publish story-001
```

### Cursor IDE Integration

After running `npm run setup`, you can use jester directly in Cursor IDE:

```bash
# Use @jester agent in Cursor chat
@jester help
@muse create-new
@write outline
@entity create character "New Character"
```

## Development

### Project Structure

The project follows a modular architecture with clear separation of concerns:

- **`src/agents/`** - Command routing and agent management
- **`src/types/`** - TypeScript interfaces and data models
- **`src/utils/`** - Utility functions for file operations and error handling
- **`src/clients/`** - External API clients (Entity Management integration)
- **`.jester/`** - Framework configuration and agent definitions
- **`jester-cli/`** - CLI tool for project initialization
- **`docs/`** - Comprehensive documentation and QA processes

### Adding New Agents

1. Create agent file in `.jester/agents/` with BMAD format
2. Define YAML configuration with commands and dependencies
3. Implement agent logic in `src/agents/`
4. Register agent in command router
5. Add tests in `src/__tests__/`
6. Update documentation in `docs/`

### Testing

```bash
# Run unit tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run CLI framework tests
cd jester-cli
npm test

```

### Quality Assurance

The project includes comprehensive QA processes:

- **QA Gates**: Located in `docs/qa/gates/` - validation criteria for each story
- **Story Documentation**: Complete development records in `docs/stories/`
- **Architecture Documentation**: Technical specifications in `docs/architecture/`
- **PRD**: Product Requirements Document in `docs/prd/`

### Build Process

```bash
# Build all components
npm run build

# Build CLI framework
cd jester-cli
npm run build

# Setup Cursor integration
npm run setup
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
- Check the comprehensive documentation in `docs/`
- Review the troubleshooting section above
- Consult the QA gates in `docs/qa/gates/` for validation criteria
- Review development stories in `docs/stories/` for implementation details
- Open an issue on the repository

## Documentation

### Quick Links

- **[Project Brief](docs/brief.md)** - Complete project overview and requirements
- **[Architecture Documentation](docs/architecture/)** - Technical specifications and API details
- **[PRD Sections](docs/prd/)** - Product Requirements Document
- **[Development Stories](docs/stories/)** - Implementation records and progress
- **[QA Gates](docs/qa/gates/)** - Quality assurance validation criteria
- **[CLI Framework](jester-cli/README.md)** - CLI tool documentation

### Key Documentation Files

- `docs/architecture/index.md` - Architecture overview
- `docs/prd/index.md` - PRD navigation
- `docs/stories/1.1.story.md` - Foundation setup story
- `docs/stories/2.1.story.md` - Entity management story
- `test-workflow-fix.md` - Workflow testing documentation
