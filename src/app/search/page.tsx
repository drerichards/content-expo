"use client";

import SearchBar from "@/app/ui/components/SearchBar/SearchBar";
import { useState } from "react";
import { mockItems } from "../data/mockData";
import { ContentItem } from "@/app/types";
import { useBookmarks } from "@/app/hooks/useBookmarks";
import type { Bookmark } from "@/app/types";
import styles from "@/app/styles/layout/layout.module.css";
import DetailPanel from "@/app/ui/components/DetailPanel/DetailPanel";
import Navbar from "../ui/components/Navbar/Navbar";
import LeftPanel from "../ui/lib/LeftPanel/LeftPanel";
import ResultsList from "../ui/components/ResultsList/ResultsList";
import FullPanel from "../ui/lib/FullPanel/FullPanel";
import PanelContainer from "../ui/components/PanelContainer/PanelContainer";
import SidePanel from "../ui/components/SidePanel/SidePanel";
import MainPanel from "../ui/components/MainPanel/MainPanel";

function handleSearch(
  query: string,
  setResults: (items: ContentItem[]) => void,
  setSelectedItem: (item: ContentItem | null) => void,
) {
  const normalizedQuery = query.toLowerCase();
  const filtered = mockItems.filter((item) => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    return (
      title.includes(normalizedQuery) || description.includes(normalizedQuery)
    );
  });
  setResults(filtered);
  setSelectedItem(null);
}

export default function SearchPage() {
  const [results, setResults] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isSideCollapsed, setIsSideCollapsed] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarks();

  const videos = results.filter((i) => i.type === "video");
  const articles = results.filter((i) => i.type === "article");

  const toggleSide = () => setIsSideCollapsed((prev) => !prev);

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

  const PanelComponent = selectedItem ? LeftPanel : FullPanel;

  return (
    <main
      className={selectedItem ? styles.containerWithDetail : styles.container}
    >
      <Navbar />
      <SearchBar
        onSearch={(query) => handleSearch(query, setResults, setSelectedItem)}
      />

      <PanelContainer
        hasDetail={!!selectedItem}
        sideCollapsed={isSideCollapsed}
      >
        {!isSideCollapsed && (
          <SidePanel>
            <PanelComponent>
              <ResultsList
                results={results}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isBookmarked={isBookmarked}
                toggleBookmark={toggleBookmark}
                toBookmark={toBookmark}
                videos={videos}
                articles={articles}
              />
            </PanelComponent>
          </SidePanel>
        )}
        <MainPanel>
          {selectedItem && (
            <DetailPanel
              item={selectedItem}
              embedHeight={isSideCollapsed ? "80vh" : "65vh"}
              isBookmarked={isBookmarked(selectedItem.id)}
              isSideCollapsed={isSideCollapsed}
              toggleSide={toggleSide}
              onToggleBookmark={() => toggleBookmark(toBookmark(selectedItem))}
            />
          )}
        </MainPanel>
      </PanelContainer>
    </main>
  );
}
