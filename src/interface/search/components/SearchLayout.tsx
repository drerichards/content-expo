/**
 * Props for the {@link SearchLayout} component.
 *
 * @property hasSelectedItem - Indicates whether an item is currently selected.
 * Determines which container layout style is applied.
 * @property children - The content to be rendered inside the main layout container.
 */

/**
 * Layout component for the search page that conditionally applies
 * different container styles depending on whether an item is selected.
 *
 * @param props - Component props.
 * @param props.hasSelectedItem - If `true`, applies a layout that accommodates a detail view;
 * otherwise, uses the default container layout.
 * @param props.children - The content to render within the layout.
 */
import styles from "@/shared/styles/layout.module.css";

type Props = {
  hasSelectedItem: boolean;
  children: React.ReactNode;
};

const SearchLayout = ({ hasSelectedItem, children }: Props) => {
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

export default SearchLayout;
