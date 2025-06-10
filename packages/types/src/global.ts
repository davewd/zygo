import { FeedItemType } from './feed';

export type FeedItem = {
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

export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  children: TimelineEvent[];
}

export interface TimelineData {
  results: TimelineEvent[];
}