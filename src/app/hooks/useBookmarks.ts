"use client";

import { useMemo, useState } from "react";
import type { Bookmark } from "@/app/types";
import { bookmarkService } from "@/app/services/bookmarkService";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    bookmarkService.getAll(),
  );

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

  return { bookmarks, isBookmarked, toggleBookmark };
}
