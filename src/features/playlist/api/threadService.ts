import { ThreadItem } from '@/app/fakeTypes';

export async function searchThreads(query: string): Promise<ThreadItem[]> {
    // TODO: implement real API call
    console.log("searchThreads", query);
    return [];
}
