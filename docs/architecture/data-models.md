# Data Models

## Core Data Structures

```typescript
interface StoryContext {
  title: string;
  target_audience: {
    age_range: string;
    reading_level: string;
  };
  target_length: {
    min_words: number;
    max_words: number;
    final_target: number; // After editing
  };
  entities: {
    characters: EntityReference[];
    locations: EntityReference[];
    items: EntityReference[];
  };
  plot_template: string; // 'heroes_journey', 'pixar', 'golden_circle'
  plot_points: PlotPoint[];
  location_progression: LocationTransition[];
  morals: string[];
  themes: string[];
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

interface StoryOutline {
  title: string;
  target_audience: StoryContext['target_audience'];
  target_length: StoryContext['target_length'];
  plot_points: DetailedPlotPoint[];
  estimated_word_count: number;
  metadata: {
    context_file: string;
    created_at: string;
    last_modified: string;
  };
}

interface Story {
  title: string;
  content: string;
  word_count: number;
  metadata: {
    outline_file: string;
    context_file: string;
    created_at: string;
    last_modified: string;
    reading_time_minutes: number;
  };
}

interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'item';
  description: string;
  properties: Record<string, any>;
  relationships: string[];
  last_used: string;
  usage_count: number;
}
```

## File System Structure

```
jester/
├── .jester/                    # Framework files (hidden)
│   ├── agents/                 # Agent prompt definitions
│   ├── templates/              # Story and plot templates
│   ├── tasks/                  # Task definitions
│   ├── data/                   # Reference data
│   └── utils/                  # Utility scripts
├── universe/                   # Published work
│   ├── characters/             # Character markdown files
│   ├── locations/              # Location markdown files
│   └── items/                  # Item markdown files
├── stories/                    # Generated story files
├── outlines/                   # Generated outline files
├── contexts/                   # Generated context files
├── .gitignore                  # Git ignore rules
└── README.md                   # Project overview
```
