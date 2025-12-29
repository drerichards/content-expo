import type { VideoItem } from "@/app/fakeTypes";

export async function searchVideos(query: string): Promise<VideoItem[]> {
    // TODO: implement real API call
    console.log("searchVideos", query);
    return [];
}
