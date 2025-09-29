# Jester CLI - Standalone Version

This is a standalone version of the Jester CLI that doesn't require external dependencies like `prompts` or `chalk`. It uses only Node.js built-ins for maximum compatibility.

## 🚀 Quick Start

### Option 1: Direct Node.js execution (Recommended)
```bash
# Test the standalone CLI
node bin/jester-init-standalone.js --test

# Run the standalone CLI
node bin/jester-init-standalone.js
```

### Option 2: Using npx (if dependencies are available)
```bash
# Test
npx jester-cli-init-standalone --test

# Run
npx jester-cli-init-standalone
```

### Option 3: Using the test suite
```bash
# Run comprehensive tests
node test-standalone.js
```

## 🎯 What It Does

The standalone version provides the same functionality as the main CLI but with:

- ✅ **No external dependencies** - Uses only Node.js built-ins
- ✅ **Simple color output** - Basic terminal colors without chalk
- ✅ **Interactive prompts** - Uses readline for user input
- ✅ **Full IDE support** - All 4 IDEs supported (Cursor, VS Code, Claude, Windsurf)
- ✅ **Same file structure** - Creates the same directory structure as the main CLI

## 🔧 Features

- **IDE Selection**: Choose from Cursor, VS Code, Claude Code, or Windsurf
- **Framework Installation**: Copies all Jester framework files
- **IDE-Specific Conversion**: Creates IDE-specific configuration files
- **Existing Installation Handling**: Warns and optionally replaces existing installations
- **Comprehensive Testing**: Built-in test suite to verify everything works

## 📁 Output Structure

```
your-project/
├── .jester/              # Framework files
├── .cursor/              # Cursor IDE files (if selected)
├── .vscode/              # VS Code files (if selected)
├── .claude/              # Claude IDE files (if selected)
├── .windsurf/            # Windsurf files (if selected)
└── jester.code-workspace # Workspace file (if applicable)
```

## 🧪 Testing

The standalone version includes a comprehensive test suite:

```bash
node test-standalone.js
```

This tests:
- Framework source structure
- IDE converter availability
- Standalone CLI loading
- Package structure validation

## 🆚 Standalone vs Main CLI

| Feature | Main CLI | Standalone |
|---------|----------|------------|
| External Dependencies | Requires `prompts`, `chalk` | None |
| Color Output | Rich colors with chalk | Basic colors |
| Interactive Menus | Advanced prompts library | Simple readline |
| File Size | Larger | Smaller |
| Compatibility | Requires npm install | Works anywhere |
| Functionality | Full featured | Same features |

## 🐛 Troubleshooting

### "Framework source not found"
```bash
# Build the framework first
npm run build
```

### "Permission denied"
```bash
# Make the script executable
chmod +x bin/jester-init-standalone.js
```

### "Cannot find module"
The standalone version doesn't require any modules, so this shouldn't happen. If it does, check that you're running the correct file.

## 📝 Usage Examples

### Basic initialization
```bash
node bin/jester-init-standalone.js
# Follow the prompts to select your IDE
```

### Test mode
```bash
node bin/jester-init-standalone.js --test
# Verifies the framework is ready without running the full initialization
```

### With existing installation
```bash
node bin/jester-init-standalone.js
# Will warn about existing .jester directory and ask if you want to replace it
```

## 🎭 Next Steps

After running the standalone CLI:

1. **Open your IDE** and look for the new configuration files
2. **Use @jester** in your IDE to start creating stories
3. **Check the generated files** in the IDE-specific directories
4. **Run validation** if available: `npx jester-cli validate`

Happy storytelling! 🎭



