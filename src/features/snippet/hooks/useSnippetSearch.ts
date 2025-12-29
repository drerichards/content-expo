"use client";

import { useState } from "react";
import type { SnippetItem } from "@/app/fakeTypes";
import { searchSnippets } from "../api/snippetService";

export function useSnippetSearch() {
    const [results, setResults] = useState<SnippetItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSearch(query: string) {
        setIsLoading(true);
        setError(null);
        try {
            const data = await searchSnippets(query);
            setResults(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError("Failed to search snippets");
        } finally {
            setIsLoading(false);
        }
    }

    return { results, isLoading, error, onSearch };
}
