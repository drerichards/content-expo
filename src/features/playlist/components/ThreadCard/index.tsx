"use client";

import type { ThreadItem } from "@/app/fakeTypes";
import { CardBase } from "@/shared/ui/components/CardBase";

type ThreadCardProps = {
  thread: ThreadItem;
};

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <CardBase title={thread.id} subtitle="Thread Subtitle">
      {/* TODO: thread-specific content */}
    </CardBase>
  );
}
