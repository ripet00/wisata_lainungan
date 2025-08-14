'use client'
import { useEffect } from 'react'

export default function useScrollEffects() {
  useEffect(() => {
    // Re-initialize scroll on route change
    const handleRouteChange = () => {
      if (window.locomotiveScroll) {
        window.locomotiveScroll.update()
      }
    }

    // Add any custom scroll effects here
    const setupScrollEffects = () => {
      // Example: Add class when element is in view
      const scroll = window.locomotiveScroll
      if (scroll) {
        scroll.on('scroll', (args) => {
          // Custom scroll effects logic
        })
      }
    }

    window.addEventListener('load', setupScrollEffects)
    window.addEventListener('routeChange', handleRouteChange)

    return () => {
      window.removeEventListener('load', setupScrollEffects)
      window.removeEventListener('routeChange', handleRouteChange)
    }
  }, [])
}