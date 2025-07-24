"use client";
import { useState } from "react";
import TimedCards from "../components/TimeCards";
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const handleSubmit = async () => {
    await addDoc(collection(db, 'users'), {
      name: 'Java',
      email: 'rifat.khaidir@gmail.com',
    });
  };

  // Tampilkan animasi jika belum selesai

  // Tampilkan konten utama setelah animasi selesai
  return (
    <main>
      <TimedCards/>

    </main>
  );
}