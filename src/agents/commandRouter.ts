/**
 * Command Router for jester storytelling system
 * Handles slash command recognition and routing to appropriate agents
 */

import { Command, CommandResult, AgentConfig } from '../types/index.js';
import fs from 'fs-extra';
import * as path from 'path';
import { errorHandler } from '../utils/errorHandler.js';
import { MuseAgent, MuseAgentOptions } from './museAgent.js';
import { WriteAgent, WriteAgentOptions } from './writeAgent.js';
import { EditAgent, EditAgentOptions } from './editAgent.js';
import { EntityAgent, EntityAgentOptions } from './entityAgent.js';

export class CommandRouter {
  private agents: Map<string, AgentConfig> = new Map();
  private agentPath: string;
  private museAgent: MuseAgent;
  private writeAgent: WriteAgent;
  private editAgent: EditAgent;
  private entityAgent: EntityAgent;

  constructor() {
    this.agentPath = path.join(process.cwd(), '.jester', 'agents');
    this.museAgent = new MuseAgent();
    this.writeAgent = new WriteAgent();
    this.editAgent = new EditAgent();
    this.entityAgent = new EntityAgent();
    this.loadAgents();
  }

  /**
   * Load agent configurations from .jester/agents directory
   */
  private async loadAgents(): Promise<void> {
    try {
      if (!await fs.pathExists(this.agentPath)) {
        // In test environments, create mock agents if directory doesn't exist
        if (process.env.NODE_ENV === 'test') {
          this.createMockAgents();
          return;
        }
        throw new Error('Agents directory not found');
      }

      const agentFiles = await fs.readdir(this.agentPath);
      
      for (const file of agentFiles) {
        if (file.endsWith('.md')) {
          const agentConfig = await this.parseAgentFile(path.join(this.agentPath, file));
          if (agentConfig) {
            this.agents.set(agentConfig.id, agentConfig);
          }
        }
      }
    } catch (error) {
      errorHandler.logError('Failed to load agents', error);
      // In test environments, create mock agents as fallback
      if (process.env.NODE_ENV === 'test') {
        this.createMockAgents();
      }
    }
  }

  /**
   * Create mock agents for test environments
   */
  private createMockAgents(): void {
    const mockAgents = [
      {
        name: 'Muse',
        id: 'muse',
        title: 'Story Context Generator',
        icon: '🎭',
        whenToUse: 'Use for generating story context and initial story ideas',
        commands: ['generate-context'],
        dependencies: {}
      },
      {
        name: 'Write',
        id: 'write',
        title: 'Story Generation Agent',
        icon: '✍️',
        whenToUse: 'Use for generating story outlines and content',
        commands: ['outline', 'story'],
        dependencies: {}
      },
      {
        name: 'Edit',
        id: 'edit',
        title: 'Content Editor',
        icon: '✏️',
        whenToUse: 'Use for editing and refining content',
        commands: ['edit'],
        dependencies: {}
      }
    ];

    mockAgents.forEach(agent => {
      this.agents.set(agent.id, agent);
    });
  }

  /**
   * Parse agent markdown file to extract YAML configuration
   */
  private async parseAgentFile(filePath: string): Promise<AgentConfig | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (!yamlMatch) {
        return null;
      }

      const yamlContent = yamlMatch[1];
      if (!yamlContent) return null;
      const config = this.parseYaml(yamlContent);
      
