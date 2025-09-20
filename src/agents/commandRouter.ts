/**
 * Command Router for jester storytelling system
 * Handles slash command recognition and routing to appropriate agents
 */

import { Command, CommandResult, AgentConfig } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';
import { errorHandler } from '../utils/errorHandler';
import { MuseAgent, MuseAgentOptions } from './museAgent';
import { WriteAgent, WriteAgentOptions } from './writeAgent';

export class CommandRouter {
  private agents: Map<string, AgentConfig> = new Map();
  private agentPath: string;
  private museAgent: MuseAgent;
  private writeAgent: WriteAgent;

  constructor() {
    this.agentPath = path.join(process.cwd(), '.jester', 'agents');
    this.museAgent = new MuseAgent();
    this.writeAgent = new WriteAgent();
    this.loadAgents();
  }

  /**
   * Load agent configurations from .jester/agents directory
   */
  private async loadAgents(): Promise<void> {
    try {
      if (!await fs.pathExists(this.agentPath)) {
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
    }
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
    const parts = commandString.trim().split(/\s+/);
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
          return {
            success: true,
            message: 'Write story command not yet implemented',
            data: {
              command: 'write',
              subcommand: 'story'
            }
          };
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
      const options: WriteAgentOptions = {
        contextFile: command.options.contextFile as string | undefined || undefined,
        outputPath: command.options.outputPath as string | undefined || undefined,
        template: command.options.template as string | undefined || undefined
      };

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
   * Handle edit command (placeholder)
   */
  private async handleEditCommand(command: Command): Promise<CommandResult> {
    return {
      success: true,
      message: 'Edit command not yet implemented',
      data: {
        command: 'edit',
        target: command.args[0] || 'unknown'
      }
    };
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
        '--contextFile': 'Path to context file (optional, uses most recent if not specified)',
        '--outputPath': 'Output file path (optional)',
        '--template': 'Template to use (optional)'
      };
      helpData.examples = [
        '/write outline',
        '/write outline --contextFile="my-story-context.yaml"',
        '/write outline --outputPath="my-outline.md"'
      ];
    }

    return {
      success: true,
      message: `Help for ${agent.title}`,
      data: helpData
    };
  }
}
