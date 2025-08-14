// components/LoadingSkeleton.js
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen bg-gray-200 animate-pulse"></div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}