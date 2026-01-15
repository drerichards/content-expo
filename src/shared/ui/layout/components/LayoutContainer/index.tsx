import { Base } from "@/shared/ui/base";
import styles from "./LayoutContainer.module.css";
import { LayoutComponentProps } from "@/shared/ui/layout/types";

export const LayoutContainer = ({ children }: LayoutComponentProps) => {
  return <Base className={styles.container}>{children}</Base>;
};
