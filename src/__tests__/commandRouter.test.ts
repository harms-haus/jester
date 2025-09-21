/**
 * Unit tests for CommandRouter
 */

import { CommandRouter } from '../agents/commandRouter';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('CommandRouter', () => {
  let commandRouter: CommandRouter;
  const testAgentPath = path.join(process.cwd(), '.jester', 'agents');

  beforeEach(async () => {
    commandRouter = new CommandRouter();
    // Wait for agents to load
    await new Promise(resolve => setTimeout(resolve, 10));
  });

  describe('parseCommand', () => {
    it('should parse simple command', () => {
      const command = commandRouter.parseCommand('/muse');
      expect(command.name).toBe('muse');
      expect(command.args).toEqual([]);
      expect(command.options).toEqual({});
    });

    it('should parse command with arguments', () => {
      const command = commandRouter.parseCommand('/write outline my-story');
      expect(command.name).toBe('write');
      expect(command.args).toEqual(['outline', 'my-story']);
      expect(command.options).toEqual({});
    });

    it('should parse command with options', () => {
      const command = commandRouter.parseCommand('/edit --verbose --output=file.md');
      expect(command.name).toBe('edit');
      expect(command.args).toEqual([]);
      expect(command.options).toEqual({
        verbose: true,
        output: 'file.md'
      });
    });

    it('should parse command without leading slash', () => {
      const command = commandRouter.parseCommand('muse');
      expect(command.name).toBe('muse');
      expect(command.args).toEqual([]);
    });
  });

  describe('routeCommand', () => {
    it('should route valid command successfully', async () => {
      const command = { name: 'muse', args: [], options: {} };
      const result = await commandRouter.routeCommand(command);
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('Story context generated successfully');
    });

    it('should handle unknown command', async () => {
      const command = { name: 'unknown', args: [], options: {} };
      const result = await commandRouter.routeCommand(command);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown command');
    });
  });

  describe('getHelp', () => {
    it('should return help information', () => {
      const result = commandRouter.getHelp();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('Available commands');
      expect(result.data).toBeDefined();
    });
  });

  describe('getCommandHelp', () => {
    it('should return help for valid command', () => {
      const result = commandRouter.getCommandHelp('muse');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should return error for invalid command', () => {
      const result = commandRouter.getCommandHelp('unknown');
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not found');
    });
  });
});
