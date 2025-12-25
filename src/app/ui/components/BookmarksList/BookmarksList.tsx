import styles from "./BookmarksList.module.css";
import type { Bookmark } from "@/app/types";
import ListRow from "../ListRow/ListRow";

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
        <h2 className={styles.title}>Bookmarks</h2>
        <button type="button" className={styles.backButton} onClick={onClose}>
          ❮ Results
        </button>
      </div>

      <div className={styles.list}>
        {bookmarks.length === 0 ? (
          <p className={styles.empty}>No bookmarks yet.</p>
        ) : (
          bookmarks.map((b) => (
            <ListRow
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
