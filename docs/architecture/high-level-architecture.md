# High-Level Architecture

## System Overview

**Architecture Pattern**: Agent-based file pipeline with external knowledge graph integration  
**Primary Interface**: Command-line interface with slash commands  
**Data Flow**: Unidirectional pipeline (context → outline → story) with cross-stage editing  
**Storage Strategy**: Local-first with LightRAG knowledge graph integration  

## Core Principles

1. **Prompt-Based Agents**: All agent behavior defined through structured prompts, no custom code
2. **File-Based Pipeline**: Agents communicate through structured files (YAML, Markdown)
3. **User-in-the-Loop**: Human editing at each stage for quality control
4. **Local-First**: All user content stored locally with optional cloud sync
5. **Knowledge Graph Integration**: LightRAG provides entity relationships and discovery
