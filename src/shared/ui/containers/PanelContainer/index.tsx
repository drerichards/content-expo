import { Base } from "@/shared/ui/base";
import styles from "./PanelContainer.module.css";

type PanelContainerProps = {
  children?: React.ReactNode;
  sideOpen?: boolean;
  panelCollapsed?: boolean;
};

export const PanelContainer = ({
  children,
  sideOpen,
  panelCollapsed,
}: PanelContainerProps) => {
  return (
    <Base
      className={styles.panelContainer}
      data-side-open={sideOpen || undefined}
      data-panel-collapsed={panelCollapsed || undefined}
    >
      {children}
    </Base>
  );
};
