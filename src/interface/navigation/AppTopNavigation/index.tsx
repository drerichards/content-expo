// src/interface/navigation/AppTopNavigation/index.tsx
"use client";

import { SearchControls } from "./SearchControls";

type AppTopNavigationProps = {
  searchControlsProps: React.ComponentProps<typeof SearchControls>;
};

export const AppTopNavigation = ({
  searchControlsProps,
}: AppTopNavigationProps) => {
  return (
    <header>
      <SearchControls {...searchControlsProps} />
    </header>
  );
};
