# LightRAG MCP Server

A standalone Model Context Protocol (MCP) server that provides LightRAG functionality to Cursor and other MCP-compatible clients.

## Features

- **Knowledge Graph Querying**: Search and query the LightRAG knowledge graph
- **Entity Discovery**: Find entities and their relationships
- **Document Management**: Upload and process documents
- **Health Monitoring**: Check LightRAG service status
- **Fallback Mode**: Graceful degradation when LightRAG is unavailable
- **Circuit Breaker**: Fault tolerance and error handling

## Installation

1. **Clone or download** this directory
2. **Install dependencies**:
   ```bash
   cd lightrag-mcp
   npm install
   ```
3. **Build the server**:
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables

Set these environment variables before starting the server:

```bash
# Required: LightRAG API Configuration
export LIGHTRAG_API_URL="http://localhost:9621"
export LIGHTRAG_API_KEY="your-api-key-here"

# Optional: Fallback Mode (default: true)
export LIGHTRAG_FALLBACK_MODE="true"
```

### Cursor MCP Configuration

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

**Important**: Replace `/absolute/path/to/lightrag-mcp` with the actual absolute path to this directory.

#### Why Use `npx`?

Using `npx` instead of direct `node` execution provides several benefits:

- **Simpler Configuration**: No need to specify the full path to the JavaScript file
- **Automatic Resolution**: `npx` automatically finds the executable in the package
- **Consistent Interface**: Works the same way across different operating systems
- **Easier Maintenance**: Updates to the package structure don't break the configuration
- **Better Error Handling**: `npx` provides clearer error messages if the package isn't found

## Usage

### Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Available Tools

The MCP server provides the following tools:

#### `lightrag_query`
Query the LightRAG knowledge graph for information.

**Parameters:**
- `query` (string, required): The search query
- `mode` (string, optional): Query mode (`local`, `global`, `hybrid`, `naive`, `mix`)
- `limit` (number, optional): Maximum results (default: 10)
- `enable_rerank` (boolean, optional): Enable reranking (default: true)

#### `lightrag_search_entities`
Search for entities in the knowledge graph.

**Parameters:**
- `query` (string, required): Search query for entities
- `limit` (number, optional): Maximum entities (default: 10)

#### `lightrag_search_relationships`
Search for relationships between entities.

**Parameters:**
- `source_entity` (string, required): Source entity name
- `target_entity` (string, optional): Target entity name
- `limit` (number, optional): Maximum relationships (default: 10)

#### `lightrag_get_entity_labels`
Get all available entity types and labels.

#### `lightrag_get_knowledge_graph`
Get the complete knowledge graph data.

#### `lightrag_upload_document`
Upload a document to LightRAG for processing.

**Parameters:**
- `content` (string, required): Document content
- `filename` (string, required): Filename
- `track_id` (string, optional): Tracking ID

#### `lightrag_get_document_status`
Get the processing status of a document.

**Parameters:**
- `track_id` (string, required): Document tracking ID

#### `lightrag_health_check`
Check the health status of the LightRAG service.

### Available Resources

#### `lightrag://status`
Current status and health of the LightRAG service.

#### `lightrag://entity-labels`
Available entity types and labels in the knowledge graph.

#### `lightrag://knowledge-graph`
Complete knowledge graph data.

## Example Usage in Cursor

Once configured, you can use the LightRAG MCP server in Cursor:

```
# Query the knowledge graph
@lightrag_query What are the main characters in this story?

# Search for entities
@lightrag_search_entities magical creatures

# Find relationships
@lightrag_search_relationships hero helper

# Check service health
@lightrag_health_check

# Upload a document
@lightrag_upload_document content="Once upon a time..." filename="story.txt"
```

## Troubleshooting

### Common Issues

1. **Connection Refused**: Make sure your LightRAG server is running on the configured URL
2. **Authentication Failed**: Check your `LIGHTRAG_API_KEY` environment variable
3. **MCP Not Loading**: Verify the absolute path in your Cursor MCP configuration

### Debug Mode

Run in debug mode to see detailed logs:

```bash
DEBUG=lightrag* npm run dev
```

### Health Check

Test if the server is working:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "lightrag_health_check", "arguments": {}}}' | npm start
```

## Development

### Project Structure

```
lightrag-mcp/
├── src/
│   ├── lightragMcpServer.ts    # Main MCP server
│   ├── lightragClient.ts       # LightRAG client
│   ├── lightragService.ts      # LightRAG service layer
│   └── lightrag.ts             # TypeScript types
├── dist/                       # Compiled JavaScript
├── package.json
├── tsconfig.json
├── cursor-mcp-config.json      # Cursor configuration template
└── README.md
```

### Building

```bash
npm run build
```

### Cleaning

```bash
npm run clean
```

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Verify your LightRAG server is running and accessible
3. Check the Cursor MCP configuration syntax
4. Review the environment variables

## Changelog

### v1.0.0
- Initial release
- Full LightRAG API integration
- MCP server implementation
- Cursor configuration support
- Fallback mode for offline operation
