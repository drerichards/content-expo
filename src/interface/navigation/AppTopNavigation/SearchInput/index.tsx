"use client";

import styles from "./SearchInput.module.css";

type SearchInputProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
};

export const SearchInput = ({
  query,
  onQueryChange,
  onSubmit,
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.searchInput}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search lessons..."
        type="text"
      />
      <button type="button" className={styles.submitButton} onClick={onSubmit}>
        Search
      </button>
    </div>
  );
};
