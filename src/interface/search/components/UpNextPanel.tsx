import { ContentItem } from "@/types";
import styles from "./UpNextPanel.module.css";

type UpNextPanelProps = {
  items: ContentItem[];
  onSelectItem: (item: ContentItem) => void;
};

export const UpNextPanel = ({ items, onSelectItem }: UpNextPanelProps) => {
  return (
    <aside className={styles.upNextPanel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Up Next</h2>
        <p className={styles.subtitle}>Your curated path forward</p>
      </div>
      <div className={styles.itemsList}>
        {items.map((item) => (
          <button
            key={item.id}
            className={styles.item}
            onClick={() => onSelectItem(item)}
          >
            <div className={styles.itemIcon}>
              {item.type === "video" ? "▶" : "📄"}
            </div>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              {item.duration && (
                <span className={styles.itemDuration}>{item.duration}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
