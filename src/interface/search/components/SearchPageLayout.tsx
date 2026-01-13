import styles from "@/shared/styles/layout.module.css";

type SearchPageLayoutProps = {
  hasSelectedItem: boolean;
  children: React.ReactNode;
};

export const SearchPageLayout = ({
  hasSelectedItem,
  children,
}: SearchPageLayoutProps) => {
  return (
    <main
      className={
        hasSelectedItem ? styles.containerWithDetail : styles.container
      }
    >
      {children}
    </main>
  );
};
