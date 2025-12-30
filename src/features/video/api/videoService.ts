import { VideoSearchResult, VideoApiSearchResponse } from "@/types";
import { mapVideoApiItemsToSearchResults } from "../mappers";

export const searchVideos = async (
    query: string,
): Promise<VideoSearchResult[]> => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    const response = await fetch(
        `/api/video?q=${encodeURIComponent(normalizedQuery)}`,
    );

    if (!response.ok) {
        throw new Error("Failed to search videos");
    }

    const data = (await response.json()) as VideoApiSearchResponse;

    return mapVideoApiItemsToSearchResults(data.items);
};
