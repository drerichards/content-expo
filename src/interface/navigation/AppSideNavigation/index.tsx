import styles from "./AppSideNavigation.module.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", active: true },
  { id: "search", label: "Search", icon: "🔍", active: false },
  { id: "learning", label: "Learning Path", icon: "🗺️", active: false },
  { id: "library", label: "Library", icon: "📚", active: false },
  { id: "progress", label: "Progress", icon: "📈", active: false },
  { id: "bookmarks", label: "Bookmarks", icon: "🔖", active: false },
  { id: "settings", label: "Settings", icon: "⚙️", active: false },
];

export const AppSideNavigation = () => {
  return (
    <nav className={styles.navbar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>K</div>
        <div className={styles.brandText}>
          <h1 className={styles.title}>Kernel</h1>
          <p className={styles.subtitle}>Learning Cockpit</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className={styles.navItems}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.navItem}
            data-active={item.active}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Section */}
      <div className={styles.userSection}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>JD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Jordan Davis</span>
            <span className={styles.userLevel}>Level 12</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
