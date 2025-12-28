"use client";

import SearchBar from "@/app/ui/components/SearchBar/SearchBar";
import { useState } from "react";
import { ContentItem } from "@/app/types";
import { useBookmarks } from "@/app/hooks/useBookmarks";
import type { Bookmark } from "@/app/types";
import styles from "@/app/styles/layout/layout.module.css";
import ContentDisplay from "@/app/ui/components/ContentDisplay/ContentDisplay";
import Navbar from "@/app/ui/components/Navbar/Navbar";
import LeftPanel from "@/app/ui/lib/LeftPanel/LeftPanel";
import ResultsList from "@/app/ui/components/ResultsList/ResultsList";
import BookmarksList from "@/app/ui/components/BookmarksList/BookmarksList";
import FullPanel from "@/app/ui/lib/FullPanel/FullPanel";
import PanelContainer from "@/app/ui/components/PanelContainer/PanelContainer";
import SidePanel from "@/app/ui/components/SidePanel/SidePanel";
import MainPanel from "@/app/ui/components/MainPanel/MainPanel";
// import { useYoutubeSearch } from "@/app/hooks/useYoutubeSearch";
import { mockItems } from "@/app/data/mockData";

export default function SearchPage() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isSideCollapsed, setIsSideCollapsed] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // const { youtubeSearchResults, isLoading, error, onYoutubeSearch } =
  //   useYoutubeSearch();
  const youtubeSearchResults = mockItems.filter(
    (item) => item.type === "video",
  );

  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const videos: ContentItem[] = youtubeSearchResults;
  const articles: ContentItem[] = mockItems.filter(
    (item) => item.type === "article",
  );

  const toggleSide = () => setIsSideCollapsed((prev) => !prev);
  const openBookmarks = () => {
    setIsSideCollapsed(false);
    setShowBookmarks(true);
  };
  const closeBookmarks = () => setShowBookmarks(false);

  // todo: add clear results button
  // todo: add sorting/filtering options

  function toBookmark(item: ContentItem): Bookmark {
    return {
      id: item.id,
      provider: item.type === "video" ? "youtube" : "web",
      providerId: item.id,
      type: item.type,
      title: item.title,
      source: item.source,
      url: item.url,
      publishedAt: item.publishedAt,
      description: item.description,
      savedAt: new Date().toISOString(),
    };
  }

  function fromBookmark(bookmark: Bookmark): ContentItem {
    return {
      id: bookmark.id,
      type: bookmark.type,
      title: bookmark.title,
      description: bookmark.description ?? "",
      source: bookmark.source,
      url: bookmark.url,
      publishedAt: bookmark.publishedAt ?? "",
    };
  }

  const PanelComponent = selectedItem ? LeftPanel : FullPanel;

  return (
    <main
      className={selectedItem ? styles.containerWithDetail : styles.container}
    >
      <Navbar onOpenBookmarks={openBookmarks} />
      <SearchBar
        onSearch={(query) => {
          // onYoutubeSearch(query);
          setSelectedItem(null);
          setHasSearched(true);
        }}
      />

      {!hasSearched && (
        <p className={styles.searchPrompt}>
          Search for a topic to see videos and articles.
        </p>
      )}

      {/* {hasSearched && youtubeSearchResults.length === 0 && (
        <p className={styles.noResults}>
          No results found. Try refining your query.
        </p>
      )} */}

      {hasSearched && youtubeSearchResults.length > 0 && (
        <PanelContainer
          hasSelectedItem={!!selectedItem}
          sideCollapsed={isSideCollapsed}
        >
          {!isSideCollapsed && (
            <SidePanel>
              <PanelComponent>
                <div style={{ position: "relative" }}>
                  <ResultsList
                    results={!!youtubeSearchResults}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    isBookmarked={isBookmarked}
                    toggleBookmark={toggleBookmark}
                    toBookmark={toBookmark}
                    videos={videos}
                    articles={articles}
                  />

                  {showBookmarks && (
                    <BookmarksList
                      bookmarks={bookmarks}
                      isBookmarked={isBookmarked}
                      toggleBookmark={toggleBookmark}
                      onClose={closeBookmarks}
                      onSelectBookmark={(bookmark) =>
                        setSelectedItem(fromBookmark(bookmark))
                      }
                    />
                  )}
                </div>
              </PanelComponent>
            </SidePanel>
          )}
          <MainPanel>
            {selectedItem && (
              <ContentDisplay
                item={selectedItem}
                embedHeight={isSideCollapsed ? "80vh" : "65vh"}
                isBookmarked={isBookmarked(selectedItem.id)}
                isSideCollapsed={isSideCollapsed}
                toggleSide={toggleSide}
                onToggleBookmark={() =>
                  toggleBookmark(toBookmark(selectedItem))
                }
              />
            )}
          </MainPanel>
        </PanelContainer>
      )}
    </main>
  );
}
