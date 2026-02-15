import type { ContentType } from "@/types";

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
