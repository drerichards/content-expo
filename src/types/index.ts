// src/types/index.ts

export type Bookmark = {
  id: string;
  provider: "video" | "web";
  providerId: string;
  type: ContentType;
  title: string;
  source: string;
  url: string;
  savedAt: string;
  publishedAt: string;
  description: string;
};

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
  selectedItem: ContentItem | null;

  videoSearchResults: VideoSearchResult[];
  articles: ContentItem[];

  onSelectItem: (item: ContentItem) => void;
  isLoading: boolean;
};

export type SearchDetailPanelProps = {
  selectedItem: ContentItem | null;
  isSideOpen: boolean;

  isBookmarked: (id: string) => boolean;

  // ✅ FIX: accept BOTH
  toggleBookmark: (item: ContentItem | Bookmark) => void;

  upNextItems: ContentItem[];
  onSelectUpNextItem: (item: ContentItem) => void;

  toggleSide: () => void;
  onCloseMainPanel: () => void;
};
