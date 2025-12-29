import styles from "./BookmarksList.module.css";
import type { Bookmark } from "@/app/types";
import ArticleCard from "../ArticleCard";

type BookmarksListProps = {
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (bookmark: Bookmark) => void;
  onClose: () => void;
  onSelectBookmark: (bookmark: Bookmark) => void;
};

export default function BookmarksList({
  bookmarks,
  isBookmarked,
  toggleBookmark,
  onClose,
  onSelectBookmark,
}: BookmarksListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onClose}>
          ❮ Results
        </button>
        <h2 className={styles.title}>Bookmarks</h2>
      </div>

      <div className={styles.list}>
        {bookmarks.length === 0 ? (
          <p className={styles.empty}>No bookmarks yet.</p>
        ) : (
          bookmarks.map((b) => (
            <ArticleCard
              key={b.id}
              title={b.title}
              source={b.source}
              isBookmarked={isBookmarked(b.id)}
              onToggleBookmark={() => toggleBookmark(b)}
              onClick={() => onSelectBookmark(b)}
            />
          ))
        )}
      </div>
    </div>
  );
}
