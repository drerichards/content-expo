import styles from "./ContentContainer.module.css";

type ContentContainerProps = {
  children?: React.ReactNode;
};

export const ContentContainer = ({ children }: ContentContainerProps) => {
  return <div className={styles.contentContainer}>{children}</div>;
};
