// src/shared/ui/layout/LayoutColumn.tsx
"use client";

import { Base } from "@/shared/ui/base";
import styles from "./LayoutColumn.module.css";
import { LayoutComponentProps } from "@/shared/ui/layout/types";

export const LayoutColumn = ({ children }: LayoutComponentProps) => {
  return <Base className={styles.column}>{children}</Base>;
};
