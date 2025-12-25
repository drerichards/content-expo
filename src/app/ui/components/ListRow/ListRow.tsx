import styles from "./ListRow.module.css";

type ListRowProps = {
  title: string;
  source: string;
  isBookmarked: boolean;
  onClick?: () => void;
  onToggleBookmark: () => void;
};

export default function ListRow({
  title,
  source,
  isBookmarked,
  onClick,
  onToggleBookmark,
}: ListRowProps) {
  return (
    <div
      className={styles.row}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.();
      }}
    >
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.source}>{source}</div>
      </div>
      <button
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
