import { useState } from "react";
import styles from "./VideoView.module.css";

export type VideoDetailBodyProps = {
  isVideo: boolean;
  mediaUrl: string;
  embedHeight: string;
  description: string;
  source: string;
};

const VideoDetailBody = ({
  isVideo,
  mediaUrl,
  embedHeight,
  description,
  source,
}: VideoDetailBodyProps) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const summaryCta = isVideo ? "Watch on YouTube" : "Read full article";
  const summaryTitle = "Summary";

  return (
    <div className={styles.mediaWrapper}>
      {isVideo ? (
        <iframe
          width="100%"
          height={embedHeight}
          className={styles.mediaEmbed}
          src={`https://www.youtube.com/embed/${new URL(mediaUrl).searchParams.get("v")}`}
          title="Video"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          src={mediaUrl}
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

export default VideoDetailBody;
