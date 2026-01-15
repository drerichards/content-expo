import { Base } from "@/shared/ui/base";
import styles from "./LayoutPanel.module.css";
import { LayoutComponentProps } from "@/shared/ui/layout/types";

export const LayoutPanel = ({ children }: LayoutComponentProps) => {
  return <Base className={styles.panel}>{children}</Base>;
};
