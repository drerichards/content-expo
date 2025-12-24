import { ContentItem } from "@/app/data/mockData";
import styles from "./DetailPanel.module.css";

export default function DetailPanel({
    item,
    onClose,
}: {
    item: ContentItem;
    onClose: () => void;
}) {
    return (
        <aside className={styles.panel}>
            <button
                className={styles.close}
                onClick={onClose}
            >
                ← Back
            </button>

            <h2 className={styles.title}>{item.title}</h2>

            <p className={styles.meta}>
                {item.source} — {item.publishedAt}
            </p>

            {item.type === "video" && (
                <div className={styles.videoWrapper}>
                    <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${new URL(
                            item.url
                        ).searchParams.get("v")}`}
                        title="Video"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <p className={styles.description}>
                {item.description}
            </p>

            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                Open Original
            </a>
        </aside>
    );
}