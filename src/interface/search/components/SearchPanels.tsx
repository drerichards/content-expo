// src/interface/search/components/SearchPanels.tsx

import PanelContainer from "@/shared/ui/containers/PanelContainer";
import { Text } from "@/shared/ui/block";
import { SearchResultsPanel } from "./SearchResultsPanel";
import { SearchContentPanel } from "./SearchContentPanel";
import { ResultsPanelProps, SearchDetailPanelProps } from "@/types";
import { useSearchPanel } from "../context/SearchPanelContext";

type Props = {
  resultsPanelProps: ResultsPanelProps;
  detailPanelProps: SearchDetailPanelProps;
  emptyMessage?: string | null;
};

export const SearchPanels = ({
  resultsPanelProps,
  detailPanelProps,
  emptyMessage,
}: Props) => {
  const { isSideOpen, isPanelExpanded } = useSearchPanel();
  const { selectedItem, hasSearched, isLoading } = resultsPanelProps;

  // Show only results when: loading, just searched with no selection, or no results yet
  // Hide content panel to give results full screen
  const showResultsOnly = isLoading || (hasSearched && !selectedItem);
  const sideOpen = showResultsOnly ? false : selectedItem ? isSideOpen : true;

  if (!selectedItem && emptyMessage) {
    return (
      <PanelContainer sideOpen={false}>
        <Text body={emptyMessage} />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer sideOpen={sideOpen} panelCollapsed={!isPanelExpanded}>
      <SearchResultsPanel {...resultsPanelProps} />
      {!showResultsOnly && <SearchContentPanel {...detailPanelProps} />}
    </PanelContainer>
  );
};
