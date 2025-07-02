import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  ActorType,
  FeedItemType,
  FeedItemTypeMap,
  VisibilityLevel,
} from '../../../../lib/api/feed';
import { FeedItemContext, type ContextData } from '../FeedItemContext';

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

// Base mock feed item
const baseMockItem: FeedItemTypeMap = {
  id: 'test-feed-item',
  type: FeedItemType.POST,
  title: 'Test Feed Item',
  post: 'Test content',
  author: {
    name: 'Test Author',
    handle: 'test_author',
    avatar: 'https://example.com/avatar.jpg',
    actorType: ActorType.COMMUNITY_MEMBER,
  },
  metadata: {
    createdAt: '2024-12-17T14:30:00Z',
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
};

describe('FeedItemContext', () => {
  describe('No Context Data', () => {
    it('should not render when no context is provided', () => {
      const itemWithoutContext = baseMockItem;

      const { container } = renderWithRouter(<FeedItemContext item={itemWithoutContext} />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Profile Milestone Context', () => {
    const mockProfileMilestoneContext: ContextData = {
      type: 'profile_milestone',
      profileName: 'Isabella Dawson',
      profileId: 'isabella_dawson_001',
      profileType: 'family_member',
      activityName: 'Emotional Intelligence',
      activityId: 'months_24_30_social_emotional_1',
      activityType: 'milestone',
    };

    it('should render profile milestone context with links', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: mockProfileMilestoneContext,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Check for profile name link
      const profileLink = screen.getByRole('link', { name: 'Isabella Dawson' });
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute('href', '/family/members/isabella_dawson_001');
      expect(profileLink).toHaveClass('font-medium', 'text-blue-600', 'hover:text-blue-800');

      // Check for working on text
      expect(screen.getByText('working on')).toBeInTheDocument();

      // Check for activity name link
      const activityLink = screen.getByRole('link', { name: 'Emotional Intelligence' });
      expect(activityLink).toBeInTheDocument();
      expect(activityLink).toHaveAttribute(
        'href',
        '/timeline/milestone/months_24_30_social_emotional_1'
      );
      expect(activityLink).toHaveClass('font-medium', 'text-purple-600', 'hover:text-purple-800');
    });

    it('should render without links when IDs are missing', () => {
      const contextWithoutIds: ContextData = {
        type: 'profile_milestone',
        profileName: 'Isabella Dawson',
        activityName: 'Emotional Intelligence',
      };

      const itemWithContext = {
        ...baseMockItem,
        context: contextWithoutIds,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Should render as plain text when IDs are missing
      expect(screen.getByText('Isabella Dawson')).toBeInTheDocument();
      expect(screen.getByText('Emotional Intelligence')).toBeInTheDocument();
      expect(screen.getByText('working on')).toBeInTheDocument();

      // Should not have links
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('Profile Activity Context', () => {
    const mockProfileActivityContext: ContextData = {
      type: 'profile_activity',
      profileName: 'Dr. Sarah Chen',
      profileId: 'dr_sarah_chen_001',
      profileType: 'service_provider',
      activityName: 'Language Development',
      activityId: 'language_dev_program',
      activityType: 'goal',
    };

    it('should render profile activity context with correct links and colors', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: mockProfileActivityContext,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Check for profile name link
      const profileLink = screen.getByRole('link', { name: 'Dr. Sarah Chen' });
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute('href', '/community/providers/dr_sarah_chen_001');
      expect(profileLink).toHaveClass('font-medium', 'text-blue-600');

      // Check for posted about text
      expect(screen.getByText('posted about')).toBeInTheDocument();

      // Check for activity name link with green color for activities
      const activityLink = screen.getByRole('link', { name: 'Language Development' });
      expect(activityLink).toBeInTheDocument();
      expect(activityLink).toHaveAttribute('href', '/goals/language_dev_program');
      expect(activityLink).toHaveClass('font-medium', 'text-green-600', 'hover:text-green-800');
    });
  });

  describe('Collaboration Context', () => {
    const mockCollaborationContext: ContextData = {
      type: 'collaboration',
      profileName: 'Dr. Emily Chen',
      profileId: 'dr_emily_chen_001',
      profileType: 'service_provider',
      activityName: 'Johnson Family Literacy Program',
      activityId: 'literacy_program_johnson',
      activityType: 'goal',
    };

    it('should render collaboration context with amber activity links', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: mockCollaborationContext,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Check for profile name link
      const profileLink = screen.getByRole('link', { name: 'Dr. Emily Chen' });
      expect(profileLink).toBeInTheDocument();
      expect(profileLink).toHaveAttribute('href', '/community/providers/dr_emily_chen_001');

      // Check for collaborating with text
      expect(screen.getByText('collaborating with')).toBeInTheDocument();

      // Check for activity name link with amber color for collaborations
      const activityLink = screen.getByRole('link', { name: 'Johnson Family Literacy Program' });
      expect(activityLink).toBeInTheDocument();
      expect(activityLink).toHaveAttribute('href', '/goals/literacy_program_johnson');
      expect(activityLink).toHaveClass('font-medium', 'text-amber-600', 'hover:text-amber-800');
    });
  });

  describe('Custom Context', () => {
    const mockCustomContext: ContextData = {
      type: 'custom',
      customText: 'Shared from Learning Resources collection',
    };

    it('should render custom context text', () => {
      const itemWithContext = {
        ...baseMockItem,
        context: mockCustomContext,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Check for custom text
      expect(screen.getByText('Shared from Learning Resources collection')).toBeInTheDocument();

      // Should not have any links
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('Link Generation Logic', () => {
    it('should generate correct profile links for different profile types', () => {
      const testCases = [
        { profileType: 'family_member', expected: '/family/members/test_id' },
        { profileType: 'service_provider', expected: '/community/providers/test_id' },
        { profileType: 'community_member', expected: '/community/profiles/test_id' },
        { profileType: 'unknown_type', expected: '/community/profiles/test_id' }, // fallback
      ];

      testCases.forEach(({ profileType, expected }) => {
        const context: ContextData = {
          type: 'profile_milestone',
          profileName: 'Test Profile',
          profileId: 'test_id',
          profileType: profileType as any,
          activityName: 'Test Activity',
          activityId: 'test_activity',
          activityType: 'milestone',
        };

        const itemWithContext = {
          ...baseMockItem,
          context,
        };

        const { unmount } = renderWithRouter(<FeedItemContext item={itemWithContext} />);

        const profileLink = screen.getByRole('link', { name: 'Test Profile' });
        expect(profileLink).toHaveAttribute('href', expected);

        unmount();
      });
    });

    it('should generate correct activity links for different activity types', () => {
      const testCases = [
        { activityType: 'milestone', expected: '/timeline/milestone/test_activity' },
        { activityType: 'event', expected: '/events/test_activity' },
        { activityType: 'goal', expected: '/goals/test_activity' },
        { activityType: 'assessment', expected: '/assessments/test_activity' },
        { activityType: 'unknown_type', expected: '/timeline/milestone/test_activity' }, // fallback
      ];

      testCases.forEach(({ activityType, expected }) => {
        const context: ContextData = {
          type: 'profile_milestone',
          profileName: 'Test Profile',
          profileId: 'test_id',
          profileType: 'family_member',
          activityName: 'Test Activity',
          activityId: 'test_activity',
          activityType: activityType as any,
        };

        const itemWithContext = {
          ...baseMockItem,
          context,
        };

        const { unmount } = renderWithRouter(<FeedItemContext item={itemWithContext} />);

        const activityLink = screen.getByRole('link', { name: 'Test Activity' });
        expect(activityLink).toHaveAttribute('href', expected);

        unmount();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle unknown context type gracefully', () => {
      const invalidContext: ContextData = {
        type: 'unknown_type' as any,
        profileName: 'Test Profile',
      };

      const itemWithContext = {
        ...baseMockItem,
        context: invalidContext,
      };

      const { container } = renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Should not render anything for unknown context type
      expect(container.firstChild).toBeNull();
    });

    it('should handle missing context data gracefully', () => {
      const incompleteContext: ContextData = {
        type: 'profile_milestone',
        // Missing required fields
      };

      const itemWithContext = {
        ...baseMockItem,
        context: incompleteContext,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Should still render working on text even without names
      expect(screen.getByText('working on')).toBeInTheDocument();
    });

    it('should apply custom className correctly', () => {
      const context: ContextData = {
        type: 'custom',
        customText: 'Test custom text',
      };

      const itemWithContext = {
        ...baseMockItem,
        context,
      };

      const { container } = renderWithRouter(
        <FeedItemContext item={itemWithContext} className="custom-test-class" />
      );

      const contextContainer = container.firstChild as HTMLElement;
      expect(contextContainer).toHaveClass('custom-test-class');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const context: ContextData = {
        type: 'profile_milestone',
        profileName: 'Isabella Dawson',
        profileId: 'isabella_dawson_001',
        profileType: 'family_member',
        activityName: 'Emotional Intelligence',
        activityId: 'months_24_30_social_emotional_1',
        activityType: 'milestone',
      };

      const itemWithContext = {
        ...baseMockItem,
        context,
      };

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Links should be properly accessible
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
        expect(link.textContent).toBeTruthy();
      });

      // Should have proper text structure
      expect(screen.getByText('working on')).toBeInTheDocument();
    });
  });
});
