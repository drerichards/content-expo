import type { Bookmark } from "@/types";

const STORAGE_KEY = "see_bookmarks_v1";

// todo: consider private and protected methods if we switch to TS classes
export class BookmarkService {
  getAll(): Bookmark[] {
    if (typeof window === "undefined") return [];

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];

      const parsed = JSON.parse(raw) as Bookmark[];
      if (!Array.isArray(parsed)) {
        console.error("[BookmarkService] Stored value is not an array", parsed);
        return [];
      }

      console.log("[BookmarkService] Loaded bookmarks from localStorage:", parsed.length);
      return parsed;
    } catch (error) {
      console.error("[BookmarkService] Failed to parse bookmarks from localStorage", error);
      return [];
    }
  }

  private saveAll(bookmarks: Bookmark[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  private hasBookmark(id: string): boolean {
    return this.getAll().some((b) => b.id === id);
  }

  add(bookmark: Bookmark): Bookmark[] {
    const all = this.getAll();
    if (all.some((b) => b.id === bookmark.id)) return all;
    const mergedBookmarks = [bookmark, ...all];
    this.saveAll(mergedBookmarks);
    return mergedBookmarks;
  }

  remove(id: string): Bookmark[] {
    const all = this.getAll();
    const filteredBookmarks = all.filter((b) => b.id !== id);
    this.saveAll(filteredBookmarks);
    return filteredBookmarks;
  }

  toggle(bookmark: Bookmark): Bookmark[] {
    return this.hasBookmark(bookmark.id)
      ? this.remove(bookmark.id)
      : this.add(bookmark);
  }
}

export const bookmarkService = new BookmarkService();
