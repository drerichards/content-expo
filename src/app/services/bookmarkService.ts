import type { Bookmark } from "@/app/types";
import { log } from "console";

const STORAGE_KEY = "see_bookmarks_v1";

/**
 * BookmarkService handles reading and writing bookmark data
 * to localStorage under the STORAGE_KEY.
 *
 * Methods:
 * - getAll(): Return all stored bookmarks, or an empty array on error/SSR.
 * - saveAll(bookmarks): Persist the given list of bookmarks to localStorage.
 * - isBookmarked(id): Check if a bookmark with the given id exists.
 * - add(bookmark): Add a new bookmark if it is not already stored; returns the updated list.
 * - remove(id): Remove the bookmark with the given id; returns the updated list.
 * - toggle(bookmark): Add or remove the bookmark depending on whether it already exists; returns the updated list.
 */

// todo: consider private and protected methods if we switch to TS classes
export class BookmarkService {
  getAll(): Bookmark[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Bookmark[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveAll(bookmarks: Bookmark[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  isBookmarked(id: string): boolean {
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
    return this.isBookmarked(bookmark.id)
      ? this.remove(bookmark.id)
      : this.add(bookmark);
  }
}

export const bookmarkService = new BookmarkService();
