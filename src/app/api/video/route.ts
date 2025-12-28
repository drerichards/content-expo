import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { q } = Object.fromEntries(new URL(request.url).searchParams);

    if (!q) {
        return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    const key = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        q as string,
    )}&type=video&maxResults=10&key=${key}`;

    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
}