// src/shared/ui/layout/LayoutRow.tsx
"use client";

import { Base } from "@/shared/ui/base";
import styles from "./LayoutRow.module.css";
import { LayoutRowProps } from "@/shared/ui/layout/types";

export const LayoutRow = ({
  children,
  gap,
  align,
  justify,
}: LayoutRowProps) => {
  return (
    <Base
      className={styles.row}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
    >
      {children}
    </Base>
  );
};
