/**
 * Entity Management Agent for jester storytelling system
 * Handles creation, management, and validation of entity files
 */

import fs from 'fs-extra';
import * as path from 'path';
import { Character, Location, Item, EntityTemplate, EntityFile, CommandResult } from '../types/index.js';
import { errorHandler } from '../utils/errorHandler.js';
import { FileUtils } from '../utils/fileUtils.js';

export interface EntityAgentOptions {
  entityType?: 'character' | 'location' | 'item';
  entityName?: string;
  templateData?: Record<string, any>;
  validateOnly?: boolean;
}

export class EntityAgent {
  private fileUtils: FileUtils;
  private entitiesPath: string;
  private templatesPath: string;

  constructor() {
    this.fileUtils = new FileUtils();
    this.entitiesPath = path.join(process.cwd(), 'entities');
    this.templatesPath = path.join(process.cwd(), '.jester', 'templates');
  }

  /**
   * Create a new entity file from template
   */
  public async createEntity(options: EntityAgentOptions): Promise<CommandResult> {
    try {
      if (!options.entityType || !options.entityName) {
        return {
          success: false,
          message: 'Entity type and name are required',
          error: 'Missing required parameters'
        };
      }

      // Validate entity type
      if (!['character', 'location', 'item'].includes(options.entityType)) {
        return {
          success: false,
          message: 'Invalid entity type. Must be character, location, or item',
          error: 'Invalid entity type'
        };
      }

      // Load template
      const template = await this.loadEntityTemplate(options.entityType);
      if (!template) {
        return {
          success: false,
          message: `Template not found for entity type: ${options.entityType}`,
          error: 'Template not found'
        };
      }

      // Generate entity data
      const entityData = this.generateEntityData(options.entityType, options.entityName, options.templateData);
      
      // Process template
      const content = this.processTemplate(template, entityData);

      // Create entity file
      const filename = this.generateEntityFilename(options.entityName, options.entityType);
      const entityPath = path.join(this.entitiesPath, `${options.entityType}s`, filename);
      
      // Ensure directory exists
      await fs.ensureDir(path.dirname(entityPath));
      
      // Write entity file
      await fs.writeFile(entityPath, content, 'utf-8');

      return {
        success: true,
        message: `✅ Entity created successfully: ${entityPath}`,
        data: {
          path: entityPath,
          name: options.entityName,
          type: options.entityType
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'createEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * List all entities of a specific type
   */
  public async listEntities(entityType: 'character' | 'location' | 'item'): Promise<CommandResult> {
    try {
      const entityDir = path.join(this.entitiesPath, `${entityType}s`);
      
      if (!await fs.pathExists(entityDir)) {
        return {
          success: true,
          message: `No ${entityType}s found`,
          data: []
        };
      }

      const files = await fs.readdir(entityDir);
      const entityFiles = files.filter(file => file.endsWith('.md'));

      const entities = await Promise.all(
        entityFiles.map(async (file) => {
          const filePath = path.join(entityDir, file);
          const stats = await fs.stat(filePath);
          return {
            name: file.replace('.md', ''),
            path: filePath,
            created: stats.birthtime,
            modified: stats.mtime
          };
        })
      );

      return {
        success: true,
        message: `Found ${entities.length} ${entityType}s`,
        data: entities
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'listEntities', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Get entity information
   */
  public async getEntity(entityType: 'character' | 'location' | 'item', entityName: string): Promise<CommandResult> {
    try {
      const filename = this.generateEntityFilename(entityName, entityType);
      const entityPath = path.join(this.entitiesPath, `${entityType}s`, filename);

      if (!await fs.pathExists(entityPath)) {
        return {
          success: false,
          message: `Entity not found: ${entityName}`,
          error: 'Entity not found'
        };
      }

      const content = await fs.readFile(entityPath, 'utf-8');
      
      return {
        success: true,
        message: `Entity loaded: ${entityName}`,
        data: {
          name: entityName,
          type: entityType,
          path: entityPath,
          content: content
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'getEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Validate entity file
   */
  public async validateEntity(entityType: 'character' | 'location' | 'item', entityName: string): Promise<CommandResult> {
    try {
      const result = await this.getEntity(entityType, entityName);
      if (!result.success) {
        return result;
      }

      const template = await this.loadEntityTemplate(entityType);
      if (!template) {
        return {
          success: false,
          message: 'Template not found for validation',
          error: 'Template not found'
        };
      }

      // Basic validation - check if entity has name and description
      const content = result.data?.content || '';
      const hasName = content.includes(`# ${entityName}`);
      const hasDescription = content.includes('## Description');
      
      if (!hasName || !hasDescription) {
        return {
          success: false,
          message: `Entity validation failed: missing basic content`,
          error: 'Validation failed'
        };
      }

      return {
        success: true,
        message: `Entity validation passed: ${entityName}`,
        data: {
          name: entityName,
          type: entityType,
          valid: true
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'validateEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Load entity template
   */
  private async loadEntityTemplate(entityType: 'character' | 'location' | 'item'): Promise<string | null> {
    try {
      const templatePath = path.join(this.templatesPath, `${entityType}.md`);
      return await fs.readFile(templatePath, 'utf-8');
    } catch (error) {
      errorHandler.logError('Failed to load entity template', error as Error);
      return null;
    }
  }

  /**
   * Generate entity data from template
   */
  private generateEntityData(entityType: 'character' | 'location' | 'item', name: string, templateData?: Record<string, any>): Record<string, any> {
    const now = new Date().toISOString();
    const baseData = {
      [`${entityType.toUpperCase()}_NAME`]: name,
      CREATED_AT: now,
      LAST_MODIFIED: now,
      VERSION: 1
    };

    // Add type-specific defaults
    switch (entityType) {
      case 'character':
        return {
          ...baseData,
          CHARACTER_TYPE: templateData?.type || 'Protagonist',
          CHARACTER_AGE: templateData?.age || 'Unknown',
          CHARACTER_SPECIES: templateData?.species || 'Human',
          CHARACTER_DESCRIPTION: templateData?.description || 'A mysterious character',
          PERSONALITY_TRAITS: templateData?.personality_traits || ['Brave', 'Curious'],
          MOTIVATIONS: templateData?.motivations || ['To help others'],
          FEARS: templateData?.fears || ['The unknown'],
          FAMILY_RELATIONSHIPS: templateData?.family_relationships || [],
          FRIEND_RELATIONSHIPS: templateData?.friend_relationships || [],
          ENEMY_RELATIONSHIPS: templateData?.enemy_relationships || [],
          FIRST_STORY: templateData?.first_story || 'Not yet appeared',
          RECENT_STORY: templateData?.recent_story || 'Not yet appeared',
          STORY_COUNT: templateData?.story_count || 0,
          PHYSICAL_DESCRIPTION: templateData?.physical_description || 'To be described',
          CLOTHING_STYLE: templateData?.clothing_style || 'Casual',
          DISTINCTIVE_FEATURES: templateData?.distinctive_features || [],
          SPECIAL_POWERS: templateData?.special_powers || [],
          SKILLS: templateData?.skills || [],
          WEAKNESSES: templateData?.weaknesses || [],
          BACKSTORY: templateData?.backstory || 'To be developed',
          ADDITIONAL_NOTES: templateData?.additional_notes || ''
        };

      case 'location':
        return {
          ...baseData,
          LOCATION_TYPE: templateData?.type || 'Mystical Place',
          CLIMATE: templateData?.climate || 'Temperate',
          LOCATION_SIZE: templateData?.size || 'Medium',
          LOCATION_DESCRIPTION: templateData?.description || 'A mysterious location',
          TERRAIN_FEATURES: templateData?.terrain_features || [],
          LANDMARKS: templateData?.landmarks || [],
          NATURAL_RESOURCES: templateData?.natural_resources || [],
          ATMOSPHERE_FEELING: templateData?.atmosphere_feeling || 'Mysterious',
          SOUNDS: templateData?.sounds || [],
          SMELLS: templateData?.smells || [],
          LIGHTING: templateData?.lighting || 'Natural',
          PRIMARY_RESIDENTS: templateData?.primary_residents || [],
          VISITORS: templateData?.visitors || [],
          CREATURES: templateData?.creatures || [],
          HISTORICAL_EVENTS: templateData?.historical_events || [],
          CULTURAL_SIGNIFICANCE: templateData?.cultural_significance || 'Unknown',
          MYTHS_LEGENDS: templateData?.myths_legends || [],
          FIRST_STORY: templateData?.first_story || 'Not yet appeared',
          RECENT_STORY: templateData?.recent_story || 'Not yet appeared',
          STORY_COUNT: templateData?.story_count || 0,
          NEARBY_LOCATIONS: templateData?.nearby_locations || [],
          ACCESS_ROUTES: templateData?.access_routes || [],
          TRANSPORTATION: templateData?.transportation || 'Walking',
          MAGICAL_PROPERTIES: templateData?.magical_properties || [],
          TECHNOLOGICAL_FEATURES: templateData?.technological_features || [],
          UNIQUE_ASPECTS: templateData?.unique_aspects || [],
          ADDITIONAL_NOTES: templateData?.additional_notes || ''
        };

      case 'item':
        return {
          ...baseData,
          ITEM_TYPE: templateData?.type || 'Mystical Object',
          ITEM_RARITY: templateData?.rarity || 'Common',
          ITEM_VALUE: templateData?.value || 'Unknown',
          ITEM_DESCRIPTION: templateData?.description || 'A mysterious item',
          ITEM_SIZE: templateData?.size || 'Small',
          ITEM_WEIGHT: templateData?.weight || 'Light',
          ITEM_MATERIAL: templateData?.material || 'Unknown',
          ITEM_COLOR: templateData?.color || 'Mysterious',
          ITEM_SHAPE: templateData?.shape || 'Irregular',
          PRIMARY_USE: templateData?.primary_use || 'Unknown',
          SECONDARY_USES: templateData?.secondary_uses || [],
          HOW_IT_WORKS: templateData?.how_it_works || 'Unknown',
          MAGICAL_PROPERTIES: templateData?.magical_properties || [],
          ENCHANTMENTS: templateData?.enchantments || [],
          POWERS: templateData?.powers || [],
          LIMITATIONS: templateData?.limitations || [],
          CREATOR: templateData?.creator || 'Unknown',
          CREATION_DATE: templateData?.creation_date || 'Unknown',
          ORIGINAL_PURPOSE: templateData?.original_purpose || 'Unknown',
          PREVIOUS_OWNERS: templateData?.previous_owners || [],
          CURRENT_OWNER: templateData?.current_owner || 'Unknown',
          CURRENT_LOCATION: templateData?.current_location || 'Unknown',
          CONDITION: templateData?.condition || 'Good',
          AVAILABILITY: templateData?.availability || 'Rare',
          FIRST_STORY: templateData?.first_story || 'Not yet appeared',
          RECENT_STORY: templateData?.recent_story || 'Not yet appeared',
          STORY_COUNT: templateData?.story_count || 0,
          ASSOCIATED_CHARACTERS: templateData?.associated_characters || [],
          ASSOCIATED_LOCATIONS: templateData?.associated_locations || [],
          RELATED_ITEMS: templateData?.related_items || [],
          SYMBOLIC_MEANING: templateData?.symbolic_meaning || 'Unknown',
          CULTURAL_IMPORTANCE: templateData?.cultural_importance || 'Unknown',
          TRADITIONS: templateData?.traditions || [],
          ADDITIONAL_NOTES: templateData?.additional_notes || ''
        };

      default:
        return baseData;
    }
  }

  /**
   * Process template with entity data
   */
  private processTemplate(template: string, data: Record<string, any>): string {
    let content = template;
    
    // Replace all template variables
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      if (Array.isArray(value)) {
        content = content.replace(regex, value.join(', '));
      } else {
        content = content.replace(regex, String(value));
      }
    }

    return content;
  }

  /**
   * Generate entity filename
   */
  private generateEntityFilename(name: string, entityType: 'character' | 'location' | 'item'): string {
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedName}.md`;
  }

  /**
   * Get required fields for entity type
   */
  private getRequiredFields(entityType: 'character' | 'location' | 'item'): string[] {
    const commonFields = ['name', 'description', 'created_at', 'last_modified', 'version'];
    
    switch (entityType) {
      case 'character':
        return [...commonFields, 'type', 'age', 'species'];
      case 'location':
        return [...commonFields, 'type', 'climate', 'size'];
      case 'item':
        return [...commonFields, 'type', 'rarity', 'value'];
      default:
        return commonFields;
    }
  }
}
