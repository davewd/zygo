/**
 * Test script to verify Rebecca's service provider feed implementation
 */

import { fetchFeedItems, fetchProviderFeedItems } from './lib/api/feed';

async function testRebeccaServiceProviderFeed() {
  console.log('Testing Rebecca\'s service provider feed...');
  
  try {
    // Test 1: Fetch Rebecca's provider feed specifically
    console.log('\n1. Testing fetchProviderFeedItems for Rebecca:');
    const rebeccaFeed = await fetchProviderFeedItems('rebecca-cavallaro', { limit: 5 });
    console.log(`Found ${rebeccaFeed.items.length} items in Rebecca's provider feed`);
    
    rebeccaFeed.items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title || 'Untitled'} (Type: ${item.type})`);
      console.log(`     Author: ${item.author.handle}, AuthorId in metadata: ${item.metadata?.authorId}`);
      console.log(`     Has references: ${(item as any).hasReferences || false}`);
    });

    // Test 2: Fetch general feed and verify Rebecca's posts appear
    console.log('\n2. Testing general feed for Rebecca\'s posts:');
    const generalFeed = await fetchFeedItems({ limit: 10 });
    const rebeccaPosts = generalFeed.items.filter(item => 
      item.author.handle === 'rebecca-cavallaro' || item.metadata?.authorId === 'rebecca-cavallaro'
    );
    console.log(`Found ${rebeccaPosts.length} Rebecca posts in general feed`);

    // Test 3: Verify post types are correct
    console.log('\n3. Verifying post types:');
    const postTypes = rebeccaFeed.items.map(item => item.type);
    const uniqueTypes = Array.from(new Set(postTypes));
    console.log(`Post types found: ${uniqueTypes.join(', ')}`);
    
    // Check if all are POST type
    const allPostType = rebeccaFeed.items.every(item => item.type === 'post');
    console.log(`All items are POST type: ${allPostType}`);

    return {
      success: true,
      rebeccaFeedCount: rebeccaFeed.items.length,
      generalFeedRebeccaCount: rebeccaPosts.length,
      allPostType
    };
    
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error: error.message };
  }
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  testRebeccaServiceProviderFeed()
    .then(result => {
      console.log('\nTest Results:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

export { testRebeccaServiceProviderFeed };
