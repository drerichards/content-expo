import styles from "./ResultsList.module.css";
import type { Bookmark, ContentItem, YoutubeSearchResult } from "@/app/types";
import YoutubeCard from "@/features/video/components/VideoCard";
import ArticleCard from "@/features/article/components/ArticleCard";

type ResultsListProps = {
  results: boolean;
  selectedItem: ContentItem | null;
  setSelectedItem: (item: ContentItem) => void;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (bookmark: Bookmark) => void;
  toBookmark: (item: ContentItem) => Bookmark;
  videos: YoutubeSearchResult[];
  articles: ContentItem[];
};

export default function ResultsList({
  results,
  selectedItem,
  setSelectedItem,
  isBookmarked,
  toggleBookmark,
  toBookmark,
  videos,
  articles,
}: ResultsListProps) {
  return (
    <div>
      {results && (
        <div
          className={selectedItem ? styles.resultsStacked : styles.resultsGrid}
        >
          <div className={styles.column}>
            <h2>VIDEOS</h2>
            {videos.map((v) => {
              return (
                <YoutubeCard
                  key={v.id}
                  video={v}
                  isBookmarked={isBookmarked(v.id)}
                  onToggleBookmark={() => toggleBookmark(toBookmark(v))}
                  onClick={() => setSelectedItem(v)}
                />
              );
            })}
          </div>

          <div className={styles.column}>
            <h2>ARTICLES</h2>
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                title={a.title}
                source={a.source}
                isBookmarked={isBookmarked(a.id)}
                onToggleBookmark={() => toggleBookmark(toBookmark(a))}
                onClick={() => setSelectedItem(a)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
