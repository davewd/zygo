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
  SPONSORED = 'sponsored'
}

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

export interface FeedItemTypeMap {
  id: string;
  type: FeedItemType;
  url?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
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
  breastfeedingSummary?: {
    avgDuration: number;
    avgHappiness: number;
    avgSoreness: number;
    totalSessions: number;
  };
  // Sponsored content specific data
  sponsoredData?: {
    advertiserName: string;
    advertiserLogo?: string;
    ctaText: string;
    ctaUrl: string;
    sponsorshipType?: 'promoted' | 'sponsored' | 'ad';
  };
}

// Simulate API endpoints
const API_BASE_URL = 'http://localhost:3000/api';

export interface FeedResponse {
  items: FeedItemTypeMap[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface FeedParams {
  limit?: number;
  cursor?: string;
}

// Mock data - in a real app, this would come from your backend
const mockData = {
  results: [
    {
      id: 1,
      post: "Here's an example of something i care about !",
      author: {
        name: "John Doe",
        title: "Software Engineer",
        image: "https://example.com/john_doe.jpg"
      },
      title: "My First Post",
      metadata: {
        createdAt: "2023-10-01T12:00:00Z"
      },
      type: "post",
      stats: {
        likes: 120,
        shares: 45,
        comments: 10
      },
      privacy: {
        visibility: "public",
        sharedWith: []
      }
    },
    {
      id: 2,
      title: "",
      metadata: {
        createdAt: "2023-10-01T12:00:00Z"
      },
      author: {
        name: "Jane Doe",
        title: "Mum of 17",
        image: "https://example.com/john_doe.jpg"
      },
      type: "milestone",
      post: "And Just Like That First Steps ",
      image: "https://example.com/image1.jpg",
      stats: {
        likes: 1,
        shares: 0,
        comments: 10
      },
      privacy: {
        visibility: "group",
        sharedWith: [
          { type: "group", name: "Family", id: "family_1" },
          { type: "group", name: "Close Friends", id: "friends_1" }
        ]
      }
    },
    {
      id: 3,
      name: "Jane Smith",
      type: "link",
      image: "https://example.com/image2.jpg",
      title: "Data Scientist",
      metadata: {
        createdAt: "2023-10-01T12:00:00Z"
      },
      description: "A data scientist with a knack for turning data into actionable insights.",
      author: {
        name: "Jane Doe",
        title: "Mum of 17",
        image: "https://example.com/john_doe.jpg"
      },
      stats: {
        likes: 0,
        shares: 0,
        comments: 0
      },
      privacy: {
        visibility: "private",
        sharedWith: [
          { type: "individual", name: "Sarah Johnson", id: "user_1" },
          { type: "individual", name: "Mike Davis", id: "user_2" },
          { type: "individual", name: "Emma Wilson", id: "user_3" },
          { type: "individual", name: "Tom Anderson", id: "user_4" }
        ]
      }
    },
    {
      id: 4,
      name: "Alice Johnson",
      type: "link",
      image: "https://example.com/image3.jpg",
      title: "Product Manager",
      description: "An experienced product manager with a focus on user-centered design.",
      author: {
        name: "Jane Doe",
        title: "Mum of 17",
        image: "https://example.com/john_doe.jpg"
      },
      metadata: {
        createdAt: "2023-10-01T12:00:00Z"
      },
      privacy: {
        visibility: "group",
        sharedWith: [
          { type: "group", name: "Work Team", id: "work_1" }
        ]
      }
    },
    {
      id: 5,
      title: "Breastfeeding Journey Tracker",
      metadata: {
        createdAt: "2023-10-02T08:30:00Z"
      },
      author: {
        name: "Sarah Martinez",
        title: "New Mom",
        image: "https://example.com/sarah_martinez.jpg"
      },
      type: FeedItemType.BREASTFEEDING_TOOL,
      post: "Tracking my breastfeeding journey with detailed metrics. 🤱 It's been amazing to see the progress over time and understand the patterns. This data helps me stay motivated and shows how far we've come together! #BreastfeedingJourney #MomLife #DataDriven",
      image: "https://example.com/breastfeeding_chart.jpg",
      stats: {
        likes: 65,
        shares: 8,
        comments: 23
      },
      privacy: {
        visibility: "group",
        sharedWith: [
          { type: "group", name: "Mom Support Group", id: "moms_1" },
          { type: "group", name: "Family", id: "family_2" },
          { type: "group", name: "New Parents Circle", id: "parents_1" }
        ]
      },
      breastfeedingData: [
        {
          date: '12/5',
          feedingTime: 25,
          happiness: 8,
          soreness: 3,
          fullDate: '2024-12-05',
        },
        {
          date: '12/6',
          feedingTime: 30,
          happiness: 7,
          soreness: 4,
          fullDate: '2024-12-06',
        },
        {
          date: '12/7',
          feedingTime: 22,
          happiness: 9,
          soreness: 2,
          fullDate: '2024-12-07',
        },
        {
          date: '12/8',
          feedingTime: 28,
          happiness: 6,
          soreness: 5,
          fullDate: '2024-12-08',
        },
        {
          date: '12/9',
          feedingTime: 35,
          happiness: 8,
          soreness: 3,
          fullDate: '2024-12-09',
        },
        {
          date: '12/10',
          feedingTime: 20,
          happiness: 9,
          soreness: 2,
          fullDate: '2024-12-10',
        },
        {
          date: '12/11',
          feedingTime: 32,
          happiness: 7,
          soreness: 4,
          fullDate: '2024-12-11',
        },
        {
          date: '12/12',
          feedingTime: 26,
          happiness: 8,
          soreness: 3,
          fullDate: '2024-12-12',
        },
      ],
      breastfeedingSummary: {
        avgDuration: 27,
        avgHappiness: 7.8,
        avgSoreness: 3.3,
        totalSessions: 8,
      }
    },
    {
      id: 6,
      title: "Excellence in Education at Kambala",
      metadata: {
        createdAt: "2023-10-03T10:00:00Z"
      },
      author: {
        name: "Kambala School",
        title: "Independent Anglican School",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&h=150&fit=crop&crop=center"
      },
      type: FeedItemType.SPONSORED,
      post: "Discover where tradition meets innovation. At Kambala, we empower young women to become confident, creative, and compassionate leaders. Our holistic approach to education nurtures academic excellence, creativity, and character development in a supportive community environment.",
      description: "Join our community of inspiring educators and remarkable students. Excellence is not just our standard – it's our passion.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&crop=center",
      stats: {
        likes: 42,
        shares: 15,
        comments: 8
      },
      privacy: {
        visibility: "public",
        sharedWith: []
      },
      sponsoredData: {
        advertiserName: "Kambala School",
        advertiserLogo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=32&h=32&fit=crop&crop=center",
        ctaText: "Learn More",
        ctaUrl: "https://kambala.nsw.edu.au/",
        sponsorshipType: "sponsored"
      }
    }
  ]
};

export const fetchFeedItems = async (params: FeedParams = {}): Promise<FeedResponse> => {
  const { limit = 10, cursor } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Convert cursor to numeric offset for pagination simulation
  const offset = cursor ? parseInt(cursor, 10) : 0;
  
  // Transform mock data to match FeedItemTypeMap interface
  const transformedItems: FeedItemTypeMap[] = mockData.results.map((item: any) => ({
    id: item.id.toString(),
    type: item.type,
    title: item.title || item.name || '',
    description: item.description || '',
    post: item.post || '',
    imageUrl: item.image || '',
    url: item.url || '',
    author: {
      name: item.author?.name || 'Unknown',
      handle: item.author?.title?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
      avatar: item.author?.image || 'https://via.placeholder.com/48',
      verified: false,
    },
    metadata: {
      createdAt: item.metadata?.createdAt || new Date().toISOString(),
      source: 'api',
    },
    stats: {
      comments: item.stats?.comments || 0,
      reposts: 0,
      shares: item.stats?.shares || 0,
      likes: item.stats?.likes || 0,
    },
    privacy: item.privacy || {
      visibility: VisibilityLevel.PUBLIC,
      sharedWith: [],
    },
    // Preserve breastfeeding-specific data
    breastfeedingData: item.breastfeedingData,
    breastfeedingSummary: item.breastfeedingSummary,
    // Preserve sponsored-specific data
    sponsoredData: item.sponsoredData,
  }));
  
  // Simulate pagination
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

export const fetchMoreFeedItems = async (cursor: string, limit = 10): Promise<FeedResponse> => {
  return fetchFeedItems({ cursor, limit });
};