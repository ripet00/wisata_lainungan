"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth} from "@/firebase/firebase";

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

      // Check user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
        router.push("/admin");
      } else {
        await auth().signOut();
        setError("Anda tidak memiliki hak akses admin.");
      }
    } catch (error) {
      console.error("Login error:",error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError("Email atau kata sandi salah.");
      } else {
        setError(`Terjadi kesalahan : ${error.code}`);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-4 border">
      <h2 className="text-xl font-bold mb-4">Login Admin</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
    </form>
  );
}
