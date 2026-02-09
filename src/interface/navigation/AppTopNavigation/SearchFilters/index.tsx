"use client";

import { useState } from "react";
import { CONTEXT_OPTIONS, LEVEL_OPTIONS } from "./searchFilterOptions";
import styles from "./SearchFilters.module.css";

type Props = {
  context: string;
  level: string;
  onContextChange: (context: string) => void;
  onLevelChange: (level: string) => void;
};

export const SearchFilters = ({
  context,
  level,
  onContextChange,
  onLevelChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeCount =
    (context !== CONTEXT_OPTIONS[0] ? 1 : 0) +
    (level !== LEVEL_OPTIONS[0] ? 1 : 0);

  return (
    <div className={styles.container}>
      {/* Filter Toggle Button */}
      <button
        className={styles.toggleButton}
        data-active={isOpen || activeCount > 0}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Filters</span>
        {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
        <span className={styles.chevron} data-open={isOpen}>
          ▼
        </span>
      </button>

      {/* Filter Dropdown Tray */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />

          {/* Tray */}
          <div className={styles.tray}>
            {/* Context Filter Group */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Context:</span>
              <div className={styles.filterButtons}>
                {CONTEXT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    className={styles.filterButton}
                    data-active={context === option}
                    data-group="context"
                    onClick={() => onContextChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter Group */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Level:</span>
              <div className={styles.filterButtons}>
                {LEVEL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    className={styles.filterButton}
                    data-active={level === option}
                    data-group="level"
                    onClick={() => onLevelChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
