export type FeedItem = {
    id: number;
    name: string;
    title: string;
    description: string;
    image?: string;
    stats: {
        comments: number;
        shares: number;
        likes: number;
        reposts: number;
    };
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
//# sourceMappingURL=global.d.ts.map