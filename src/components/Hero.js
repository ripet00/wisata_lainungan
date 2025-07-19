export default function Hero() {
  return (
    <div className="relative bg-cover bg-center h-[60vh]" style={{ backgroundImage: "url('/images/bukit.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Jelajahi Alam Lainungan</h1>
          <p className="mt-2 text-xl">Asli, Alami, Meninggikan</p>
          <a href="/destinasi" className="mt-4 inline-block bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white">
            Lihat Destinasi
          </a>
        </div>
      </div>
    </div>
  );
}
