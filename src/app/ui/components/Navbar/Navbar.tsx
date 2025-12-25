import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Kernel</h1>
      <ul className="nav-items">
        {/* TODO: empty icon for empty bookmarks or full icon with badge */}
        <li>★ Bookmarks</li>
      </ul>
    </nav>
  );
}
