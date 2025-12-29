import type { SnippetItem } from "@/new/src/app/types";

export async function searchSnippets(query: string): Promise<SnippetItem[]> {
    // TODO: implement real API call
    console.log("searchSnippets", query);
    return [];
}
