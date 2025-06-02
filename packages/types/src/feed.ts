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
  QUESTION = 'question'
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
  }
}

export { FeedItemType };
export type { FeedItemTypeMap };

