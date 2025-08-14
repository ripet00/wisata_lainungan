"use client";
import { useState, useEffect, Suspense } from "react";
import TimedCards from "../components/timecards/TimeCards";
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from "../components/navbar/Navbar";
import Showcase from "@/components/home/showcase";
import Footer from "../components/Footer";


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
    <>
    <Navbar />
      <main>
        <Suspense fallback={<loading />}>
          <TimedCards/>
          <Showcase/>

        </Suspense>
        <Footer/>
      </main>

    </>
    
  );
}