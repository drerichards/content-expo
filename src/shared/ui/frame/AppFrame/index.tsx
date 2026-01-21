// src/shared/ui/frame/AppFrame/index.tsx
"use client";

import { Base } from "@/shared/ui/base";
import styles from "./AppFrame.module.css";

type AppFrameProps = {
  top: React.ReactNode;
  side: React.ReactNode;
  main: React.ReactNode;
};

export const AppFrame = ({ top, side, main }: AppFrameProps) => {
  return (
    <Base className={styles.frame}>
      <Base as="header" className={styles.top}>
        {top}
      </Base>
      <Base as="aside" className={styles.side}>
        {side}
      </Base>
      <Base as="main" className={styles.main}>
        {main}
      </Base>
    </Base>
  );
};
