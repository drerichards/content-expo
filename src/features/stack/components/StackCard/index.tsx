"use client";

import type { StackItem } from "@/new/src/app/types";
import { CardBase } from "@/new/src/shared/ui/composites/CardBase";

type StackCardProps = {
  stack: StackItem;
};

export function StackCard({ stack }: StackCardProps) {
  return (
    <CardBase title={stack.title} subtitle={stack.source}>
      {/* TODO: stack-specific content */}
    </CardBase>
  );
}
