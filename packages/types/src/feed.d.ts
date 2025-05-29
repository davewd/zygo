export declare enum FeedItemType {
    LINK = "link",
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video"
}
export interface FeedItem {
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
    domain?: string;
    stats: {
        comments: number;
        reposts: number;
        shares: number;
        likes: number;
    };
}
