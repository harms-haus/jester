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
├── entities/                   # User entity files
│   ├── characters/             # Character markdown files
│   ├── locations/              # Location markdown files
│   └── items/                  # Item markdown files
├── stories/                    # Generated story files
├── outlines/                   # Generated outline files
├── contexts/                   # Generated context files
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
- **`entities/`**: User-created entity files with wiki-style linking
- **`stories/`**: Generated story files
- **`outlines/`**: Generated outline files
- **`contexts/`**: Generated context files
- **`docs/`**: Project documentation (sharded)
- **`src/`**: Source code for the jester system
