import styles from "./PanelContainer.module.css";

type PanelContainerProps = {
  children?: React.ReactNode;
  hasSelectedItem?: boolean;
  sideCollapsed?: boolean;
};

// holds side and main panels
export default function PanelContainer({
  children,
  hasSelectedItem: hasDetail,
  sideCollapsed,
}: PanelContainerProps) {
  const className = [
    styles.panelContainer,
    hasDetail && !sideCollapsed ? styles.panelSplitContainer : null,
    sideCollapsed ? styles.panelCollapsed : null,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={className}>{children}</div>;
}
