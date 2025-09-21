/**
 * Error handling utilities for jester storytelling system
 * Provides centralized error handling, logging, and graceful degradation
 */

import fs from 'fs-extra';
import * as path from 'path';

export interface ErrorContext {
  operation: string;
  filePath?: string;
  command?: string;
  userId?: string;
  timestamp: string;
}

export class ErrorHandler {
  private logPath: string;
  private debugLogPath: string;

  constructor() {
    this.logPath = path.join(process.cwd(), 'logs');
    this.debugLogPath = path.join(process.cwd(), '.ai', 'debug-log.md');
    this.initializeLogging();
  }

  /**
   * Initialize logging directories and files
   */
  private async initializeLogging(): Promise<void> {
    try {
      await fs.ensureDir(this.logPath);
      await fs.ensureDir(path.dirname(this.debugLogPath));
    } catch (error) {
      console.error('Failed to initialize logging:', error);
    }
  }

  /**
   * Log error with context information
   */
  public logError(message: string, error: any, context?: Partial<ErrorContext>): void {
    const errorContext: ErrorContext = {
      operation: context?.operation || 'unknown',
      filePath: context?.filePath || '',
      command: context?.command || '',
      userId: context?.userId || '',
      timestamp: new Date().toISOString()
    };

    const errorLog = {
      message,
      error: this.formatError(error),
      context: errorContext,
      stack: error?.stack
    };

    // Log to console
    console.error(`[ERROR] ${message}:`, error);

    // Log to file
    this.writeToLogFile(errorLog);
    this.writeToDebugLog(errorLog);
  }

  /**
   * Format error for logging and display
   */
  public formatError(error: any): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return JSON.stringify(error);
  }

  /**
   * Write error to log file
   */
  private async writeToLogFile(errorLog: any): Promise<void> {
    try {
      const logFile = path.join(this.logPath, `error-${new Date().toISOString().split('T')[0]}.log`);
      const logEntry = `${errorLog.context.timestamp} [${errorLog.context.operation}] ${errorLog.message}\n${errorLog.error}\n${errorLog.stack || ''}\n\n`;
      
      await fs.appendFile(logFile, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  /**
   * Write error to debug log
   */
  private async writeToDebugLog(errorLog: any): Promise<void> {
    try {
      const debugEntry = `## ${errorLog.context.timestamp} - ${errorLog.context.operation}\n\n**Error:** ${errorLog.message}\n\n**Details:** ${errorLog.error}\n\n**Context:**\n\`\`\`json\n${JSON.stringify(errorLog.context, null, 2)}\n\`\`\`\n\n---\n\n`;
      
      await fs.appendFile(this.debugLogPath, debugEntry);
    } catch (error) {
      console.error('Failed to write to debug log:', error);
    }
  }

  /**
   * Handle invalid command errors
   */
  public handleInvalidCommand(command: string, availableCommands: string[]): string {
    const message = `Invalid command: '${command}'`;
    const suggestion = this.suggestCommand(command, availableCommands);
    
    this.logError(message, new Error(message), {
      operation: 'command_validation',
      command
    });

    return suggestion ? `${message}. Did you mean: ${suggestion}?` : `${message}. Available commands: ${availableCommands.join(', ')}`;
  }

  /**
   * Handle missing file errors
   */
  public handleMissingFile(filePath: string, operation: string): string {
    const message = `File not found: ${filePath}`;
    
    this.logError(message, new Error(message), {
      operation,
      filePath
    });

    return `${message}. Please check the file path and try again.`;
  }

  /**
   * Handle file system errors
   */
  public handleFileSystemError(operation: string, filePath: string, error: any): string {
    const message = `File system error during ${operation}`;
    
    this.logError(message, error, {
      operation,
      filePath
    });

    return `${message}: ${this.formatError(error)}. Please check file permissions and try again.`;
  }

  /**
   * Handle validation errors
   */
  public handleValidationError(field: string, value: any, rule: string): string {
    const message = `Validation error for field '${field}'`;
    
    this.logError(message, new Error(message), {
      operation: 'validation',
      filePath: field
    });

    return `${message}: ${rule}. Current value: ${JSON.stringify(value)}`;
  }

  /**
   * Handle agent execution errors
   */
  public handleAgentError(agentName: string, command: string, error: any): string {
    const message = `Agent '${agentName}' execution failed`;
    
    this.logError(message, error, {
      operation: 'agent_execution',
      command
    });

    return `${message} for command '${command}': ${this.formatError(error)}`;
  }

  /**
   * Suggest similar command based on available commands
   */
  private suggestCommand(command: string, availableCommands: string[]): string | null {
    const commandLower = command.toLowerCase();
    
    // Exact match
    if (availableCommands.includes(commandLower)) {
      return null;
    }

    // Find closest match
    const suggestions = availableCommands.filter(cmd => 
      cmd.includes(commandLower) || commandLower.includes(cmd)
    );

    return suggestions.length > 0 ? (suggestions[0] || null) : null;
  }

  /**
   * Handle graceful degradation for non-critical failures
   */
  public handleGracefulDegradation(operation: string, fallback: string, error: any): string {
    this.logError(`Graceful degradation for ${operation}`, error, {
      operation
    });

    return `Warning: ${operation} failed, using fallback: ${fallback}`;
  }

  /**
   * Create user-friendly error message
   */
  public createUserFriendlyMessage(error: any, context?: string): string {
    const baseMessage = this.formatError(error);
    
    if (context) {
      return `${context}: ${baseMessage}`;
    }
    
    return baseMessage;
  }

  /**
   * Check if error is recoverable
   */
  public isRecoverableError(error: any): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return message.includes('permission') || 
             message.includes('not found') || 
             message.includes('timeout');
    }
    return false;
  }

  /**
   * Get error statistics
   */
  public async getErrorStats(): Promise<any> {
    try {
      const logFiles = await fs.readdir(this.logPath);
      const errorCount = logFiles.filter(file => file.startsWith('error-')).length;
      
      return {
        totalErrorFiles: errorCount,
        logPath: this.logPath,
        debugLogPath: this.debugLogPath
      };
    } catch (error) {
      return { error: 'Failed to get error statistics' };
    }
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
