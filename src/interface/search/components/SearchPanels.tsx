import PanelContainer from "@/shared/ui/containers/PanelContainer";
import styles from "@/shared/styles/layout.module.css";

import SearchResultsPanel from "./SearchResultsPanel";
import SearchDetailPanel from "./SearchDetailPanel";

import { ContentItem, Bookmark } from "@/types";

type ResultsPanelProps = Omit<
  React.ComponentProps<typeof SearchResultsPanel>,
  "toBookmark"
>;

type DetailPanelProps = Omit<
  React.ComponentProps<typeof SearchDetailPanel>,
  "toBookmark"
>;

type Props = {
  resultsPanelProps: ResultsPanelProps;
  detailPanelProps: DetailPanelProps;
  toBookmark: (item: ContentItem) => Bookmark;
};

const SearchPanels = ({
  resultsPanelProps,
  detailPanelProps,
  toBookmark,
}: Props) => {
  const {
    hasSearched,
    videoSearchResults,
    showBookmarks,
    selectedItem,
  } = resultsPanelProps;

  const { isSideOpen } = detailPanelProps;

  return (
    <>
      {hasSearched && videoSearchResults.length === 0 && (
        <p className={styles.noResults}>
          No results found. Try refining your query.
        </p>
      )}

      {(videoSearchResults.length > 0 || showBookmarks) && (
        <PanelContainer hasSelectedItem={!!selectedItem} sideOpen={isSideOpen}>
          {!isSideOpen && (
            <SearchResultsPanel
              {...resultsPanelProps}
              toBookmark={toBookmark}
            />
          )}

          <SearchDetailPanel {...detailPanelProps} toBookmark={toBookmark} />
        </PanelContainer>
      )}
    </>
  );
};

export default SearchPanels;
