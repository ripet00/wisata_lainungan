"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Gagal logout: ", error);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/user", label: "User" },
    { href: "/admin/destination", label: "Destination" },
  ];

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Admin Panel</h1>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </aside>
  );
}