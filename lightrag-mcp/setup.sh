#!/bin/bash

# LightRAG MCP Server Setup Script

set -e

echo "🚀 Setting up LightRAG MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Get absolute path
ABSOLUTE_PATH=$(pwd)
echo "📍 Absolute path: $ABSOLUTE_PATH"

# Create Cursor MCP configuration
echo "⚙️  Creating Cursor MCP configuration..."

CURSOR_CONFIG_DIR="$HOME/.cursor"
MCP_CONFIG_FILE="$CURSOR_CONFIG_DIR/mcp_settings.json"

# Create .cursor directory if it doesn't exist
mkdir -p "$CURSOR_CONFIG_DIR"

# Create or update MCP configuration
if [ -f "$MCP_CONFIG_FILE" ]; then
    echo "📝 Updating existing Cursor MCP configuration..."
    # Backup existing config
    cp "$MCP_CONFIG_FILE" "$MCP_CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Add LightRAG configuration if not already present
    if ! grep -q "lightrag" "$MCP_CONFIG_FILE"; then
        echo "Adding LightRAG configuration to existing MCP settings..."
        # This is a simple approach - in practice, you might want to use jq for JSON manipulation
        echo "Please manually add the following to your $MCP_CONFIG_FILE:"
        echo ""
        echo "  \"lightrag\": {"
        echo "    \"command\": \"npx\","
        echo "    \"args\": [\"lightrag-mcp-server\"],"
        echo "    \"cwd\": \"$ABSOLUTE_PATH\","
        echo "    \"env\": {"
        echo "      \"LIGHTRAG_API_URL\": \"http://localhost:9621\","
        echo "      \"LIGHTRAG_API_KEY\": \"your-api-key-here\","
        echo "      \"LIGHTRAG_FALLBACK_MODE\": \"true\""
        echo "    }"
        echo "  }"
    else
        echo "✅ LightRAG configuration already exists in MCP settings"
    fi
else
    echo "📝 Creating new Cursor MCP configuration..."
    cat > "$MCP_CONFIG_FILE" << EOF
{
  "mcpServers": {
    "lightrag": {
      "command": "npx",
      "args": ["lightrag-mcp-server"],
      "cwd": "$ABSOLUTE_PATH",
      "env": {
        "LIGHTRAG_API_URL": "http://localhost:9621",
        "LIGHTRAG_API_KEY": "your-api-key-here",
        "LIGHTRAG_FALLBACK_MODE": "true"
      }
    }
  }
}
EOF
    echo "✅ Created Cursor MCP configuration at $MCP_CONFIG_FILE"
fi

# Create environment file template
echo "📄 Creating environment file template..."
cat > .env.example << EOF
# LightRAG API Configuration
LIGHTRAG_API_URL=http://localhost:9621
LIGHTRAG_API_KEY=your-api-key-here

# Optional: Fallback Mode (default: true)
LIGHTRAG_FALLBACK_MODE=true
EOF

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update your LightRAG API key in $MCP_CONFIG_FILE"
echo "2. Make sure your LightRAG server is running on the configured URL"
echo "3. Restart Cursor to load the MCP server"
echo "4. Test the integration by using @lightrag_query in Cursor"
echo ""
echo "Configuration file: $MCP_CONFIG_FILE"
echo "Server path: $ABSOLUTE_PATH/dist/lightragMcpServer.js"
echo ""
echo "To test the server manually:"
echo "  npm start"
echo ""
echo "For development:"
echo "  npm run dev"
