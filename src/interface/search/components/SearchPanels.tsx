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
  const { selectedItem } = resultsPanelProps;

  if (!selectedItem && emptyMessage) {
    return (
      <PanelContainer sideOpen={false}>
        <Text body={emptyMessage} />
      </PanelContainer>
    );
  }

  return (
    <PanelContainer sideOpen={isSideOpen} panelCollapsed={!isPanelExpanded}>
      <SearchResultsPanel {...resultsPanelProps} />
      <SearchContentPanel {...detailPanelProps} />
    </PanelContainer>
  );
};
