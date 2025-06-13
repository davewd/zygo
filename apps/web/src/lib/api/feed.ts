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
  POST = 'post'
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
  }
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