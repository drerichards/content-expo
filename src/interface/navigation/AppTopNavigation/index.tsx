// src/interface/navigation/AppTopNavigation/index.tsx
"use client";

import { SearchControls } from "./SearchControls";
import { useSearchControlsValue } from "@/interface/search/context/SearchControlsContext";
import { BlockHeader as Header } from "@/shared/ui/block/components/BlockHeader";

export const AppTopNavigation = () => {
  const searchControlsProps = useSearchControlsValue();

  return (
    <Header>
      {searchControlsProps ? <SearchControls {...searchControlsProps} /> : null}
    </Header>
  );
};
