import { useState } from "react";
import { ContentItem, VideoSearchResult, Bookmark } from "@/features/video/types";
import { useVideoSearch } from "@/features/video/hooks/useVideoSearch";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { mockItems } from "@/data/mockData";
import { fromBookmark } from "../utils";

export function useSearchPage() {
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
    const [isSideOpen, setIsSideOpen] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const { videoSearchResults, onVideoSearch } = useVideoSearch();
    const { bookmarks, isBookmarked, toggleBookmark, refreshBookmarks } =
        useBookmarks();

    const videos: VideoSearchResult[] = videoSearchResults;
    const articles: ContentItem[] = mockItems.filter(
        (item): item is ContentItem => item.type === "article"
    );

    function onSearch(query: string) {
        onVideoSearch(query);
        setSelectedItem(null);
        setShowBookmarks(false);
        setHasSearched(true);
    }

    function onSelectItem(item: ContentItem | Bookmark) {
        if ("savedAt" in item) {
            setSelectedItem(fromBookmark(item));
        } else {
            setSelectedItem(item);
        }
    }

    function onToggleSide() {
        setIsSideOpen((prev) => !prev);
    }

    function onOpenBookmarks() {
        refreshBookmarks();
        setIsSideOpen(false);
        setShowBookmarks(true);
    }

    function onCloseBookmarks() {
        setShowBookmarks(false);
    }

    function onCloseMainPanel() {
        setSelectedItem(null);
        setIsSideOpen(false);
    }

    return {
        selectedItem,
        isSideOpen,
        showBookmarks,
        hasSearched,
        videoSearchResults,
        videos,
        articles,
        bookmarks,
        isBookmarked,
        toggleBookmark,
        onSearch,
        onSelectItem,
        onToggleSide,
        onOpenBookmarks,
        onCloseBookmarks,
        onCloseMainPanel,
    };
}