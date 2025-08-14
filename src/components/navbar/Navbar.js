// src/components/Navbar.js
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} fixed top-0 w-full z-50`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className={styles.brand}>
          Jelajah Lainungan
        </Link>
        <div className={styles.links}>
          <Link href="/kuliner" className={styles.page}>Kuliner</Link>
          <Link href="/login" className={styles.login}>Login</Link>
        </div>
      </div>
    </nav>
  );
}
