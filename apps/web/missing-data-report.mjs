#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 COMPREHENSIVE DATA CONSISTENCY REPORT\n');

try {
  const communityData = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/community.json'), 'utf-8'));
  const providersData = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/providers.json'), 'utf-8'));
  const feedItems = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/feed/feed_items.json'), 'utf-8'));

  const communityHandles = new Set(communityData.primaryConsumers.map(p => p.handle));
  const providerIds = new Set(providersData.serviceProviders.map(p => p.id));
  
  console.log('📊 CURRENT DATA INVENTORY:');
  console.log(`Community Handles: ${Array.from(communityHandles).join(', ')}`);
  console.log(`Provider IDs: ${Array.from(providerIds).join(', ')}\n`);

  const missingActorTypes = [];
  const missingCommunityProfiles = [];
  const missingProviderProfiles = [];
  const validReferences = [];

  feedItems.forEach(item => {
    const handle = item.author.handle;
    const actorType = item.author.actorType;
    const providerId = item.author.providerId;

    // Check for missing actorType
    if (!actorType) {
      missingActorTypes.push({
        feedId: item.id,
        title: item.title,
        handle: handle,
        authorName: item.author.name
      });
    }

    // Determine what this should be based on existing data
    if (communityHandles.has(handle)) {
      if (actorType !== 'community-member') {
        validReferences.push({
          feedId: item.id,
          handle: handle,
          shouldBe: 'community-member',
          currently: actorType || 'NOT SET'
        });
      }
    } else if (providerId && providerIds.has(providerId)) {
      if (actorType !== 'service-provider') {
        validReferences.push({
          feedId: item.id,
          handle: handle,
          providerId: providerId,
          shouldBe: 'service-provider',
          currently: actorType || 'NOT SET'
        });
      }
    } else if (handle !== 'zygo_app' && handle !== 'family_events' && handle !== 'kambala_school') {
      // These seem like they should have profiles but don't
      if (handle.includes('_mom') || handle.includes('_dad') || handle.includes('_mama') || handle.includes('_nana')) {
        missingCommunityProfiles.push({
          feedId: item.id,
          handle: handle,
          authorName: item.author.name,
          title: item.title
        });
      } else if (handle.includes('_school') || item.author.name.includes('School')) {
        missingProviderProfiles.push({
          feedId: item.id,
          handle: handle,
          authorName: item.author.name,
          title: item.title,
          suggestedId: handle.replace('_', '-')
        });
      } else {
        missingCommunityProfiles.push({
          feedId: item.id,
          handle: handle,
          authorName: item.author.name,
          title: item.title
        });
      }
    }
  });

  console.log('❌ ISSUES FOUND:\n');

  if (missingActorTypes.length > 0) {
    console.log(`🏷️  MISSING ACTOR TYPES (${missingActorTypes.length}):`);
    missingActorTypes.forEach(item => {
      console.log(`   - ${item.feedId}: "${item.title}" by ${item.authorName} (@${item.handle})`);
    });
    console.log('');
  }

  if (missingCommunityProfiles.length > 0) {
    console.log(`👥 MISSING COMMUNITY PROFILES (${missingCommunityProfiles.length}):`);
    missingCommunityProfiles.forEach(item => {
      console.log(`   - Handle: @${item.handle} (${item.authorName})`);
      console.log(`     Used in: ${item.feedId} - "${item.title}"`);
    });
    console.log('');
  }

  if (missingProviderProfiles.length > 0) {
    console.log(`🏥 MISSING PROVIDER PROFILES (${missingProviderProfiles.length}):`);
    missingProviderProfiles.forEach(item => {
      console.log(`   - Handle: @${item.handle} (${item.authorName})`);
      console.log(`     Suggested ID: ${item.suggestedId}`);
      console.log(`     Used in: ${item.feedId} - "${item.title}"`);
    });
    console.log('');
  }

  if (validReferences.length > 0) {
    console.log(`🔧 INCORRECT ACTOR TYPES (${validReferences.length}):`);
    validReferences.forEach(item => {
      console.log(`   - ${item.feedId}: @${item.handle} should be "${item.shouldBe}" but is "${item.currently}"`);
    });
    console.log('');
  }

  console.log('📋 RECOMMENDED ACTIONS:\n');
  
  if (missingCommunityProfiles.length > 0) {
    console.log('1. CREATE MISSING COMMUNITY PROFILES:');
    const uniqueHandles = [...new Set(missingCommunityProfiles.map(p => p.handle))];
    uniqueHandles.forEach(handle => {
      const item = missingCommunityProfiles.find(p => p.handle === handle);
      console.log(`   - Add community profile for @${handle} (${item.authorName})`);
    });
    console.log('');
  }

  if (missingProviderProfiles.length > 0) {
    console.log('2. CREATE MISSING PROVIDER PROFILES:');
    const uniqueProviders = [...new Set(missingProviderProfiles.map(p => p.handle))];
    uniqueProviders.forEach(handle => {
      const item = missingProviderProfiles.find(p => p.handle === handle);
      console.log(`   - Add provider profile with ID "${item.suggestedId}" for @${handle} (${item.authorName})`);
    });
    console.log('');
  }

  if (missingActorTypes.length > 0) {
    console.log('3. SET MISSING ACTOR TYPES:');
    missingActorTypes.forEach(item => {
      let suggestedType = 'unknown';
      if (communityHandles.has(item.handle)) {
        suggestedType = 'community-member';
      } else if (item.handle === 'zygo_app') {
        suggestedType = 'system';
      } else if (item.handle.includes('_school')) {
        suggestedType = 'service-provider';
      } else if (item.handle.includes('_mom') || item.handle.includes('_dad') || item.handle.includes('_mama') || item.handle.includes('_nana')) {
        suggestedType = 'community-member';
      }
      console.log(`   - ${item.feedId}: Set actorType to "${suggestedType}" for @${item.handle}`);
    });
  }

  const totalIssues = missingActorTypes.length + missingCommunityProfiles.length + missingProviderProfiles.length;
  console.log(`\n🏁 SUMMARY: Found ${totalIssues} data consistency issues that need to be addressed.`);

} catch (error) {
  console.error('❌ Error:', error.message);
}
