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

      // Check for duplicate entity name
      const duplicateCheck = await this.checkDuplicateEntity(options.entityType, options.entityName);
      if (!duplicateCheck.success) {
        return duplicateCheck;
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

      // Validate template structure
      const templateValidation = this.validateTemplate(template, options.entityType);
      if (!templateValidation.valid) {
        return {
          success: false,
          message: `Template validation failed: ${templateValidation.errors.join(', ')}`,
          error: 'Template validation failed'
        };
      }

      // Generate entity data with enhanced validation
      const entityData = this.generateEntityData(options.entityType, options.entityName, options.templateData);
      
      // Validate entity data before processing
      const dataValidation = this.validateEntityData(entityData, options.entityType);
      if (!dataValidation.valid) {
        return {
          success: false,
          message: `Entity data validation failed: ${dataValidation.errors.join(', ')}`,
          error: 'Entity data validation failed'
        };
      }

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
          type: options.entityType,
          filename: filename
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
  public async listEntities(entityType: 'character' | 'location' | 'item', options?: {
    sortBy?: 'name' | 'created' | 'modified';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
  }): Promise<CommandResult> {
    try {
      const entityDir = path.join(this.entitiesPath, `${entityType}s`);
      
      if (!await fs.pathExists(entityDir)) {
        return {
          success: true,
          message: `No ${entityType}s found`,
          data: {
            entities: [],
            total: 0,
            statistics: this.getEmptyStatistics()
          }
        };
      }

      const files = await fs.readdir(entityDir);
      const entityFiles = files.filter(file => file.endsWith('.md'));

      const entities = await Promise.all(
        entityFiles.map(async (file) => {
          const filePath = path.join(entityDir, file);
          const stats = await fs.stat(filePath);
          const entityFile = await this.fileUtils.readEntityFile(filePath);
          
          return {
            name: file.replace('.md', ''),
            path: filePath,
            created: stats.birthtime,
            modified: stats.mtime,
            size: stats.size,
            metadata: entityFile?.metadata || {
              created_at: stats.birthtime.toISOString(),
              last_modified: stats.mtime.toISOString(),
              version: 1
            }
          };
        })
      );

      // Sort entities
      const sortBy = options?.sortBy || 'name';
      const sortOrder = options?.sortOrder || 'asc';
      
      entities.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'created':
            comparison = a.created.getTime() - b.created.getTime();
            break;
          case 'modified':
            comparison = a.modified.getTime() - b.modified.getTime();
            break;
        }
        return sortOrder === 'desc' ? -comparison : comparison;
      });

      // Apply pagination
      const offset = options?.offset || 0;
      const limit = options?.limit || entities.length;
      const paginatedEntities = entities.slice(offset, offset + limit);

      // Generate statistics
      const statistics = this.generateEntityStatistics(entities, entityType);

      return {
        success: true,
        message: `Found ${entities.length} ${entityType}s`,
        data: {
          entities: paginatedEntities,
          total: entities.length,
          pagination: {
            offset,
            limit,
            hasMore: offset + limit < entities.length
          },
          statistics
        }
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

      const content = result.data?.content || '';
      const validationResult = await this.performComprehensiveValidation(content, entityType, entityName);

      return {
        success: validationResult.valid,
        message: validationResult.valid 
          ? `✅ Entity validation passed: ${entityName}` 
          : `❌ Entity validation failed: ${entityName}`,
        data: {
          name: entityName,
          type: entityType,
          valid: validationResult.valid,
          errors: validationResult.errors,
          warnings: validationResult.warnings,
          suggestions: validationResult.suggestions
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
   * Validate multiple entities (batch validation)
   */
  public async validateEntities(entityType: 'character' | 'location' | 'item'): Promise<CommandResult> {
    try {
      const listResult = await this.listEntities(entityType);
      if (!listResult.success) {
        return listResult;
      }

      const entities = listResult.data?.entities || [];
      const validationResults = await Promise.all(
        entities.map(async (entity: any) => {
          const result = await this.validateEntity(entityType, entity.name);
          return {
            name: entity.name,
            valid: result.success,
            errors: result.data?.errors || [],
            warnings: result.data?.warnings || [],
            suggestions: result.data?.suggestions || []
          };
        })
      );

      const validCount = validationResults.filter(r => r.valid).length;
      const invalidCount = validationResults.filter(r => !r.valid).length;

      return {
        success: true,
        message: `Batch validation completed: ${validCount} valid, ${invalidCount} invalid`,
        data: {
          total: validationResults.length,
          valid: validCount,
          invalid: invalidCount,
          results: validationResults
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'validateEntities', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Edit an existing entity
   */
  public async editEntity(entityType: 'character' | 'location' | 'item', entityName: string, updates: Record<string, any>): Promise<CommandResult> {
    try {
      // Get current entity
      const currentEntity = await this.getEntity(entityType, entityName);
      if (!currentEntity.success) {
        return currentEntity;
      }

      // Validate updates
      const updateValidation = this.validateEntityUpdates(updates, entityType);
      if (!updateValidation.valid) {
        return {
          success: false,
          message: `Update validation failed: ${updateValidation.errors.join(', ')}`,
          error: 'Update validation failed'
        };
      }

      // Update entity file
      const result = await this.fileUtils.updateEntityFile(
        currentEntity.data.path,
        updates,
        entityType
      );

      if (!result) {
        return {
          success: false,
          message: 'Failed to update entity file',
          error: 'File update failed'
        };
      }

      return {
        success: true,
        message: `✅ Entity updated successfully: ${entityName}`,
        data: {
          name: entityName,
          type: entityType,
          path: currentEntity.data.path,
          updates: updates
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'editEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Delete an entity
   */
  public async deleteEntity(entityType: 'character' | 'location' | 'item', entityName: string, options?: { createBackup?: boolean }): Promise<CommandResult> {
    try {
      // Get current entity
      const currentEntity = await this.getEntity(entityType, entityName);
      if (!currentEntity.success) {
        return currentEntity;
      }

      // Create backup if requested
      if (options?.createBackup !== false) {
        const backupResult = await this.backupEntity(entityType, entityName);
        if (!backupResult.success) {
          return {
            success: false,
            message: 'Failed to create backup before deletion',
            error: 'Backup creation failed'
          };
        }
      }

      // Delete entity file
      const result = await this.fileUtils.deleteEntityFile(currentEntity.data.path);
      if (!result) {
        return {
          success: false,
          message: 'Failed to delete entity file',
          error: 'File deletion failed'
        };
      }

      return {
        success: true,
        message: `✅ Entity deleted successfully: ${entityName}`,
        data: {
          name: entityName,
          type: entityType,
          path: currentEntity.data.path
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'deleteEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Search entities by query
   */
  public async searchEntities(query: string, entityType?: 'character' | 'location' | 'item'): Promise<CommandResult> {
    try {
      const searchResults: any[] = [];
      const typesToSearch = entityType ? [entityType] : ['character', 'location', 'item'];

      for (const type of typesToSearch) {
        const listResult = await this.listEntities(type as 'character' | 'location' | 'item');
        if (listResult.success && listResult.data && listResult.data.entities) {
          for (const entity of listResult.data.entities) {
            const entityContent = await this.getEntity(type as 'character' | 'location' | 'item', entity.name);
            if (entityContent.success && entityContent.data?.content) {
              const content = entityContent.data.content.toLowerCase();
              const searchQuery = query.toLowerCase();
              
              if (content.includes(searchQuery) || entity.name.toLowerCase().includes(searchQuery)) {
                // Extract the actual entity name from the content (first heading)
                const titleMatch = entityContent.data.content.match(/^#\s+(.+)$/m);
                const actualName = titleMatch ? titleMatch[1].trim() : entity.name;
                
                searchResults.push({
                  name: actualName,
                  type: type,
                  path: entity.path,
                  created: entity.created,
                  modified: entity.modified,
                  relevanceScore: this.calculateRelevanceScore(query, actualName, entityContent.data.content)
                });
              }
            }
          }
        }
      }

      // Sort by relevance score
      searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

      return {
        success: true,
        message: `Found ${searchResults.length} entities matching "${query}"`,
        data: searchResults
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'searchEntities', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Backup an entity
   */
  public async backupEntity(entityType: 'character' | 'location' | 'item', entityName: string): Promise<CommandResult> {
    try {
      // Get current entity
      const currentEntity = await this.getEntity(entityType, entityName);
      if (!currentEntity.success) {
        return currentEntity;
      }

      // Create backup
      const backupPath = await this.fileUtils.backupEntityFile(currentEntity.data.path);
      if (!backupPath) {
        return {
          success: false,
          message: 'Failed to create backup',
          error: 'Backup creation failed'
        };
      }

      return {
        success: true,
        message: `✅ Entity backup created: ${backupPath}`,
        data: {
          name: entityName,
          type: entityType,
          originalPath: currentEntity.data.path,
          backupPath: backupPath
        }
      };

    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'backupEntity', error),
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

  /**
   * Check for duplicate entity name
   */
  private async checkDuplicateEntity(entityType: 'character' | 'location' | 'item', entityName: string): Promise<CommandResult> {
    try {
      const entityDir = path.join(this.entitiesPath, `${entityType}s`);
      
      if (!await fs.pathExists(entityDir)) {
        return { success: true, message: 'No existing entities to check against' };
      }

      const files = await fs.readdir(entityDir);
      const entityFiles = files.filter(file => file.endsWith('.md'));
      
      const sanitizedName = entityName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const expectedFilename = `${sanitizedName}.md`;
      
      if (entityFiles.includes(expectedFilename)) {
        return {
          success: false,
          message: `Entity with name '${entityName}' already exists`,
          error: 'Duplicate entity name'
        };
      }

      return { success: true, message: 'No duplicate found' };
    } catch (error) {
      return {
        success: false,
        message: errorHandler.handleAgentError('entity', 'checkDuplicateEntity', error),
        error: errorHandler.formatError(error as Error)
      };
    }
  }

  /**
   * Validate template structure
   */
  private validateTemplate(template: string, entityType: 'character' | 'location' | 'item'): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check for required template variables
    const requiredVariables = this.getRequiredTemplateVariables(entityType);
    for (const variable of requiredVariables) {
      if (!template.includes(`{{${variable}}}`)) {
        errors.push(`Missing required template variable: ${variable}`);
      }
    }

    // Check for basic markdown structure
    if (!template.includes('#') || !template.includes('##')) {
      errors.push('Template must contain proper markdown structure with headers');
    }

    // Check for metadata section
    if (!template.includes('*Created:') || !template.includes('*Last Modified:') || !template.includes('*Version:')) {
      errors.push('Template must contain metadata section');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get required template variables for entity type
   */
  private getRequiredTemplateVariables(entityType: 'character' | 'location' | 'item'): string[] {
    const commonVariables = ['CREATED_AT', 'LAST_MODIFIED', 'VERSION'];
    
    switch (entityType) {
      case 'character':
        return [...commonVariables, 'CHARACTER_NAME', 'CHARACTER_TYPE', 'CHARACTER_AGE', 'CHARACTER_SPECIES', 'CHARACTER_DESCRIPTION'];
      case 'location':
        return [...commonVariables, 'LOCATION_NAME', 'LOCATION_TYPE', 'CLIMATE', 'LOCATION_SIZE', 'LOCATION_DESCRIPTION'];
      case 'item':
        return [...commonVariables, 'ITEM_NAME', 'ITEM_TYPE', 'ITEM_RARITY', 'ITEM_VALUE', 'ITEM_DESCRIPTION'];
      default:
        return commonVariables;
    }
  }

  /**
   * Validate entity data before processing
   */
  private validateEntityData(entityData: Record<string, any>, entityType: 'character' | 'location' | 'item'): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check for required fields
    const requiredFields = this.getRequiredFields(entityType);
    for (const field of requiredFields) {
      const fieldKey = this.getFieldKey(field, entityType);
      if (!entityData[fieldKey] || entityData[fieldKey] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Type-specific validation
    switch (entityType) {
      case 'character':
        if (entityData.CHARACTER_AGE && isNaN(parseInt(entityData.CHARACTER_AGE)) && entityData.CHARACTER_AGE !== 'Unknown') {
          errors.push('Character age must be a number or "Unknown"');
        }
        break;
      case 'location':
        if (entityData.LOCATION_SIZE && !['Small', 'Medium', 'Large', 'Unknown'].includes(entityData.LOCATION_SIZE)) {
          errors.push('Location size must be Small, Medium, Large, or Unknown');
        }
        break;
      case 'item':
        if (entityData.ITEM_RARITY && !['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unknown'].includes(entityData.ITEM_RARITY)) {
          errors.push('Item rarity must be Common, Uncommon, Rare, Epic, Legendary, or Unknown');
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get field key for template variable
   */
  private getFieldKey(field: string, entityType: 'character' | 'location' | 'item'): string {
    const fieldMap: Record<string, string> = {
      'name': `${entityType.toUpperCase()}_NAME`,
      'type': `${entityType.toUpperCase()}_TYPE`,
      'description': `${entityType.toUpperCase()}_DESCRIPTION`,
      'created_at': 'CREATED_AT',
      'last_modified': 'LAST_MODIFIED',
      'version': 'VERSION',
      'age': 'CHARACTER_AGE',
      'species': 'CHARACTER_SPECIES',
      'climate': 'CLIMATE',
      'size': 'LOCATION_SIZE',
      'rarity': 'ITEM_RARITY',
      'value': 'ITEM_VALUE'
    };
    
    return fieldMap[field] || field.toUpperCase();
  }

  /**
   * Validate entity updates
   */
  private validateEntityUpdates(updates: Record<string, any>, entityType: 'character' | 'location' | 'item'): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check for valid field names
    const validFields = this.getValidUpdateFields(entityType);
    for (const field of Object.keys(updates)) {
      if (!validFields.includes(field)) {
        errors.push(`Invalid field for ${entityType}: ${field}`);
      }
    }

    // Type-specific validation
    for (const [field, value] of Object.entries(updates)) {
      switch (field) {
        case 'age':
          if (value && isNaN(parseInt(value)) && value !== 'Unknown') {
            errors.push('Age must be a number or "Unknown"');
          }
          break;
        case 'size':
          if (value && !['Small', 'Medium', 'Large', 'Unknown'].includes(value)) {
            errors.push('Size must be Small, Medium, Large, or Unknown');
          }
          break;
        case 'rarity':
          if (value && !['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unknown'].includes(value)) {
            errors.push('Rarity must be Common, Uncommon, Rare, Epic, Legendary, or Unknown');
          }
          break;
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get valid update fields for entity type
   */
  private getValidUpdateFields(entityType: 'character' | 'location' | 'item'): string[] {
    const commonFields = ['name', 'description', 'type'];
    
    switch (entityType) {
      case 'character':
        return [...commonFields, 'age', 'species', 'personality_traits', 'motivations', 'fears', 'physical_description', 'backstory'];
      case 'location':
        return [...commonFields, 'climate', 'size', 'terrain_features', 'atmosphere_feeling', 'cultural_significance'];
      case 'item':
        return [...commonFields, 'rarity', 'value', 'size', 'weight', 'material', 'primary_use', 'magical_properties'];
      default:
        return commonFields;
    }
  }

  /**
   * Calculate relevance score for search results
   */
  private calculateRelevanceScore(query: string, entityName: string, content: string): number {
    const queryLower = query.toLowerCase();
    const nameLower = entityName.toLowerCase();
    const contentLower = content.toLowerCase();
    
    let score = 0;
    
    // Exact name match gets highest score
    if (nameLower === queryLower) {
      score += 100;
    } else if (nameLower.includes(queryLower)) {
      score += 50;
    }
    
    // Content matches
    const contentMatches = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
    score += contentMatches * 10;
    
    // Title matches (in markdown headers)
    const titleMatches = (contentLower.match(new RegExp(`#+\\s*[^\\n]*${queryLower}[^\\n]*`, 'g')) || []).length;
    score += titleMatches * 20;
    
    return score;
  }

  /**
   * Generate entity statistics
   */
  private generateEntityStatistics(entities: any[], entityType: 'character' | 'location' | 'item'): any {
    const totalCount = entities.length;
    const totalSize = entities.reduce((sum, entity) => sum + (entity.size || 0), 0);
    
    // Calculate date ranges
    const dates = entities.map(e => e.created).filter(Boolean);
    const earliestCreated = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : null;
    const latestCreated = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;
    
    // Calculate version statistics
    const versions = entities.map(e => e.metadata?.version || 1);
    const avgVersion = versions.length > 0 ? versions.reduce((sum, v) => sum + v, 0) / versions.length : 0;
    const maxVersion = versions.length > 0 ? Math.max(...versions) : 0;
    
    // Calculate recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentActivity = entities.filter(e => e.modified && e.modified > thirtyDaysAgo).length;
    
    return {
      totalCount,
      totalSize,
      averageSize: totalCount > 0 ? Math.round(totalSize / totalCount) : 0,
      dateRange: {
        earliest: earliestCreated?.toISOString(),
        latest: latestCreated?.toISOString()
      },
      versions: {
        average: Math.round(avgVersion * 100) / 100,
        maximum: maxVersion
      },
      recentActivity: {
        last30Days: recentActivity,
        percentage: totalCount > 0 ? Math.round((recentActivity / totalCount) * 100) : 0
      }
    };
  }

  /**
   * Get empty statistics for when no entities exist
   */
  private getEmptyStatistics(): any {
    return {
      totalCount: 0,
      totalSize: 0,
      averageSize: 0,
      dateRange: {
        earliest: null,
        latest: null
      },
      versions: {
        average: 0,
        maximum: 0
      },
      recentActivity: {
        last30Days: 0,
        percentage: 0
      }
    };
  }

  /**
   * Perform comprehensive validation of entity content
   */
  private async performComprehensiveValidation(content: string, entityType: 'character' | 'location' | 'item', entityName: string): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
    suggestions: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Basic structure validation
    this.validateBasicStructure(content, entityName, errors, warnings);

    // Required sections validation
    this.validateRequiredSections(content, entityType, errors, warnings);

    // Metadata validation
    this.validateMetadata(content, errors, warnings);

    // Content quality validation
    this.validateContentQuality(content, entityType, warnings, suggestions);

    // Wiki-link integrity validation
    await this.validateWikiLinks(content, entityType, entityName, errors, warnings, suggestions);

    // Type-specific validation
    this.validateTypeSpecificContent(content, entityType, errors, warnings, suggestions);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions
    };
  }

  /**
   * Validate basic markdown structure
   */
  private validateBasicStructure(content: string, entityName: string, errors: string[], warnings: string[]): void {
    // Check for main title
    if (!content.includes(`# ${entityName}`)) {
      errors.push(`Missing main title: Expected "# ${entityName}"`);
    }

    // Check for proper markdown structure
    if (!content.includes('##')) {
      errors.push('Missing section headers (##)');
    }

    // Check for minimum content length
    if (content.length < 100) {
      warnings.push('Content is very short, consider adding more details');
    }
  }

  /**
   * Validate required sections based on entity type
   */
  private validateRequiredSections(content: string, entityType: 'character' | 'location' | 'item', errors: string[], warnings: string[]): void {
    const requiredSections = this.getRequiredFields(entityType);
    
    for (const section of requiredSections) {
      // Map section names to their markdown equivalents
      const sectionMapping: Record<string, string> = {
        'name': 'Description', // The name is in the main heading
        'description': 'Description',
        'created_at': 'Created',
        'last_modified': 'Last Modified',
        'version': 'Version',
        'type': 'Type',
        'age': 'Age',
        'species': 'Species',
        'climate': 'Climate',
        'size': 'Size',
        'rarity': 'Rarity',
        'value': 'Value'
      };
      
      const markdownSection = sectionMapping[section] || section;
      
      // Check for metadata sections (Created, Last Modified, Version)
      if (['Created', 'Last Modified', 'Version'].includes(markdownSection)) {
        const metadataPattern = new RegExp(`\\*${markdownSection}:\\s*[^*]+\\*`, 'i');
        if (!metadataPattern.test(content)) {
          errors.push(`Missing required section: ${markdownSection}`);
        }
      } else {
        // Check for regular markdown sections
        const sectionPattern = new RegExp(`##\\s+${markdownSection}\\s*\\n`, 'i');
        if (!sectionPattern.test(content)) {
          errors.push(`Missing required section: ${markdownSection}`);
        }
      }
    }

    // Check for empty sections
    const sectionMatches = content.match(/##\s+([^\n]+)/g) || [];
    for (const sectionMatch of sectionMatches) {
      const sectionName = sectionMatch.replace('## ', '');
      const sectionContent = this.extractSectionContent(content, sectionName);
      if (sectionContent.trim().length === 0) {
        warnings.push(`Section "${sectionName}" appears to be empty`);
      }
    }
  }

  /**
   * Validate metadata section
   */
  private validateMetadata(content: string, errors: string[], warnings: string[]): void {
    const createdMatch = content.match(/\*Created: ([^*]+)\*/);
    const modifiedMatch = content.match(/\*Last Modified: ([^*]+)\*/);
    const versionMatch = content.match(/\*Version: (\d+)\*/);

    if (!createdMatch) {
      errors.push('Missing Created metadata');
    } else {
      const createdDate = new Date(createdMatch[1]?.trim() || '');
      if (isNaN(createdDate.getTime())) {
        errors.push('Invalid Created date format');
      }
    }

    if (!modifiedMatch) {
      errors.push('Missing Last Modified metadata');
    } else {
      const modifiedDate = new Date(modifiedMatch[1]?.trim() || '');
      if (isNaN(modifiedDate.getTime())) {
        errors.push('Invalid Last Modified date format');
      }
    }

    if (!versionMatch) {
      errors.push('Missing Version metadata');
    } else {
      const version = parseInt(versionMatch[1] || '0');
      if (isNaN(version) || version < 1) {
        errors.push('Invalid version number');
      }
    }
  }

  /**
   * Validate content quality
   */
  private validateContentQuality(content: string, entityType: 'character' | 'location' | 'item', warnings: string[], suggestions: string[]): void {
    // Check for placeholder text
    const placeholders = ['To be described', 'Unknown', 'TBD', 'TODO'];
    for (const placeholder of placeholders) {
      if (content.includes(placeholder)) {
        warnings.push(`Contains placeholder text: "${placeholder}"`);
      }
    }

    // Check for minimum description length
    const descriptionMatch = content.match(/## Description\s*\n([\s\S]*?)(?=##|$)/);
    if (descriptionMatch && descriptionMatch[1] && descriptionMatch[1].trim().length < 20) {
      warnings.push('Description is very short, consider adding more details');
    }

    // Check for empty lists
    const listMatches = content.match(/- \s*\n/g);
    if (listMatches && listMatches.length > 0) {
      warnings.push('Found empty list items');
    }
  }

  /**
   * Validate wiki-link integrity
   */
  private async validateWikiLinks(content: string, entityType: 'character' | 'location' | 'item', entityName: string, errors: string[], warnings: string[], suggestions: string[]): Promise<void> {
    // Extract wiki-links from content
    const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    const wikiLinks: string[] = [];
    let match;
    
    while ((match = wikiLinkRegex.exec(content)) !== null) {
      if (match[1]) {
        wikiLinks.push(match[1]);
      }
    }

    if (wikiLinks.length === 0) {
      suggestions.push('Consider adding wiki-links to connect with other entities');
      return;
    }

    // Check if linked entities exist
    for (const link of wikiLinks) {
      const linkType = this.guessEntityTypeFromName(link);
      if (linkType) {
        const entityExists = await this.checkEntityExists(linkType, link);
        if (!entityExists) {
          warnings.push(`Wiki-link "${link}" points to non-existent ${linkType}`);
        }
      }
    }
  }

  /**
   * Validate type-specific content
   */
  private validateTypeSpecificContent(content: string, entityType: 'character' | 'location' | 'item', errors: string[], warnings: string[], suggestions: string[]): void {
    switch (entityType) {
      case 'character':
        this.validateCharacterContent(content, errors, warnings, suggestions);
        break;
      case 'location':
        this.validateLocationContent(content, errors, warnings, suggestions);
        break;
      case 'item':
        this.validateItemContent(content, errors, warnings, suggestions);
        break;
    }
  }

  /**
   * Validate character-specific content
   */
  private validateCharacterContent(content: string, errors: string[], warnings: string[], suggestions: string[]): void {
    if (!content.includes('## Personality')) {
      warnings.push('Missing Personality section');
    }
    if (!content.includes('## Physical Description')) {
      warnings.push('Missing Physical Description section');
    }
    if (!content.includes('## Backstory')) {
      warnings.push('Missing Backstory section');
    }
  }

  /**
   * Validate location-specific content
   */
  private validateLocationContent(content: string, errors: string[], warnings: string[], suggestions: string[]): void {
    if (!content.includes('## Physical Features')) {
      warnings.push('Missing Physical Features section');
    }
    if (!content.includes('## Atmosphere & Mood')) {
      warnings.push('Missing Atmosphere & Mood section');
    }
    if (!content.includes('## History & Significance')) {
      warnings.push('Missing History & Significance section');
    }
  }

  /**
   * Validate item-specific content
   */
  private validateItemContent(content: string, errors: string[], warnings: string[], suggestions: string[]): void {
    if (!content.includes('## Physical Properties')) {
      warnings.push('Missing Physical Properties section');
    }
    if (!content.includes('## Function & Purpose')) {
      warnings.push('Missing Function & Purpose section');
    }
    if (!content.includes('## History & Origin')) {
      warnings.push('Missing History & Origin section');
    }
  }

  /**
   * Extract content of a specific section
   */
  private extractSectionContent(content: string, sectionName: string): string {
    const regex = new RegExp(`##\\s+${sectionName}\\s*\\n([\\s\\S]*?)(?=##|$)`);
    const match = content.match(regex);
    return match && match[1] ? match[1].trim() : '';
  }

  /**
   * Guess entity type from name
   */
  private guessEntityTypeFromName(name: string): 'character' | 'location' | 'item' | null {
    // Simple heuristic - could be enhanced with more sophisticated logic
    const lowerName = name.toLowerCase();
    if (lowerName.includes('character') || lowerName.includes('person')) return 'character';
    if (lowerName.includes('place') || lowerName.includes('location') || lowerName.includes('forest') || lowerName.includes('castle')) return 'location';
    if (lowerName.includes('item') || lowerName.includes('object') || lowerName.includes('sword') || lowerName.includes('magic')) return 'item';
    return null;
  }

  /**
   * Check if entity exists
   */
  private async checkEntityExists(entityType: 'character' | 'location' | 'item', entityName: string): Promise<boolean> {
    try {
      const result = await this.getEntity(entityType, entityName);
      return result.success;
    } catch {
      return false;
    }
  }
}
