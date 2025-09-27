# MCP Jester Prompts Server

A Model Context Protocol (MCP) server that serves Jester prompt files as MCP prompts for efficient context window usage.

## Features

- **Efficient Context Usage**: Serves prompts individually to avoid overwhelming context windows
- **Organized by Category**: Prompts are organized by Jester categories (agents, data, templates, tasks, checklists, workflows)
- **Search Functionality**: Search prompts by name or content across all categories
- **Metadata Support**: Extracts and uses YAML metadata from Jester prompt files
- **Clean Output**: Option to include or exclude YAML metadata for cleaner prompt content

## Installation

```bash
npm install
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## Available Prompts

### Category Management
- `list-categories` - List all available Jester prompt categories
- `list-{category}` - List prompts in a specific category (e.g., `list-agents`, `list-data`)

### Individual Prompts
- `{category}-{name}` - Access individual prompts (e.g., `agents-muse`, `data-context-generation`)

### Search
- `search-prompts` - Search for prompts by name or content

## Configuration

Set the `JESTER_ROOT` environment variable to point to your Jester project root:

```bash
export JESTER_ROOT=/path/to/your/jester/project
```

If not set, it defaults to the current working directory.

## MCP Client Configuration

Add this server to your MCP client configuration:

```json
{
  "mcpServers": {
    "jester-prompts": {
      "command": "node",
      "args": ["/path/to/mcp-jester-prompts/dist/index.js"],
      "env": {
        "JESTER_ROOT": "/path/to/your/jester/project"
      }
    }
  }
}
```

## Architecture

The server automatically discovers and loads prompts from the `.jester/` directory structure:

- **agents/**: Agent prompt definitions (muse.md, write.md, edit.md, etc.)
- **data/**: Data prompts for workflows and guidance
- **templates/**: Template files and configurations
- **tasks/**: Task definitions and workflows
- **checklists/**: Validation and quality assurance
- **workflows/**: Complete workflow definitions

Each prompt is registered as an individual MCP prompt with:
- Descriptive title and description
- Optional arguments for customization
- Clean content output (metadata can be included/excluded)

## Error Handling

- Graceful handling of missing or corrupted prompt files
- Fallback behavior when Jester directory is not found
- Comprehensive error logging to stderr (stdout reserved for MCP protocol)

## Development

The server is built with TypeScript and uses the official MCP TypeScript SDK. Key features:

- **Type Safety**: Full TypeScript support with proper typing
- **Async/Await**: Modern async patterns for file operations
- **Modular Design**: Clean separation of concerns
- **Extensible**: Easy to add new prompt types or categories