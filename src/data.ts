export const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL;

export const value_converter = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    if (isNaN(numValue)) return "0";

    if (numValue >= 1000000) {
        return Math.floor(numValue / 1000000) + "M";
    }
    else if (numValue >= 1000) {
        return Math.floor(numValue / 1000) + "K";
    }
    else {
        return numValue;
    }
}

export interface Snippet {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
    };
    categoryId: string;
}

export interface Statistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
    subscriberCount?: string; // For channels
}

export interface VideoItem {
    kind: string;
    id: string | { videoId: string }; // Search results might have id as object
    snippet: Snippet;
    statistics: Statistics;
}

// Specific types for PlayVideo if needed, or we can reuse VideoItem
export interface VideoApiResponse {
    id: string;
    snippet: Snippet;
    statistics: Statistics;
}

export interface ChannelApiResponse {
    id: string;
    snippet: Snippet;
    statistics: Statistics;
}

export interface CommentSnippet {
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    likeCount: number;
}

export interface CommentItem {
    id: string;
    snippet: {
        topLevelComment: {
            snippet: CommentSnippet;
        };
        totalReplyCount: number;
        isPublic: boolean;
    };
}