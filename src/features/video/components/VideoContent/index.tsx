import { ContentItem } from "@/types";
import { ContentContainer } from "@/shared/ui/containers/ContentContainer";
import { VideoDetailHeader } from "./VideoDetailHeader";
import { VideoDetailBody } from "./VideoDetailBody";

type VideoContentProps = {
  item: ContentItem;
  embedHeight: string;
  isBookmarked: boolean;
  isPanelExpanded: boolean;
  onToggleExpand: () => void;
  onToggleBookmark: () => void;
  onMainPanelClose: () => void;
};

export const VideoContent = ({
  item,
  embedHeight,
  isBookmarked,
  isPanelExpanded,
  onToggleExpand,
  onToggleBookmark,
  onMainPanelClose,
}: VideoContentProps) => {
  const isVideo = item.type === "video";

  return (
    <ContentContainer>
      <VideoDetailHeader
        title={item.title}
        source={item.source}
        publishedAt={item.publishedAt}
        isBookmarked={isBookmarked}
        isPanelExpanded={isPanelExpanded}
        onToggleExpand={onToggleExpand}
        onToggleBookmark={onToggleBookmark}
        onClose={onMainPanelClose}
      />

      <VideoDetailBody
        isVideo={isVideo}
        mediaUrl={item.url}
        embedHeight={embedHeight}
        description={item.description}
        source={item.source}
      />
    </ContentContainer>
  );
};

