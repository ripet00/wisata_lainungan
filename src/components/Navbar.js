import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-700">
          Jelajah Lainungan
        </Link>
        <div className="flex gap-4 text-gray-700 font-medium">
          <Link href="/destinasi" className="hover:text-green-600">Destinasi</Link>
          <Link href="/galeri" className="hover:text-green-600">Galeri</Link>
          <Link href="/tentang" className="hover:text-green-600">Tentang</Link>
          <Link href="/kontak" className="hover:text-green-600">Kontak</Link>
        </div>
      </div>
    </nav>
  );
}