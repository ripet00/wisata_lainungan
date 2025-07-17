"use client";
import { useState } from "react";
import TimedCards from "../components/TimeCards";

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);

  // Tampilkan animasi jika belum selesai

  // Tampilkan konten utama setelah animasi selesai
  return (
    <main>
      <TimedCards/>

    </main>
  );
}