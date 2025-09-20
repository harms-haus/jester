/**
 * File utilities for jester storytelling system
 * Handles file creation, validation, and pipeline management
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { StoryContext, StoryOutline, Story } from '../types/index';
import { errorHandler } from './errorHandler';

export class FileUtils {
  private templatesPath: string;
  private contextsPath: string;
  private outlinesPath: string;
  private storiesPath: string;

  constructor() {
    this.templatesPath = path.join(process.cwd(), '.jester', 'templates');
    this.contextsPath = path.join(process.cwd(), 'contexts');
    this.outlinesPath = path.join(process.cwd(), 'outlines');
    this.storiesPath = path.join(process.cwd(), 'stories');
  }

  /**
   * Create a new context file from template
   */
  public async createContextFile(context: StoryContext, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'context.yaml');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, context.title)
        .replace(/\{\{AGE_RANGE\}\}/g, context.target_audience.age_range)
        .replace(/\{\{READING_LEVEL\}\}/g, context.target_audience.reading_level)
        .replace(/\{\{MIN_WORDS\}\}/g, context.target_length.min_words.toString())
        .replace(/\{\{MAX_WORDS\}\}/g, context.target_length.max_words.toString())
        .replace(/\{\{FINAL_TARGET\}\}/g, context.target_length.final_target.toString())
        .replace(/\{\{PLOT_TEMPLATE\}\}/g, context.plot_template)
        .replace(/\{\{CREATED_AT\}\}/g, context.metadata.created_at)
        .replace(/\{\{LAST_MODIFIED\}\}/g, context.metadata.last_modified)
        .replace(/\{\{VERSION\}\}/g, context.metadata.version.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateContextFilename(context.title);
      const filePath = path.join(this.contextsPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create context file', error);
      throw error;
    }
  }

  /**
   * Create a new outline file from template
   */
  public async createOutlineFile(outline: StoryOutline, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'outline.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, outline.title)
        .replace(/\{\{AGE_RANGE\}\}/g, outline.target_audience.age_range)
        .replace(/\{\{READING_LEVEL\}\}/g, outline.target_audience.reading_level)
        .replace(/\{\{MIN_WORDS\}\}/g, outline.target_length.min_words.toString())
        .replace(/\{\{MAX_WORDS\}\}/g, outline.target_length.max_words.toString())
        .replace(/\{\{FINAL_TARGET\}\}/g, outline.target_length.final_target.toString())
        .replace(/\{\{CREATED_AT\}\}/g, outline.metadata.created_at)
        .replace(/\{\{CONTEXT_FILE\}\}/g, outline.metadata.context_file)
        .replace(/\{\{ESTIMATED_WORD_COUNT\}\}/g, outline.estimated_word_count.toString());

      // Generate filename if not provided
      const finalFilename = filename || this.generateOutlineFilename(outline.title);
      const filePath = path.join(this.outlinesPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create outline file', error);
      throw error;
    }
  }

  /**
   * Create a new story file from template
   */
  public async createStoryFile(story: Story, filename?: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, 'story.md');
      const template = await fs.readFile(templatePath, 'utf-8');
      
      // Replace template variables with actual values
      let content = template
        .replace(/\{\{STORY_TITLE\}\}/g, story.title)
        .replace(/\{\{STORY_CONTENT\}\}/g, story.content)
        .replace(/\{\{WORD_COUNT\}\}/g, story.word_count.toString())
        .replace(/\{\{READING_TIME_MINUTES\}\}/g, story.metadata.reading_time_minutes.toString())
        .replace(/\{\{CREATED_AT\}\}/g, story.metadata.created_at)
        .replace(/\{\{OUTLINE_FILE\}\}/g, story.metadata.outline_file)
        .replace(/\{\{CONTEXT_FILE\}\}/g, story.metadata.context_file);

      // Generate filename if not provided
      const finalFilename = filename || this.generateStoryFilename(story.title);
      const filePath = path.join(this.storiesPath, finalFilename);

      await fs.writeFile(filePath, content, 'utf-8');
      return filePath;
    } catch (error) {
      errorHandler.logError('Failed to create story file', error);
      throw error;
    }
  }

  /**
   * Validate file structure and content
   */
  public async validateFile(filePath: string): Promise<boolean> {
    try {
      if (!await fs.pathExists(filePath)) {
        return false;
      }

      const content = await fs.readFile(filePath, 'utf-8');
      const ext = path.extname(filePath);

      switch (ext) {
        case '.yaml':
        case '.yml':
          return this.validateYamlFile(content);
        case '.md':
          return this.validateMarkdownFile(content);
        default:
          return true; // Assume valid for other file types
      }
    } catch (error) {
      errorHandler.logError(`Failed to validate file: ${filePath}`, error);
      return false;
    }
  }

  /**
   * Validate YAML file content
   */
  private validateYamlFile(content: string): boolean {
    try {
      yaml.parse(content);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validate Markdown file content
   */
  private validateMarkdownFile(content: string): boolean {
    // Basic validation - check for required sections
    const requiredSections = ['#', '##'];
    return requiredSections.some(section => content.includes(section));
  }

  /**
   * Generate context filename
   */
  private generateContextFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.yaml`;
  }

  /**
   * Generate outline filename
   */
  private generateOutlineFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.md`;
  }

  /**
   * Generate story filename
   */
  private generateStoryFilename(title: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `${sanitizedTitle}-${timestamp}.md`;
  }

  /**
   * Ensure directory exists
   */
  public async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
    } catch (error) {
      errorHandler.logError(`Failed to create directory: ${dirPath}`, error);
      throw error;
    }
  }

  /**
   * Get file statistics
   */
  public async getFileStats(filePath: string): Promise<fs.Stats | null> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      errorHandler.logError(`Failed to get file stats: ${filePath}`, error);
      return null;
    }
  }
}
