import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Images } from '../../../types';

const loader = async () => {
  const imagesCollection = collection(db, 'images');
  const imagesSnapshot = await getDocs(imagesCollection);
  const images: Images = imagesSnapshot.docs
    .map((doc) => {
      const { imagesMap } = doc.data();
      return imagesMap;
    })
    .flat();
  return images;
};

export { loader };
