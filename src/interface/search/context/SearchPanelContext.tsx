"use client";

import { createContext, useContext, ReactNode } from "react";

type SearchPanelContextValue = {
  isPanelExpanded: boolean;
  isSideOpen: boolean;
  togglePanelExpand: () => void;
  toggleSide: () => void;
};

const SearchPanelContext = createContext<SearchPanelContextValue | undefined>(
  undefined,
);

type SearchPanelProviderProps = {
  value: SearchPanelContextValue;
  children: ReactNode;
};

export const SearchPanelProvider = ({
  value,
  children,
}: SearchPanelProviderProps) => {
  return (
    <SearchPanelContext.Provider value={value}>
      {children}
    </SearchPanelContext.Provider>
  );
};

export const useSearchPanel = () => {
  const context = useContext(SearchPanelContext);
  if (!context) {
    throw new Error("useSearchPanel must be used within SearchPanelProvider");
  }
  return context;
};
