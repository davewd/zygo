import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ActorType, FeedItemType, FeedItemTypeMap, VisibilityLevel } from '../../../lib/api/feed';
import FeedListItem from '../FeedListItem';

describe('FeedListItem - EventFollowUp Integration', () => {
  const mockEventFollowUpItem: FeedItemTypeMap = {
    id: 'feed-1-shekicks-match-photos',
    type: FeedItemType.EVENT_FOLLOW_UP,
    title: "Amazing photos from yesterday's match! 📸⚽️",
    post: 'What an incredible match yesterday! Our girls showed amazing teamwork, determination, and skill. Thanks to all the parents who shared these fantastic photos capturing the joy and excitement of the game! 💜',
    author: {
      name: 'SheKicks',
      handle: 'shekicks_girls_soccer',
      avatar:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=face',
      verified: false,
      actorType: ActorType.SERVICE_PROVIDER,
    },
    metadata: {
      createdAt: '2024-12-16T08:30:00Z',
      source: 'event_follow_up',
    },
    stats: {
      likes: 23,
      shares: 8,
      comments: 12,
      reposts: 3,
    },
    privacy: {
      visibility: VisibilityLevel.PUBLIC,
      sharedWith: [],
    },
    eventFollowUpData: {
      eventType: 'Soccer Match',
      eventName: 'SheKicks vs Bondi Beach Public School',
      eventDate: '2024-12-15',
      eventTime: '10:00 AM',
      location: 'Queens Park Field 11',
      score: 'SheKicks 3 - 2 Bondi Beach',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center',
          caption: 'Goal celebration! What a shot by Emma!',
          sharedBy: "Sarah (Emma's mum)",
        },
      ],
      badge: {
        text: 'Photos parents shared from The Match versus Bondi Beach Public School',
        details: 'December 15, 2024 • 10:00 AM • Final Score: SheKicks 3-2',
      },
      serviceNetwork: {
        name: 'Kickeroos',
        id: 'kickeroos-network',
      },
    },
  };

  it('should render FeedListItemEventFollowUp when type is EVENT_FOLLOW_UP', () => {
    // Spy on console.log to capture debug information
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(
      <MemoryRouter>
        <FeedListItem item={mockEventFollowUpItem} />
      </MemoryRouter>
    );

    // Check console output for debugging
    expect(consoleSpy).toHaveBeenCalledWith(
      'FeedListItem - item.type:',
      FeedItemType.EVENT_FOLLOW_UP,
      'item.id:',
      'feed-1-shekicks-match-photos'
    );

    // Verify the EventFollowUp component is rendered
    expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();
    expect(screen.getByText('SheKicks')).toBeInTheDocument();
    expect(screen.getByText("Amazing photos from yesterday's match! 📸⚽️")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should handle EVENT_FOLLOW_UP type correctly in switch statement', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(
      <MemoryRouter>
        <FeedListItem item={mockEventFollowUpItem} />
      </MemoryRouter>
    );

    // Verify the correct component is rendered and console doesn't show fallback
    expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();

    // Should NOT see the fallback console message
    expect(consoleSpy).not.toHaveBeenCalledWith(
      'Falling back to post for type:',
      expect.any(String)
    );

    consoleSpy.mockRestore();
  });

  it('should render null when eventFollowUpData is missing', () => {
    const itemWithoutEventData = {
      ...mockEventFollowUpItem,
      eventFollowUpData: undefined,
    };

    const { container } = render(
      <MemoryRouter>
        <FeedListItem item={itemWithoutEventData} />
      </MemoryRouter>
    );

    // The component should render something (the wrapper div), but the inner content should be minimal
    // Since FeedListItemEventFollowUp returns null, FeedListItem should still render its wrapper
    expect(container.firstChild).not.toBeNull();

    // But the EVENT FOLLOW-UP specific content should not be there
    expect(screen.queryByText('EVENT FOLLOW-UP')).not.toBeInTheDocument();
  });

  it('should check enum value matches data type', () => {
    // Test that our enum value matches what's expected
    expect(FeedItemType.EVENT_FOLLOW_UP).toBe('event_follow_up');

    // Test that the item type matches the enum
    expect(mockEventFollowUpItem.type).toBe(FeedItemType.EVENT_FOLLOW_UP);
  });
});
