"use client";

import { useMemo } from "react";
import { useSearchPage } from "./hooks/useSearchPage";
import { SearchPageLayout, SearchPanels } from "./components";
import { useRegisterSearchControls } from "./context/SearchControlsContext";
import { SearchPanelProvider } from "./context/SearchPanelContext";

export const SearchPageUI = () => {
  const {
    query,
    context,
    level,
    onQueryChange,
    onContextChange,
    onLevelChange,
    onSearch,
    hasSearched,
    videoSearchResults,
    articles,
    isLoading,
    isError,
    selectedItem,
    onSelectItem,
    isSideOpen,
    isPanelExpanded,
    toggleSide,
    togglePanelExpand,
    onCloseContentPanel,
    upNextItems,
    emptyMessage,
    hasSelectedItem,
  } = useSearchPage();

  const searchControlsProps = useMemo(
    () => ({
      query,
      onQueryChange,
      context,
      level,
      onContextChange,
      onLevelChange,
      onSearch,
      onToggleSearchFilters: () => {},
      welcomeText: "Welcome back Jordan — ready to continue learning?",
    }),
    [
      query,
      onQueryChange,
      context,
      level,
      onContextChange,
      onLevelChange,
      onSearch,
    ],
  );

  const resultsPanelProps = {
    hasSearched,
    isSideOpen,
    selectedItem,
    videoSearchResults,
    articles,
    onSelectItem,
    isLoading,
    isError,
  };

  const detailPanelProps = {
    selectedItem,
    upNextItems,
    onSelectUpNextItem: onSelectItem,
    onCloseContentPanel,
  };

  const panelContextValue = {
    isPanelExpanded,
    isSideOpen,
    togglePanelExpand,
    toggleSide,
  };

  useRegisterSearchControls(searchControlsProps);

  return (
    <SearchPanelProvider value={panelContextValue}>
      <SearchPageLayout hasSelectedItem={hasSelectedItem}>
        <SearchPanels
          resultsPanelProps={resultsPanelProps}
          detailPanelProps={detailPanelProps}
          emptyMessage={emptyMessage}
        />
      </SearchPageLayout>
    </SearchPanelProvider>
  );
};

