import styles from "./FullPanel.module.css";

export default function FullPanel({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className={styles.fullPanel}>{children}</div>;
}
