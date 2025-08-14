// app/detailwisata/[id]/page.js
import { Suspense } from 'react'
import DetailWisataPage from './clientcomponent'
import LoadingSkeleton from '@/components/LoadingSkeleton' // Create this component

export default function Page({ params }) {
  const { id } = params

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DetailWisataPage id={id} />
    </Suspense>
  )
}