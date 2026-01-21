import { ContentItem } from "@/types";
import ContentContainer from "@/shared/ui/containers/ContentContainer";
import VideoDetailHeader from "./VideoDetailHeader";
import VideoDetailBody from "./VideoDetailBody";

type VideoContentProps = {
  item: ContentItem;
  embedHeight: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onMainPanelClose: () => void;
};

const VideoContent = ({
  item,
  embedHeight,
  isBookmarked,
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

export default VideoContent;
