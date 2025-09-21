# LightRAG MCP Server - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Install and Build
```bash
cd lightrag-mcp
npm install
npm run build
```

### 2. Configure Cursor
Add this to your Cursor MCP settings (`~/.cursor/mcp_settings.json`):

```json
{
  "mcpServers": {
    "lightrag": {
      "command": "npx",
      "args": ["lightrag-mcp-server"],
      "cwd": "/absolute/path/to/lightrag-mcp",
      "env": {
        "LIGHTRAG_API_URL": "http://localhost:9621",
        "LIGHTRAG_API_KEY": "your-api-key-here",
        "LIGHTRAG_FALLBACK_MODE": "true"
      }
    }
  }
}
```

**Replace `/absolute/path/to/lightrag-mcp` with the actual path to this directory.**

> 💡 **Why `npx`?** Using `npx` makes the configuration simpler and more portable - no need to specify the full path to the JavaScript file!

### 3. Restart Cursor
Restart Cursor to load the MCP server.

### 4. Test in Cursor
Use these commands in Cursor:

```
@lightrag_health_check
@lightrag_get_entity_labels
@lightrag_query What are the main characters in this story?
```

## 🔧 Configuration

### Environment Variables
- `LIGHTRAG_API_URL`: Your LightRAG server URL (default: http://localhost:9621)
- `LIGHTRAG_API_KEY`: Your LightRAG API key
- `LIGHTRAG_FALLBACK_MODE`: Enable fallback mode (default: true)

### Available Tools
- `lightrag_query` - Query the knowledge graph
- `lightrag_search_entities` - Search for entities
- `lightrag_search_relationships` - Find relationships
- `lightrag_get_entity_labels` - Get entity types
- `lightrag_get_knowledge_graph` - Get full knowledge graph
- `lightrag_upload_document` - Upload documents
- `lightrag_get_document_status` - Check document status
- `lightrag_health_check` - Check service health

## 🧪 Testing

### Test the MCP Server
```bash
node test-mcp.js
```

### Test with Cursor
1. Open Cursor
2. Use `@lightrag_health_check` to verify connection
3. Use `@lightrag_query "test query"` to test queries

## 🐛 Troubleshooting

### Common Issues
1. **"Command not found"**: Make sure you used the absolute path in Cursor config
2. **"Connection refused"**: Check your LightRAG server is running
3. **"Authentication failed"**: Verify your API key

### Debug Mode
```bash
DEBUG=lightrag* npm run dev
```

## 📁 File Structure
```
lightrag-mcp/
├── src/                    # Source code
├── dist/                   # Compiled JavaScript
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── setup.sh              # Setup script
├── test-mcp.js           # Test script
├── README.md             # Full documentation
└── QUICK_START.md        # This file
```

## 🎯 What's Next?

1. **Start your LightRAG server** on the configured URL
2. **Update your API key** in the Cursor configuration
3. **Test the integration** with real queries
4. **Explore the knowledge graph** through Cursor

## 💡 Pro Tips

- Use `@lightrag_health_check` to verify everything is working
- The server works in fallback mode even without LightRAG running
- All tools return JSON data that you can process in Cursor
- Check the full README.md for detailed documentation

---

**Need help?** Check the troubleshooting section in README.md or verify your LightRAG server is running and accessible.
