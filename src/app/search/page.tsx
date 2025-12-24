"use client";

import SearchBar from "@/app/ui/components/SearchBar";
import { useState } from "react";
import { ContentItem, mockItems } from "../data/mockData";
import ArticleCard from "@/app/ui/components/ArticleCard";
import VideoCard from "@/app/ui/components/VideoCard";
import DetailPanel from "@/app/ui/components/DetailPanel";
import styles from "./Search.module.css";

export default function SearchPage() {
    const [results, setResults] = useState<ContentItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

    function handleSearch(query: string) {
        const normalizedQuery = query.toLowerCase();
        const filtered = mockItems.filter((item) => {
            const title = item.title.toLowerCase();
            const description = item.description.toLowerCase();
            return (
                title.includes(normalizedQuery) ||
                description.includes(normalizedQuery)
            );
        });
        setResults(filtered);
        setSelectedItem(null);
    }

    const videos = results.filter((i) => i.type === "video");
    const articles = results.filter((i) => i.type === "article");

    return (
        <main
            className={
                selectedItem
                    ? styles.containerWithDetail
                    : styles.container
            }
        >
            <div className={styles.searchAndResults}>
                <h1 className={styles.title}>
                    Software Engineering Content Explorer
                </h1>
                <p className={styles.subtitle}>
                    Search high-quality software engineering videos and
                    articles without the noise.
                </p>

                <SearchBar onSearch={handleSearch} />

                {results.length > 0 && (
                    <div
                        className={
                            selectedItem
                                ? styles.resultsStacked
                                : styles.resultsGrid
                        }
                    >
                        <div className={styles.column}>
                            <h2>VIDEOS</h2>
                            {videos.map((v) => (
                                <VideoCard
                                    key={v.id}
                                    item={v}
                                    onClick={() => setSelectedItem(v)}
                                />
                            ))}
                        </div>

                        <div className={styles.column}>
                            <h2>ARTICLES</h2>
                            {articles.map((a) => (
                                <ArticleCard
                                    key={a.id}
                                    item={a}
                                    onClick={() => setSelectedItem(a)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedItem && (
                <DetailPanel
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </main>
    );
}