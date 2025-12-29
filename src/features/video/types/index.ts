export type Bookmark = {
   id: string;
   provider: "video" | "web";
   providerId: string;
   type: ContentType;
   title: string;
   source: string;
   url: string;
   savedAt: string;
   // For bookmarks we always store a description and published date
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

export type VideoApiItem = {
  id?: { videoId?: string } | string;
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    channelId: string;
    publishedAt?: string;
    thumbnails?: {
      default?: VideoApiThumbnail;
      medium?: VideoApiThumbnail;
    };
  };
};

export type VideoApiSearchResponse = {
  items?: VideoApiItem[];
};
