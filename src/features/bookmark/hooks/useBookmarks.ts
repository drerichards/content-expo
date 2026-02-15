"use client";

import { useMemo, useState } from "react";
import type { Bookmark } from "../types";
import { bookmarkService } from "../api/bookmarkService";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    if (typeof window === "undefined") return [];
    return bookmarkService.getAll();
  });

  const refreshBookmarks = () => {
    const stored = bookmarkService.getAll();
    setBookmarks(stored);
  };

  const bookmarkedIds = useMemo(
    () => new Set(bookmarks.map((b) => b.id)),
    [bookmarks],
  );

  const isBookmarked = (id: string) => bookmarkedIds.has(id);

  const toggleBookmark = (bookmark: Bookmark) => {
    const next = bookmarkService.toggle(bookmark);
    setBookmarks(next);
  };

  return { bookmarks, isBookmarked, toggleBookmark, refreshBookmarks };
};
