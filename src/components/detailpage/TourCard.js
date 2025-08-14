import Link from 'next/link'
import styles from './TourCard.module.css'

export default function TourCard({ tour }) {
  return (
    <Link href={`/tour/${tour.id}`} className={styles.tourCard}>
      <h2>{tour.title}</h2>
      <ul>
        {tour.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Link>
  )
}