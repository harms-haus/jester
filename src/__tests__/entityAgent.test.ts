/**
 * Tests for EntityAgent
 */

import { EntityAgent } from '../agents/entityAgent.js';
import { FileUtils } from '../utils/fileUtils.js';
import fs from 'fs-extra';

// Mock fs-extra
jest.mock('fs-extra');
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock FileUtils
jest.mock('../utils/fileUtils.js');
const MockedFileUtils = FileUtils as jest.MockedClass<typeof FileUtils>;

describe('EntityAgent', () => {
  let entityAgent: EntityAgent;
  let mockFileUtils: jest.Mocked<FileUtils>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFileUtils = new MockedFileUtils() as jest.Mocked<FileUtils>;
    entityAgent = new EntityAgent();
    // Replace the fileUtils instance with our mock
    (entityAgent as any).fileUtils = mockFileUtils;
  });

  describe('createEntity', () => {
    it('should create a character entity successfully', async () => {
      const options = {
        entityType: 'character' as const,
        entityName: 'Test Character',
        templateData: {
          age: '25',
          species: 'Human',
          description: 'A test character'
        }
      };

      // Mock template loading
      (mockedFs.readFile as any).mockResolvedValue(`# {{CHARACTER_NAME}}

*Created: {{CREATED_AT}}*
*Last Modified: {{LAST_MODIFIED}}*
*Version: {{VERSION}}*

## Description
{{CHARACTER_DESCRIPTION}}

## Type
{{CHARACTER_TYPE}}

## Age
{{CHARACTER_AGE}}

## Species
{{CHARACTER_SPECIES}}

## Physical Description
{{PHYSICAL_DESCRIPTION}}

## Personality Traits
{{PERSONALITY_TRAITS}}

## Motivations
{{MOTIVATIONS}}

## Fears
{{FEARS}}

## Family Relationships
{{FAMILY_RELATIONSHIPS}}

## Friend Relationships
{{FRIEND_RELATIONSHIPS}}

## Enemy Relationships
{{ENEMY_RELATIONSHIPS}}

## First Story
{{FIRST_STORY}}

## Recent Story
{{RECENT_STORY}}

## Story Count
{{STORY_COUNT}}

## Clothing Style
{{CLOTHING_STYLE}}

## Distinctive Features
{{DISTINCTIVE_FEATURES}}`);
      (mockedFs.pathExists as any).mockResolvedValue(false);
      (mockedFs.ensureDir as any).mockResolvedValue(undefined);
      (mockedFs.writeFile as any).mockResolvedValue(undefined);

      const result = await entityAgent.createEntity(options);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Entity created successfully');
      expect(result.data?.name).toBe('Test Character');
      expect(result.data?.type).toBe('character');
    });

    it('should fail when entity type is invalid', async () => {
      const options = {
        entityType: 'invalid' as any,
        entityName: 'Test Entity'
      };

      const result = await entityAgent.createEntity(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid entity type');
    });

    it('should fail when entity name is missing', async () => {
      const options = {
        entityType: 'character' as const,
        entityName: ''
      };

      const result = await entityAgent.createEntity(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Entity type and name are required');
    });

    it('should check for duplicate entities', async () => {
      const options = {
        entityType: 'character' as const,
        entityName: 'Existing Character'
      };

      // Mock that entity already exists
      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readdir as any).mockResolvedValue(['existing-character.md']);

      const result = await entityAgent.createEntity(options);

      expect(result.success).toBe(false);
      expect(result.message).toContain('already exists');
    });
  });

  describe('listEntities', () => {
    it('should list entities with default options', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readdir as any).mockResolvedValue(['char1.md', 'char2.md']);
      (mockedFs.stat as any).mockResolvedValue({
        birthtime: new Date(),
        mtime: new Date(),
        size: 1000
      });
      (mockFileUtils.readEntityFile as any).mockResolvedValue({
        path: '/path/char1.md',
        name: 'char1',
        type: 'character',
        content: 'test content',
        metadata: { created_at: '2023-01-01', last_modified: '2023-01-01', version: 1 }
      });

      const result = await entityAgent.listEntities('character');

      expect(result.success).toBe(true);
      expect(result.data?.entities).toHaveLength(2);
      expect(result.data?.total).toBe(2);
      expect(result.data?.statistics).toBeDefined();
    });

    it('should handle empty entity directory', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(false);

      const result = await entityAgent.listEntities('character');

      expect(result.success).toBe(true);
      expect(result.data?.entities).toHaveLength(0);
      expect(result.data?.total).toBe(0);
    });
  });

  describe('getEntity', () => {
    it('should get entity successfully', async () => {
      const mockContent = '# Test Character\n## Description\nA test character';
      
      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);

      const result = await entityAgent.getEntity('character', 'Test Character');

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Test Character');
      expect(result.data?.content).toBe(mockContent);
    });

    it('should fail when entity does not exist', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(false);

      const result = await entityAgent.getEntity('character', 'NonExistent');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Entity not found');
    });
  });

  describe('editEntity', () => {
    it('should edit entity successfully', async () => {
      const mockContent = '# Test Character\n## Description\n{{CHARACTER_DESCRIPTION}}';
      const updates = { description: 'Updated description' };

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);
      (mockFileUtils.updateEntityFile as any).mockResolvedValue(true);

      const result = await entityAgent.editEntity('character', 'Test Character', updates);

      expect(result.success).toBe(true);
      expect(result.message).toContain('Entity updated successfully');
      expect(mockFileUtils.updateEntityFile).toHaveBeenCalledWith(
        expect.any(String),
        updates,
        'character'
      );
    });

    it('should fail when entity does not exist', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(false);

      const result = await entityAgent.editEntity('character', 'NonExistent', {});

      expect(result.success).toBe(false);
      expect(result.message).toContain('Entity not found');
    });
  });

  describe('deleteEntity', () => {
    it('should delete entity successfully', async () => {
      const mockContent = '# Test Character\n## Description\nA test character';

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);
      (mockFileUtils.backupEntityFile as any).mockResolvedValue('/backup/path');
      (mockFileUtils.deleteEntityFile as any).mockResolvedValue(true);

      const result = await entityAgent.deleteEntity('character', 'Test Character');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Entity deleted successfully');
      expect(mockFileUtils.backupEntityFile).toHaveBeenCalled();
      expect(mockFileUtils.deleteEntityFile).toHaveBeenCalled();
    });

    it('should skip backup when requested', async () => {
      const mockContent = '# Test Character\n## Description\nA test character';

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);
      (mockFileUtils.deleteEntityFile as any).mockResolvedValue(true);

      const result = await entityAgent.deleteEntity('character', 'Test Character', { createBackup: false });

      expect(result.success).toBe(true);
      expect(mockFileUtils.backupEntityFile).not.toHaveBeenCalled();
      expect(mockFileUtils.deleteEntityFile).toHaveBeenCalled();
    });
  });

  describe('searchEntities', () => {
    it('should search entities successfully', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readdir as any).mockResolvedValue(['brave.md']);
      (mockedFs.stat as any).mockResolvedValue({
        birthtime: new Date(),
        mtime: new Date(),
        size: 1000
      });
      (mockedFs.readFile as any).mockResolvedValue('# Brave Character\n## Description\nA brave character');

      const result = await entityAgent.searchEntities('brave', 'character');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('Brave Character');
    });

    it('should return empty results when no matches found', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(false);

      const result = await entityAgent.searchEntities('nonexistent');

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
    });
  });

  describe('backupEntity', () => {
    it('should backup entity successfully', async () => {
      const mockContent = '# Test Character\n## Description\nA test character';

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);
      (mockFileUtils.backupEntityFile as any).mockResolvedValue('/backup/path');

      const result = await entityAgent.backupEntity('character', 'Test Character');

      expect(result.success).toBe(true);
      expect(result.message).toContain('Entity backup created');
      expect(mockFileUtils.backupEntityFile).toHaveBeenCalled();
    });
  });

  describe('validateEntity', () => {
    it('should validate entity successfully', async () => {
      const mockContent = `# Test Character

*Created: 2023-01-01*
*Last Modified: 2023-01-01*
*Version: 1*

## Description
A test character

## Type
Protagonist

## Age
25

## Species
Human

## Physical Description
A tall, athletic person

## Personality Traits
Brave, Curious

## Motivations
To help others

## Fears
The unknown

## Family Relationships
None

## Friend Relationships
None

## Enemy Relationships
None

## First Story
Not yet appeared

## Recent Story
Not yet appeared

## Story Count
0

## Clothing Style
Casual

## Distinctive Features
None`;

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);

      const result = await entityAgent.validateEntity('character', 'Test Character');

      expect(result.success).toBe(true);
      expect(result.data?.valid).toBe(true);
    });

    it('should identify validation errors', async () => {
      const mockContent = '# Test Character\n*Created: 2023-01-01*';

      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readFile as any).mockResolvedValue(mockContent);

      const result = await entityAgent.validateEntity('character', 'Test Character');

      expect(result.success).toBe(false);
      expect(result.data?.valid).toBe(false);
      expect(result.data?.errors).toBeDefined();
    });
  });

  describe('validateEntities', () => {
    it('should validate multiple entities', async () => {
      (mockedFs.pathExists as any).mockResolvedValue(true);
      (mockedFs.readdir as any).mockResolvedValue(['char1.md', 'char2.md']);
      (mockedFs.stat as any).mockResolvedValue({
        birthtime: new Date(),
        mtime: new Date(),
        size: 1000
      });
      (mockedFs.readFile as any).mockResolvedValue('# Test Character\n## Description\nA test character\n*Created: 2023-01-01*\n*Last Modified: 2023-01-01*\n*Version: 1*');

      const result = await entityAgent.validateEntities('character');

      expect(result.success).toBe(true);
      expect(result.data?.total).toBe(2);
      expect(result.data?.results).toHaveLength(2);
    });
  });
});