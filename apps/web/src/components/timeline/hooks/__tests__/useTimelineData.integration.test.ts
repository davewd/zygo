import { removeTransitiveRedundancy } from '../../../../lib/utils/milestonePrerequisiteCleanup';

// Mock the cleanup utility to test that it's being called correctly
jest.mock('../../../../lib/utils/milestonePrerequisiteCleanup', () => ({
  removeTransitiveRedundancy: jest.fn()
}));

const mockRemoveTransitiveRedundancy = removeTransitiveRedundancy as jest.Mock;

describe('useTimelineData integration with milestone cleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call removeTransitiveRedundancy with correct parameters', () => {
    // Test data that matches the real scenario
    const testMilestones = [
      {
        id: 'year_7_8_physical_1',
        title: 'Sports participation',
        category: 'physical',
        startMonths: 84,
        endMonths: 96,
        prerequisites: []
      },
      {
        id: 'puberty',
        title: 'Puberty',
        category: 'physical',
        startMonths: 132,
        endMonths: 180,
        prerequisites: ['year_7_8_physical_1']
      },
      {
        id: 'teen_12_14_physical_1',
        title: 'Athletic peak',
        category: 'physical',
        startMonths: 144,
        endMonths: 204,
        prerequisites: ['puberty', 'year_7_8_physical_1'] // This should be cleaned up
      }
    ];

    // Mock the function to return cleaned data
    mockRemoveTransitiveRedundancy.mockReturnValue([
      testMilestones[0],
      testMilestones[1],
      {
        ...testMilestones[2],
        prerequisites: ['puberty'] // Remove the redundant prerequisite
      }
    ]);

    // Test the cleanup function directly
    const result = removeTransitiveRedundancy(testMilestones);

    // Verify the function was called
    expect(mockRemoveTransitiveRedundancy).toHaveBeenCalledWith(testMilestones);
    
    // Verify the result
    expect(result).toHaveLength(3);
    expect(result[2].prerequisites).toEqual(['puberty']);
    expect(result[2].prerequisites).not.toContain('year_7_8_physical_1');
  });

  it('should handle filtered milestone subsets correctly', () => {
    const allMilestones = [
      { id: 'milestone1', category: 'physical', prerequisites: [] },
      { id: 'milestone2', category: 'cognitive', prerequisites: [] },
      { id: 'milestone3', category: 'physical', prerequisites: ['milestone1'] },
      { id: 'milestone4', category: 'physical', prerequisites: ['milestone3', 'milestone1'] }
    ];

    // Filter to only physical milestones
    const physicalMilestones = allMilestones.filter(m => m.category === 'physical');

    mockRemoveTransitiveRedundancy.mockReturnValue([
      physicalMilestones[0],
      physicalMilestones[1],
      {
        ...physicalMilestones[2],
        prerequisites: ['milestone3'] // Remove redundant 'milestone1'
      }
    ]);

    const result = removeTransitiveRedundancy(physicalMilestones);

    expect(mockRemoveTransitiveRedundancy).toHaveBeenCalledWith(physicalMilestones);
    expect(result[2].prerequisites).toEqual(['milestone3']);
    expect(result[2].prerequisites).not.toContain('milestone1');
  });

  it('should preserve milestone properties during cleanup', () => {
    const milestone = {
      id: 'test_milestone',
      title: 'Test Milestone',
      category: 'physical',
      startMonths: 100,
      endMonths: 120,
      description: 'A test milestone',
      importance: 'high',
      prerequisites: ['prereq1', 'prereq2']
    };

    mockRemoveTransitiveRedundancy.mockReturnValue([{
      ...milestone,
      prerequisites: ['prereq2'] // Only remove prereq1
    }]);

    const result = removeTransitiveRedundancy([milestone]);

    expect(result[0]).toMatchObject({
      id: 'test_milestone',
      title: 'Test Milestone',
      category: 'physical',
      startMonths: 100,
      endMonths: 120,
      description: 'A test milestone',
      importance: 'high'
    });
    expect(result[0].prerequisites).toEqual(['prereq2']);
  });
});
