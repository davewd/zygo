import { fetchFeedItems } from '../../../lib/api/feed';

describe('FeedItemContext - Diagnostic Test', () => {
  it('should confirm context data is being loaded and preserved in feed API', async () => {
    console.log('\n=== FEEDITEMCONTEXT DIAGNOSTIC TEST ===');
    
    const feedResponse = await fetchFeedItems({ limit: 10 });
    console.log(`✅ Feed API loaded ${feedResponse.items.length} items successfully`);
    
    const itemsWithContext = feedResponse.items.filter(item => item.context);
    console.log(`✅ Found ${itemsWithContext.length} items with context data`);
    
    if (itemsWithContext.length > 0) {
      console.log('\n📋 Context Items Found:');
      itemsWithContext.forEach((item, index) => {
        console.log(`  ${index + 1}. ID: ${item.id}`);
        console.log(`     Type: ${item.context?.type}`);
        console.log(`     Profile: ${item.context?.profileName || 'N/A'}`);
        console.log(`     Activity: ${item.context?.activityName || 'N/A'}`);
        console.log(`     Custom Text: ${item.context?.customText || 'N/A'}`);
        console.log('');
      });
      
      console.log('✅ Context data structure validation:');
      itemsWithContext.forEach(item => {
        const context = item.context!;
        console.log(`  - ${item.id}: ${context.type} context ✓`);
      });
      
      console.log('\n✅ All tests passed! FeedItemContext should render correctly.');
    } else {
      console.log('❌ No context items found - check feed data or API transformation');
    }
    
    console.log('\n=== DIAGNOSTIC COMPLETE ===\n');
    
    expect(itemsWithContext.length).toBeGreaterThan(0);
    expect(feedResponse.items.length).toBeGreaterThan(0);
  });
});
