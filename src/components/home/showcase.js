'use client'
import styles from './showcase.module.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import WhatsAppFloatingButton from '../WhatsAppFloatingButton'

export default function Showcase() {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  
  // Scroll progress untuk section utama (bekerja dua arah)
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Scroll progress untuk grid section (bekerja dua arah)
  const { scrollYProgress: gridScrollProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  })

  // Animasi yang bekerja dua arah (scroll up dan down)
  const y = useTransform(mainScrollProgress, [0, 1], [-50, 50]) // Nilai lebih dinamis
  const opacity = useTransform(mainScrollProgress, 
    [0, 0.5, 1], 
    [1, 0.5, 1] // Opacity akan berubah saat scroll up dan down
  )

  const gridY = useTransform(gridScrollProgress, [0, 1], [-50, 50])
  const gridOpacity = useTransform(gridScrollProgress, 
    [0, 0.5, 1], 
    [0.5, 1, 0.5] // Akan terlihat saat scroll up dan down
  )

  // Variants untuk animasi masuk yang lebih dinamis
  const container = {
    hidden: { opacity: 0 },
    show: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: i * 0.1,
        when: "beforeChildren"
      }
    })
  }

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        restDelta: 0.001
      }
    }
  }

  const gridItem = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        repeatType: "reverse" // Animasi akan bekerja dua arah
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        ref={containerRef}
        className={styles.main}
        style={{ opacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "0px 0px -100px 0px" }} // once: false agar animasi terus bekerja
          className={styles.hero}
        >
          <motion.div style={{ y }}>
            <motion.h1 
              className={styles.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={item}
            >
              <motion.span variants={item}>DESA</motion.span>
              <motion.span variants={item}>LAINUNGAN</motion.span>
            </motion.h1>
          </motion.div>

          <motion.div 
            className={styles.divider}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={item}
          />

          <motion.p 
            className={styles.description}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={item}
          >
            Kec. Watang Pulu, Kab. Sidenreng Rappang, Provinsi Sulawesi Selatan
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Grid Section */}
      <motion.section
        ref={gridRef}
        className={styles.gridSection}
        style={{ opacity: gridOpacity }}
      >
        <motion.div 
          className={styles.gridContainer}
          style={{ y: gridY }}
        >
          {/* Grid Left - Image */}
          <motion.div
            className={styles.gridLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            variants={container}
          >
            <motion.div variants={gridItem}>
              <div
                className="relative w-full max-w-xl mx-auto"
                style={{
                  minHeight: "520px", // Lebih tinggi dari sebelumnya
                  height: "520px",    // Pastikan tinggi tetap
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* Mask wrapper */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  style={{
                    WebkitMaskImage: "url('/images/torn_paint2.png')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskImage: "url('/images/torn_paint2.png')",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    height: "500px", // Mask lebih tinggi
                    width: "110%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/peta_lainungan.jpg"
                    alt="Desa Lainungan"
                    width={500}
                    height={500} // Sesuaikan dengan tinggi mask
                    style={{ objectFit: "contain" }}
                    className="w-full h-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>


          {/* Grid Right - Text */}
          <motion.div 
            className={styles.gridRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={container}
          >
            <motion.h2 variants={gridItem} className={styles.gridTitle}>
              Tentang Desa Lainungan
            </motion.h2>
            <motion.p variants={gridItem} className={styles.gridText}>
              Desa Lainungan adalah sebuah desa yang terletak di Kecamatan Watang Pulu, Kabupaten Sidenreng Rappang, Sulawesi Selatan, Indonesia. Desa ini memiliki tiga dusun: Dusun I Kulua, Dusun II Makkadae, dan Dusun III Toddang Paberre. Sebagian besar penduduk Desa Lainungan berprofesi sebagai petani
            </motion.p>
            <motion.p variants={gridItem} className={styles.gridText}>
              Dengan udara yang sejuk dan panorama pegunungan.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={gridRef}
        className={styles.gridSection}
        style={{ opacity: gridOpacity }}
      >
        <motion.div
          className={styles.gridContainer}
          style={{ y: gridY }}
        >
          {/* Grid Left */}
          <motion.div
            className={styles.gridLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={container}
          >
            <motion.h2 variants={gridItem} className={styles.gridTitle}>
              Mata Pencaharian Utama
            </motion.h2>
            <motion.p variants={gridItem} className={styles.gridText}>
              Desa Lainungan menawarkan panorama pegunungan yang memukau dan udara yang sejuk. Kondisi alam yang subur ini menjadikan pertanian sebagai denyut nadi kehidupan masyarakat.
            </motion.p>
            <motion.p variants={gridItem} className={styles.gridText}>
              Sebagian besar penduduknya adalah pekebun jagung yang handal. Hamparan ladang jagung yang hijau dan subur tidak hanya menjadi sumber mata pencaharian utama, tetapi juga pemandangan khas yang menenangkan jiwa.
            </motion.p>
          </motion.div>

          {/* Grid Right - Image */}
          <motion.div
            className={styles.gridRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            variants={container}
          >
            <motion.div variants={gridItem}>
              <div
                className="relative w-full max-w-xl mx-auto"
                style={{
                  minHeight: "520px", // Lebih tinggi dari sebelumnya
                  height: "520px",    // Pastikan tinggi tetap
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* Mask wrapper */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  style={{
                    WebkitMaskImage: "url('/images/torn_paint.png')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskImage: "url('/images/torn_paint.png')",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    height: "550px", // Mask lebih tinggi
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/kebun_jagung.jpeg"
                    alt="Desa Lainungan"
                    width={500}
                    height={500} 
                    style={{ objectFit: "contain" }}
                    className="w-full h-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        ref={gridRef}
        className={styles.gridSection}
        style={{ opacity: gridOpacity }}
      >
        <motion.div 
          className={styles.gridContainer}
          style={{ y: gridY }}
        >
          {/* Grid Left - Image */}
          <motion.div
            className={styles.gridLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "0px 0px -100px 0px" }}
            variants={container}
          >
            <motion.div variants={gridItem}>
              <div
                className="relative w-full max-w-xl mx-auto"
                style={{
                  minHeight: "520px", // Lebih tinggi dari sebelumnya
                  height: "520px",    // Pastikan tinggi tetap
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* Mask wrapper */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{
                    duration: 1,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  style={{
                    WebkitMaskImage: "url('/images/torn_paint.png')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskImage: "url('/images/torn_paint.png')",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    height: "500px", // Mask lebih tinggi
                    width: "110%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/bukit.jpg"
                    alt="Desa Lainungan"
                    width={500}
                    height={500} // Sesuaikan dengan tinggi mask
                    style={{ objectFit: "contain" }}
                    className="w-full h-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Grid Right - Text */}
          <motion.div 
            className={styles.gridRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={container}
          >
            <motion.h2 variants={gridItem} className={styles.gridTitle}>
              Kondisi Geografis
            </motion.h2>
            <motion.p variants={gridItem} className={styles.gridText}>
              Keadaan geografis Desa Lainungan adalah dataran tinggi dengan ketinggian 35m dpl di atas permukaan laut, suhu udara rata-rata 25 – 26 derajat Celcius.
            </motion.p>
            <motion.p variants={gridItem} className={styles.gridText}>
              Kondisi geografisnya meliputi pemanfaatan kawasan untuk industri, pergudangan, dan pembangkitan energi listrik, selain juga lahan pertanian dan perkebunan yang digarap oleh penduduk setempat
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>
      <WhatsAppFloatingButton/>            
    </>
  )
}