// src/interface/search/components/SearchResultsPanel.tsx

import { ContentItem, VideoSearchResult } from "@/types";

export type SearchResultsPanelProps = {
  hasSearched: boolean;
  isSideOpen: boolean;
  selectedItem: ContentItem | null;

  videoSearchResults: VideoSearchResult[];
  articles: ContentItem[];

  onSelectItem: (item: ContentItem) => void;
  isLoading: boolean;
};

export const SearchResultsPanel = ({
  videoSearchResults,
  articles,
  isLoading,
  onSelectItem,
}: SearchResultsPanelProps) => {
  if (isLoading) return <div>Loading…</div>;

  return (
    <div>
      {videoSearchResults.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)}>
          {item.title}
        </div>
      ))}

      {articles.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};
