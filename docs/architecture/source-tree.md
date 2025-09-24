# Source Tree

## Project Structure

```
jester/
├── .jester/                    # Framework files (hidden)
│   ├── agents/                 # Agent prompt definitions
│   ├── templates/              # Story and plot templates
│   │   └── memory/             # Memory system templates
│   │       ├── persona-settings-template.yaml
│   │       └── target-audience-profiles-template.yaml
│   ├── tasks/                  # Task definitions
│   ├── data/                   # Reference data
│   └── utils/                  # Utility scripts
├── .memory/                    # User preferences and settings
│   ├── persona-settings.yaml   # Persona system preferences
│   └── target-audience-profiles.yaml  # Target audience member profiles
├── draft/                      # Work in progress
│   ├── 001/                    # Draft project 001
│   │   ├── characters/         # Draft characters
│   │   ├── contexts/           # Draft contexts
│   │   ├── items/              # Draft items
│   │   ├── locations/          # Draft locations
│   │   ├── outlines/           # Draft outlines
│   │   └── stories/            # Draft stories
│   ├── 002/                    # Draft project 002
│   │   └── [same structure]    # Same subdirectory structure
│   └── {NNN}/                  # Additional draft projects
├── reading/                    # Approved work
│   ├── 001 - Story Title/      # Story project 001
│   │   ├── characters/         # Approved characters + .patch.md files
│   │   ├── contexts/           # Approved contexts
│   │   ├── items/              # Approved items
│   │   ├── locations/          # Approved locations + .patch.md files
│   │   ├── outlines/           # Approved outlines
│   │   └── stories/            # Approved stories
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
  
  BEFORE:
  [original content]
  
  AFTER:
  [updated content]
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
- **Structure**: Each project has subdirectories for characters/, contexts/, items/, locations/, outlines/, stories/
- **Purpose**: Work in progress for a specific story

### Reading Projects (`reading/{NNN} - Story Title/`)
- **Numbering**: 3-digit numbers matching draft projects
- **Naming**: Includes descriptive story title for easy identification
- **Structure**: Same subdirectory structure as draft projects
- **Purpose**: Approved work ready for review and reading
