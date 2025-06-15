import { fireEvent, render, screen } from '@testing-library/react';
import { FeedListItemSponsored } from '../../../src/components/feed/generic/FeedListItemSponsored';
import { FeedItemType, FeedItemTypeMap } from '../../../src/lib/api/feed';

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

describe('FeedListItemSponsored', () => {
  const mockSponsoredItem: FeedItemTypeMap = {
    id: 'sponsored-1',
    type: FeedItemType.SPONSORED,
    title: 'Excellence in Education at Kambala',
    post: 'Discover where tradition meets innovation.',
    description: 'Join our community of inspiring educators.',
    imageUrl: 'https://example.com/kambala-image.jpg',
    author: {
      name: 'Kambala School',
      handle: 'kambala_school',
      avatar: 'https://example.com/kambala-avatar.jpg',
      verified: true,
    },
    metadata: {
      createdAt: '2023-10-03T10:00:00Z',
      source: 'sponsored',
    },
    stats: {
      comments: 8,
      reposts: 3,
      shares: 15,
      likes: 42,
    },
    privacy: {
      visibility: 'public',
      sharedWith: [],
    },
    sponsoredData: {
      advertiserName: 'Kambala School',
      advertiserLogo: 'https://example.com/logo.jpg',
      ctaText: 'Learn More',
      ctaUrl: 'https://kambala.nsw.edu.au/',
      sponsorshipType: 'sponsored',
    },
  };

  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders sponsored content correctly', () => {
    render(<FeedListItemSponsored item={mockSponsoredItem} />);

    // Check that sponsored indicator is present
    expect(screen.getByText('SPONSORED')).toBeInTheDocument();
    expect(screen.getByText('by Kambala School')).toBeInTheDocument();

    // Check content
    expect(screen.getByText('Excellence in Education at Kambala')).toBeInTheDocument();
    expect(screen.getByText('Discover where tradition meets innovation.')).toBeInTheDocument();

    // Check CTA button
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('opens Kambala URL when CTA button is clicked', () => {
    render(<FeedListItemSponsored item={mockSponsoredItem} />);

    const ctaButton = screen.getByText('Learn More');
    fireEvent.click(ctaButton);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://kambala.nsw.edu.au/',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles missing sponsored data gracefully', () => {
    const itemWithoutSponsoredData = {
      ...mockSponsoredItem,
      sponsoredData: undefined,
    };

    render(<FeedListItemSponsored item={itemWithoutSponsoredData} />);

    // Should still render content but without sponsored-specific elements
    expect(screen.getByText('Excellence in Education at Kambala')).toBeInTheDocument();
    expect(screen.queryByText('Learn More')).not.toBeInTheDocument();
  });

  it('applies medium gray styling to sponsored text', () => {
    render(<FeedListItemSponsored item={mockSponsoredItem} />);

    const sponsoredText = screen.getByText('SPONSORED');
    expect(sponsoredText).toHaveClass('text-gray-500');

    const advertiserText = screen.getByText('by Kambala School');
    expect(advertiserText).toHaveClass('text-gray-500');
  });
});
