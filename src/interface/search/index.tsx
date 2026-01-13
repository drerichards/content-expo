// src/interface/search/index.tsx
// FIX: remove any reference to `videos`

"use client";

import { useSearchPage } from "./hooks/useSearchPage";
import { AppContainer } from "@/interface/app/AppContainer";
import { SearchPageLayout, SearchPanels } from "./components";

const SearchPageUI = () => {
  const {
    layoutProps,
    searchControlsProps,
    resultsPanelProps,
    detailPanelProps,
  } = useSearchPage();

  return (
    <AppContainer searchControlsProps={searchControlsProps}>
      <SearchPageLayout hasSelectedItem={layoutProps.hasSelectedItem}>
        <SearchPanels
          resultsPanelProps={resultsPanelProps}
          detailPanelProps={detailPanelProps}
        />
      </SearchPageLayout>
    </AppContainer>
  );
};

export default SearchPageUI;
