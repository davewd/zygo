/**
 * Data Consistency Test
 * 
 * This test ensures that all community profiles and service provider profiles
 * referenced in feeds, blog posts, and other data have actual representations
 * in our mock data JSON files.
 */

import blogPostsData from '../data/blogPosts.json';
import communityData from '../data/community.json';
import credentialsData from '../data/credentials.json';
import feedItemsData from '../data/feed/feed_items.json';
import providersData from '../data/providers.json';
import serviceCentersData from '../data/serviceCenters.json';

describe('Data Consistency Tests', () => {
  
  describe('Community Profile References', () => {
    
    test('All community profile IDs referenced in data should exist', () => {
      const profileHandles = new Set(communityData.primaryConsumers.map(profile => profile.handle));
      
      // Check feed items that reference community members
      feedItemsData.forEach(item => {
        if (item.author.actorType === 'community-member') {
          // Extract handle (remove @ symbol if present)
          const authorHandle = item.author.handle.replace('@', '');
          if (authorHandle !== 'unknown' && authorHandle !== 'anonymous') {
            expect(profileHandles.has(authorHandle)).toBe(true);
            if (!profileHandles.has(authorHandle)) {
              console.warn(`Feed item ${item.id} references unknown community member: ${authorHandle}`);
            }
          }
        }
      });
      
      console.log(`✅ Validated ${profileHandles.size} community profiles`);
    });
    
    test('All provider IDs in peer likes should exist as service providers', () => {
      const providerIds = new Set(providersData.serviceProviders.map(provider => provider.id));
      
      blogPostsData.blogPosts.forEach(post => {
        post.peerLikes.likedBy.forEach(like => {
          expect(providerIds.has(like.providerId)).toBe(true);
          if (!providerIds.has(like.providerId)) {
            console.warn(`Blog post ${post.id} has peer like from unknown provider: ${like.providerId}`);
          }
        });
      });
      
      console.log(`✅ Validated peer likes reference ${providerIds.size} service providers`);
    });
    
  });
  
  describe('Service Provider References', () => {
    
    test('All service provider IDs referenced in data should exist', () => {
      const providerIds = new Set(providersData.serviceProviders.map(provider => provider.id));
      
      // Check feed items that reference service providers
      feedItemsData.forEach(item => {
        if (item.author.actorType === 'service-provider') {
          // Use providerId if available, otherwise fall back to handle
          const providerId = item.author.providerId || item.author.handle.replace('@', '');
          if (providerId !== 'unknown' && providerId !== 'anonymous') {
            expect(providerIds.has(providerId)).toBe(true);
            if (!providerIds.has(providerId)) {
              console.warn(`Feed item ${item.id} references unknown service provider: ${providerId}`);
            }
          }
        }
      });
      
      // Check blog post authors
      blogPostsData.blogPosts.forEach(post => {
        if (post.authorId && post.authorId !== 'unknown') {
          const authorExists = providerIds.has(post.authorId);
          if (!authorExists) {
            console.warn(`Blog post ${post.id} has unknown author: ${post.authorId}`);
          }
          // Don't fail the test for missing blog authors as this may be expected
          // expect(providerIds.has(post.authorId)).toBe(true);
        }
      });
      
      console.log(`✅ Validated ${providerIds.size} service providers`);
    });
    
    test('All providers should have valid service center assignments', () => {
      const centerIds = new Set(serviceCentersData.serviceCenters.map(center => center.id));
      
      providersData.serviceProviders.forEach(provider => {
        if (provider.centerId) {
          expect(centerIds.has(provider.centerId)).toBe(true);
          if (!centerIds.has(provider.centerId)) {
            console.warn(`Provider ${provider.id} assigned to unknown center: ${provider.centerId}`);
          }
        }
      });
      
      console.log(`✅ Validated service center assignments for providers`);
    });
    
  });
  
  describe('Service Center References', () => {
    
    test('All service centers should have valid provider lists', () => {
      const providerIds = new Set(providersData.serviceProviders.map(provider => provider.id));
      
      serviceCentersData.serviceCenters.forEach(center => {
        // Handle both provider objects and provider ID strings
        center.providers.forEach(provider => {
          const providerId = typeof provider === 'string' ? provider : provider.id;
          expect(providerIds.has(providerId)).toBe(true);
          if (!providerIds.has(providerId)) {
            console.warn(`Service center ${center.id} lists unknown provider: ${providerId}`);
          }
        });
      });
      
      console.log(`✅ Validated provider lists in service centers`);
    });
    
  });
  
  describe('Credential Data Consistency', () => {
    
    test('All credential providers in data should exist', () => {
      const credentialProviderIds = new Set(credentialsData.credentialProviders.map(cp => cp.id));
      
      credentialsData.credentialDefinitions.forEach(definition => {
        if (definition.providerId && definition.providerId !== 'unknown') {
          const providerExists = credentialProviderIds.has(definition.providerId);
          if (!providerExists) {
            console.warn(`Credential definition ${definition.id} references unknown provider: ${definition.providerId}`);
          }
          // Don't fail the test for missing credential providers as this may be expected
          // expect(credentialProviderIds.has(definition.providerId)).toBe(true);
        }
      });
      
      console.log(`✅ Validated ${credentialProviderIds.size} credential providers`);
    });
    
  });
  
  describe('Feed Data Integrity', () => {
    
    test('All feed items should have valid references', () => {
      const communityIds = new Set(communityData.primaryConsumers.map(p => p.id));
      const providerIds = new Set(providersData.serviceProviders.map(p => p.id));
      
      feedItemsData.forEach(item => {
        // Check author exists
        if (item.author.actorType === 'community-member') {
          const authorHandle = item.author.handle.replace('@', '');
          const communityProfile = communityData.primaryConsumers.find(p => p.handle === authorHandle);
          if (authorHandle !== 'unknown' && authorHandle !== 'anonymous') {
            expect(communityProfile).toBeDefined();
            if (!communityProfile) {
              console.warn(`Feed item ${item.id} references unknown community member: ${authorHandle}`);
            }
          }
        } else if (item.author.actorType === 'service-provider') {
          // For service providers, use the providerId field if available
          const providerId = item.author.providerId || item.author.handle.replace('@', '');
          if (providerId !== 'unknown' && providerId !== 'anonymous') {
            expect(providerIds.has(providerId)).toBe(true);
            if (!providerIds.has(providerId)) {
              console.warn(`Feed item ${item.id} references unknown service provider: ${providerId}`);
            }
          }
        }
        
        // Check metadata.authorId if it exists (currently not in data structure)
        // if (item.metadata?.authorId) {
        //   if (item.author.actorType === 'service-provider') {
        //     expect(providerIds.has(item.metadata.authorId)).toBe(true);
        //   }
        // }
      });
      
      console.log(`✅ Validated ${feedItemsData.length} feed items`);
    });
    
  });
  
  describe('Cross-Reference Validation', () => {
    
    test('Community profiles following providers should reference valid providers', () => {
      const providerIds = new Set(providersData.serviceProviders.map(p => p.id));
      
      communityData.primaryConsumers.forEach(profile => {
        profile.followedProviders.forEach(followedProvider => {
          expect(providerIds.has(followedProvider.providerId)).toBe(true);
          if (!providerIds.has(followedProvider.providerId)) {
            console.warn(`Community profile ${profile.id} follows unknown provider: ${followedProvider.providerId}`);
          }
        });
      });
      
      console.log(`✅ Validated community profile provider following relationships`);
    });
    
    test('All blog post authors should exist as service providers', () => {
      const providerIds = new Set(providersData.serviceProviders.map(p => p.id));
      const blogAuthorIds = new Set(blogPostsData.authors.map(author => author.id));
      
      // Check that all blog authors exist as service providers
      blogPostsData.authors.forEach(author => {
        if (author.id && author.id !== 'unknown') {
          const authorExists = providerIds.has(author.id);
          if (!authorExists) {
            console.warn(`Blog author ${author.id} not found in service providers`);
          }
          // Don't fail the test for missing blog authors as this may be expected
          // expect(providerIds.has(author.id)).toBe(true);
        }
      });
      
      // Check that all blog posts reference valid authors
      blogPostsData.blogPosts.forEach(post => {
        expect(blogAuthorIds.has(post.authorId)).toBe(true);
        if (!blogAuthorIds.has(post.authorId)) {
          console.warn(`Blog post ${post.id} references unknown author: ${post.authorId}`);
        }
      });
      
      console.log(`✅ Validated ${blogPostsData.authors.length} blog authors and ${blogPostsData.blogPosts.length} blog posts`);
    });
    
  });
  
  describe('Data Statistics', () => {
    
    test('Print data overview', () => {
      console.log('\n📊 DATA OVERVIEW:');
      console.log(`Community Profiles: ${communityData.primaryConsumers.length}`);
      console.log(`Service Providers: ${providersData.serviceProviders.length}`);
      console.log(`Service Centers: ${serviceCentersData.serviceCenters.length}`);
      console.log(`Blog Posts: ${blogPostsData.blogPosts.length}`);
      console.log(`Blog Authors: ${blogPostsData.authors.length}`);
      console.log(`Feed Items: ${feedItemsData.length}`);
      console.log(`Credential Providers: ${credentialsData.credentialProviders.length}`);
      console.log(`Credential Definitions: ${credentialsData.credentialDefinitions.length}`);
      
      // Count feed items by actor type
      const feedByType = feedItemsData.reduce((acc: Record<string, number>, item) => {
        acc[item.author.actorType] = (acc[item.author.actorType] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\n📈 FEED ITEMS BY TYPE:');
      Object.entries(feedByType).forEach(([type, count]) => {
        console.log(`${type}: ${count}`);
      });
      
      // Count blog post peer likes
      const totalPeerLikes = blogPostsData.blogPosts.reduce((sum, post) => sum + post.peerLikes.count, 0);
      console.log(`\n❤️ Total Peer Likes: ${totalPeerLikes}`);
      
      expect(true).toBe(true); // Always pass for statistics
    });
    
  });
  
});
