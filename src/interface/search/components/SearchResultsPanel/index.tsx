// src/interface/search/components/SearchResultsPanel.tsx

import { ContentItem } from "@/types";
import { VideoSearchResult } from "@/features/video/types";
import { LayoutPanel } from "@/shared/ui/layout";
import ErrorBoundary from "@/shared/ui/components/ErrorBoundary";
import VideoCard from "@/features/video/components/VideoCard";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import styles from "./SearchResultsPanel.module.css";

export type SearchResultsPanelProps = {
  hasSearched: boolean;
  isSideOpen: boolean;
  selectedItem?: ContentItem;

  videoSearchResults?: VideoSearchResult[];
  articles?: ContentItem[];

  onSelectItem: (item: ContentItem) => void;
  isLoading: boolean;
};

export const SearchResultsPanel = ({
  videoSearchResults,
  hasSearched,
  selectedItem,
  isLoading,
  onSelectItem,
}: SearchResultsPanelProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const hasResults = videoSearchResults && videoSearchResults.length > 0;

  return (
    <LayoutPanel className={styles.panel}>
      <ErrorBoundary>
        {isLoading ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⏳</div>
            <div className={styles.emptyTitle}>Searching...</div>
            <div className={styles.emptyText}>
              Finding the best content for you
            </div>
          </div>
        ) : !hasSearched ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <div className={styles.emptyTitle}>Start Learning</div>
            <div className={styles.emptyText}>
              Search for topics to begin your journey
            </div>
          </div>
        ) : !hasResults ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <div className={styles.emptyTitle}>No Results</div>
            <div className={styles.emptyText}>Try a different search term</div>
          </div>
        ) : (
          <div className={styles.resultsListContainer}>
            <div className={styles.resultsList}>
              {videoSearchResults.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isSelected={selectedItem?.id === video.id}
                  isBookmarked={isBookmarked(video.id)}
                  onToggleBookmark={() => toggleBookmark(video)}
                  onClick={() => onSelectItem(video)}
                />
              ))}
            </div>
          </div>
        )}
      </ErrorBoundary>
    </LayoutPanel>
  );
};
