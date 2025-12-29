import styles from "./Navbar.module.css";

type NavbarProps = {
  onOpenBookmarks?: () => void;
};

export default function Navbar({ onOpenBookmarks }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Kernel</h1>
      <ul className={styles.navItems}>
        {/* TODO: empty icon for empty bookmarks or full icon with badge */}
        <li className={styles.navItem}>
          <button type="button" onClick={onOpenBookmarks}>
            ★ Bookmarks
          </button>
        </li>
      </ul>
    </nav>
  );
}
