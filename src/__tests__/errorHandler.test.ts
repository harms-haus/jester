/**
 * Unit tests for ErrorHandler
 */

import { ErrorHandler } from '../utils/errorHandler';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler;
  const testLogDir = path.join(process.cwd(), 'test-logs');

  beforeEach(() => {
    errorHandler = new ErrorHandler();
  });

  afterEach(async () => {
    // Cleanup test logs
    if (await fs.pathExists(testLogDir)) {
      await fs.remove(testLogDir);
    }
    
    // Cleanup any log files created during tests
    const logsDir = path.join(process.cwd(), 'logs');
    if (await fs.pathExists(logsDir)) {
      const files = await fs.readdir(logsDir);
      for (const file of files) {
        if (file.startsWith('error-') && file.includes('2025-09-20')) {
          await fs.remove(path.join(logsDir, file));
        }
      }
    }
    
    // Cleanup debug log
    const debugLogPath = path.join(process.cwd(), '.ai', 'debug-log.md');
    if (await fs.pathExists(debugLogPath)) {
      await fs.remove(debugLogPath);
    }
  });

  describe('formatError', () => {
    it('should format Error objects', () => {
      const error = new Error('Test error message');
      const formatted = errorHandler.formatError(error);
      expect(formatted).toBe('Test error message');
    });

    it('should format string errors', () => {
      const error = 'String error message';
      const formatted = errorHandler.formatError(error);
      expect(formatted).toBe('String error message');
    });

    it('should format object errors', () => {
      const error = { message: 'Object error', code: 'TEST_ERROR' };
      const formatted = errorHandler.formatError(error);
      expect(formatted).toBe('{"message":"Object error","code":"TEST_ERROR"}');
    });
  });

  describe('handleInvalidCommand', () => {
    it('should handle invalid command with suggestions', () => {
      const availableCommands = ['muse', 'write', 'edit'];
      const result = errorHandler.handleInvalidCommand('mus', availableCommands);
      
      expect(result).toContain('Invalid command');
      expect(result).toContain('muse');
    });

    it('should handle invalid command without suggestions', () => {
      const availableCommands = ['muse', 'write', 'edit'];
      const result = errorHandler.handleInvalidCommand('completely-different', availableCommands);
      
      expect(result).toContain('Invalid command');
      expect(result).toContain('Available commands');
    });
  });

  describe('handleMissingFile', () => {
    it('should handle missing file error', () => {
      const result = errorHandler.handleMissingFile('/path/to/missing/file.txt', 'read_file');
      
      expect(result).toContain('File not found');
      expect(result).toContain('/path/to/missing/file.txt');
    });
  });

  describe('handleFileSystemError', () => {
    it('should handle file system error', () => {
      const error = new Error('Permission denied');
      const result = errorHandler.handleFileSystemError('write_file', '/path/to/file.txt', error);
      
      expect(result).toContain('File system error');
      expect(result).toContain('Permission denied');
    });
  });

  describe('handleValidationError', () => {
    it('should handle validation error', () => {
      const result = errorHandler.handleValidationError('title', '', 'required field');
      
      expect(result).toContain('Validation error');
      expect(result).toContain('title');
      expect(result).toContain('required field');
    });
  });

  describe('handleAgentError', () => {
    it('should handle agent error', () => {
      const error = new Error('Agent execution failed');
      const result = errorHandler.handleAgentError('muse', 'generate-context', error);
      
      expect(result).toContain('Agent \'muse\' execution failed');
      expect(result).toContain('generate-context');
      expect(result).toContain('Agent execution failed');
    });
  });

  describe('createUserFriendlyMessage', () => {
    it('should create user-friendly message with context', () => {
      const error = new Error('Technical error');
      const result = errorHandler.createUserFriendlyMessage(error, 'Failed to save file');
      
      expect(result).toBe('Failed to save file: Technical error');
    });

    it('should create user-friendly message without context', () => {
      const error = new Error('Technical error');
      const result = errorHandler.createUserFriendlyMessage(error);
      
      expect(result).toBe('Technical error');
    });
  });

  describe('isRecoverableError', () => {
    it('should identify recoverable errors', () => {
      const permissionError = new Error('Permission denied');
      const notFoundError = new Error('File not found');
      const timeoutError = new Error('Operation timeout');
      
      expect(errorHandler.isRecoverableError(permissionError)).toBe(true);
      expect(errorHandler.isRecoverableError(notFoundError)).toBe(true);
      expect(errorHandler.isRecoverableError(timeoutError)).toBe(true);
    });

    it('should identify non-recoverable errors', () => {
      const syntaxError = new Error('Syntax error');
      const typeError = new Error('Type mismatch');
      
      expect(errorHandler.isRecoverableError(syntaxError)).toBe(false);
      expect(errorHandler.isRecoverableError(typeError)).toBe(false);
    });
  });
});
