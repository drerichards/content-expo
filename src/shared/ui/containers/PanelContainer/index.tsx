import styles from "./PanelContainer.module.css";

type PanelContainerProps = {
  children?: React.ReactNode;
  hasSelectedItem?: boolean;
  sideOpen?: boolean;
};

// holds side and main panels
export default function PanelContainer({
  children,
  hasSelectedItem,
  sideOpen,
}: PanelContainerProps) {
  // When side panel is open, use grid layout to show search results + detail
  // Otherwise, just display the detail panel with its internal 2-column layout
  const className = sideOpen ? styles.panelOpen : styles.panelContainer;

  return <div className={className}>{children}</div>;
}
