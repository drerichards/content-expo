"use client";

import { useCallback, useMemo, useState } from "react";
import { ContentItem } from "@/types";
import { useVideoSearch } from "@/features/video/hooks/useVideoSearch";
import { useContentData } from "./useContentData";
import {
  CONTEXT_OPTIONS,
  LEVEL_OPTIONS,
} from "@/interface/navigation/AppTopNavigation/SearchFilters/searchFilterOptions";

export const useSearchPage = () => {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState(CONTEXT_OPTIONS[0]);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);

  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | undefined>(
    undefined,
  );
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  const { videoSearchResults, onVideoSearch, isLoading, isError } =
    useVideoSearch();
  const { articles, upNextItems } = useContentData();

  const handleSearchSubmit = useCallback(
    (value: string) => {
      onVideoSearch(value);
      setHasSearched(true);
      setSelectedItem(undefined);
      setIsSideOpen(false); // Hide results panel while searching
      setIsPanelExpanded(true); // Ensure expanded when results come back
    },
    [onVideoSearch],
  );

  const handleSelectItem = useCallback((item: ContentItem) => {
    setSelectedItem(item);
    setIsSideOpen(true);
    setIsPanelExpanded(false); // Auto-collapse results panel for full screen content
  }, []);

  const emptyMessage = useMemo(() => {
    if (!hasSearched) return "Search to begin.";
    if (isLoading) return "Searching…";
    if (isError) return "Search failed. Please try again.";
    if (videoSearchResults.length === 0) return "No results found.";
    return null;
  }, [hasSearched, isLoading, isError, videoSearchResults.length]);

  const handleCloseContentPanel = useCallback(() => {
    setSelectedItem(undefined);
    setIsSideOpen(false);
    setIsPanelExpanded(true); // Expand results when closing content
  }, []);

  const togglePanelExpand = useCallback(
    () => setIsPanelExpanded((v) => !v),
    [],
  );

  const toggleSide = useCallback(() => setIsSideOpen((v) => !v), []);

  return {
    // Search controls state
    query,
    context,
    level,
    onQueryChange: setQuery,
    onContextChange: setContext,
    onLevelChange: setLevel,
    onSearch: handleSearchSubmit,

    // Search results state
    hasSearched,
    videoSearchResults,
    articles,
    isLoading,
    isError,

    // Selection state
    selectedItem,
    onSelectItem: handleSelectItem,

    // Panel state
    isSideOpen,
    isPanelExpanded,
    toggleSide,
    togglePanelExpand,
    onCloseContentPanel: handleCloseContentPanel,

    // Up next
    upNextItems,

    // Derived state
    emptyMessage,
    hasSelectedItem: !!selectedItem,
  };
};
