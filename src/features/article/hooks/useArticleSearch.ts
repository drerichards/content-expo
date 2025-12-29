import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ContentItem } from "@/app/types";

export function useContentSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const contentQuery = useQuery<ContentItem[]>({
        queryKey: ["global-search", normalizedQuery],
        queryFn: async () => {
            if (!normalizedQuery) return [];

            // In Phase 2, this will hit your Brave Search / API route
            // For now, we mock the 'article' results to fill the UI
            const res = await fetch(`/api/search?q=${encodeURIComponent(normalizedQuery)}`);
            return await res.json();
        },
        enabled: normalizedQuery.length > 0,
    });

    return {
        results: contentQuery.data ?? [],
        isLoading: contentQuery.isLoading,
        onSearch: (q: string) => setSearchQuery(q),
    };
}