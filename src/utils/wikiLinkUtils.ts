/**
 * Wiki-link utilities for jester storytelling system
 * Handles [[entity-name]] syntax parsing, validation, and bidirectional linking
 */

import fs from 'fs-extra';
import * as path from 'path';
import { WikiLink, EntityLink, LinkValidationResult, EntityRelationship } from '../types/index.js';
import { errorHandler } from './errorHandler.js';

export class WikiLinkUtils {
  private entitiesPath: string;
  private linkIndex: Map<string, EntityLink[]>;
  private entityIndex: Map<string, string>; // entity name -> file path

  constructor(entitiesPath?: string) {
    this.entitiesPath = entitiesPath || path.join(process.cwd(), 'entities');
    this.linkIndex = new Map();
    this.entityIndex = new Map();
    this.initializeEntityIndex();
  }

  /**
   * Parse wiki-link syntax from file content
   */
  public parseWikiLinks(content: string, filePath: string): WikiLink[] {
    const wikiLinks: WikiLink[] = [];
    const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    let match;

    while ((match = wikiLinkRegex.exec(content)) !== null) {
      const entityName = match[1]?.trim() || '';
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;

      wikiLinks.push({
        text: match[0],
        entityName,
        startIndex,
        endIndex,
        filePath
      });
    }

    return wikiLinks;
  }

  /**
   * Extract all wiki links from a file
   */
  public async extractWikiLinksFromFile(filePath: string): Promise<WikiLink[]> {
    try {
      if (!await fs.pathExists(filePath)) {
        return [];
      }

      const content = await fs.readFile(filePath, 'utf-8');
      return this.parseWikiLinks(content, filePath);
    } catch (error) {
      errorHandler.logError(`Failed to extract wiki links from file: ${filePath}`, error);
      return [];
    }
  }

  /**
   * Validate wiki links and check for broken references
   */
  public async validateWikiLinks(wikiLinks: WikiLink[]): Promise<LinkValidationResult> {
    const brokenLinks: WikiLink[] = [];
    const missingEntities: string[] = [];
    const suggestions: string[] = [];

    for (const link of wikiLinks) {
      const entityPath = this.findEntityFile(link.entityName);
      
      if (!entityPath) {
        brokenLinks.push(link);
        missingEntities.push(link.entityName);
        
        // Generate suggestions based on similar entity names
        const similarEntities = this.findSimilarEntities(link.entityName);
        suggestions.push(...similarEntities);
      }
    }

    return {
      isValid: brokenLinks.length === 0,
      brokenLinks,
      missingEntities: [...new Set(missingEntities)],
      suggestions: [...new Set(suggestions)]
    };
  }

  /**
   * Find entity file by name (case-insensitive)
   */
  private findEntityFile(entityName: string): string | null {
    // Check if we have it in our index (case-insensitive)
    for (const [indexedName, filePath] of this.entityIndex.entries()) {
      if (indexedName.toLowerCase() === entityName.toLowerCase()) {
        return filePath;
      }
    }

    // Search through entity directories
    const entityTypes = ['characters', 'locations', 'items'];
    
    for (const entityType of entityTypes) {
      const entityDir = path.join(this.entitiesPath, entityType);
      
      if (fs.existsSync(entityDir)) {
        const files = fs.readdirSync(entityDir);
        const matchingFile = files.find(file => {
          const nameWithoutExt = path.parse(file).name;
          return nameWithoutExt.toLowerCase() === entityName.toLowerCase();
        });

        if (matchingFile) {
          const fullPath = path.join(entityDir, matchingFile);
          const originalName = path.parse(matchingFile).name;
          // Store with original case from filename
          this.entityIndex.set(originalName, fullPath);
          return fullPath;
        }
      }
    }

    return null;
  }

  /**
   * Find similar entity names for suggestions
   */
  private findSimilarEntities(entityName: string): string[] {
    const suggestions: string[] = [];
    const entityNames = Array.from(this.entityIndex.keys());

    for (const existingName of entityNames) {
      const similarity = this.calculateSimilarity(entityName.toLowerCase(), existingName.toLowerCase());
      if (similarity > 0.6) { // 60% similarity threshold
        suggestions.push(existingName);
      }
    }

    return suggestions.sort((a, b) => 
      this.calculateSimilarity(entityName.toLowerCase(), b.toLowerCase()) - 
      this.calculateSimilarity(entityName.toLowerCase(), a.toLowerCase())
    );
  }

