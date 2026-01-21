import { LayoutMain } from "@/shared/ui/layout/components/LayoutMain";
import styles from "@/shared/styles/layout.module.css";

type SearchPageLayoutProps = {
  hasSelectedItem: boolean;
  children: React.ReactNode;
};

export const SearchPageLayout = ({
  hasSelectedItem,
  children,
}: SearchPageLayoutProps) => {
  const classes = hasSelectedItem
    ? styles.containerWithDetail
    : styles.container;

  return <LayoutMain className={classes}>{children}</LayoutMain>;
};
