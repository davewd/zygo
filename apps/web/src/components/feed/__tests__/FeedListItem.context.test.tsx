import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ActorType, FeedItemType, FeedItemTypeMap, VisibilityLevel } from '../../../lib/api/feed';
import FeedListItem from '../FeedListItem';

// Mock the shared components
jest.mock('../shared/FeedItemActions', () => ({
  FeedItemActions: ({ item }: { item: any }) => (
    <div data-testid="feed-item-actions">Actions for {item.id}</div>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('FeedListItem Context Integration', () => {
  const baseMockItem: FeedItemTypeMap = {
    id: 'test-context-integration',
    type: FeedItemType.POST,
    title: 'Test Post with Context',
    post: 'This is a test post to verify context integration works correctly.',
    author: {
      name: 'Sarah Johnson',
      handle: 'sarah_mama',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b147?w=150&h=150&fit=crop&crop=face',
      actorType: ActorType.COMMUNITY_MEMBER,
      role: 'parent',
      location: {
        suburb: 'Paddington',
        state: 'NSW',
        country: 'Australia',
      },
    },
    metadata: {
      createdAt: '2024-12-17T14:30:00Z',
    },
    stats: {
      likes: 15,
      shares: 3,
      comments: 8,
      reposts: 1,
    },
    privacy: {
      visibility: VisibilityLevel.GROUP,
      sharedWith: [{ type: 'group', name: 'Family Updates', id: 'family_updates' }],
    },
  };

  describe('Post with Profile Milestone Context', () => {
    it('should render context above header with separator line', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: {
          type: 'profile_milestone' as const,
          profileName: 'Isabella Dawson',
          profileId: 'isabella_dawson_001',
          profileType: 'family_member' as const,
          activityName: 'Emotional Intelligence',
          activityId: 'months_24_30_social_emotional_1',
          activityType: 'milestone' as const,
        },
      };

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Context should be rendered
      expect(screen.getByText('Isabella Dawson')).toBeInTheDocument();
      expect(screen.getByText('working on')).toBeInTheDocument();
      expect(screen.getByText('Emotional Intelligence')).toBeInTheDocument();

      // Context indicator should be present
      const contextIndicator = document.querySelector('.w-2.h-2.bg-blue-400.rounded-full');
      expect(contextIndicator).toBeInTheDocument();

      // Separator line should be present
      const separatorLine = document.querySelector('.border-t.border-gray-200');
      expect(separatorLine).toBeInTheDocument();

      // Regular feed header should still be present
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
      expect(screen.getByText('@sarah_mama')).toBeInTheDocument();

      // Post content should be present
      expect(screen.getByText('Test Post with Context')).toBeInTheDocument();
      expect(
        screen.getByText('This is a test post to verify context integration works correctly.')
      ).toBeInTheDocument();

      // Actions should be present
      expect(screen.getByTestId('feed-item-actions')).toBeInTheDocument();
    });

    it('should have correct link navigation for context items', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: {
          type: 'profile_milestone' as const,
          profileName: 'Isabella Dawson',
          profileId: 'isabella_dawson_001',
          profileType: 'family_member' as const,
          activityName: 'Emotional Intelligence',
          activityId: 'months_24_30_social_emotional_1',
          activityType: 'milestone' as const,
        },
      };

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Profile link should be correct
      const profileLink = screen.getByRole('link', { name: 'Isabella Dawson' });
      expect(profileLink).toHaveAttribute('href', '/family/members/isabella_dawson_001');

      // Activity link should be correct
      const activityLink = screen.getByRole('link', { name: 'Emotional Intelligence' });
      expect(activityLink).toHaveAttribute(
        'href',
        '/timeline/milestone/months_24_30_social_emotional_1'
      );

      // Author profile link should also work
      const authorLink = screen.getByRole('link', { name: 'Sarah Johnson' });
      expect(authorLink).toHaveAttribute('href', '/community/profiles/sarah_mama');
    });
  });

  describe('Post with Collaboration Context', () => {
    it('should render collaboration context with correct styling', () => {
      const itemWithContext = {
        ...baseMockItem,
        author: {
          ...baseMockItem.author,
          name: 'Dr. Emily Chen',
          handle: 'dr_emily_chen',
          actorType: ActorType.SERVICE_PROVIDER,
          title: 'Pediatric Development Specialist',
          verified: true,
        },
        context: {
          type: 'collaboration' as const,
          profileName: 'Dr. Emily Chen',
          profileId: 'dr_emily_chen_001',
          profileType: 'service_provider' as const,
          activityName: 'Johnson Family Literacy Program',
          activityId: 'literacy_program_johnson',
          activityType: 'goal' as const,
        },
      };

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Context should be rendered - find within the context section
      const contextSection = document
        .querySelector('.w-2.h-2.bg-blue-400.rounded-full')
        ?.closest('[class*="py-2"]');
      expect(contextSection).toBeInTheDocument();

      // Check context content more specifically
      expect(screen.getByText('collaborating with')).toBeInTheDocument();
      expect(screen.getByText('Johnson Family Literacy Program')).toBeInTheDocument();

      // Activity link should have amber color for collaboration
      const activityLink = screen.getByRole('link', { name: 'Johnson Family Literacy Program' });
      expect(activityLink).toHaveClass('text-amber-600', 'hover:text-amber-800');

      // Should link to goals page
      expect(activityLink).toHaveAttribute('href', '/goals/literacy_program_johnson');
    });
  });

  describe('Post with Custom Context', () => {
    it('should render custom context text without links', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: {
          type: 'custom' as const,
          customText: 'Shared from Learning Resources collection',
        },
      };

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Custom text should be rendered
      expect(screen.getByText('Shared from Learning Resources collection')).toBeInTheDocument();

      // Should not have context links, only author link
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1); // Only the author link
      expect(links[0]).toHaveAttribute('href', '/community/profiles/sarah_mama');
    });
  });

  describe('Post without Context', () => {
    it('should render normally without context section', () => {
      renderWithRouter(<FeedListItem item={baseMockItem} />);

      // No context indicator should be present
      const contextIndicator = document.querySelector('.w-2.h-2.bg-blue-400.rounded-full');
      expect(contextIndicator).not.toBeInTheDocument();

      // No separator line should be present
      const separatorLine = document.querySelector('.border-t.border-gray-200');
      expect(separatorLine).not.toBeInTheDocument();

      // Regular content should still render
      expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
      expect(screen.getByText('Test Post with Context')).toBeInTheDocument();
    });
  });

  describe('Context Layout and Visual Structure', () => {
    it('should have proper visual hierarchy with context', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: {
          type: 'profile_milestone' as const,
          profileName: 'Isabella Dawson',
          profileId: 'isabella_dawson_001',
          profileType: 'family_member' as const,
          activityName: 'Emotional Intelligence',
          activityId: 'months_24_30_social_emotional_1',
          activityType: 'milestone' as const,
        },
      };

      const { container } = renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Check the overall structure
      const feedItemContainer = container.firstChild as HTMLElement;
      expect(feedItemContainer).toHaveClass('p-4', 'hover:shadow-md');

      // Context should come before header
      const contextElement = container
        .querySelector('.w-2.h-2.bg-blue-400.rounded-full')
        ?.closest('[class*="py-2"]');
      const headerElement = container
        .querySelector('img[alt="Sarah Johnson"]')
        ?.closest('[class*="flex"]');

      expect(contextElement).toBeInTheDocument();
      expect(headerElement).toBeInTheDocument();

      if (contextElement && headerElement) {
        // Context should appear before header in DOM order
        expect(
          contextElement.compareDocumentPosition(headerElement) & Node.DOCUMENT_POSITION_FOLLOWING
        ).toBeTruthy();
      }
    });

    it('should maintain consistent spacing with context', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: {
          type: 'profile_milestone' as const,
          profileName: 'Isabella Dawson',
          profileId: 'isabella_dawson_001',
          profileType: 'family_member' as const,
          activityName: 'Emotional Intelligence',
          activityId: 'months_24_30_social_emotional_1',
          activityType: 'milestone' as const,
        },
      };

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Context should have proper padding
      const contextContainer = document
        .querySelector('.w-2.h-2.bg-blue-400.rounded-full')
        ?.closest('[class*="py-2"]');
      expect(contextContainer).toHaveClass('py-2');

      // Separator should have proper border
      const separator = document.querySelector('.border-t.border-gray-200');
      expect(separator).toHaveClass('border-t', 'border-gray-200');
    });
  });

  describe('Context Color Coding Validation', () => {
    it('should use correct colors for different context types', () => {
      const testCases = [
        {
          type: 'profile_milestone' as const,
          expectedActivityColor: 'text-purple-600',
          activityType: 'milestone' as const,
        },
        {
          type: 'profile_activity' as const,
          expectedActivityColor: 'text-green-600',
          activityType: 'goal' as const,
        },
        {
          type: 'collaboration' as const,
          expectedActivityColor: 'text-amber-600',
          activityType: 'goal' as const,
        },
      ];

      testCases.forEach(({ type, expectedActivityColor, activityType }) => {
        const itemWithContext = {
          ...baseMockItem,
          context: {
            type,
            profileName: 'Test Profile',
            profileId: 'test_profile',
            profileType: 'family_member' as const,
            activityName: 'Test Activity',
            activityId: 'test_activity',
            activityType,
          },
        };

        const { unmount } = renderWithRouter(<FeedListItem item={itemWithContext} />);

        const activityLink = screen.getByRole('link', { name: 'Test Activity' });
        expect(activityLink).toHaveClass(expectedActivityColor);

        unmount();
      });
    });

    it('should consistently use blue for profile links across all context types', () => {
      const contextTypes = ['profile_milestone', 'profile_activity', 'collaboration'] as const;

      contextTypes.forEach((type) => {
        const itemWithContext = {
          ...baseMockItem,
          context: {
            type,
            profileName: 'Test Profile',
            profileId: 'test_profile',
            profileType: 'family_member' as const,
            activityName: 'Test Activity',
            activityId: 'test_activity',
            activityType: 'milestone' as const,
          },
        };

        const { unmount } = renderWithRouter(<FeedListItem item={itemWithContext} />);

        const profileLink = screen.getByRole('link', { name: 'Test Profile' });
        expect(profileLink).toHaveClass('text-blue-600', 'hover:text-blue-800');

        unmount();
      });
    });
  });
});
