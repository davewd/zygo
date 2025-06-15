enum FeedItemType {
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

enum VisibilityLevel {
  PUBLIC = 'public',
  GROUP = 'group',
  PRIVATE = 'private'
}

interface PrivacySettings {
  visibility: VisibilityLevel;
  sharedWith: Array<{
    type: 'group' | 'individual';
    name: string;
    id: string;
  }>;
}

interface FeedItemTypeMap {
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
  // Sponsored content specific data
  sponsoredData?: {
    advertiserName: string;
    advertiserLogo?: string;
    ctaText: string;
    ctaUrl: string;
    sponsorshipType?: 'promoted' | 'sponsored' | 'ad';
  };
}

export { FeedItemType, VisibilityLevel };
export type { FeedItemTypeMap, PrivacySettings };

