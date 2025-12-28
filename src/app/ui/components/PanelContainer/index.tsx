import styles from "./PanelContainer.module.css";

type PanelContainerProps = {
  children?: React.ReactNode;
  hasSelectedItem?: boolean;
  sideOpen?: boolean;
};

// holds side and main panels
export default function PanelContainer({
  children,
  hasSelectedItem: hasDetail,
  sideOpen,
}: PanelContainerProps) {
  const className = [
    styles.panelContainer,
    hasDetail && !sideOpen ? styles.panelSplitContainer : null,
    sideOpen ? styles.panelOpen : null,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{children}</div>;
}
