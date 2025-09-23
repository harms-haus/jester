# Source Tree

## Project Structure

```
jester/
├── .jester/                    # Framework files (hidden)
│   ├── agents/                 # Agent prompt definitions
│   ├── templates/              # Story and plot templates
│   ├── tasks/                  # Task definitions
│   ├── data/                   # Reference data
│   └── utils/                  # Utility scripts
├── draft/                      # Work in progress
│   ├── context-{number}.md     # Draft context files
│   ├── outline-{number}.md     # Draft outline files
│   └── story-{number}.md       # Draft story files
├── reading/                    # Approved work
│   ├── stories/                # Approved stories
│   ├── outlines/               # Approved outlines
│   ├── contexts/               # Approved contexts
│   ├── characters/             # Approved characters + .patch.md files
│   ├── locations/              # Approved locations + .patch.md files
│   └── items/                  # Approved items + .patch.md files
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
- **New entities**: `{entity-name-hyphen-case}.md`
  - Examples: `stella-stoat.md`, `dandelion-plains.md`, `magic-snorkel.md`
- **Entity patches**: `{entity-name-hyphen-case}.patch.md` (in entity directories)
  - Examples: `reading/characters/stella-stoat.patch.md`, `reading/locations/dandelion-plains.patch.md`

### Patch File Format
- **Format**: Git-patch format with proper headers
- **Structure**: 
  ```
  ---
  Entity: {entity-name}
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
- **`draft/`**: Work in progress with incrementing draft numbers
- **`reading/`**: Approved work ready for review and reading
- **`universe/`**: Published work in the story universe
- **`import-staging/`**: Imported content awaiting user validation
- **`contexts/`**: Context files (no staging needed)
- **`docs/`**: Project documentation (sharded)
- **`src/`**: Source code for the jester system
