"use client";

import type { SnippetItem } from "@/new/src/app/types";
import { CardBase } from "@/new/src/shared/ui/composites/CardBase";

type SnippetCardProps = {
  snippet: SnippetItem;
};

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <CardBase title={snippet.title} subtitle={snippet.source}>
      {/* TODO: snippet-specific content */}
    </CardBase>
  );
}
