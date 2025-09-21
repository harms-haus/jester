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

// Entity management interfaces
export interface Character {
  name: string;
  type: string;
  age: string;
  species: string;
  description: string;
  personality_traits: string[];
  motivations: string[];
  fears: string[];
  family_relationships: string[];
  friend_relationships: string[];
  enemy_relationships: string[];
  first_story: string;
  recent_story: string;
  story_count: number;
  physical_description: string;
  clothing_style: string;
  distinctive_features: string[];
  special_powers: string[];
  skills: string[];
  weaknesses: string[];
  backstory: string;
  additional_notes: string;
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

export interface Location {
  name: string;
  type: string;
  climate: string;
  size: string;
  description: string;
  terrain_features: string[];
  landmarks: string[];
  natural_resources: string[];
  atmosphere_feeling: string;
  sounds: string[];
  smells: string[];
  lighting: string;
  primary_residents: string[];
  visitors: string[];
  creatures: string[];
  historical_events: string[];
  cultural_significance: string;
  myths_legends: string[];
  first_story: string;
  recent_story: string;
  story_count: number;
  nearby_locations: string[];
  access_routes: string[];
  transportation: string[];
  magical_properties: string[];
  technological_features: string[];
  unique_aspects: string[];
  additional_notes: string;
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

export interface Item {
  name: string;
  type: string;
  rarity: string;
  value: string;
  description: string;
  size: string;
  weight: string;
  material: string;
  color: string;
  shape: string;
  primary_use: string;
  secondary_uses: string[];
  how_it_works: string;
  magical_properties: string[];
  enchantments: string[];
  powers: string[];
  limitations: string[];
  creator: string;
  creation_date: string;
  original_purpose: string;
  previous_owners: string[];
  current_owner: string;
  current_location: string;
  condition: string;
  availability: string;
  first_story: string;
  recent_story: string;
  story_count: number;
  associated_characters: string[];
  associated_locations: string[];
  related_items: string[];
  symbolic_meaning: string;
  cultural_importance: string;
  traditions: string[];
  additional_notes: string;
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
}

export interface EntityTemplate {
  type: 'character' | 'location' | 'item';
  template: string;
  required_fields: string[];
  optional_fields: string[];
}

export interface EntityFile {
  path: string;
  name: string;
  type: 'character' | 'location' | 'item';
  content: string;
  metadata: {
    created_at: string;
    last_modified: string;
    version: number;
  };
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