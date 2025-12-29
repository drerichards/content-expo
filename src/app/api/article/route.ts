import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { q } = Object.fromEntries(new URL(request.url).searchParams);

    if (!q) {
        return NextResponse.json({ error: "Query required" }, { status: 400 });
    }

    const key = process.env.BRAVE_API_KEY;

    // Brave Search API Web Search endpoint
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}&count=10`;

    const res = await fetch(url, {
        headers: { "X-Subscription-Token": key as string }
    });
    const data = await res.json();

    // Map Brave's 'web' results to our 'article' ContentItem type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalizedArticles = data.web.results.map((item: any) => ({
        id: item.id,
        type: "article",
        title: item.title,
        description: item.description,
        source: new URL(item.url).hostname,
        url: item.url,
        publishedAt: item.page_age || new Date().toISOString(),
    }));

    return NextResponse.json(normalizedArticles);
}