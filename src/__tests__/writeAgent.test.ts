/**
 * Unit tests for WriteAgent
 */

import { WriteAgent, WriteAgentOptions } from '../agents/writeAgent';
import { StoryContext, StoryOutline, DetailedPlotPoint } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';

// Mock fs-extra
jest.mock('fs-extra');
const mockedFs = {
  pathExists: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
  stat: jest.fn(),
  ensureDir: jest.fn(),
  appendFile: jest.fn()
} as any;

// Mock yaml
jest.mock('yaml');
const mockedYaml = {
  parse: jest.fn()
} as any;

describe('WriteAgent', () => {
  let writeAgent: WriteAgent;
  let mockContext: StoryContext;

  beforeEach(() => {
    writeAgent = new WriteAgent();
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock context
    mockContext = {
      title: 'Test Story',
      target_audience: {
        age_range: '5-8',
        reading_level: 'beginner'
      },
      target_length: {
        min_words: 500,
        max_words: 1000,
        final_target: 750
      },
      entities: {
        characters: [
          { id: 'char1', name: 'Alice', type: 'character' },
          { id: 'char2', name: 'Bob', type: 'character' }
        ],
        locations: [
          { id: 'loc1', name: 'Forest', type: 'location' },
          { id: 'loc2', name: 'Castle', type: 'location' }
        ],
        items: [
          { id: 'item1', name: 'Magic Sword', type: 'item' }
        ]
      },
      plot_template: 'heroes_journey',
      plot_points: [
        {
          id: 'point1',
          title: 'The Call to Adventure',
          description: 'Alice discovers a mysterious door',
          order: 1
        },
        {
          id: 'point2',
          title: 'Crossing the Threshold',
          description: 'Alice enters the magical world',
          order: 2
        },
        {
          id: 'point3',
          title: 'The Return',
          description: 'Alice returns home with wisdom',
          order: 3
        }
      ],
      location_progression: [
        { from: 'Forest', to: 'Castle', description: 'Journey to the castle' }
      ],
      morals: ['Courage', 'Friendship'],
      themes: ['Adventure', 'Growth'],
      metadata: {
        created_at: '2024-01-01T00:00:00Z',
        last_modified: '2024-01-01T00:00:00Z',
        version: 1
      }
    };
  });

  describe('generateOutline', () => {
    it('should generate outline from context', async () => {
      const options: WriteAgentOptions = {};
      
      // Mock the private method by accessing it through the class
      const generateOutlineSpy = jest.spyOn(writeAgent as any, 'readContextFile')
        .mockResolvedValue(mockContext);

      const result = await writeAgent.generateOutline(options);

      expect(result).toBeDefined();
      expect(result.title).toBe(mockContext.title);
      expect(result.target_audience).toEqual(mockContext.target_audience);
      expect(result.target_length).toEqual(mockContext.target_length);
      expect(result.plot_points).toHaveLength(3);
      expect(result.estimated_word_count).toBeGreaterThan(0);
      expect(result.metadata.context_file).toBe('unknown');
      expect(result.metadata.created_at).toBeDefined();
      expect(result.metadata.last_modified).toBeDefined();

      generateOutlineSpy.mockRestore();
    });

    it('should handle context file reading', async () => {
      const options: WriteAgentOptions = {
        contextFile: 'test-context.yaml'
      };

      // Mock file system operations
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(mockContext);

      const result = await writeAgent.generateOutline(options);

      expect(mockedFs.pathExists).toHaveBeenCalledWith(
        expect.stringContaining('test-context.yaml')
      );
      expect(mockedFs.readFile).toHaveBeenCalled();
      expect(mockedYaml.parse).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw error for missing context file', async () => {
      const options: WriteAgentOptions = {
        contextFile: 'nonexistent.yaml'
      };

      mockedFs.pathExists.mockResolvedValue(false);

      await expect(writeAgent.generateOutline(options))
        .rejects.toThrow('Context file not found');
    });

    it('should throw error for invalid context structure', async () => {
      const invalidContext = { ...mockContext, title: undefined };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(invalidContext);

      await expect(writeAgent.generateOutline({}))
        .rejects.toThrow('Missing required field in context: title');
    });
  });

  describe('generateDetailedPlotPoints', () => {
    it('should generate detailed plot points with proper structure', async () => {
      const generateDetailedPlotPointsSpy = jest.spyOn(writeAgent as any, 'generateDetailedPlotPoints')
        .mockResolvedValue([
          {
            id: 'point1',
            title: 'The Call to Adventure',
            description: 'Alice discovers a mysterious door. This marks the beginning of the hero\'s journey in the Ordinary World phase. The protagonist is about to embark on an adventure that will change their life forever.',
            characters: ['Alice'],
            location: 'Forest',
            estimated_words: 250,
            order: 1
          }
        ]);

      const result = await writeAgent.generateOutline({});

      expect(generateDetailedPlotPointsSpy).toHaveBeenCalled();
      expect(result.plot_points).toBeDefined();

      generateDetailedPlotPointsSpy.mockRestore();
    });

    it('should assign characters based on plot template', async () => {
      const assignCharactersSpy = jest.spyOn(writeAgent as any, 'assignCharactersToPlotPoint')
        .mockReturnValue(['Alice', 'Bob']);

      const result = await writeAgent.generateOutline({});

      expect(assignCharactersSpy).toHaveBeenCalled();
      expect(result.plot_points[0]?.characters).toEqual(['Alice', 'Bob']);

      assignCharactersSpy.mockRestore();
    });

    it('should assign locations based on plot template', async () => {
      const assignLocationSpy = jest.spyOn(writeAgent as any, 'assignLocationToPlotPoint')
        .mockReturnValue('Forest');

      const result = await writeAgent.generateOutline({});

      expect(assignLocationSpy).toHaveBeenCalled();
      expect(result.plot_points[0]?.location).toBe('Forest');

      assignLocationSpy.mockRestore();
    });
  });

  describe('saveOutline', () => {
    it('should save outline to file', async () => {
      const mockOutline: StoryOutline = {
        title: 'Test Story',
        target_audience: mockContext.target_audience,
        target_length: mockContext.target_length,
        plot_points: [],
        estimated_word_count: 750,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z'
        }
      };

      // Mock file operations
      mockedFs.readFile.mockResolvedValue('template content');
      mockedFs.writeFile.mockResolvedValue(undefined);

      const result = await writeAgent.saveOutline(mockOutline, 'test-outline.md');

      expect(mockedFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining('outline.md'),
        'utf-8'
      );
      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-outline.md'),
        expect.any(String),
        'utf-8'
      );
      expect(result).toContain('test-outline.md');
    });

    it('should generate filename if not provided', async () => {
      const mockOutline: StoryOutline = {
        title: 'Test Story',
        target_audience: mockContext.target_audience,
        target_length: mockContext.target_length,
        plot_points: [],
        estimated_word_count: 750,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z'
        }
      };

      mockedFs.readFile.mockResolvedValue('template content');
      mockedFs.writeFile.mockResolvedValue(undefined);

      const result = await writeAgent.saveOutline(mockOutline);

      expect(result).toContain('test-story-');
      expect(result).toContain('.md');
    });
  });

  describe('generateAndSaveOutline', () => {
    it('should generate and save outline in one operation', async () => {
      const options: WriteAgentOptions = {
        contextFile: 'test-context.yaml'
      };

      // Mock all dependencies
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(mockContext);

      const result = await writeAgent.generateAndSaveOutline(options);

      expect(result).toBeDefined();
      expect(result.outline).toBeDefined();
      expect(result.filePath).toBeDefined();
      expect(result.outline.title).toBe(mockContext.title);
    });

    it('should handle errors during generation and saving', async () => {
      const options: WriteAgentOptions = {
        contextFile: 'invalid-context.yaml'
      };

      mockedFs.pathExists.mockResolvedValue(false);

      await expect(writeAgent.generateAndSaveOutline(options))
        .rejects.toThrow();
    });
  });

  describe('plot template enhancements', () => {
    it('should enhance descriptions for Hero\'s Journey template', async () => {
      const heroContext = { ...mockContext, plot_template: 'heroes_journey' };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(heroContext);

      const result = await writeAgent.generateOutline({});

      expect(result.plot_points[0]?.description).toContain('hero\'s journey');
      expect(result.plot_points[0]?.description).toContain('Ordinary World');
    });

    it('should enhance descriptions for Pixar template', async () => {
      const pixarContext = { ...mockContext, plot_template: 'pixar' };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(pixarContext);

      const result = await writeAgent.generateOutline({});

      expect(result.plot_points[0]?.description).toContain('character\'s world');
      expect(result.plot_points[0]?.description).toContain('daily routine');
    });

    it('should enhance descriptions for Golden Circle template', async () => {
      const goldenContext = { ...mockContext, plot_template: 'golden_circle' };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(goldenContext);

      const result = await writeAgent.generateOutline({});

      expect(result.plot_points[0]?.description).toContain('purpose');
      expect(result.plot_points[0]?.description).toContain('motivation');
    });
  });

  describe('character assignment', () => {
    it('should assign characters based on Hero\'s Journey stages', async () => {
      const heroContext = { ...mockContext, plot_template: 'heroes_journey' };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(heroContext);

      const result = await writeAgent.generateOutline({});

      // Early stages should have main character + mentor
      expect(result.plot_points[0]?.characters).toContain('Alice');
      if (result.plot_points[0]?.characters && result.plot_points[0].characters.length > 1) {
        expect(result.plot_points[0].characters).toContain('Bob');
      }
    });

    it('should limit characters per plot point to maximum of 3', async () => {
      const manyCharactersContext = {
        ...mockContext,
        entities: {
          ...mockContext.entities,
          characters: [
            { id: 'char1', name: 'Alice', type: 'character' },
            { id: 'char2', name: 'Bob', type: 'character' },
            { id: 'char3', name: 'Charlie', type: 'character' },
            { id: 'char4', name: 'Diana', type: 'character' }
          ]
        }
      };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(manyCharactersContext);

      const result = await writeAgent.generateOutline({});

      result.plot_points.forEach(point => {
        expect(point.characters.length).toBeLessThanOrEqual(3);
      });
    });
  });

  describe('location assignment', () => {
    it('should assign locations based on plot template', async () => {
      const heroContext = { ...mockContext, plot_template: 'heroes_journey' };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(heroContext);

      const result = await writeAgent.generateOutline({});

      expect(result.plot_points[0]?.location).toBeDefined();
      expect(result.plot_points[0]?.location).not.toBe('Unknown Location');
    });

    it('should use location progression if available', async () => {
      const contextWithProgression = {
        ...mockContext,
        location_progression: [
          { from: 'Forest', to: 'Castle', description: 'Journey to castle' },
          { from: 'Castle', to: 'Tower', description: 'Climb to tower' }
        ]
      };
      
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(contextWithProgression);

      const result = await writeAgent.generateOutline({});

      expect(result.plot_points[0]?.location).toBe('Castle');
      expect(result.plot_points[1]?.location).toBe('Tower');
    });
  });

  describe('word count calculation', () => {
    it('should calculate estimated word count for plot points', async () => {
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(mockContext);

      const result = await writeAgent.generateOutline({});

      result.plot_points.forEach(point => {
        expect(point.estimated_words).toBeGreaterThan(0);
        expect(typeof point.estimated_words).toBe('number');
      });
    });

    it('should calculate total estimated word count', async () => {
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('mock yaml content');
      mockedYaml.parse.mockReturnValue(mockContext);

      const result = await writeAgent.generateOutline({});

      const totalWords = result.plot_points.reduce((sum, point) => sum + point.estimated_words, 0);
      expect(result.estimated_word_count).toBe(totalWords);
    });
  });

  describe('error handling', () => {
    it('should handle file system errors gracefully', async () => {
      mockedFs.pathExists.mockRejectedValue(new Error('File system error'));

      await expect(writeAgent.generateOutline({}))
        .rejects.toThrow();
    });

    it('should handle YAML parsing errors', async () => {
      mockedFs.pathExists.mockResolvedValue(true);
      mockedFs.readFile.mockResolvedValue('invalid yaml content');
      mockedYaml.parse.mockImplementation(() => {
        throw new Error('YAML parsing error');
      });

      await expect(writeAgent.generateOutline({}))
        .rejects.toThrow();
    });

    it('should handle missing context files directory', async () => {
      mockedFs.readdir.mockRejectedValue(new Error('Directory not found'));

      await expect(writeAgent.generateOutline({}))
        .rejects.toThrow();
    });
  });
});
