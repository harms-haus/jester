/**
 * Write Agent for jester storytelling system
 * Handles outline generation from context files
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { StoryContext, StoryOutline, DetailedPlotPoint } from '../types/index';
import { FileUtils } from '../utils/fileUtils';
import { errorHandler } from '../utils/errorHandler';

export interface WriteAgentOptions {
  contextFile?: string;
  outputPath?: string;
  template?: string;
}

export class WriteAgent {
  private fileUtils: FileUtils;
  private contextsPath: string;
  private outlinesPath: string;

  constructor() {
    this.fileUtils = new FileUtils();
    this.contextsPath = path.join(process.cwd(), 'contexts');
    this.outlinesPath = path.join(process.cwd(), 'outlines');
  }

  /**
   * Generate outline from context file
   */
  public async generateOutline(options: WriteAgentOptions): Promise<StoryOutline> {
    try {
      // Read and parse context file
      const context = await this.readContextFile(options.contextFile);
      
      // Generate detailed plot points
      const detailedPlotPoints = await this.generateDetailedPlotPoints(context);
      
      // Calculate estimated word count
      const estimatedWordCount = this.calculateEstimatedWordCount(detailedPlotPoints);
      
      // Create outline object
      const outline: StoryOutline = {
        title: context.title,
        target_audience: context.target_audience,
        target_length: context.target_length,
        plot_points: detailedPlotPoints,
        estimated_word_count: estimatedWordCount,
        metadata: {
          context_file: options.contextFile || 'unknown',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      return outline;
    } catch (error) {
      errorHandler.logError('Failed to generate outline', error, {
        operation: 'outline_generation',
        filePath: options.contextFile || 'unknown'
      });
      throw error;
    }
  }

  /**
   * Read and parse context file
   */
  private async readContextFile(contextFile?: string): Promise<StoryContext> {
    try {
      let filePath: string;
      
      if (contextFile) {
        filePath = path.isAbsolute(contextFile) ? contextFile : path.join(this.contextsPath, contextFile);
      } else {
        // Find the most recent context file
        filePath = await this.findMostRecentContextFile();
      }

      if (!await fs.pathExists(filePath)) {
        throw new Error(`Context file not found: ${filePath}`);
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const context = yaml.parse(content) as StoryContext;
      
      // Validate context structure
      this.validateContext(context);
      
      return context;
    } catch (error) {
      errorHandler.logError('Failed to read context file', error, {
        operation: 'context_reading',
        filePath: contextFile || 'unknown'
      });
      throw error;
    }
  }

  /**
   * Find the most recent context file
   */
  private async findMostRecentContextFile(): Promise<string> {
    try {
      const files = await fs.readdir(this.contextsPath);
      const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
      
      if (yamlFiles.length === 0) {
        throw new Error('No context files found in contexts directory');
      }

      // Sort by modification time (most recent first)
      const fileStats = await Promise.all(
        yamlFiles.map(async (file) => {
          const filePath = path.join(this.contextsPath, file);
          const stats = await fs.stat(filePath);
          return { file, filePath, mtime: stats.mtime };
        })
      );

      fileStats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
      return fileStats[0]?.filePath || '';
    } catch (error) {
      errorHandler.logError('Failed to find most recent context file', error, {
        operation: 'context_file_discovery'
      });
      throw error;
    }
  }

  /**
   * Validate context structure
   */
  private validateContext(context: any): void {
    const requiredFields = ['title', 'target_audience', 'target_length', 'plot_template', 'plot_points'];
    
    for (const field of requiredFields) {
      if (!context[field]) {
        throw new Error(`Missing required field in context: ${field}`);
      }
    }

    // Validate target_audience structure
    if (!context.target_audience.age_range || !context.target_audience.reading_level) {
      throw new Error('Invalid target_audience structure in context');
    }

    // Validate target_length structure
    if (!context.target_length.min_words || !context.target_length.max_words || !context.target_length.final_target) {
      throw new Error('Invalid target_length structure in context');
    }

    // Validate plot_points array
    if (!Array.isArray(context.plot_points) || context.plot_points.length === 0) {
      throw new Error('Invalid plot_points structure in context');
    }
  }

  /**
   * Generate detailed plot points from context
   */
  private async generateDetailedPlotPoints(context: StoryContext): Promise<DetailedPlotPoint[]> {
    try {
      const detailedPlotPoints: DetailedPlotPoint[] = [];
      
      for (let i = 0; i < context.plot_points.length; i++) {
        const plotPoint = context.plot_points[i];
        if (!plotPoint) continue;
        
        // Generate 2-3 sentence description
        const description = await this.generatePlotPointDescription(plotPoint, context, i);
        
        // Assign characters to plot point
        const characters = this.assignCharactersToPlotPoint(plotPoint, context, i);
        
        // Assign location to plot point
        const location = this.assignLocationToPlotPoint(plotPoint, context, i);
        
        // Calculate estimated words for this plot point
        const estimatedWords = this.calculatePlotPointWordCount(description, context);
        
        const detailedPlotPoint: DetailedPlotPoint = {
          id: plotPoint.id,
          title: plotPoint.title,
          description,
          characters,
          location,
          estimated_words: estimatedWords,
          order: plotPoint.order
        };
        
        detailedPlotPoints.push(detailedPlotPoint);
      }
      
      return detailedPlotPoints;
    } catch (error) {
      errorHandler.logError('Failed to generate detailed plot points', error, {
        operation: 'plot_point_generation'
      });
      throw error;
    }
  }

  /**
   * Generate 2-3 sentence description for plot point
   */
  private async generatePlotPointDescription(plotPoint: any, context: StoryContext, index: number): Promise<string> {
    const baseDescription = plotPoint.description;
    const plotTemplate = context.plot_template;
    const totalPoints = context.plot_points.length;
    
    // Generate enhanced description based on plot template and position
    let enhancedDescription = this.enhanceDescriptionByTemplate(
      baseDescription, 
      plotTemplate, 
      index, 
      totalPoints, 
      context
    );
    
    // Add character context if available
    if (context.entities.characters.length > 0) {
      const mainCharacter = context.entities.characters[0];
      if (mainCharacter) {
        enhancedDescription = this.addCharacterContext(enhancedDescription, mainCharacter.name, index, totalPoints);
      }
    }
    
    // Add location context if available
    if (context.entities.locations.length > 0) {
      const mainLocation = context.entities.locations[0];
      if (mainLocation) {
        enhancedDescription = this.addLocationContext(enhancedDescription, mainLocation.name, index, totalPoints);
      }
    }
    
    // Ensure 2-3 sentences
    enhancedDescription = this.ensureProperSentenceCount(enhancedDescription);
    
    return enhancedDescription.trim();
  }

  /**
   * Enhance description based on plot template
   */
  private enhanceDescriptionByTemplate(
    baseDescription: string, 
    plotTemplate: string, 
    index: number, 
    totalPoints: number, 
    context: StoryContext
  ): string {
    const position = index / (totalPoints - 1); // 0 to 1
    
    switch (plotTemplate) {
      case 'heroes_journey':
        return this.enhanceHeroesJourneyDescription(baseDescription, index, position, context);
      case 'pixar':
        return this.enhancePixarDescription(baseDescription, index, position, context);
      case 'golden_circle':
        return this.enhanceGoldenCircleDescription(baseDescription, index, position, context);
      default:
        return this.enhanceGenericDescription(baseDescription, index, position, context);
    }
  }

  /**
   * Enhance description for Hero's Journey template
   */
  private enhanceHeroesJourneyDescription(
    baseDescription: string, 
    index: number, 
    position: number, 
    context: StoryContext
  ): string {
    const journeyStages = [
      'Ordinary World', 'Call to Adventure', 'Refusal of Call', 'Meeting Mentor',
      'Crossing Threshold', 'Tests and Trials', 'Approach to Ordeal', 'Ordeal',
      'Reward', 'Road Back', 'Resurrection', 'Return with Elixir'
    ];
    
    const stage = journeyStages[Math.min(index, journeyStages.length - 1)] || 'Journey Stage';
    
    if (position < 0.3) {
      return `${baseDescription} This marks the beginning of the hero's journey in the ${stage} phase. The protagonist is about to embark on an adventure that will change their life forever.`;
    } else if (position < 0.7) {
      return `${baseDescription} This is a crucial moment in the ${stage} phase where the hero faces significant challenges. The stakes are high and the outcome is uncertain.`;
    } else {
      return `${baseDescription} This represents the climax of the ${stage} phase where the hero must make a critical decision. The resolution of this moment will determine the story's outcome.`;
    }
  }

  /**
   * Enhance description for Pixar template
   */
  private enhancePixarDescription(
    baseDescription: string, 
    index: number, 
    position: number, 
    context: StoryContext
  ): string {
    const pixarStages = [
      'Once upon a time', 'Every day', 'One day', 'Because of that',
      'Because of that', 'Until finally'
    ];
    
    const stage = pixarStages[Math.min(index, pixarStages.length - 1)] || 'Story Stage';
    
    if (position < 0.2) {
      return `${baseDescription} This establishes the character's world and daily routine. The audience learns about the protagonist's normal life before everything changes.`;
    } else if (position < 0.4) {
      return `${baseDescription} This is the inciting incident that disrupts the character's ordinary world. Something happens that forces the protagonist to take action.`;
    } else if (position < 0.8) {
      return `${baseDescription} This shows the character's struggle and growth as they face obstacles. The protagonist learns important lessons and develops throughout this phase.`;
    } else {
      return `${baseDescription} This is the resolution where the character achieves their goal or learns their lesson. The story comes to a satisfying conclusion that shows how the character has changed.`;
    }
  }

  /**
   * Enhance description for Golden Circle template
   */
  private enhanceGoldenCircleDescription(
    baseDescription: string, 
    index: number, 
    position: number, 
    context: StoryContext
  ): string {
    const circleStages = ['Why', 'How', 'What', 'Impact', 'Legacy'];
    const stage = circleStages[Math.min(index, circleStages.length - 1)] || 'Circle Stage';
    
    if (position < 0.2) {
      return `${baseDescription} This establishes the core purpose and motivation behind the story. The audience understands why this story matters and what drives the characters.`;
    } else if (position < 0.6) {
      return `${baseDescription} This shows how the characters work toward their goals and overcome challenges. The methods and approaches used to achieve the story's purpose are revealed.`;
    } else {
      return `${baseDescription} This demonstrates the impact and results of the characters' actions. The story's purpose is fulfilled and its meaning becomes clear to the audience.`;
    }
  }

  /**
   * Enhance description for generic template
   */
  private enhanceGenericDescription(
    baseDescription: string, 
    index: number, 
    position: number, 
    context: StoryContext
  ): string {
    if (position < 0.3) {
      return `${baseDescription} This is an important setup moment that establishes key story elements. The foundation for the narrative is being laid in this scene.`;
    } else if (position < 0.7) {
      return `${baseDescription} This represents a significant development in the story's progression. The plot thickens and the characters face meaningful challenges.`;
    } else {
      return `${baseDescription} This is a crucial moment that drives toward the story's conclusion. The resolution of key plot points begins to take shape.`;
    }
  }

  /**
   * Add character context to description
   */
  private addCharacterContext(description: string, characterName: string, index: number, totalPoints: number): string {
    const position = index / (totalPoints - 1);
    
    if (position < 0.3) {
      return `${description} ${characterName} is introduced and their initial motivations are established.`;
    } else if (position < 0.7) {
      return `${description} ${characterName} faces challenges that test their resolve and force them to grow.`;
    } else {
      return `${description} ${characterName} demonstrates how they have changed and what they have learned.`;
    }
  }

  /**
   * Add location context to description
   */
  private addLocationContext(description: string, locationName: string, index: number, totalPoints: number): string {
    const position = index / (totalPoints - 1);
    
    if (position < 0.3) {
      return `${description} The setting of ${locationName} provides the backdrop for this important scene.`;
    } else if (position < 0.7) {
      return `${description} The environment of ${locationName} plays a crucial role in this pivotal moment.`;
    } else {
      return `${description} The location of ${locationName} serves as the perfect setting for this climactic scene.`;
    }
  }

  /**
   * Ensure description has 2-3 sentences
   */
  private ensureProperSentenceCount(description: string): string {
    const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length < 2) {
      return `${description} This moment is crucial to the story's development and character growth.`;
    } else if (sentences.length > 3) {
      // Keep only the first 3 sentences
      return sentences.slice(0, 3).join('. ').trim() + '.';
    }
    
    return description;
  }

  /**
   * Assign characters to plot point
   */
  private assignCharactersToPlotPoint(plotPoint: any, context: StoryContext, index: number): string[] {
    const characters: string[] = [];
    const totalPoints = context.plot_points.length;
    const position = index / (totalPoints - 1);
    
    // Always include main character if available
    if (context.entities.characters.length > 0) {
      const mainCharacter = context.entities.characters[0];
      if (mainCharacter) {
        characters.push(mainCharacter.name);
      }
    }
    
    // Add characters based on plot template and position
    const assignedCharacters = this.assignCharactersByTemplate(
      context.entities.characters, 
      context.plot_template, 
      index, 
      position, 
      totalPoints
    );
    
    // Add assigned characters (excluding main character to avoid duplicates)
    const mainCharacterName = context.entities.characters[0]?.name;
    for (const char of assignedCharacters) {
      if (char.name !== mainCharacterName) {
        characters.push(char.name);
      }
    }
    
    // Ensure we don't have too many characters per plot point (max 3)
    return characters.slice(0, 3);
  }

  /**
   * Assign characters based on plot template
   */
  private assignCharactersByTemplate(
    characters: any[], 
    plotTemplate: string, 
    index: number, 
    position: number, 
    totalPoints: number
  ): any[] {
    if (characters.length <= 1) {
      return characters;
    }
    
    switch (plotTemplate) {
      case 'heroes_journey':
        return this.assignHeroesJourneyCharacters(characters, index, position);
      case 'pixar':
        return this.assignPixarCharacters(characters, index, position);
      case 'golden_circle':
        return this.assignGoldenCircleCharacters(characters, index, position);
      default:
        return this.assignGenericCharacters(characters, index, position);
    }
  }

  /**
   * Assign characters for Hero's Journey template
   */
  private assignHeroesJourneyCharacters(characters: any[], index: number, position: number): any[] {
    const assigned: any[] = [];
    
    if (position < 0.2) {
      // Early stages: Main character + mentor if available
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Mentor
      }
    } else if (position < 0.6) {
      // Middle stages: Main character + allies + antagonists
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Ally/mentor
      }
      if (characters.length > 2) {
        assigned.push(characters[2]); // Antagonist or ally
      }
    } else {
      // Final stages: Main character + key allies
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Primary ally
      }
    }
    
    return assigned;
  }

  /**
   * Assign characters for Pixar template
   */
  private assignPixarCharacters(characters: any[], index: number, position: number): any[] {
    const assigned: any[] = [];
    
    if (position < 0.3) {
      // Setup: Main character + family/friends
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Family/friend
      }
    } else if (position < 0.7) {
      // Conflict: Main character + antagonist + helper
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Antagonist or helper
      }
      if (characters.length > 2) {
        assigned.push(characters[2]); // Helper or antagonist
      }
    } else {
      // Resolution: Main character + key relationships
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Primary relationship
      }
    }
    
    return assigned;
  }

  /**
   * Assign characters for Golden Circle template
   */
  private assignGoldenCircleCharacters(characters: any[], index: number, position: number): any[] {
    const assigned: any[] = [];
    
    if (position < 0.4) {
      // Why/How phases: Main character + supporters
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Supporter
      }
    } else {
      // What/Impact phases: Main character + community
      assigned.push(characters[0]); // Main character
      if (characters.length > 1) {
        assigned.push(characters[1]); // Community member
      }
      if (characters.length > 2) {
        assigned.push(characters[2]); // Another community member
      }
    }
    
    return assigned;
  }

  /**
   * Assign characters for generic template
   */
  private assignGenericCharacters(characters: any[], index: number, position: number): any[] {
    const assigned: any[] = [];
    
    // Always include main character
    assigned.push(characters[0]);
    
    // Add other characters based on position
    if (position < 0.5) {
      // First half: Add supporting characters
      if (characters.length > 1) {
        assigned.push(characters[1]);
      }
    } else {
      // Second half: Add more characters for complexity
      if (characters.length > 1) {
        assigned.push(characters[1]);
      }
      if (characters.length > 2) {
        assigned.push(characters[2]);
      }
    }
    
    return assigned;
  }

  /**
   * Assign location to plot point
   */
  private assignLocationToPlotPoint(plotPoint: any, context: StoryContext, index: number): string {
    // Use location progression if available
    if (context.location_progression && context.location_progression.length > 0) {
      const locationIndex = Math.min(index, context.location_progression.length - 1);
      const locationTransition = context.location_progression[locationIndex];
      if (locationTransition) {
        return locationTransition.to;
      }
    }
    
    // Assign location based on plot template and position
    const totalPoints = context.plot_points.length;
    const position = index / (totalPoints - 1);
    
    return this.assignLocationByTemplate(
      context.entities.locations, 
      context.plot_template, 
      index, 
      position, 
      totalPoints
    );
  }

  /**
   * Assign location based on plot template
   */
  private assignLocationByTemplate(
    locations: any[], 
    plotTemplate: string, 
    index: number, 
    position: number, 
    totalPoints: number
  ): string {
    if (locations.length === 0) {
      return 'Unknown Location';
    }
    
    if (locations.length === 1) {
      return locations[0].name;
    }
    
    switch (plotTemplate) {
      case 'heroes_journey':
        return this.assignHeroesJourneyLocation(locations, index, position);
      case 'pixar':
        return this.assignPixarLocation(locations, index, position);
      case 'golden_circle':
        return this.assignGoldenCircleLocation(locations, index, position);
      default:
        return this.assignGenericLocation(locations, index, position);
    }
  }

  /**
   * Assign location for Hero's Journey template
   */
  private assignHeroesJourneyLocation(locations: any[], index: number, position: number): string {
    if (position < 0.2) {
      // Ordinary world - first location
      return locations[0].name;
    } else if (position < 0.4) {
      // Call to adventure - second location or first
      return locations[Math.min(1, locations.length - 1)].name;
    } else if (position < 0.8) {
      // Special world - middle locations
      const locationIndex = Math.min(2, locations.length - 1);
      return locations[locationIndex].name;
    } else {
      // Return - final location or first
      return locations[Math.min(3, locations.length - 1)].name || locations[0].name;
    }
  }

  /**
   * Assign location for Pixar template
   */
  private assignPixarLocation(locations: any[], index: number, position: number): string {
    if (position < 0.3) {
      // Setup - home/comfortable location
      return locations[0].name;
    } else if (position < 0.7) {
      // Conflict - challenging location
      return locations[Math.min(1, locations.length - 1)].name;
    } else {
      // Resolution - return to home or new location
      return locations[Math.min(2, locations.length - 1)].name || locations[0].name;
    }
  }

  /**
   * Assign location for Golden Circle template
   */
  private assignGoldenCircleLocation(locations: any[], index: number, position: number): string {
    if (position < 0.4) {
      // Why/How - central location
      return locations[0].name;
    } else {
      // What/Impact - expanded locations
      return locations[Math.min(1, locations.length - 1)].name;
    }
  }

  /**
   * Assign location for generic template
   */
  private assignGenericLocation(locations: any[], index: number, position: number): string {
    // Cycle through locations based on position
    const locationIndex = Math.floor(position * locations.length);
    return locations[Math.min(locationIndex, locations.length - 1)].name;
  }

  /**
   * Calculate estimated word count for plot point
   */
  private calculatePlotPointWordCount(description: string, context: StoryContext): number {
    const baseWords = description.split(/\s+/).length;
    const targetLength = context.target_length.final_target;
    const totalPlotPoints = context.plot_points.length;
    
    // Distribute target words across plot points
    const averageWordsPerPoint = Math.floor(targetLength / totalPlotPoints);
    
    // Adjust based on description length (longer descriptions = more words)
    const wordMultiplier = Math.min(2, Math.max(0.5, baseWords / 20));
    
    return Math.floor(averageWordsPerPoint * wordMultiplier);
  }

  /**
   * Calculate estimated word count for entire outline
   */
  private calculateEstimatedWordCount(plotPoints: DetailedPlotPoint[]): number {
    return plotPoints.reduce((total, point) => total + point.estimated_words, 0);
  }

  /**
   * Save outline to file
   */
  public async saveOutline(outline: StoryOutline, filename?: string): Promise<string> {
    try {
      const filePath = await this.fileUtils.createOutlineFile(outline, filename);
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to save outline', error, {
        operation: 'outline_saving',
        filePath: filename || 'unknown'
      });
      throw error;
    }
  }

  /**
   * Generate outline and save to file
   */
  public async generateAndSaveOutline(options: WriteAgentOptions): Promise<{ outline: StoryOutline; filePath: string }> {
    try {
      const outline = await this.generateOutline(options);
      const filePath = await this.saveOutline(outline, options.outputPath);
      
      return { outline, filePath };
    } catch (error) {
      errorHandler.logError('Failed to generate and save outline', error, {
        operation: 'outline_generation_and_saving',
        filePath: options.contextFile || 'unknown'
      });
      throw error;
    }
  }
}
