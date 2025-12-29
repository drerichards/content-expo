import styles from "./BookmarksList.module.css";
import type { Bookmark } from "@/app/types";
import ArticleCard from "@/features/article/components/ArticleCard";

type BookmarksListProps = {
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (bookmark: Bookmark) => void;
  hasSearched: boolean;
  onClose: () => void;
  onSelectBookmark: (bookmark: Bookmark) => void;
};

export default function BookmarksList({
  bookmarks,
  isBookmarked,
  toggleBookmark,
  hasSearched,
  onClose,
  onSelectBookmark,
}: BookmarksListProps) {
  console.log(
    "[BookmarksList] render with bookmarks length:",
    bookmarks.length,
  );
  return (
    <div className={styles.container}>
      {hasSearched && (
        <div className={styles.header}>
          <h2 className={styles.title}>Bookmarks</h2>
          <button type="button" className={styles.backButton} onClick={onClose}>
            ❮ Results
          </button>
        </div>
      )}

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
