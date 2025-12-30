import Image from "next/image";
import styles from "./VideoCard.module.css";
import { VideoSearchResult } from "@/types";

type VideoCardProps = {
  video: VideoSearchResult;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
};

const VideoCard = ({
  video: { title, source, publishedAt, thumbnails },
  isBookmarked,
  onToggleBookmark,
  onClick,
}: VideoCardProps) => {
  return (
    <div
      className={styles.row}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.(); // a11y: trigger onClick on Enter key
      }}
    >
      <div className={styles.thumbWrap}>
        {!!thumbnails && (
          <Image
            src={thumbnails[0].url as string}
            alt={title}
            fill
            sizes="112px"
            className={styles.thumb}
            priority={false}
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>
          <span>{source}</span>
          {/* {duration && <span>· {duration}</span>} */}
          {publishedAt && <span>· {publishedAt.slice(0, 4)}</span>}
        </div>
      </div>
      <button
        className={styles.save}
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark();
        }}
      >
        {isBookmarked ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default VideoCard;
