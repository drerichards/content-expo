"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { VideoSearchResult } from "@/types";
import { searchVideos } from "../api/videoService";

export const useVideoSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const videoSearchQuery = useQuery<VideoSearchResult[]>({
        queryKey: ["search", normalizedQuery],
        queryFn: () => searchVideos(searchQuery),
        enabled: normalizedQuery.length > 0,
    });

    const handleVideoSearch = (q: string) => setSearchQuery(q);

    return {
        videoSearchResults: videoSearchQuery.data ?? [],
        isLoading: videoSearchQuery.isLoading,
        error: videoSearchQuery.error,
        onVideoSearch: handleVideoSearch,
    };
};
