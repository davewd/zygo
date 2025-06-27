import { FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';
import { BlogPost } from '../network/blogPosts';

/**
 * Converts a BlogPost to a FeedItemTypeMap for use in the feed system
 */
export const convertBlogPostToFeedItem = (blogPost: BlogPost): FeedItemTypeMap => {
  return {
    id: blogPost.id,
    type: FeedItemType.POST,
    author: {
      name: getProviderName(blogPost.authorId), 
      handle: `@${blogPost.authorId}`,
      avatar: getProviderAvatar(blogPost.authorId),
      verified: true,
    },
    title: blogPost.title,
    description: blogPost.excerpt,
    post: blogPost.content,
    imageUrl: blogPost.imageUrl,
    metadata: {
      createdAt: blogPost.publishDate,
      source: 'zygo-blog',
      sourceUrl: `/blog/${blogPost.id}`,
    },
    stats: {
      likes: blogPost.peerLikes.count,
      shares: Math.floor(blogPost.peerLikes.count * 0.3), // Estimate shares
      comments: Math.floor(blogPost.peerLikes.count * 0.5), // Estimate comments
      reposts: Math.floor(blogPost.peerLikes.count * 0.2), // Estimate reposts
    },
    privacy: {
      visibility: 'public' as any,
      sharedWith: []
    }
  };
};

/**
 * Generate feed items for any provider's activity
 * This creates a polymorphic approach where any provider can have feed activity
 */
export const generateProviderFeedItems = (providerId: string): FeedItemTypeMap[] => {
  const feedItems: FeedItemTypeMap[] = [];
  
  // For now, we'll create some sample posts for any provider
  // In a real app, this would come from a backend API
  const samplePosts = generateSampleProviderPosts(providerId);
  
  return samplePosts;
};

/**
 * Generate sample posts for any provider to demonstrate polymorphic activity feeds
 */
const generateSampleProviderPosts = (providerId: string): FeedItemTypeMap[] => {
  const providerName = getProviderName(providerId);
  const providerAvatar = getProviderAvatar(providerId);
  
  const basePosts: Omit<FeedItemTypeMap, 'id' | 'post' | 'title' | 'description' | 'stats' | 'metadata'>[] = [
    {
      type: FeedItemType.POST,
      author: {
        name: providerName,
        handle: `@${providerId}`,
        avatar: providerAvatar,
        verified: true,
      },
      privacy: {
        visibility: 'public' as any,
        sharedWith: []
      }
    }
  ];

  // Generate different types of content based on provider type
  const posts = getProviderSpecificContent(providerId, providerName);
  
  return posts.map((post, index) => ({
    ...basePosts[0],
    id: `${providerId}-post-${index + 1}`,
    ...post,
    metadata: {
      createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(), // Stagger dates
      source: 'zygo-provider',
    },
    stats: {
      likes: Math.floor(Math.random() * 25) + 5,
      shares: Math.floor(Math.random() * 10) + 1,
      comments: Math.floor(Math.random() * 15) + 2,
      reposts: Math.floor(Math.random() * 5) + 1,
    }
  }));
};

/**
 * Get provider-specific content based on their specialization
 */
const getProviderSpecificContent = (providerId: string, providerName: string) => {
  // Map different provider types to relevant content
  if (providerId.includes('dietitian') || providerId.includes('nutrition')) {
    return [
      {
        title: 'Healthy Eating Tips for Families',
        description: 'Simple strategies to improve your family\'s nutrition',
        post: `
          <p>Nutrition doesn't have to be complicated! Here are some practical tips for busy families:</p>
          <ul>
            <li>🥗 <strong>Plan ahead</strong> - meal prep saves time and ensures healthier choices</li>
            <li>🍎 <strong>Keep healthy snacks visible</strong> - what you see is what you eat</li>
            <li>🥤 <strong>Stay hydrated</strong> - water should be the go-to drink</li>
            <li>🌈 <strong>Eat the rainbow</strong> - variety ensures diverse nutrients</li>
          </ul>
          <p>#HealthyEating #FamilyNutrition #WellnessJourney #HealthyLifestyle</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: 'Understanding Food Labels',
        description: 'What to look for when reading nutrition labels',
        post: `
          <p>Reading food labels can be overwhelming, but focusing on these key areas will help:</p>
          <p><strong>1. Ingredients list</strong> - ingredients are listed by weight, so the first few are most important</p>
          <p><strong>2. Serving size</strong> - all nutrition info is based on this amount</p>
          <p><strong>3. Added sugars</strong> - aim for foods with minimal added sugars</p>
          <p><strong>4. Sodium content</strong> - less is generally better for heart health</p>
          <p>Remember: whole foods don't need labels! 🍎🥕🥬</p>
          <p>#FoodLabels #HealthyChoices #NutritionEducation #EatReal</p>
        `
      }
    ];
  }
  
  if (providerId.includes('doctor') || providerId.includes('dr-')) {
    return [
      {
        title: 'Preventive Care Reminders',
        description: 'Important health screenings and check-ups to stay on track',
        post: `
          <p>Prevention is the best medicine! Here's what to keep on your radar:</p>
          <ul>
            <li>📅 <strong>Annual check-ups</strong> - establish baseline health metrics</li>
            <li>🔬 <strong>Age-appropriate screenings</strong> - catch issues early when treatable</li>
            <li>💉 <strong>Stay current with vaccinations</strong> - protect yourself and your community</li>
            <li>🏃‍♀️ <strong>Regular exercise</strong> - aim for 150 minutes per week</li>
            <li>😴 <strong>Prioritize sleep</strong> - 7-9 hours for optimal health</li>
          </ul>
          <p>Your health is an investment, not an expense! 💪</p>
          <p>#PreventiveCare #HealthyLiving #WellnessCheck #HealthFirst</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];
  }
  
  if (providerId.includes('swim') || providerId.includes('aquatic')) {
    return [
      {
        title: 'Water Safety for Children',
        description: 'Essential safety tips for kids around water',
        post: `
          <p>Water safety is everyone's responsibility. Key reminders for parents:</p>
          <ul>
            <li>👁️ <strong>Constant supervision</strong> - designate a "water watcher"</li>
            <li>🚪 <strong>Barriers and alarms</strong> - multiple layers of protection</li>
            <li>📚 <strong>Swimming lessons</strong> - start age-appropriate water skills early</li>
            <li>🦺 <strong>Life jackets</strong> - properly fitted and Coast Guard approved</li>
            <li>📱 <strong>Learn CPR</strong> - essential skill for any caregiver</li>
          </ul>
          <p>Water can be fun and safe with the right precautions! 🏊‍♂️</p>
          <p>#WaterSafety #SwimSafety #ChildSafety #AquaticEducation</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ];
  }
  
  // Default content for other providers
  return [
    {
      title: 'Tips from Your Healthcare Provider',
      description: 'Professional insights and guidance for your wellness journey',
      post: `
        <p>As your healthcare provider, I wanted to share some thoughts on maintaining wellness:</p>
        <p>🌟 <strong>Small changes, big impact</strong> - consistency beats perfection every time</p>
        <p>🤝 <strong>Partnership in care</strong> - we're here to support your health goals</p>
        <p>📞 <strong>Don't hesitate to reach out</strong> - questions help us provide better care</p>
        <p>Your health journey is unique, and we're here to guide you every step of the way.</p>
        <p>#Healthcare #WellnessJourney #PatientCare #HealthyLiving</p>
      `,
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];
};

/**
 * Get display name for provider (simplified - in real app would come from provider data)
 */
const getProviderName = (providerId: string): string => {
  // This is a simplified mapping - in a real app, this would come from the provider database
  const nameMap: Record<string, string> = {
    'rebecca-cavallaro': 'Rebecca Cavallaro',
    'jessica-dawson': 'Jessica Dawson',
    'dr-shelley-rowlands': 'Dr. Shelley Rowlands',
    'emma-rodriguez': 'Emma Rodriguez',
    'marcus-chen': 'Marcus Chen',
    'sarah-mitchell': 'Sarah Mitchell',
    // Add more as needed
  };
  
  return nameMap[providerId] || 'Healthcare Provider';
};

/**
 * Get avatar URL for provider (simplified - in real app would come from provider data)
 */
const getProviderAvatar = (providerId: string): string => {
  // Default avatar - in real app would come from provider profile
  return `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`;
};
