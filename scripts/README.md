# Jester Setup Scripts

This directory contains setup scripts for configuring Jester with Cursor IDE.

## Scripts Overview

### `setup-jester.js` - Complete Setup
The main setup script that orchestrates the entire Jester configuration process.

```bash
npm run setup
```

**What it does:**
- Verifies project structure
- Configures Cursor IDE integration
- Creates `.cursorrules` file

### `setup-cursor.js` - Cursor IDE Setup
Configures Cursor IDE specifically for Jester agents.

```bash
npm run setup-cursor
```

**What it does:**
- Creates `.cursorrules` file with Jester-specific instructions
- Sets up agent invocation patterns (`@agent-name`)

## Usage

### Quick Setup
For a complete setup of Jester with Cursor integration:

```bash
npm run setup
```

### Manual Setup
If you prefer to set up components individually:

```bash
# Setup Cursor integration only
npm run setup-cursor
```

### Build Integration
The setup runs automatically after building the project:

```bash
npm run build  # This will also run setup
```

## Configuration Files Created

### `.cursorrules`
Contains Jester-specific instructions for Cursor IDE, including:
- Available agents and their usage
- Command patterns and syntax
- Project structure guidelines
- Best practices for story creation

## Post-Setup Steps

After running the setup scripts:

1. **Restart Cursor** to load the new configuration
2. **Test the integration**:
   - Open a new chat in Cursor
   - Try `@jester *help` to see available commands
   - Start creating stories with `@muse *create-new`

## Troubleshooting

### Common Issues


**"Agent not responding"**
- Restart Cursor after setup
- Check that the agent file exists in `.jester/agents/`
- Verify the agent name matches exactly (case-sensitive)

### Manual Configuration

If automatic setup fails, you can manually configure:

1. **Create `.cursorrules`** in project root with Jester instructions

## Development

To modify the setup scripts:

1. Edit the relevant script in this directory
2. Test with `node scripts/setup-[script-name].js`
3. Update package.json scripts if needed
4. Document changes in this README

## Integration with BMAD

This setup approach is inspired by BMAD's agent system but adapted for Jester's specific needs:

- **Agent-based architecture**: Similar to BMAD's agent system
- **Cursor integration**: Uses `@agent-name` syntax like BMAD
- **Modular design**: Separate scripts for different components

The key difference is that Jester focuses on story creation workflows rather than general software development, so the agents and commands are tailored for creative writing and content management.
