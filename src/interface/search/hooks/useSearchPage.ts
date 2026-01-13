// src/interface/search/hooks/useSearchPage.ts
// FIX: adapt toggleBookmark so its signature matches SearchDetailPanelProps

"use client";

import { useState } from "react";
import { ContentItem, Bookmark } from "@/types";
import { useVideoSearch } from "@/features/video/hooks/useVideoSearch";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { mockItems } from "@/data/mockData";
import { mapContentItemToBookmark } from "../mappers";
import {
  CONTEXT_OPTIONS,
  LEVEL_OPTIONS,
} from "@/interface/navigation/AppTopNavigation/SearchFilters/searchFilterOptions";

export const useSearchPage = () => {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState(CONTEXT_OPTIONS[0]);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);

  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isSideOpen, setIsSideOpen] = useState(false);

  const { videoSearchResults, onVideoSearch, isLoading } = useVideoSearch();
  const { isBookmarked, toggleBookmark: toggleBookmarkRaw } = useBookmarks();

  const articles: ContentItem[] = mockItems.filter(
    (item): item is ContentItem => item.type === "article",
  );

  const upNextItems: ContentItem[] = mockItems.slice(0, 5);

  const handleSearchSubmit = (value: string) => {
    onVideoSearch(value);
    setHasSearched(true);
    setSelectedItem(null);
  };

  const handleSelectItem = (item: ContentItem) => {
    setSelectedItem(item);
  };

  // ✅ ADAPTER — THIS IS THE FIX
  const toggleBookmark = (item: ContentItem | Bookmark) => {
    if ("savedAt" in item) {
      toggleBookmarkRaw(item);
    } else {
      toggleBookmarkRaw(mapContentItemToBookmark(item));
    }
  };

  return {
    layoutProps: {
      hasSelectedItem: !!selectedItem,
    },
    searchControlsProps: {
      query,
      onQueryChange: setQuery,
      context,
      level,
      onContextChange: setContext,
      onLevelChange: setLevel,
      onSearch: handleSearchSubmit,
      onToggleSearchFilters: () => {},
      welcomeText: "Welcome back Jordan — ready to continue learning?",
    },
    resultsPanelProps: {
      hasSearched,
      isSideOpen,
      selectedItem,
      videoSearchResults,
      articles,
      onSelectItem: handleSelectItem,
      isLoading,
    },
    detailPanelProps: {
      selectedItem,
      isSideOpen,
      isBookmarked,
      toggleBookmark, // ✅ NOW MATCHES (ContentItem | Bookmark) => void
      upNextItems,
      onSelectUpNextItem: handleSelectItem,
      toggleSide: () => setIsSideOpen((v) => !v),
      onCloseMainPanel: () => {
        setSelectedItem(null);
        setIsSideOpen(false);
      },
    },
  };
};
