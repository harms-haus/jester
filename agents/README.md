# jester Agents

This directory contains the AI agent definitions for the jester storytelling system.

## Agent Architecture

Following BMAD principles, each agent is defined as a markdown file with YAML configuration headers.

## Planned Agents

### `/muse` - Context Agent
- **Role**: Interactive story context gathering and entity discovery
- **Capabilities**: LightRAG integration, brainstorming, entity relationship mapping
- **Output**: YAML context files

### `/write` - Generation Agent  
- **Role**: Outline and story generation
- **Commands**: `outline`, `story`
- **Input**: Context YAML (for outline), Outline Markdown (for story)
- **Output**: Markdown files

### `/edit` - Editing Agent
- **Role**: Cross-stage editing and refinement
- **Capabilities**: Outline modification, story editing, character adjustments
- **Input**: Any pipeline file
- **Output**: Modified files

## File Pipeline

```
/muse → context.yaml → /write outline → outline.md → /write story → story.md
                                ↑                        ↑
                              /edit                    /edit
```

## Status

**Current**: Agent templates in development  
**Next**: Implement `/muse` agent with LightRAG integration
