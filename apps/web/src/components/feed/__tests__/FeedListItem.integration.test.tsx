import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ActorType, FeedItemType, FeedItemTypeMap, VisibilityLevel } from '../../../lib/api/feed';
import FeedListItem from '../FeedListItem';

// Mock the FeedItemActions component since it's not the focus of this test
jest.mock('../shared/FeedItemActions', () => ({
  FeedItemActions: ({ item }: { item: any }) => (
    <div data-testid="feed-item-actions">Actions for {item.id}</div>
  ),
}));

const mockEventFollowUpItem: FeedItemTypeMap = {
  id: 'feed-1-shekicks-match-photos',
  title: "Amazing photos from yesterday's match! 📸⚽️",
  type: 'event_follow_up' as FeedItemType,
  metadata: {
    createdAt: '2024-12-16T08:30:00Z',
  },
  author: {
    name: 'SheKicks',
    handle: 'shekicks_girls_soccer',
    avatar:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=face',
    actorType: ActorType.SERVICE_PROVIDER,
  },
  post: 'What an incredible match yesterday! Our girls showed amazing teamwork, determination, and skill. Thanks to all the parents who shared these fantastic photos capturing the joy and excitement of the game! 💜',
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
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&crop=center',
        caption: 'Team huddle before the match',
        sharedBy: 'Lisa (Coach Assistant)',
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
    serviceCenters: [
      {
        name: 'SheKicks Girls Academy',
        id: 'shekicks-center',
      },
    ],
  },
};

describe('FeedListItem Integration Test', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('should render EVENT_FOLLOW_UP type correctly', () => {
    console.log('Testing with item type:', mockEventFollowUpItem.type);
    console.log('EVENT_FOLLOW_UP enum value:', FeedItemType.EVENT_FOLLOW_UP);

    renderWithRouter(<FeedListItem item={mockEventFollowUpItem} />);

    // Check if the component renders the EVENT FOLLOW-UP text
    expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();

    // Check if the badge text is rendered
    expect(
      screen.getByText('Photos parents shared from The Match versus Bondi Beach Public School')
    ).toBeInTheDocument();

    // Check if event details are rendered
    expect(screen.getByText('2024-12-15 at 10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Queens Park Field 11')).toBeInTheDocument();
    expect(screen.getByText('Score: SheKicks 3 - 2 Bondi Beach')).toBeInTheDocument();
  });

  it('should log the correct item type for debugging', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    renderWithRouter(<FeedListItem item={mockEventFollowUpItem} />);

    // Check if the debug log shows the correct type
    expect(consoleSpy).toHaveBeenCalledWith(
      'FeedListItem - item.type:',
      'event_follow_up',
      'item.id:',
      'feed-1-shekicks-match-photos'
    );

    consoleSpy.mockRestore();
  });

  it('should render null when eventFollowUpData is missing', () => {
    const itemWithoutEventData = {
      ...mockEventFollowUpItem,
      eventFollowUpData: undefined,
    };

    const { container } = renderWithRouter(<FeedListItem item={itemWithoutEventData} />);

    // The FeedListItemEventFollowUp component should return null,
    // so we shouldn't see any EVENT FOLLOW-UP text
    expect(screen.queryByText('EVENT FOLLOW-UP')).not.toBeInTheDocument();

    // But we should still see the container since FeedListItem wraps everything
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle type mismatch between enum and string value', () => {
    // Test with string value instead of enum
    const itemWithStringType = {
      ...mockEventFollowUpItem,
      type: 'event_follow_up' as any, // Force string type
    };

    renderWithRouter(<FeedListItem item={itemWithStringType} />);

    // Should still render correctly
    expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();
  });

  it('should verify enum value matches data type', () => {
    // This test ensures our enum value matches what's in the data
    expect(FeedItemType.EVENT_FOLLOW_UP).toBe('event_follow_up');
    expect(mockEventFollowUpItem.type).toBe(FeedItemType.EVENT_FOLLOW_UP);
  });
});
