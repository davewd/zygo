import {
  cleanupMilestonePrerequisites,
  detectTransitiveRedundancy,
  removeTransitiveRedundancy,
  validateMilestoneStructure,
  type MilestoneForCleanup
} from '../milestonePrerequisiteCleanup';

describe('Milestone Prerequisites Cleanup', () => {
  describe('detectTransitiveRedundancy', () => {
    it('should detect simple transitive redundancy', () => {
      const milestones: MilestoneForCleanup[] = [
        {
          id: 'sports_participation',
          title: 'Sports Participation',
          prerequisites: [],
          startMonths: 84,
          endMonths: 96
        },
        {
          id: 'puberty',
          title: 'Puberty',
          prerequisites: ['sports_participation'],
          startMonths: 132,
          endMonths: 180
        },
        {
          id: 'athletic_peak',
          title: 'Athletic Peak',
          prerequisites: ['puberty', 'sports_participation'], // sports_participation is redundant
          startMonths: 144,
          endMonths: 204
        }
      ];

      const results = detectTransitiveRedundancy(milestones);
      
      expect(results).toHaveLength(1);
      expect(results[0].milestone.id).toBe('athletic_peak');
      expect(results[0].removedPrerequisites).toContain('sports_participation');
      expect(results[0].milestone.prerequisites).toEqual(['puberty']);
      expect(results[0].reasons[0]).toContain('sports_participation is transitively included via puberty');
    });

    it('should detect multiple levels of transitive redundancy', () => {
      const milestones: MilestoneForCleanup[] = [
        {
          id: 'crawling',
          title: 'Crawling',
          prerequisites: [],
          startMonths: 6,
          endMonths: 10
        },
        {
          id: 'walking',
          title: 'Walking',
          prerequisites: ['crawling'],
          startMonths: 12,
          endMonths: 18
        },
        {
          id: 'running',
          title: 'Running',
          prerequisites: ['walking'],
          startMonths: 24,
          endMonths: 30
        },
        {
          id: 'jumping',
          title: 'Jumping',
          prerequisites: ['running', 'walking', 'crawling'], // walking and crawling are redundant
          startMonths: 36,
          endMonths: 42
        }
      ];

      const results = detectTransitiveRedundancy(milestones);
      
      expect(results).toHaveLength(1);
      expect(results[0].milestone.id).toBe('jumping');
      expect(results[0].removedPrerequisites).toContain('walking');
      expect(results[0].removedPrerequisites).toContain('crawling');
      expect(results[0].milestone.prerequisites).toEqual(['running']);
    });

    it('should handle complex branching dependencies', () => {
      const milestones: MilestoneForCleanup[] = [
        {
          id: 'base_skill',
          title: 'Base Skill',
          prerequisites: [],
          startMonths: 12,
          endMonths: 18
        },
        {
          id: 'skill_a',
          title: 'Skill A',
          prerequisites: ['base_skill'],
          startMonths: 24,
          endMonths: 30
        },
        {
          id: 'skill_b',
          title: 'Skill B',
          prerequisites: ['base_skill'],
          startMonths: 24,
          endMonths: 30
        },
        {
          id: 'advanced_skill',
          title: 'Advanced Skill',
          prerequisites: ['skill_a', 'skill_b', 'base_skill'], // base_skill is redundant
          startMonths: 36,
          endMonths: 42
        }
      ];

      const results = detectTransitiveRedundancy(milestones);
      
      expect(results).toHaveLength(1);
      expect(results[0].milestone.id).toBe('advanced_skill');
      expect(results[0].removedPrerequisites).toContain('base_skill');
      expect(results[0].milestone.prerequisites).toEqual(['skill_a', 'skill_b']);
    });

    it('should not remove prerequisites when there is no redundancy', () => {
      const milestones: MilestoneForCleanup[] = [
        {
          id: 'skill_a',
          title: 'Skill A',
          prerequisites: [],
          startMonths: 24,
          endMonths: 30
        },
        {
          id: 'skill_b',
          title: 'Skill B',
          prerequisites: [],
          startMonths: 24,
          endMonths: 30
        },
        {
          id: 'combined_skill',
          title: 'Combined Skill',
          prerequisites: ['skill_a', 'skill_b'], // Both are required independently
          startMonths: 36,
          endMonths: 42
        }
      ];

      const results = detectTransitiveRedundancy(milestones);
      
      expect(results).toHaveLength(0);
    });

    it('should handle missing prerequisite references gracefully', () => {
      const milestones: MilestoneForCleanup[] = [
        {
          id: 'milestone_a',
          title: 'Milestone A',
          prerequisites: ['missing_milestone'],
          startMonths: 24,
          endMonths: 30
        }
      ];

      const results = detectTransitiveRedundancy(milestones);
      
      expect(results).toHaveLength(0);
    });
  });

  describe('cleanupMilestonePrerequisites', () => {
    it('should return both cleaned milestones and change details', () => {
      const originalMilestones = [
        {
          id: 'sports_participation',
          title: 'Sports Participation',
          prerequisites: [],
          startMonths: 84,
          endMonths: 96,
          category: 'physical'
        },
        {
          id: 'puberty',
          title: 'Puberty',
          prerequisites: ['sports_participation'],
          startMonths: 132,
          endMonths: 180,
          category: 'physical'
        },
        {
          id: 'athletic_peak',
          title: 'Athletic Peak',
          prerequisites: ['puberty', 'sports_participation'],
          startMonths: 144,
          endMonths: 204,
          category: 'physical'
        }
      ];

      const result = cleanupMilestonePrerequisites(originalMilestones);
      
      expect(result.cleanedMilestones).toHaveLength(3);
      expect(result.changes).toHaveLength(1);
      
      // Check that other properties are preserved
      const athleticPeak = result.cleanedMilestones.find(m => m.id === 'athletic_peak');
      expect(athleticPeak?.category).toBe('physical');
      expect(athleticPeak?.prerequisites).toEqual(['puberty']);
      
      // Check change details
      expect(result.changes[0].milestone.id).toBe('athletic_peak');
      expect(result.changes[0].removedPrerequisites).toContain('sports_participation');
    });
  });

  describe('removeTransitiveRedundancy', () => {
    it('should return cleaned milestones without change tracking', () => {
      const milestones = [
        {
          id: 'a',
          title: 'A',
          prerequisites: [],
          data: 'preserved'
        },
        {
          id: 'b',
          title: 'B',
          prerequisites: ['a'],
          data: 'preserved'
        },
        {
          id: 'c',
          title: 'C',
          prerequisites: ['b', 'a'], // 'a' is redundant
          data: 'preserved'
        }
      ];

      const result = removeTransitiveRedundancy(milestones);
      
      expect(result).toHaveLength(3);
      const milestoneC = result.find(m => m.id === 'c');
      expect(milestoneC?.prerequisites).toEqual(['b']);
      expect(milestoneC?.data).toBe('preserved');
    });
  });

  describe('validateMilestoneStructure', () => {
    it('should detect missing prerequisite milestones', () => {
      const milestones = [
        {
          id: 'milestone_a',
          title: 'Milestone A',
          prerequisites: ['missing_milestone_1', 'missing_milestone_2']
        },
        {
          id: 'milestone_b',
          title: 'Milestone B',
          prerequisites: ['milestone_a', 'another_missing']
        }
      ];

      const result = validateMilestoneStructure(milestones);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(3);
      
      const missingErrors = result.errors.filter(e => e.type === 'missing_prerequisite');
      expect(missingErrors).toHaveLength(3);
      
      const milestoneAErrors = missingErrors.filter(e => e.milestoneId === 'milestone_a');
      expect(milestoneAErrors).toHaveLength(2);
      expect(milestoneAErrors.map(e => e.details?.prerequisite)).toContain('missing_milestone_1');
      expect(milestoneAErrors.map(e => e.details?.prerequisite)).toContain('missing_milestone_2');
    });

    it('should detect circular dependencies', () => {
      const milestones = [
        {
          id: 'milestone_a',
          title: 'Milestone A',
          prerequisites: ['milestone_b']
        },
        {
          id: 'milestone_b',
          title: 'Milestone B',
          prerequisites: ['milestone_c']
        },
        {
          id: 'milestone_c',
          title: 'Milestone C',
          prerequisites: ['milestone_a'] // Creates a cycle
        }
      ];

      const result = validateMilestoneStructure(milestones);
      
      expect(result.isValid).toBe(false);
      const circularErrors = result.errors.filter(e => e.type === 'circular_dependency');
      expect(circularErrors.length).toBeGreaterThan(0);
    });

    it('should detect invalid structure', () => {
      const milestones = [
        {
          // Missing id
          title: 'Invalid Milestone',
          prerequisites: []
        },
        {
          id: 'valid_milestone',
          title: 'Valid Milestone',
          prerequisites: []
        }
      ];

      const result = validateMilestoneStructure(milestones);
      
      expect(result.isValid).toBe(false);
      const structureErrors = result.errors.filter(e => e.type === 'invalid_structure');
      expect(structureErrors).toHaveLength(1);
      expect(structureErrors[0].message).toContain('missing id property');
    });

    it('should pass validation for valid milestone structure', () => {
      const milestones = [
        {
          id: 'milestone_a',
          title: 'Milestone A',
          prerequisites: []
        },
        {
          id: 'milestone_b',
          title: 'Milestone B',
          prerequisites: ['milestone_a']
        }
      ];

      const result = validateMilestoneStructure(milestones);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Real-world scenarios from zygo data', () => {
    it('should handle the sports participation -> puberty -> athletic peak case', () => {
      // Recreating the actual scenario from the zygo milestone data
      const milestones = [
        {
          id: 'year_7_8_physical_1',
          title: 'Sports participation',
          prerequisites: [],
          startMonths: 84,
          endMonths: 96
        },
        {
          id: 'puberty',
          title: 'Puberty',
          prerequisites: ['year_7_8_physical_1'],
          startMonths: 132,
          endMonths: 180
        },
        {
          id: 'teen_12_14_physical_1',
          title: 'Athletic peak',
          prerequisites: ['puberty', 'year_7_8_physical_1'], // This is the redundancy
          startMonths: 144,
          endMonths: 204
        }
      ];

      const result = cleanupMilestonePrerequisites(milestones);
      
      expect(result.changes).toHaveLength(1);
      
      const change = result.changes[0];
      expect(change.milestone.id).toBe('teen_12_14_physical_1');
      expect(change.removedPrerequisites).toContain('year_7_8_physical_1');
      expect(change.milestone.prerequisites).toEqual(['puberty']);
      
      // Verify the reason is clear
      expect(change.reasons[0]).toMatch(/year_7_8_physical_1.*transitively included.*puberty/);
    });

    it('should work with filtered subsets maintaining context', () => {
      // Test filtering scenario where some milestones are removed but dependencies remain
      const allMilestones = [
        { id: 'a', title: 'A', prerequisites: [] },
        { id: 'b', title: 'B', prerequisites: ['a'] },
        { id: 'c', title: 'C', prerequisites: ['b'] },
        { id: 'd', title: 'D', prerequisites: ['c', 'b', 'a'] }, // Multiple redundancies
        { id: 'e', title: 'E', prerequisites: ['d'] }
      ];

      // Filter to only include certain milestones
      const filteredMilestones = allMilestones.filter(m => ['a', 'b', 'c', 'd'].includes(m.id));
      
      const result = cleanupMilestonePrerequisites(filteredMilestones);
      
      const milestoneD = result.cleanedMilestones.find(m => m.id === 'd');
      expect(milestoneD?.prerequisites).toEqual(['c']);
      
      expect(result.changes).toHaveLength(1);
      expect(result.changes[0].removedPrerequisites).toContain('b');
      expect(result.changes[0].removedPrerequisites).toContain('a');
    });

    it('should handle edge case where all prerequisites become redundant', () => {
      const milestones = [
        { id: 'base', title: 'Base', prerequisites: [] },
        { id: 'level1', title: 'Level 1', prerequisites: ['base'] },
        { id: 'level2', title: 'Level 2', prerequisites: ['level1'] },
        { id: 'final', title: 'Final', prerequisites: ['level2', 'level1', 'base'] }
      ];

      const result = cleanupMilestonePrerequisites(milestones);
      
      const finalMilestone = result.cleanedMilestones.find(m => m.id === 'final');
      expect(finalMilestone?.prerequisites).toEqual(['level2']);
      
      expect(result.changes[0].removedPrerequisites).toHaveLength(2);
      expect(result.changes[0].removedPrerequisites).toContain('level1');
      expect(result.changes[0].removedPrerequisites).toContain('base');
    });
  });

  describe('Performance and edge cases', () => {
    it('should handle empty milestone arrays', () => {
      const result = cleanupMilestonePrerequisites([]);
      expect(result.cleanedMilestones).toEqual([]);
      expect(result.changes).toEqual([]);
    });

    it('should handle milestones without prerequisites', () => {
      const milestones = [
        { id: 'a', title: 'A' },
        { id: 'b', title: 'B', prerequisites: [] }
      ];

      const result = cleanupMilestonePrerequisites(milestones);
      expect(result.cleanedMilestones).toEqual(milestones);
      expect(result.changes).toEqual([]);
    });

    it('should handle self-referencing prerequisites', () => {
      const milestones = [
        {
          id: 'self_ref',
          title: 'Self Reference',
          prerequisites: ['self_ref'] // Invalid self-reference
        }
      ];

      // Should not crash and should handle gracefully
      const validationResult = validateMilestoneStructure(milestones);
      expect(validationResult.isValid).toBe(false);
      
      const cleanupResult = cleanupMilestonePrerequisites(milestones);
      expect(cleanupResult.cleanedMilestones).toHaveLength(1);
    });
  });
});
