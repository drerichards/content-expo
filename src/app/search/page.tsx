"use client";

import SearchBar from "@/app/ui/components/SearchBar";
import { useState } from "react";
import { ContentItem } from "@/app/types";
import { useBookmarks } from "@/app/hooks/useBookmarks";
import type { Bookmark, YoutubeSearchResult } from "@/app/types";
import styles from "@/app/styles/layout/layout.module.css";
import ContentDisplay from "@/app/ui/components/ContentDisplay";
import Navbar from "@/app/ui/components/Navbar";
import LeftPanel from "@/app/ui/lib/LeftPanel";
import ResultsList from "@/app/ui/components/ResultsList";
import BookmarksList from "@/app/ui/components/BookmarksList";
import FullPanel from "@/app/ui/lib/FullPanel";
import PanelContainer from "@/app/ui/components/PanelContainer";
import SidePanel from "@/app/ui/components/SidePanel";
import MainPanel from "@/app/ui/components/MainPanel";
// import { useYoutubeSearch } from "@/app/hooks/useYoutubeSearch";
import { mockItems } from "@/app/data/mockData";

export default function SearchPage() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // const {
  //   youtubeSearchResults: results,
  //   isLoading,
  //   error,
  //   onYoutubeSearch,
  // } = useYoutubeSearch();
  const youtubeSearchResults = mockItems.filter(
    (item): item is YoutubeSearchResult => item.type === "video",
  );
  // console.log(results);

  const { bookmarks, isBookmarked, toggleBookmark, refreshBookmarks } =
    useBookmarks();
  const videos: YoutubeSearchResult[] = youtubeSearchResults;
  const articles: ContentItem[] = mockItems.filter(
    (item): item is ContentItem => item.type === "article",
  );

  const toggleSide = () => setIsSideOpen((prev) => !prev);
  const openBookmarks = () => {
    refreshBookmarks();
    setIsSideOpen(false);
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
        onSearch={() => {
          // onSearch={(query) => {
          // onYoutubeSearch(query);
          setSelectedItem(null);
          setShowBookmarks(false);
          setHasSearched(true);
        }}
      />

      {hasSearched && youtubeSearchResults.length === 0 && (
        <p className={styles.noResults}>
          No results found. Try refining your query.
        </p>
      )}

      {(hasSearched && youtubeSearchResults.length > 0) || showBookmarks ? (
        <PanelContainer hasSelectedItem={!!selectedItem} sideOpen={isSideOpen}>
          {!isSideOpen && (
            <SidePanel>
              <PanelComponent>
                <div style={{ position: "relative" }}>
                  {hasSearched &&
                    youtubeSearchResults.length > 0 &&
                    !showBookmarks && (
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
                    )}

                  {showBookmarks && (
                    <BookmarksList
                      bookmarks={bookmarks}
                      isBookmarked={isBookmarked}
                      toggleBookmark={toggleBookmark}
                      hasSearched={hasSearched}
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
                embedHeight={isSideOpen ? "80vh" : "65vh"}
                isBookmarked={isBookmarked(selectedItem.id)}
                isSideOpen={isSideOpen}
                toggleSide={toggleSide}
                onMainPanelClose={() => {
                  setSelectedItem(null);
                  setIsSideOpen(false);
                }}
                onToggleBookmark={() =>
                  toggleBookmark(toBookmark(selectedItem))
                }
              />
            )}
          </MainPanel>
        </PanelContainer>
      ) : null}
    </main>
  );
}
