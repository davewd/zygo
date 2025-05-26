export type FeedItem = {
  id: number;
  name: string;
  title: string;
  description: string;
  image?: string;
};

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