import type { VideoItem } from "@/new/src/app/types";

export async function searchVideos(query: string): Promise<VideoItem[]> {
    // TODO: implement real API call
    console.log("searchVideos", query);
    return [];
}
