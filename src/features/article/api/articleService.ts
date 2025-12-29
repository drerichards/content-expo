import type { ArticleItem } from "@/new/src/app/types";

export async function searchArticles(query: string): Promise<ArticleItem[]> {
    // TODO: implement real API call
    console.log("searchArticles", query);
    return [];
}