  /**
   * Calculate string similarity using Levenshtein distance
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 1.0;

    const distance = this.levenshteinDistance(str1, str2);
    return 1 - (distance / maxLength);
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str1.length; i++) {
      matrix[0]![i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j]![0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j]![i] = Math.min(
          matrix[j]![i - 1]! + 1,     // deletion
          matrix[j - 1]![i]! + 1,     // insertion
          matrix[j - 1]![i - 1]! + indicator // substitution
        );
      }
    }

    return matrix[str2.length]![str1.length]!;
  }

  /**
   * Create bidirectional links between entities
   */
  public async createBidirectionalLinks(sourceFile: string, targetEntity: string): Promise<void> {
    try {
      const sourceEntity = this.extractEntityNameFromPath(sourceFile);
      const targetFile = this.findEntityFile(targetEntity);

      if (!sourceEntity || !targetFile) {
        throw new Error('Cannot create bidirectional links: missing entity information');
      }

      // Create forward link (source -> target)
      const forwardLink: EntityLink = {
        sourceEntity,
        targetEntity,
        sourceFile,
        targetFile,
        linkType: 'forward',
        createdAt: new Date().toISOString()
      };

      // Create backward link (target -> source)
      const backwardLink: EntityLink = {
        sourceEntity: targetEntity,
        targetEntity: sourceEntity,
        sourceFile: targetFile,
        targetFile: sourceFile,
        linkType: 'backward',
        createdAt: new Date().toISOString()
      };

      // Add to link index
      this.addLinkToIndex(forwardLink);
      this.addLinkToIndex(backwardLink);

    } catch (error) {
      errorHandler.logError('Failed to create bidirectional links', error);
      throw error;
    }
  }

  /**
   * Extract entity name from file path
   */
  private extractEntityNameFromPath(filePath: string): string | null {
    const fileName = path.basename(filePath);
    return path.parse(fileName).name;
  }

  /**
   * Add link to index
   */
  private addLinkToIndex(link: EntityLink): void {
    const key = link.sourceEntity;
    if (!this.linkIndex.has(key)) {
      this.linkIndex.set(key, []);
    }
    this.linkIndex.get(key)!.push(link);
  }

  /**
   * Get entity relationships
   */
  public getEntityRelationships(entityName: string): EntityRelationship | null {
    const links = this.linkIndex.get(entityName) || [];
    const entityFile = this.findEntityFile(entityName);
    
    if (!entityFile) {
      return null;
    }

    // Get the original case from the entity index
    const originalEntityName = this.getOriginalEntityName(entityName);
    const entityType = this.getEntityTypeFromPath(entityFile);
    const linkedTo = links
      .filter(link => link.linkType === 'forward')
      .map(link => link.targetEntity);
    
    const linkedFrom = links
      .filter(link => link.linkType === 'backward')
      .map(link => link.sourceEntity);

    return {
      entity: originalEntityName,
      entityType,
      relationships: {
        linkedTo,
        linkedFrom
      },
      usageCount: links.length,
      lastUsed: links.length > 0 ? links[links.length - 1]!.createdAt : new Date().toISOString()
    };
  }

  /**
   * Get entity type from file path
   */
  private getEntityTypeFromPath(filePath: string): 'character' | 'location' | 'item' {
    if (filePath.includes('/characters/')) return 'character';
    if (filePath.includes('/locations/')) return 'location';
    if (filePath.includes('/items/')) return 'item';
    return 'character'; // default fallback
  }

  /**
   * Get original entity name from entity index (case-insensitive lookup)
   */
  private getOriginalEntityName(entityName: string): string {
    for (const [indexedName] of this.entityIndex.entries()) {
      if (indexedName.toLowerCase() === entityName.toLowerCase()) {
        return indexedName;
      }
    }
    return entityName; // fallback to input if not found
  }

  /**
   * Update links when entity is renamed
   */
  public async updateLinksForRename(oldName: string, newName: string): Promise<void> {
    try {
      // Update entity index
      const oldPath = this.entityIndex.get(oldName);
      if (oldPath) {
        this.entityIndex.delete(oldName);
        this.entityIndex.set(newName, oldPath);
      }

      // Update all links that reference this entity
      for (const [entityName, links] of this.linkIndex.entries()) {
        for (const link of links) {
          if (link.targetEntity === oldName) {
            link.targetEntity = newName;
          }
          if (link.sourceEntity === oldName) {
            link.sourceEntity = newName;
          }
        }
      }

      // Update file content to replace [[oldName]] with [[newName]]
      await this.updateFileContentForRename(oldName, newName);

    } catch (error) {
      errorHandler.logError(`Failed to update links for rename: ${oldName} -> ${newName}`, error);
      throw error;
    }
  }

