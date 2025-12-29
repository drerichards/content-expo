"use client";

import { useState } from "react";
import type { ThreadItem } from "@/app/fakeTypes";
import { searchThreads } from "../api/threadService";

export function useThreadSearch() {
    const [results, setResults] = useState<ThreadItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSearch(query: string) {
        setIsLoading(true);
        setError(null);
        try {
            const data = await searchThreads(query);
            setResults(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError("Failed to search threads");
        } finally {
            setIsLoading(false);
        }
    }

    return { results, isLoading, error, onSearch };
}
