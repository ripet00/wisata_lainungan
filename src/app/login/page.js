"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import styles from "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
        await auth.signOut();
        setError("You don't have admin access.");
      }
    } catch (error) {
      if (["auth/user-not-found", "auth/wrong-password", "auth/invalid-credential"].includes(error.code)) {
        setError("Invalid email or password");
      } else {
        setError(`Error: ${error.code}`);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Left Side - Branding and Register Info */}
        <div className={styles.left}>
          <div className={styles.brand}>NOMAD</div>
          <div className={styles.leftContent}>
            <h2>Don't have an account?</h2>
            <p>
              Register to access all the features of our service.<br />
              Manage your trips and bookings in one place, it's free!
            </p>
            <Link href="/register" className={styles.registerButton}>
              Sign up
            </Link>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.right}>
          <h2 className={styles.loginTitle}>Sign in</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <div className={styles.passwordInput}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginButton}>
              Sign in
            </button>

            <div className={styles.loginFooter}>
              <span>Have an account?</span>
              <Link href="/login" className={styles.loginLink}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}