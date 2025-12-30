import { VideoSearchResult, VideoApiItem, VideoApiThumbnail } from "@/types";

const mapVideoApiItemToSearchResult = (item: VideoApiItem): VideoSearchResult => {
    const snippet = item.snippet;

    const thumbnails: VideoApiThumbnail[] = [
        snippet?.thumbnails?.default,
        snippet?.thumbnails?.medium,
    ].filter((t): t is VideoApiThumbnail => !!t);

    const id = typeof item.id === "string" ? item.id : item.id?.videoId ?? "";

    return {
        id,
        type: "video",
        title: snippet?.title ?? "",
        channelId: snippet?.channelId ?? "",
        channelTitle: snippet?.channelTitle ?? "",
        description: snippet?.description ?? "",
        source: snippet?.channelTitle ?? "YouTube",
        url: `https://www.youtube.com/watch?v=${id}`,
        publishedAt: snippet?.publishedAt ?? "",
        thumbnails,
    };
};

export const mapVideoApiItemsToSearchResults = (
    items?: VideoApiItem[],
): VideoSearchResult[] => {
    return (items ?? []).map(mapVideoApiItemToSearchResult);
};
