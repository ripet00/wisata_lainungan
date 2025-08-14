import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-6">
          <Image
            src="/images/icon_unhas.png"
            alt="Logo Unhas"
            width={40}
            height={40}
            className="object-contain"
          />
          <Image
            src="/images/icon_kkn.png"
            alt="Logo KKN"
            width={40}
            height={40}
            className="object-contain"
          />
          <Image
            src="/images/icon_lainungan.png"
            alt="Logo Lainungan"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Wisata Lainungan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
