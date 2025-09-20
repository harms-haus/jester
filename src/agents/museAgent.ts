/**
 * Muse Agent Implementation
 * Handles story context generation for the jester storytelling system
 */

import { StoryContext, EntityReference, PlotPoint, LocationTransition } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { errorHandler } from '../utils/errorHandler';
import { FileUtils } from '../utils/fileUtils';

export interface MuseAgentOptions {
  storyIdea?: string | undefined;
  ageRange?: string | undefined;
  readingLevel?: string | undefined;
  targetLength?: number | undefined;
  plotTemplate?: string | undefined;
  characters?: string[] | undefined;
  locations?: string[] | undefined;
  items?: string[] | undefined;
  themes?: string[] | undefined;
  morals?: string[] | undefined;
}

export interface ValidatedMuseAgentOptions {
  storyIdea: string;
  ageRange: string;
  readingLevel: string;
  targetLength: number;
  plotTemplate: string;
  characters: string[];
  locations: string[];
  items: string[];
  themes: string[];
  morals: string[];
}

export class MuseAgent {
  private contextsDir: string;
  private templatePath: string;

  constructor() {
    this.contextsDir = path.join(process.cwd(), 'contexts');
    this.templatePath = path.join(process.cwd(), '.jester', 'templates', 'context.yaml');
  }

  /**
   * Generate a new story context based on user input
   */
  public async generateContext(options: MuseAgentOptions): Promise<StoryContext> {
    try {
      // Validate and set defaults
      const validatedOptions = this.validateOptions(options);
      
      // Generate context data
      const context = await this.createContext(validatedOptions);
      
      // Save context file
      const filePath = await this.saveContext(context);
      
      console.log(`✅ Context generated successfully: ${filePath}`);
      
      return context;
    } catch (error) {
      errorHandler.logError('Failed to generate context', error);
      throw error;
    }
  }

  /**
   * Validate and set default values for options
   */
  private validateOptions(options: MuseAgentOptions): ValidatedMuseAgentOptions {
    const ageRange = options.ageRange || '5-8';
    return {
      storyIdea: options.storyIdea || 'A magical adventure story',
      ageRange: ageRange,
      readingLevel: options.readingLevel || this.determineReadingLevel(ageRange),
      targetLength: options.targetLength || this.calculateTargetLength(ageRange),
      plotTemplate: options.plotTemplate || 'heroes_journey',
      characters: options.characters || ['Hero', 'Mentor', 'Villain'],
      locations: options.locations || ['Home', 'Adventure Location', 'Final Destination'],
      items: options.items || ['Magical Item', 'Key', 'Treasure'],
      themes: options.themes || ['Friendship', 'Courage', 'Growth'],
      morals: options.morals || ['Be brave', 'Help others', 'Never give up']
    };
  }

  /**
   * Determine reading level based on age range
   */
  private determineReadingLevel(ageRange: string): string {
    const age = parseInt(ageRange.split('-')[0] || '5');
    if (age < 6) return 'beginner';
    if (age < 10) return 'intermediate';
    return 'advanced';
  }

  /**
   * Calculate target word count based on age range
   */
  private calculateTargetLength(ageRange: string): number {
    const age = parseInt(ageRange.split('-')[0] || '5');
    if (age < 6) return 500;
    if (age < 10) return 1000;
    return 1500;
  }

  /**
   * Create story context from validated options
   */
  private async createContext(options: ValidatedMuseAgentOptions): Promise<StoryContext> {
    const now = new Date().toISOString();
    
    // Generate entities
    const characters = this.generateCharacters(options.characters);
    const locations = this.generateLocations(options.locations);
    const items = this.generateItems(options.items);
    
    // Generate plot points based on template
    const plotPoints = this.generatePlotPoints(options.plotTemplate, options.storyIdea);
    
    // Generate location progression
    const locationProgression = this.generateLocationProgression(locations);
    
    // Calculate word count ranges
    const minWords = Math.floor(options.targetLength * 0.8);
    const maxWords = Math.floor(options.targetLength * 1.2);

    return {
      title: this.generateTitle(options.storyIdea),
      target_audience: {
        age_range: options.ageRange,
        reading_level: options.readingLevel
      },
      target_length: {
        min_words: minWords,
        max_words: maxWords,
        final_target: options.targetLength
      },
      entities: {
        characters,
        locations,
        items
      },
      plot_template: options.plotTemplate,
      plot_points: plotPoints,
      location_progression: locationProgression,
      morals: options.morals,
      themes: options.themes,
      metadata: {
        created_at: now,
        last_modified: now,
        version: 1
      }
    };
  }

  /**
   * Generate character entities
   */
  private generateCharacters(characterNames: string[]): EntityReference[] {
    return characterNames.map((name, index) => ({
      id: `char_${index + 1}`,
      name,
      type: 'character' as const
    }));
  }

  /**
   * Generate location entities
   */
  private generateLocations(locationNames: string[]): EntityReference[] {
    return locationNames.map((name, index) => ({
      id: `loc_${index + 1}`,
      name,
      type: 'location' as const
    }));
  }

  /**
   * Generate item entities
   */
  private generateItems(itemNames: string[]): EntityReference[] {
    return itemNames.map((name, index) => ({
      id: `item_${index + 1}`,
      name,
      type: 'item' as const
    }));
  }

  /**
   * Generate plot points based on template
   */
  private generatePlotPoints(template: string, storyIdea: string): PlotPoint[] {
    switch (template) {
      case 'heroes_journey':
        return this.generateHeroesJourneyPlotPoints(storyIdea);
      case 'pixar':
        return this.generatePixarPlotPoints(storyIdea);
      case 'golden_circle':
        return this.generateGoldenCirclePlotPoints(storyIdea);
      default:
        return this.generateHeroesJourneyPlotPoints(storyIdea);
    }
  }

