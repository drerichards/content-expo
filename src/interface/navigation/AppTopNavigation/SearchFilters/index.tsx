"use client";

import { CONTEXT_OPTIONS, LEVEL_OPTIONS } from "./searchFilterOptions";
import { Field, List, ListItem, Section, Select } from "@/shared/ui/block";
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
  const FILTERS = [
    {
      label: "Context",
      value: context,
      onChange: onContextChange,
      options: CONTEXT_OPTIONS,
    },
    {
      label: "Level",
      value: level,
      onChange: onLevelChange,
      options: LEVEL_OPTIONS,
    },
  ];

  return (
    <Section className={styles.filters}>
      <List>
        <List>
          {FILTERS.map(({ label, value, onChange, options }) => (
            <ListItem key={label}>
              <Field label={label}>
                <Select
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>
            </ListItem>
          ))}
        </List>
      </List>
    </Section>
  );
};
