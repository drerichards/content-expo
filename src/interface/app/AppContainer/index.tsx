// src/interface/app/AppContainer.tsx
"use client";

import { AppTopNavigation } from "@/interface/navigation/AppTopNavigation";
import { AppSideNavigation } from "@/interface/navigation/AppSideNavigation";

type AppContainerProps = {
  searchControlsProps: React.ComponentProps<
    typeof AppTopNavigation
  >["searchControlsProps"];
  children: React.ReactNode;
};

export const AppContainer = ({
  searchControlsProps,
  children,
}: AppContainerProps) => {
  return (
    <>
      <AppTopNavigation searchControlsProps={searchControlsProps} />
      <AppSideNavigation />
      {children}
    </>
  );
};
