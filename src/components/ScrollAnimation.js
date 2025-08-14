'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollAnimation({ children, velocity = 0.1, threshold = 0.2 }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animasi yang lebih smooth dengan easing
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * velocity], {
    clamp: false
  });

  const opacity = useTransform(scrollYProgress, 
    [0, threshold, 1], 
    [1, 1, 0],
    { clamp: false }
  );

  const scale = useTransform(scrollYProgress, 
    [0, 0.5, 1], 
    [1, 1.05, 1],
    { clamp: false }
  );

  return (
    <motion.div 
      ref={ref}
      style={{ 
        y,
        opacity,
        scale,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}
    >
      {children}
    </motion.div>
  );
}