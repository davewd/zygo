import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fetchFeedItems } from '../../../../lib/api/feed';
import FeedListItem from '../../FeedListItem';
import { FeedItemContext } from '../FeedItemContext';

// Mock the router for testing
const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('FeedItemContext Data Integration', () => {
  describe('Real Feed Data Context Integration', () => {
    it('should load feed items with context data from JSON', async () => {
      const feedResponse = await fetchFeedItems({ limit: 20 });

      expect(feedResponse).toBeDefined();
      expect(feedResponse.items).toBeDefined();
      expect(Array.isArray(feedResponse.items)).toBe(true);

      // Find items with context data
      const itemsWithContext = feedResponse.items.filter(
        (item) => item.context && typeof item.context === 'object'
      );

      expect(itemsWithContext.length).toBeGreaterThan(0);
      console.log(`Found ${itemsWithContext.length} items with context data`);

      // Test each context item
      itemsWithContext.forEach((item, index) => {
        console.log(`Testing context item ${index + 1}:`, {
          id: item.id,
          contextType: item.context?.type,
          profileName: item.context?.profileName,
          activityName: item.context?.activityName,
        });

        expect(item.context).toBeDefined();
        expect(item.context!.type).toBeDefined();
        expect(['profile_milestone', 'profile_activity', 'collaboration', 'custom']).toContain(
          item.context!.type
        );
      });
    });

    it('should verify specific context items from JSON data', async () => {
      const feedResponse = await fetchFeedItems({ limit: 20 });

      // Look for the demo milestone context item
      const milestoneContextItem = feedResponse.items.find(
        (item) => item.id === 'feed-demo-context-milestone'
      );

      expect(milestoneContextItem).toBeDefined();
      expect(milestoneContextItem!.context).toBeDefined();
      expect(milestoneContextItem!.context!.type).toBe('profile_milestone');
      expect(milestoneContextItem!.context!.profileName).toBe('Isabella Dawson');
      expect(milestoneContextItem!.context!.activityName).toBe('Emotional Intelligence');

      // Look for the collaboration context item
      const collaborationContextItem = feedResponse.items.find(
        (item) => item.id === 'feed-demo-context-collaboration'
      );

      expect(collaborationContextItem).toBeDefined();
      expect(collaborationContextItem!.context).toBeDefined();
      expect(collaborationContextItem!.context!.type).toBe('collaboration');
      expect(collaborationContextItem!.context!.profileName).toBe('Dr. Emily Chen');
      expect(collaborationContextItem!.context!.activityName).toBe(
        'Johnson Family Literacy Program'
      );
    });

    it('should render FeedItemContext component with real data', async () => {
      const feedResponse = await fetchFeedItems({ limit: 10 });

      const itemWithContext = feedResponse.items.find(
        (item) => item.context?.type === 'profile_milestone'
      );

      if (!itemWithContext) {
        console.warn('No items with profile_milestone context found in feed');
        return;
      }

      renderWithRouter(<FeedItemContext item={itemWithContext} />);

      // Check that profile name is rendered
      if (itemWithContext.context!.profileName) {
        expect(screen.getByText(itemWithContext.context!.profileName)).toBeInTheDocument();
      }

      // Check that activity name is rendered
      if (itemWithContext.context!.activityName) {
        expect(screen.getByText(itemWithContext.context!.activityName)).toBeInTheDocument();
      }

      // Check for "working on" text for milestone context
      expect(screen.getByText('working on')).toBeInTheDocument();
    });

    it('should render full FeedListItem with context integration', async () => {
      const feedResponse = await fetchFeedItems({ limit: 10 });

      const itemWithContext = feedResponse.items.find(
        (item) => item.context && item.context.type === 'profile_milestone'
      );

      if (!itemWithContext) {
        console.warn('No items with context found in feed');
        return;
      }

      const consoleSpy = jest.spyOn(console, 'log');

      renderWithRouter(<FeedListItem item={itemWithContext} />);

      // Check that the feed item renders
      expect(screen.getByText(itemWithContext.author.name)).toBeInTheDocument();

      // Check for separator line between context and header
      const separatorLine = document.querySelector('.border-t.border-gray-200');
      expect(separatorLine).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe('Context Type Coverage', () => {
    it('should verify all context types are present in feed data', async () => {
      const feedResponse = await fetchFeedItems({ limit: 50 });

      const contextTypes = new Set<string>();
      const itemsWithContext = feedResponse.items.filter((item) => item.context);

      itemsWithContext.forEach((item) => {
        if (item.context?.type) {
          contextTypes.add(item.context.type);
        }
      });

      console.log('Found context types:', Array.from(contextTypes));

      // Verify we have at least some context types
      expect(contextTypes.size).toBeGreaterThan(0);

      // Check for specific types we expect
      const expectedTypes = ['profile_milestone', 'collaboration'];
      expectedTypes.forEach((expectedType) => {
        expect(contextTypes.has(expectedType)).toBe(true);
      });
    });

    it('should validate context data structure for all context items', async () => {
      const feedResponse = await fetchFeedItems({ limit: 50 });

      const itemsWithContext = feedResponse.items.filter((item) => item.context);

      itemsWithContext.forEach((item, index) => {
        const context = item.context!;

        // Basic structure validation
        expect(context.type).toBeDefined();
        expect(['profile_milestone', 'profile_activity', 'collaboration', 'custom']).toContain(
          context.type
        );

        // Type-specific validation
        switch (context.type) {
          case 'profile_milestone':
          case 'profile_activity':
          case 'collaboration':
            expect(context.profileName).toBeDefined();
            expect(typeof context.profileName).toBe('string');

            if (context.profileId) {
              expect(typeof context.profileId).toBe('string');
            }

            if (context.profileType) {
              expect(['family_member', 'service_provider', 'community_member']).toContain(
                context.profileType
              );
            }

            if (context.activityName) {
              expect(typeof context.activityName).toBe('string');
            }

            if (context.activityType) {
              expect(['milestone', 'event', 'goal', 'assessment']).toContain(context.activityType);
            }
            break;

          case 'custom':
            expect(context.customText).toBeDefined();
            expect(typeof context.customText).toBe('string');
            break;
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed context data gracefully', async () => {
      const feedResponse = await fetchFeedItems({ limit: 10 });

      const itemWithContext = feedResponse.items.find((item) => item.context);

      if (!itemWithContext) {
        console.warn('No items with context found for error handling test');
        return;
      }

      // Create a malformed context item
      const malformedItem = {
        ...itemWithContext,
        context: {
          type: 'invalid_type' as any,
          invalidField: 'invalid_value',
        },
      };

      // Should not throw an error
      const { container } = renderWithRouter(<FeedItemContext item={malformedItem} />);

      // Should render nothing for invalid context type
      expect(container.firstChild).toBeNull();
    });

    it('should handle feed items without author gracefully', async () => {
      const feedResponse = await fetchFeedItems({ limit: 5 });

      feedResponse.items.forEach((item) => {
        expect(item.author).toBeDefined();
        expect(item.author.name).toBeDefined();
        expect(item.author.handle).toBeDefined();
        expect(item.author.actorType).toBeDefined();
      });
    });
  });

  describe('Performance and Data Quality', () => {
    it('should load feed data within reasonable time', async () => {
      const startTime = Date.now();

      const feedResponse = await fetchFeedItems({ limit: 10 });

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      expect(loadTime).toBeLessThan(1000); // Should load within 1 second
      expect(feedResponse.items.length).toBeGreaterThan(0);
    });

    it('should have consistent data structure across feed items', async () => {
      const feedResponse = await fetchFeedItems({ limit: 20 });

      feedResponse.items.forEach((item, index) => {
        // Required fields
        expect(item.id).toBeDefined();
        expect(item.type).toBeDefined();
        expect(item.author).toBeDefined();
        expect(item.metadata).toBeDefined();
        expect(item.stats).toBeDefined();
        expect(item.privacy).toBeDefined();

        // Author structure
        expect(item.author.name).toBeDefined();
        expect(item.author.handle).toBeDefined();
        expect(item.author.actorType).toBeDefined();

        // Metadata structure
        expect(item.metadata.createdAt).toBeDefined();
        expect(typeof item.metadata.createdAt).toBe('string');

        // Stats structure
        expect(typeof item.stats.likes).toBe('number');
        expect(typeof item.stats.shares).toBe('number');
        expect(typeof item.stats.comments).toBe('number');
        expect(typeof item.stats.reposts).toBe('number');

        // Privacy structure
        expect(item.privacy.visibility).toBeDefined();
        expect(Array.isArray(item.privacy.sharedWith)).toBe(true);

        // Context validation (if present)
        if (item.context) {
          expect(typeof item.context).toBe('object');
          expect(item.context.type).toBeDefined();
        }
      });
    });
  });
});
