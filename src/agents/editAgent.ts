/**
 * Edit Agent for jester storytelling system
 * Handles file editing operations for contexts, outlines, and stories
 */

import fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'yaml';
import { StoryContext, StoryOutline, Story, CommandResult } from '../types/index.js';
import { errorHandler } from '../utils/errorHandler.js';
import { FileUtils } from '../utils/fileUtils.js';

export interface EditAgentOptions {
  filePath?: string;
  editInstructions?: string;
  createBackup?: boolean;
  validateAfterEdit?: boolean;
}

export interface EditOperation {
  type: 'replace' | 'add' | 'remove' | 'update';
  target: string;
  value?: string;
  oldValue?: string;
}

export class EditAgent {
  private fileUtils: FileUtils;
  private contextsPath: string;
  private outlinesPath: string;
  private storiesPath: string;

  constructor() {
    this.fileUtils = new FileUtils();
    this.contextsPath = path.join(process.cwd(), 'contexts');
    this.outlinesPath = path.join(process.cwd(), 'outlines');
    this.storiesPath = path.join(process.cwd(), 'stories');
  }

  /**
   * Edit a file based on instructions
   */
  public async editFile(options: EditAgentOptions): Promise<CommandResult> {
    try {
      if (!options.filePath) {
        return {
          success: false,
          message: 'File path is required',
          error: 'Please specify a file path to edit'
        };
      }

      if (!options.editInstructions) {
        return {
          success: false,
          message: 'Edit instructions are required',
          error: 'Please provide instructions for what to edit'
        };
      }

      // Resolve file path
      const filePath = this.resolveFilePath(options.filePath);
      
      // Check if file exists
      if (!await fs.pathExists(filePath)) {
        return {
          success: false,
          message: 'File not found',
          error: `File does not exist: ${filePath}`
        };
      }

      // Create backup if requested
      if (options.createBackup !== false) {
        await this.createBackup(filePath);
      }

      // Read and parse file
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const fileType = this.getFileType(filePath);

      // Parse edit operations from instructions
      const editOperations = this.parseEditInstructions(options.editInstructions, fileType);

      // Apply edit operations
      const modifiedContent = await this.applyEditOperations(fileContent, editOperations, fileType);

      // Validate file after edit if requested
      if (options.validateAfterEdit !== false) {
        const isValid = await this.fileUtils.validateFile(filePath);
        if (!isValid) {
          return {
            success: false,
            message: 'File validation failed after edit',
            error: 'The edited file does not pass validation checks'
          };
        }
      }

      // Save modified content
      await fs.writeFile(filePath, modifiedContent, 'utf-8');

      return {
        success: true,
        message: `File edited successfully: ${path.basename(filePath)}`,
        data: {
          filePath,
          editOperations: editOperations.length,
          backupCreated: options.createBackup !== false
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Failed to edit file',
        error: errorHandler.formatError(error)
      };
    }
  }

  /**
   * Resolve file path to absolute path
   */
  private resolveFilePath(filePath: string): string {
    if (path.isAbsolute(filePath)) {
      return filePath;
    }

    // Check in contexts, outlines, and stories directories
    const possiblePaths = [
      path.join(this.contextsPath, filePath),
      path.join(this.outlinesPath, filePath),
      path.join(this.storiesPath, filePath),
      path.join(process.cwd(), filePath)
    ];

    // Return the first path that exists, or the original if none exist
    for (const possiblePath of possiblePaths) {
      if (fs.pathExistsSync(possiblePath)) {
        return possiblePath;
      }
    }

    return path.resolve(filePath);
  }

  /**
   * Get file type based on extension
   */
  private getFileType(filePath: string): 'yaml' | 'markdown' {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.yaml' || ext === '.yml') {
      return 'yaml';
    }
    return 'markdown';
  }

