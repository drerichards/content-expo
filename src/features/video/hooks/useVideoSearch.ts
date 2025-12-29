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
                    const snippet = item.snippet;

                    const thumbnails: YoutubeApiThumbnail[] = [
                        snippet?.thumbnails?.default,
                        snippet?.thumbnails?.medium,
                    ].filter((t): t is YoutubeApiThumbnail => !!t);

                    const id =
                        typeof item.id === "string" ? item.id : item.id?.videoId ?? "";

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
