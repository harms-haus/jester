/**
 * Unit tests for CommandRouter write command integration
 */

import { CommandRouter } from '../agents/commandRouter';
import { Command, CommandResult } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';

// Mock fs-extra
jest.mock('fs-extra');
const mockedFs = {
  pathExists: jest.fn(),
  readFile: jest.fn(),
  readdir: jest.fn()
} as any;

// Mock WriteAgent
jest.mock('../agents/writeAgent');
const mockWriteAgent = {
  generateAndSaveOutline: jest.fn()
};

// Mock the WriteAgent constructor
jest.mock('../agents/writeAgent', () => ({
  WriteAgent: jest.fn().mockImplementation(() => mockWriteAgent)
}));

describe('CommandRouter Write Command', () => {
  let commandRouter: CommandRouter;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock file system operations for agent loading
    mockedFs.pathExists.mockResolvedValue(true);
    mockedFs.readdir.mockResolvedValue(['write.md']);
    mockedFs.readFile.mockResolvedValue(`
---
agent:
  name: Write Agent
  id: write
  title: Write Agent
  icon: ✍️
  whenToUse: Generate outlines and stories
commands: [outline, story]
dependencies: {}
---
Write agent configuration
    `);

    commandRouter = new CommandRouter();
  });

  describe('write command parsing', () => {
    it('should parse write outline command correctly', () => {
      const commandString = '/write outline --contextFile="test.yaml"';
      const command = commandRouter.parseCommand(commandString);

      expect(command.name).toBe('write');
      expect(command.args).toEqual(['outline']);
      expect(command.options.contextFile).toBe('test.yaml');
    });

    it('should parse write outline command with multiple options', () => {
      const commandString = '/write outline --contextFile="test.yaml" --outputPath="outline.md" --template="heroes_journey"';
      const command = commandRouter.parseCommand(commandString);

      expect(command.name).toBe('write');
      expect(command.args).toEqual(['outline']);
      expect(command.options.contextFile).toBe('test.yaml');
      expect(command.options.outputPath).toBe('outline.md');
      expect(command.options.template).toBe('heroes_journey');
    });

    it('should handle write command without subcommand', () => {
      const commandString = '/write';
      const command = commandRouter.parseCommand(commandString);

      expect(command.name).toBe('write');
      expect(command.args).toEqual([]);
    });
  });

  describe('write outline command execution', () => {
    it('should execute write outline command successfully', async () => {
      const mockResult = {
        outline: {
          title: 'Test Story',
          target_audience: { age_range: '5-8', reading_level: 'beginner' },
          target_length: { min_words: 500, max_words: 1000, final_target: 750 },
          plot_points: [],
          estimated_word_count: 750,
          metadata: {
            context_file: 'test-context.yaml',
            created_at: '2024-01-01T00:00:00Z',
            last_modified: '2024-01-01T00:00:00Z'
          }
        },
        filePath: 'outlines/test-story-2024-01-01.md'
      };

      mockWriteAgent.generateAndSaveOutline.mockResolvedValue(mockResult);

      const command: Command = {
        name: 'write',
        args: ['outline'],
        options: { contextFile: 'test-context.yaml' }
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Outline generated successfully');
      expect(result.data).toBeDefined();
      expect(result.data.outline).toBeDefined();
      expect(result.data.filePath).toBeDefined();
      expect(result.data.estimatedWordCount).toBe(750);
      expect(result.data.plotPointsCount).toBe(0);
    });

    it('should handle write outline command with error', async () => {
      mockWriteAgent.generateAndSaveOutline.mockRejectedValue(new Error('Generation failed'));

      const command: Command = {
        name: 'write',
        args: ['outline'],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to generate outline');
      expect(result.error).toBeDefined();
    });

    it('should handle missing subcommand', async () => {
      const command: Command = {
        name: 'write',
        args: [],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Write command requires a subcommand');
      expect(result.error).toContain('Usage: /write <outline|story> [options]');
    });

    it('should handle unknown subcommand', async () => {
      const command: Command = {
        name: 'write',
        args: ['unknown'],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown write subcommand: unknown');
      expect(result.error).toContain('Available subcommands: outline, story');
    });
  });

  describe('write story command', () => {
    it('should handle write story command (not yet implemented)', async () => {
      const command: Command = {
        name: 'write',
        args: ['story'],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Write story command not yet implemented');
      expect(result.data.command).toBe('write');
      expect(result.data.subcommand).toBe('story');
    });
  });

  describe('help system', () => {
    it('should provide help for write command', () => {
      const helpResult = commandRouter.getCommandHelp('write');

      expect(helpResult.success).toBe(true);
      expect(helpResult.data.usage).toBe('/write <outline|story> [options]');
      expect(helpResult.data.options).toBeDefined();
      expect(helpResult.data.options['--contextFile']).toBeDefined();
      expect(helpResult.data.options['--outputPath']).toBeDefined();
      expect(helpResult.data.options['--template']).toBeDefined();
      expect(helpResult.data.examples).toBeDefined();
      expect(helpResult.data.examples).toContain('/write outline');
    });

    it('should provide general help with write command included', () => {
      const helpResult = commandRouter.getHelp();

      expect(helpResult.success).toBe(true);
      expect(helpResult.data).toBeDefined();
      expect(Array.isArray(helpResult.data)).toBe(true);
    });
  });

  describe('command validation', () => {
    it('should validate write command arguments', () => {
      const validCommand = commandRouter.parseCommand('/write outline --contextFile="test.yaml"');
      expect(validCommand.name).toBe('write');
      expect(validCommand.args).toEqual(['outline']);
      expect(validCommand.options.contextFile).toBe('test.yaml');
    });

    it('should handle empty command string', () => {
      expect(() => commandRouter.parseCommand('')).toThrow('Empty command string');
    });

    it('should handle invalid command string', () => {
      expect(() => commandRouter.parseCommand('/')).toThrow('Invalid command string');
    });
  });

  describe('error handling', () => {
    it('should handle write agent errors gracefully', async () => {
      mockWriteAgent.generateAndSaveOutline.mockRejectedValue(new Error('File system error'));

      const command: Command = {
        name: 'write',
        args: ['outline'],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to generate outline');
      expect(result.error).toBeDefined();
    });

    it('should handle command routing errors', async () => {
      const command: Command = {
        name: 'write',
        args: ['outline'],
        options: {}
      };

      // Mock an error in the routing process
      jest.spyOn(commandRouter as any, 'handleWriteOutlineCommand')
        .mockRejectedValue(new Error('Routing error'));

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Write command failed');
      expect(result.error).toBeDefined();
    });
  });

  describe('integration with existing commands', () => {
    it('should not interfere with muse command', async () => {
      const museCommand: Command = {
        name: 'muse',
        args: ['test story'],
        options: { ageRange: '5-8' }
      };

      // Mock muse agent
      const mockMuseAgent = {
        generateContext: jest.fn().mockResolvedValue({
          title: 'Test Story',
          target_audience: { age_range: '5-8', reading_level: 'beginner' }
        })
      };

      jest.spyOn(commandRouter as any, 'museAgent', 'get').mockReturnValue(mockMuseAgent);

      const result = await commandRouter.routeCommand(museCommand);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Story context generated successfully');
    });

    it('should maintain command isolation', () => {
      const writeCommand = commandRouter.parseCommand('/write outline');
      const museCommand = commandRouter.parseCommand('/muse "test story"');

      expect(writeCommand.name).toBe('write');
      expect(museCommand.name).toBe('muse');
      expect(writeCommand.args).toEqual(['outline']);
      expect(museCommand.args).toEqual(['test story']);
    });
  });
});
