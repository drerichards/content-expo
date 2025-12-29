import { Bookmark, ContentItem } from "@/features/video/types";

export const toBookmark = (item: ContentItem): Bookmark => {
  return {
    id: item.id,
    provider: item.type === "video" ? "video" : "web",
    providerId: item.id,
    type: item.type,
    title: item.title,
    source: item.source,
    url: item.url,
    publishedAt: item.publishedAt,
    description: item.description,
    savedAt: new Date().toISOString(),
  };
};

export const fromBookmark = (bookmark: Bookmark): ContentItem => {
  return {
    id: bookmark.id,
    type: bookmark.type,
    title: bookmark.title,
    description: bookmark.description ?? "",
    source: bookmark.source,
    url: bookmark.url,
    publishedAt: bookmark.publishedAt ?? "",
  };
};
