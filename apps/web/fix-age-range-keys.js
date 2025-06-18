#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, 'public', 'data', 'comprehensive-milestones.csv');
let csvContent = fs.readFileSync(csvPath, 'utf-8');

console.log('Fixing ageRangeKey values to match generated age ranges...');

// Define the mapping from CSV keys to generated age range keys
const keyMappings = {
  // These are already correct (using underscores)
  'prenatal_early': 'prenatal_early',
  'prenatal_late': 'prenatal_late', 
  'infancy_0_6': 'infancy_0_6',
  'infancy_6_12': 'infancy_6_12',
  'infancy_12_18': 'early_childhood_12_18', // Note: these transition to early_childhood
  
  // These need to be fixed (currently using hyphens)
  'months-18-24': 'early_childhood_18_24',
  'months-24-30': 'early_childhood_24_30',
  'months-30-36': 'early_childhood_30_36',
  'months-36-42': 'preschool_36_42',
  'months-42-48': 'preschool_42_48',
  'months-48-54': 'preschool_48_54',
  'months-54-60': 'preschool_54_60',
  'year-5-6': 'school_age_60_72',
  'year-6-7': 'school_age_72_84', 
  'year-7-8': 'school_age_84_96',
  'teen-12-14': 'adolescence_144_168',
  'teen-14-16': 'adolescence_168_192',
  'teen-16-18': 'adolescence_192_216',
};

// Apply mappings
Object.entries(keyMappings).forEach(([oldKey, newKey]) => {
  if (oldKey !== newKey) {
    // Use a more specific regex to only replace the ageRangeKey column (5th column)
    const lines = csvContent.split('\n');
    const updatedLines = lines.map(line => {
      if (line.includes(oldKey)) {
        const columns = line.split(',');
        if (columns.length > 4 && columns[4] === oldKey) {
          columns[4] = newKey;
          return columns.join(',');
        }
      }
      return line;
    });
    csvContent = updatedLines.join('\n');
    console.log(`✅ Replaced ${oldKey} -> ${newKey}`);
  }
});

// Write the updated CSV
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
