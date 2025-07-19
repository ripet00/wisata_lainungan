import Link from "next/link";

const destinasiList = [
  {
    title: "Sumur 7 Bidadari",
    slug: "sumur-7-bidadari",
    image: "/images/sumur7bidadari.jpeg",
  },
  {
    title: "Bukit Macaya",
    slug: "bukit-macaya",
    image: "/images/macaya.jpg",
  },
  {
    title: "Kincir Angin",
    slug: "kincir-angin",
    image: "/images/kincir.jpg",
  },
];

export default function DestinasiPreview() {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Wisata Unggulan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {destinasiList.map((d) => (
          <Link key={d.slug} href={`/destinasi/${d.slug}`}>
            <div className="rounded overflow-hidden shadow hover:shadow-lg transition">
              <img src={d.image} alt={d.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{d.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}