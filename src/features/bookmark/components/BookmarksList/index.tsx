import styles from "./BookmarksList.module.css";
import type { Bookmark } from "@/features/video/types";
import ArticleCard from "@/features/article/components/ArticleCard";

type BookmarksListProps = {
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (bookmark: Bookmark) => void;
  hasSearched: boolean;
  onClose: () => void;
  onSelectBookmark: (bookmark: Bookmark) => void;
};

const BookmarksList = ({
  bookmarks,
  isBookmarked,
  toggleBookmark,
  hasSearched,
  onClose,
  onSelectBookmark,
}: BookmarksListProps) => {
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
};

export default BookmarksList;
