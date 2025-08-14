'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import Image from 'next/image'
import Navbar from '@/components/navbar/Navbar'
import styles from './wisata.module.css'
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton'
import Footer from '@/components/Footer'

export default function DetailWisataPage({ id }) {
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  const containerRef = useRef(null)
  const detailsRef = useRef(null)
  const recommendationsRef = useRef(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: isMounted && !loading ? containerRef : null,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(heroScroll, [0, 1], [0, 100])
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0])

  useEffect(() => {
    setIsMounted(true)
    const fetchDestination = async () => {
      try {
        const docRef = doc(db, 'wisata', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setDestination({ id: docSnap.id, ...docSnap.data() })
        } else {
          setError('Destinasi tidak ditemukan.')
        }
      } catch (err) {
        setError('Gagal memuat data destinasi.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDestination()
  }, [id])

  if (loading) return null
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>
  if (!destination) return <div className="text-center p-8">Data tidak ditemukan.</div>

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        {/* Hero Section */}
        <motion.section 
          ref={containerRef}
          className={styles.heroSection}
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src={destination.Image}
            alt={destination.Title}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {destination.Title}
            </motion.h1>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {destination.Place}
            </motion.p>
            <motion.button
              className={styles.heroButton}
              onClick={() => scrollToSection(detailsRef)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Jelajahi Sekarang
            </motion.button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          ref={detailsRef}
          className={styles.aboutSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.aboutContainer}>
            <h2 className={styles.sectionTitle}>Tentang Destinasi</h2>
            <p className={styles.descriptionText}>
              {destination.Description}
            </p>
            <p className={styles.additionalText}>
              Investasi dalam pengalaman wisata di alam menawarkan berbagai keuntungan bagi 
              mereka yang mencari preferensi gaya hidup khusus, kesadaran lingkungan, 
              atau peluang liburan yang unik.
            </p>
          </div>
        </motion.section>

        {/* Map Section */}
        {destination.Gmap && (
          <motion.section
            className={styles.mapSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.mapContainer}>
              <h2 className={styles.sectionTitle}>Lokasi Peta</h2>
              <iframe
                src={destination.Gmap}
                className={styles.mapFrame}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.section>
        )}

        {/* Recommendations Section */}
        
        <WhatsAppFloatingButton/>
        <Footer/>
      </div>
    </>
  )
}