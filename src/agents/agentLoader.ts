#!/usr/bin/env node

/**
 * Agent Loader - Loads and parses prompt-based agent definitions
 * 
 * This module reads agent markdown files from .jester/agents/ and parses
 * their YAML configuration to create agent objects that can be executed.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface AgentConfig {
  name: string;
  id: string;
  title: string;
  icon: string;
  whenToUse: string;
  customization: any;
}

export interface AgentPersona {
  role: string;
  style: string;
  identity: string;
  focus: string;
  core_principles: string[];
}

export type AgentCommand = string[];

export interface AgentDependencies {
  templates?: string[];
  prompts?: string[];
  data?: string[];
}

export interface AgentDefinition {
  agent: AgentConfig;
  persona: AgentPersona;
  commands: AgentCommand;
  dependencies: AgentDependencies;
}

export class AgentLoader {
  private agentsDir: string;
  private agents: Map<string, AgentDefinition> = new Map();

  constructor(agentsDir: string = '.jester/agents') {
    this.agentsDir = agentsDir;
  }

  /**
   * Load all agent definitions from the agents directory
   */
  async loadAgents(): Promise<void> {
    try {
      const agentsPath = path.resolve(this.agentsDir);
      
      if (!fs.existsSync(agentsPath)) {
        console.warn(`Agents directory not found: ${agentsPath}`);
        return;
      }

      const files = fs.readdirSync(agentsPath).filter(file => file.endsWith('.md'));
      
      for (const file of files) {
        try {
          const agent = await this.loadAgent(file);
          if (agent) {
            this.agents.set(agent.agent.id, agent);
            console.log(`Loaded agent: ${agent.agent.name} (${agent.agent.id})`);
          }
        } catch (error) {
          console.error(`Failed to load agent from ${file}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    }
  }

  /**
   * Load a single agent definition from a markdown file
   */
  private async loadAgent(filename: string): Promise<AgentDefinition | null> {
    try {
      const filePath = path.join(this.agentsDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract YAML frontmatter
      const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!yamlMatch) {
        console.warn(`No YAML frontmatter found in ${filename}`);
        return null;
      }

      const yamlContent = yamlMatch[1];
      if (!yamlContent) {
        console.warn(`No YAML content found in ${filename}`);
        return null;
      }
      const agentData = yaml.load(yamlContent) as any;

      // Validate required fields
      if (!agentData.agent || !agentData.persona || !agentData.commands) {
        console.warn(`Invalid agent structure in ${filename}`);
        return null;
      }

      return agentData as AgentDefinition;
    } catch (error) {
      console.error(`Error parsing agent file ${filename}:`, error);
      return null;
    }
  }

  /**
   * Get an agent by ID
   */
  getAgent(agentId: string): AgentDefinition | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all loaded agents
   */
  getAllAgents(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }

  /**
   * Find an agent that handles a specific command
   */
  findAgentForCommand(command: string): AgentDefinition | undefined {
    for (const agent of this.agents.values()) {
      if (Array.isArray(agent.commands)) {
        for (const cmd of agent.commands) {
          if (typeof cmd === 'string' && cmd === command) {
            return agent;
          } else if (typeof cmd === 'object' && Object.keys(cmd).includes(command)) {
            return agent;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Parse a command string to extract agent and command
   */
  parseCommand(commandString: string): { agentId: string; command: string; args: string[] } | null {
    const parts = commandString.trim().split(' ');
    if (parts.length === 0) return null;

    const command = parts[0];
    if (!command) return null;
    
    // Find agent that handles this command
    const agent = this.findAgentForCommand(command);
    if (!agent) {
      return null;
    }

    return {
      agentId: agent.agent.id || 'unknown',
      command: command,
      args: parts.slice(1)
    };
  }

  /**
   * Get available commands from all agents
   */
  getAvailableCommands(): { command: string; agent: string; description: string }[] {
    const commands: { command: string; agent: string; description: string }[] = [];
    
    for (const agent of this.agents.values()) {
      // Handle both array and object formats
      if (Array.isArray(agent.commands)) {
        for (const command of agent.commands) {
          if (typeof command === 'string') {
            commands.push({
              command,
              agent: agent.agent.name,
              description: 'Available command'
            });
          } else if (typeof command === 'object') {
            // Handle object format: { "command-name": "description" }
            for (const [cmdName, description] of Object.entries(command)) {
              commands.push({
                command: cmdName,
                agent: agent.agent.name,
                description: String(description)
              });
            }
          }
        }
      }
    }
    
    return commands;
  }
}
