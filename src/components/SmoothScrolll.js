'use client'
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/src/locomotive-scroll.scss'
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const scrollContainerRef = useRef(null)
  const pathname = usePathname();

  useEffect(() => {
    if (!scrollContainerRef.current) return

    const scroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      },
      lerp: 0.05, // Adjust for smoother/more rigid scroll
      multiplier: 0.7, // Scroll speed multiplier
      firefoxMultiplier: 50, // For Firefox
      touchMultiplier: 1.5 // For touch devices
    })

    // Update scroll when images load
    const handleLoad = () => scroll.update()
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      scroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollContainerRef} data-scroll-container>
      {children}
    </div>
  )
}