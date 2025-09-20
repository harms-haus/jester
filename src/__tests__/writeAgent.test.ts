/**
 * Unit tests for WriteAgent
 */

// Mock fs-extra before importing
jest.mock('fs-extra', () => ({
  pathExists: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
  stat: jest.fn(),
  ensureDir: jest.fn(),
  appendFile: jest.fn()
}));

// Mock yaml before importing
jest.mock('yaml', () => ({
  parse: jest.fn(),
  stringify: jest.fn()
}));

// Mock FileUtils before importing
jest.mock('../utils/fileUtils', () => ({
  FileUtils: jest.fn().mockImplementation(() => ({
    createOutlineFile: jest.fn(),
    createStoryFile: jest.fn(),
    generateOutlineFilename: jest.fn(),
    generateStoryFilename: jest.fn()
  }))
}));

import { WriteAgent, WriteAgentOptions } from '../agents/writeAgent';
import { StoryContext, StoryOutline, DetailedPlotPoint, Story } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { FileUtils } from '../utils/fileUtils';

describe('WriteAgent', () => {
  let writeAgent: WriteAgent;
  let mockContext: StoryContext;
  let mockFileUtils: jest.Mocked<FileUtils>;

  beforeEach(() => {
    writeAgent = new WriteAgent();
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Set up default mocks
    (fs.readdir as any).mockResolvedValue([]);
    (fs.stat as any).mockResolvedValue({ mtime: new Date() });
    
    // Get the mocked FileUtils instance
    mockFileUtils = (writeAgent as any).fileUtils;
    
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
          {
            id: 'char1',
            name: 'Luna',
            type: 'character'
          }
        ],
        locations: [
          {
            id: 'loc1',
            name: 'Magic Forest',
            type: 'location'
          }
        ],
        items: []
      },
      plot_template: 'heroes_journey',
      plot_points: [
        {
          id: 'plot1',
          title: 'Call to Adventure',
          description: 'Luna discovers a magical door',
          order: 1
        }
      ],
      location_progression: [],
      morals: ['helping others', 'being brave'],
      themes: ['friendship', 'adventure'],
      metadata: {
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        version: 1
      }
    };
  });

  describe('generateOutline', () => {
    it('should generate outline from context', async () => {
      // Mock context file reading
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockContext);

      const result = await writeAgent.generateOutline({ contextFile: 'test-context.yaml' });

      expect(result).toBeDefined();
      expect(result.title).toBe('Test Story');
      expect(result.plot_points).toBeDefined();
      expect(Array.isArray(result.plot_points)).toBe(true);
    });

    it('should handle context file reading', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockContext);

      await writeAgent.generateOutline({ contextFile: 'test-context.yaml' });

      expect(fs.pathExists).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalled();
      expect(yaml.parse).toHaveBeenCalledWith('yaml content');
    });

    it('should throw error for missing context file', async () => {
      (fs.pathExists as any).mockResolvedValue(false);

      await expect(writeAgent.generateOutline({ contextFile: 'nonexistent.yaml' })).rejects.toThrow('Context file not found');
    });

    it('should throw error for invalid context structure', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue({}); // Missing required fields

      await expect(writeAgent.generateOutline({ contextFile: 'invalid-context.yaml' })).rejects.toThrow('Missing required field in context: title');
    });
  });

  describe('saveOutline', () => {
    it('should save outline to file', async () => {
      const outline: StoryOutline = {
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
        plot_points: [
          {
            id: 'plot1',
            title: 'Call to Adventure',
            description: 'Luna discovers a magical door',
            order: 1,
            characters: ['Luna'],
            location: 'Magic Forest',
            estimated_words: 150
          }
        ],
        estimated_word_count: 150,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (mockFileUtils.createOutlineFile as any).mockResolvedValue('outlines/test-outline.yaml');

      const result = await writeAgent.saveOutline(outline, 'test-outline.yaml');

      expect(mockFileUtils.createOutlineFile).toHaveBeenCalledWith(outline, 'test-outline.yaml');
      expect(result).toBe('outlines/test-outline.yaml');
    });

    it('should generate filename if not provided', async () => {
      const outline: StoryOutline = {
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
        plot_points: [],
        estimated_word_count: 0,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (mockFileUtils.createOutlineFile as any).mockResolvedValue('outlines/test-story-2025-09-20T23-53-30-227Z.md');

      const result = await writeAgent.saveOutline(outline);

      expect(mockFileUtils.createOutlineFile).toHaveBeenCalledWith(outline, undefined);
      expect(result).toBe('outlines/test-story-2025-09-20T23-53-30-227Z.md');
    });
  });

  describe('generateAndSaveOutline', () => {
    it('should generate and save outline in one operation', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockContext);
      (mockFileUtils.createOutlineFile as any).mockResolvedValue('outlines/test-outline.yaml');

      const result = await writeAgent.generateAndSaveOutline({ contextFile: 'test-context.yaml' });

      expect(result).toBeDefined();
      expect(result.outline).toBeDefined();
      expect(result.outline.title).toBe('Test Story');
      expect(mockFileUtils.createOutlineFile).toHaveBeenCalled();
    });

    it('should handle errors during generation and saving', async () => {
      (fs.pathExists as any).mockResolvedValue(false);

      await expect(writeAgent.generateAndSaveOutline({ contextFile: 'invalid-context.yaml' })).rejects.toThrow();
    });
  });

  describe('error handling', () => {
    it('should handle file system errors gracefully', async () => {
      (fs.pathExists as any).mockRejectedValue(new Error('File system error'));

      await expect(writeAgent.generateOutline({ contextFile: 'test-context.yaml' })).rejects.toThrow();
    });

    it('should handle YAML parsing errors', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('invalid yaml');
      (yaml.parse as any).mockImplementation(() => {
        throw new Error('YAML parsing error');
      });

      await expect(writeAgent.generateOutline({ contextFile: 'test-context.yaml' })).rejects.toThrow();
    });

    it('should handle missing context files directory', async () => {
      (fs.readdir as any).mockRejectedValue(new Error('Directory not found'));

      await expect(writeAgent.generateOutline({})).rejects.toThrow();
    });
  });

  describe('generateStory', () => {
    let mockOutline: StoryOutline;

    beforeEach(() => {
      mockOutline = {
        title: 'The Magic Forest Adventure',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        plot_points: [
          {
            id: 'plot1',
            title: 'Call to Adventure',
            description: 'Luna discovers a magical door in the forest',
            order: 1,
            characters: ['Luna'],
            location: 'Magic Forest',
            estimated_words: 150
          },
          {
            id: 'plot2',
            title: 'Meeting Mentor',
            description: 'Luna meets a wise owl who offers guidance',
            order: 2,
            characters: ['Luna', 'Owl'],
            location: 'Magic Forest',
            estimated_words: 200
          },
          {
            id: 'plot3',
            title: 'Return with Elixir',
            description: 'Luna returns home with newfound wisdom',
            order: 3,
            characters: ['Luna'],
            location: 'Home',
            estimated_words: 100
          }
        ],
        estimated_word_count: 450,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };
    });

    it('should generate story from outline', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.title).toBe('The Magic Forest Adventure');
      expect(result.content).toBeDefined();
      expect(result.word_count).toBeGreaterThan(0);
      expect(result.metadata.reading_time_minutes).toBeGreaterThan(0);
    });

    it('should read outline file from specified path', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(fs.pathExists).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalled();
      expect(yaml.parse).toHaveBeenCalledWith('yaml content');
    });

    it('should throw error for missing outline file', async () => {
      (fs.pathExists as any).mockResolvedValue(false);

      await expect(writeAgent.generateStory({ contextFile: 'nonexistent.yaml' })).rejects.toThrow('Outline file not found');
    });

    it('should throw error for invalid outline structure', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue({}); // Missing required fields

      await expect(writeAgent.generateStory({ contextFile: 'invalid-outline.yaml' })).rejects.toThrow('Missing required field in outline: title');
    });

    it('should generate story content with introduction, plot points, and conclusion', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toContain('Once upon a time'); // Introduction
      expect(result.content).toContain('Luna'); // Character names
      expect(result.content).toContain('magical door'); // Plot point content
      expect(result.content).toContain('wise owl'); // Another plot point
    });

    it('should generate age-appropriate content for 5-8 year olds', async () => {
      const youngChildOutline = {
        ...mockOutline,
        target_audience: { age_range: '5-8', reading_level: 'beginner' }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(youngChildOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      // Content should be simple and appropriate for young children
      expect(result.content.length).toBeGreaterThan(0);
    });

    it('should generate age-appropriate content for 8-12 year olds', async () => {
      const olderChildOutline = {
        ...mockOutline,
        target_audience: { age_range: '8-12', reading_level: 'intermediate' }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(olderChildOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      // Content should be more complex for older children
      expect(result.content.length).toBeGreaterThan(0);
    });

    it('should generate reading level appropriate content', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });

    it('should calculate word count correctly', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.word_count).toBeGreaterThan(0);
      expect(typeof result.word_count).toBe('number');
    });

    it('should calculate reading time correctly', async () => {
      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.metadata.reading_time_minutes).toBeGreaterThan(0);
      expect(typeof result.metadata.reading_time_minutes).toBe('number');
    });
  });

  describe('saveStory', () => {
    it('should save story to file', async () => {
      const story: Story = {
        title: 'The Magic Forest Adventure',
        content: 'Once upon a time...',
        word_count: 500,
        metadata: {
          outline_file: 'test-outline.yaml',
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString(),
          reading_time_minutes: 5
        }
      };

      (mockFileUtils.createStoryFile as any).mockResolvedValue('stories/test-story.md');

      const result = await writeAgent.saveStory(story, 'test-story.md');

      expect(mockFileUtils.createStoryFile).toHaveBeenCalledWith(story, 'test-story.md');
      expect(result).toBe('stories/test-story.md');
    });

    it('should generate filename if not provided', async () => {
      const story: Story = {
        title: 'The Magic Forest Adventure',
        content: 'Once upon a time...',
        word_count: 500,
        metadata: {
          outline_file: 'test-outline.yaml',
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString(),
          reading_time_minutes: 5
        }
      };

      (mockFileUtils.createStoryFile as any).mockResolvedValue('stories/the-magic-forest-adventure-2025-09-20T23-53-30-240Z.md');

      const result = await writeAgent.saveStory(story);

      expect(mockFileUtils.createStoryFile).toHaveBeenCalledWith(story, undefined);
      expect(result).toBe('stories/the-magic-forest-adventure-2025-09-20T23-53-30-240Z.md');
    });
  });

  describe('generateAndSaveStory', () => {
    it('should generate and save story in one operation', async () => {
      const mockOutline: StoryOutline = {
        title: 'The Magic Forest Adventure',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        plot_points: [
          {
            id: 'plot1',
            title: 'Call to Adventure',
            description: 'Luna discovers a magical door in the forest',
            order: 1,
            characters: ['Luna'],
            location: 'Magic Forest',
            estimated_words: 150
          }
        ],
        estimated_word_count: 150,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);
      (mockFileUtils.createStoryFile as any).mockResolvedValue('stories/test-story.md');

      const result = await writeAgent.generateAndSaveStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.story).toBeDefined();
      expect(result.story.title).toBe('The Magic Forest Adventure');
      expect(mockFileUtils.createStoryFile).toHaveBeenCalled();
    });

    it('should handle errors during generation and saving', async () => {
      (fs.pathExists as any).mockResolvedValue(false);

      await expect(writeAgent.generateAndSaveStory({ contextFile: 'invalid-outline.yaml' })).rejects.toThrow();
    });
  });

  describe('story content generation', () => {
    it('should generate character interactions for multiple characters', async () => {
      const mockOutline: StoryOutline = {
        title: 'The Magic Forest Adventure',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        plot_points: [
          {
            id: 'plot1',
            title: 'Meeting Mentor',
            description: 'Luna meets a wise owl who offers guidance',
            order: 1,
            characters: ['Luna', 'Owl'],
            location: 'Magic Forest',
            estimated_words: 200
          }
        ],
        estimated_word_count: 200,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toContain('Luna');
      expect(result.content).toContain('Owl');
    });

    it('should generate location details', async () => {
      const mockOutline: StoryOutline = {
        title: 'The Magic Forest Adventure',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        plot_points: [
          {
            id: 'plot1',
            title: 'Call to Adventure',
            description: 'Luna discovers a magical door in the forest',
            order: 1,
            characters: ['Luna'],
            location: 'Magic Forest',
            estimated_words: 150
          }
        ],
        estimated_word_count: 150,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toContain('Magic Forest');
      expect(result.content).toContain('magical door');
    });

    it('should generate plot progression based on position', async () => {
      const mockOutline: StoryOutline = {
        title: 'The Magic Forest Adventure',
        target_audience: {
          age_range: '5-8',
          reading_level: 'beginner'
        },
        target_length: {
          min_words: 500,
          max_words: 1000,
          final_target: 750
        },
        plot_points: [
          {
            id: 'plot1',
            title: 'Call to Adventure',
            description: 'Luna discovers a magical door in the forest',
            order: 1,
            characters: ['Luna'],
            location: 'Magic Forest',
            estimated_words: 150
          },
          {
            id: 'plot2',
            title: 'Return with Elixir',
            description: 'Luna returns home with newfound wisdom',
            order: 2,
            characters: ['Luna'],
            location: 'Home',
            estimated_words: 100
          }
        ],
        estimated_word_count: 250,
        metadata: {
          context_file: 'test-context.yaml',
          created_at: new Date().toISOString(),
          last_modified: new Date().toISOString()
        }
      };

      (fs.pathExists as any).mockResolvedValue(true);
      (fs.readFile as any).mockResolvedValue('yaml content');
      (yaml.parse as any).mockReturnValue(mockOutline);

      const result = await writeAgent.generateStory({ contextFile: 'test-outline.yaml' });

      expect(result).toBeDefined();
      expect(result.content).toContain('magical door');
      expect(result.content).toContain('newfound wisdom');
    });
  });
});