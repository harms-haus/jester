# jester

**J**ust **E**nigmatic **S**tory **T**elling

An AI-powered bedtime story creation system that transforms unstructured storytelling into a structured, collaborative workflow.

## Overview

jester adapts BMAD principles to create personalized bedtime stories through a three-stage process:

1. **Context Gathering** (`/muse`) - Interactive agent for story ideation and entity discovery
2. **Outline Development** (`/write outline`) - Structured plot development
3. **Story Generation** (`/write story`) - Final story creation

## Architecture

```
Context (YAML) → Outline (Markdown) → Story (Markdown)
```

- **File-based pipeline** with strict one-way flow
- **LightRAG integration** for entity discovery and consistency
- **Prompt-based agents** following BMAD principles

## Project Structure

```
jester/
├── agents/          # AI agent definitions (BMAD-style)
├── templates/       # Story and context templates
├── tasks/           # Reusable workflow tasks
├── data/           # Knowledge base and reference data
├── utils/          # Utility functions and helpers
├── stories/        # Generated stories and contexts
└── docs/           # Project documentation
```

## Status

**Current Phase**: Project Brief Complete  
**Next Step**: PRD Creation

See `docs/brief.md` for complete project documentation.

## Quick Start

*Coming soon - agents and templates in development*

## Commands

- `/muse` - Start context gathering and story ideation
- `/write outline` - Generate story outline from context
- `/write story` - Create final story from outline
- `/edit` - Cross-stage editing capabilities
