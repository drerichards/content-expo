import styles from "./SidePanel.module.css";

export default function SidePanel({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <aside className={styles.sidePanel}>{children}</aside>;
}
