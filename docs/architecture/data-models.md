# Data Models

## Core Data Structures

```typescript
interface StoryContext {
  title: string;
  target_audience: {
    age_range: string;
    reading_level: string;
    // Target audience member integration
    selected_members?: string[]; // Array of member IDs
    calculated_from_members?: boolean; // Flag indicating if parameters were calculated from members
  };
  target_length: {
    min_words: number;
    max_words: number;
    final_target: number; // After editing
    // Source tracking for target audience integration
    calculated_from_members?: boolean;
    member_preferences?: {
      [memberId: string]: {
        preferred_words: number;
        weight: number; // For averaging when multiple members selected
      };
    };
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

interface TargetAudienceMember {
  id: string;
  name: string;
  birthday: string; // ISO date format (YYYY-MM-DD)
  preferred_length: {
    min_words: number;
    max_words: number;
    target_words: number;
  };
  preferences: {
    themes: string[];
    characters: string[];
    settings: string[];
  };
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

interface TargetAudienceProfile {
  members: TargetAudienceMember[];
  active_members: string[]; // Array of member IDs
  calculated_parameters: {
    age_range: {
      min_age: number;
      max_age: number;
      expanded_range: {
        min_age: number;
        max_age: number;
      };
    };
    target_length: {
      min_words: number;
      max_words: number;
      target_words: number;
      calculation_method: 'overlap_range' | 'average_centers' | 'single_member';
    };
  };
  metadata: {
    last_calculated: string;
    version: number;
  };
}
```

## File System Structure

```text
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