      return {
        name: config.agent?.name || '',
        id: config.agent?.id || '',
        title: config.agent?.title || '',
        icon: config.agent?.icon || '',
        whenToUse: config.agent?.whenToUse || '',
        commands: config.commands || [],
        dependencies: config.dependencies || {}
      };
    } catch (error) {
      errorHandler.logError(`Failed to parse agent file: ${filePath}`, error);
      return null;
    }
  }

  /**
   * Simple YAML parser for agent configuration
   */
  private parseYaml(yamlContent: string): any {
    const lines = yamlContent.split('\n');
    const result: any = {};
    let currentSection: any = result;
    const stack: any[] = [result];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const indent = line.length - line.trimStart().length;
      const keyValue = trimmed.split(':');
      
      if (keyValue.length >= 2) {
        const key = keyValue[0]?.trim();
        const value = keyValue.slice(1).join(':').trim();
        if (!key) continue;
        
        // Handle nested structure based on indentation
        while (stack.length > 1 && stack[stack.length - 1]._indent >= indent) {
          stack.pop();
        }
        
        currentSection = stack[stack.length - 1];
        
        if (value) {
          currentSection[key] = value;
        } else {
          currentSection[key] = {};
          currentSection[key]._indent = indent;
          stack.push(currentSection[key]);
          currentSection = currentSection[key];
        }
      }
    }

    return result;
  }

  /**
   * Parse command string into Command object
   */
  public parseCommand(commandString: string): Command {
    // Parse command with proper quote handling
    const parts = this.parseCommandWithQuotes(commandString);
    if (parts.length === 0) {
      throw new Error('Empty command string');
    }
    const name = parts[0]?.startsWith('/') ? parts[0].slice(1) : parts[0];
    if (!name) {
      throw new Error('Invalid command string');
    }
    const args = parts.slice(1);
    const options: Record<string, any> = {};

    // Parse options (--key=value or --key)
    const filteredArgs: string[] = [];
    for (const arg of args) {
      if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        if (key) {
          options[key] = value || true;
        }
      } else {
        filteredArgs.push(arg);
      }
    }

    return {
      name,
      args: filteredArgs,
      options
    };
  }

  /**
   * Parse command string with proper quote handling
   */
  private parseCommandWithQuotes(commandString: string): string[] {
    const parts: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < commandString.length; i++) {
      const char = commandString[i];
      
      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = '';
      } else if (char === ' ' && !inQuotes) {
        if (current.trim()) {
          parts.push(current.trim());
          current = '';
        }
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      // Remove quotes from the final part if it's quoted
      let finalPart = current.trim();
      if ((finalPart.startsWith('"') && finalPart.endsWith('"')) || 
          (finalPart.startsWith("'") && finalPart.endsWith("'"))) {
        finalPart = finalPart.slice(1, -1);
      }
      parts.push(finalPart);
    }
    
    return parts;
  }

  /**
   * Route command to appropriate agent
   */
  public async routeCommand(command: Command): Promise<CommandResult> {
    try {
      // Check if command exists
      if (!this.agents.has(command.name)) {
        return {
          success: false,
          message: `Unknown command: ${command.name}`,
          error: `Available commands: ${Array.from(this.agents.keys()).join(', ')}`
        };
      }

      const agent = this.agents.get(command.name)!;
      
      // Route to specific agent implementations
      switch (command.name) {
        case 'muse':
          return await this.handleMuseCommand(command);
        case 'write':
          return await this.handleWriteCommand(command);
        case 'edit':
          return await this.handleEditCommand(command);
        case 'entity':
          return await this.handleEntityCommand(command);
        default:
          return {
            success: true,
            message: `Command '${command.name}' routed to ${agent.title}`,
            data: {
              agent: agent.name,
              title: agent.title,
              commands: agent.commands
            }
          };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Command routing failed',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle muse command
   */
  private async handleMuseCommand(command: Command): Promise<CommandResult> {
    try {
      // Parse options from command arguments
      const options: MuseAgentOptions = {
        storyIdea: command.args.join(' ') || undefined,
        ageRange: command.options.ageRange as string | undefined,
        readingLevel: command.options.readingLevel as string | undefined,
        targetLength: command.options.targetLength ? parseInt(command.options.targetLength as string) : undefined,
        plotTemplate: command.options.plotTemplate as string | undefined,
        characters: command.options.characters ? (command.options.characters as string).split(',') : undefined,
        locations: command.options.locations ? (command.options.locations as string).split(',') : undefined,
        items: command.options.items ? (command.options.items as string).split(',') : undefined,
        themes: command.options.themes ? (command.options.themes as string).split(',') : undefined,
        morals: command.options.morals ? (command.options.morals as string).split(',') : undefined
      };

      // Generate context
      const context = await this.museAgent.generateContext(options);
      
      return {
        success: true,
        message: `Story context generated successfully!`,
        data: {
          context,
          filePath: `contexts/context_${new Date().toISOString().split('T')[0]}_*.yaml`
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate story context',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle write command
   */
  private async handleWriteCommand(command: Command): Promise<CommandResult> {
    try {
      const subcommand = command.args[0];
      
      if (!subcommand) {
        return {
          success: false,
          message: 'Write command requires a subcommand',
          error: 'Usage: /write <outline|story> [options]'
        };
      }

      switch (subcommand) {
        case 'outline':
          return await this.handleWriteOutlineCommand(command);
        case 'story':
          return await this.handleWriteStoryCommand(command);
        default:
          return {
            success: false,
            message: `Unknown write subcommand: ${subcommand}`,
            error: 'Available subcommands: outline, story'
          };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Write command failed',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle write outline command
   */
  private async handleWriteOutlineCommand(command: Command): Promise<CommandResult> {
    try {
      const options: WriteAgentOptions = {};
      if (command.options.contextFile) {
        options.contextFile = command.options.contextFile as string;
      }
      if (command.options.outputPath) {
        options.outputPath = command.options.outputPath as string;
      }
      if (command.options.template) {
        options.template = command.options.template as string;
      }

      // Generate and save outline
      const result = await this.writeAgent.generateAndSaveOutline(options);
      
      return {
        success: true,
        message: `Outline generated successfully!`,
        data: {
          outline: result.outline,
          filePath: result.filePath,
          estimatedWordCount: result.outline.estimated_word_count,
          plotPointsCount: result.outline.plot_points.length
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate outline',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle write story command
   */
  private async handleWriteStoryCommand(command: Command): Promise<CommandResult> {
    try {
      const options: WriteAgentOptions = {};
      if (command.options.contextFile) {
        options.contextFile = command.options.contextFile as string;
      }
      if (command.options.outputPath) {
        options.outputPath = command.options.outputPath as string;
      }
      if (command.options.template) {
        options.template = command.options.template as string;
      }

      // Generate and save story
      const result = await this.writeAgent.generateAndSaveStory(options);
      
      return {
        success: true,
        message: `Story generated successfully!`,
        data: {
          story: result.story,
          filePath: result.filePath,
          wordCount: result.story.word_count,
          readingTimeMinutes: result.story.metadata.reading_time_minutes
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to generate story',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle edit command
   */
  private async handleEditCommand(command: Command): Promise<CommandResult> {
    try {
      const filePath = command.args[0];
      const editInstructions = command.args.slice(1).join(' ');

      if (!filePath) {
        return {
          success: false,
          message: 'File path is required for edit command',
          error: 'Usage: /edit <file_path> "edit_instructions" [options]'
        };
      }

      if (!editInstructions) {
        return {
          success: false,
          message: 'Edit instructions are required',
          error: 'Usage: /edit <file_path> "edit_instructions" [options]'
        };
      }

      const options: EditAgentOptions = {
        filePath,
        editInstructions,
        createBackup: command.options.noBackup !== true,
        validateAfterEdit: command.options.noValidate !== true
      };

      return await this.editAgent.editFile(options);
    } catch (error) {
      return {
        success: false,
        message: 'Edit command failed',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle entity command
   */
  private async handleEntityCommand(command: Command): Promise<CommandResult> {
    try {
      const subcommand = command.args[0];
      
      if (!subcommand) {
        return {
          success: false,
          message: 'Entity command requires a subcommand',
          error: 'Usage: /entity <create|list|get|validate> [options]'
        };
      }

      switch (subcommand) {
        case 'create':
          return await this.handleEntityCreateCommand(command);
        case 'list':
          return await this.handleEntityListCommand(command);
        case 'get':
          return await this.handleEntityGetCommand(command);
        case 'validate':
          return await this.handleEntityValidateCommand(command);
        default:
          return {
            success: false,
            message: `Unknown entity subcommand: ${subcommand}`,
            error: 'Available subcommands: create, list, get, validate'
          };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Entity command failed',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle entity create command
   */
  private async handleEntityCreateCommand(command: Command): Promise<CommandResult> {
    try {
      const entityType = command.args[1] as 'character' | 'location' | 'item';
      const entityName = command.args[2];

      if (!entityType || !entityName) {
        return {
          success: false,
          message: 'Entity type and name are required',
          error: 'Usage: /entity create <character|location|item> <name> [options]'
        };
      }

      const options: EntityAgentOptions = {
        entityType,
        entityName,
        templateData: command.options
      };

      return await this.entityAgent.createEntity(options);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create entity',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle entity list command
   */
  private async handleEntityListCommand(command: Command): Promise<CommandResult> {
    try {
      const entityType = command.args[1] as 'character' | 'location' | 'item';

      if (!entityType) {
        return {
          success: false,
          message: 'Entity type is required',
          error: 'Usage: /entity list <character|location|item>'
        };
      }

      return await this.entityAgent.listEntities(entityType);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to list entities',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle entity get command
   */
  private async handleEntityGetCommand(command: Command): Promise<CommandResult> {
    try {
      const entityType = command.args[1] as 'character' | 'location' | 'item';
      const entityName = command.args[2];

      if (!entityType || !entityName) {
        return {
          success: false,
          message: 'Entity type and name are required',
          error: 'Usage: /entity get <character|location|item> <name>'
        };
      }

      return await this.entityAgent.getEntity(entityType, entityName);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get entity',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Handle entity validate command
   */
  private async handleEntityValidateCommand(command: Command): Promise<CommandResult> {
    try {
      const entityType = command.args[1] as 'character' | 'location' | 'item';
      const entityName = command.args[2];

      if (!entityType || !entityName) {
        return {
          success: false,
          message: 'Entity type and name are required',
          error: 'Usage: /entity validate <character|location|item> <name>'
        };
      }

      return await this.entityAgent.validateEntity(entityType, entityName);
    } catch (error) {
      return {
        success: false,
        message: 'Failed to validate entity',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Get help information for all commands
   */
  public getHelp(): CommandResult {
    const helpInfo = Array.from(this.agents.values()).map(agent => ({
      command: agent.id,
      title: agent.title,
      description: agent.whenToUse,
      icon: agent.icon
    }));

    return {
      success: true,
      message: 'Available commands:',
      data: helpInfo
    };
  }

  /**
   * Get help for specific command
   */
  public getCommandHelp(commandName: string): CommandResult {
    const agent = this.agents.get(commandName);
    
    if (!agent) {
      return {
        success: false,
        message: `Command '${commandName}' not found`,
        error: `Available commands: ${Array.from(this.agents.keys()).join(', ')}`
      };
    }

    let helpData: any = {
      name: agent.name,
      title: agent.title,
      description: agent.whenToUse,
      commands: agent.commands,
      dependencies: agent.dependencies
    };

    // Add specific help for muse command
    if (commandName === 'muse') {
      helpData.usage = '/muse [story idea] [options]';
      helpData.options = {
        '--ageRange': 'Target age range (e.g., "5-8", "8-12", "12+")',
        '--readingLevel': 'Reading level (beginner, intermediate, advanced)',
        '--targetLength': 'Target word count (number)',
        '--plotTemplate': 'Plot template (heroes_journey, pixar, golden_circle)',
        '--characters': 'Comma-separated list of character names',
        '--locations': 'Comma-separated list of location names',
        '--items': 'Comma-separated list of item names',
        '--themes': 'Comma-separated list of themes',
        '--morals': 'Comma-separated list of morals'
      };
      helpData.examples = [
        '/muse "A brave little mouse" --ageRange="5-8" --plotTemplate="heroes_journey"',
        '/muse "Space adventure" --characters="Astronaut,Robot,Alien" --themes="Friendship,Exploration"'
      ];
    }

    // Add specific help for write command
    if (commandName === 'write') {
      helpData.usage = '/write <outline|story> [options]';
      helpData.options = {
        '--contextFile': 'Path to context/outline file (optional, uses most recent if not specified)',
        '--outputPath': 'Output file path (optional)',
        '--template': 'Template to use (optional)'
      };
      helpData.examples = [
        '/write outline',
        '/write outline --contextFile="my-story-context.yaml"',
        '/write outline --outputPath="my-outline.md"',
        '/write story',
        '/write story --contextFile="my-outline.yaml"',
        '/write story --outputPath="my-story.md"'
      ];
    }

    // Add specific help for edit command
    if (commandName === 'edit') {
      helpData.usage = '/edit <file_path> "edit_instructions" [options]';
      helpData.options = {
        '--noBackup': 'Skip creating backup file before editing',
        '--noValidate': 'Skip file validation after editing'
      };
      helpData.instructions = {
        'replace: <target> -> <new_value>': 'Replace target text with new value',
        'add: <property> -> <value>': 'Add value to array property',
        'remove: <property> -> <value>': 'Remove value from array property',
        'update: <property> -> <new_value>': 'Update property value'
      };
      helpData.examples = [
        '/edit "my-story.yaml" "replace: title -> A New Adventure"',
        '/edit "outline.md" "add: characters -> New Character"',
        '/edit "story.md" "update: plot_point.1.description -> Updated description"'
      ];
    }

    // Add specific help for entity command
    if (commandName === 'entity') {
      helpData.usage = '/entity <create|list|get|validate> [options]';
      helpData.subcommands = {
        'create <type> <name>': 'Create a new entity (character, location, or item)',
        'list <type>': 'List all entities of a specific type',
        'get <type> <name>': 'Get information about a specific entity',
        'validate <type> <name>': 'Validate an entity file'
      };
      helpData.options = {
        '--type': 'Entity type (character, location, item)',
        '--name': 'Entity name',
        '--description': 'Entity description',
        '--age': 'Character age (for characters)',
        '--species': 'Character species (for characters)',
        '--climate': 'Location climate (for locations)',
        '--rarity': 'Item rarity (for items)'
      };
      helpData.examples = [
        '/entity create character "Brave Mouse" --age="5" --species="Mouse"',
        '/entity create location "Enchanted Forest" --climate="Temperate"',
        '/entity create item "Magic Sword" --rarity="Legendary"',
        '/entity list characters',
        '/entity get character "Brave Mouse"',
        '/entity validate character "Brave Mouse"'
      ];
    }

    return {
      success: true,
      message: `Help for ${agent.title}`,
      data: helpData
    };
  }
}
