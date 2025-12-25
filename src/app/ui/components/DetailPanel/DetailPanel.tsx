import { useState } from "react";
import { ContentItem } from "@/app/types";
import styles from "./DetailPanel.module.css";

type DetailPanelProps = {
  item: ContentItem;
  embedHeight: string;
  isBookmarked: boolean;
  isSideCollapsed: boolean;
  toggleSide: () => void;
  onToggleBookmark: () => void;
};

export default function DetailPanel({
  item,
  embedHeight,
  isBookmarked,
  isSideCollapsed,
  toggleSide,
  onToggleBookmark,
}: DetailPanelProps) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  return (
    <main className={styles.detailPanel}>
      <div className={styles.panelHeader}>
        <div className={styles.titleGroup}>
          <button
            className={styles.toggleButton}
            onClick={toggleSide}
            title={
              isSideCollapsed
                ? "Expand results panel"
                : "Collapse results panel"
            }
            aria-label={
              isSideCollapsed
                ? "Expand results panel"
                : "Collapse results panel"
            }
          >
            <span>{isSideCollapsed ? "❯" : "❮"}</span>
          </button>
          <h2 className={styles.title}>{item.title}</h2>
        </div>
        <button onClick={onToggleBookmark}>
          {isBookmarked ? "Saved" : "Save"}
        </button>
      </div>
      <p className={styles.meta}>
        {item.source} — {item.publishedAt}
      </p>

      {item.type === "video" && (
        <div className={styles.mediaWrapper}>
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

          <button
            type="button"
            className={styles.summaryTab}
            onClick={() => setIsSummaryOpen((open) => !open)}
          >
            <span>{isSummaryOpen ? "⌄" : "⌃"}</span>
          </button>

          {isSummaryOpen && (
            <div className={styles.articleSummary}>
              <h3>Summary</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.callout}>
                <span>Source:</span> {item.source}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      )}

      {item.type === "article" && (
        <div className={styles.mediaWrapper}>
          <iframe
            src={item.url}
            className={styles.mediaEmbed}
            onError={(e) => {
              (e.currentTarget as HTMLIFrameElement).style.display = "none";
            }}
          />

          <button
            type="button"
            className={styles.summaryTab}
            onClick={() => setIsSummaryOpen((open) => !open)}
          >
            <span>{isSummaryOpen ? "⌄" : "⌃"}</span>
          </button>

          {isSummaryOpen && (
            <div className={styles.articleSummary}>
              <h3>Summary</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.callout}>
                <span>Source:</span> {item.source}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Read full article
              </a>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
