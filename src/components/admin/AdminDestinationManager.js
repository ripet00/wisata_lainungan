"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import styles from "./AdminDestinationManager.module.css";
import { CldUploadWidget } from 'next-cloudinary';

export default function AdminDestinationManager() {
  const [destinations, setDestinations] = useState([]);
  const [newDest, setNewDest] = useState({ place: "", title: "", description: "", image: "", gmap: "" });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDestinations = async () => {
    const querySnapshot = await getDocs(collection(db, "wisata"));
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        place: docData.Place || "",
        title: docData.Title || "",
        description: docData.Description || "",
        image: docData.Image || "",
        gmap: docData.Gmap || ""
      }
    });
    setDestinations(data);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAddOrUpdate = async () => {
    if (
      !newDest.place.trim() ||
      !newDest.title.trim() ||
      !newDest.description.trim() ||
      !newDest.image.trim() ||
      !newDest.gmap.trim()
    ) {
      alert("Semua input wajib diisi.");
      return;
    }

    const dataToSend = {
      Place: newDest.place,
      Title: newDest.title,
      Description: newDest.description,
      Image: newDest.image,
      Gmap: newDest.gmap
    }
    if (editingId) {
      await updateDoc(doc(db, "wisata", editingId), dataToSend);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "wisata"), dataToSend);
    }
    setNewDest({ place: "", title: "", description: "", image: "", gmap: "" });
    fetchDestinations();
    setIsModalOpen(false);
  };

  const handleEdit = (dest) => {
    setNewDest(dest);
    setEditingId(dest.id);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setNewDest({ place: "", title: "", description: "", image: "", gmap: "" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "wisata", id));
    fetchDestinations();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleOpenAddModal} className={styles.addButton}>Add Wisata</button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Pengisian Data Wisata</h2>
            
            <div className={styles.formContainer}>
              <div className={styles.formGroup}>
                <label>Nama Tempat</label>
                <input
                  type="text"
                  placeholder="Contoh: Pantai Losari"
                  value={newDest.place}
                  onChange={(e) => setNewDest({ ...newDest, place: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Judul</label>
                <input
                  type="text"
                  placeholder="Contoh: Wisata Pantai Terbaik"
                  value={newDest.title}
                  onChange={(e) => setNewDest({ ...newDest, title: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Deskripsi</label>
                <textarea
                  placeholder="Tulis deskripsi lengkap tentang tempat wisata ini"
                  value={newDest.description}
                  onChange={(e) => setNewDest({ ...newDest, description: e.target.value })}
                  className={styles.textarea}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Gambar Wisata</label>
                <CldUploadWidget
                  uploadPreset="wisata_lainungan"
                  onSuccess={(result) => {
                    if (result.event === "success") {
                      setNewDest((prev) => ({ 
                        ...prev, 
                        image: result.info.secure_url 
                      }));
                    }
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className={styles.uploadButton}
                    >
                      {newDest.image ? 'Ganti Gambar' : 'Unggah Gambar'}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <div className={styles.formGroup}>
                <label>Google Maps URL</label>
                <input
                  type="text"
                  placeholder="Tempelkan link embed Google Maps"
                  value={newDest.gmap}
                  onChange={(e) => setNewDest({ ...newDest, gmap: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button onClick={() => setIsModalOpen(false)} className={styles.cancelButton}>
                Batal
              </button>
              <button onClick={handleAddOrUpdate} className={styles.submitButton}>
                {editingId ? "Perbarui" : "Simpan"} Data
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.destinationsGrid}>
        {destinations.map((dest) => (
                    <div key={dest.id} className={styles.destinationCard}>
            <img src={dest.image} alt={dest.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{dest.title}</h3>
              <p className={styles.cardPlace}>{dest.place}</p>
              <p className={styles.cardDescription}>{dest.description}</p>
              {dest.gmap && (
                <div className={styles.mapContainer}>
                  <iframe
                    src={dest.gmap}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleEdit(dest)} className={styles.editButton}>
                Edit
              </button>
              <button onClick={() => handleDelete(dest.id)} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
