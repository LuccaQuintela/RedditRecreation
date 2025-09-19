import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        setIsLoggedIn(!!e.newValue);
      }
    };

    const handleAuthChanged = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('authChanged', handleAuthChanged as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('authChanged', handleAuthChanged as EventListener);
    };
  }, []);

  return (
    <nav className={styles.navbar}>

      <div className={styles.leftAlignedContainer}>
        <img src="/logo.png" className={styles.logo} />
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/" className={styles.navLink}>Promoted</Link>
          </li>
          <li>
            <Link to="/posts/new" className={styles.navLink}>+</Link>
          </li>
        </ul>
      </div>

      

      <ul className={styles.navProfile}>
        <li>
          <Link to={isLoggedIn ? "/profile" : "/login"} className={styles.navLink}>
            {isLoggedIn ? "Profile" : "Log In"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}