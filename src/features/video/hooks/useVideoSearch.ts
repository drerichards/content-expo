"use client";

import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { VideoSearchResult } from "../types";
import { searchVideos } from "../api/videoService";
import { useErrors } from "@/shared/context/ErrorContext";

export const useVideoSearch = () => {
  const [lastSearched, setLastSearched] = useState("");
  const { addError } = useErrors();

  const normalizedQuery = lastSearched.trim().toLowerCase();

  const videoSearchQuery = useQuery<VideoSearchResult[]>({
    queryKey: ["search", normalizedQuery],
    queryFn: () => searchVideos(lastSearched),
    enabled: normalizedQuery.length > 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (videoSearchQuery.error) {
      addError(
        videoSearchQuery.error.message || "Video search failed",
        "api",
        "videoSearch",
      );
    }
  }, [videoSearchQuery.error, addError]);

  const handleVideoSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    setLastSearched(q);
  }, []);

  return {
    videoSearchResults: videoSearchQuery.data ?? [],
    isLoading: videoSearchQuery.isLoading,
    isError: videoSearchQuery.isError,
    error: videoSearchQuery.error,
    onVideoSearch: handleVideoSearch,
  };
};
