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
├── ready/                      # Approved work
│   ├── stories/                # Approved stories
│   ├── outlines/               # Approved outlines
│   ├── characters/             # Approved characters
│   ├── locations/              # Approved locations
│   └── items/                  # Approved items
├── complete/                   # Published work
│   ├── stories/                # Published stories
│   ├── outlines/               # Published outlines
│   ├── characters/             # Published characters
│   ├── locations/              # Published locations
│   └── items/                  # Published items
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

## Key Directories

- **`.jester/`**: Framework files, hidden from users
- **`draft/`**: Work in progress with incrementing draft numbers
- **`ready/`**: Approved work ready for publication
- **`complete/`**: Published work in final form
- **`contexts/`**: Context files (no staging needed)
- **`docs/`**: Project documentation (sharded)
- **`src/`**: Source code for the jester system
