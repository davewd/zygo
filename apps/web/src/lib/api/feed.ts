// Local type definitions until the types package exports are fixed
export enum FeedItemType {
  LINK = 'link',
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  MILESTONE = 'milestone',
  POLL = 'poll',
  REPOST = 'repost',
  SHARE = 'share',
  COMMENT = 'comment',
  ANNOUNCEMENT = 'announcement',
  EVENT = 'event',
  QUESTION = 'question',
  POST = 'post',
  BREASTFEEDING_TOOL = 'breastfeeding_tool',
  BREASTFEEDING_DAILY_SUMMARY = 'breastfeeding_daily_summary',
  BREASTFEEDING_WEEKLY_SUMMARY = 'breastfeeding_weekly_summary',
  BREASTFEEDING_REMINDER = 'breastfeeding_reminder',
  LIBRARY_BOOK_REMINDER = 'library_book_reminder',
  TOOL_CTA_TEMPORAL = 'tool_cta_temporal',
  SPONSORED = 'sponsored',
  AWARD_PRESENTATION = 'award_presentation'
}

// Actor types for feed authors
export enum ActorType {
  COMMUNITY_MEMBER = 'community_member',
  SERVICE_PROVIDER = 'service_provider',
  SERVICE_CENTER = 'service_center'
}

// Import feed items data from JSON
import feedItemsData from './data/feed/feed_items.json';
// Import blog API for getting provider blog posts
import { getAllBlogPosts } from './blog';

export enum VisibilityLevel {
  PUBLIC = 'public',
  GROUP = 'group',
  PRIVATE = 'private'
}

export interface PrivacySettings {
  visibility: VisibilityLevel;
  sharedWith: Array<{
    type: 'group' | 'individual';
    name: string;
    id: string;
  }>;
}

export interface FeedAuthor {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  actorType: ActorType;
  // Community member specific fields
  role?: 'parent' | 'grandparent' | 'child' | 'guardian' | 'caregiver';
  location?: {
    suburb?: string;
    state?: string;
    country?: string;
  };
  // Service provider specific fields
  title?: string;
  credentials?: Array<{
    title: string;
    abbreviation?: string;
    issuingBody: string;
    verified: boolean;
  }>;
  yearsExperience?: number;
  specializations?: string[];
  centerName?: string;
  centerId?: string;
  // Service center specific fields
  organizationType?: 'healthcare' | 'education' | 'childcare' | 'sports' | 'wellness';
  features?: string[];
  certifications?: string[];
}

export interface FeedItemTypeMap {
  id: string;
  type: FeedItemType;
  url?: string;
  author: FeedAuthor;
  title?: string;
  description?: string;
  imageUrl?: string;
  post?: string;
  domain?: string;
  metadata: {
    createdAt: string;
    updatedAt?: string;
    source?: string;
    sourceUrl?: string;
    authorId?: string;
  };
  stats: {
    comments: number;
    reposts: number;
    shares: number;
    likes: number;
  };
  privacy: PrivacySettings;
  // Breastfeeding-specific data
  breastfeedingData?: Array<{
    date: string;
    feedingTime: number;
    happiness: number;
    soreness: number;
    fullDate: string;
  }>;
  // Daily breastfeeding data with specific times
  breastfeedingDailyData?: Array<{
    time: string; // e.g., "7:30 AM"
    duration: number; // minutes
    happiness: number;
    soreness: number;
    notes?: string;
  }>;
  breastfeedingSummary?: {
    avgDuration: number;
    avgHappiness: number;
    avgSoreness: number;
    totalSessions: number;
  };
  // Weekly summary with count data
  breastfeedingWeeklySummary?: {
    weeklyData: Array<{
      day: string;
      avgDuration: number;
      feedCount: number;
      avgHappiness: number;
      avgSoreness: number;
    }>;
    totalWeeklyFeeds: number;
    avgDailyFeeds: number;
  };
  // Sponsored content specific data
  sponsoredData?: {
    advertiserName: string;
    advertiserLogo?: string;
    ctaText: string;
    ctaUrl: string;
    sponsorshipType?: 'promoted' | 'sponsored' | 'ad';
  };
  // Event specific data
  eventData?: {
    date: string;
    time: string;
    location: string;
    attendees: number;
    schoolLogo?: string;
    schoolName?: string;
  };
  // Tool CTA Temporal specific data
  toolCTATemporalData?: {
    backgroundGradient: string;
    borderColor: string;
    icon: string; // Icon name as string since we can't store LucideIcon directly in JSON
    iconColor: string;
    headerText: string;
    description: string;
    actions: Array<{
      label: string;
      url: string;
      icon: string; // Icon name as string
      isPrimary?: boolean;
    }>;
  };
  // Milestone specific data
  milestoneId?: string; // ID of the related milestone from the milestones CSV
  // Award presentation specific data
  awardData?: {
    awardType: string;
    recipient: {
      name: string;
      studentId?: string;
      grade?: string;
      parents?: Array<{
        name: string;
        relationship: string;
      }>;
    };
    presenter: {
      name: string;
      title: string;
      providerId?: string;
    };
    school?: {
      name: string;
      logo?: string;
    };
    presentationDate?: string;
    presentationTime?: string;
    achievements?: string[];
  };
  // Mentions for social features
  mentions?: Array<{
    type: string;
    name: string;
    handle: string;
  }>;
}

