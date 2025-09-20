/**
 * Command Router for jester storytelling system
 * Handles slash command recognition and routing to appropriate agents
 */

import { Command, CommandResult, AgentConfig } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';
import { errorHandler } from '../utils/errorHandler';

export class CommandRouter {
  private agents: Map<string, AgentConfig> = new Map();
  private agentPath: string;

  constructor() {
    this.agentPath = path.join(process.cwd(), '.jester', 'agents');
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
      
      // For now, return success with agent info
      // In future, this would delegate to actual agent execution
      return {
        success: true,
        message: `Command '${command.name}' routed to ${agent.title}`,
        data: {
          agent: agent.name,
          title: agent.title,
          commands: agent.commands
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Command routing failed',
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

    return {
      success: true,
      message: `Help for ${agent.title}`,
      data: {
        name: agent.name,
        title: agent.title,
        description: agent.whenToUse,
        commands: agent.commands,
        dependencies: agent.dependencies
      }
    };
  }
}
