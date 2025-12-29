"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
    VideoSearchResult,
    VideoApiSearchResponse,
    VideoApiThumbnail,
} from "@/features/video/types";

export function useVideoSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const videoSearchQuery = useQuery<{ items: VideoSearchResult[] }>({
        queryKey: ["search", normalizedQuery],
        queryFn: async () => {
            if (!normalizedQuery) return { items: [] };

            const res = await fetch(
                `/api/video?q=${encodeURIComponent(normalizedQuery)}`,
            );
            const data = (await res.json()) as VideoApiSearchResponse;

            const normalizedItems: VideoSearchResult[] = (data.items ?? []).map(
                (item) => {
                    const snippet = item.snippet;

                    const thumbnails: VideoApiThumbnail[] = [
                        snippet?.thumbnails?.default,
                        snippet?.thumbnails?.medium,
                    ].filter((t): t is VideoApiThumbnail => !!t);

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

    const onVideoSearch = (q: string) => setSearchQuery(q);

    return {
        videoSearchResults: videoSearchQuery.data?.items ?? [],
        isLoading: videoSearchQuery.isLoading,
        error: videoSearchQuery.error,
        onVideoSearch,
    };
}