  /**
   * Generate Hero's Journey plot points
   */
  private generateHeroesJourneyPlotPoints(storyIdea: string): PlotPoint[] {
    return [
      {
        id: 'call_to_adventure',
        title: 'Call to Adventure',
        description: `The hero receives a call to adventure related to: ${storyIdea}`,
        order: 1
      },
      {
        id: 'refusal_of_call',
        title: 'Refusal of the Call',
        description: 'The hero initially refuses or hesitates to accept the adventure',
        order: 2
      },
      {
        id: 'meeting_mentor',
        title: 'Meeting the Mentor',
        description: 'The hero meets a wise mentor who provides guidance and tools',
        order: 3
      },
      {
        id: 'crossing_threshold',
        title: 'Crossing the Threshold',
        description: 'The hero commits to the adventure and enters the special world',
        order: 4
      },
      {
        id: 'tests_trials',
        title: 'Tests and Trials',
        description: 'The hero faces challenges and learns important lessons',
        order: 5
      },
      {
        id: 'approach_ordeal',
        title: 'Approach to the Ordeal',
        description: 'The hero prepares for the biggest challenge yet',
        order: 6
      },
      {
        id: 'ordeal',
        title: 'The Ordeal',
        description: 'The hero faces their greatest fear and emerges transformed',
        order: 7
      },
      {
        id: 'reward',
        title: 'The Reward',
        description: 'The hero claims their reward and gains new knowledge or power',
        order: 8
      },
      {
        id: 'road_back',
        title: 'The Road Back',
        description: 'The hero begins the journey home, changed by their experience',
        order: 9
      },
      {
        id: 'resurrection',
        title: 'Resurrection',
        description: 'The hero faces a final test that proves their transformation',
        order: 10
      },
      {
        id: 'return_elixir',
        title: 'Return with the Elixir',
        description: 'The hero returns home with wisdom to share with others',
        order: 11
      }
    ];
  }

  /**
   * Generate Pixar method plot points
   */
  private generatePixarPlotPoints(storyIdea: string): PlotPoint[] {
    return [
      {
        id: 'once_upon_time',
        title: 'Once Upon a Time',
        description: `Introduce the world and characters: ${storyIdea}`,
        order: 1
      },
      {
        id: 'every_day',
        title: 'Every Day',
        description: 'Show the normal routine and what the character wants',
        order: 2
      },
      {
        id: 'one_day',
        title: 'One Day',
        description: 'Something happens that changes everything',
        order: 3
      },
      {
        id: 'because_of_that',
        title: 'Because of That',
        description: 'The character reacts and tries to fix the problem',
        order: 4
      },
      {
        id: 'because_of_that_2',
        title: 'Because of That (Again)',
        description: 'The character faces more challenges and obstacles',
        order: 5
      },
      {
        id: 'until_finally',
        title: 'Until Finally',
        description: 'The character learns and grows, achieving their goal',
        order: 6
      }
    ];
  }

  /**
   * Generate Golden Circle plot points
   */
  private generateGoldenCirclePlotPoints(storyIdea: string): PlotPoint[] {
    return [
      {
        id: 'why',
        title: 'Why - The Purpose',
        description: `Establish the deeper meaning and purpose: ${storyIdea}`,
        order: 1
      },
      {
        id: 'how',
        title: 'How - The Process',
        description: 'Show how the character will achieve their purpose',
        order: 2
      },
      {
        id: 'what',
        title: 'What - The Action',
        description: 'Demonstrate what the character does to fulfill their purpose',
        order: 3
      },
      {
        id: 'challenge',
        title: 'The Challenge',
        description: 'Present obstacles that test the character\'s commitment to their why',
        order: 4
      },
      {
        id: 'resolution',
        title: 'Resolution',
        description: 'Show how the character\'s actions align with their deeper purpose',
        order: 5
      }
    ];
  }

  /**
   * Generate location progression
   */
  private generateLocationProgression(locations: EntityReference[]): LocationTransition[] {
    if (locations.length < 2) return [];
    
    const transitions: LocationTransition[] = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const fromLocation = locations[i];
      const toLocation = locations[i + 1];
      if (fromLocation && toLocation) {
        transitions.push({
          from: fromLocation.name,
          to: toLocation.name,
          description: `The journey continues from ${fromLocation.name} to ${toLocation.name}`
        });
      }
    }
    return transitions;
  }

  /**
   * Generate story title from idea
   */
  private generateTitle(storyIdea: string): string {
    // Simple title generation - in a real implementation, this would be more sophisticated
    const words = storyIdea.split(' ').slice(0, 3);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  /**
   * Save context to file
   */
  private async saveContext(context: StoryContext): Promise<string> {
    try {
      // Ensure contexts directory exists
      await fs.ensureDir(this.contextsDir);
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const filename = `context_${timestamp}_${Date.now()}.yaml`;
      const filePath = path.join(this.contextsDir, filename);
      
      // Convert context to YAML
      const yamlContent = yaml.stringify(context, { indent: 2 });
      
      // Write file
      await fs.writeFile(filePath, yamlContent, 'utf-8');
      
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to save context file', error);
      throw error;
    }
  }

  /**
   * Get available plot templates
   */
  public getPlotTemplates(): string[] {
    return ['heroes_journey', 'pixar', 'golden_circle'];
  }

  /**
   * Get age range suggestions
   */
  public getAgeRangeSuggestions(): string[] {
    return ['3-5', '5-8', '8-12', '12+'];
  }

  /**
   * Get reading level suggestions
   */
  public getReadingLevelSuggestions(): string[] {
    return ['beginner', 'intermediate', 'advanced'];
  }
}
