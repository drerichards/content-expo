export type Bookmark = {
  id: string;
  provider: "youtube" | "web";
  providerId: string;
  type: ContentType;
  title: string;
  source: string;
  url: string;
  savedAt: string;
  publishedAt?: string;
  description?: string;
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

export type YoutubeSearchResult = {
  id: string;
  type: "video";
  title: string;
  channelId: string;
  channelTitle?: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  thumbnails: YoutubeApiThumbnail[];
};

export type YoutubeApiThumbnail = {
  url?: string;
  width?: number;
  height?: number;
};

export type YoutubeApiItem = {
  id?: { videoId?: string } | string;
  snippet?: {
    title?: string;
    description?: string;
    channelTitle?: string;
    channelId: string;
    publishedAt?: string;
    thumbnails?: {
      default?: YoutubeApiThumbnail;
      medium?: YoutubeApiThumbnail;
    };
  };
};

export type YoutubeApiSearchResponse = {
  items?: YoutubeApiItem[];
};
