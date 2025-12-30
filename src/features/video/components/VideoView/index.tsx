import { ContentItem } from "@/types";
import styles from "./VideoView.module.css";
import VideoDetailHeader from "./VideoDetailHeader";
import VideoDetailBody from "./VideoDetailBody";

type VideoViewProps = {
  item: ContentItem;
  embedHeight: string;
  isBookmarked: boolean;
  isSideOpen: boolean;
  toggleSide: () => void;
  onToggleBookmark: () => void;
  onMainPanelClose: () => void;
};

const VideoView = ({
  item,
  embedHeight,
  isBookmarked,
  isSideOpen,
  toggleSide,
  onToggleBookmark,
  onMainPanelClose,
}: VideoViewProps) => {
  const isVideo = item.type === "video";

  return (
    <main className={styles.detailPanel}>
      <VideoDetailHeader
        title={item.title}
        source={item.source}
        publishedAt={item.publishedAt}
        isSideOpen={isSideOpen}
        isBookmarked={isBookmarked}
        onToggleSide={toggleSide}
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
    </main>
  );
};

export default VideoView;
