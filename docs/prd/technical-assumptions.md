# Technical Assumptions

## Repository Structure: Monorepo

jester will use a monorepo structure containing all agent definitions, templates, tasks, and generated content in a single repository. This approach simplifies development, deployment, and maintenance for a personal project while keeping all related files together.

## Service Architecture

**Prompt-Based Agent System**: jester uses a microservices-inspired architecture with specialized agents (`/muse`, `/write`, `/edit`) that communicate through file-based pipelines. Each agent is a self-contained markdown file with YAML configuration, following BMAD principles. The system uses minimal Python dependencies (only for Entity Management Entity Management integration) while maintaining pure prompt-based agent behavior.

**Development Target**: The development process produces **markdown prompt rule files** that external LLM agents can follow to perform story generation tasks. These prompt files follow the same BMAD pattern as the current analyst/qa/dev agent rules, where:
- **Muse Agent** = Analyst role (context gathering and requirements)
- **Edit Agent** = QA role (validation and refinement) 
- **Write Agent** = Dev role (implementation and generation)

The dev agent does NOT write TypeScript or other programming languages - only prompt engineering for LLM agents.

## Testing Requirements

**Prompt Engineering Validation**: The system requires validation of prompt rule effectiveness and LLM agent compliance. Testing should cover:
- Prompt rule clarity and completeness for LLM agents
- Agent behavior consistency when following prompt rules
- File pipeline integrity (YAML → Markdown → Markdown) through LLM execution
- Entity Management integration and query handling via prompt instructions
- Entity file management and [[link]] consistency through LLM operations
- Cross-platform compatibility of generated files

## Additional Technical Assumptions and Requests

- **Prompt Rule Engineering**: The system must produce clear, actionable prompt rules that LLM agents can follow to perform file operations
- **Markdown Processing**: LLM agents must handle markdown parsing and generation for entity files, stories, and outlines with proper [[wiki-link]] support
- **File System Operations**: Prompt rules must instruct LLM agents to perform robust file creation, reading, and modification with proper error handling
- **Entity Management Entity Management integration**: Python Entity Management client for querying relationships and entity connections only (not part of prompt rules)
- **Cross-Platform File Paths**: Prompt rules must instruct LLM agents to handle file paths across Windows, macOS, and Linux
- **Entity File Templates**: Prompt rules must reference standardized markdown templates for characters, locations, and items with consistent structure
- **Link Validation**: Prompt rules must instruct LLM agents to detect and report broken [[links]] in the entity wiki
- **Directory Management**: Prompt rules must instruct LLM agents to create and organize entity subdirectories
- **Content Versioning**: Prompt rules must instruct LLM agents to track changes to entity files and stories
