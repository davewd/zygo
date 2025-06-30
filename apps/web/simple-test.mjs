#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📁 Testing file loading...');

try {
  const communityPath = join(__dirname, 'src/lib/api/data/community.json');
  const communityData = JSON.parse(readFileSync(communityPath, 'utf-8'));
  console.log('✅ Community data loaded:', Object.keys(communityData));
  
  const providersPath = join(__dirname, 'src/lib/api/data/providers.json');
  const providersData = JSON.parse(readFileSync(providersPath, 'utf-8'));
  console.log('✅ Providers data loaded:', Object.keys(providersData));
  
  const feedPath = join(__dirname, 'src/lib/api/data/feed/feed_items.json');
  const feedData = JSON.parse(readFileSync(feedPath, 'utf-8'));
  console.log('✅ Feed data loaded. Type:', Array.isArray(feedData) ? 'Array' : 'Object');
  console.log('✅ Feed data keys:', Array.isArray(feedData) ? `Length: ${feedData.length}` : Object.keys(feedData));
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
