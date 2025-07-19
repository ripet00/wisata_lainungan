import Link from "next/link";

export default function GaleriPreview() {
  const previewImages = [
    "/images/galeri1.jpg",
    "/images/galeri2.jpg",
    "/images/sumur.jpg",
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Galeri Desa</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {previewImages.map((src, idx) => (
          <img key={idx} src={src} alt="Galeri" className="rounded shadow" />
        ))}
      </div>
      <Link
        href="/galeri"
        className="text-blue-600 hover:underline font-medium"
      >
        Lihat semua galeri →
      </Link>
    </section>
  );
}