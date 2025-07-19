import { notFound } from "next/navigation";
const data = {
  "sumur-7-bidadari": {
    title: "Sumur 7 Bidadari",
    description: "Sumur legendaris dengan 7 sumber air alami di tengah alam yang asri.",
    image: "/images/sumur.jpg",
  },
  "bukit-macaya": {
    title: "Bukit Macaya",
    description: "Nikmati panorama perbukitan dan sunrise yang memukau.",
    image: "/images/macaya.jpg",
  },
  "kincir-angin": {
    title: "Kincir Angin",
    description: "Spot unik dengan pemandangan ala Belanda di pedesaan.",
    image: "/images/kincir.jpg",
  },
};

export default function Detail({ params }) {
  const place = data[params.slug];
  if (!place) return notFound();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={place.image} alt={place.title} className="rounded mb-4 w-full" />
      <h1 className="text-2xl font-bold mb-2">{place.title}</h1>
      <p className="text-gray-700">{place.description}</p>
    </div>
  );
}