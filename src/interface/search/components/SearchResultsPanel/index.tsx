// src/interface/search/components/SearchResultsPanel.tsx

import { ContentItem } from "@/types";
import { VideoSearchResult } from "@/features/video/types";
import { List, ListItem, Text } from "@/shared/ui/block";
import { LayoutPanel } from "@/shared/ui/layout";
import ErrorBoundary from "@/shared/ui/components/ErrorBoundary";

export type SearchResultsPanelProps = {
  hasSearched: boolean;
  isSideOpen: boolean;
  selectedItem?: ContentItem;

  videoSearchResults?: VideoSearchResult[];
  articles?: ContentItem[];

  onSelectItem: (item: ContentItem) => void;
  isLoading: boolean;
};

export const SearchResultsPanel = ({
  videoSearchResults,
  articles,
  isLoading,
  onSelectItem,
}: SearchResultsPanelProps) => {
  const allItems = [...(videoSearchResults || []), ...(articles || [])];

  return (
    <LayoutPanel>
      <ErrorBoundary>
        {isLoading ? (
          <Text body="Loading…" />
        ) : (
          <List>
            {allItems.map((item) => (
              <ListItem
                key={item.id}
                isInteractive
                onClick={() => onSelectItem(item)}
              >
                {item.title}
              </ListItem>
            ))}
          </List>
        )}
      </ErrorBoundary>
    </LayoutPanel>
  );
};
