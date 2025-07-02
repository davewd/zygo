import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  ActorType,
  FeedItemType,
  FeedItemTypeMap,
  VisibilityLevel,
} from '../../../../lib/api/feed';
import { FeedListItemEventFollowUp } from '../FeedListItemEventFollowUp';

describe('FeedListItemEventFollowUp', () => {
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
        {
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&crop=center',
          caption: 'Team huddle before the match',
          sharedBy: 'Lisa (Coach Assistant)',
        },
        {
          url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&crop=center',
          caption: 'Amazing save by our goalkeeper Zoe!',
          sharedBy: "Mike (Zoe's dad)",
        },
        {
          url: 'https://images.unsplash.com/photo-1606936021121-d17faccb57b5?w=400&h=300&fit=crop&crop=center',
          caption: 'Post-match team photo with the trophy!',
          sharedBy: 'Coach Sofia',
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
        {
          name: 'Active8Kids',
          id: 'active8kids-bondi-junction',
        },
      ],
    },
  };

  const mockItemWithoutEventFollowUpData: FeedItemTypeMap = {
    id: 'feed-2',
    type: FeedItemType.EVENT_FOLLOW_UP,
    title: 'Test Event Follow Up',
    post: 'Test post content',
    author: {
      name: 'Test Author',
      handle: 'test_author',
      avatar: 'https://example.com/avatar.jpg',
      verified: false,
      actorType: ActorType.SERVICE_PROVIDER,
    },
    metadata: {
      createdAt: '2024-12-16T08:30:00Z',
      source: 'test',
    },
    stats: {
      likes: 0,
      shares: 0,
      comments: 0,
      reposts: 0,
    },
    privacy: {
      visibility: VisibilityLevel.PUBLIC,
      sharedWith: [],
    },
    // Missing eventFollowUpData
  };

  describe('Component Rendering', () => {
    it('renders event follow-up content correctly with complete data', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check header elements
      expect(screen.getByText('SheKicks')).toBeInTheDocument();
      expect(screen.getByText('@shekicks_girls_soccer')).toBeInTheDocument();
      expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();
      expect(screen.getByText('Kickeroos')).toBeInTheDocument(); // Appears in service network

      // Check title and post content
      expect(screen.getByText("Amazing photos from yesterday's match! 📸⚽️")).toBeInTheDocument();
      expect(screen.getByText(/What an incredible match yesterday!/)).toBeInTheDocument();

      // Check badge section
      expect(
        screen.getByText('Photos parents shared from The Match versus Bondi Beach Public School')
      ).toBeInTheDocument();
      expect(
        screen.getByText('December 15, 2024 • 10:00 AM • Final Score: SheKicks 3-2')
      ).toBeInTheDocument();

      // Check event details
      expect(screen.getByText('2024-12-15 at 10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('Queens Park Field 11')).toBeInTheDocument();
      expect(screen.getByText('Score: SheKicks 3 - 2 Bondi Beach')).toBeInTheDocument();

      // Check photo section
      expect(screen.getByText('Photos from The Match (4)')).toBeInTheDocument();
      expect(screen.getAllByRole('img')).toHaveLength(5); // 1 avatar + 4 photos

      // Check service network information (appears in event follow-up header)
      expect(screen.getByText('Kickeroos')).toBeInTheDocument(); // Appears in service network badge
    });

    it('returns null when eventFollowUpData is missing', () => {
      const { container } = render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockItemWithoutEventFollowUpData} />
        </MemoryRouter>
      );

      // Component should return null, so container should be empty
      expect(container.firstChild).toBeNull();
    });

    it('renders without optional fields gracefully', () => {
      const itemWithMinimalData: FeedItemTypeMap = {
        ...mockEventFollowUpItem,
        eventFollowUpData: {
          eventType: 'Soccer Match',
          eventName: 'Test Match',
          eventDate: '2024-12-15',
          photos: [],
          badge: {
            text: 'Test Badge',
          },
          // Missing optional fields: eventTime, location, score, serviceNetwork, serviceCenters
        },
      };

      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={itemWithMinimalData} />
        </MemoryRouter>
      );

      // Check that required elements are still rendered
      expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
      expect(screen.getByText('2024-12-15')).toBeInTheDocument();

      // Check that optional elements are not rendered
      expect(screen.queryByText('Score:')).not.toBeInTheDocument();
      expect(screen.queryByText('Event Partners')).not.toBeInTheDocument();
      expect(screen.getByText('Photos from The Match (0)')).toBeInTheDocument();
    });
  });

  describe('Photo Interaction', () => {
    it('toggles photo expansion when clicked', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Find the first photo
      const photos = screen.getAllByRole('img');
      const firstPhoto = photos.find((img) =>
        (img as HTMLImageElement).src.includes('photo-1579952363873')
      ) as HTMLImageElement;

      expect(firstPhoto).toBeInTheDocument();

      // Initially should have h-48 class (collapsed)
      expect(firstPhoto).toHaveClass('h-48');
      expect(firstPhoto).not.toHaveClass('max-h-none');

      // Click to expand
      fireEvent.click(firstPhoto);

      // After click, should have max-h-none class (expanded)
      expect(firstPhoto).toHaveClass('max-h-none');
      expect(firstPhoto).not.toHaveClass('h-48');

      // Click again to collapse
      fireEvent.click(firstPhoto);

      // Should be back to collapsed state
      expect(firstPhoto).toHaveClass('h-48');
      expect(firstPhoto).not.toHaveClass('max-h-none');
    });

    it('shows photo captions and shared by information', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check photo captions
      expect(screen.getByText('Goal celebration! What a shot by Emma!')).toBeInTheDocument();
      expect(screen.getByText('Team huddle before the match')).toBeInTheDocument();
      expect(screen.getByText('Amazing save by our goalkeeper Zoe!')).toBeInTheDocument();
      expect(screen.getByText('Post-match team photo with the trophy!')).toBeInTheDocument();

      // Check shared by information
      expect(screen.getByText("Shared by Sarah (Emma's mum)")).toBeInTheDocument();
      expect(screen.getByText('Shared by Lisa (Coach Assistant)')).toBeInTheDocument();
      expect(screen.getByText("Shared by Mike (Zoe's dad)")).toBeInTheDocument();
      expect(screen.getByText('Shared by Coach Sofia')).toBeInTheDocument();
    });

    it('handles image loading errors gracefully', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      const photos = screen.getAllByRole('img');
      const firstPhoto = photos.find((img) =>
        (img as HTMLImageElement).src.includes('photo-1579952363873')
      ) as HTMLImageElement;

      // Simulate image load error
      fireEvent.error(firstPhoto);

      // Image should be hidden
      expect(firstPhoto.style.display).toBe('none');
    });
  });

  describe('Component Structure', () => {
    it('has correct CSS classes and structure', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check main container
      const mainContainer = screen.getByText('EVENT FOLLOW-UP').closest('div[class*="space-y-4"]');
      expect(mainContainer).toBeInTheDocument();

      // Check event follow-up header styling
      const eventFollowUpLabel = screen.getByText('EVENT FOLLOW-UP');
      expect(eventFollowUpLabel).toHaveClass('text-green-700', 'font-semibold', 'text-sm');

      // Check badge section styling
      const badgeContainer = screen
        .getByText('Photos parents shared from The Match versus Bondi Beach Public School')
        .closest('div.bg-gradient-to-r');
      expect(badgeContainer).toHaveClass('bg-gradient-to-r', 'from-emerald-50', 'to-green-50');
    });

    it('renders action buttons', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check that stats are displayed (part of FeedItemActions)
      expect(screen.getByText('23')).toBeInTheDocument(); // likes
      expect(screen.getByText('12')).toBeInTheDocument(); // comments
      expect(screen.getByText('8')).toBeInTheDocument(); // shares
    });
  });

  describe('Data Validation', () => {
    it('handles empty photos array', () => {
      const itemWithNoPhotos: FeedItemTypeMap = {
        ...mockEventFollowUpItem,
        eventFollowUpData: {
          ...mockEventFollowUpItem.eventFollowUpData!,
          photos: [],
        },
      };

      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={itemWithNoPhotos} />
        </MemoryRouter>
      );

      expect(screen.getByText('Photos from The Match (0)')).toBeInTheDocument();
    });

    it('handles missing service network', () => {
      const itemWithoutServiceNetwork: FeedItemTypeMap = {
        ...mockEventFollowUpItem,
        eventFollowUpData: {
          ...mockEventFollowUpItem.eventFollowUpData!,
          serviceNetwork: undefined,
          serviceCenters: undefined,
        },
      };

      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={itemWithoutServiceNetwork} />
        </MemoryRouter>
      );

      expect(screen.getByText('Community Event')).toBeInTheDocument(); // fallback text
      expect(screen.queryByText('Event Partners')).not.toBeInTheDocument();
    });

    it('validates required eventFollowUpData structure', () => {
      // Test with malformed eventFollowUpData
      const itemWithMalformedData: FeedItemTypeMap = {
        ...mockEventFollowUpItem,
        eventFollowUpData: {
          eventType: 'Soccer Match',
          eventName: 'Test Match',
          eventDate: '2024-12-15',
          photos: [],
          badge: {
            text: 'Test Badge',
          },
        } as any,
      };

      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={itemWithMalformedData} />
        </MemoryRouter>
      );

      // Component should handle gracefully, showing what it can
      expect(screen.getByText('EVENT FOLLOW-UP')).toBeInTheDocument();
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check avatar alt text
      const avatar = screen.getByAltText('SheKicks');
      expect(avatar).toBeInTheDocument();

      // Check photo alt texts
      expect(screen.getByAltText('Goal celebration! What a shot by Emma!')).toBeInTheDocument();
      expect(screen.getByAltText('Team huddle before the match')).toBeInTheDocument();
      expect(screen.getByAltText('Amazing save by our goalkeeper Zoe!')).toBeInTheDocument();
      expect(screen.getByAltText('Post-match team photo with the trophy!')).toBeInTheDocument();
    });

    it('has interactive elements with proper attributes', () => {
      render(
        <MemoryRouter>
          <FeedListItemEventFollowUp item={mockEventFollowUpItem} />
        </MemoryRouter>
      );

      // Check that photos are clickable
      const photos = screen.getAllByRole('img');
      const photoImages = photos.filter(
        (img) =>
          (img as HTMLImageElement).src.includes('unsplash.com') &&
          !(img as HTMLImageElement).alt.includes('SheKicks')
      );

      photoImages.forEach((photo) => {
        expect(photo).toHaveClass('cursor-pointer');
      });
    });
  });
});
