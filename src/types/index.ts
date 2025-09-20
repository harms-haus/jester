/**
 * Core data structures for the jester storytelling system
 * Based on architecture/data-models.md
 */

export interface EntityReference {
  id: string;
  name: string;
  type: 'character' | 'location' | 'item';
}

export interface PlotPoint {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface DetailedPlotPoint extends PlotPoint {
  characters: string[];
  location: string;
  estimated_words: number;
}

export interface LocationTransition {
  from: string;
  to: string;
  description: string;
}

export interface StoryContext {
  title: string;
  target_audience: {
    age_range: string;
    reading_level: string;
  };
  target_length: {
    min_words: number;
    max_words: number;
    final_target: number;
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

export interface StoryOutline {
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

export interface Story {
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

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'item';
  description: string;
  properties: Record<string, any>;
  relationships: string[];
  last_used: string;
  usage_count: number;
}

// Command system interfaces
export interface Command {
  name: string;
  args: string[];
  options: Record<string, any>;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface AgentConfig {
  name: string;
  id: string;
  title: string;
  icon: string;
  whenToUse: string;
  commands: string[];
  dependencies: {
    templates?: string[];
    data?: string[];
  };
}