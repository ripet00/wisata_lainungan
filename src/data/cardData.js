// src/data/cardData.js
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function fetchCardData () {
  const querySnapshot = await getDocs(collection(db, "wisata"));
  const data = querySnapshot.docs.map(doc => {
    const docData = doc.data();
    return {
      id: doc.id,
      place: docData.Place,         // Mengubah "Place" dari Firestore menjadi "place"
      title: docData.Title,         // Mengubah "Title" dari Firestore menjadi "title"
      description: docData.Description, // Mengubah "Description" menjadi "description"
      image: docData.Image 
    };
  });
  return data;
}



// export const cardData = [
//   {
//     place: 'Desa Lainungan',
//     title: 'BUJUNG',
//     title2: 'PITUE',
//     description: 'Gunung Sumur7 menawarkan pemandangan alam yang memukau dengan ketinggian yang menantang. Destinasi ini populer bagi pendaki pemula dan profesional.',
//     image: '/images/bujungpitue.jpg'
//   },
//   {
//     place: 'Macaya',
//     title: 'Tempat',
//     title2: 'MACAYA',
//     description: 'Air terjun dengan ketinggian 50 meter yang dikelilingi oleh hutan tropis yang lebat. Suasana sejuk dan aliran air yang jernih membuatnya menjadi tempat yang sempurna untuk relaksasi.',
//     image: '/images/kincirhighland.png'
//   },
//   {
//     place: 'Lainungan',
//     title: 'TAMAN',
//     title2: 'NONA-NONA',
//     description: 'Taman rest area Lainungan',
//     image: '/images/nonanona.jpg'
//   },
//   {
//     place: 'Kincir Angin Tradisional',
//     title: 'KINCIR',
//     title2: 'TRADISIONAL',
//     description: 'Kincir angin tradisional yang masih beroperasi untuk mengairi sawah. Merupakan warisan budaya dan teknologi lokal yang patut dilestarikan.',
//     image: '/images/kincir.webp'
//   },
//   {
//     place: 'Bukit Macaya',
//     title: 'Macaya',
//     title2: '',
//     description: 'Bukit di lainungan',
//     image: '/images/macaya.jpg'
//   },
//   {
//     place: 'Hawai',
//     title: 'Pantai',
//     title2: 'Pasir Putih',
//     description: 'Indah',
//     image: '/images/travel.jpeg'
//   }
//   // Tambahkan data destinasi lainnya sesuai kebutuhan
// ];