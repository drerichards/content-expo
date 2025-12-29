"use client";

import type { SnippetItem } from "@/app/fakeTypes";
import { CardBase } from "@/shared/ui/components/CardBase";

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
