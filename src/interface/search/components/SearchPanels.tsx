// src/interface/search/components/SearchPanels.tsx

import PanelContainer from "@/shared/ui/containers/PanelContainer";
import { TextBlock } from "@/shared/ui/block";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { SearchDetailPanel } from "./SearchDetailPanel";

type ResultsPanelProps = React.ComponentProps<typeof SearchResultsPanel>;
type DetailPanelProps = React.ComponentProps<typeof SearchDetailPanel>;

type Props = {
  resultsPanelProps: ResultsPanelProps;
  detailPanelProps: DetailPanelProps;
};

export const SearchPanels = ({
  resultsPanelProps,
  detailPanelProps,
}: Props) => {
  const { hasSearched, videoSearchResults, selectedItem, isLoading } =
    resultsPanelProps;

  if (!hasSearched && !selectedItem) {
    return (
      <PanelContainer hasSelectedItem={false} sideOpen={false}>
        <TextBlock body="Search to begin." />
      </PanelContainer>
    );
  }

  if (hasSearched && isLoading && !selectedItem) {
    return (
      <PanelContainer hasSelectedItem={false} sideOpen={false}>
        <TextBlock body="Searching…" />
      </PanelContainer>
    );
  }

  if (hasSearched && !isLoading && videoSearchResults.length === 0) {
    return (
      <PanelContainer hasSelectedItem={false} sideOpen={false}>
        <TextBlock body="No results found." />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer
      hasSelectedItem={!!selectedItem}
      sideOpen={detailPanelProps.isSideOpen}
    >
      <SearchResultsPanel {...resultsPanelProps} />
      <SearchDetailPanel {...detailPanelProps} />
    </PanelContainer>
  );
};
