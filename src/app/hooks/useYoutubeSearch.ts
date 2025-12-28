"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
    YoutubeSearchResult,
    YoutubeApiSearchResponse,
    YoutubeApiThumbnail,
} from "@/app/types";

export function useYoutubeSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const youtubeVideoSearchQuery = useQuery<{ items: YoutubeSearchResult[] }>({
        queryKey: ["search", normalizedQuery],
        queryFn: async () => {
            if (!normalizedQuery) return { items: [] };

            const res = await fetch(
                `/api/video?q=${encodeURIComponent(normalizedQuery)}`,
            );
            const data = (await res.json()) as YoutubeApiSearchResponse;

            const normalizedItems: YoutubeSearchResult[] = (data.items ?? []).map(
                (item) => {
                    const thumbnails: YoutubeApiThumbnail[] = [];

                    const defaultThumb = item.snippet?.thumbnails?.default;
                    if (defaultThumb) thumbnails.push(defaultThumb);

                    const mediumThumb = item.snippet?.thumbnails?.medium;
                    if (mediumThumb) thumbnails.push(mediumThumb);

                    const id =
                        typeof item.id === "string" ? item.id : item.id?.videoId ?? "";

                    return {
                        id,
                        type: "video",
                        title: item.snippet?.title?.trim() ?? "",
                        description: item.snippet?.description?.trim() ?? "",
                        source: item.snippet?.channelTitle?.trim() ?? "YouTube",
                        url: `https://www.youtube.com/watch?v=${id}`,
                        publishedAt: item.snippet?.publishedAt ?? "",
                        thumbnails,
                    };
                },
            );

            return { items: normalizedItems };
        },
        enabled: normalizedQuery.length > 0,
    });

    const onYoutubeSearch = (q: string) => setSearchQuery(q);

    return {
        youtubeSearchResults: youtubeVideoSearchQuery.data?.items ?? [],
        isLoading: youtubeVideoSearchQuery.isLoading,
        error: youtubeVideoSearchQuery.error,
        onYoutubeSearch,
    };
}
