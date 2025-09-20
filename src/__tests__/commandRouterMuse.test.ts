/**
 * Unit tests for CommandRouter muse command integration
 */

import { CommandRouter } from '../agents/commandRouter';
import { Command } from '../types/index';

// Mock the muse agent
jest.mock('../agents/museAgent');
import { MuseAgent } from '../agents/museAgent';
const MockedMuseAgent = MuseAgent as jest.MockedClass<typeof MuseAgent>;

describe('CommandRouter - Muse Command', () => {
  let commandRouter: CommandRouter;
  let mockMuseAgent: jest.Mocked<MuseAgent>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock muse agent
    mockMuseAgent = {
      generateContext: jest.fn(),
      getPlotTemplates: jest.fn(),
      getAgeRangeSuggestions: jest.fn(),
      getReadingLevelSuggestions: jest.fn()
    } as any;

    // Mock the MuseAgent constructor
    MockedMuseAgent.mockImplementation(() => mockMuseAgent);
    
    // Mock the agent loading
    jest.spyOn(CommandRouter.prototype as any, 'loadAgents').mockResolvedValue(undefined);
    
    commandRouter = new CommandRouter();
    
    // Manually set the agents map to include muse
    (commandRouter as any).agents.set('muse', {
      name: 'Muse',
      id: 'muse',
      title: 'Story Context Generator',
      icon: '🎭',
      whenToUse: 'Use for generating story context and initial story ideas',
      commands: ['generate-context'],
      dependencies: {}
    });
  });

  describe('muse command parsing', () => {
    it('should parse basic muse command', () => {
      const commandString = '/muse "A brave little mouse"';
      const command = commandRouter.parseCommand(commandString);
      
      expect(command.name).toBe('muse');
      expect(command.args).toEqual(['"A', 'brave', 'little', 'mouse"']);
      expect(command.options).toEqual({});
    });

    it('should parse muse command with options', () => {
      const commandString = '/muse "Space adventure" --ageRange="8-12" --plotTemplate="heroes_journey"';
      const command = commandRouter.parseCommand(commandString);
      
      expect(command.name).toBe('muse');
      expect(command.args).toEqual(['"Space', 'adventure"']);
      expect(command.options).toEqual({
        ageRange: '"8-12"',
        plotTemplate: '"heroes_journey"'
      });
    });

    it('should parse muse command with multiple options', () => {
      const commandString = '/muse "Dragon story" --ageRange="5-8" --characters="Knight,Dragon,Princess" --themes="Courage,Friendship"';
      const command = commandRouter.parseCommand(commandString);
      
      expect(command.name).toBe('muse');
      expect(command.args).toEqual(['"Dragon', 'story"']);
      expect(command.options).toEqual({
        ageRange: '"5-8"',
        characters: '"Knight,Dragon,Princess"',
        themes: '"Courage,Friendship"'
      });
    });
  });

  describe('muse command execution', () => {
    it('should execute muse command successfully', async () => {
      const mockContext = {
        title: 'Test Story',
        target_audience: { age_range: '5-8', reading_level: 'beginner' },
        target_length: { min_words: 400, max_words: 600, final_target: 500 },
        entities: { characters: [], locations: [], items: [] },
        plot_template: 'heroes_journey',
        plot_points: [],
        location_progression: [],
        morals: [],
        themes: [],
        metadata: { created_at: '2024-12-19T00:00:00.000Z', last_modified: '2024-12-19T00:00:00.000Z', version: 1 }
      };

      mockMuseAgent.generateContext.mockResolvedValue(mockContext as any);

      const command: Command = {
        name: 'muse',
        args: ['"A', 'brave', 'little', 'mouse"'],
        options: { ageRange: '5-8' }
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Story context generated successfully');
      expect(result.data).toBeDefined();
      expect(result.data.context).toEqual(mockContext);
      expect(mockMuseAgent.generateContext).toHaveBeenCalledWith({
        storyIdea: '"A brave little mouse"',
        ageRange: '5-8',
        readingLevel: undefined,
        targetLength: undefined,
        plotTemplate: undefined,
        characters: undefined,
        locations: undefined,
        items: undefined,
        themes: undefined,
        morals: undefined
      });
    });

    it('should handle muse command with all options', async () => {
      const mockContext = {
        title: 'Test Story',
        target_audience: { age_range: '8-12', reading_level: 'intermediate' },
        target_length: { min_words: 800, max_words: 1200, final_target: 1000 },
        entities: { characters: [], locations: [], items: [] },
        plot_template: 'pixar',
        plot_points: [],
        location_progression: [],
        morals: [],
        themes: [],
        metadata: { created_at: '2024-12-19T00:00:00.000Z', last_modified: '2024-12-19T00:00:00.000Z', version: 1 }
      };

      mockMuseAgent.generateContext.mockResolvedValue(mockContext as any);

      const command: Command = {
        name: 'muse',
        args: ['"Space', 'adventure"'],
        options: {
          ageRange: '8-12',
          readingLevel: 'intermediate',
          targetLength: '1000',
          plotTemplate: 'pixar',
          characters: 'Astronaut,Robot,Alien',
          locations: 'Space,Planet,Station',
          items: 'Spaceship,Key,Treasure',
          themes: 'Exploration,Friendship',
          morals: 'Be brave,Help others'
        }
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(true);
      expect(mockMuseAgent.generateContext).toHaveBeenCalledWith({
        storyIdea: '"Space adventure"',
        ageRange: '8-12',
        readingLevel: 'intermediate',
        targetLength: 1000,
        plotTemplate: 'pixar',
        characters: ['Astronaut', 'Robot', 'Alien'],
        locations: ['Space', 'Planet', 'Station'],
        items: ['Spaceship', 'Key', 'Treasure'],
        themes: ['Exploration', 'Friendship'],
        morals: ['Be brave', 'Help others']
      });
    });

    it('should handle muse command errors', async () => {
      mockMuseAgent.generateContext.mockRejectedValue(new Error('Generation failed'));

      const command: Command = {
        name: 'muse',
        args: ['Test', 'story'],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to generate story context');
      expect(result.error).toBeDefined();
    });
  });

  describe('muse command help', () => {
    it('should provide help for muse command', () => {
      const helpResult = commandRouter.getCommandHelp('muse');

      expect(helpResult.success).toBe(true);
      expect(helpResult.message).toContain('Help for');
      expect(helpResult.data).toBeDefined();
      expect(helpResult.data.usage).toBe('/muse [story idea] [options]');
      expect(helpResult.data.options).toBeDefined();
      expect(helpResult.data.examples).toBeDefined();
      expect(helpResult.data.options['--ageRange']).toBeDefined();
      expect(helpResult.data.options['--plotTemplate']).toBeDefined();
    });
  });

  describe('command validation', () => {
    it('should handle unknown command', async () => {
      const command: Command = {
        name: 'unknown',
        args: [],
        options: {}
      };

      const result = await commandRouter.routeCommand(command);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown command');
    });

    it('should handle empty command', () => {
      expect(() => commandRouter.parseCommand('')).toThrow('Invalid command string');
    });

    it('should handle invalid command format', () => {
      expect(() => commandRouter.parseCommand('   ')).toThrow('Invalid command string');
    });
  });
});
