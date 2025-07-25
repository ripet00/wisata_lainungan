"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchCards = async () => {
    const snapshot = await getDocs(collection(db, "cards"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCards(data);
  };

  const addCard = async () => {
    if (!newTitle.trim()) return;
    await addDoc(collection(db, "cards"), { title: newTitle });
    setNewTitle("");
    fetchCards();
  };

  const deleteCard = async (id) => {
    await deleteDoc(doc(db, "cards", id));
    fetchCards();
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Card title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2" onClick={addCard}>
          Add
        </button>
      </div>

      <ul>
        {cards.map((card) => (
          <li key={card.id} className="flex justify-between items-center border p-2 my-2">
            <span>{card.title}</span>
            <button
              onClick={() => deleteCard(card.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
