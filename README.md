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
├── src/                    # TypeScript source code
│   ├── agents/            # AI agent implementations
│   ├── clients/           # External API clients (LightRAG)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── index.ts           # Main entry point
├── entities/              # Local entity files
│   ├── characters/        # Character definitions
│   ├── locations/         # Location definitions
│   └── items/             # Item definitions
├── stories/               # Generated stories
├── outlines/              # Story outlines
├── contexts/              # Story context files
├── .jester/               # Framework configuration
│   ├── agents/            # Agent rule files
│   ├── templates/         # Document templates
│   ├── tasks/             # Task definitions
│   └── data/              # Reference data
└── docs/                  # Project documentation
```

## Status

**Current Phase**: Project Setup Complete  
**Next Step**: Agent Implementation

See `docs/` for complete project documentation:
- `brief.md` - Project overview and requirements
- `prd.md` - Product Requirements Document
- `architecture.md` - Technical architecture and API specifications

## Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm or yarn
- Git (for versioning and analytics)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Run the application**
   ```bash
   npm start
   ```

## Commands

- `/muse` - Start context gathering and story ideation
- `/write outline` - Generate story outline from context
- `/write story` - Create final story from outline
- `/edit` - Cross-stage editing capabilities
