/**
 * Feed Analysis Test
 * 
 * This test provides detailed analysis of feed item authors,
 * their handles, actor types, and provider IDs.
 */

import feedItemsData from '../data/feed/feed_items.json';

describe('Feed Analysis Tests', () => {
  
  test('Should display detailed feed item author information', () => {
    console.log('🔍 DETAILED FEED ITEM ANALYSIS\n');
    console.log('📋 FEED ITEM AUTHOR DETAILS:');
    
    expect(feedItemsData).toBeDefined();
    expect(Array.isArray(feedItemsData)).toBe(true);
    expect(feedItemsData.length).toBeGreaterThan(0);
    
    feedItemsData.forEach((item, index) => {
      // Validate required properties
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('author');
      expect(item.author).toHaveProperty('name');
      expect(item.author).toHaveProperty('handle');
      
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
  });

  test('Should analyze actor type distribution', () => {
    const actorTypes: Record<string, number> = {};
    const missingActorTypes: string[] = [];
    
    feedItemsData.forEach(item => {
      const actorType = item.author.actorType || 'NOT SET';
      actorTypes[actorType] = (actorTypes[actorType] || 0) + 1;
      
      if (!item.author.actorType) {
        missingActorTypes.push(item.id);
      }
    });
    
    console.log('\n📊 ACTOR TYPE DISTRIBUTION:');
    Object.entries(actorTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
    
    if (missingActorTypes.length > 0) {
      console.log(`\n⚠️  Feed items missing actor type: ${missingActorTypes.join(', ')}`);
    }
    
    expect(Object.keys(actorTypes).length).toBeGreaterThan(0);
  });

  test('Should validate feed item structure consistency', () => {
    const structureIssues: string[] = [];
    
    feedItemsData.forEach(item => {
      if (!item.id) structureIssues.push(`${item.title || 'Unknown'}: missing id`);
      if (!item.title) structureIssues.push(`${item.id || 'Unknown'}: missing title`);
      if (!item.author) structureIssues.push(`${item.id}: missing author`);
      if (item.author && !item.author.name) structureIssues.push(`${item.id}: missing author.name`);
      if (item.author && !item.author.handle) structureIssues.push(`${item.id}: missing author.handle`);
    });
    
    if (structureIssues.length > 0) {
      console.log('\n❌ STRUCTURE ISSUES FOUND:');
      structureIssues.forEach(issue => console.log(`   - ${issue}`));
    } else {
      console.log('\n✅ All feed items have consistent structure');
    }
    
    // Expect no critical structure issues
    expect(structureIssues.length).toBe(0);
  });

  test('Should identify unique handles and potential duplicates', () => {
    const handles = new Map<string, string[]>();
    
    feedItemsData.forEach(item => {
      const handle = item.author.handle;
      if (!handles.has(handle)) {
        handles.set(handle, []);
      }
      handles.get(handle)!.push(item.id);
    });
    
    console.log('\n🔗 HANDLE USAGE:');
    const sortedHandles = Array.from(handles.entries()).sort();
    sortedHandles.forEach(([handle, feedIds]) => {
      if (feedIds.length > 1) {
        console.log(`   @${handle}: ${feedIds.length} feed items (${feedIds.join(', ')})`);
      } else {
        console.log(`   @${handle}: 1 feed item (${feedIds[0]})`);
      }
    });
    
    expect(handles.size).toBeGreaterThan(0);
    expect(handles.size).toBeLessThanOrEqual(feedItemsData.length);
  });
});
