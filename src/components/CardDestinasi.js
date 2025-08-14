export default function CardDestinasi({ title, image }) {
  return (
    <div className="rounded shadow hover:shadow-lg transition overflow-hidden bg-white">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Link href="/destinasi" className="text-blue-500 text-sm">
          Lihat Selengkapnya
        </Link>
      </div>
    </div>
  );
}
