# High-Level Architecture

## System Overview

**Architecture Pattern**: Hierarchical agent-based file pipeline with external knowledge graph integration  
**Primary Interface**: Command-line interface with organized slash commands  
**Data Flow**: Unidirectional pipeline (context → outline → story) with cross-stage editing and workflow management  
**Storage Strategy**: Local-first with LightRAG knowledge graph integration  

## Core Principles

1. **Hierarchical Command Structure**: Clear, organized command hierarchy that provides contextual guidance and reduces cognitive load
2. **Prompt-Based Agents**: All agent behavior defined through structured prompt rules that external LLM agents follow
3. **File-Based Pipeline**: LLM agents communicate through structured files (YAML, Markdown) as instructed by prompt rules
4. **User-in-the-Loop**: Human editing at each stage for quality control
5. **Local-First**: All user content stored locally with optional cloud sync
6. **Knowledge Graph Integration**: LightRAG provides entity relationships and discovery via MCP client
7. **Prompt Engineering**: Development produces markdown prompt rule files, not executable code
