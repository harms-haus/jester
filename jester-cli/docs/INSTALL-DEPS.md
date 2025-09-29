# Manual Dependency Installation

Due to a shell configuration issue, the automated `npm install` command cannot be executed. Please run the following commands manually:

## Install Dependencies

```bash
cd /home/blake/Documents/software/jester/jester-cli
npm install
```

This will install:
- `prompts@^2.4.2` - For interactive CLI prompts
- `chalk@^4.1.2` - For colored terminal output

## Alternative: Manual Installation

If `npm install` doesn't work, you can try:

```bash
# Install packages individually
npm install prompts@2.4.2
npm install chalk@4.1.2

# Or use yarn if available
yarn add prompts@2.4.2 chalk@4.1.2

# Or use pnpm if available
pnpm add prompts@2.4.2 chalk@4.1.2
```

## Test the Installation

After installing dependencies, test the CLI:

```bash
# Test the initialization
npx jester-cli init

# Test individual converters
npx jester-cli convert --ide=cursor
npx jester-cli convert --ide=vscode
npx jester-cli convert --ide=claude
npx jester-cli convert --ide=windsurf
```

## Expected Behavior

Once dependencies are installed, the CLI should:

1. **Show interactive IDE selection** with colored output
2. **Copy framework files** to `.jester/` directory
3. **Run the appropriate IDE converter** based on selection
4. **Create IDE-specific files** in the correct directories

## Troubleshooting

If you still get module not found errors:

1. **Check node_modules exists:**
   ```bash
   ls -la node_modules/
   ```

2. **Verify package.json:**
   ```bash
   cat package.json | grep -A 5 dependencies
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

4. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

The CLI is fully implemented and should work correctly once the dependencies are installed.



