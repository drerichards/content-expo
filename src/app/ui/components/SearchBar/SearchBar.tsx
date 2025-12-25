"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search software engineering topics…"
      />
      <button type="submit">Search</button>
    </form>
  );
}
