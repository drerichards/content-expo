"use client";

import type { ThreadItem } from "@/new/src/app/types";
import { CardBase } from "@/new/src/shared/ui/composites/CardBase";

type ThreadCardProps = {
  thread: ThreadItem;
};

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <CardBase title={thread.title} subtitle={thread.source}>
      {/* TODO: thread-specific content */}
    </CardBase>
  );
}
