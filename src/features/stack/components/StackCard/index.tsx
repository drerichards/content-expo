"use client";

import type { StackItem } from "@/app/fakeTypes";
import { CardBase } from "@/shared/ui/components/CardBase";

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
