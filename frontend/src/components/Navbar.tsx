import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
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
          <Link to="/profile" className={styles.navLink}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
}