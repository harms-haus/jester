# Technical Assumptions

## Repository Structure: Monorepo

jester will use a monorepo structure containing all agent definitions, templates, tasks, and generated content in a single repository. This approach simplifies development, deployment, and maintenance for a personal project while keeping all related files together.

## Service Architecture

**Prompt-Based Agent System**: jester uses a microservices-inspired architecture with specialized agents (`/muse`, `/write`, `/edit`) that communicate through file-based pipelines. Each agent is a self-contained markdown file with YAML configuration, following BMAD principles. The system uses minimal Python dependencies (only for LightRAG MCP integration) while maintaining pure prompt-based agent behavior.

## Testing Requirements

**Unit + Integration**: The system requires both unit testing for individual agent functions and integration testing for the complete file pipeline workflow. Testing should cover:
- Agent prompt effectiveness and output quality
- File pipeline integrity (YAML → Markdown → Markdown)
- LightRAG integration and query handling
- Entity file management and [[link]] consistency
- Cross-platform compatibility

## Additional Technical Assumptions and Requests

- **Markdown Processing**: The system must handle markdown parsing and generation for entity files, stories, and outlines with proper [[wiki-link]] support
- **File System Operations**: Robust file creation, reading, and modification capabilities with proper error handling
- **LightRAG MCP Integration**: Python MCP client for querying relationships and entity connections only
- **Cross-Platform File Paths**: Proper handling of file paths across Windows, macOS, and Linux
- **Entity File Templates**: Standardized markdown templates for characters, locations, and items with consistent structure
- **Link Validation**: System to detect and report broken [[links]] in the entity wiki
- **Directory Management**: Automatic creation and organization of entity subdirectories
- **Content Versioning**: Basic file versioning for tracking changes to entity files and stories