// Simulate API endpoints
const API_BASE_URL = 'http://localhost:3000/api';

// Feed filtering and query interface
export interface FeedQuery {
  limit?: number;
  cursor?: string;
  filters?: {
    authorId?: string;
    type?: FeedItemType[];
    source?: string[];
    tags?: string[];
    visibility?: VisibilityLevel[];
  };
}

export interface FeedResponse {
  items: FeedItemTypeMap[];
  hasMore: boolean;
  nextCursor?: string;
}

// Helper function to convert blog post to feed item
const convertBlogPostToFeedItem = (blogPost: any): any => {
  // Get author info based on authorId
  const getAuthorInfo = (authorId: string) => {
    switch (authorId) {
      case 'rebecca-cavallaro':
        return {
          name: 'Rebecca Cavallaro',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        };
      case 'gavin-mccormack':
        return {
          name: 'Gavin McCormack',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };
      default:
        return {
          name: 'Unknown Author',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        };
    }
  };

  const authorInfo = getAuthorInfo(blogPost.authorId);

  return {
    id: `blog-${blogPost.id}`,
    title: blogPost.title,
    metadata: {
      createdAt: blogPost.publishDate,
      source: 'zygo-blog',
      sourceUrl: `/blog/${blogPost.id}`,
      authorId: blogPost.authorId, // This is crucial for provider feed filtering
    },
    author: {
      name: authorInfo.name,
      handle: blogPost.authorId, // Use the authorId as handle to match service provider ID
      avatar: authorInfo.avatar,
      verified: true,
      actorType: ActorType.SERVICE_PROVIDER, // Changed to service provider for proper filtering
    },
    type: FeedItemType.POST,
    post: blogPost.content,
    imageUrl: blogPost.imageUrl,
    stats: {
      likes: blogPost.peerLikes.count,
      shares: Math.floor(blogPost.peerLikes.count * 0.3),
      comments: Math.floor(blogPost.peerLikes.count * 0.5),
      reposts: Math.floor(blogPost.peerLikes.count * 0.2),
    },
    privacy: {
      visibility: VisibilityLevel.PUBLIC,
      sharedWith: []
    },
    // For posts with references
    hasReferences: blogPost.hasReferences,
    peerLikes: blogPost.peerLikes,
  };
};

// Mock data - now sourced from JSON file
const mockData = {
  results: feedItemsData
};

// Legacy interface for backward compatibility  
export interface FeedParams {
  limit?: number;
  cursor?: string;
}

// Main feed items (backward compatible)
export const fetchFeedItems = async (params: FeedParams = {}): Promise<FeedResponse> => {
  return fetchCommunityFeedItems(params);
};

export const fetchMoreFeedItems = async (cursor: string, limit = 10): Promise<FeedResponse> => {
  return fetchFeedItems({ cursor, limit });
};

