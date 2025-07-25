"use client";
import { useState, useEffect } from "react";
import TimedCards from "../components/TimeCards";
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from "next/link";

export default function Home() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchCards = async () => {
      const snapshot = await getDocs(collection(db, 'cards'))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data}))
      setCards(data)
    }
    fetchCards()
  }, [])

  return (
    <main>
      <TimedCards/>
      <div className="text-center mt-4">
        <Link href="/login" className="text-blue-500 underline">
          Admin Login
        </Link>
      </div>
    </main>
  );
}