# Source Tree

## Project Structure

```
jester/
├── .jester/                    # Framework files (hidden)
│   ├── agents/                 # Agent prompt definitions
│   ├── templates/              # Story and plot templates
│   │   └── memory/             # Memory system templates
│   │       ├── persona-settings.yaml
│   │       └── target-audience-profiles.yaml
│   ├── tasks/                  # Task definitions
│   ├── data/                   # Reference data
│   └── utils/                  # Utility scripts
├── .memory/                    # User preferences and settings
│   ├── persona-settings.yaml   # Persona system preferences
│   └── target-audience-profiles.yaml  # Target audience member profiles
├── draft/                      # Work in progress
│   ├── 001/                    # Draft project 001
│   │   ├── context-001.yaml    # Draft context
│   │   ├── outline-001.md      # Draft outline
│   │   └── story-001.md        # Draft story
│   ├── 002/                    # Draft project 002
│   │   └── [same structure]    # Same subdirectory structure
│   └── {NNN}/                  # Additional draft projects
├── reading/                    # Approved work
│   ├── 001 - Story Title/      # Story project 001
│   │   ├── characters/         # Approved characters + .patch.md files
│   │   ├── items/              # Approved items
│   │   ├── locations/          # Approved locations + .patch.md files
│   │   ├── Story Title-context.yaml           # Approved context
│   │   ├── Story Title-outline.md             # Approved outline
│   │   └── Story Title-story.md               # Approved story
│   ├── 002 - Story Title/      # Story project 002
│   │   └── [same structure]    # Same subdirectory structure
│   └── {NNN} - Story Title/    # Additional story projects
├── universe/                   # Published work
│   ├── stories/                # Published stories
│   ├── outlines/               # Published outlines
│   ├── contexts/               # Published contexts
│   ├── characters/             # Published characters (with change history)
│   ├── locations/              # Published locations (with change history)
│   └── items/                  # Published items (with change history)
├── import-staging/             # Imported content awaiting validation
│   ├── stories/                # Imported stories
│   ├── outlines/               # Imported outlines
│   ├── contexts/               # Imported contexts
│   ├── characters/             # Imported characters
│   ├── locations/              # Imported locations
│   └── items/                  # Imported items
├── contexts/                   # Context files
├── docs/                       # Documentation
│   ├── prd/                    # Sharded PRD sections
│   └── architecture/           # Sharded architecture sections
├── src/                        # Source code
│   ├── agents/                 # Agent implementations
│   ├── clients/                # External service clients
│   ├── utils/                  # Utility functions
│   └── types/                  # TypeScript type definitions
├── .gitignore                  # Git ignore rules
├── package.json                # Node.js dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project overview
```

## File Naming Conventions

### Entity Files
- **New entities**: `{Entity Name with Proper Casing, Punctuation and Spacing}.md`
  - Examples: `Stella Stoat.md`, `Dandelion Plains.md`, `Magic Snorkel.md`
- **Entity patches**: `{Entity Name with Proper Casing, Punctuation and Spacing}.patch.md` (in entity directories)
  - Examples: `reading/001 - Story Title/characters/Stella Stoat.patch.md`, `reading/002 - Story Title/locations/Dandelion Plains.patch.md`

### Patch File Format
- **Format**: Git-patch format with proper headers
- **Structure**: 
  ```
  ---
  Entity: {Entity Name with Proper Casing, Punctuation and Spacing}
  Type: character/location/item
  Changes: {description}
  
  BEFORE (lines {orig_start_line:000}-{orig_end_line:000}):
  {original content}
  
  AFTER (lines {upd_start_line:000}-{upd_end_line:000}):
  {updated content}
  ---
  ```

## Key Directories

- **`.jester/`**: Framework files, hidden from users
- **`draft/`**: Work in progress organized by story project (001/, 002/, etc.)
- **`reading/`**: Approved work organized by story project (001 - Story Title/, 002 - Story Title/, etc.)
- **`universe/`**: Published work in the story universe
- **`import-staging/`**: Imported content awaiting user validation
- **`contexts/`**: Context files (no staging needed)
- **`docs/`**: Project documentation (sharded)
- **`src/`**: Source code for the jester system

## Story Project Organization

Each story project is organized with a consistent structure:

### Draft Projects (`draft/{NNN}/`)
- **Numbering**: 3-digit numbers (001, 002, 013, etc.)
- **Structure**: Each draft project has NO subdirectories.
- **Main Content**: Each draft project contains a context-NNN.yaml, an outline-NNN.md, and a story-NNN.md
- **Purpose**: Work in progress for a specific story

### Reading Projects (`reading/{NNN} - Story Title/`)
- **Numbering**: 3-digit numbers matching draft projects
- **Naming**: Includes descriptive story title for easy identification
- **Structure**: Each reading project contains folders for each type of entity: characters, locations, items
- **Main Content**: Each reading project contains context, outline, and story files: `{Story Title}-{context/outline/story}.{yaml/md}`
- **Purpose**: Approved work ready for review and reading
