"use client";

import type { FormEvent } from "react";
import { SearchControlsContextValue } from "@/interface/search/context/SearchControlsContext";
import {
  Card,
  Button,
  Form,
  Section,
  Text,
} from "@/shared/ui/block";
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
    <Section>
      <Text className={styles.welcome} body={welcomeText} />

      <Card density="tight">
        <Form className={styles.form} onSubmit={handleSubmit}>
          <SearchInput query={query} onQueryChange={onQueryChange} />

          <SearchFilters
            context={context}
            onContextChange={onContextChange}
            level={level}
            onLevelChange={onLevelChange}
          />

          <Button type="submit" className={styles.submit}>
            Search
          </Button>
        </Form>
      </Card>
    </Section>
  );
};
