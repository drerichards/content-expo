import SidePanel from "@/shared/ui/containers/SidePanel";
import LeftPanel from "@/shared/ui/elements/LeftPanel";
import FullPanel from "@/shared/ui/elements/FullPanel";
import ResultsList from "@/shared/ui/components/Results";
import BookmarksList from "@/features/bookmark/components/BookmarksList";

import { ContentItem, Bookmark, VideoSearchResult } from "@/types";

type SearchResultsPanelProps = {
  hasSearched: boolean;
  showBookmarks: boolean;
  selectedItem: ContentItem | null;
  videoSearchResults: VideoSearchResult[];
  videos: VideoSearchResult[];
  articles: ContentItem[];
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (b: Bookmark) => void;
  onSelectItem: (item: ContentItem) => void;
  onCloseBookmarks: () => void;
  toBookmark: (item: ContentItem) => Bookmark;
};

const SearchResultsPanel = ({
  hasSearched,
  showBookmarks,
  selectedItem,
  videoSearchResults,
  videos,
  articles,
  bookmarks,
  isBookmarked,
  toggleBookmark,
  onSelectItem,
  onCloseBookmarks,
  toBookmark,
}: SearchResultsPanelProps) => {
  const Panel = selectedItem ? LeftPanel : FullPanel;

  return (
    <SidePanel>
      <Panel>
        {!showBookmarks && (
          <ResultsList
            results={!!videoSearchResults}
            selectedItem={selectedItem}
            setSelectedItem={onSelectItem}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            toBookmark={toBookmark}
            videos={videos}
            articles={articles}
          />
        )}

        {showBookmarks && (
          <BookmarksList
            bookmarks={bookmarks}
            isBookmarked={isBookmarked}
            toggleBookmark={toggleBookmark}
            hasSearched={hasSearched}
            onClose={onCloseBookmarks}
            onSelectBookmark={onSelectItem}
          />
        )}
      </Panel>
    </SidePanel>
  );
};

export default SearchResultsPanel;
