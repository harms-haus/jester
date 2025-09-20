/**
 * Core type definitions for the jester system
 */

export interface StoryContext {
  title: string;
  targetLength: number;
  audience: {
    age: number;
    description: string;
  };
  entities: {
    characters: Entity[];
    locations: Entity[];
    items: Entity[];
  };
  plotPoints: PlotPoint[];
  morals: string[];
  themes: string[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'item';
  description: string;
  relationships: EntityRelationship[];
  metadata: {
    created: string;
    lastUsed: string;
    usageCount: number;
  };
}

export interface EntityRelationship {
  targetId: string;
  relationshipType: string;
  description: string;
}

export interface PlotPoint {
  id: string;
  title: string;
  description: string;
  order: number;
  characters: string[];
  location: string;
  items: string[];
}

export interface StoryOutline {
  title: string;
  plotPoints: PlotPoint[];
  targetLength: number;
  audience: {
    age: number;
    description: string;
  };
  metadata: {
    contextFile: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Story {
  title: string;
  content: string;
  wordCount: number;
  outline: StoryOutline;
  metadata: {
    outlineFile: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}
