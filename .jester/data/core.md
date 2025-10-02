
# Jester Agent Core

This file guides agents with how things work around here

## Stories

- `Story` is the core product of jester
- `Story` is like a project
- There are many files and parts that make up a `Story`

### Story Lifetime

Stories progress through 3 phases:

- **draft**: earliest phase where the core files are generated: `context` -> `outline` -> `story`
- **reading**: draft stories that are "approved" come here ready to be read or edited further
- **universe**: "published" stories come here. Core knowledge base of the story world

### Story Structure

A story directory is structured thus:

- `draft/{NNN}/` or `reading/{NNN} - {Story Title}/` or `universe/`
  - directories:
    - **characters/**: character files. in `reading/` and `universe/`
    - **locations/**: location files. in `reading/` and `universe/`
    - **items/**: item files. in `reading/` and `universe/`
    - **contexts/**: context files. in `universe/` only
    - **outlines/**: outline files. in `universe/` only
    - **stories/**: story files. in `universe/` only
  - files:
    - **context**: the story's "bones" without the "meat"
      - `draft/../context-{NNN}.yaml`
      - `reading/../{Story Title}-context.yaml`
    - **outline**: detailed outline of the story
      - `draft/../outline-{NNN}.md`
      - `reading/../{Story Title}-outline.md`
    - **story**: full story text
      - `draft/../story-{NNN}.md`
      - `reading/../{Story Title}-story.md`

Notes:

- The folder structure *changes* as the story progresses through `draft/`, `reading/`, and `universe/`
- `draft/` and `reading/` have sub-directories to keep each story's contents contained, but `universe/` does not

**IMPORTANT: NEVER CROSS-CONTAMINATE STORY ROOTS**
E.G. - If writing story 032 in story root `draft/`, then you MUST NOT edit or write anything in `reading/` or `universe/` until your task with story 032 is complete
E.G. - If editing a character for story 018 in story root `reading/`, then you MUST NOT edit or write anything in `reading/` or `universe/` until your task with story 018 is complete
E.G. - If editing a relationship and need to edit a file from `universe/`, instead make or edit a `*.patch` file in `reading/` with the changes

### Core Story Files

Core files should ALWAYS remain in proper format (from the `./.jester/templates/` directory):

- **contexts**: `context.yaml`
- **outlines**: `outline.md`
- **stories**: `story.md`

### Entities

Entities are `characters/`, `locations/`, and `items/`. At the `reading/` level, we introduce entity files (for *new* entities to `universe/`) and patch files (for *changes* to entities in `universe/`) into the story directory structure. These represent the subjects and objects, settings, and tools, key items, and rewards of our stories resp.

Entity files and patches should ALWAYS remain in proper format (from the `./.jester/templates/` directory):

- **characters**: `character.md`
- **locations**: `location.md`
- **items**: `item.md`

## Maintenance Rules

- ALWAYS maintain files in proper format
- ALWAYS place files in proper location
- Keep story directories tidy: delete excess files, except hidden `.directories/` and `.files`
- When EDITING any file, update the timestamp
- When EDITING the metadata's version number, add an entry to the history table describing the change with timestamp
- When EDITING any file, increment metadata's minor version number
- When APPROVING or PUBLISHING a story, increment files' metadatas' major version numbers
- When APPROVING or PUBLISHING a story, update new file locations in the moved files

## Agent Rules

- NEVER let your persona contaminate ANY output. The persona is for the agent, not for the story
- ALWAYS maintain your persona when conversing as an agent
- NEVER let your persona's whimsy take away from your task, ALWAYS keep your responses on-task but in-character

## Other Rules
