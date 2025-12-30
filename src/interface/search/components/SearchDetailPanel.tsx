import MainPanel from "@/shared/ui/containers/MainPanel";
import VideoView from "@/features/video/components/VideoView";

import { ContentItem, Bookmark } from "@/types";

type SearchDetailPanelProps = {
  selectedItem: ContentItem | null;
  isSideOpen: boolean;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (b: Bookmark) => void;
  toggleSide: () => void;
  onCloseMainPanel: () => void;
  toBookmark: (item: ContentItem) => Bookmark;
};

const SearchDetailPanel = ({
  selectedItem,
  isSideOpen,
  isBookmarked,
  toggleBookmark,
  toggleSide,
  onCloseMainPanel,
  toBookmark,
}: SearchDetailPanelProps) => {
  if (!selectedItem) return null;

  return (
    <MainPanel>
      <VideoView
        item={selectedItem}
        embedHeight={isSideOpen ? "80vh" : "65vh"}
        isBookmarked={isBookmarked(selectedItem.id)}
        isSideOpen={isSideOpen}
        toggleSide={toggleSide}
        onMainPanelClose={onCloseMainPanel}
        onToggleBookmark={() => toggleBookmark(toBookmark(selectedItem))}
      />
    </MainPanel>
  );
};

export default SearchDetailPanel;
