import { writeFileSync } from 'fs';
import { join } from 'path';

// Import the generation functions
import { generateAgeRanges, generateComprehensiveMilestones } from '../components/timeline/utils/milestoneGeneration.js';

console.log('Generating milestone data...');

// Generate the milestone data
const ageRanges = generateAgeRanges();
const milestones = generateComprehensiveMilestones();

console.log(`Generated ${milestones.length} milestones across ${ageRanges.length} age ranges`);

// CSV Header matching the existing structure
const csvHeaders = [
  'id',
  'title', 
  'description',
  'category',
  'ageRangeKey',
  'ageRange', 
  'startMonths',
  'endMonths',
  'period',
  'importance',
  'isTypical',
  'prerequisites',
  'skills',
  'observationTips',
  'supportStrategies', 
  'redFlags',
  'resources',
  'createdDate',
  'modifiedDate'
];

// Escape CSV values
const escapeCsvValue = (value) => {
  const str = String(value || '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Convert milestone data to CSV rows
const csvRows = milestones.map(milestone => [
  milestone.id,
  milestone.title,
  milestone.description,
  milestone.category,
  milestone.ageRangeKey,
  milestone.ageRange,
  milestone.months[0], // startMonths
  milestone.months[1], // endMonths
  milestone.period,
  milestone.importance,
  milestone.isTypical,
  '', // prerequisites (empty for generated data)
  milestone.title.split(' ').slice(0, 2).join(' '), // skills (simplified)
  `Observe child's progress with ${milestone.title.toLowerCase()}`, // observationTips
  `Encourage and support ${milestone.title.toLowerCase()} development`, // supportStrategies
  `Significant delays with ${milestone.title.toLowerCase()}`, // redFlags
  `Resources for ${milestone.title.toLowerCase()} development`, // resources
  milestone.createdDate,
  milestone.modifiedDate
]);

// Create CSV content
const csvContent = [
  csvHeaders.join(','),
  ...csvRows.map(row => row.map(escapeCsvValue).join(','))
].join('\n');

// Write to file
const outputPath = join(process.cwd(), 'public', 'data', 'comprehensive-milestones.csv');
writeFileSync(outputPath, csvContent, 'utf-8');

console.log(`✅ Successfully wrote ${milestones.length} milestones to comprehensive-milestones.csv`);

// Print statistics
const stats = {
  total: milestones.length,
  byCategory: {},
  byPeriod: {},
  byImportance: {}
};

milestones.forEach(milestone => {
  stats.byCategory[milestone.category] = (stats.byCategory[milestone.category] || 0) + 1;
  stats.byPeriod[milestone.period] = (stats.byPeriod[milestone.period] || 0) + 1;
  stats.byImportance[milestone.importance] = (stats.byImportance[milestone.importance] || 0) + 1;
});

console.log('\n📊 Milestone Statistics:');
console.log('By Category:', stats.byCategory);
console.log('By Period:', stats.byPeriod); 
console.log('By Importance:', stats.byImportance);
