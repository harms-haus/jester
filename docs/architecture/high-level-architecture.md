# High-Level Architecture

## System Overview

**Architecture Pattern**: Prompt-based agent system with external knowledge graph integration  
**Primary Interface**: Command-line interface with slash commands  
**Data Flow**: Unidirectional pipeline (context → outline → story) with cross-stage editing via LLM agents  
**Storage Strategy**: Local-first with LightRAG knowledge graph integration  

## Core Principles

1. **Prompt-Based Agents**: All agent behavior defined through structured prompt rules that external LLM agents follow
2. **File-Based Pipeline**: LLM agents communicate through structured files (YAML, Markdown) as instructed by prompt rules
3. **User-in-the-Loop**: Human editing at each stage for quality control
4. **Local-First**: All user content stored locally with optional cloud sync
5. **Knowledge Graph Integration**: LightRAG provides entity relationships and discovery via MCP client
6. **Prompt Engineering**: Development produces markdown prompt rule files, not executable code
