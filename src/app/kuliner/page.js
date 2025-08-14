'use client'
import styles from './kuliner.module.css'
import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar'
import { useRef, useEffect, useState } from 'react';

export default function KulinerPage() {
  const slideRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (slideRef.current) observer.observe(slideRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.heroFull}>
          <h1 className={styles.centerTitle}>
            Kuliner <span>Desa Lainungan</span>
          </h1>
        </section>

        {/* SECTION 2: Image Left, Text Right, Slide Effect */}
        <section 
          ref={slideRef}
          className={`${styles.slideSection} ${inView ? 'inView' : ''}`}
        >
          <div className={styles.slideContent}>
            <div className={styles.slideImage}>
              <Image
                src="/images/sanggara_pappe.png"
                alt="Makanan khas"
                width={400}
                height={400}
                style={{ objectFit: "contain" }}
                className={styles.roundedImage}
                priority
              />
            </div>
            <div className={styles.slideText}>
              <h2 className={styles.slideTitle}>Sanggara Pappe</h2>
              <p className={styles.slideDesc}>
                Sanggara Pappe adalah makanan khas Desa Lainungan yang terbuat dari pisang, santan, dan gula merah. Rasanya manis dan gurih, cocok dinikmati bersama keluarga.
              </p>
            </div>
          </div>
          
        </section>
        <section 
          ref={slideRef}
          className={`${styles.slideSection} ${inView ? 'inView' : ''}`}
        >
          <div className={styles.slideContent}>
            <div className={styles.slideImage}>
              <Image
                src="/images/katirisala.png"
                alt="Makanan khas"
                width={400}
                height={400}
                style={{ objectFit: "contain" }}
                className={styles.roundedImage}
                priority
              />
            </div>
            <div className={styles.slideText}>
              <h2 className={styles.slideTitle}>Katirisala</h2>
              <p className={styles.slideDesc}>
                Katirisala adalah kue tradisional khas Bugis, Sulawesi Selatan. Kue ini terbuat dari beras ketan dan gula merah, dengan tekstur berlapis dan rasa manis legit. Katirisala sering disajikan dalam acara-acara adat dan perayaan penting masyarakat Bugis
              </p>
            </div>
          </div>
          
        </section>

        
      </main>
    </>
  )
}
