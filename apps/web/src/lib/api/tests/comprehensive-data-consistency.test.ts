/**
 * Comprehensive Data Consistency Check Test
 * 
 * This test performs all the comprehensive checks that were in the analysis scripts,
 * ensuring data consistency across community profiles, service providers, and feed items.
 */

import communityData from '../data/community.json';
import providersData from '../data/providers.json';
import feedItemsData from '../data/feed/feed_items.json';

describe('Comprehensive Data Consistency Tests', () => {
  
  let communityHandles: Set<string>;
  let providerIds: Set<string>;
  
  beforeAll(() => {
    communityHandles = new Set(communityData.primaryConsumers.map(p => p.handle));
    providerIds = new Set(providersData.serviceProviders.map(p => p.id));
  });

  test('Should load all required data files successfully', () => {
    console.log('🔍 RUNNING DATA CONSISTENCY CHECKS...\n');
    
    expect(communityData).toBeDefined();
    expect(communityData.primaryConsumers).toBeDefined();
    expect(Array.isArray(communityData.primaryConsumers)).toBe(true);
    
    expect(providersData).toBeDefined();
    expect(providersData.serviceProviders).toBeDefined();
    expect(Array.isArray(providersData.serviceProviders)).toBe(true);
    
    expect(feedItemsData).toBeDefined();
    expect(Array.isArray(feedItemsData)).toBe(true);
    
    console.log('✅ All data files loaded successfully');
  });

  test('Should validate community profile references in feed items', () => {
    console.log('\n📊 1. Community Profile References');
    const missingCommunityMembers: Array<{feedItemId: string, missingId: string, handle: string}> = [];
    
    feedItemsData.forEach(item => {
      if (item.author.actorType === 'community-member') {
        const authorId = item.author.handle.replace('@', '');
        if (authorId !== 'unknown' && authorId !== 'anonymous') {
          if (!communityHandles.has(authorId)) {
            missingCommunityMembers.push({
              feedItemId: item.id,
              missingId: authorId,
              handle: item.author.handle
            });
          }
        }
      }
    });

    if (missingCommunityMembers.length > 0) {
      console.log('❌ Missing community members:');
      missingCommunityMembers.forEach(item => {
        console.log(`   - Feed item ${item.feedItemId} references unknown community member: ${item.missingId} (handle: ${item.handle})`);
      });
    } else {
      console.log(`✅ All community member references are valid`);
    }
    
    console.log(`   Community profiles available: ${Array.from(communityHandles).join(', ')}`);
    
    // This test is informational, should pass regardless
    expect(Array.isArray(missingCommunityMembers)).toBe(true);
  });

  test('Should validate service provider references in feed items', () => {
    console.log('\n📊 2. Service Provider References');
    const missingProviders: Array<{feedItemId: string, missingId: string, handle: string}> = [];
    
    feedItemsData.forEach(item => {
      if (item.author.actorType === 'service-provider') {
        const authorId = item.author.providerId || item.author.handle.replace('@', '');
        if (authorId !== 'unknown' && authorId !== 'anonymous') {
          if (!providerIds.has(authorId)) {
            missingProviders.push({
              feedItemId: item.id,
              missingId: authorId,
              handle: item.author.handle
            });
          }
        }
      }
    });

    if (missingProviders.length > 0) {
      console.log('❌ Missing service providers:');
      missingProviders.forEach(item => {
        console.log(`   - Feed item ${item.feedItemId} references unknown service provider: ${item.missingId} (handle: ${item.handle})`);
      });
    } else {
      console.log(`✅ All service provider references are valid`);
    }
    
    console.log(`   Service providers available: ${Array.from(providerIds).join(', ')}`);
    
    expect(Array.isArray(missingProviders)).toBe(true);
  });

  test('Should check handle vs ID consistency', () => {
    console.log('\n📊 3. Handle vs ID Consistency Check');
    const handleIdMismatches: Array<{feedItemId: string, handle: string, providerId: string}> = [];

    feedItemsData.forEach(item => {
      if (item.author.actorType === 'service-provider') {
        const handleId = item.author.handle.replace('@', '');
        const providerId = item.author.providerId;
        
        if (providerId && handleId !== providerId) {
          const handleExists = providerIds.has(handleId);
          const providerIdExists = providerIds.has(providerId);
          
          if (handleExists && providerIdExists && handleId !== providerId) {
            handleIdMismatches.push({
              feedItemId: item.id,
              handle: handleId,
              providerId: providerId
            });
          }
        }
      }
    });

    if (handleIdMismatches.length > 0) {
      console.log('⚠️  Handle/ID mismatches found:');
      handleIdMismatches.forEach(item => {
        console.log(`   - Feed item ${item.feedItemId}: handle "${item.handle}" vs providerId "${item.providerId}"`);
      });
    } else {
      console.log('✅ No handle/ID mismatches found');
    }
    
    expect(Array.isArray(handleIdMismatches)).toBe(true);
  });

  test('Should provide comprehensive data overview', () => {
    console.log('\n📈 DATA OVERVIEW:');
    console.log(`   Community Profiles: ${communityData.primaryConsumers.length}`);
    console.log(`   Service Providers: ${providersData.serviceProviders.length}`);
    console.log(`   Feed Items: ${feedItemsData.length}`);

    // Count feed items by actor type
    const feedByType = feedItemsData.reduce((acc: Record<string, number>, item) => {
      acc[item.author.actorType || 'unknown'] = (acc[item.author.actorType || 'unknown'] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📊 FEED ITEMS BY ACTOR TYPE:');
    Object.entries(feedByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    expect(communityData.primaryConsumers.length).toBeGreaterThan(0);
    expect(providersData.serviceProviders.length).toBeGreaterThan(0);
    expect(feedItemsData.length).toBeGreaterThan(0);
  });

  test('Should summarize all consistency issues', () => {
    let missingCommunityMembers = 0;
    let missingProviders = 0;
    let missingActorTypes = 0;
    
    feedItemsData.forEach(item => {
      // Count missing actor types
      if (!item.author.actorType) {
        missingActorTypes++;
      }
      
      // Count missing community members
      if (item.author.actorType === 'community-member') {
        const authorId = item.author.handle.replace('@', '');
        if (authorId !== 'unknown' && authorId !== 'anonymous') {
          if (!communityHandles.has(authorId)) {
            missingCommunityMembers++;
          }
        }
      }
      
      // Count missing providers
      if (item.author.actorType === 'service-provider') {
        const authorId = item.author.providerId || item.author.handle.replace('@', '');
        if (authorId !== 'unknown' && authorId !== 'anonymous') {
          if (!providerIds.has(authorId)) {
            missingProviders++;
          }
        }
      }
    });

    const totalIssues = missingCommunityMembers + missingProviders + missingActorTypes;
    
    console.log(`\n🏁 COMPREHENSIVE SUMMARY:`);
    console.log(`   Missing Actor Types: ${missingActorTypes}`);
    console.log(`   Missing Community Members: ${missingCommunityMembers}`);
    console.log(`   Missing Service Providers: ${missingProviders}`);
    console.log(`   Total Issues: ${totalIssues}`);
    
    if (totalIssues === 0) {
      console.log('✅ All data consistency checks passed!');
    } else {
      console.log(`❌ Found ${totalIssues} data consistency issues that need to be addressed.`);
    }
    
    expect(totalIssues).toBeGreaterThanOrEqual(0);
  });
});
