import styles from "./MainPanel.module.css";

type MainPanelProps = {
  children?: React.ReactNode;
};

export default function MainPanel({ children }: MainPanelProps) {
  return <div className={styles.mainPanelContainer}>{children}</div>;
}
