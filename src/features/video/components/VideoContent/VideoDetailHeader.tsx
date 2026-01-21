import { Button, Text, Header } from "@/shared/ui/block";
import { LayoutRow } from "@/shared/ui/layout";
import { useSearchPanel } from "@/interface/search/context/SearchPanelContext";
import styles from "./VideoContent.module.css";

export type VideoDetailHeaderProps = {
  title: string;
  source: string;
  publishedAt: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClose: () => void;
};

const VideoDetailHeader = ({
  title,
  source,
  publishedAt,
  isBookmarked,
  onToggleBookmark,
  onClose,
}: VideoDetailHeaderProps) => {
  const { isPanelExpanded, togglePanelExpand } = useSearchPanel();
  return (
    <>
      <Button
        className={styles.closePanelButton}
        onClick={onClose}
        title="Close panel"
        aria-label="Close panel"
      >
        x
      </Button>

      <LayoutRow>
        <Button
          className={styles.toggleButton}
          onClick={togglePanelExpand}
          title={isPanelExpanded ? "Collapse panel" : "Expand panel"}
          aria-label={isPanelExpanded ? "Collapse panel" : "Expand panel"}
        >
          {isPanelExpanded ? "❯" : "❮"}
        </Button>
        <Header className={styles.title}>{title}</Header>

        <Button onClick={onToggleBookmark}>
          {isBookmarked ? "Saved" : "Save"}
        </Button>
      </LayoutRow>

      <Text className={styles.meta}>
        {source} - {publishedAt}
      </Text>
    </>
  );
};

export default VideoDetailHeader;
