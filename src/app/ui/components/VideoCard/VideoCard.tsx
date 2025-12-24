import { ContentItem } from "@/app/data/mockData";
import styles from "./VideoCard.module.css";

export default function VideoCard({
    item,
    onClick,
}: {
    item: ContentItem;
    onClick?: () => void;
}) {
    return (
        <div
            className={styles.card}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") onClick?.();
            }}
        >
            <div className={styles.title}>{item.title}</div>
            <div className={styles.source}>{item.source}</div>
        </div>
    );
}