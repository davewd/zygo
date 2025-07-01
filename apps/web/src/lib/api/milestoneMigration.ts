/**
 * Migration utilities for moving from TypeScript generation to CSV-based milestones
 */

// import { generateComprehensiveMilestones } from '../../components/timeline/utils/milestoneGeneration';
import { loadMilestonesFromJSON } from './milestones';

/**
 * Compare generated milestones with JSON data to ensure consistency
 * NOTE: This function is deprecated as we no longer generate milestones programmatically
 */
export async function compareGeneratedWithCSV() {
  console.warn('compareGeneratedWithCSV is deprecated - milestones are now stored as static JSON');
  
  try {
    const jsonMilestones = await loadMilestonesFromJSON();
    
    console.log('📊 Milestone Data:');
    console.log(`JSON: ${jsonMilestones.length} milestones`);
    
    // Show JSON categories
    const jsonByCategory = jsonMilestones.reduce((acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('JSON by category:', jsonByCategory);
    
    return {
      json: jsonMilestones,
      jsonByCategory
    };
  } catch (error) {
    console.error('Error loading milestones:', error);
    throw error;
  }
}

/**
 * Export generated milestones to CSV format for verification
 * NOTE: This function is deprecated as we've moved from CSV to JSON
 */
export function exportGeneratedToCSV() {
  console.warn('exportGeneratedToCSV is deprecated - milestones are now stored as JSON');
  return 'CSV export is no longer supported - milestones are now in JSON format';
}

/**
 * Migration status check
 */
export function getMigrationStatus() {
  return {
    status: 'completed',
    description: 'Milestone data has been successfully migrated from CSV to JSON format',
    jsonLocation: '/public/data/milestones.json',
    deprecatedCsvLocation: '/public/data/comprehensive-milestones.csv (deprecated)',
    apiLocation: '/src/lib/api/milestones.ts',
    nextSteps: [
      'All components now use loadMilestonesFromJSON() for milestone data',
      'CSV references have been removed from the codebase',
      'Consider removing the CSV file after thorough testing'
    ]
  };
}
