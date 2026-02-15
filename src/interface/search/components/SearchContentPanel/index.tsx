import { useCallback } from "react";
import { List, ListItem } from "@/shared/ui/block";
import { LayoutPanel } from "@/shared/ui/layout";
import { SearchDetailPanelProps } from "@/types";
import { VideoContent } from "@/features/video/components/VideoContent";
import { mapContentItemToBookmark } from "@/interface/search/mappers";
import { useBookmarkContext } from "@/features/bookmark/context/BookmarkContext";
import { ErrorBoundary } from "@/shared/ui/components/ErrorBoundary";
import { useErrors } from "@/shared/context/ErrorContext";
import { useSearchPanel } from "@/interface/search/context/SearchPanelContext";

export const SearchContentPanel = ({
  selectedItem,
  upNextItems,
  onSelectUpNextItem,
  onCloseContentPanel,
}: SearchDetailPanelProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarkContext();
  const { addError } = useErrors();
  const { isPanelExpanded, togglePanelExpand } = useSearchPanel();

  const handleToggleBookmark = useCallback(() => {
    if (selectedItem) {
      toggleBookmark(mapContentItemToBookmark(selectedItem));
    }
  }, [selectedItem, toggleBookmark]);

  if (!selectedItem) return null;

  return (
    <LayoutPanel>
      <ErrorBoundary
        onReset={onCloseContentPanel}
        onError={(error) => addError(error.message, "render", "VideoContent")}
      >
        <VideoContent
          item={selectedItem}
          embedHeight="500px"
          isBookmarked={isBookmarked(selectedItem.id)}
          isPanelExpanded={isPanelExpanded}
          onToggleExpand={togglePanelExpand}
          onToggleBookmark={handleToggleBookmark}
          onMainPanelClose={onCloseContentPanel}
        />
      </ErrorBoundary>

      {upNextItems && upNextItems.length > 0 && (
        <List>
          {upNextItems.map((item) => (
            <ListItem key={item.id} onClick={() => onSelectUpNextItem(item)}>
              {item.title}
            </ListItem>
          ))}
        </List>
      )}
    </LayoutPanel>
  );
};
