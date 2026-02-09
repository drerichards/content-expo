// src/shared/ui/layout/LayoutColumn.tsx
"use client";

import { Base } from "@/shared/ui/base";
import styles from "./LayoutColumn.module.css";
import { LayoutColumnProps } from "@/shared/ui/layout/types";

export const LayoutColumn = ({ children, gap, align }: LayoutColumnProps) => {
  return (
    <Base className={styles.column} data-gap={gap} data-align={align}>
      {children}
    </Base>
  );
};
