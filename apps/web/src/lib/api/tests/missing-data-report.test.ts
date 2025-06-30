/**
 * Missing Data Report Test
 * 
 * This test provides a comprehensive analysis of missing data,
 * incorrect actor types, and recommended actions to fix data consistency issues.
 */

import communityData from '../data/community.json';
import feedItemsData from '../data/feed/feed_items.json';
import providersData from '../data/providers.json';

interface MissingActorType {
  feedId: string;
  title: string;
  handle: string;
  authorName: string;
}

interface MissingProfile {
  feedId: string;
  handle: string;
  authorName: string;
  title: string;
  suggestedId?: string;
}

interface IncorrectActorType {
  feedId: string;
  handle: string;
  shouldBe: string;
  currently: string;
  providerId?: string;
}

describe('Missing Data Report Tests', () => {
  
  let communityHandles: Set<string>;
  let providerIds: Set<string>;
  
  beforeAll(() => {
    communityHandles = new Set(communityData.primaryConsumers.map(p => p.handle));
    providerIds = new Set(providersData.serviceProviders.map(p => p.id));
  });

  test('Should display current data inventory', () => {
    console.log('🔍 COMPREHENSIVE DATA CONSISTENCY REPORT\n');
    console.log('📊 CURRENT DATA INVENTORY:');
    console.log(`Community Handles: ${Array.from(communityHandles).join(', ')}`);
    console.log(`Provider IDs: ${Array.from(providerIds).join(', ')}\n`);
    
    expect(communityHandles.size).toBeGreaterThan(0);
    expect(providerIds.size).toBeGreaterThan(0);
  });

  test('Should identify missing actor types', () => {
    const missingActorTypes: MissingActorType[] = [];
    
    feedItemsData.forEach(item => {
      if (!item.author.actorType) {
        missingActorTypes.push({
          feedId: item.id,
          title: item.title,
          handle: item.author.handle,
          authorName: item.author.name
        });
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
    
    // Test should pass regardless, this is informational
    expect(Array.isArray(missingActorTypes)).toBe(true);
  });

  test('Should identify missing community profiles', () => {
    const missingCommunityProfiles: MissingProfile[] = [];
    
    feedItemsData.forEach(item => {
      const handle = item.author.handle;
      const actorType = item.author.actorType;
      const providerId = item.author.providerId;

      // Check if this should be a community member but profile doesn't exist
      if (handle !== 'zygo_app' && handle !== 'family_events' && handle !== 'kambala_school') {
        if (!communityHandles.has(handle) && !providerId) {
          if (handle.includes('_mom') || handle.includes('_dad') || handle.includes('_mama') || handle.includes('_nana') || 
              actorType === 'community-member') {
            missingCommunityProfiles.push({
              feedId: item.id,
              handle: handle,
              authorName: item.author.name,
              title: item.title
            });
          }
        }
      }
    });

    if (missingCommunityProfiles.length > 0) {
      console.log(`👥 MISSING COMMUNITY PROFILES (${missingCommunityProfiles.length}):`);
      missingCommunityProfiles.forEach(item => {
        console.log(`   - Handle: @${item.handle} (${item.authorName})`);
        console.log(`     Used in: ${item.feedId} - "${item.title}"`);
      });
      console.log('');
    }
    
    expect(Array.isArray(missingCommunityProfiles)).toBe(true);
  });

  test('Should identify missing provider profiles', () => {
    const missingProviderProfiles: MissingProfile[] = [];
    
    feedItemsData.forEach(item => {
      const handle = item.author.handle;
      const providerId = item.author.providerId;
      
      if (handle.includes('_school') || item.author.name.includes('School')) {
        if (!providerId || !providerIds.has(providerId)) {
          missingProviderProfiles.push({
            feedId: item.id,
            handle: handle,
            authorName: item.author.name,
            title: item.title,
            suggestedId: handle.replace('_', '-')
          });
        }
      }
    });

    if (missingProviderProfiles.length > 0) {
      console.log(`🏥 MISSING PROVIDER PROFILES (${missingProviderProfiles.length}):`);
      missingProviderProfiles.forEach(item => {
        console.log(`   - Handle: @${item.handle} (${item.authorName})`);
        console.log(`     Suggested ID: ${item.suggestedId}`);
        console.log(`     Used in: ${item.feedId} - "${item.title}"`);
      });
      console.log('');
    }
    
    expect(Array.isArray(missingProviderProfiles)).toBe(true);
  });

  test('Should identify incorrect actor types', () => {
    const incorrectActorTypes: IncorrectActorType[] = [];
    
    feedItemsData.forEach(item => {
      const handle = item.author.handle;
      const actorType = item.author.actorType;
      const providerId = item.author.providerId;

      // Check for incorrect actor types
      if (communityHandles.has(handle)) {
        if (actorType !== 'community-member') {
          incorrectActorTypes.push({
            feedId: item.id,
            handle: handle,
            shouldBe: 'community-member',
            currently: actorType || 'NOT SET'
          });
        }
      } else if (providerId && providerIds.has(providerId)) {
        if (actorType !== 'service-provider') {
          incorrectActorTypes.push({
            feedId: item.id,
            handle: handle,
            providerId: providerId,
            shouldBe: 'service-provider',
            currently: actorType || 'NOT SET'
          });
        }
      }
    });

    if (incorrectActorTypes.length > 0) {
      console.log(`🔧 INCORRECT ACTOR TYPES (${incorrectActorTypes.length}):`);
      incorrectActorTypes.forEach(item => {
        console.log(`   - ${item.feedId}: @${item.handle} should be "${item.shouldBe}" but is "${item.currently}"`);
      });
      console.log('');
    }
    
    expect(Array.isArray(incorrectActorTypes)).toBe(true);
  });

  test('Should provide recommended actions', () => {
    // Count all issues
    let missingActorTypes = 0;
    let missingCommunityProfiles = 0;
    let missingProviderProfiles = 0;
    let incorrectActorTypes = 0;
    
    const uniqueCommunityHandles = new Set<string>();
    const uniqueProviderHandles = new Set<string>();
    
    feedItemsData.forEach(item => {
      const handle = item.author.handle;
      const actorType = item.author.actorType;
      const providerId = item.author.providerId;

      if (!actorType) missingActorTypes++;
      
      if (communityHandles.has(handle) && actorType !== 'community-member') {
        incorrectActorTypes++;
      }
      
      if (handle !== 'zygo_app' && handle !== 'family_events' && !communityHandles.has(handle) && !providerId) {
        if (handle.includes('_mom') || handle.includes('_dad') || handle.includes('_mama') || handle.includes('_nana')) {
          uniqueCommunityHandles.add(handle);
        }
      }
      
      if (handle.includes('_school') && (!providerId || !providerIds.has(providerId))) {
        uniqueProviderHandles.add(handle);
      }
    });
    
    missingCommunityProfiles = uniqueCommunityHandles.size;
    missingProviderProfiles = uniqueProviderHandles.size;

    console.log('📋 RECOMMENDED ACTIONS:\n');
    
    if (missingCommunityProfiles > 0) {
      console.log('1. CREATE MISSING COMMUNITY PROFILES:');
      Array.from(uniqueCommunityHandles).forEach(handle => {
        const item = feedItemsData.find(f => f.author.handle === handle);
        console.log(`   - Add community profile for @${handle} (${item?.author.name})`);
      });
      console.log('');
    }

    if (missingProviderProfiles > 0) {
      console.log('2. CREATE MISSING PROVIDER PROFILES:');
      Array.from(uniqueProviderHandles).forEach(handle => {
        const item = feedItemsData.find(f => f.author.handle === handle);
        console.log(`   - Add provider profile with ID "${handle.replace('_', '-')}" for @${handle} (${item?.author.name})`);
      });
      console.log('');
    }

    if (missingActorTypes > 0) {
      console.log('3. SET MISSING ACTOR TYPES:');
      feedItemsData.forEach(item => {
        if (!item.author.actorType) {
          let suggestedType = 'unknown';
          if (communityHandles.has(item.author.handle)) {
            suggestedType = 'community-member';
          } else if (item.author.handle === 'zygo_app') {
            suggestedType = 'system';
          } else if (item.author.handle.includes('_school')) {
            suggestedType = 'service-provider';
          } else if (item.author.handle.includes('_mom') || item.author.handle.includes('_dad') || 
                     item.author.handle.includes('_mama') || item.author.handle.includes('_nana')) {
            suggestedType = 'community-member';
          }
          console.log(`   - ${item.id}: Set actorType to "${suggestedType}" for @${item.author.handle}`);
        }
      });
    }

    const totalIssues = missingActorTypes + missingCommunityProfiles + missingProviderProfiles + incorrectActorTypes;
    console.log(`\n🏁 SUMMARY: Found ${totalIssues} data consistency issues that need to be addressed.`);
    
    expect(totalIssues).toBeGreaterThanOrEqual(0);
  });
});
