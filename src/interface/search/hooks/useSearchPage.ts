import { useState } from "react";
import { ContentItem, VideoSearchResult, Bookmark } from "@/types";
import { useVideoSearch } from "@/features/video/hooks/useVideoSearch";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { mockItems } from "@/data/mockData";
import { mapBookmarkToContentItem } from "../mappers";

export const useSearchPage = () => {
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

    const handleSearchSubmit = (query: string) => {
        onVideoSearch(query);
        setSelectedItem(null);
        setShowBookmarks(false);
        setHasSearched(true);
    };

    const handleResultItemSelect = (item: ContentItem | Bookmark) => {
        if ("savedAt" in item) {
            setSelectedItem(mapBookmarkToContentItem(item));
        } else {
            setSelectedItem(item);
        }
    };

    const handleDetailSidePanelToggle = () => {
        setIsSideOpen((prev) => !prev);
    };

    const handleBookmarksOpen = () => {
        refreshBookmarks();
        setIsSideOpen(false);
        setShowBookmarks(true);
    };

    const handleBookmarksClose = () => {
        setShowBookmarks(false);
    };

    const handleDetailPanelClose = () => {
        setSelectedItem(null);
        setIsSideOpen(false);
    };

    return {
        layoutProps: {
            hasSelectedItem: !!selectedItem,
        },
        headerProps: {
            onSearch: handleSearchSubmit,
            onOpenBookmarks: handleBookmarksOpen,
        },
        resultsPanelProps: {
            hasSearched,
            showBookmarks,
            isSideOpen,
            selectedItem,
            videoSearchResults,
            videos,
            articles,
            bookmarks,
            isBookmarked,
            toggleBookmark,
            onSelectItem: handleResultItemSelect,
            onCloseBookmarks: handleBookmarksClose,
        },
        detailPanelProps: {
            selectedItem,
            isSideOpen,
            isBookmarked,
            toggleBookmark,
            toggleSide: handleDetailSidePanelToggle,
            onCloseMainPanel: handleDetailPanelClose,
        },
    };
};