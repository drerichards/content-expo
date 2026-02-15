import styles from "./SidePanel.module.css";

export const SidePanel = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return <aside className={styles.sidePanel}>{children}</aside>;
};
