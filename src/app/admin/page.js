"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
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
        router.push("/login"); // Redirect jika tidak ada user yang login
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, db]);

  if (loading) return <p>Loading...</p>;

  return authorized ? <AdminDashboard /> : null;
}
