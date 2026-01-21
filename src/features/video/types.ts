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
