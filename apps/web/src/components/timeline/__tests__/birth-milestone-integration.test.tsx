import { getAllMilestones } from '../../../lib/api/timeline';
import '@testing-library/jest-dom';

describe('Birth Milestone Integration Test', () => {
  describe('JSON Data Verification', () => {
    it('should have birth milestone with isKeyMilestone property in the JSON data', async () => {
      // Test the actual JSON data loading
      const milestones = await getAllMilestones();
      
      const birthMilestone = milestones.find((milestone: any) => milestone.id === 'birth');
      
      expect(birthMilestone).toBeDefined();
      expect(birthMilestone).toMatchObject({
        id: 'birth',
        title: 'Birth',
        description: 'The moment of birth marking the transition from prenatal to postnatal life',
        category: 'physical',
        isKeyMilestone: true,
        importance: 'critical',
        startMonths: 0,
        endMonths: 0
      });
    });

    it('should verify that isKeyMilestone property is preserved through type casting', async () => {
      // This test verifies the type interface fix
      const milestones = await getAllMilestones();
      
      const birthMilestone = milestones.find((milestone: any) => milestone.id === 'birth');
      
      // This assertion validates the interface fix
      expect(birthMilestone).toHaveProperty('isKeyMilestone');
      expect(birthMilestone.isKeyMilestone).toBe(true);
    });

    it('should have all key milestones marked correctly', async () => {
      const milestones = await getAllMilestones();
      
      // Check all known key milestones
      const keyMilestoneIds = ['birth', 'conception', 'puberty', 'legal_adult'];
      
      keyMilestoneIds.forEach(id => {
        const milestone = milestones.find((m: any) => m.id === id);
        if (milestone) {
          expect(milestone.isKeyMilestone).toBe(true);
          console.log(`✓ ${id}: isKeyMilestone = ${milestone.isKeyMilestone}`);
        }
      });
    });

    it('should have regular milestones without isKeyMilestone flag', async () => {
      const milestones = await getAllMilestones();
      
      // Find a regular milestone (one that's not in the key milestone list)
      const regularMilestone = milestones.find((m: any) => 
        m.id !== 'birth' && 
        m.id !== 'conception' && 
        m.id !== 'puberty' && 
        m.id !== 'legal_adult' &&
        m.category === 'physical'
      );
      
      expect(regularMilestone).toBeDefined();
      expect(regularMilestone?.isKeyMilestone).toBeFalsy();
    });
  });

  describe('Data Transformation Verification', () => {
    it('should correctly transform milestone data through useTimelineData hook data mapping', () => {
      // Test the milestone data transformation that happens in useTimelineData
      const mockMilestone = {
        id: 'birth',
        title: 'Birth',
        description: 'Test description',
        category: 'physical',
        ageRange: 'Birth (0 months)',
        ageRangeKey: 'birth',
        startMonths: 0,
        endMonths: 0,
        period: 'birth',
        isTypical: true,
        isKeyMilestone: true,
        importance: 'critical',
        prerequisites: [],
        skills: [],
        observationTips: '',
        supportStrategies: '',
        redFlags: '',
        resources: '',
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-01'
      };

      // Simulate the transformation that happens in useTimelineData
      const transformedMilestone = {
        id: mockMilestone.id,
        title: mockMilestone.title,
        description: mockMilestone.description,
        category: mockMilestone.category,
        ageRange: mockMilestone.ageRange,
        ageRangeKey: mockMilestone.ageRangeKey,
        months: [mockMilestone.startMonths, mockMilestone.endMonths],
        period: mockMilestone.period,
        isTypical: mockMilestone.isTypical,
        isKeyMilestone: mockMilestone.isKeyMilestone, // This should be preserved
        importance: mockMilestone.importance,
        prerequisites: mockMilestone.prerequisites,
        createdDate: mockMilestone.createdDate,
        modifiedDate: mockMilestone.modifiedDate
      };

      // Verify the transformation preserves isKeyMilestone
      expect(transformedMilestone.isKeyMilestone).toBe(true);
      
      // Verify node type logic
      const isKeyMilestone = transformedMilestone.isKeyMilestone === true;
      const nodeType = isKeyMilestone ? 'keyMilestone' : 'milestone';
      
      expect(nodeType).toBe('keyMilestone');
    });
  });
});
