import { Button, Text, Header } from "@/shared/ui/block";
import { LayoutRow } from "@/shared/ui/layout";
import styles from "./VideoContent.module.css";

export type VideoDetailHeaderProps = {
  title: string;
  source: string;
  publishedAt: string;
  isBookmarked: boolean;
  isPanelExpanded: boolean;
  onToggleExpand: () => void;
  onToggleBookmark: () => void;
  onClose: () => void;
};

export const VideoDetailHeader = ({
  title,
  source,
  publishedAt,
  isBookmarked,
  isPanelExpanded,
  onToggleExpand,
  onToggleBookmark,
  onClose,
}: VideoDetailHeaderProps) => {
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
          onClick={onToggleExpand}
          title={isPanelExpanded ? "Collapse panel" : "Expand panel"}
          aria-label={isPanelExpanded ? "Collapse panel" : "Expand panel"}
        >
          {isPanelExpanded ? "❯" : "❮"}
        </Button>
        <Header className={styles.title}>{title}</Header>

        <Button
          className={styles.saveButton}
          data-saved={isBookmarked}
          onClick={onToggleBookmark}
        >
          {isBookmarked ? "Saved" : "Save"}
        </Button>
      </LayoutRow>

      <Text className={styles.meta}>
        {source} - {publishedAt}
      </Text>
    </>
  );
};

