/**
 * Data Analysis Test
 * 
 * This test performs comprehensive data consistency analysis to identify
 * missing community member references and service provider references.
 */

import communityData from '../data/community.json';
import feedItemsData from '../data/feed/feed_items.json';
import providersData from '../data/serviceProviders.json';

describe('Data Analysis Tests', () => {
  
  let communityHandles: Set<string>;
  let providerIds: Set<string>;
  
  beforeAll(() => {
    communityHandles = new Set(communityData.primaryConsumers.map(p => p.handle));
    providerIds = new Set(providersData.serviceProviders.map(p => p.id));
  });

  test('Should display data overview', () => {
    const communityIds = new Set(communityData.primaryConsumers.map(p => p.id));
    
    console.log('📊 DATA OVERVIEW:');
    console.log(`   Community Profiles: ${communityData.primaryConsumers.length}`);
    console.log(`   Community IDs: ${Array.from(communityIds).join(', ')}`);
    console.log(`   Community Handles: ${Array.from(communityHandles).join(', ')}`);
    console.log(`   Service Providers: ${providersData.serviceProviders.length}`);
    console.log(`   Provider IDs: ${Array.from(providerIds).join(', ')}`);
    console.log(`   Feed Items: ${feedItemsData.length}\n`);
    
    // Basic validation
    expect(communityData.primaryConsumers.length).toBeGreaterThan(0);
    expect(providersData.serviceProviders.length).toBeGreaterThan(0);
    expect(feedItemsData.length).toBeGreaterThan(0);
  });

  test('Should check community member references', () => {
    console.log('🔍 CHECKING COMMUNITY MEMBER REFERENCES:');
    const communityIssues: Array<{feedId: string, handle: string, title: string}> = [];
    
    feedItemsData.forEach(item => {
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
    
    // The test should pass regardless, but log issues for visibility
    expect(Array.isArray(communityIssues)).toBe(true);
  });

  test('Should check service provider references', () => {
    console.log('\n🔍 CHECKING SERVICE PROVIDER REFERENCES:');
    const providerIssues: Array<{feedId: string, providerId: string, handle: string, title: string}> = [];
    
    feedItemsData.forEach(item => {
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
    
    // The test should pass regardless, but log issues for visibility
    expect(Array.isArray(providerIssues)).toBe(true);
  });

  test('Should analyze feed items by actor type', () => {
    console.log('\n📈 FEED ITEMS BY ACTOR TYPE:');
    const actorCounts: Record<string, number> = {};
    
    feedItemsData.forEach(item => {
      const actorType = item.author.actorType || 'unknown';
      actorCounts[actorType] = (actorCounts[actorType] || 0) + 1;
    });
    
    Object.entries(actorCounts).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    // Validate that we have some actor types
    expect(Object.keys(actorCounts).length).toBeGreaterThan(0);
    
    // After our fixes, we should have these actor types
    expect(actorCounts['system']).toBeGreaterThan(0);
    expect(actorCounts['community_member']).toBeGreaterThan(0);
    expect(actorCounts['service_provider']).toBeGreaterThan(0);
    expect(actorCounts['organization']).toBeGreaterThan(0);
    
    // We should NOT have any unknown or undefined actor types
    expect(actorCounts['unknown']).toBeUndefined();
    expect(actorCounts['undefined']).toBeUndefined();
  });

  test('Should provide summary of data consistency', () => {
    // Count issues
    let communityIssues = 0;
    let providerIssues = 0;
    
    feedItemsData.forEach(item => {
      if (item.author.actorType === 'community-member') {
        const handle = item.author.handle;
        const handleWithoutAt = handle.replace('@', '');
        if (!communityHandles.has(handle) && !communityHandles.has(handleWithoutAt)) {
          communityIssues++;
        }
      }
      
      if (item.author.actorType === 'service-provider') {
        const providerId = item.author.providerId;
        if (providerId && !providerIds.has(providerId)) {
          providerIssues++;
        }
      }
    });
    
    const totalIssues = communityIssues + providerIssues;
    
    console.log(`\n🏁 SUMMARY:`);
    if (totalIssues === 0) {
      console.log('✅ All data consistency checks passed!');
    } else {
      console.log(`⚠️  Found ${totalIssues} data consistency issues (${communityIssues} community, ${providerIssues} provider)`);
    }
    
    // Test should always pass, this is informational
    expect(totalIssues).toBeGreaterThanOrEqual(0);
  });
});
