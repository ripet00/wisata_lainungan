"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "@/firebase/firebase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./admin.module.css";

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore(auth.app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
          setAuthorized(true);
        } else {
          router.push("/login"); // Redirect jika bukan admin
        }
      } else {
        router.push("/login"); // Redirect jika tidak login
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, db]);

  if (loading) {
    return <div className={styles.loading}>Memeriksa otorisasi...</div>;
  }

  if (!authorized) {
    return null; // Atau tampilkan halaman "Tidak Diizinkan"
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

