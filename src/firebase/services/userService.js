import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
