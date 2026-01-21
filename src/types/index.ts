// src/types/index.ts

type ContentType = "video" | "article" | "playlist";

export type ContentItem = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
};

export type VideoSearchResult = {
  id: string;
  type: "video";
  title: string;
  channelId: string;
  channelTitle?: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  thumbnails: VideoApiThumbnail[];
};

export type VideoApiThumbnail = {
  url?: string;
  width?: number;
  height?: number;
};

export type SearchControlsProps = {
  query: string;
  onQueryChange: (v: string) => void;

  context: string;
  level: string;
  onContextChange: (v: string) => void;
  onLevelChange: (v: string) => void;

  onSearch: (query: string) => void;
  onToggleSearchFilters: () => void;
  welcomeText: string;
};

export type ResultsPanelProps = {
  hasSearched: boolean;
  isSideOpen: boolean;
  selectedItem?: ContentItem;

  videoSearchResults?: VideoSearchResult[];
  articles?: ContentItem[];

  onSelectItem: (item: ContentItem) => void;
  isLoading: boolean;
  isError?: boolean;
};

export type SearchDetailPanelProps = {
  selectedItem?: ContentItem;
  upNextItems: ContentItem[];
  onSelectUpNextItem: (item: ContentItem) => void;
  onCloseContentPanel: () => void;
};
