import Image from "next/image";
import Link from "next/link";

export default function CardDestinasi({ title, image }) {
  return (
    <div className="rounded shadow hover:shadow-lg transition overflow-hidden bg-white">
      <Image 
        src={image} 
        alt={title} 
        width={400} 
        height={160} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Link href="/destinasi" className="text-blue-500 text-sm">
          Lihat Selengkapnya
        </Link>
      </div>
    </div>
  );
}
