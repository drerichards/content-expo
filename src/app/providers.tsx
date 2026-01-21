"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BookmarkProvider } from "@/features/bookmark/context/BookmarkContext";
import { useBookmarks } from "@/features/bookmark/hooks/useBookmarks";
import { ErrorProvider } from "@/shared/context/ErrorContext";

function BookmarkProviderWrapper({ children }: { children: React.ReactNode }) {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <BookmarkProvider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <BookmarkProviderWrapper>{children}</BookmarkProviderWrapper>
      </QueryClientProvider>
    </ErrorProvider>
  );
}
