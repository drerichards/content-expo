"use client";

import { useEffect, useMemo, useState } from "react";
import type { Bookmark } from "@/app/types";
import { bookmarkService } from "@/app/services/bookmarkService";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Hydrate bookmarks from localStorage on the client after mount
  useEffect(() => {
    refreshBookmarks();
  }, []);

  function refreshBookmarks() {
    const stored = bookmarkService.getAll();
    console.log("[useBookmarks] refreshBookmarks loaded:", stored.length);
    setBookmarks(stored);
  }

  useEffect(() => {
    console.log("[useBookmarks] bookmarks state updated:", bookmarks.length);
  }, [bookmarks]);

  const bookmarkedIds = useMemo(
    () => new Set(bookmarks.map((b) => b.id)),
    [bookmarks],
  );

  function isBookmarked(id: string) {
    return bookmarkedIds.has(id);
  }

  function toggleBookmark(bookmark: Bookmark) {
    const next = bookmarkService.toggle(bookmark);
    setBookmarks(next);
  }

  return { bookmarks, isBookmarked, toggleBookmark, refreshBookmarks };
}
