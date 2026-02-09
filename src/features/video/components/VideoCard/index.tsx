import Image from "next/image";
import styles from "./VideoCard.module.css";
import { VideoSearchResult } from "@/types";

type VideoCardProps = {
  video: VideoSearchResult;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
  isSelected?: boolean;
};

const VideoCard = ({
  video: { title, source, publishedAt, thumbnails, description },
  isBookmarked,
  onToggleBookmark,
  onClick,
  isSelected = false,
}: VideoCardProps) => {
  return (
    <div
      className={styles.row}
      data-selected={isSelected}
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
            sizes="208px"
            className={styles.thumb}
            priority={false}
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.meta}>
          {source && <span className={styles.channel}>{source}</span>}
          {publishedAt && <span>· {publishedAt.slice(0, 10)}</span>}
        </div>
      </div>
      <button
        className={styles.save}
        data-saved={isBookmarked}
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
