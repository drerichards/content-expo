import { useState } from "react";
import { ContentItem } from "@/app/types";
import styles from "./ContentDisplay.module.css";

type ContentDisplayProps = {
  item: ContentItem;
  embedHeight: string;
  isBookmarked: boolean;
  isSideOpen: boolean;
  toggleSide: () => void;
  onToggleBookmark: () => void;
  onMainPanelClose: () => void;
};

export default function ContentDisplay({
  item,
  embedHeight,
  isBookmarked,
  isSideOpen,
  toggleSide,
  onToggleBookmark,
  onMainPanelClose,
}: ContentDisplayProps) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const isVideo = item.type === "video";
  const mediaHref = item.url;
  const summaryCta = isVideo ? "Watch on YouTube" : "Read full article";
  const summaryTitle = "Summary";

  return (
    <main className={styles.detailPanel}>
      <button
        className={styles.closePanelButton}
        onClick={onMainPanelClose}
        title={"Close panel"}
        aria-label={"Close panel"}
      >
        <span>x</span>
      </button>
      <div className={styles.panelHeader}>
        <div className={styles.titleGroup}>
          <button
            className={styles.toggleButton}
            onClick={toggleSide}
            title={isSideOpen ? "Expand panel" : "Collapse panel"}
            aria-label={isSideOpen ? "Expand panel" : "Collapse panel"}
          >
            <span>{isSideOpen ? "❯" : "❮"}</span>
          </button>
          <h2 className={styles.title}>{item.title}</h2>
        </div>
        <button onClick={onToggleBookmark}>
          {isBookmarked ? "Saved" : "Save"}
        </button>
      </div>
      <p className={styles.meta}>
        {item.source} - {item.publishedAt}
      </p>

      <div className={styles.mediaWrapper}>
        {isVideo ? (
          <iframe
            width="100%"
            height={embedHeight}
            className={styles.mediaEmbed}
            src={`https://www.youtube.com/embed/${new URL(
              item.url,
            ).searchParams.get("v")}`}
            title="Video"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            src={item.url}
            className={styles.mediaEmbed}
            onError={(e) => {
              (e.currentTarget as HTMLIFrameElement).style.display = "none";
            }}
          />
        )}

        <button
          type="button"
          className={styles.summaryTab}
          onClick={() => setIsSummaryOpen((open) => !open)}
        >
          <span>{isSummaryOpen ? "⌄" : "⌃"}</span>
        </button>

        {isSummaryOpen && (
          <div className={styles.summaryWindow}>
            <h3>{summaryTitle}</h3>
            <p className={styles.description}>{item.description}</p>

            <div className={styles.callout}>
              <span>Source:</span> {item.source}
            </div>

            <a
              href={mediaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {summaryCta}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
