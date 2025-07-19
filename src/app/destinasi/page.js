import CardDestinasi from "../../components/CardDestinasi";
export default function Destinasi() {
  const destinasi = [
    { slug: "sumur-7-bidadari", title: "Sumur 7 Bidadari", image: "/images/sumur.jpg" },
    { slug: "bukit-macaya", title: "Bukit Macaya", image: "/images/macaya.jpg" },
    { slug: "kincir-angin", title: "Kincir Angin", image: "/images/kincir.jpg" },
  ];
  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {destinasi.map((d) => (
        <CardDestinasi key={d.slug} {...d} />
      ))}
    </div>
  );
}