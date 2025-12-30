import styles from "./VideoView.module.css";

export type VideoDetailHeaderProps = {
  title: string;
  source: string;
  publishedAt: string;
  isSideOpen: boolean;
  isBookmarked: boolean;
  onToggleSide: () => void;
  onToggleBookmark: () => void;
  onClose: () => void;
};

const VideoDetailHeader = ({
  title,
  source,
  publishedAt,
  isSideOpen,
  isBookmarked,
  onToggleSide,
  onToggleBookmark,
  onClose,
}: VideoDetailHeaderProps) => {
  return (
    <>
      <button
        className={styles.closePanelButton}
        onClick={onClose}
        title={"Close panel"}
        aria-label={"Close panel"}
      >
        <span>x</span>
      </button>

      <div className={styles.panelHeader}>
        <div className={styles.titleGroup}>
          <button
            className={styles.toggleButton}
            onClick={onToggleSide}
            title={isSideOpen ? "Expand panel" : "Collapse panel"}
            aria-label={isSideOpen ? "Expand panel" : "Collapse panel"}
          >
            <span>{isSideOpen ? "❯" : "❮"}</span>
          </button>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <button onClick={onToggleBookmark}>
          {isBookmarked ? "Saved" : "Save"}
        </button>
      </div>

      <p className={styles.meta}>
        {source} - {publishedAt}
      </p>
    </>
  );
};

export default VideoDetailHeader;
