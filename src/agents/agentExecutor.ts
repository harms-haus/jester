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

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot;
    this.agentLoader = new AgentLoader(path.join(projectRoot, '.jester/agents'));
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

    // For now, return a placeholder response
    return {
      success: true,
      message: `🎭 Muse Agent: I'm excited to help you create a story context for "${storyIdea}"!`,
      data: {
        storyIdea,
        agent: 'Muse',
        status: 'Ready to generate context'
      },
      nextSteps: [
        'I need more information about your target audience',
        'What age is your child?',
        'How long should the story be?',
        'What themes or morals should it explore?'
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
      nextSteps: ['I need to find your most recent context file first']
    };
  }

  private async handleWriteStory(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '✍️ Write Agent: I can generate a complete story from your outline.',
      nextSteps: ['I need to find your most recent outline file first']
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

    const [type, name] = args;
    return {
      success: true,
      message: `🏗️ Entity Manager: I can create a new ${type} named "${name}".`,
      nextSteps: [
        `I need more information about this ${type}`,
        'What are their key characteristics?',
        'How do they fit into your story universe?'
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
    return {
      success: true,
      message: '🏗️ Entity Manager: I can search for entities in your story universe.',
      nextSteps: ['Please specify what to search for']
    };
  }

  private async handleEntityBackup(args: string[]): Promise<AgentResponse> {
    return {
      success: true,
      message: '🏗️ Entity Manager: I can create a backup of an entity.',
      nextSteps: ['Please specify which entity to backup']
    };
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
    
    return {
      success: true,
      message: helpText
    };
  }
}
