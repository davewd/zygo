#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(process.cwd(), 'public', 'data', 'comprehensive-milestones.csv');
let csvContent = fs.readFileSync(csvPath, 'utf-8');

console.log('Fixing ageRangeKey values in CSV...');

// Define the mapping from old keys to new keys
const keyMappings = {
  'prenatal-first': 'prenatal_early',
  'prenatal-second': 'prenatal_late', 
  'prenatal-third': 'prenatal_late',
  'months-0-6': 'infancy_0_6',
  'months-6-12': 'infancy_6_12',
  'months-12-18': 'infancy_12_18',
  'months-18-24': 'early_childhood_18_24',
  'months-24-30': 'early_childhood_24_30',
  'months-30-36': 'early_childhood_30_36',
  'months-36-42': 'early_childhood_36_42',
  'months-42-48': 'early_childhood_42_48',
  'months-48-54': 'early_childhood_48_54',
  'months-54-60': 'early_childhood_54_60',
  'year-5-6': 'school_age_60_72',
  'year-6-7': 'school_age_72_84',
  'year-7-8': 'school_age_84_96',
  'teen-12-14': 'adolescence_144_168',
  'teen-14-16': 'adolescence_168_192',
  'teen-16-18': 'adolescence_192_216'
};

// Apply the mappings
Object.entries(keyMappings).forEach(([oldKey, newKey]) => {
  const regex = new RegExp(oldKey, 'g');
  csvContent = csvContent.replace(regex, newKey);
});

// Write the corrected CSV back
fs.writeFileSync(csvPath, csvContent, 'utf-8');

console.log('✅ Fixed ageRangeKey values in CSV file');

// Verify the changes by counting occurrences
const lines = csvContent.split('\n');
const ageRangeKeys = new Set();
lines.slice(1).forEach(line => {
  if (line.trim()) {
    const parts = line.split(',');
    if (parts[4]) {
      ageRangeKeys.add(parts[4]);
    }
  }
});

console.log('📊 Current ageRangeKey values:', Array.from(ageRangeKeys).sort());