  /**
   * Update file content to replace old entity name with new name
   * Handles case-insensitive replacement and context-aware replacement
   */
  private async updateFileContentForRename(oldName: string, newName: string): Promise<void> {
    const entityTypes = ['characters', 'locations', 'items'];
    
    for (const entityType of entityTypes) {
      const entityDir = path.join(this.entitiesPath, entityType);
      
      if (fs.existsSync(entityDir)) {
        const files = fs.readdirSync(entityDir);
        
        for (const file of files) {
          const filePath = path.join(entityDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          
          // Use context-aware replacement to handle nearby words
          const updatedContent = this.replaceEntityLinksWithContext(content, oldName, newName);
          
          if (content !== updatedContent) {
            await fs.writeFile(filePath, updatedContent, 'utf-8');
          }
        }
      }
    }
  }

  /**
   * Replace entity links with context awareness
   * Handles case-insensitive replacement and prevents word duplication
   */
  private replaceEntityLinksWithContext(content: string, oldName: string, newName: string): string {
    // Create a regex that matches [[oldName]] case-insensitively
    const linkRegex = new RegExp(`\\[\\[${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\]`, 'gi');
    
    let result = content;
    let match;
    
    // Process all matches in reverse order to avoid index shifting issues
    const matches = [];
    linkRegex.lastIndex = 0;
    
    while ((match = linkRegex.exec(content)) !== null) {
      matches.push({
        match: match[0],
        start: match.index,
        end: match.index + match[0].length
      });
    }
    
    // Process matches in reverse order
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i]!;
      const matchStart = match.start;
      const matchEnd = match.end;
      
      // Get the context before the match from the current result
      const beforeMatch = result.substring(0, matchStart);
      const wordsBefore = beforeMatch.trim().split(/\s+/);
      const lastWordBefore = wordsBefore[wordsBefore.length - 1];
      
      // Split the new name into words
      const newNameWords = newName.split(' ');
      
      // Check if the last word before the link matches any word in the new name
      if (lastWordBefore && newNameWords.some(word => 
        word.toLowerCase() === lastWordBefore.toLowerCase()
      )) {
        // The word is already present before the link, so we need to remove it from the context
        // and use the full new name in the link
        const beforeLink = beforeMatch.substring(0, beforeMatch.lastIndexOf(lastWordBefore));
        const afterLink = result.substring(matchEnd);
        
        // Replace the entire section: remove the duplicate word and update the link
        const replacement = beforeLink + `[[${newName}]]` + afterLink;
        result = beforeLink + `[[${newName}]]` + afterLink;
      } else {
        // No duplicate word, just replace the link
        result = result.substring(0, matchStart) + `[[${newName}]]` + result.substring(matchEnd);
      }
    }
    
    return result;
  }

  /**
   * Get context before a match (words before the match)
   */
  private getContextBefore(content: string, match: string): string {
    const matchIndex = content.indexOf(match);
    if (matchIndex === -1) return '';
    
    const beforeMatch = content.substring(0, matchIndex);
    const words = beforeMatch.trim().split(/\s+/);
    return words.slice(-3).join(' '); // Get last 3 words
  }

  /**
   * Get context after a match (words after the match)
   */
  private getContextAfter(content: string, match: string): string {
    const matchIndex = content.indexOf(match);
    if (matchIndex === -1) return '';
    
    const afterMatch = content.substring(matchIndex + match.length);
    const words = afterMatch.trim().split(/\s+/);
    return words.slice(0, 3).join(' '); // Get first 3 words
  }

  /**
   * Refresh entity index by scanning entity directories
   */
  public refreshEntityIndex(): void {
    this.entityIndex.clear();
    this.initializeEntityIndex();
  }

  /**
   * Initialize entity index by scanning entity directories
   */
  private initializeEntityIndex(): void {
    const entityTypes = ['characters', 'locations', 'items'];
    
    for (const entityType of entityTypes) {
      const entityDir = path.join(this.entitiesPath, entityType);
      
      if (fs.existsSync(entityDir)) {
        const files = fs.readdirSync(entityDir);
        
        for (const file of files) {
          const entityName = path.parse(file).name;
          const fullPath = path.join(entityDir, file);
          this.entityIndex.set(entityName, fullPath);
        }
      }
    }
  }

  /**
   * Get all entity relationships for mapping
   */
  public getAllEntityRelationships(): EntityRelationship[] {
    const relationships: EntityRelationship[] = [];
    const entityNames = new Set<string>();

    // Collect all unique entity names
    for (const [entityName, links] of this.linkIndex.entries()) {
      entityNames.add(entityName);
      for (const link of links) {
        entityNames.add(link.targetEntity);
      }
    }

    // Generate relationships for each entity
    for (const entityName of entityNames) {
      const relationship = this.getEntityRelationships(entityName);
      if (relationship) {
        relationships.push(relationship);
      }
    }

    return relationships;
  }

  /**
   * Export relationship data for external analysis
   */
  public exportRelationshipData(): any {
    const relationships = this.getAllEntityRelationships();
    const linkData = Array.from(this.linkIndex.entries()).map(([entity, links]) => ({
      entity,
      links: links.map(link => ({
        target: link.targetEntity,
        type: link.linkType,
        createdAt: link.createdAt
      }))
    }));

    return {
      relationships,
      linkData,
      exportDate: new Date().toISOString(),
      totalEntities: relationships.length,
      totalLinks: linkData.reduce((sum, item) => sum + item.links.length, 0)
    };
  }
}
