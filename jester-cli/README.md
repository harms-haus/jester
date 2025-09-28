# jester-cli

🎭 **CLI tool to initialize Jester story framework in your project**

Jester is an AI-powered bedtime story creation system that helps parents create consistent, personalized stories through a hierarchical command structure. This CLI tool sets up the Jester framework in your project directory.

## Installation

```bash
npx jester-cli
```

No global installation required! The tool runs directly via npx.

## Usage

### Quick Start
```bash
npx jester-cli init
```

### Available Commands

#### 1. Initialize Project
```bash
npx jester-cli init
```
- Sets up the complete Jester framework
- Interactive IDE selection (Cursor, VS Code, etc.)
- Creates `.jester/` directory with all framework files
- Installs all agents automatically

#### 2. Convert Files for IDE
```bash
npx jester-cli convert --ide=cursor
npx jester-cli convert --ide=vscode
npx jester-cli convert --ide=claude
npx jester-cli convert --ide=windsurf
```
- Converts `.jester` markdown files to IDE-specific formats
- Creates IDE-specific configuration files
- Supports Cursor (.mdc files), VS Code, Claude Code, and Windsurf

#### 3. Manage Configuration
```bash
npx jester-cli config --init
npx jester-cli config --show
npx jester-cli config --edit
```
- Initialize, view, and edit project configuration
- Manage agent preferences and IDE settings
- Configure project metadata and paths

#### 4. Validate & Test
```bash
npx jester-cli validate
npx jester-cli validate --structure
npx jester-cli validate --files --content
```
- Validate project structure and files
- Test framework functionality
- Check configuration integrity

## What It Does

### 🎯 Domain-Specific Scripts
- **`jester-init`** - Project initialization and IDE setup
- **`jester-convert`** - File conversion for different IDEs
- **`jester-config`** - Configuration management
- **`jester-validate`** - Validation and testing

### 🎨 Supported IDEs
- **Cursor IDE** - AI-powered code editor with .mdc file support
- **VS Code** - Popular code editor with workspace configuration
- **Claude Code** - Anthropic's AI coding assistant with terminal integration
- **Windsurf** - AI-native development environment with Cascade rules

### ✨ Key Features
- ✅ Creates `.jester/` directory structure
- ✅ Copies all framework files (agents, prompts, templates, etc.)
- ✅ Interactive IDE selection with beautiful CLI interface
- ✅ Installs all agents automatically (no selection needed)
- ✅ Converts .jester .md files to Cursor .mdc format
- ✅ Creates IDE-specific configuration files
- ✅ Colorized output with progress indicators
- ✅ Modular architecture with separate domain scripts
- ✅ Comprehensive validation and testing
- ✅ Configuration management system

## Framework Structure

The tool creates the following structure in your project:

```
.jester/
├── agents/           # AI agent definitions (.md + .mdc for Cursor)
├── checklists/       # Validation checklists (.md + .mdc for Cursor)
├── data/             # Reference data (.md + .mdc for Cursor)
├── tasks/            # Workflow tasks (.md + .mdc for Cursor)
├── templates/        # Story and entity templates
├── utils/            # Utility functions
├── cursor/           # Cursor-specific files
│   ├── config/       # Cursor configuration
│   └── rules/        # Cursor rules
└── .cursorrules      # Cursor project rules
```

## After Initialization

### For Cursor IDE Users
1. **Use @jester in Cursor** to access the story creation workflow
2. **The .mdc files** provide Cursor-specific agent configurations
3. **Start creating stories** using the command structure:
   - Use `@jester` for main story management
   - Use `@muse` for context gathering and brainstorming
   - Use `@write` for outline and story generation
   - Use `@edit` for content editing and refinement
   - Use `@validate` for content validation
   - Use `@publish` for final publication

### For Other IDEs
1. **Use @jester in your IDE** to access the story creation workflow
2. **The @jester agent will detect** if you have existing content and suggest importing it
3. **Start creating stories** using the command structure:
   - Use `/jester help` for guidance and project setup
   - Use `/muse create-new` for context gathering
   - Use `/write outline` for outline generation
   - Use `/write story` for story creation
   - Use `/edit`, `/delete`, `/approve`, `/publish` for content management

## Development

### Building the Package

The CLI package includes build scripts for distribution:

```bash
# Build the package (copies framework files)
npm run build

# Test the package
npm test

# Clean up temporary files
npm run cleanup
```

### Package Structure

```
jester-cli/
├── bin/
│   └── jester-init.js      # Main CLI executable
├── scripts/
│   └── build.js            # Build script for package distribution
├── package.json            # Package configuration
└── README.md               # This file
```

## Requirements

- Node.js 14.0.0 or higher
- IDE with AI agent support (Cursor, VS Code)

## Safety

- The tool will **detect existing** `.jester/` directories and warn you
- You can choose to **continue and replace** the existing installation
- All framework files are **read-only** and safe to use
- Your existing project files are **never modified**

## Troubleshooting

**Q: The tool says ".jester directory already exists"**
A: The tool will ask if you want to continue and replace the existing installation. You can choose 'y' to continue or 'n' to cancel and preserve the existing installation.

**Q: I don't see the @jester agent in my IDE**
A: Make sure you're using an IDE with AI agent support (Cursor, VS Code) and that the `.jester/` directory was created successfully.

**Q: How do I import my existing stories?**
A: After initialization, use @jester in your IDE and select "Import Content" to scan for existing stories.

**Q: I want to reinstall Jester with a different IDE configuration**
A: Run the tool again and when prompted about the existing directory, choose 'y' to continue. This will replace the existing installation with your new IDE selection.

## License

MIT

## Support

For issues and questions, please visit the [Jester GitHub repository](https://github.com/jester-cli/jester-cli).

---

**Happy storytelling! 🎭**

