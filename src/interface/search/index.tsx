/**
 * Renders the main search page UI.
 *
 * @remarks
 * This component wires together the search page layout, header, results panel,
 * and detail panel. It delegates state management and behavior to the
 * `useSearchPage` hook and passes a mapping function to convert content items
 * into bookmark entities.
 */
"use client";

import { useSearchPage } from "./hooks/useSearchPage";
import { mapContentItemToBookmark } from "./mappers";

import { SearchLayout, SearchHeader, SearchPanels } from "./components";

const SearchPageUI = () => {
  const { layoutProps, headerProps, resultsPanelProps, detailPanelProps } =
    useSearchPage();

  return (
    <SearchLayout {...layoutProps}>
      <SearchHeader {...headerProps} />

      <SearchPanels
        resultsPanelProps={resultsPanelProps}
        detailPanelProps={detailPanelProps}
        toBookmark={mapContentItemToBookmark}
      />
    </SearchLayout>
  );
};

export default SearchPageUI;
