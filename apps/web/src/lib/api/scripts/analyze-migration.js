#!/usr/bin/env node

/**
 * Migration Script for API Data Refactoring
 * 
 * This script helps identify files that need to be migrated from direct data imports
 * to the new API-based approach.
 */

import fs from 'fs';
import path from 'path';

// Patterns to look for in files that indicate they need migration
const MIGRATION_PATTERNS = [
  // Direct data imports from the old structure
  /import.*from\s+['"`].*\/data\/network\//g,
  /import.*from\s+['"`].*\/data\/community\//g,
  /import.*from\s+['"`].*\/data\/credentials\//g,
  
  // Direct usage of exported constants
  /PRIMARY_CONSUMERS/g,
  /COMMUNITY_PROFILES/g,
  /REBECCA_CAVALLARO/g,
  /DR_JUSTIN_TUCKER/g,
  /EMILY_MCCONAGHY/g,
  /FULL_CIRCLE_CENTER/g,
  /PROLOGUE_CENTER/g,
  /ACTIVE8_CENTER/g,
];

// New API imports that should be used instead
const API_REPLACEMENTS = {
  'PRIMARY_CONSUMERS': 'getAllPrimaryConsumers() from lib/api/community',
  'COMMUNITY_PROFILES': 'getAllCommunityProfiles() from lib/api/community',
  'REBECCA_CAVALLARO': 'getServiceProviderById("rebecca-cavallaro") from lib/api/providers',
  'DR_JUSTIN_TUCKER': 'getServiceProviderById("dr-justin-tucker") from lib/api/providers',
  'EMILY_MCCONAGHY': 'getServiceProviderById("emily-mcconaghy") from lib/api/providers',
};

/**
 * Recursively find all TypeScript/React files in a directory
 */
function findFilesToScan(dir, extensions = ['.ts', '.tsx']) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const entries = fs.readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (stat.isFile() && extensions.some(ext => entry.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

/**
 * Analyze a file for migration patterns
 */
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for migration patterns
    for (const pattern of MIGRATION_PATTERNS) {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: 'needs_migration',
          pattern: pattern.toString(),
          matches: matches,
          file: filePath
        });
      }
    }
    
    return issues;
  } catch (error) {
    return [{
      type: 'error',
      message: `Failed to read file: ${error.message}`,
      file: filePath
    }];
  }
}

/**
 * Generate migration suggestions for a file
 */
function generateMigrationSuggestions(filePath, issues) {
  const suggestions = [];
  
  for (const issue of issues) {
    if (issue.type === 'needs_migration') {
      for (const match of issue.matches) {
        if (API_REPLACEMENTS[match]) {
          suggestions.push(`Replace "${match}" with "${API_REPLACEMENTS[match]}"`);
        } else {
          suggestions.push(`Migrate "${match}" to appropriate API call`);
        }
      }
    }
  }
  
  return [...new Set(suggestions)]; // Remove duplicates
}

/**
 * Main migration analysis function
 */
function runMigrationAnalysis(srcDir) {
  console.log('🔍 Scanning for files that need API migration...\n');
  
  const files = findFilesToScan(srcDir);
  const migrationReport = [];
  
  for (const file of files) {
    const issues = analyzeFile(file);
    
    if (issues.length > 0 && issues.some(issue => issue.type === 'needs_migration')) {
      migrationReport.push({
        file: file.replace(srcDir, ''),
        issues: issues.filter(issue => issue.type === 'needs_migration'),
        suggestions: generateMigrationSuggestions(file, issues)
      });
    }
  }
  
  // Generate report
  if (migrationReport.length === 0) {
    console.log('✅ No files found that need migration!');
    return;
  }
  
  console.log(`📋 Found ${migrationReport.length} files that need migration:\n`);
  
  for (const report of migrationReport) {
    console.log(`📁 ${report.file}`);
    console.log('   Issues found:');
    
    for (const issue of report.issues) {
      console.log(`   - Pattern: ${issue.pattern}`);
      console.log(`   - Matches: ${issue.matches.join(', ')}`);
    }
    
    if (report.suggestions.length > 0) {
      console.log('   Suggestions:');
      for (const suggestion of report.suggestions) {
        console.log(`   💡 ${suggestion}`);
      }
    }
    
    console.log('');
  }
  
  // Summary
  console.log('📊 Migration Summary:');
  console.log(`   Total files needing migration: ${migrationReport.length}`);
  console.log(`   Total files scanned: ${files.length}`);
  console.log('');
  console.log('📖 Next steps:');
  console.log('   1. See MIGRATION_GUIDE.md for detailed instructions');
  console.log('   2. Update imports to use API functions');
  console.log('   3. Add async/await patterns for data loading');
  console.log('   4. Implement loading and error states');
  console.log('   5. Test components thoroughly');
}

// Run the analysis
const srcDir = process.argv[2] || './src';

if (!fs.existsSync(srcDir)) {
  console.error(`❌ Directory not found: ${srcDir}`);
  process.exit(1);
}

runMigrationAnalysis(srcDir);
