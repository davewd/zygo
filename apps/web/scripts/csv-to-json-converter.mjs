#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import Papa from 'papaparse';
import { join } from 'path';

console.log('🔄 Converting comprehensive-milestones.csv to milestones.json...');

// Read the CSV file
const csvPath = join(process.cwd(), 'public', 'data', 'comprehensive-milestones.csv');
const csvContent = readFileSync(csvPath, 'utf-8');

// Parse CSV to JSON
const parseResults = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.trim(),
  transform: (value, header) => {
    // Transform specific fields
    if (header === 'startMonths' || header === 'endMonths') {
      return parseInt(value) || 0;
    }
    if (header === 'isTypical') {
      return value === 'true' || value === true;
    }
    if (header === 'prerequisites' && value) {
      return value.split(',').map(p => p.trim()).filter(p => p);
    }
    if (header === 'skills' && value) {
      return value.split(',').map(s => s.trim()).filter(s => s);
    }
    return value?.trim() || '';
  }
});

if (parseResults.errors.length > 0) {
  console.error('❌ CSV parsing errors:', parseResults.errors);
  process.exit(1);
}

// Convert to milestone format
const milestones = parseResults.data.map((row) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  category: row.category,
  ageRangeKey: row.ageRangeKey,
  ageRange: row.ageRange,
  startMonths: row.startMonths,
  endMonths: row.endMonths,
  period: row.period,
  importance: row.importance,
  isTypical: row.isTypical,
  prerequisites: row.prerequisites || [],
  skills: row.skills || [],
  observationTips: row.observationTips,
  supportStrategies: row.supportStrategies,
  redFlags: row.redFlags,
  resources: row.resources,
  createdDate: row.createdDate,
  modifiedDate: row.modifiedDate
}));

// Write to JSON file
const outputPath = join(process.cwd(), 'public', 'data', 'milestones.json');
writeFileSync(outputPath, JSON.stringify(milestones, null, 2), 'utf-8');

console.log(`✅ Successfully converted ${milestones.length} milestones to ${outputPath}`);

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
