// src/interface/navigation/AppTopNavigation/SearchControls/index.tsx
"use client";

import {
  CONTEXT_OPTIONS,
  LEVEL_OPTIONS,
} from "@/interface/navigation/AppTopNavigation/SearchFilters/searchFilterOptions";
import { SearchControlsProps } from "@/types";
import styles from "./SearchControls.module.css";

export const SearchControls = ({
  query,
  onQueryChange,
  context,
  level,
  onContextChange,
  onLevelChange,
  onSearch,
  onToggleSearchFilters,
  welcomeText,
}: SearchControlsProps) => {
  return (
    <div className={styles.controls}>
      <div className={styles.welcome}>{welcomeText}</div>

      <input
        className={styles.searchInput}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search"
      />

      <button onClick={() => onSearch(query)}>Search</button>

      <button onClick={onToggleSearchFilters}>Filters</button>

      <div className={styles.filters}>
        <select
          value={context}
          onChange={(e) => onContextChange(e.target.value)}
        >
          {CONTEXT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select value={level} onChange={(e) => onLevelChange(e.target.value)}>
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
