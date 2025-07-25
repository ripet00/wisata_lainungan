"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const db = getFirestore(auth.app);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
        router.push("/admin");
      } else {
        await auth().signOut();
        setError("Anda tidak memiliki hak akses admin.");
      }
    } catch (error) {
      if (["auth/user-not-found", "auth/wrong-password", "auth/invalid-credential"].includes(error.code)) {
        setError("Email atau kata sandi salah.");
      } else {
        setError(`Terjadi kesalahan: ${error.code}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Kiri - Gambar & teks */}
        <div className={styles.left}>
          <div className={styles.leftText}>
            <h2>Don’t have an account?</h2>
            <p>
              Register to access all the features of our service. Manage your
              trips and bookings in one place. It’s free!
            </p>
            <div className={styles.icons}>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-telegram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-pinterest"></i>
            </div>
          </div>
        </div>

        {/* Kanan - Form Login */}
        <div className={styles.right}>
          <h2 className={styles.heading}>Sign in</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
