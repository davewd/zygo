#!/usr/bin/env tsx
/**
 * Script to convert milestone data from TypeScript generation to CSV format
 * This extracts data from milestoneGeneration.ts and creates a CSV file
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { generateAgeRanges, generateComprehensiveMilestones } from '../components/timeline/utils/milestoneGeneration';

// Generate the milestone data
const ageRanges = generateAgeRanges();
const milestones = generateComprehensiveMilestones();

console.log(`Generated ${milestones.length} milestones across ${ageRanges.length} age ranges`);

// CSV Header
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

// Convert milestone data to CSV rows
const csvRows = milestones.map(milestone => [
  milestone.id,
  milestone.title,
  milestone.description,
  milestone.category,
  milestone.ageRangeKey,
  milestone.ageRange,
  milestone.months[0].toString(), // startMonths
  milestone.months[1].toString(), // endMonths
  milestone.period,
  milestone.importance,
  milestone.isTypical.toString(),
  '', // prerequisites (empty for now)
  milestone.title.split(' ').slice(0, 2).join(' '), // skills (simplified)
  `Observe child's progress with ${milestone.title.toLowerCase()}`, // observationTips
  `Encourage and support ${milestone.title.toLowerCase()} development`, // supportStrategies
  `Significant delays or concerns with ${milestone.title.toLowerCase()}`, // redFlags
  `Resources for ${milestone.title.toLowerCase()} development`, // resources
  milestone.createdDate,
  milestone.modifiedDate
]);

// Escape CSV values and wrap in quotes if needed
const escapeCsvValue = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

// Create CSV content
const csvContent = [
  csvHeaders.join(','),
  ...csvRows.map(row => row.map(escapeCsvValue).join(','))
].join('\n');

// Write to file
const outputPath = join(process.cwd(), 'public', 'data', 'generated-milestones.csv');
writeFileSync(outputPath, csvContent, 'utf-8');

console.log(`✅ Successfully wrote ${milestones.length} milestones to ${outputPath}`);

// Print some statistics
const stats = {
  total: milestones.length,
  byCategory: {} as Record<string, number>,
  byPeriod: {} as Record<string, number>,
  byImportance: {} as Record<string, number>
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