  /**
   * Create backup file before editing
   */
  private async createBackup(filePath: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${filePath}.backup.${timestamp}`;
      await fs.copyFile(filePath, backupPath);
      return backupPath;
    } catch (error) {
      errorHandler.logError('Failed to create backup file', error);
      throw error;
    }
  }

  /**
   * Parse edit instructions into operations
   */
  private parseEditInstructions(instructions: string, fileType: 'yaml' | 'markdown'): EditOperation[] {
    const operations: EditOperation[] = [];
    const lines = instructions.split('\n').map(line => line.trim()).filter(line => line);

    for (const line of lines) {
      const operation = this.parseEditLine(line, fileType);
      if (operation) {
        operations.push(operation);
      }
    }

    return operations;
  }

  /**
   * Parse a single edit instruction line
   */
  private parseEditLine(line: string, fileType: 'yaml' | 'markdown'): EditOperation | null {
    // Pattern: "replace: title -> New Title"
    const replaceMatch = line.match(/^replace:\s*(.+?)\s*->\s*(.+)$/i);
    if (replaceMatch && replaceMatch[1] && replaceMatch[2]) {
      return {
        type: 'replace',
        target: replaceMatch[1].trim(),
        value: replaceMatch[2].trim(),
        oldValue: replaceMatch[1].trim()
      };
    }

    // Pattern: "add: character -> New Character"
    const addMatch = line.match(/^add:\s*(.+?)\s*->\s*(.+)$/i);
    if (addMatch && addMatch[1] && addMatch[2]) {
      return {
        type: 'add',
        target: addMatch[1].trim(),
        value: addMatch[2].trim()
      };
    }

    // Pattern: "remove: character -> Old Character"
    const removeMatch = line.match(/^remove:\s*(.+?)\s*->\s*(.+)$/i);
    if (removeMatch && removeMatch[1] && removeMatch[2]) {
      return {
        type: 'remove',
        target: removeMatch[1].trim(),
        value: removeMatch[2].trim()
      };
    }

    // Pattern: "update: plot_point.1.description -> New description"
    const updateMatch = line.match(/^update:\s*(.+?)\s*->\s*(.+)$/i);
    if (updateMatch && updateMatch[1] && updateMatch[2]) {
      return {
        type: 'update',
        target: updateMatch[1].trim(),
        value: updateMatch[2].trim()
      };
    }

    return null;
  }

  /**
   * Apply edit operations to file content
   */
  private async applyEditOperations(content: string, operations: EditOperation[], fileType: 'yaml' | 'markdown'): Promise<string> {
    let modifiedContent = content;

    for (const operation of operations) {
      try {
        if (fileType === 'yaml') {
          modifiedContent = await this.applyYamlEdit(modifiedContent, operation);
        } else {
          modifiedContent = await this.applyMarkdownEdit(modifiedContent, operation);
        }
      } catch (error) {
        errorHandler.logError(`Failed to apply edit operation: ${operation.type}`, error);
        // Continue with other operations
      }
    }

    return modifiedContent;
  }

  /**
   * Apply edit operation to YAML content
   */
  private async applyYamlEdit(content: string, operation: EditOperation): Promise<string> {
    try {
      const data = yaml.parse(content) as any;
      
      switch (operation.type) {
        case 'replace':
          if (operation.value) {
            this.updateNestedProperty(data, operation.target, operation.value);
          }
          break;
        case 'add':
          if (operation.value) {
            this.addToArrayProperty(data, operation.target, operation.value);
          }
          break;
        case 'remove':
          if (operation.value) {
            this.removeFromArrayProperty(data, operation.target, operation.value);
          }
          break;
        case 'update':
          if (operation.value) {
            this.updateNestedProperty(data, operation.target, operation.value);
          }
          break;
      }

      return yaml.stringify(data, { indent: 2 });
    } catch (error) {
      errorHandler.logError('Failed to apply YAML edit', error);
      return content;
    }
  }

  /**
   * Apply edit operation to Markdown content
   */
  private async applyMarkdownEdit(content: string, operation: EditOperation): Promise<string> {
    try {
      switch (operation.type) {
        case 'replace':
          return this.replaceMarkdownContent(content, operation.target, operation.value || '');
        case 'add':
          return this.addMarkdownContent(content, operation.target, operation.value || '');
        case 'remove':
          return this.removeMarkdownContent(content, operation.target, operation.value || '');
        case 'update':
          return this.updateMarkdownContent(content, operation.target, operation.value || '');
        default:
          return content;
      }
    } catch (error) {
      errorHandler.logError('Failed to apply Markdown edit', error);
      return content;
    }
  }

  /**
   * Update nested property in object
   */
  private updateNestedProperty(obj: any, path: string, value: string): void {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key && !current[key]) {
        current[key] = {};
      }
      if (key) {
        current = current[key];
      }
    }
    
    const lastKey = keys[keys.length - 1];
    if (lastKey) {
      current[lastKey] = value;
    }
  }

  /**
   * Add item to array property
   */
  private addToArrayProperty(obj: any, path: string, value: string): void {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key && !current[key]) {
        current[key] = {};
      }
      if (key) {
        current = current[key];
      }
    }
    
    const arrayKey = keys[keys.length - 1];
    if (arrayKey) {
      if (!current[arrayKey]) {
        current[arrayKey] = [];
      }
      
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey].push(value);
      }
    }
  }

  /**
   * Remove item from array property
   */
  private removeFromArrayProperty(obj: any, path: string, value: string): void {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!key || !current[key]) {
        return;
      }
      current = current[key];
    }
    
    const arrayKey = keys[keys.length - 1];
    if (arrayKey && Array.isArray(current[arrayKey])) {
      const index = current[arrayKey].indexOf(value);
      if (index > -1) {
        current[arrayKey].splice(index, 1);
      }
    }
  }

  /**
   * Replace content in Markdown
   */
  private replaceMarkdownContent(content: string, target: string, value: string): string {
    // Simple text replacement for now
    return content.replace(new RegExp(target, 'g'), value);
  }

  /**
   * Add content to Markdown
   */
  private addMarkdownContent(content: string, target: string, value: string): string {
    // Add after the target section
    const lines = content.split('\n');
    const targetIndex = lines.findIndex(line => line.includes(target));
    
    if (targetIndex > -1) {
      lines.splice(targetIndex + 1, 0, value);
      return lines.join('\n');
    }
    
    return content;
  }

  /**
   * Remove content from Markdown
   */
  private removeMarkdownContent(content: string, target: string, value: string): string {
    // Remove lines containing the target value
    const lines = content.split('\n');
    const filteredLines = lines.filter(line => !line.includes(value));
    return filteredLines.join('\n');
  }

  /**
   * Update content in Markdown
   */
  private updateMarkdownContent(content: string, target: string, value: string): string {
    // Update lines containing the target
    const lines = content.split('\n');
    const updatedLines = lines.map(line => 
      line.includes(target) ? line.replace(target, value) : line
    );
    return updatedLines.join('\n');
  }

  /**
   * Get help information for edit command
   */
  public getEditHelp(): CommandResult {
    return {
      success: true,
      message: 'Edit command help',
      data: {
        usage: '/edit <file_path> "edit_instructions" [options]',
        options: {
          '--no-backup': 'Skip creating backup file before editing',
          '--no-validate': 'Skip file validation after editing'
        },
        instructions: {
          'replace: <target> -> <new_value>': 'Replace target text with new value',
          'add: <property> -> <value>': 'Add value to array property',
          'remove: <property> -> <value>': 'Remove value from array property',
          'update: <property> -> <new_value>': 'Update property value'
        },
        examples: [
          '/edit "my-story.yaml" "replace: title -> A New Adventure"',
          '/edit "outline.md" "add: characters -> New Character"',
          '/edit "story.md" "update: plot_point.1.description -> Updated description"'
        ]
      }
    };
  }
}
