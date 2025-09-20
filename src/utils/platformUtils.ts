/**
 * Platform utilities for cross-platform compatibility
 * Handles platform-specific file operations and path handling
 */

import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { errorHandler } from './errorHandler';

export interface PlatformInfo {
  platform: string;
  arch: string;
  version: string;
  homedir: string;
  tmpdir: string;
  pathSeparator: string;
}

export class PlatformUtils {
  private platformInfo: PlatformInfo;

  constructor() {
    this.platformInfo = this.getPlatformInfo();
  }

  /**
   * Get current platform information
   */
  public getPlatformInfo(): PlatformInfo {
    return {
      platform: os.platform(),
      arch: os.arch(),
      version: os.version(),
      homedir: os.homedir(),
      tmpdir: os.tmpdir(),
      pathSeparator: path.sep
    };
  }


  /**
   * Normalize path for current platform
   */
  public normalizePath(filePath: string): string {
    return path.normalize(filePath);
  }

  /**
   * Join paths using platform-specific separator
   */
  public joinPath(...paths: string[]): string {
    return path.join(...paths);
  }

  /**
   * Get platform-specific temp directory
   */
  public getTempDir(): string {
    return this.platformInfo.tmpdir;
  }

  /**
   * Get platform-specific home directory
   */
  public getHomeDir(): string {
    return this.platformInfo.homedir;
  }

  /**
   * Check if running on Windows
   */
  public isWindows(): boolean {
    return this.platformInfo.platform === 'win32';
  }

  /**
   * Check if running on macOS
   */
  public isMacOS(): boolean {
    return this.platformInfo.platform === 'darwin';
  }

  /**
   * Check if running on Linux
   */
  public isLinux(): boolean {
    return this.platformInfo.platform === 'linux';
  }

  /**
   * Create directory with platform-specific permissions
   */
  public async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
      
      // Set appropriate permissions based on platform
      if (this.isWindows()) {
        // Windows doesn't use Unix-style permissions
        return;
      } else {
        // Set read/write/execute for owner, read/execute for group and others
        await fs.chmod(dirPath, 0o755);
      }
    } catch (error) {
      errorHandler.handleFileSystemError('create_directory', dirPath, error);
      throw error;
    }
  }

  /**
   * Create file with platform-specific permissions
   */
  public async createFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      
      // Set appropriate permissions based on platform
      if (!this.isWindows()) {
        // Set read/write for owner, read for group and others
        await fs.chmod(filePath, 0o644);
      }
    } catch (error) {
      errorHandler.handleFileSystemError('create_file', filePath, error);
      throw error;
    }
  }

  /**
   * Check file permissions
   */
  public async checkFilePermissions(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get file permissions as string
   */
  public async getFilePermissions(filePath: string): Promise<string> {
    try {
      const stats = await fs.stat(filePath);
      return stats.mode.toString(8);
    } catch (error) {
      errorHandler.logError('Failed to get file permissions', error, {
        operation: 'get_permissions',
        filePath
      });
      return 'unknown';
    }
  }

  /**
   * Test cross-platform file operations
   */
  public async testFileOperations(): Promise<boolean> {
    try {
      const testDir = this.joinPath(this.getTempDir(), 'jester-test');
      const testFile = this.joinPath(testDir, 'test.txt');
      const testContent = 'Cross-platform test content';

      // Test directory creation
      await this.createDirectory(testDir);
      
      // Test file creation
      await this.createFile(testFile, testContent);
      
      // Test file reading
      const readContent = await fs.readFile(testFile, 'utf-8');
      if (readContent !== testContent) {
        throw new Error('File content mismatch');
      }
      
      // Test file permissions
      const hasPermissions = await this.checkFilePermissions(testFile);
      if (!hasPermissions) {
        throw new Error('File permissions check failed');
      }
      
      // Cleanup
      await fs.remove(testDir);
      
      return true;
    } catch (error) {
      errorHandler.logError('Cross-platform file operations test failed', error, {
        operation: 'platform_test'
      });
      return false;
    }
  }

  /**
   * Get platform-specific path handling recommendations
   */
  public getPathHandlingRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.isWindows()) {
      recommendations.push('Use path.join() for cross-platform path construction');
      recommendations.push('Handle both forward and backward slashes in paths');
      recommendations.push('Be aware of Windows path length limitations (260 characters)');
    } else {
      recommendations.push('Use path.join() for cross-platform path construction');
      recommendations.push('Handle file permissions appropriately');
      recommendations.push('Be aware of case sensitivity in file names');
    }
    
    return recommendations;
  }

  /**
   * Validate file path for current platform
   */
  public validateFilePath(filePath: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check for invalid characters
    const invalidChars = this.isWindows() ? /[<>:"|?*]/ : /[\0]/;
    if (invalidChars.test(filePath)) {
      issues.push('File path contains invalid characters');
    }
    
    // Check path length
    if (this.isWindows() && filePath.length > 260) {
      issues.push('File path exceeds Windows maximum length (260 characters)');
    }
    
    // Check for reserved names (Windows)
    if (this.isWindows()) {
      const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
      const fileName = path.basename(filePath, path.extname(filePath));
      if (reservedNames.includes(fileName.toUpperCase())) {
        issues.push('File name is reserved on Windows');
      }
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Get platform-specific error messages
   */
  public getPlatformErrorMessage(error: any): string {
    if (this.isWindows()) {
      if (error.code === 'EACCES') {
        return 'Access denied. Please check file permissions and try running as administrator if needed.';
      }
      if (error.code === 'ENOENT') {
        return 'File or directory not found. Please check the path and try again.';
      }
    } else {
      if (error.code === 'EACCES') {
        return 'Permission denied. Please check file permissions and try again.';
      }
      if (error.code === 'ENOENT') {
        return 'No such file or directory. Please check the path and try again.';
      }
    }
    
    return error.message || 'Unknown error occurred';
  }
}
