"use client";

import { useState } from "react";
import styles from "./SearchBar.module.css";

const CONTEXT_OPTIONS = [
  "Architecture",
  "Best Practices",
  "Code Examples",
  "Debugging",
  "Design Patterns",
  "Documentation",
  "Guides",
  "Performance",
  "Security",
  "Testing",
  "Tutorial",
];

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"];

export default function SearchBar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState(CONTEXT_OPTIONS[0]);
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) {
      const combined = [query, context, level].filter(Boolean).join(" ");
      onSearch(combined);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className={styles.searchRow}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search software engineering topics…"
        />
        <select value={context} onChange={(e) => setContext(e.target.value)}>
          {CONTEXT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </div>

      <div className={styles.levelRow}>
        {LEVEL_OPTIONS.map((opt) => (
          <label key={opt} className={styles.levelOption}>
            <input
              type="radio"
              name="level"
              value={opt}
              checked={level === opt}
              onChange={() => setLevel(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </form>
  );
}
