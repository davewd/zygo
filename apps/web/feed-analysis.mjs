#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 DETAILED FEED ITEM ANALYSIS\n');

try {
  const feedItems = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/feed/feed_items.json'), 'utf-8'));

  console.log('📋 FEED ITEM AUTHOR DETAILS:');
  feedItems.forEach((item, index) => {
    console.log(`${index + 1}. Feed ID: ${item.id}`);
    console.log(`   Title: ${item.title}`);
    console.log(`   Author: ${item.author.name}`);
    console.log(`   Handle: ${item.author.handle}`);
    console.log(`   Actor Type: ${item.author.actorType || 'NOT SET'}`);
    if (item.author.providerId) {
      console.log(`   Provider ID: ${item.author.providerId}`);
    }
    console.log('');
  });

} catch (error) {
  console.error('❌ Error:', error.message);
}
