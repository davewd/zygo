import { FeedItemType, fetchFeedItems } from '../feed';

describe('Feed API - EventFollowUp Data Preservation', () => {
  it('should preserve eventFollowUpData in feed items', async () => {
    const response = await fetchFeedItems({ limit: 20 });
    
    // Find the event follow-up item
    const eventFollowUpItem = response.items.find(
      item => item.type === FeedItemType.EVENT_FOLLOW_UP
    );
    
    expect(eventFollowUpItem).toBeDefined();
    expect(eventFollowUpItem?.id).toBe('feed-1-shekicks-match-photos');
    
    // Verify that eventFollowUpData is preserved
    expect(eventFollowUpItem?.eventFollowUpData).toBeDefined();
    expect(eventFollowUpItem?.eventFollowUpData?.eventType).toBe('Soccer Match');
    expect(eventFollowUpItem?.eventFollowUpData?.eventName).toBe('SheKicks vs Bondi Beach Public School');
    expect(eventFollowUpItem?.eventFollowUpData?.photos).toHaveLength(4);
    expect(eventFollowUpItem?.eventFollowUpData?.badge).toBeDefined();
    expect(eventFollowUpItem?.eventFollowUpData?.serviceNetwork).toBeDefined();
  });

  it('should include all required fields for EVENT_FOLLOW_UP type', async () => {
    const response = await fetchFeedItems({ limit: 20 });
    
    const eventFollowUpItem = response.items.find(
      item => item.type === FeedItemType.EVENT_FOLLOW_UP
    );
    
    expect(eventFollowUpItem).toBeDefined();
    
    // Check structure
    expect(eventFollowUpItem).toMatchObject({
      id: expect.any(String),
      type: 'event_follow_up',
      title: expect.any(String),
      author: expect.objectContaining({
        name: expect.any(String),
        handle: expect.any(String),
        actorType: expect.any(String),
      }),
      eventFollowUpData: expect.objectContaining({
        eventType: expect.any(String),
        eventName: expect.any(String),
        eventDate: expect.any(String),
        photos: expect.any(Array),
        badge: expect.objectContaining({
          text: expect.any(String),
        }),
      }),
      stats: expect.objectContaining({
        likes: expect.any(Number),
        shares: expect.any(Number),
        comments: expect.any(Number),
        reposts: expect.any(Number),
      }),
    });
  });

  it('should log details about all feed items to help debug', async () => {
    const response = await fetchFeedItems({ limit: 20 });
    
    console.log(`Total feed items: ${response.items.length}`);
    
    const itemsByType = response.items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Items by type:', itemsByType);
    
    // Log specific details about the event follow-up item
    const eventFollowUpItem = response.items.find(
      item => item.type === FeedItemType.EVENT_FOLLOW_UP
    );
    
    if (eventFollowUpItem) {
      console.log('Event Follow-Up Item found:', {
        id: eventFollowUpItem.id,
        title: eventFollowUpItem.title,
        hasEventFollowUpData: !!eventFollowUpItem.eventFollowUpData,
        eventFollowUpDataKeys: eventFollowUpItem.eventFollowUpData 
          ? Object.keys(eventFollowUpItem.eventFollowUpData) 
          : [],
      });
    } else {
      console.log('Event Follow-Up Item NOT found in feed');
    }
  });
});
