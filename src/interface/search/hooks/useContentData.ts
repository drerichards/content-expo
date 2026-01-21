import { useMemo } from "react";
import { ContentItem } from "@/types";
import { mockItems } from "@/data/mockData";

export const useContentData = () => {
  const articles: ContentItem[] = useMemo(
    () =>
      mockItems.filter((item): item is ContentItem => item.type === "article"),
    [],
  );

  const upNextItems: ContentItem[] = useMemo(() => mockItems.slice(0, 5), []);

  return {
    articles,
    upNextItems,
  };
};
