"use client";

import { useState } from "react";
import type { StackItem } from "@/app/fakeTypes";
import { searchStacks } from "../api/stackService";

export function useStackSearch() {
    const [results, setResults] = useState<StackItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSearch(query: string) {
        setIsLoading(true);
        setError(null);
        try {
            const data = await searchStacks(query);
            setResults(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError("Failed to search stack results");
        } finally {
            setIsLoading(false);
        }
    }

    return { results, isLoading, error, onSearch };
}
