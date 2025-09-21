/**
 * File utilities for jester storytelling system
 * Handles file creation, validation, and pipeline management
 */

import fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { StoryContext, StoryOutline, Story, DetailedPlotPoint, Character, Location, Item, EntityFile } from '../types/index.js';
import { errorHandler } from './errorHandler.js';

export class FileUtils {
  private templatesPath: string;
  private contextsPath: string;
  private outlinesPath: string;
  private storiesPath: string;
  private entitiesPath: string;

  constructor() {
    this.templatesPath = path.join(process.cwd(), '.jester', 'templates');
    this.contextsPath = path.join(process.cwd(), 'contexts');
    this.outlinesPath = path.join(process.cwd(), 'outlines');
    this.storiesPath = path.join(process.cwd(), 'stories');
    this.entitiesPath = path.join(process.cwd(), 'entities');
  }

  /**
   * Create a new context file from template
   */
  public async createContextFile(context: StoryContext, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'context.yaml');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, context.title)
        .replace(/\{\{AGE_RANGE\}\}/g, context.target_audience.age_range)
        .replace(/\{\{READING_LEVEL\}\}/g, context.target_audience.reading_level)
        .replace(/\{\{MIN_WORDS\}\}/g, context.target_length.min_words.toString())
        .replace(/\{\{MAX_WORDS\}\}/g, context.target_length.max_words.toString())
        .replace(/\{\{FINAL_TARGET\}\}/g, context.target_length.final_target.toString())
        .replace(/\{\{PLOT_TEMPLATE\}\}/g, context.plot_template)
        .replace(/\{\{CREATED_AT\}\}/g, context.metadata.created_at)
        .replace(/\{\{LAST_MODIFIED\}\}/g, context.metadata.last_modified)
        .replace(/\{\{VERSION\}\}/g, context.metadata.version.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateContextFilename(context.title);
      const filePath = path.join(this.contextsPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create context file', error);
      throw error;
    }
  }

  /**
   * Create a new outline file from template
   */
  public async createOutlineFile(outline: StoryOutline, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'outline.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Read context file to get additional data for template processing
      const context = await this.readContextFileForOutline(outline.metadata.context_file);
      
      // Replace basic template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, outline.title)
        .replace(/\{\{AGE_RANGE\}\}/g, outline.target_audience.age_range)
        .replace(/\{\{READING_LEVEL\}\}/g, outline.target_audience.reading_level)
        .replace(/\{\{MIN_WORDS\}\}/g, outline.target_length.min_words.toString())
        .replace(/\{\{MAX_WORDS\}\}/g, outline.target_length.max_words.toString())
        .replace(/\{\{FINAL_TARGET\}\}/g, outline.target_length.final_target.toString())
        .replace(/\{\{CREATED_AT\}\}/g, outline.metadata.created_at)
        .replace(/\{\{CONTEXT_FILE\}\}/g, outline.metadata.context_file)
        .replace(/\{\{ESTIMATED_WORD_COUNT\}\}/g, outline.estimated_word_count.toString());

      // Process complex template sections with context data
      content = await this.processTemplateSections(content, outline, context);

      // Generate filename if not provided
      const finalFilename = filename || this.generateOutlineFilename(outline.title);
      const filePath = path.join(this.outlinesPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create outline file', error);
      throw error;
    }
  }

  /**
   * Read context file for outline processing
   */
  private async readContextFileForOutline(contextFile: string): Promise<StoryContext | null> {
    try {
      const filePath = path.isAbsolute(contextFile) ? contextFile : path.join(this.contextsPath, contextFile);
      
      if (!await fs.pathExists(filePath)) {
        errorHandler.logError(`Context file not found: ${filePath}`, new Error('File not found'));
        return null;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const context = yaml.parse(content) as StoryContext;
      
      return context;
    } catch (error) {
      errorHandler.logError('Failed to read context file for outline', error);
      return null;
    }
  }

  /**
   * Process complex template sections with data
   */
  private async processTemplateSections(content: string, outline: StoryOutline, context?: StoryContext | null): Promise<string> {
    try {
      // Process plot points section
      content = this.processPlotPointsSection(content, outline.plot_points);
      
      // Process character arcs section using context data
      content = this.processCharacterArcsSection(content, outline, context);
      
      // Process locations section using context data
      content = this.processLocationsSection(content, outline, context);
      
      // Process themes and morals section using context data
      content = this.processThemesAndMoralsSection(content, outline, context);
      
      // Process act structure section
      content = this.processActStructureSection(content, outline);
      
      // Process reading time calculation
      content = this.processReadingTimeSection(content, outline);
      
      return content;
    } catch (error) {
      errorHandler.logError('Failed to process template sections', error);
      throw error;
    }
  }

  /**
   * Process plot points section
   */
  private processPlotPointsSection(content: string, plotPoints: DetailedPlotPoint[]): string {
    const plotPointsSection = plotPoints.map(point => {
      return `### ${point.order}. ${point.title}
- **Characters:** ${point.characters.join(', ')}
- **Location:** ${point.location}
- **Description:** ${point.description}
- **Estimated Words:** ${point.estimated_words}

`;
    }).join('');

    return content.replace(/\{\{#PLOT_POINTS\}\}[\s\S]*?\{\{\/PLOT_POINTS\}\}/g, plotPointsSection);
  }

  /**
   * Process character arcs section
   */
  private processCharacterArcsSection(content: string, outline: StoryOutline, context?: StoryContext | null): string {
    if (!context || !context.entities.characters) {
      // Fallback to extracting from plot points
      const characters = this.extractCharactersFromPlotPoints(outline.plot_points);
      const characterArcsSection = characters.map(char => {
        return `### ${char}
- **Role:** Main Character
- **Motivation:** To complete the adventure
- **Growth:** Develops courage and wisdom
- **Key Scenes:** Throughout the story

`;
      }).join('');
      return content.replace(/\{\{#CHARACTERS\}\}[\s\S]*?\{\{\/CHARACTERS\}\}/g, characterArcsSection);
    }

    // Use context data to create detailed character arcs
    const characterArcsSection = context.entities.characters.map((char, index) => {
      const role = index === 0 ? 'Protagonist' : index === 1 ? 'Supporting Character' : 'Antagonist';
      const motivation = this.generateCharacterMotivation(char.name, role);
      const growth = this.generateCharacterGrowth(char.name, role);
      const keyScenes = this.generateCharacterKeyScenes(char.name, outline.plot_points);
      
      return `### ${char.name}
- **Role:** ${role}
- **Motivation:** ${motivation}
- **Growth:** ${growth}
- **Key Scenes:** ${keyScenes}

`;
    }).join('');

    return content.replace(/\{\{#CHARACTERS\}\}[\s\S]*?\{\{\/CHARACTERS\}\}/g, characterArcsSection);
  }

  /**
   * Process locations section
   */
  private processLocationsSection(content: string, outline: StoryOutline, context?: StoryContext | null): string {
    if (!context || !context.entities.locations) {
      // Fallback to extracting from plot points
      const locations = this.extractLocationsFromPlotPoints(outline.plot_points);
      const locationsSection = locations.map(loc => {
        return `### ${loc}
- **Description:** A key location in the story
- **Atmosphere:** Important to the narrative
- **Key Elements:** Central to the plot

`;
      }).join('');
      return content.replace(/\{\{#LOCATIONS\}\}[\s\S]*?\{\{\/LOCATIONS\}\}/g, locationsSection);
    }

    // Use context data to create detailed location descriptions
    const locationsSection = context.entities.locations.map((loc, index) => {
      const description = this.generateLocationDescription(loc.name, index);
      const atmosphere = this.generateLocationAtmosphere(loc.name, index);
      const keyElements = this.generateLocationKeyElements(loc.name, index);
      
      return `### ${loc.name}
- **Description:** ${description}
- **Atmosphere:** ${atmosphere}
- **Key Elements:** ${keyElements}

`;
    }).join('');

    return content.replace(/\{\{#LOCATIONS\}\}[\s\S]*?\{\{\/LOCATIONS\}\}/g, locationsSection);
  }

  /**
   * Process themes and morals section
   */
  private processThemesAndMoralsSection(content: string, outline: StoryOutline, context?: StoryContext | null): string {
    let themes: string[];
    let morals: string[];
    
    if (context && context.themes && context.morals) {
      // Use context data
      themes = context.themes;
      morals = context.morals;
    } else {
      // Fallback to generic themes and morals
      themes = ['Courage', 'Friendship', 'Growth'];
      morals = ['Be brave', 'Help others', 'Never give up'];
    }
    
    const themesSection = themes.map(theme => `- ${theme}`).join('\n');
    const moralsSection = morals.map(moral => `- ${moral}`).join('\n');

    let result = content.replace(/\{\{#THEMES\}\}[\s\S]*?\{\{\/THEMES\}\}/g, themesSection);
    result = result.replace(/\{\{#MORALS\}\}[\s\S]*?\{\{\/MORALS\}\}/g, moralsSection);
    
    return result;
  }

  /**
   * Process act structure section
   */
  private processActStructureSection(content: string, outline: StoryOutline): string {
    const plotPoints = outline.plot_points;
    const totalPoints = plotPoints.length;
    
    // Generate act structure based on plot points
    const openingScene = plotPoints[0]?.description || 'The story begins with our hero in their ordinary world.';
    const characterIntro = plotPoints[0]?.description || 'We meet our main character and learn about their world.';
    const incident = plotPoints[1]?.description || 'Something happens that changes everything.';
    
    const risingAction = plotPoints[Math.floor(totalPoints * 0.3)]?.description || 'The hero faces increasing challenges.';
    const characterDev = plotPoints[Math.floor(totalPoints * 0.5)]?.description || 'The hero grows and learns important lessons.';
    const conflictEscalation = plotPoints[Math.floor(totalPoints * 0.7)]?.description || 'The stakes get higher and the challenges more difficult.';
    
    const climax = plotPoints[Math.floor(totalPoints * 0.8)]?.description || 'The hero faces their greatest challenge.';
    const fallingAction = plotPoints[Math.floor(totalPoints * 0.9)]?.description || 'The hero deals with the aftermath of their victory.';
    const resolution = plotPoints[totalPoints - 1]?.description || 'The hero returns home, changed by their experience.';

    return content
      .replace(/\{\{OPENING_SCENE_DESCRIPTION\}\}/g, openingScene)
      .replace(/\{\{CHARACTER_INTRO_DESCRIPTION\}\}/g, characterIntro)
      .replace(/\{\{INCIDENT_DESCRIPTION\}\}/g, incident)
      .replace(/\{\{RISING_ACTION_DESCRIPTION\}\}/g, risingAction)
      .replace(/\{\{CHARACTER_DEVELOPMENT_DESCRIPTION\}\}/g, characterDev)
      .replace(/\{\{CONFLICT_ESCALATION_DESCRIPTION\}\}/g, conflictEscalation)
      .replace(/\{\{CLIMAX_DESCRIPTION\}\}/g, climax)
      .replace(/\{\{FALLING_ACTION_DESCRIPTION\}\}/g, fallingAction)
      .replace(/\{\{RESOLUTION_DESCRIPTION\}\}/g, resolution);
  }

  /**
   * Process reading time section
   */
  private processReadingTimeSection(content: string, outline: StoryOutline): string {
    const readingTimeMinutes = Math.ceil(outline.estimated_word_count / 200); // Average 200 words per minute
    return content.replace(/\{\{READING_TIME_MINUTES\}\}/g, readingTimeMinutes.toString());
  }

  /**
   * Extract unique characters from plot points
   */
  private extractCharactersFromPlotPoints(plotPoints: DetailedPlotPoint[]): string[] {
    const characters = new Set<string>();
    plotPoints.forEach(point => {
      point.characters.forEach((char: string) => characters.add(char));
    });
    return Array.from(characters);
  }

  /**
   * Extract unique locations from plot points
   */
  private extractLocationsFromPlotPoints(plotPoints: DetailedPlotPoint[]): string[] {
    const locations = new Set<string>();
    plotPoints.forEach(point => {
      if (point.location) {
        locations.add(point.location);
      }
    });
    return Array.from(locations);
  }

  /**
   * Generate character motivation based on name and role
   */
  private generateCharacterMotivation(name: string, role: string): string {
    const motivations: Record<string, string> = {
      'Hero': 'To protect others and do what\'s right',
      'Mentor': 'To guide and teach the next generation',
      'Villain': 'To achieve their own goals at any cost',
      'Protagonist': 'To overcome challenges and grow as a person',
      'Supporting Character': 'To help the protagonist succeed',
      'Antagonist': 'To oppose the protagonist\'s goals'
    };
    
    return motivations[name] || motivations[role] || 'To play their part in the story';
  }

  /**
   * Generate character growth arc based on name and role
   */
  private generateCharacterGrowth(name: string, role: string): string {
    const growthArcs: Record<string, string> = {
      'Hero': 'Learns to balance personal desires with responsibility to others',
      'Mentor': 'Discovers the importance of letting others make their own choices',
      'Villain': 'May experience redemption or face the consequences of their actions',
      'Protagonist': 'Develops courage, wisdom, and understanding through their journey',
      'Supporting Character': 'Grows in their ability to support and help others',
      'Antagonist': 'May learn from their mistakes or face the consequences of their choices'
    };
    
    return growthArcs[name] || growthArcs[role] || 'Develops and changes through their experiences';
  }

  /**
   * Generate key scenes for a character based on plot points
   */
  private generateCharacterKeyScenes(name: string, plotPoints: DetailedPlotPoint[]): string {
    const characterScenes = plotPoints
      .filter(point => point.characters.includes(name))
      .map(point => point.title)
      .slice(0, 3); // Limit to first 3 scenes
    
    return characterScenes.length > 0 
      ? characterScenes.join(', ')
      : 'Throughout the story';
  }

  /**
   * Generate location description based on name and index
   */
  private generateLocationDescription(name: string, index: number): string {
    const descriptions: Record<string, string> = {
      'Home': 'The starting point where the protagonist begins their journey',
      'Adventure Location': 'A mysterious and exciting place where the main adventure unfolds',
      'Final Destination': 'The climactic location where the story reaches its peak',
      'Forest': 'A dense, mysterious woodland filled with secrets and challenges',
      'Castle': 'A grand and imposing structure that holds great significance',
      'Village': 'A small, close-knit community where the story begins or ends'
    };
    
    return descriptions[name] || `A significant location that plays an important role in the story (${index + 1} of ${index + 1} main locations)`;
  }

  /**
   * Generate location atmosphere based on name and index
   */
  private generateLocationAtmosphere(name: string, index: number): string {
    const atmospheres: Record<string, string> = {
      'Home': 'Warm, familiar, and safe',
      'Adventure Location': 'Exciting, mysterious, and full of possibilities',
      'Final Destination': 'Intense, climactic, and emotionally charged',
      'Forest': 'Mysterious, peaceful yet potentially dangerous',
      'Castle': 'Grand, imposing, and filled with history',
      'Village': 'Cozy, welcoming, and community-focused'
    };
    
    return atmospheres[name] || 'Important to the narrative and story progression';
  }

  /**
   * Generate location key elements based on name and index
   */
  private generateLocationKeyElements(name: string, index: number): string {
    const elements: Record<string, string> = {
      'Home': 'Family, memories, and the starting point of change',
      'Adventure Location': 'Challenges, discoveries, and character growth',
      'Final Destination': 'Climax, resolution, and transformation',
      'Forest': 'Nature, mystery, and hidden paths',
      'Castle': 'Power, history, and important decisions',
      'Village': 'Community, support, and everyday life'
    };
    
    return elements[name] || 'Central to the plot and character development';
  }

  /**
   * Create a new story file from template
   */
  public async createStoryFile(story: Story, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'story.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, story.title)
        .replace(/\{\{STORY_CONTENT\}\}/g, story.content)
        .replace(/\{\{WORD_COUNT\}\}/g, story.word_count.toString())
        .replace(/\{\{READING_TIME_MINUTES\}\}/g, story.metadata.reading_time_minutes.toString())
        .replace(/\{\{CREATED_AT\}\}/g, story.metadata.created_at)
        .replace(/\{\{OUTLINE_FILE\}\}/g, story.metadata.outline_file)
        .replace(/\{\{CONTEXT_FILE\}\}/g, story.metadata.context_file);

      // Generate filename if not provided
      const finalFilename = filename || this.generateStoryFilename(story.title);
      const filePath = path.join(this.storiesPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create story file', error);
      throw error;
    }
  }

  /**
   * Validate file structure and content
   */
  public async validateFile(filePath: string): Promise<boolean> {
    try {
      if (!await fs.pathExists(filePath)) {
        return false;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const ext = path.extname(filePath);

      switch (ext) {
        case '.yaml':
        case '.yml':
          return this.validateYamlFile(content);
        case '.md':
          return this.validateMarkdownFile(content);
        default:
          return true; // Assume valid for other file types
      }
    } catch (error) {
      errorHandler.logError(`Failed to validate file: ${filePath}`, error);
      return false;
    }
  }

  /**
   * Validate YAML file content
   */
  private validateYamlFile(content: string): boolean {
    try {
      yaml.parse(content);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate Markdown file content
   */
  private validateMarkdownFile(content: string): boolean {
    // Basic validation - check for required sections
    const requiredSections = ['#', '##'];
    return requiredSections.some(section => content.includes(section));
  }

  /**
   * Generate context filename
   */
  private generateContextFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.yaml`;
  }

  /**
   * Generate outline filename
   */
  private generateOutlineFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.md`;
  }

  /**
   * Generate story filename
   */
  private generateStoryFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.md`;
  }

  /**
   * Ensure directory exists
   */
  public async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
    } catch (error) {
      errorHandler.logError(`Failed to create directory: ${dirPath}`, error);
      throw error;
    }
  }

  /**
   * Get file statistics
   */
  public async getFileStats(filePath: string): Promise<fs.Stats | null> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      errorHandler.logError(`Failed to get file stats: ${filePath}`, error);
      return null;
    }
  }

  /**
   * Create a new character entity file from template
   */
  public async createCharacterFile(character: Character, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'character.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{CHARACTER_NAME\}\}/g, character.name)
        .replace(/\{\{CHARACTER_TYPE\}\}/g, character.type)
        .replace(/\{\{CHARACTER_AGE\}\}/g, character.age)
        .replace(/\{\{CHARACTER_SPECIES\}\}/g, character.species)
        .replace(/\{\{CHARACTER_DESCRIPTION\}\}/g, character.description)
        .replace(/\{\{PERSONALITY_TRAITS\}\}/g, character.personality_traits.join(', '))
        .replace(/\{\{MOTIVATIONS\}\}/g, character.motivations.join(', '))
        .replace(/\{\{FEARS\}\}/g, character.fears.join(', '))
        .replace(/\{\{FAMILY_RELATIONSHIPS\}\}/g, character.family_relationships.join(', '))
        .replace(/\{\{FRIEND_RELATIONSHIPS\}\}/g, character.friend_relationships.join(', '))
        .replace(/\{\{ENEMY_RELATIONSHIPS\}\}/g, character.enemy_relationships.join(', '))
        .replace(/\{\{FIRST_STORY\}\}/g, character.first_story)
        .replace(/\{\{RECENT_STORY\}\}/g, character.recent_story)
        .replace(/\{\{STORY_COUNT\}\}/g, character.story_count.toString())
        .replace(/\{\{PHYSICAL_DESCRIPTION\}\}/g, character.physical_description)
        .replace(/\{\{CLOTHING_STYLE\}\}/g, character.clothing_style)
        .replace(/\{\{DISTINCTIVE_FEATURES\}\}/g, character.distinctive_features.join(', '))
        .replace(/\{\{SPECIAL_POWERS\}\}/g, character.special_powers.join(', '))
        .replace(/\{\{SKILLS\}\}/g, character.skills.join(', '))
        .replace(/\{\{WEAKNESSES\}\}/g, character.weaknesses.join(', '))
        .replace(/\{\{BACKSTORY\}\}/g, character.backstory)
        .replace(/\{\{ADDITIONAL_NOTES\}\}/g, character.additional_notes)
        .replace(/\{\{CREATED_AT\}\}/g, character.metadata.created_at)
        .replace(/\{\{LAST_MODIFIED\}\}/g, character.metadata.last_modified)
        .replace(/\{\{VERSION\}\}/g, character.metadata.version.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateEntityFilename(character.name, 'character');
      const filePath = path.join(this.entitiesPath, 'characters', finalFilename);

      // Ensure directory exists
      await this.ensureDirectory(path.dirname(filePath));

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create character file', error);
      throw error;
    }
  }

  /**
   * Create a new location entity file from template
   */
  public async createLocationFile(location: Location, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'location.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{LOCATION_NAME\}\}/g, location.name)
        .replace(/\{\{LOCATION_TYPE\}\}/g, location.type)
        .replace(/\{\{CLIMATE\}\}/g, location.climate)
        .replace(/\{\{LOCATION_SIZE\}\}/g, location.size)
        .replace(/\{\{LOCATION_DESCRIPTION\}\}/g, location.description)
        .replace(/\{\{TERRAIN_FEATURES\}\}/g, location.terrain_features.join(', '))
        .replace(/\{\{LANDMARKS\}\}/g, location.landmarks.join(', '))
        .replace(/\{\{NATURAL_RESOURCES\}\}/g, location.natural_resources.join(', '))
        .replace(/\{\{ATMOSPHERE_FEELING\}\}/g, location.atmosphere_feeling)
        .replace(/\{\{SOUNDS\}\}/g, location.sounds.join(', '))
        .replace(/\{\{SMELLS\}\}/g, location.smells.join(', '))
        .replace(/\{\{LIGHTING\}\}/g, location.lighting)
        .replace(/\{\{PRIMARY_RESIDENTS\}\}/g, location.primary_residents.join(', '))
        .replace(/\{\{VISITORS\}\}/g, location.visitors.join(', '))
        .replace(/\{\{CREATURES\}\}/g, location.creatures.join(', '))
        .replace(/\{\{HISTORICAL_EVENTS\}\}/g, location.historical_events.join(', '))
        .replace(/\{\{CULTURAL_SIGNIFICANCE\}\}/g, location.cultural_significance)
        .replace(/\{\{MYTHS_LEGENDS\}\}/g, location.myths_legends.join(', '))
        .replace(/\{\{FIRST_STORY\}\}/g, location.first_story)
        .replace(/\{\{RECENT_STORY\}\}/g, location.recent_story)
        .replace(/\{\{STORY_COUNT\}\}/g, location.story_count.toString())
        .replace(/\{\{NEARBY_LOCATIONS\}\}/g, location.nearby_locations.join(', '))
        .replace(/\{\{ACCESS_ROUTES\}\}/g, location.access_routes.join(', '))
        .replace(/\{\{TRANSPORTATION\}\}/g, location.transportation.join(', '))
        .replace(/\{\{MAGICAL_PROPERTIES\}\}/g, location.magical_properties.join(', '))
        .replace(/\{\{TECHNOLOGICAL_FEATURES\}\}/g, location.technological_features.join(', '))
        .replace(/\{\{UNIQUE_ASPECTS\}\}/g, location.unique_aspects.join(', '))
        .replace(/\{\{ADDITIONAL_NOTES\}\}/g, location.additional_notes)
        .replace(/\{\{CREATED_AT\}\}/g, location.metadata.created_at)
        .replace(/\{\{LAST_MODIFIED\}\}/g, location.metadata.last_modified)
        .replace(/\{\{VERSION\}\}/g, location.metadata.version.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateEntityFilename(location.name, 'location');
      const filePath = path.join(this.entitiesPath, 'locations', finalFilename);

      // Ensure directory exists
      await this.ensureDirectory(path.dirname(filePath));

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create location file', error);
      throw error;
    }
  }

  /**
   * Create a new item entity file from template
   */
  public async createItemFile(item: Item, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'item.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{ITEM_NAME\}\}/g, item.name)
        .replace(/\{\{ITEM_TYPE\}\}/g, item.type)
        .replace(/\{\{ITEM_RARITY\}\}/g, item.rarity)
        .replace(/\{\{ITEM_VALUE\}\}/g, item.value)
        .replace(/\{\{ITEM_DESCRIPTION\}\}/g, item.description)
        .replace(/\{\{ITEM_SIZE\}\}/g, item.size)
        .replace(/\{\{ITEM_WEIGHT\}\}/g, item.weight)
        .replace(/\{\{ITEM_MATERIAL\}\}/g, item.material)
        .replace(/\{\{ITEM_COLOR\}\}/g, item.color)
        .replace(/\{\{ITEM_SHAPE\}\}/g, item.shape)
        .replace(/\{\{PRIMARY_USE\}\}/g, item.primary_use)
        .replace(/\{\{SECONDARY_USES\}\}/g, item.secondary_uses.join(', '))
        .replace(/\{\{HOW_IT_WORKS\}\}/g, item.how_it_works)
        .replace(/\{\{MAGICAL_PROPERTIES\}\}/g, item.magical_properties.join(', '))
        .replace(/\{\{ENCHANTMENTS\}\}/g, item.enchantments.join(', '))
        .replace(/\{\{ITEM_POWERS\}\}/g, item.powers.join(', '))
        .replace(/\{\{LIMITATIONS\}\}/g, item.limitations.join(', '))
        .replace(/\{\{CREATOR\}\}/g, item.creator)
        .replace(/\{\{CREATION_DATE\}\}/g, item.creation_date)
        .replace(/\{\{ORIGINAL_PURPOSE\}\}/g, item.original_purpose)
        .replace(/\{\{PREVIOUS_OWNERS\}\}/g, item.previous_owners.join(', '))
        .replace(/\{\{CURRENT_OWNER\}\}/g, item.current_owner)
        .replace(/\{\{CURRENT_LOCATION\}\}/g, item.current_location)
        .replace(/\{\{ITEM_CONDITION\}\}/g, item.condition)
        .replace(/\{\{AVAILABILITY\}\}/g, item.availability)
        .replace(/\{\{FIRST_STORY\}\}/g, item.first_story)
        .replace(/\{\{RECENT_STORY\}\}/g, item.recent_story)
        .replace(/\{\{STORY_COUNT\}\}/g, item.story_count.toString())
        .replace(/\{\{ASSOCIATED_CHARACTERS\}\}/g, item.associated_characters.join(', '))
        .replace(/\{\{ASSOCIATED_LOCATIONS\}\}/g, item.associated_locations.join(', '))
        .replace(/\{\{RELATED_ITEMS\}\}/g, item.related_items.join(', '))
        .replace(/\{\{SYMBOLIC_MEANING\}\}/g, item.symbolic_meaning)
        .replace(/\{\{CULTURAL_IMPORTANCE\}\}/g, item.cultural_importance)
        .replace(/\{\{TRADITIONS\}\}/g, item.traditions.join(', '))
        .replace(/\{\{ADDITIONAL_NOTES\}\}/g, item.additional_notes)
        .replace(/\{\{CREATED_AT\}\}/g, item.metadata.created_at)
        .replace(/\{\{LAST_MODIFIED\}\}/g, item.metadata.last_modified)
        .replace(/\{\{VERSION\}\}/g, item.metadata.version.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateEntityFilename(item.name, 'item');
      const filePath = path.join(this.entitiesPath, 'items', finalFilename);

      // Ensure directory exists
      await this.ensureDirectory(path.dirname(filePath));

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create item file', error);
      throw error;
    }
  }

  /**
   * Generate entity filename with proper naming conventions
   */
  private generateEntityFilename(name: string, type: 'character' | 'location' | 'item'): string {
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedName}.md`;
  }

  /**
   * Validate entity file structure and required fields
   */
  public async validateEntityFile(filePath: string, entityType: 'character' | 'location' | 'item'): Promise<boolean> {
    try {
      if (!await fs.pathExists(filePath)) {
        return false;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      
      // Check for required markdown structure
      if (!content.includes('#') || !content.includes('##')) {
        return false;
      }

      // Check for required sections based on entity type
      const requiredSections = this.getRequiredSections(entityType);
      for (const section of requiredSections) {
        if (!content.includes(section)) {
          return false;
        }
      }

      // Check for metadata section
      if (!content.includes('*Created:') || !content.includes('*Last Modified:') || !content.includes('*Version:')) {
        return false;
      }

      return true;
    } catch (error) {
      errorHandler.logError(`Failed to validate entity file: ${filePath}`, error);
      return false;
    }
  }

  /**
   * Get required sections for entity type
   */
  private getRequiredSections(entityType: 'character' | 'location' | 'item'): string[] {
    const commonSections = ['## Basic Information', '## Description', '## Story Appearances'];
    
    switch (entityType) {
      case 'character':
        return [...commonSections, '## Personality', '## Relationships', '## Physical Description', '## Abilities & Skills', '## Backstory'];
      case 'location':
        return [...commonSections, '## Physical Features', '## Atmosphere & Mood', '## Inhabitants', '## History & Significance', '## Connections', '## Special Properties'];
      case 'item':
        return [...commonSections, '## Physical Properties', '## Function & Purpose', '## Special Properties', '## History & Origin', '## Current Status', '## Relationships', '## Cultural Significance'];
      default:
        return commonSections;
    }
  }

  /**
   * Read and parse entity file
   */
  public async readEntityFile(filePath: string): Promise<EntityFile | null> {
    try {
      if (!await fs.pathExists(filePath)) {
        return null;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const fileName = path.basename(filePath, '.md');
      const entityType = this.determineEntityType(filePath);
      
      // Extract metadata from content
      const metadata = this.extractMetadataFromContent(content);

      return {
        path: filePath,
        name: fileName,
        type: entityType,
        content,
        metadata
      };
    } catch (error) {
      errorHandler.logError(`Failed to read entity file: ${filePath}`, error);
      return null;
    }
  }

  /**
   * Determine entity type from file path
   */
  private determineEntityType(filePath: string): 'character' | 'location' | 'item' {
    if (filePath.includes('/characters/')) return 'character';
    if (filePath.includes('/locations/')) return 'location';
    if (filePath.includes('/items/')) return 'item';
    throw new Error('Unable to determine entity type from file path');
  }

  /**
   * Extract metadata from entity file content
   */
  private extractMetadataFromContent(content: string): { created_at: string; last_modified: string; version: number } {
    const createdMatch = content.match(/\*Created: ([^*]+)\*/);
    const modifiedMatch = content.match(/\*Last Modified: ([^*]+)\*/);
    const versionMatch = content.match(/\*Version: (\d+)\*/);

    return {
      created_at: createdMatch?.[1]?.trim() || new Date().toISOString(),
      last_modified: modifiedMatch?.[1]?.trim() || new Date().toISOString(),
      version: versionMatch?.[1] ? parseInt(versionMatch[1]) : 1
    };
  }

  /**
   * Update entity file with new data
   */
  public async updateEntityFile(filePath: string, updates: Record<string, any>, entityType: 'character' | 'location' | 'item'): Promise<boolean> {
    try {
      if (!await fs.pathExists(filePath)) {
        return false;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      let updatedContent = content;

      // Update metadata
      const now = new Date().toISOString();
      updatedContent = updatedContent.replace(/\*Last Modified: [^*]+\*/g, `*Last Modified: ${now}*`);
      
      // Increment version
      const versionMatch = content.match(/\*Version: (\d+)\*/);
      const currentVersion = versionMatch && versionMatch[1] ? parseInt(versionMatch[1]) : 1;
      const newVersion = currentVersion + 1;
      updatedContent = updatedContent.replace(/\*Version: \d+\*/g, `*Version: ${newVersion}*`);

      // Update entity-specific fields
      for (const [field, value] of Object.entries(updates)) {
        const fieldKey = this.getFieldKeyForUpdate(field, entityType);
        if (fieldKey) {
          const regex = new RegExp(`{{${fieldKey}}}`, 'g');
          if (Array.isArray(value)) {
            updatedContent = updatedContent.replace(regex, value.join(', '));
          } else {
            updatedContent = updatedContent.replace(regex, String(value));
          }
        }
      }

      await fs.writeFile(filePath, updatedContent, 'utf-8');
      return true;
    } catch (error) {
      errorHandler.logError(`Failed to update entity file: ${filePath}`, error);
      return false;
    }
  }

  /**
   * Delete entity file
   */
  public async deleteEntityFile(filePath: string): Promise<boolean> {
    try {
      if (!await fs.pathExists(filePath)) {
        return false;
      }

      await fs.remove(filePath);
      return true;
    } catch (error) {
      errorHandler.logError(`Failed to delete entity file: ${filePath}`, error);
      return false;
    }
  }

  /**
   * Backup entity file
   */
  public async backupEntityFile(filePath: string): Promise<string | null> {
    try {
      if (!await fs.pathExists(filePath)) {
        return null;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${filePath}.backup.${timestamp}`;

      await fs.writeFile(backupPath, content, 'utf-8');
      return backupPath;
    } catch (error) {
      errorHandler.logError(`Failed to backup entity file: ${filePath}`, error);
      return null;
    }
  }

  /**
   * Get field key for update operations
   */
  private getFieldKeyForUpdate(field: string, entityType: 'character' | 'location' | 'item'): string | null {
    const fieldMap: Record<string, string> = {
      'name': `${entityType.toUpperCase()}_NAME`,
      'type': `${entityType.toUpperCase()}_TYPE`,
      'description': `${entityType.toUpperCase()}_DESCRIPTION`,
      'age': 'CHARACTER_AGE',
      'species': 'CHARACTER_SPECIES',
      'personality_traits': 'PERSONALITY_TRAITS',
      'motivations': 'MOTIVATIONS',
      'fears': 'FEARS',
      'physical_description': 'PHYSICAL_DESCRIPTION',
      'backstory': 'BACKSTORY',
      'climate': 'CLIMATE',
      'size': 'LOCATION_SIZE',
      'terrain_features': 'TERRAIN_FEATURES',
      'atmosphere_feeling': 'ATMOSPHERE_FEELING',
      'cultural_significance': 'CULTURAL_SIGNIFICANCE',
      'rarity': 'ITEM_RARITY',
      'value': 'ITEM_VALUE',
      'weight': 'ITEM_WEIGHT',
      'material': 'ITEM_MATERIAL',
      'primary_use': 'PRIMARY_USE',
      'magical_properties': 'MAGICAL_PROPERTIES'
    };
    
    return fieldMap[field] || null;
  }
}
