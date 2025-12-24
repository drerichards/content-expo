export type ContentItem = {
    id: string;
    type: "video" | "article";
    title: string;
    description: string;
    source: string;
    url: string;
    publishedAt: string;
};

export const mockItems: ContentItem[] = [
    {
        id: "1",
        type: "video",
        title: "Understanding React Hooks",
        description: "Overview of useState, useEffect, and patterns",
        source: "ReactConf",
        url: "https://www.youtube.com/watch?v=xxxxxx",
        publishedAt: "2024-05-10",
    },
    {
        id: "2",
        type: "article",
        title: "JavaScript Promises Explained",
        description: "A practical guide to JS Promises and async",
        source: "JSGuide.com",
        url: "https://jsguide.com/promises",
        publishedAt: "2023-11-22",
    },
];