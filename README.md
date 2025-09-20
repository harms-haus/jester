# jester

**J**ust **E**nigmatic **S**tory **T**elling

An AI-powered bedtime story creation system that transforms unstructured storytelling into a structured, collaborative workflow.

## Overview

jester adapts BMAD principles to create personalized bedtime stories through a three-stage process:

1. **Context Gathering** (`/muse`) - Interactive agent for story ideation and entity discovery
2. **Outline Development** (`/write outline`) - Structured plot development
3. **Story Generation** (`/write story`) - Final story creation

## Architecture

```
Context (YAML) → Outline (Markdown) → Story (Markdown)
```

- **File-based pipeline** with strict one-way flow
- **LightRAG integration** for entity discovery and consistency
- **Prompt-based agents** following BMAD principles

## Project Structure

```
jester/
├── src/                    # TypeScript source code
│   ├── agents/            # AI agent implementations
│   ├── clients/           # External API clients (LightRAG)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Main entry point
├── entities/              # Local entity files
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

- **`/muse`** - Start context gathering and story ideation
  - Interactive prompts for story ideas, characters, and themes
  - Generates YAML context files in `contexts/` directory

- **`/write outline`** - Generate story outline from context
  - Reads context files and creates structured outlines
  - Generates Markdown outline files in `outlines/` directory

- **`/write story`** - Create final story from outline
  - Transforms outlines into complete bedtime stories
  - Generates Markdown story files in `stories/` directory

- **`/edit`** - Cross-stage editing capabilities
  - Edit contexts, outlines, or stories directly
  - Maintains file integrity and consistency

### Command Examples

```bash
# Generate a new story context
/muse

# Create outline from existing context
/write outline my-story-context.yaml

# Generate story from outline
/write story my-story-outline.md

# Edit existing content
/edit contexts/my-story-context.yaml
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
