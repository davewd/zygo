#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 DATA CONSISTENCY ANALYSIS\n');

try {
  // Load data files
  const communityData = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/community.json'), 'utf-8'));
  const providersData = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/providers.json'), 'utf-8'));
  const feedItems = JSON.parse(readFileSync(join(__dirname, 'src/lib/api/data/feed/feed_items.json'), 'utf-8'));

  // Extract community profile IDs and handles
  const communityIds = new Set(communityData.primaryConsumers.map(p => p.id));
  const communityHandles = new Set(communityData.primaryConsumers.map(p => p.handle));
  
  // Extract provider IDs
  const providerIds = new Set(providersData.serviceProviders.map(p => p.id));
  
  console.log('📊 DATA OVERVIEW:');
  console.log(`   Community Profiles: ${communityData.primaryConsumers.length}`);
  console.log(`   Community IDs: ${Array.from(communityIds).join(', ')}`);
  console.log(`   Community Handles: ${Array.from(communityHandles).join(', ')}`);
  console.log(`   Service Providers: ${providersData.serviceProviders.length}`);
  console.log(`   Provider IDs: ${Array.from(providerIds).join(', ')}`);
  console.log(`   Feed Items: ${feedItems.length}\n`);

  // Check community members in feed
  console.log('🔍 CHECKING COMMUNITY MEMBER REFERENCES:');
  let communityIssues = [];
  
  feedItems.forEach(item => {
    if (item.author.actorType === 'community-member') {
      const handle = item.author.handle;
      const handleWithoutAt = handle.replace('@', '');
      
      if (!communityHandles.has(handle) && !communityHandles.has(handleWithoutAt)) {
        communityIssues.push({
          feedId: item.id,
          handle: handle,
          title: item.title
        });
      }
    }
  });

  if (communityIssues.length > 0) {
    console.log('❌ Missing community member profiles:');
    communityIssues.forEach(issue => {
      console.log(`   - Feed "${issue.title}" (${issue.feedId}) uses handle "${issue.handle}" - NOT FOUND`);
    });
  } else {
    console.log('✅ All community member references are valid');
  }

  // Check service providers in feed
  console.log('\n🔍 CHECKING SERVICE PROVIDER REFERENCES:');
  let providerIssues = [];
  
  feedItems.forEach(item => {
    if (item.author.actorType === 'service-provider') {
      const providerId = item.author.providerId;
      const handle = item.author.handle;
      
      if (providerId && !providerIds.has(providerId)) {
        providerIssues.push({
          feedId: item.id,
          providerId: providerId,
          handle: handle,
          title: item.title
        });
      }
    }
  });

  if (providerIssues.length > 0) {
    console.log('❌ Missing service provider profiles:');
    providerIssues.forEach(issue => {
      console.log(`   - Feed "${issue.title}" (${issue.feedId}) uses providerId "${issue.providerId}" - NOT FOUND`);
    });
  } else {
    console.log('✅ All service provider references are valid');
  }

  // Feed items by actor type
  console.log('\n📈 FEED ITEMS BY ACTOR TYPE:');
  const actorCounts = {};
  feedItems.forEach(item => {
    const actorType = item.author.actorType || 'unknown';
    actorCounts[actorType] = (actorCounts[actorType] || 0) + 1;
  });
  
  Object.entries(actorCounts).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });

  // Summary
  const totalIssues = communityIssues.length + providerIssues.length;
  console.log(`\n🏁 SUMMARY:`);
  if (totalIssues === 0) {
    console.log('✅ All data consistency checks passed!');
  } else {
    console.log(`❌ Found ${totalIssues} data consistency issues that need to be addressed.`);
    
    if (communityIssues.length > 0) {
      console.log('\n📋 MISSING COMMUNITY PROFILES TO CREATE:');
      communityIssues.forEach(issue => {
        console.log(`   - Need to create community profile with handle: ${issue.handle}`);
      });
    }
    
    if (providerIssues.length > 0) {
      console.log('\n📋 MISSING PROVIDER PROFILES TO CREATE:');
      providerIssues.forEach(issue => {
        console.log(`   - Need to create service provider with ID: ${issue.providerId}`);
      });
    }
  }

} catch (error) {
  console.error('❌ Error running analysis:', error.message);
}
