"use client";

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
  return (
    <>
      <div className={styles.searchRow}>
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
      </div>

      <div className={styles.levelRow}>
        {LEVEL_OPTIONS.map((opt) => (
          <label key={opt} className={styles.levelOption}>
            <input
              type="radio"
              name="level"
              value={opt}
              checked={level === opt}
              onChange={() => onLevelChange(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </>
  );
};
