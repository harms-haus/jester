# IDE-Specific Converters

This directory contains IDE-specific converter scripts that handle the conversion of Jester framework files to IDE-specific formats.

## Structure

- `cursor.js` - Cursor IDE converter (creates .mdc files and .cursorrules)
- `vscode.js` - VS Code converter (creates workspace settings)
- `claude-code.js` - Claude Code converter (coming soon)
- `windsurf.js` - Windsurf converter (coming soon)

## Usage

These converters are automatically called by the main CLI scripts when an IDE is selected. Each converter:

1. Receives the source directory path
2. Converts .jester markdown files to IDE-specific formats
3. Creates IDE-specific configuration files
4. Returns a success/failure status

## Adding New IDEs

To add support for a new IDE:

1. Create a new `{ide-name}.js` file in this directory
2. Implement the required interface (see existing converters)
3. Add the IDE to the IDE_OPTIONS in the main scripts
4. Update the documentation



