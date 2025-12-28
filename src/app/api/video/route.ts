import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { q } = Object.fromEntries(new URL(request.url).searchParams);

    if (!q) {
        return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    const key = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        q as string,
    )}&type=video&videoEmbeddable=true&maxResults=10&key=${key}`;

    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
}
// "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=VIDEO_ID_1,VIDEO_ID_2,VIDEO_ID_3&key=API_KEY&key=API_KEY"
/*
    string
The order parameter specifies the method that will be used to order resources in the API response. The default value is relevance.

Acceptable values are:
date – Resources are sorted in reverse chronological order based on the date they were created.
rating – Resources are sorted from highest to lowest rating.
relevance – Resources are sorted based on their relevance to the search query. This is the default value for this parameter.
title – Resources are sorted alphabetically by title.
videoCount – Channels are sorted in descending order of their number of uploaded videos.
viewCount – Resources are sorted from highest to lowest number of views. For live broadcasts, videos are sorted by number of concurrent viewers while the broadcasts are ongoing.
*/