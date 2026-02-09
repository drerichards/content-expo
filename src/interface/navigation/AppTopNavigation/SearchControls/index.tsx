"use client";

import type { FormEvent } from "react";
import { SearchControlsContextValue } from "@/interface/search/context/SearchControlsContext";
import styles from "./SearchControls.module.css";
import { SearchFilters } from "../SearchFilters";
import { SearchInput } from "../SearchInput";

export const SearchControls = ({
  query,
  onQueryChange,
  context,
  onContextChange,
  level,
  onLevelChange,
  onSearch,
  welcomeText,
}: SearchControlsContextValue) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div className={styles.welcomeMain}>Welcome back, Jordan</div>
        <div className={styles.welcomeSub}>Ready to continue learning?</div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <SearchInput
          query={query}
          onQueryChange={onQueryChange}
          onSubmit={() => onSearch(query)}
        />

        <SearchFilters
          context={context}
          onContextChange={onContextChange}
          level={level}
          onLevelChange={onLevelChange}
        />
      </form>
    </div>
  );
};
