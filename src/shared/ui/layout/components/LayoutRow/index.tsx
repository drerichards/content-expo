// src/shared/ui/layout/LayoutRow.tsx
"use client";

import { Base } from "@/shared/ui/base";
import styles from "./LayoutRow.module.css";
import { LayoutComponentProps } from "@/shared/ui/layout/types";

export const LayoutRow = ({ children }: LayoutComponentProps) => {
  return <Base className={styles.row}>{children}</Base>;
};
