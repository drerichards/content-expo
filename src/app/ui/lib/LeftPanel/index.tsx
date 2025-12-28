import styles from "./LeftPanel.module.css";

export default function LeftPanel({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className={styles.leftPanel}>{children}</div>;
}
