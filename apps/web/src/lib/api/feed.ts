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
  // Milestone specific data
  milestoneId?: string; // ID of the related milestone from the milestones CSV
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
      id: 11,
      title: "Eating for Healthy Kidneys",
      metadata: {
        createdAt: "2024-12-19T14:30:00Z",
        source: "web",
        sourceUrl: "https://kidneynutrition.com.au/f/eating-for-healthy-kidneys"
      },
      author: {
        name: "Jessica Stevenson",
        handle: "jessica_stevenson",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      type: FeedItemType.POST,
      post: `<div>
        <p>🥗 <strong>Eating for Healthy Kidneys</strong> 🥗</p>
        
        <p>Your kidneys are vital organs that help detoxify your body, control blood pressure, make red blood cells, keep bones healthy, and maintain chemical balance. A healthy diet is <em>really important</em> to keep your kidneys healthy!</p>
        
        <h3>Key principles for kidney-healthy eating:</h3>
        <ul>
          <li>🧂 <strong>Watch your sodium</strong> - aim for less than 2,300mg per day</li>
          <li>🥤 <strong>Stay hydrated</strong> - drink plenty of water throughout the day</li>
          <li>🫘 <strong>Choose quality protein</strong> - lean meats, fish, eggs, and plant proteins</li>
          <li>🍎 <strong>Eat plenty of fruits and vegetables</strong> - they're rich in antioxidants</li>
          <li>🌾 <strong>Opt for whole grains</strong> - better for blood sugar control</li>
          <li>❤️ <strong>Heart-healthy = kidney-healthy</strong> - what's good for your heart helps your kidneys too!</li>
        </ul>
        
        <p>Remember: <strong>prevention is always better than treatment</strong>. Small dietary changes today can make a huge difference for your kidney health in the long run.</p>
        
        <p>💡 <em>If you have kidney disease or are at risk, always consult with a qualified renal dietitian for personalized advice.</em></p>
        
        <p>#KidneyHealth #HealthyEating #NutritionTips #PreventiveCare</p>
      </div>`,
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        likes: 24,
        shares: 8,
        comments: 12,
        reposts: 3
      },
      privacy: {
        visibility: VisibilityLevel.PUBLIC,
        sharedWith: []
      }
    },
    {
      id: 10,
      title: "Child's Assembly Award Ceremony",
      metadata: {
        createdAt: "2024-12-15T09:00:00Z"
      },
      author: {
        name: "Family Calendar",
        handle: "family_events",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=center"
      },
      type: FeedItemType.EVENT,
      post: "Attend Child's assembly to watch @Lily get an award",
      stats: {
        likes: 0,
        shares: 0,
        comments: 0,
        reposts: 0
      },
      privacy: {
        visibility: VisibilityLevel.PRIVATE,
        sharedWith: []
      },
      eventData: {
        date: "2024-12-20",
        time: "10:00 AM",
        location: "Main Assembly Hall",
        attendees: 1,
        schoolLogo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=64&h=64&fit=crop&crop=center",
        schoolName: "Bronte Public School"
      }
    },
    {
      id: 9,
      title: "Feeding Reminder",
      metadata: {
        createdAt: "2024-12-15T15:45:00Z"
      },
      author: {
        name: "Zygo",
        handle: "zygo_app",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=center"
      },
      type: FeedItemType.BREASTFEEDING_REMINDER,
      post: "It's been about 3 hours since your last feeding session. Your little one might be getting ready for another feed soon!",
      stats: {
        likes: 12,
        shares: 1,
        comments: 3
      },
      privacy: {
        visibility: "private",
        sharedWith: []
      }
    },
    {
      id: 12,
      title: "Library Books Due Soon",
      metadata: {
        createdAt: "2024-12-16T09:30:00Z"
      },
      author: {
        name: "Zygo",
        handle: "zygo_app",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=center"
      },
      type: FeedItemType.LIBRARY_BOOK_REMINDER,
      post: "You have 2 library books due in 3 days: 'The Very Hungry Caterpillar' and 'Where the Wild Things Are'. Remember to return them on time!",
      stats: {
        likes: 0,
        shares: 0,
        comments: 0
      },
      privacy: {
        visibility: "private",
        sharedWith: []
      }
    },
    {
      id: 1,
      post: "Here's an example of something i care about !",
      author: {
        name: "Mike Johnson",
        handle: "mike_dad",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
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
        name: "Sarah Johnson",
        handle: "sarah_mama",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b147?w=150&h=150&fit=crop&crop=face"
      },
      type: "milestone",
      post: "And Just Like That First Steps ",
      image: "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800&h=600&fit=crop&crop=center",
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
      },
      milestoneId: "early_childhood_24_30_physical_1" // Link to "First steps" milestone
    },
    {
      id: 3,
      name: "Jessica Davis",
      type: "link",
      image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&h=600&fit=crop&crop=center",
      title: "Data Scientist",
      metadata: {
        createdAt: "2023-10-01T12:00:00Z"
      },
      description: "A data scientist with a knack for turning data into actionable insights.",
      author: {
        name: "Jessica Davis",
        handle: "jessica_mama2",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
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
      name: "Mary Wilson",
      type: "link",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
      title: "Product Manager",
      description: "An experienced product manager with a focus on user-centered design.",
      author: {
        name: "Mary Wilson",
        handle: "mary_nana",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
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
    },
    {
      id: 7,
      title: "Today's Feeding Sessions",
      metadata: {
        createdAt: "2024-12-14T14:30:00Z"
      },
      author: {
        name: "Emma Wilson",
        handle: "emma_mom2",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      type: FeedItemType.BREASTFEEDING_DAILY_SUMMARY,
      post: "Tracking my feeding sessions today from 7am to 7am. Some longer sessions this morning but overall feeling good about our routine! 🤱",
      stats: {
        likes: 28,
        shares: 3,
        comments: 12
      },
      privacy: {
        visibility: "group",
        sharedWith: [
          { type: "group", name: "New Moms Support", id: "newmoms_1" }
        ]
      },
      breastfeedingDailyData: [
        { time: "7:30 AM", duration: 25, happiness: 8, soreness: 3, notes: "Good morning feed" },
        { time: "10:15 AM", duration: 30, happiness: 7, soreness: 4, notes: "Cluster feeding started" },
        { time: "12:45 PM", duration: 20, happiness: 9, soreness: 2, notes: "Quick lunch feed" },
        { time: "3:20 PM", duration: 28, happiness: 8, soreness: 3, notes: "Afternoon session" },
        { time: "6:00 PM", duration: 35, happiness: 6, soreness: 5, notes: "Tired but going well" },
        { time: "8:30 PM", duration: 22, happiness: 9, soreness: 2, notes: "Bedtime routine" },
        { time: "11:45 PM", duration: 18, happiness: 7, soreness: 3, notes: "Late night feed" },
        { time: "2:30 AM", duration: 15, happiness: 8, soreness: 2, notes: "Night feeding" },
        { time: "5:15 AM", duration: 26, happiness: 8, soreness: 3, notes: "Early morning" }
      ]
    },
    {
      id: 8,
      title: "This Week's Feeding Patterns",
      metadata: {
        createdAt: "2024-12-15T09:00:00Z"
      },
      author: {
        name: "Sarah Mitchell",
        handle: "sarah_mom3",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      type: FeedItemType.BREASTFEEDING_WEEKLY_SUMMARY,
      post: "Week 3 summary! Really interesting to see the patterns emerging. Tuesday was definitely our challenging day but we're finding our rhythm. 📊",
      stats: {
        likes: 45,
        shares: 7,
        comments: 18
      },
      privacy: {
        visibility: "group",
        sharedWith: [
          { type: "group", name: "Breastfeeding Support", id: "bf_support_1" },
          { type: "group", name: "Family", id: "family_3" }
        ]
      },
      breastfeedingWeeklySummary: {
        weeklyData: [
          { day: "Mon", avgDuration: 24, feedCount: 8, avgHappiness: 8.2, avgSoreness: 2.8 },
          { day: "Tue", avgDuration: 28, feedCount: 10, avgHappiness: 6.5, avgSoreness: 4.2 },
          { day: "Wed", avgDuration: 22, feedCount: 7, avgHappiness: 8.8, avgSoreness: 2.3 },
          { day: "Thu", avgDuration: 26, feedCount: 9, avgHappiness: 7.9, avgSoreness: 3.1 },
          { day: "Fri", avgDuration: 25, feedCount: 8, avgHappiness: 8.5, avgSoreness: 2.6 },
          { day: "Sat", avgDuration: 23, feedCount: 8, avgHappiness: 9.1, avgSoreness: 2.2 },
          { day: "Sun", avgDuration: 27, feedCount: 9, avgHappiness: 8.3, avgSoreness: 2.9 }
        ],
        totalWeeklyFeeds: 59,
        avgDailyFeeds: 8.4
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
      handle: item.author?.handle || item.author?.title?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
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
    breastfeedingDailyData: item.breastfeedingDailyData,
    breastfeedingSummary: item.breastfeedingSummary,
    breastfeedingWeeklySummary: item.breastfeedingWeeklySummary,
    // Preserve sponsored-specific data
    sponsoredData: item.sponsoredData,
    // Preserve event-specific data
    eventData: item.eventData,
    // Preserve milestone-specific data
    milestoneId: item.milestoneId,
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