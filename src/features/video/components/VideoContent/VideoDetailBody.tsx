import { useState } from "react";
import styles from "./VideoContent.module.css";

export type VideoDetailBodyProps = {
  isVideo: boolean;
  mediaUrl: string;
  embedHeight: string;
  description: string;
  source: string;
  title?: string;
};

export const VideoDetailBody = ({
  isVideo,
  mediaUrl,
  description,
  source,
  title,
}: VideoDetailBodyProps) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const summaryCta = isVideo ? "Watch on YouTube" : "Read full article";
  const summaryTitle = "Summary";

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={styles.mediaWrapper}>
      <div className={styles.videoContainer}>
        {isVideo && !isPlaying ? (
          <>
            {/* Play Button Overlay */}
            <button
              className={styles.playButton}
              onClick={handlePlay}
              aria-label="Play video"
            >
              <svg
                className={styles.playIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>

            {/* Title Overlay */}
            {title && <div className={styles.videoTitle}>{title}</div>}

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: "0%" }} />
            </div>
          </>
        ) : isVideo ? (
          <iframe
            className={styles.mediaEmbed}
            src={`https://www.youtube.com/embed/${new URL(mediaUrl).searchParams.get("v")}?autoplay=1`}
            title="Video"
            allow="autoplay"
            allowFullScreen
          />
        ) : (
          <iframe
            src={mediaUrl}
            className={styles.mediaEmbed}
            onError={(e) => {
              (e.currentTarget as HTMLIFrameElement).style.display = "none";
            }}
          />
        )}
      </div>

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
          <p className={styles.description}>{description}</p>

          <div className={styles.callout}>
            <span>Source:</span> {source}
          </div>

          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {summaryCta}
          </a>
        </div>
      )}
    </div>
  );
};

