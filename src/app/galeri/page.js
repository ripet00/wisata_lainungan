export default function Galeri() {
  const images = [
    "/images/galeri1.jpg",
    "/images/galeri2.jpg",
    "/images/sumur.jpg",
  ];
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <img key={i} src={img} alt="Galeri" className="rounded shadow" />
      ))}
    </div>
  );
}