// Generic feed fetching with filtering capabilities
export const fetchFilteredFeedItems = async (query: FeedQuery = {}): Promise<FeedResponse> => {
  const { limit = 10, cursor, filters } = query;
  const offset = cursor ? parseInt(cursor, 10) : 0;

  // Start with all mock data
  let allItems = [...mockData.results];
  
  // Add blog posts if not filtered out by source
  if (!filters?.source || filters.source.includes('zygo-blog')) {
    try {
      // Get all blog posts from API
      const blogResponse = await getAllBlogPosts();
      const allBlogPosts = blogResponse.blogPosts;
      
      const blogFeedItems = allBlogPosts.map(convertBlogPostToFeedItem);
      allItems = [...blogFeedItems, ...allItems];
    } catch (error) {
      console.error('Failed to load blog posts for feed:', error);
      // Continue without blog posts if API fails
    }
  }

  // Apply filters
  let filteredItems = allItems;

  if (filters) {
    filteredItems = allItems.filter(item => {
      // Filter by author - check both handle and metadata.authorId for consistency
      if (filters.authorId && 
          item.author?.handle !== filters.authorId && 
          item.author?.providerId !== filters.authorId) {
        return false;
      }

      // Filter by type (convert to string for comparison)
      if (filters.type && !filters.type.includes(item.type as FeedItemType)) {
        return false;
      }

      // Filter by source
      if (filters.source && item.metadata?.source && !filters.source.includes(item.metadata.source)) {
        return false;
      }

      // Filter by visibility (convert to enum for comparison)
      if (filters.visibility && !filters.visibility.includes(item.privacy?.visibility as VisibilityLevel)) {
        return false;
      }

      // Filter by tags (for blog posts)
      if (filters.tags && (item as any).tags) {
        const itemTags = (item as any).tags || [];
        if (!filters.tags.some(tag => itemTags.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }

  // Sort by creation date (newest first)
  filteredItems.sort((a, b) => 
    new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime()
  );

  // Transform items with consistent structure
  const transformedItems = filteredItems.map((item: any) => ({
    id: item.id,
    type: item.type,
    title: item.title || item.name,
    description: item.description,
    post: item.post,
    imageUrl: item.imageUrl || item.image,
    url: item.url,
    domain: item.domain,
    author: {
      name: item.author?.name || item.author?.title || 'Unknown',
      handle: item.author?.handle || 'unknown',
      avatar: item.author?.avatar || item.author?.image || 'https://via.placeholder.com/48',
      verified: item.author?.verified || false,
      actorType: item.author?.actorType || ActorType.COMMUNITY_MEMBER, // Default to community member
      // Community member fields
      role: item.author?.role,
      location: item.author?.location,
      // Service provider fields
      title: item.author?.title,
      credentials: item.author?.credentials,
      yearsExperience: item.author?.yearsExperience,
      specializations: item.author?.specializations,
      centerName: item.author?.centerName,
      centerId: item.author?.centerId,
      // Service center fields
      organizationType: item.author?.organizationType,
      features: item.author?.features,
      certifications: item.author?.certifications,
    },
    metadata: {
      createdAt: item.metadata?.createdAt || new Date().toISOString(),
      source: item.metadata?.source || 'unknown',
      sourceUrl: item.metadata?.sourceUrl,
      authorId: item.author?.handle || item.author?.providerId, // Add authorId for compatibility
    },
    stats: item.stats || { likes: 0, shares: 0, comments: 0, reposts: 0 },
    privacy: { 
      visibility: item.privacy?.visibility || 'public', 
      sharedWith: item.privacy?.sharedWith || [] 
    },
    // Preserve specific data
    breastfeedingData: item.breastfeedingData,
    breastfeedingDailyData: item.breastfeedingDailyData,
    breastfeedingSummary: item.breastfeedingSummary,
    breastfeedingWeeklySummary: item.breastfeedingWeeklySummary,
    sponsoredData: item.sponsoredData,
    eventData: item.eventData,
    toolCTATemporalData: item.toolCTATemporalData,
    milestoneId: item.milestoneId,
    hasReferences: item.hasReferences,
    peerLikes: item.peerLikes,
    awardData: item.awardData,
    mentions: item.mentions,
  }));

  // Implement pagination
  const totalItems = transformedItems.length;
  const startIndex = offset;
  const endIndex = Math.min(startIndex + limit, totalItems);
  const items = transformedItems.slice(startIndex, endIndex);
  
  const hasMore = endIndex < totalItems;
  const nextCursor = hasMore ? endIndex.toString() : undefined;
  
  return {
    items,
    hasMore,
    nextCursor,
  };
};

// Provider-specific feed for service provider profiles
export const fetchProviderFeedItems = async (providerId: string, query: Omit<FeedQuery, 'filters'> = {}): Promise<FeedResponse> => {
  return fetchFilteredFeedItems({
    ...query,
    filters: {
      authorId: providerId,
    },
  });
};

// Community feed - all public and group posts
export const fetchCommunityFeedItems = async (query: Omit<FeedQuery, 'filters'> = {}): Promise<FeedResponse> => {
  return fetchFilteredFeedItems({
    ...query,
    filters: {
      visibility: [VisibilityLevel.PUBLIC, VisibilityLevel.GROUP],
    },
  });
};

// Blog posts only
export const fetchBlogFeedItems = async (query: Omit<FeedQuery, 'filters'> = {}): Promise<FeedResponse> => {
  return fetchFilteredFeedItems({
    ...query,
    filters: {
      source: ['zygo-blog'],
    },
  });
};