"use client";

import { Field, Input } from "@/shared/ui/block";
// import styles from "./SearchInput.module.css";

type SearchInputProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export const SearchInput = ({ query, onQueryChange }: SearchInputProps) => {
  return (
    <Field label="Search">
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search"
      />
    </Field>
  );
};
