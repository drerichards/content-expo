import React from "react";
import { Base } from "@/shared/ui/base";

// Semantic section only.
// Use only when the content can be named (e.g. "Search Results").
export const SectionBlock = ({ children }: { children: React.ReactNode }) => {
  return <Base as="section">{children}</Base>;
};
