/**
 * Timeline Prerequisites Validation Test
 * 
 * This test ensures that all timeline JSON files (milestones, achievements, steps) 
 * have proper prerequisite references and that all expected key milestones exist.
 * 
 * Key Requirements:
 * - All 4 key milestones must exist: conception, birth, puberty, legal_adult
 * - All milestones must have valid prerequisite references (except key milestones and first prenatal)
 * - All achievements must reference existing milestones
 * - All steps must reference existing achievements
 */

import {
    getAllAchievements,
    getAllMilestones,
    getAllSteps,
    getKeyMilestones,
    type Achievement,
    type Milestone,
    type Step
} from '../timeline';

// Expected key milestones that should exist
const EXPECTED_KEY_MILESTONES = [
  'conception',
  'birth', 
  'puberty',
  'legal_adult'
] as const;

describe('Timeline Prerequisites Validation', () => {
  
  let milestonesData: Milestone[];
  let achievementsData: Achievement[];
  let stepsData: Step[];
  let milestoneIds: string[];
  let achievementIds: string[];
  let keyMilestones: Milestone[];

  beforeAll(async () => {
    // Load data using API functions
    milestonesData = await getAllMilestones();
    achievementsData = await getAllAchievements();
    stepsData = await getAllSteps();
    keyMilestones = await getKeyMilestones();
    
    // Extract IDs for validation
    milestoneIds = milestonesData.map(m => m.id);
    achievementIds = achievementsData.map(a => a.id);
  });

  describe('Key Milestones', () => {
    test.each(EXPECTED_KEY_MILESTONES)('should have key milestone: %s', (keyMilestone) => {
      const found = milestonesData.find(milestone => 
        milestone.id === keyMilestone ||
        milestone.id.includes(keyMilestone) ||
        milestone.title.toLowerCase().includes(keyMilestone) ||
        milestone.description.toLowerCase().includes(keyMilestone)
      );
      
      if (!found) {
        console.error(`\n=== MISSING KEY MILESTONE ===`);
        console.error(`Expected key milestone: "${keyMilestone}"`);
        console.error(`Searched in ${milestonesData.length} milestones for:`);
        console.error(`- ID exactly matching: "${keyMilestone}"`);
        console.error(`- ID containing: "${keyMilestone}"`);
        console.error(`- Title containing: "${keyMilestone}"`);
        console.error(`- Description containing: "${keyMilestone}"`);
        console.error('\nSimilar milestone IDs found:');
        const similarIds = milestonesData
          .map(m => m.id)
          .filter(id => id.toLowerCase().includes(keyMilestone.substring(0, 4)))
          .slice(0, 5);
        console.error(similarIds.length > 0 ? similarIds : 'None found');
        console.error('============================\n');
      }
      
      expect(found).toBeDefined();
      expect(found?.title).toBeTruthy();
    });

    test('all expected key milestones should be found', () => {
      const foundKeyMilestones = EXPECTED_KEY_MILESTONES.filter(keyMilestone => {
        return milestonesData.some(milestone => 
          milestone.id === keyMilestone ||
          milestone.id.includes(keyMilestone) ||
          milestone.title.toLowerCase().includes(keyMilestone) ||
          milestone.description.toLowerCase().includes(keyMilestone)
        );
      });

      expect(foundKeyMilestones).toHaveLength(EXPECTED_KEY_MILESTONES.length);
      expect(foundKeyMilestones).toEqual(expect.arrayContaining(EXPECTED_KEY_MILESTONES));
    });
  });

  describe('Milestone Prerequisites', () => {
    test('all milestones should have prerequisites property', () => {
      milestonesData.forEach(milestone => {
        expect(milestone).toHaveProperty('prerequisites');
        expect(Array.isArray(milestone.prerequisites)).toBe(true);
      });
    });

    test('empty prerequisites should only be for key milestones or first prenatal milestones', () => {
      const invalidEmptyPrereqs: Array<{
        id: string, 
        title: string, 
        period: string,
        ageRange: string,
        isKeyMilestone: boolean,
        isPrenatalFirst: boolean
      }> = [];
      const keyMilestoneIds = keyMilestones.map(m => m.id);

      milestonesData.forEach(milestone => {
        if (milestone.prerequisites.length === 0) {
          const isKeyMilestone = keyMilestoneIds.includes(milestone.id);
          const isPrenatalFirst = milestone.id.includes('prenatal_first');
          
          if (!isKeyMilestone && !isPrenatalFirst) {
            invalidEmptyPrereqs.push({
              id: milestone.id,
              title: milestone.title,
              period: milestone.period,
              ageRange: `${milestone.startMonths}-${milestone.endMonths} months`,
              isKeyMilestone,
              isPrenatalFirst
            });
          }
        }
      });

      if (invalidEmptyPrereqs.length > 0) {
        console.error('\n=== EMPTY PREREQUISITES VALIDATION FAILURES ===');
        console.error('The following milestones have empty prerequisites but are not key milestones or first prenatal:\n');
        
        invalidEmptyPrereqs.forEach((invalid, index) => {
          console.error(`${index + 1}. Milestone: "${invalid.title}"`);
          console.error(`   ID: ${invalid.id}`);
          console.error(`   Period: ${invalid.period}`);
          console.error(`   Age Range: ${invalid.ageRange}`);
          console.error(`   Is Key Milestone: ${invalid.isKeyMilestone}`);
          console.error(`   Is Prenatal First: ${invalid.isPrenatalFirst}`);
          console.error('');
        });
        
        console.error('=== SUMMARY ===');
        console.error(`Total milestones with invalid empty prerequisites: ${invalidEmptyPrereqs.length}`);
        console.error(`Key milestone IDs: [${keyMilestoneIds.join(', ')}]`);
        console.error('Expected: Only key milestones or prenatal_first milestones should have empty prerequisites');
        console.error('================================================\n');
      }

      expect(invalidEmptyPrereqs).toHaveLength(0);
    });

    test('all prerequisite references should point to existing milestones', () => {
      const invalidReferences: Array<{
        milestoneId: string, 
        milestoneTitle: string,
        prerequisite: string,
        period: string,
        ageRange: string
      }> = [];
      const keyMilestoneIds = keyMilestones.map(m => m.id);

      milestonesData.forEach(milestone => {
        milestone.prerequisites.forEach(prereq => {
          if (!milestoneIds.includes(prereq) && !keyMilestoneIds.includes(prereq)) {
            invalidReferences.push({
              milestoneId: milestone.id,
              milestoneTitle: milestone.title,
              prerequisite: prereq,
              period: milestone.period,
              ageRange: `${milestone.startMonths}-${milestone.endMonths} months`
            });
          }
        });
      });

      if (invalidReferences.length > 0) {
        console.error('\n=== INVALID PREREQUISITE REFERENCES ===');
        console.error('The following milestones reference prerequisites that do not exist:\n');
        
        invalidReferences.forEach((invalid, index) => {
          console.error(`${index + 1}. Milestone: "${invalid.milestoneTitle}"`);
          console.error(`   ID: ${invalid.milestoneId}`);
          console.error(`   Period: ${invalid.period}`);
          console.error(`   Age Range: ${invalid.ageRange}`);
          console.error(`   Missing Prerequisite: "${invalid.prerequisite}"`);
          console.error('');
        });
        
        console.error('=== SUMMARY ===');
        console.error(`Total invalid references: ${invalidReferences.length}`);
        console.error(`Available milestone IDs: ${milestoneIds.length} total`);
        console.error(`Available key milestone IDs: [${keyMilestoneIds.join(', ')}]`);
        console.error('======================================\n');
      }

      expect(invalidReferences).toHaveLength(0);
    });

    test('critical milestones should have proper prerequisite chains', () => {
      const criticalMilestones = milestonesData.filter(m => m.importance === 'critical');
      
      expect(criticalMilestones.length).toBeGreaterThan(0);
      
      // Check that birth milestone has prenatal prerequisites
      const birthMilestone = milestonesData.find(m => m.id === 'birth');
      if (birthMilestone) {
        expect(birthMilestone.prerequisites).toEqual(
          expect.arrayContaining([
            expect.stringMatching(/prenatal/)
          ])
        );
      }

      // Check that puberty has earlier milestones as prerequisites
      const pubertyMilestone = milestonesData.find(m => m.id === 'puberty');
      if (pubertyMilestone) {
        expect(pubertyMilestone.prerequisites.length).toBeGreaterThan(0);
      }

      // Check that legal_adult has teen milestones as prerequisites
      const legalAdultMilestone = milestonesData.find(m => m.id === 'legal_adult');
      if (legalAdultMilestone) {
        expect(legalAdultMilestone.prerequisites).toEqual(
          expect.arrayContaining([
            expect.stringMatching(/teen/)
          ])
        );
      }
    });
  });

  describe('Achievement References', () => {
    test('all achievements should reference existing milestones', () => {
      const invalidFromReferences: Array<{achievementId: string, reference: string}> = [];
      const invalidToReferences: Array<{achievementId: string, reference: string}> = [];

      achievementsData.forEach(achievement => {
        // Check fromMilestone reference
        if (achievement.fromMilestone && !milestoneIds.includes(achievement.fromMilestone)) {
          invalidFromReferences.push({
            achievementId: achievement.id,
            reference: achievement.fromMilestone
          });
        }
        
        // Check toMilestone reference
        if (achievement.toMilestone && !milestoneIds.includes(achievement.toMilestone)) {
          invalidToReferences.push({
            achievementId: achievement.id,
            reference: achievement.toMilestone
          });
        }
      });

      if (invalidFromReferences.length > 0) {
        console.error('Invalid fromMilestone references:', invalidFromReferences);
      }
      if (invalidToReferences.length > 0) {
        console.error('Invalid toMilestone references:', invalidToReferences);
      }

      expect(invalidFromReferences).toHaveLength(0);
      expect(invalidToReferences).toHaveLength(0);
    });

    test('achievement milestone ranges should be logical', () => {
      achievementsData.forEach(achievement => {
        if (achievement.fromMilestone && achievement.toMilestone) {
          const fromMilestone = milestonesData.find(m => m.id === achievement.fromMilestone);
          const toMilestone = milestonesData.find(m => m.id === achievement.toMilestone);
          
          if (fromMilestone && toMilestone) {
            // The toMilestone should typically come after fromMilestone in development
            // This is a logical check that can be refined based on your specific requirements
            expect(fromMilestone.startMonths).toBeLessThanOrEqual(toMilestone.startMonths);
          }
        }
      });
    });
  });

  describe('Step References', () => {
    test('all steps should reference existing achievements', () => {
      const invalidReferences: Array<{stepId: string, reference: string}> = [];

      stepsData.forEach(step => {
        if (step.achievementId && !achievementIds.includes(step.achievementId)) {
          invalidReferences.push({
            stepId: step.id,
            reference: step.achievementId
          });
        }
      });

      if (invalidReferences.length > 0) {
        console.error('Invalid step achievement references:', invalidReferences);
      }

      expect(invalidReferences).toHaveLength(0);
    });

    test('steps should have consistent achievement titles', () => {
      stepsData.forEach(step => {
        if (step.achievementId && step.achievementTitle) {
          const achievement = achievementsData.find(a => a.id === step.achievementId);
          if (achievement) {
            expect(step.achievementTitle).toBe(achievement.title);
          }
        }
      });
    });
  });

  describe('Data Integrity', () => {
    test('should have reasonable number of milestones', () => {
      expect(milestonesData.length).toBeGreaterThan(50);
      expect(milestonesData.length).toBeLessThan(200);
    });

    test('should have milestones covering full development spectrum', () => {
      const periods = [...new Set(milestonesData.map(m => m.period))];
      
      expect(periods).toEqual(
        expect.arrayContaining([
          'prenatal',
          'infancy', 
          'adolescence'
        ])
      );
    });

    test('should have milestones in all major categories', () => {
      const categories = [...new Set(milestonesData.map(m => m.category))];
      
      expect(categories).toEqual(
        expect.arrayContaining([
          'physical',
          'cognitive',
          'social_emotional',
          'language'
        ])
      );
    });

    test('milestone age ranges should be consistent', () => {
      const invalidRanges: Array<{
        id: string, 
        title: string, 
        startMonths: number, 
        endMonths: number,
        issue: string
      }> = [];

      milestonesData.forEach(milestone => {
        // Check if start > end
        if (milestone.startMonths > milestone.endMonths) {
          invalidRanges.push({
            id: milestone.id,
            title: milestone.title,
            startMonths: milestone.startMonths,
            endMonths: milestone.endMonths,
            issue: 'startMonths > endMonths'
          });
        }
        
        // Check if start is too early (before -10 months prenatal)
        if (milestone.startMonths < -10) {
          invalidRanges.push({
            id: milestone.id,
            title: milestone.title,
            startMonths: milestone.startMonths,
            endMonths: milestone.endMonths,
            issue: 'startMonths too early (< -10)'
          });
        }
        
        // Check if end is too late (> 1000 months = ~83 years, reasonable for lifetime milestones)
        if (milestone.endMonths > 1000) {
          invalidRanges.push({
            id: milestone.id,
            title: milestone.title,
            startMonths: milestone.startMonths,
            endMonths: milestone.endMonths,
            issue: `endMonths too late (${milestone.endMonths} > 1000)`
          });
        }
      });

      if (invalidRanges.length > 0) {
        console.error('\n=== MILESTONE AGE RANGE VALIDATION FAILURES ===');
        console.error('The following milestones have invalid age ranges:\n');
        
        invalidRanges.forEach((invalid, index) => {
          console.error(`${index + 1}. Milestone: "${invalid.title}"`);
          console.error(`   ID: ${invalid.id}`);
          console.error(`   Age Range: ${invalid.startMonths} - ${invalid.endMonths} months`);
          console.error(`   Issue: ${invalid.issue}`);
          console.error('');
        });
        
        console.error('=== SUMMARY ===');
        console.error(`Total invalid milestones: ${invalidRanges.length}`);
        console.error(`Expected: endMonths <= 1000 (~83 years), startMonths >= -10, startMonths <= endMonths`);
        console.error('===============================================\n');
      }

      expect(invalidRanges).toHaveLength(0);
    });
  });

  describe('Timeline Summary', () => {
    test('should log comprehensive validation summary', () => {
      const summary = {
        totalMilestones: milestonesData.length,
        totalAchievements: achievementsData.length,
        totalSteps: stepsData.length,
        keyMilestonesFound: keyMilestones.length,
        expectedKeyMilestones: EXPECTED_KEY_MILESTONES.length,
        categories: [...new Set(milestonesData.map(m => m.category))],
        periods: [...new Set(milestonesData.map(m => m.period))],
        ageRangeSpan: {
          earliest: Math.min(...milestonesData.map(m => m.startMonths)),
          latest: Math.max(...milestonesData.map(m => m.endMonths))
        }
      };

      console.log('Timeline Validation Summary:', JSON.stringify(summary, null, 2));
      
      // This test always passes but provides useful logging
      expect(summary.totalMilestones).toBeGreaterThan(0);
    });

    test('should provide detailed data analysis for debugging', () => {
      console.log('\n=== DETAILED TIMELINE DATA ANALYSIS ===');
      
      // Milestones without prerequisites
      const milestonesWithoutPrereqs = milestonesData.filter(m => m.prerequisites.length === 0);
      console.log(`\nMilestones without prerequisites (${milestonesWithoutPrereqs.length}):`);
      milestonesWithoutPrereqs.forEach(m => {
        console.log(`  - ${m.id}: "${m.title}" (${m.period}, ${m.startMonths}-${m.endMonths}m)`);
      });

      // Age range distribution
      console.log('\nAge range distribution:');
      const ageGroups = {
        prenatal: milestonesData.filter(m => m.startMonths < 0).length,
        infancy: milestonesData.filter(m => m.startMonths >= 0 && m.startMonths < 24).length,
        earlyChildhood: milestonesData.filter(m => m.startMonths >= 24 && m.startMonths < 72).length,
        schoolAge: milestonesData.filter(m => m.startMonths >= 72 && m.startMonths < 216).length,
        adulthood: milestonesData.filter(m => m.startMonths >= 216).length
      };
      Object.entries(ageGroups).forEach(([period, count]) => {
        console.log(`  - ${period}: ${count} milestones`);
      });

      // Prerequisites usage
      const totalPrereqs = milestonesData.reduce((sum, m) => sum + m.prerequisites.length, 0);
      const avgPrereqs = (totalPrereqs / milestonesData.length).toFixed(2);
      console.log(`\nPrerequisites statistics:`);
      console.log(`  - Total prerequisites: ${totalPrereqs}`);
      console.log(`  - Average prerequisites per milestone: ${avgPrereqs}`);
      
      // Longest age spans
      const longSpanMilestones = milestonesData
        .map(m => ({ ...m, span: m.endMonths - m.startMonths }))
        .sort((a, b) => b.span - a.span)
        .slice(0, 5);
      console.log(`\nMilestones with longest age spans:`);
      longSpanMilestones.forEach(m => {
        console.log(`  - ${m.id}: ${m.span} months (${m.startMonths}-${m.endMonths})`);
      });

      console.log('\n======================================\n');
      
      // This test always passes but provides comprehensive data analysis
      expect(milestonesData.length).toBeGreaterThan(0);
    });
  });
});
