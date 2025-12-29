"use client";

import Navbar from "@/shared/ui/components/Navbar";
import SearchBar from "@/shared/ui/components/SearchInput";
import ResultsList from "@/shared/ui/components/Results";
import PanelContainer from "@/shared/ui/containers/PanelContainer";
import SidePanel from "@/shared/ui/containers/SidePanel";
import MainPanel from "@/shared/ui/containers/MainPanel";
import LeftPanel from "@/shared/ui/elements/LeftPanel";
import FullPanel from "@/shared/ui/elements/FullPanel";
import VideoView from "@/features/video/components/VideoView";
import BookmarksList from "@/features/bookmark/components/BookmarksList";
import styles from "@/shared/styles/layout.module.css";

import { useSearchPage } from "./hooks/useSearchPage";
import { toBookmark } from "./utils";

const ContentSearchPage = () => {
  const {
    selectedItem,
    isSideOpen,
    showBookmarks,
    hasSearched,
    videoSearchResults,
    videos,
    articles,
    bookmarks,
    isBookmarked,
    toggleBookmark,
    onSearch,
    onSelectItem,
    onToggleSide,
    onOpenBookmarks,
    onCloseBookmarks,
    onCloseMainPanel,
  } = useSearchPage();

  const DynamicPanel = selectedItem ? LeftPanel : FullPanel;

  return (
    <main
      className={selectedItem ? styles.containerWithDetail : styles.container}
    >
      <Navbar onOpenBookmarks={onOpenBookmarks} />

      <SearchBar onSearch={onSearch} />

      {hasSearched && videoSearchResults.length === 0 && (
        <p className={styles.noResults}>
          No results found. Try refining your query.
        </p>
      )}

      {(hasSearched && videoSearchResults.length > 0) || showBookmarks ? (
        <PanelContainer hasSelectedItem={!!selectedItem} sideOpen={isSideOpen}>
          {!isSideOpen && (
            <SidePanel>
              <DynamicPanel>
                {!showBookmarks && (
                  <ResultsList
                    results={!!videoSearchResults}
                    selectedItem={selectedItem}
                    setSelectedItem={onSelectItem}
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
                    onClose={onCloseBookmarks}
                    onSelectBookmark={onSelectItem}
                  />
                )}
              </DynamicPanel>
            </SidePanel>
          )}

          <MainPanel>
            {selectedItem && (
              <VideoView
                item={selectedItem}
                embedHeight={isSideOpen ? "80vh" : "65vh"}
                isBookmarked={isBookmarked(selectedItem.id)}
                isSideOpen={isSideOpen}
                toggleSide={onToggleSide}
                onMainPanelClose={onCloseMainPanel}
                onToggleBookmark={() =>
                  selectedItem && toggleBookmark(toBookmark(selectedItem))
                }
              />
            )}
          </MainPanel>
        </PanelContainer>
      ) : null}
    </main>
  );
};

export default ContentSearchPage;
