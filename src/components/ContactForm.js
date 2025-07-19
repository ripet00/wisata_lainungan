export default function ContactForm() {
  return (
    <form className="flex flex-col gap-4 max-w-lg mx-auto">
      <input type="text" placeholder="Nama" className="border p-2 rounded" required />
      <input type="email" placeholder="Email" className="border p-2 rounded" required />
      <textarea placeholder="Pesan" className="border p-2 rounded h-32" required></textarea>
      <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Kirim
      </button>
    </form>
  );
}