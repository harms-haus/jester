/**
 * Unit tests for FileUtils
 */

import { FileUtils } from '../utils/fileUtils';
import { StoryContext, StoryOutline, Story, Character, Location, Item } from '../types/index';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('FileUtils', () => {
  let fileUtils: FileUtils;
  const testDir = path.join(process.cwd(), 'test-temp');
  const createdFiles: string[] = [];

  beforeEach(() => {
    fileUtils = new FileUtils();
    createdFiles.length = 0; // Clear the array
  });

  afterEach(async () => {
    // Cleanup specific files created during tests
    for (const file of createdFiles) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    }
    
    // Cleanup test directory if it exists
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
    
    // Cleanup any test files in contexts directory
    const contextsDir = path.join(process.cwd(), 'contexts');
    if (await fs.pathExists(contextsDir)) {
      const files = await fs.readdir(contextsDir);
      for (const file of files) {
        if (file.startsWith('test-') || file.includes('test-story')) {
          await fs.remove(path.join(contextsDir, file));
        }
      }
    }
  });

  describe('createContextFile', () => {
    it('should create context file from template', async () => {
      const context: StoryContext = {
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
          characters: [],
          locations: [],
          items: []
        },
        plot_template: 'heroes_journey',
        plot_points: [],
        location_progression: [],
        morals: ['Be kind to others'],
        themes: ['Friendship'],
        metadata: {
          created_at: '2024-01-01T00:00:00Z',
          last_modified: '2024-01-01T00:00:00Z',
          version: 1
        }
      };

      const filePath = await fileUtils.createContextFile(context);
      createdFiles.push(filePath); // Track created file
      
      expect(await fs.pathExists(filePath)).toBe(true);
      expect(filePath).toContain('test-story');
    });
  });

  describe('validateFile', () => {
    it('should validate existing file', async () => {
      const testFile = path.join(testDir, 'test.yaml');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'title: "Test"\ndescription: "Test file"');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(true);
    });

    it('should return false for non-existent file', async () => {
      const isValid = await fileUtils.validateFile('non-existent.yaml');
      expect(isValid).toBe(false);
    });

    it('should validate YAML file content', async () => {
      const testFile = path.join(testDir, 'test.yaml');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'invalid yaml content: [');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(false);
    });

    it('should validate Markdown file content', async () => {
      const testFile = path.join(testDir, 'test.md');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, '# Test\n\nThis is a test markdown file.');
      createdFiles.push(testFile); // Track created file
      
      const isValid = await fileUtils.validateFile(testFile);
      expect(isValid).toBe(true);
    });
  });

  describe('ensureDirectory', () => {
    it('should create directory if it does not exist', async () => {
      const testDirPath = path.join(testDir, 'new-dir');
      
      await fileUtils.ensureDirectory(testDirPath);
      createdFiles.push(testDirPath); // Track created directory
      
      expect(await fs.pathExists(testDirPath)).toBe(true);
    });

    it('should not fail if directory already exists', async () => {
      const testDirPath = path.join(testDir, 'existing-dir');
      await fs.ensureDir(testDirPath);
      createdFiles.push(testDirPath); // Track created directory
      
      await expect(fileUtils.ensureDirectory(testDirPath)).resolves.not.toThrow();
    });
  });

  describe('getFileStats', () => {
    it('should return file stats for existing file', async () => {
      const testFile = path.join(testDir, 'test.txt');
      await fs.ensureDir(testDir);
      await fs.writeFile(testFile, 'test content');
      createdFiles.push(testFile); // Track created file
      
      const stats = await fileUtils.getFileStats(testFile);
      
      expect(stats).toBeDefined();
      expect(stats?.isFile()).toBe(true);
    });

    it('should return null for non-existent file', async () => {
      const stats = await fileUtils.getFileStats('non-existent.txt');
      expect(stats).toBeNull();
    });
  });

  describe('Entity File Creation', () => {
    const testCharacter: Character = {
      name: 'Test Hero',
      type: 'Protagonist',
      age: '25',
      species: 'Human',
      description: 'A brave adventurer',
      personality_traits: ['brave', 'curious'],
      motivations: ['to help others'],
      fears: ['the unknown'],
      family_relationships: ['Mother', 'Father'],
      friend_relationships: ['Best Friend'],
      enemy_relationships: ['Dark Lord'],
      first_story: 'The Beginning',
      recent_story: 'The End',
      story_count: 5,
      physical_description: 'Tall and strong',
      clothing_style: 'Adventurer gear',
      distinctive_features: ['Scar on left cheek'],
      special_powers: ['Magic sword mastery'],
      skills: ['Sword fighting', 'Leadership'],
      weaknesses: ['Afraid of heights'],
      backstory: 'Born in a small village',
      additional_notes: 'Loves animals',
      metadata: {
        created_at: '2024-01-01T00:00:00Z',
        last_modified: '2024-01-01T00:00:00Z',
        version: 1
      }
    };

    const testLocation: Location = {
      name: 'Test Forest',
      type: 'Forest',
      climate: 'Temperate',
      size: 'Large',
      description: 'A mysterious forest',
      terrain_features: ['Dense trees', 'Streams'],
      landmarks: ['Ancient oak', 'Crystal cave'],
      natural_resources: ['Wood', 'Herbs'],
      atmosphere_feeling: 'Mysterious and peaceful',
      sounds: ['Birds chirping', 'Wind in trees'],
      smells: ['Fresh pine', 'Wildflowers'],
      lighting: 'Dappled sunlight',
      primary_residents: ['Forest spirits'],
      visitors: ['Adventurers'],
      creatures: ['Deer', 'Owls'],
      historical_events: ['Great battle', 'Ancient ritual'],
      cultural_significance: 'Sacred to the elves',
      myths_legends: ['The lost city', 'The guardian spirit'],
      first_story: 'The Journey Begins',
      recent_story: 'The Final Battle',
      story_count: 3,
      nearby_locations: ['Mountain Pass', 'River Valley'],
      access_routes: ['Forest path', 'Hidden trail'],
      transportation: ['Walking', 'Horse riding'],
      magical_properties: ['Healing aura', 'Time distortion'],
      technological_features: ['Ancient ruins'],
      unique_aspects: ['Floating stones', 'Singing trees'],
      additional_notes: 'Home to many magical creatures',
      metadata: {
        created_at: '2024-01-01T00:00:00Z',
        last_modified: '2024-01-01T00:00:00Z',
        version: 1
      }
    };

    const testItem: Item = {
      name: 'Test Sword',
      type: 'Weapon',
      rarity: 'Rare',
      value: '1000 gold',
      description: 'A magical sword',
      size: '3 feet',
      weight: '2 pounds',
      material: 'Mithril',
      color: 'Silver',
      shape: 'Straight blade',
      primary_use: 'Combat',
      secondary_uses: ['Cutting', 'Light source'],
      how_it_works: 'Channels magical energy',
      magical_properties: ['Sharpness', 'Light'],
      enchantments: ['Sharpness +3', 'Light'],
      powers: ['Glows in dark', 'Never dulls'],
      limitations: ['Requires magical training'],
      creator: 'Ancient smith',
      creation_date: '1000 years ago',
      original_purpose: 'Defending the realm',
      previous_owners: ['King Arthur', 'Sir Lancelot'],
      current_owner: 'Test Hero',
      current_location: 'Test Forest',
      condition: 'Excellent',
      availability: 'Rare',
      first_story: 'The Discovery',
      recent_story: 'The Final Battle',
      story_count: 2,
      associated_characters: ['Test Hero', 'Dark Lord'],
      associated_locations: ['Test Forest', 'Ancient Ruins'],
      related_items: ['Magic Shield', 'Crystal Orb'],
      symbolic_meaning: 'Hope and courage',
      cultural_importance: 'Symbol of the kingdom',
      traditions: ['Knighting ceremony', 'Victory celebration'],
      additional_notes: 'Passed down through generations',
      metadata: {
        created_at: '2024-01-01T00:00:00Z',
        last_modified: '2024-01-01T00:00:00Z',
        version: 1
      }
    };

    describe('createCharacterFile', () => {
      it('should create character file from template', async () => {
        const filePath = await fileUtils.createCharacterFile(testCharacter);
        createdFiles.push(filePath);
        
        expect(await fs.pathExists(filePath)).toBe(true);
        expect(filePath).toContain('test-hero.md');
        expect(filePath).toContain('characters');
        
        const content = await fs.readFile(filePath, 'utf-8');
        expect(content).toContain('# Test Hero');
        expect(content).toContain('**Name**: Test Hero');
        expect(content).toContain('**Type**: Protagonist');
        expect(content).toContain('A brave adventurer');
      });

      it('should use custom filename when provided', async () => {
        const customFilename = 'custom-hero.md';
        const filePath = await fileUtils.createCharacterFile(testCharacter, customFilename);
        createdFiles.push(filePath);
        
        expect(filePath).toContain(customFilename);
      });
    });

    describe('createLocationFile', () => {
      it('should create location file from template', async () => {
        const filePath = await fileUtils.createLocationFile(testLocation);
        createdFiles.push(filePath);
        
        expect(await fs.pathExists(filePath)).toBe(true);
        expect(filePath).toContain('test-forest.md');
        expect(filePath).toContain('locations');
        
        const content = await fs.readFile(filePath, 'utf-8');
        expect(content).toContain('# Test Forest');
        expect(content).toContain('**Name**: Test Forest');
        expect(content).toContain('**Type**: Forest');
        expect(content).toContain('A mysterious forest');
      });
    });

    describe('createItemFile', () => {
      it('should create item file from template', async () => {
        const filePath = await fileUtils.createItemFile(testItem);
        createdFiles.push(filePath);
        
        expect(await fs.pathExists(filePath)).toBe(true);
        expect(filePath).toContain('test-sword.md');
        expect(filePath).toContain('items');
        
        const content = await fs.readFile(filePath, 'utf-8');
        expect(content).toContain('# Test Sword');
        expect(content).toContain('**Name**: Test Sword');
        expect(content).toContain('**Type**: Weapon');
        expect(content).toContain('A magical sword');
      });
    });

    describe('validateEntityFile', () => {
      it('should validate character file structure', async () => {
        const filePath = await fileUtils.createCharacterFile(testCharacter);
        createdFiles.push(filePath);
        
        const isValid = await fileUtils.validateEntityFile(filePath, 'character');
        expect(isValid).toBe(true);
      });

      it('should validate location file structure', async () => {
        const filePath = await fileUtils.createLocationFile(testLocation);
        createdFiles.push(filePath);
        
        const isValid = await fileUtils.validateEntityFile(filePath, 'location');
        expect(isValid).toBe(true);
      });

      it('should validate item file structure', async () => {
        const filePath = await fileUtils.createItemFile(testItem);
        createdFiles.push(filePath);
        
        const isValid = await fileUtils.validateEntityFile(filePath, 'item');
        expect(isValid).toBe(true);
      });

      it('should return false for invalid entity file', async () => {
        const testFile = path.join(testDir, 'invalid-entity.md');
        await fs.ensureDir(testDir);
        await fs.writeFile(testFile, '# Invalid Entity\n\nMissing required sections');
        createdFiles.push(testFile);
        
        const isValid = await fileUtils.validateEntityFile(testFile, 'character');
        expect(isValid).toBe(false);
      });

      it('should return false for non-existent file', async () => {
        const isValid = await fileUtils.validateEntityFile('non-existent.md', 'character');
        expect(isValid).toBe(false);
      });
    });

    describe('readEntityFile', () => {
      it('should read and parse character file', async () => {
        const filePath = await fileUtils.createCharacterFile(testCharacter);
        createdFiles.push(filePath);
        
        const entityFile = await fileUtils.readEntityFile(filePath);
        
        expect(entityFile).toBeDefined();
        expect(entityFile?.name).toBe('test-hero');
        expect(entityFile?.type).toBe('character');
        expect(entityFile?.content).toContain('# Test Hero');
        expect(entityFile?.metadata.created_at).toBeDefined();
      });

      it('should return null for non-existent file', async () => {
        const entityFile = await fileUtils.readEntityFile('non-existent.md');
        expect(entityFile).toBeNull();
      });
    });
  });
});
