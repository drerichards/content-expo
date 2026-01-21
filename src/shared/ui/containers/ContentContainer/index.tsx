import styles from "./ContentContainer.module.css";

type ContentContainerProps = {
  children?: React.ReactNode;
};

export default function ContentContainer({ children }: ContentContainerProps) {
  return <div className={styles.contentContainer}>{children}</div>;
}
