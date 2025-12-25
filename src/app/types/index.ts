export type Bookmark = {
  id: string;
  provider: "youtube" | "web";
  providerId: string;
  type: "video" | "article";
  title: string;
  source: string;
  url: string;
  savedAt: string;
  publishedAt?: string;
  description?: string;
};

export type ContentItem = {
  id: string;
  type: "video" | "article";
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
};
