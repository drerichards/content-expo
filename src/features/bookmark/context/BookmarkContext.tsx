"use client";

import { createContext, useContext, ReactNode } from "react";
import { Bookmark } from "../types";

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (bookmark: Bookmark) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | undefined>(
  undefined,
);

type BookmarkProviderProps = {
  value: BookmarkContextValue;
  children: ReactNode;
};

export const BookmarkProvider = ({
  value,
  children,
}: BookmarkProviderProps) => {
  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarkContext must be used within BookmarkProvider");
  }
  return context;
};
