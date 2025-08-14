import Image from 'next/image';

export default function WhatsAppFloatingButton() {
  const whatsappNumber = '6285397904282';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-green-800 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white">
        
        {/* Teks Call to Action */}
        <div>
          <h2 className="text-2xl font-bold">Butuh Bantuan atau Ingin Tanya?</h2>
          <p className="text-lg opacity-90">
            Hubungi kami langsung melalui WhatsApp, kami siap membantu Anda.
          </p>
        </div>

        {/* Tombol WhatsApp */}
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Image 
            src="/images/whatsapp.png" 
            alt="WhatsApp" 
            width={30} 
            height={30}
          />
          <span>Chat Sekarang</span>
        </a>
      </div>
    </section>
  );
}
