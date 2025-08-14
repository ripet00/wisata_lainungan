'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './QClayStyle.module.css';

function SceneModel() {
  const { scene } = useGLTF('/models/desa-lainungan.glb'); // You'll need a 3D model
  return <primitive object={scene} />;
}

function ThreeDScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <SceneModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default function QClayStyle() {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const sections = [
    {
      title: "Desa Lainungan",
      subtitle: "Wisata Alam Sidrap",
      content: "Temukan keindahan alam yang masih asli..."
    },
    {
      title: "Budaya Lokal",
      subtitle: "Kearifan Masyarakat",
      content: "Mengenal lebih dekat budaya masyarakat..."
    }
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div className={styles.hero} style={{ scale, opacity }}>
        <ThreeDScene />
        <motion.div className={styles.heroContent} style={{ y }}>
          <h1>DESA LAINUNGAN</h1>
          <p>Kabupaten Sidrap, Sulawesi Selatan</p>
        </motion.div>
      </motion.div>

      {sections.map((section, index) => (
        <motion.section 
          key={index}
          className={styles.section}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        >
          <div className={styles.sectionContent}>
            <h2>{section.title}</h2>
            <h3>{section.subtitle}</h3>
            <p>{section.content}</p>
          </div>
        </motion.section>
      ))}
    </div>
  );
}