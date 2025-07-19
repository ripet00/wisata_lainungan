export default function Kontak() {
  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Hubungi Kami</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nama" className="border p-2 rounded" />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <textarea placeholder="Pesan" className="border p-2 rounded h-32" />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Kirim</button>
      </form>
    </div>
  );
}