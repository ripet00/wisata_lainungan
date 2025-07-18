'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './TimedCards.module.css';
import { cardData } from '../data/cardData';

const TimedCards = () => {
  const[activeIndex,setActiveIndex] = useState(0);
  const orderRef = useRef(Array.from({ length: cardData.length}, (_, i) => i));
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const detailsEvenRef = useRef(true);
  const isAnimatingRef = useRef(false);

  // Inisialisasi variabel
  const init = () => {
    const { innerHeight: height, innerWidth: width } = window;
    const offsetTop = height - 430;
    const offsetLeft = width - 830;
    const cardWidth = 200;
    const cardHeight = 300;
    const gap = 40;
    const numberSize = 50;
    const [active, ...rest] = orderRef.current;
    
    // Set posisi awal
    gsap.set(`.${styles.card}`, { opacity: 0 });
    gsap.set(`.${styles.details}`, { opacity: 0 });
    
    // Set kartu aktif
    gsap.set(`#card${active}`, {
      x: 0,
      y: 0,
      width: '100%',
      height: '100vh',
      opacity: 1,
      zIndex: 20
    });

    // Set kartu lainnya
    rest.forEach((i, index) => {
      gsap.set(`#card${i}`, {
        x: offsetLeft + index * (cardWidth + gap),
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        opacity: 1,
        zIndex: 30,
        borderRadius: 10
      });
    });

    // Animasi masuk
    gsap.to('.cover', {
      x: width + 400,
      duration: 1,
      ease: 'sine.inOut',
      onComplete: startAnimation
    });
  };

  const startAnimation = () => {
    animationRef.current = setInterval(step, 5000);
  };

  const step = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    orderRef.current.push(orderRef.current.shift());

    detailsEvenRef.current = !detailsEvenRef.current;

    const [active, ...rest] = orderRef.current;
    setActiveIndex(active);
    const prv = rest[rest.length - 1];
    const { innerHeight: height, innerWidth: width } = window;
    const offsetTop = height - 430;
    const offsetLeft = width - 830;
    const cardWidth = 200;
    const cardHeight = 300;
    const gap = 40;

    // Animasi kartu aktif
    gsap.to(`#card${active}`, {
      x: 0,
      y: 0,
      width: '100%',
      height: '100vh',
      borderRadius: 0,
      duration: 1,
      ease: 'sine.inOut',
      onComplete: () => {
        // Reset kartu sebelumnya
        gsap.set(`#card${prv}`, {
          x: offsetLeft + (rest.length - 1) * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: 10,
          zIndex: 30
        });
        isAnimatingRef.current = false;
      }
    });

    // Animasi kartu lainnya
    rest.forEach((i, index) => {
      if (i !== prv) {
        gsap.to(`#card${i}`, {
          x: offsetLeft + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          duration: 1,
          ease: 'sine.inOut',
          delay: 0.1 * (index + 1)
        });
      }
    });
  };

  useEffect(() => {
    // Jalankan hanya di client side
    if (typeof window !== 'undefined') {
      init();

      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current);
        }
        gsap.killTweensOf('*');
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Cover untuk animasi awal */}
      <div className={`cover ${styles.cover}`}></div>
      
      {/* Kartu-kartu destinasi */}
      {cardData.map((item, index) => (
        <div
          key={index}
          id={`card${index}`}
          className={styles.card}
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className={styles.cardContent} id={`card-content-${index}`}>
            <div className={styles.contentStart}></div>
            <div className={styles.contentPlace}>{item.place}</div>
            <div className={styles.contentTitle1}>{item.title}</div>
            <div className={styles.contentTitle2}>{item.title2}</div>
          </div>
        </div>
      ))}
      
      {/* Detail destinasi */}
      <div className={`${styles.details} ${styles.detailsEven}`} id="details-even">
        <div className={styles.placeBox}>
          <div className={styles.text}>{cardData[0].place}</div>
        </div>
        <div className={styles.titleBox1}><div className={styles.title1}>{cardData[0].title}</div></div>
        <div className={styles.titleBox2}><div className={styles.title2}>{cardData[0].title2}</div></div>
        <div className={styles.desc}>{cardData[0].description}</div>
        <div className={styles.cta}>
          <button className={styles.bookmark}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          </button>
          <button className={styles.discover}>Lihat Destinasi</button>
        </div>
      </div>

      {/* Navigasi */}
      <div className={styles.pagination} id="pagination">
        <div className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => step()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => step()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className={styles.progressSubContainer}>
          <div className={styles.progressSubBackground}>
            <div className={styles.progressSubForeground}></div>
          </div>
        </div>
        <div className={styles.slideNumbers} id="slide-numbers">
          {orderRef.current.map((cardIdx, idx) => (
            <div
              key={cardIdx}
              className={`${styles.item} ${cardIdx === activeIndex ? styles.activeItem : ''}`}
              id={`slide-item-${cardIdx}`}
            >
              {cardIdx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimedCards;