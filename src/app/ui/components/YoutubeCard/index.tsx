import Image from "next/image";
import styles from "./YoutubeCard.module.css";
import { YoutubeSearchResult } from "@/app/types";

type YoutubeCardProps = {
  video: YoutubeSearchResult;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
};

export default function YoutubeCard({
  video: { title, source, publishedAt, thumbnails },
  isBookmarked,
  onToggleBookmark,
  onClick,
}: YoutubeCardProps) {
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
}
