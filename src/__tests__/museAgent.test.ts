/**
 * Unit tests for MuseAgent
 */

import { MuseAgent, MuseAgentOptions } from '../agents/museAgent';
import { StoryContext } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';

// Mock fs-extra
jest.mock('fs-extra');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('MuseAgent', () => {
  let museAgent: MuseAgent;
  let mockContextsDir: string;

  beforeEach(() => {
    museAgent = new MuseAgent();
    mockContextsDir = path.join(process.cwd(), 'contexts');
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock fs-extra methods
    (mockedFs.ensureDir as any).mockResolvedValue(undefined);
    (mockedFs.writeFile as any).mockResolvedValue(undefined);
  });

  describe('generateContext', () => {
    it('should generate context with default options', async () => {
      const options: MuseAgentOptions = {};
      
      const context = await museAgent.generateContext(options);
      
      expect(context).toBeDefined();
      expect(context.title).toBeDefined();
      expect(context.target_audience).toBeDefined();
      expect(context.target_length).toBeDefined();
      expect(context.entities).toBeDefined();
      expect(context.plot_template).toBeDefined();
      expect(context.plot_points).toBeDefined();
      expect(context.morals).toBeDefined();
      expect(context.themes).toBeDefined();
      expect(context.metadata).toBeDefined();
    });

    it('should generate context with custom options', async () => {
      const options: MuseAgentOptions = {
        storyIdea: 'A brave little mouse adventure',
        ageRange: '5-8',
        readingLevel: 'beginner',
        targetLength: 800,
        plotTemplate: 'pixar',
        characters: ['Mouse', 'Cat', 'Cheese'],
        locations: ['Kitchen', 'Garden', 'House'],
        items: ['Cheese', 'Trap', 'Key'],
        themes: ['Courage', 'Friendship'],
        morals: ['Be brave', 'Help others']
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.title).toContain('Brave Little');
      expect(context.target_audience.age_range).toBe('5-8');
      expect(context.target_audience.reading_level).toBe('beginner');
      expect(context.target_length.final_target).toBe(800);
      expect(context.plot_template).toBe('pixar');
      expect(context.entities.characters).toHaveLength(3);
      expect(context.entities.locations).toHaveLength(3);
      expect(context.entities.items).toHaveLength(3);
      expect(context.themes).toEqual(['Courage', 'Friendship']);
      expect(context.morals).toEqual(['Be brave', 'Help others']);
    });

    it('should save context to file', async () => {
      const options: MuseAgentOptions = {
        storyIdea: 'Test story'
      };
      
      await museAgent.generateContext(options);
      
      expect(mockedFs.ensureDir).toHaveBeenCalledWith(mockContextsDir);
      expect(mockedFs.writeFile).toHaveBeenCalled();
    });

    it('should handle errors during context generation', async () => {
      (mockedFs.ensureDir as any).mockRejectedValue(new Error('Directory creation failed'));
      
      const options: MuseAgentOptions = {};
      
      await expect(museAgent.generateContext(options)).rejects.toThrow();
    });
  });

  describe('plot template generation', () => {
    it('should generate heroes journey plot points', async () => {
      const options: MuseAgentOptions = {
        plotTemplate: 'heroes_journey',
        storyIdea: 'A magical quest'
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.plot_template).toBe('heroes_journey');
      expect(context.plot_points).toHaveLength(11);
      expect(context.plot_points[0]?.title).toBe('Call to Adventure');
      expect(context.plot_points[10]?.title).toBe('Return with the Elixir');
    });

    it('should generate pixar plot points', async () => {
      const options: MuseAgentOptions = {
        plotTemplate: 'pixar',
        storyIdea: 'A character story'
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.plot_template).toBe('pixar');
      expect(context.plot_points).toHaveLength(6);
      expect(context.plot_points[0]?.title).toBe('Once Upon a Time');
      expect(context.plot_points[5]?.title).toBe('Until Finally');
    });

    it('should generate golden circle plot points', async () => {
      const options: MuseAgentOptions = {
        plotTemplate: 'golden_circle',
        storyIdea: 'A purpose-driven story'
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.plot_template).toBe('golden_circle');
      expect(context.plot_points).toHaveLength(5);
      expect(context.plot_points[0]?.title).toBe('Why - The Purpose');
      expect(context.plot_points[4]?.title).toBe('Resolution');
    });
  });

  describe('age range and reading level', () => {
    it('should determine reading level based on age range', async () => {
      const testCases = [
        { ageRange: '3-5', expectedLevel: 'beginner' },
        { ageRange: '5-8', expectedLevel: 'beginner' },
        { ageRange: '8-12', expectedLevel: 'intermediate' },
        { ageRange: '12+', expectedLevel: 'advanced' }
      ];

      for (const testCase of testCases) {
        const options: MuseAgentOptions = {
          ageRange: testCase.ageRange
        };
        
        const context = await museAgent.generateContext(options);
        
        expect(context.target_audience.reading_level).toBe(testCase.expectedLevel);
      }
    });

    it('should calculate target length based on age range', async () => {
      const testCases = [
        { ageRange: '3-5', expectedMinLength: 400 }, // 500 * 0.8
        { ageRange: '5-8', expectedMinLength: 400 }, // 500 * 0.8
        { ageRange: '8-12', expectedMinLength: 800 }, // 1000 * 0.8
        { ageRange: '12+', expectedMinLength: 1200 } // 1500 * 0.8
      ];

      for (const testCase of testCases) {
        const options: MuseAgentOptions = {
          ageRange: testCase.ageRange
        };
        
        const context = await museAgent.generateContext(options);
        
        expect(context.target_length.min_words).toBe(testCase.expectedMinLength);
      }
    });
  });

  describe('entity generation', () => {
    it('should generate character entities', async () => {
      const options: MuseAgentOptions = {
        characters: ['Hero', 'Villain', 'Mentor']
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.entities.characters).toHaveLength(3);
      expect(context.entities.characters[0]?.name).toBe('Hero');
      expect(context.entities.characters[0]?.type).toBe('character');
      expect(context.entities.characters[0]?.id).toBe('char_1');
    });

    it('should generate location entities', async () => {
      const options: MuseAgentOptions = {
        locations: ['Home', 'Forest', 'Castle']
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.entities.locations).toHaveLength(3);
      expect(context.entities.locations[0]?.name).toBe('Home');
      expect(context.entities.locations[0]?.type).toBe('location');
      expect(context.entities.locations[0]?.id).toBe('loc_1');
    });

    it('should generate item entities', async () => {
      const options: MuseAgentOptions = {
        items: ['Sword', 'Shield', 'Potion']
      };
      
      const context = await museAgent.generateContext(options);
      
      expect(context.entities.items).toHaveLength(3);
      expect(context.entities.items[0]?.name).toBe('Sword');
      expect(context.entities.items[0]?.type).toBe('item');
      expect(context.entities.items[0]?.id).toBe('item_1');
    });
  });

  describe('utility methods', () => {
    it('should return available plot templates', () => {
      const templates = museAgent.getPlotTemplates();
      
      expect(templates).toContain('heroes_journey');
      expect(templates).toContain('pixar');
      expect(templates).toContain('golden_circle');
      expect(templates).toHaveLength(3);
    });

    it('should return age range suggestions', () => {
      const ageRanges = museAgent.getAgeRangeSuggestions();
      
      expect(ageRanges).toContain('3-5');
      expect(ageRanges).toContain('5-8');
      expect(ageRanges).toContain('8-12');
      expect(ageRanges).toContain('12+');
      expect(ageRanges).toHaveLength(4);
    });

    it('should return reading level suggestions', () => {
      const readingLevels = museAgent.getReadingLevelSuggestions();
      
      expect(readingLevels).toContain('beginner');
      expect(readingLevels).toContain('intermediate');
      expect(readingLevels).toContain('advanced');
      expect(readingLevels).toHaveLength(3);
    });
  });

  describe('metadata generation', () => {
    it('should generate proper metadata', async () => {
      const options: MuseAgentOptions = {};
      
      const context = await museAgent.generateContext(options);
      
      expect(context.metadata.created_at).toBeDefined();
      expect(context.metadata.last_modified).toBeDefined();
      expect(context.metadata.version).toBe(1);
      expect(new Date(context.metadata.created_at)).toBeInstanceOf(Date);
      expect(new Date(context.metadata.last_modified)).toBeInstanceOf(Date);
    });
  });
});
