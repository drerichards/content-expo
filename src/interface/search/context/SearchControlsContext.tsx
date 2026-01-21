"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type SearchControlsContextValue = {
  query: string;
  onQueryChange: (value: string) => void;
  context: string;
  level: string;
  onContextChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onSearch: (value: string) => void;
  onToggleSearchFilters: () => void;
  welcomeText: string;
};

type SearchControlsContextState = {
  value: SearchControlsContextValue | null;
  setValue: (value: SearchControlsContextValue | null) => void;
};

const SearchControlsContext = createContext<SearchControlsContextState | null>(
  null,
);

export const SearchControlsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<SearchControlsContextValue | null>(null);

  return (
    <SearchControlsContext.Provider value={{ value, setValue }}>
      {children}
    </SearchControlsContext.Provider>
  );
};

export const useSearchControlsValue = () => {
  return useContext(SearchControlsContext)?.value ?? null;
};

export const useRegisterSearchControls = (
  props: SearchControlsContextValue,
) => {
  const ctx = useContext(SearchControlsContext);

  useEffect(() => {
    if (!ctx) {
      return;
    }

    ctx.setValue(props);

    return () => {
      ctx.setValue(null);
    };
  }, [ctx, props]);
};
