#!/usr/bin/env node

/**
 * Agent Executor - Executes prompt-based agent behavior rules
 * 
 * This module takes agent definitions and executes their behavior rules
 * based on user commands, handling file operations and responses.
 */

import * as fs from 'fs';
import * as path from 'path';
import { AgentDefinition, AgentLoader } from './agentLoader.js';
import { LightRAGService, createLightRAGService } from '../services/lightragService.js';

export interface AgentResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  nextSteps?: string[];
}

export class AgentExecutor {
  private agentLoader: AgentLoader;
  private projectRoot: string;
  private lightragService: LightRAGService;

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.agentLoader = new AgentLoader(path.join(projectRoot, '.jester/agents'));
    this.lightragService = createLightRAGService();
  }

  /**
   * Initialize the agent system
   */
  async initialize(): Promise<void> {
    await this.agentLoader.loadAgents();
  }

  /**
   * Execute a command using the appropriate agent
   */
  async executeCommand(commandString: string): Promise<AgentResponse> {
    try {
      // Parse command manually for CLI commands
      const parts = commandString.trim().split(' ');
      const command = parts[0];
      const args = parts.slice(1);

      // Route CLI commands to appropriate agents
      if (command === '/muse') {
        const agent = this.agentLoader.getAgent('muse');
        if (!agent) {
          return {
            success: false,
            message: 'Muse agent not found',
            error: 'Agent not loaded'
          };
        }
        return await this.executeMuseCommand('/muse', args);
      } else if (command === '/write') {
        const agent = this.agentLoader.getAgent('write');
        if (!agent) {
          return {
            success: false,
            message: 'Write agent not found',
            error: 'Agent not loaded'
          };
        }
        return await this.executeWriteCommand('/write', args);
      } else if (command === '/edit') {
        const agent = this.agentLoader.getAgent('edit');
        if (!agent) {
          return {
            success: false,
            message: 'Edit agent not found',
            error: 'Agent not loaded'
          };
        }
        return await this.executeEditCommand('/edit', args);
      } else if (command === '/entity') {
        const agent = this.agentLoader.getAgent('entity');
        if (!agent) {
          return {
            success: false,
            message: 'Entity agent not found',
            error: 'Agent not loaded'
          };
        }
        return await this.executeEntityCommand('/entity', args);
      } else if (command === '/lightrag') {
        return await this.handleLightRAGCommand(args);
      } else {
        return {
          success: false,
          message: `Unknown command: ${commandString}`,
          nextSteps: ['Use /help to see available commands']
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to execute command',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Execute a specific command on an agent
   */
  private async executeAgentCommand(
    agent: AgentDefinition, 
    command: string, 
    args: string[]
  ): Promise<AgentResponse> {
    try {
      // Route to specific agent command handlers
      switch (agent.agent.id) {
        case 'muse':
          return await this.executeMuseCommand(command, args);
        case 'write':
          return await this.executeWriteCommand(command, args);
        case 'edit':
          return await this.executeEditCommand(command, args);
        case 'entity':
          return await this.executeEntityCommand(command, args);
        default:
          return {
            success: false,
            message: `Agent ${agent.agent.name} not implemented yet`,
            nextSteps: ['Agent behavior rules are defined but execution is pending']
          };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to execute ${command} on ${agent.agent.name}`,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Execute Muse agent commands
   */
  private async executeMuseCommand(command: string, args: string[]): Promise<AgentResponse> {
    switch (command) {
      case '/muse':
        return await this.handleMuseGenerateContext(args);
      case '/muse':
        return await this.handleMuseRefineContext(args);
      case '/muse':
        return await this.handleMuseSuggestCharacters(args);
      case '/muse':
        return await this.handleMuseSuggestSettings(args);
      case '/muse':
        return await this.handleMuseSuggestThemes(args);
      default:
        return {
          success: false,
          message: `Unknown Muse command: ${command}`,
          nextSteps: ['Use /muse [story-idea] to generate story context']
        };
    }
  }

  /**
   * Execute Write agent commands
   */
  private async executeWriteCommand(command: string, args: string[]): Promise<AgentResponse> {
    switch (command) {
      case '/write':
        if (args[0] === 'outline') {
          return await this.handleWriteOutline(args.slice(1));
        } else if (args[0] === 'story') {
          return await this.handleWriteStory(args.slice(1));
        } else if (args[0] === 'refine') {
          return await this.handleWriteRefine(args.slice(1));
        } else if (args[0] === 'adjust-length') {
          return await this.handleWriteAdjustLength(args.slice(1));
        }
        break;
      default:
        return {
          success: false,
          message: `Unknown Write command: ${command}`,
          nextSteps: ['Use /write outline or /write story to generate content']
        };
    }
    return {
      success: false,
      message: `Invalid Write command: ${command} ${args.join(' ')}`,
      nextSteps: ['Use /write outline or /write story to generate content']
    };
  }

  /**
   * Execute Edit agent commands
   */
  private async executeEditCommand(command: string, args: string[]): Promise<AgentResponse> {
    switch (command) {
      case '/edit':
        return await this.handleEditContent(args);
      case '/edit':
        return await this.handleEditRefineLanguage(args);
      case '/edit':
        return await this.handleEditAdjustTone(args);
      case '/edit':
        return await this.handleEditFixConsistency(args);
      case '/edit':
        return await this.handleEditEnhanceDescriptions(args);
      default:
        return {
          success: false,
          message: `Unknown Edit command: ${command}`,
          nextSteps: ['Use /edit <file> <instructions> to edit content']
        };
    }
  }

  /**
   * Execute Entity agent commands
   */
  private async executeEntityCommand(command: string, args: string[]): Promise<AgentResponse> {
    switch (command) {
      case '/entity':
        if (args[0] === 'create') {
          return await this.handleEntityCreate(args.slice(1));
        } else if (args[0] === 'list') {
          return await this.handleEntityList(args.slice(1));
        } else if (args[0] === 'get') {
          return await this.handleEntityGet(args.slice(1));
        } else if (args[0] === 'validate') {
          return await this.handleEntityValidate(args.slice(1));
        } else if (args[0] === 'edit') {
          return await this.handleEntityEdit(args.slice(1));
        } else if (args[0] === 'delete') {
          return await this.handleEntityDelete(args.slice(1));
        } else if (args[0] === 'search') {
          return await this.handleEntitySearch(args.slice(1));
        } else if (args[0] === 'backup') {
          return await this.handleEntityBackup(args.slice(1));
        }
        break;
      default:
        return {
          success: false,
          message: `Unknown Entity command: ${command}`,
          nextSteps: ['Use /entity create <type> <name> to create entities']
        };
    }
    return {
      success: false,
      message: `Invalid Entity command: ${command} ${args.join(' ')}`,
      nextSteps: ['Use /entity create <type> <name> to create entities']
    };
  }

  // Muse Agent Command Handlers
  private async handleMuseGenerateContext(args: string[]): Promise<AgentResponse> {
    const storyIdea = args.join(' ');
    if (!storyIdea) {
      return {
        success: false,
        message: 'Please provide a story idea',
        nextSteps: ['Use /muse "your story idea here" to generate context']
      };
    }

    // Try to enhance context with LightRAG if available
    let lightragEnhancement = null;
    try {
      if (await this.lightragService.isAvailable()) {
        lightragEnhancement = await this.lightragService.enhanceStoryContext(storyIdea, {});
      }
    } catch (error) {
      console.warn('[Muse Agent] LightRAG enhancement failed, continuing without it:', error);
    }

    // Return prompt-based response with file operation instructions
    return {
      success: true,
      message: `🎭 Muse Agent: I'm excited to help you create a story context for "${storyIdea}"!`,
      data: {
        storyIdea,
        agent: 'Muse',
        status: 'Ready to generate context',
        lightragEnhancement: lightragEnhancement ? {
          entities: lightragEnhancement.entities.slice(0, 3),
          relationships: lightragEnhancement.relationships.slice(0, 3)
        } : null
      },
      nextSteps: [
        'I will create a context YAML file with the following structure:',
        '---',
        'storyIdea: "[your story idea]"',
        'targetAudience: "Children (ages 4-8)"',
        'targetLength: "5-10 minutes"',
        'themes: [Adventure, Friendship, Courage]',
        'characters: [Main Character, Helper Character]',
        lightragEnhancement ? `lightragEntities: [${lightragEnhancement.entities.map(e => e.name).join(', ')}]` : '',
        lightragEnhancement ? `lightragRelationships: [${lightragEnhancement.relationships.map(r => `${r.source} -> ${r.target}`).join(', ')}]` : '',
        'settings: [Magical Forest, Home]',
        'plotTemplate: "Hero\'s Journey"',
        'metadata: {createdAt, createdBy, version}',
        '---',
        'I will save this to contexts/context_YYYY-MM-DD_HH-MM-SS.yaml',
        'Use /write outline to generate a story outline next'
      ]
    };
  }

  private async handleMuseRefineContext(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🎭 Muse Agent: I can help you refine an existing story context.',
      nextSteps: ['Please specify which context file to refine']
    };
  }

  private async handleMuseSuggestCharacters(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🎭 Muse Agent: I can suggest character ideas for your story.',
      nextSteps: ['I need to know more about your story to suggest appropriate characters']
    };
  }

  private async handleMuseSuggestSettings(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🎭 Muse Agent: I can suggest setting ideas for your story.',
      nextSteps: ['I need to know more about your story to suggest appropriate settings']
    };
  }

  private async handleMuseSuggestThemes(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🎭 Muse Agent: I can suggest themes and morals for your story.',
      nextSteps: ['I need to know more about your story to suggest appropriate themes']
    };
  }

  // Write Agent Command Handlers
  private async handleWriteOutline(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✍️ Write Agent: I can generate a story outline from your context.',
      nextSteps: [
        'I will find the most recent context file in contexts/ directory',
        'I will create an outline Markdown file with this structure:',
        '# Story Outline',
        '**Target Audience:** [from context]',
        '**Target Length:** [from context]',
        '**Created:** [current timestamp]',
        '## Plot Structure',
        '### Act 1 - Introduction',
        '[Plot point description]',
        '**Characters:** [character names]',
        '### Act 2 - Rising Action',
        '[Plot point description]',
        '**Characters:** [character names]',
        '### Act 3 - Climax',
        '[Plot point description]',
        '**Characters:** [character names]',
        '### Act 4 - Resolution',
        '[Plot point description]',
        '**Characters:** [character names]',
        'I will save this to outlines/outline_YYYY-MM-DD_HH-MM-SS.md'
      ]
    };
  }

  private async handleWriteStory(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✍️ Write Agent: I can generate a complete story from your outline.',
      nextSteps: [
        'I will find the most recent outline file in outlines/ directory',
        'I will create a story Markdown file with this structure:',
        '# [Story Title]',
        '**Summary:** [Brief story summary]',
        '**Target Audience:** [from context]',
        '**Target Length:** [from context]',
        '**Created:** [current timestamp]',
        '---',
        '[Complete story content with engaging narrative, dialogue, and descriptions]',
        'I will save this to stories/story_YYYY-MM-DD_HH-MM-SS.md'
      ]
    };
  }

  private async handleWriteRefine(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✍️ Write Agent: I can refine your outline or story content.',
      nextSteps: ['Please specify which file to refine and what changes you want']
    };
  }

  private async handleWriteAdjustLength(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✍️ Write Agent: I can adjust the length of your content.',
      nextSteps: ['Please specify which file and target length']
    };
  }

  // Edit Agent Command Handlers
  private async handleEditContent(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✏️ Edit Agent: I can edit your content based on your instructions.',
      nextSteps: ['Please specify which file to edit and what changes you want']
    };
  }

  private async handleEditRefineLanguage(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✏️ Edit Agent: I can improve the language and readability of your content.',
      nextSteps: ['Please specify which file to refine']
    };
  }

  private async handleEditAdjustTone(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✏️ Edit Agent: I can adjust the tone and voice of your content.',
      nextSteps: ['Please specify which file and target audience']
    };
  }

  private async handleEditFixConsistency(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✏️ Edit Agent: I can fix inconsistencies in your content.',
      nextSteps: ['Please specify which file to check']
    };
  }

  private async handleEditEnhanceDescriptions(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✏️ Edit Agent: I can enhance descriptions and imagery in your content.',
      nextSteps: ['Please specify which file to enhance']
    };
  }

  // Entity Agent Command Handlers
  private async handleEntityCreate(args: string[]): Promise<AgentResponse> {
    if (args.length < 2) {
      return {
        success: false,
        message: 'Please specify entity type and name',
        nextSteps: ['Use /entity create <type> <name> to create an entity']
      };
    }

    const type = args[0];
    const name = args.slice(1).join(' ');
    
    // Validate entity type
    if (!type || !name || !['character', 'location', 'item'].includes(type.toLowerCase())) {
      return {
        success: false,
        message: 'Invalid entity type',
        error: 'Entity type must be character, location, or item',
        nextSteps: ['Use /entity create character <name> or /entity create location <name> or /entity create item <name>']
      };
    }

    return {
      success: true,
      message: `🏗️ Entity Manager: I can create a new ${type} named "${name}".`,
      nextSteps: [
        `I will create a ${type} Markdown file with this structure:`,
        `# ${name}`,
        `**Type:** ${type}`,
        `**Created:** [current timestamp]`,
        `## Description`,
        `[${type} description with details and background]`,
        `## Relationships`,
        `- [[Related Entity 1]]`,
        `- [[Related Entity 2]]`,
        `## Story Appearances`,
        `- [Story 1]`,
        `- [Story 2]`,
        `I will save this to entities/${type}s/${name.toLowerCase().replace(/\s+/g, '-')}.md`
      ]
    };
  }

  private async handleEntityList(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can list all entities in your story universe.',
      nextSteps: ['Please specify which type of entities to list (characters, locations, items)']
    };
  }

  private async handleEntityGet(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can show detailed information about an entity.',
      nextSteps: ['Please specify which entity to get information about']
    };
  }

  private async handleEntityValidate(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can validate an entity file structure.',
      nextSteps: ['Please specify which entity to validate']
    };
  }

  private async handleEntityEdit(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can edit an existing entity.',
      nextSteps: ['Please specify which entity to edit and what changes you want']
    };
  }

  private async handleEntityDelete(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can delete an entity with proper cleanup.',
      nextSteps: ['Please specify which entity to delete']
    };
  }

  private async handleEntitySearch(args: string[]): Promise<AgentResponse> {
    const searchQuery = args.join(' ');
    if (!searchQuery) {
      return {
        success: false,
        message: 'Please specify what to search for',
        nextSteps: ['Use /entity search "your search query" to find entities']
      };
    }

    // Try to search with LightRAG if available
    let lightragResults = null;
    try {
      if (await this.lightragService.isAvailable()) {
        const entities = await this.lightragService.searchEntities(searchQuery, 5);
        const relationships = await this.lightragService.searchRelationships(searchQuery, undefined, 3);
        lightragResults = { entities, relationships };
      }
    } catch (error) {
      console.warn('[Entity Agent] LightRAG search failed, continuing without it:', error);
    }

    return {
      success: true,
      message: `🏗️ Entity Manager: Searching for entities related to "${searchQuery}"`,
      data: {
        searchQuery,
        lightragResults: lightragResults ? {
          entities: lightragResults.entities,
          relationships: lightragResults.relationships
        } : null
      },
      nextSteps: [
        'I will search through your story universe for relevant entities:',
        lightragResults ? `Found ${lightragResults.entities.length} entities:` : 'Searching local entity files:',
        lightragResults ? lightragResults.entities.map(e => `- ${e.name} (${e.type}): ${e.description}`).join('\n') : '',
        lightragResults && lightragResults.relationships.length > 0 ? `Found ${lightragResults.relationships.length} relationships:` : '',
        lightragResults ? lightragResults.relationships.map(r => `- ${r.source} -> ${r.target}: ${r.description}`).join('\n') : '',
        'I will also check local entity files in entities/ directory',
        'Use /entity create to add new entities if needed'
      ]
    };
  }

  private async handleEntityBackup(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can create a backup of an entity.',
      nextSteps: ['Please specify which entity to backup']
    };
  }

  // LightRAG Command Handlers
  private async handleLightRAGCommand(args: string[]): Promise<AgentResponse> {
    if (args.length === 0) {
      return await this.handleLightRAGStatus();
    }

    const subcommand = args[0];
    switch (subcommand) {
      case 'status':
        return await this.handleLightRAGStatus();
      case 'search':
        return await this.handleLightRAGSearch(args.slice(1));
      case 'entities':
        return await this.handleLightRAGEntities();
      case 'relationships':
        return await this.handleLightRAGRelationships(args.slice(1));
      case 'health':
        return await this.handleLightRAGHealth();
      default:
        return {
          success: false,
          message: `Unknown LightRAG command: ${subcommand}`,
          nextSteps: ['Use /lightrag status, /lightrag search, /lightrag entities, or /lightrag relationships']
        };
    }
  }

  private async handleLightRAGStatus(): Promise<AgentResponse> {
    const status = this.lightragService.getStatus();
    const isAvailable = await this.lightragService.isAvailable();

    return {
      success: true,
      message: `🔍 LightRAG Status: ${isAvailable ? 'Connected' : 'Disconnected'}`,
      data: {
        enabled: status.enabled,
        healthy: status.healthy,
        fallbackMode: status.fallbackMode,
        available: isAvailable
      },
      nextSteps: [
        `Service enabled: ${status.enabled}`,
        `Service healthy: ${status.healthy}`,
        `Fallback mode: ${status.fallbackMode}`,
        `Currently available: ${isAvailable}`,
        'Use /lightrag search "query" to search for entities',
        'Use /lightrag entities to list entity types',
        'Use /lightrag relationships "entity" to find relationships'
      ]
    };
  }

  private async handleLightRAGSearch(args: string[]): Promise<AgentResponse> {
    const query = args.join(' ');
    if (!query) {
      return {
        success: false,
        message: 'Please provide a search query',
        nextSteps: ['Use /lightrag search "your search query" to search for entities']
      };
    }

    try {
      const entities = await this.lightragService.searchEntities(query, 10);
      const relationships = await this.lightragService.searchRelationships(query, undefined, 5);

      return {
        success: true,
        message: `🔍 LightRAG Search Results for "${query}"`,
        data: {
          query,
          entities,
          relationships
        },
        nextSteps: [
          `Found ${entities.length} entities:`,
          entities.map(e => `- ${e.name} (${e.type}): ${e.description}`).join('\n'),
          relationships.length > 0 ? `Found ${relationships.length} relationships:` : '',
          relationships.map(r => `- ${r.source} -> ${r.target}: ${r.description}`).join('\n')
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: 'LightRAG search failed',
        error: error instanceof Error ? error.message : String(error),
        nextSteps: ['Check LightRAG service status with /lightrag status']
      };
    }
  }

  private async handleLightRAGEntities(): Promise<AgentResponse> {
    try {
      const entityLabels = await this.lightragService.getEntityLabels();

      return {
        success: true,
        message: '🔍 LightRAG Entity Types',
        data: {
          entityLabels
        },
        nextSteps: [
          'Available entity types:',
          entityLabels.map(e => `- ${e.name} (${e.type}): ${e.count} entities - ${e.description}`).join('\n')
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get entity types',
        error: error instanceof Error ? error.message : String(error),
        nextSteps: ['Check LightRAG service status with /lightrag status']
      };
    }
  }

  private async handleLightRAGRelationships(args: string[]): Promise<AgentResponse> {
    const entity = args.join(' ');
    if (!entity) {
      return {
        success: false,
        message: 'Please specify an entity to find relationships for',
        nextSteps: ['Use /lightrag relationships "entity name" to find relationships']
      };
    }

    try {
      const relationships = await this.lightragService.searchRelationships(entity, undefined, 10);

      return {
        success: true,
        message: `🔍 LightRAG Relationships for "${entity}"`,
        data: {
          entity,
          relationships
        },
        nextSteps: [
          `Found ${relationships.length} relationships:`,
          relationships.map(r => `- ${r.source} -> ${r.target}: ${r.description} (weight: ${r.weight})`).join('\n')
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get relationships',
        error: error instanceof Error ? error.message : String(error),
        nextSteps: ['Check LightRAG service status with /lightrag status']
      };
    }
  }

  private async handleLightRAGHealth(): Promise<AgentResponse> {
    try {
      const isAvailable = await this.lightragService.isAvailable();
      const status = this.lightragService.getStatus();

      return {
        success: true,
        message: `🔍 LightRAG Health Check: ${isAvailable ? 'Healthy' : 'Unhealthy'}`,
        data: {
          available: isAvailable,
          status
        },
        nextSteps: [
          `Service available: ${isAvailable}`,
          `Service enabled: ${status.enabled}`,
          `Service healthy: ${status.healthy}`,
          `Fallback mode: ${status.fallbackMode}`
        ]
      };
    } catch (error) {
      return {
        success: false,
        message: 'LightRAG health check failed',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Get help information for all available commands
   */
  getHelp(): AgentResponse {
    const commands = this.agentLoader.getAvailableCommands();
    
    let helpText = 'jester - AI-powered bedtime story creation system\n\n';
    helpText += 'Available Commands:\n\n';
    
    
    for (const cmd of commands) {
      const commandStr = String(cmd.command);
      helpText += `  ${commandStr.padEnd(20)} ${cmd.description}\n`;
    }
    
    helpText += '\nExamples:\n';
    helpText += '  jester /muse "A brave little mouse goes on an adventure"\n';
    helpText += '  jester /write outline\n';
    helpText += '  jester /write story\n';
    helpText += '  jester /edit "story.md" "replace: title -> New Title"\n';
    helpText += '  jester /entity create character "Brave Mouse"\n';
    helpText += '  jester /lightrag status\n';
    helpText += '  jester /lightrag search "magical forest"\n';
    helpText += '  jester /lightrag entities\n';
    helpText += '  jester /lightrag relationships "hero"\n';
    
    return {
      success: true,
      message: helpText
    };
  }
}
