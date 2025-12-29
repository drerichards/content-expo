import type { SnippetItem } from "@/app/fakeTypes";

export async function searchSnippets(query: string): Promise<SnippetItem[]> {
    // TODO: implement real API call
    console.log("searchSnippets", query);
    return [];
}
