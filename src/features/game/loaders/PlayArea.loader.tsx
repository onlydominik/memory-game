import { collection, getDocs } from 'firebase/firestore';
import { db } from '@services/firebase/firebase';
import questionMark from '/icons/question-mark.png';
import type { Images } from '@typings/index';

interface ImageDocument {
  imagesMap: Images;
}

/**
 * Loads images from Firestore collection
 * @returns {Promise<Images>} Array of image objects
 * @throws {Error} If loading fails
 */

const loader = async (): Promise<Images> => {
  try {
    const imagesCollection = collection(db, 'images');
    const imagesSnapshot = await getDocs(imagesCollection);

    if (imagesSnapshot.empty) {
      throw new Error('No images found in collection');
    }

    const images: Images = imagesSnapshot.docs
      .map((doc): Images => {
        const data = doc.data() as ImageDocument;
        if (!data.imagesMap) {
          throw new Error(`Invalid document data in document ${doc.id}`);
        }
        return data.imagesMap;
      })
      .flat();

    const imagePromises = images.map((image) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = image.path;
        img.onload = () => resolve();
        img.onerror = () => reject(`Failed to load image: ${image.path}`);
      });
    });

    const questionMarkPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = questionMark;
      img.onload = () => resolve();
      img.onerror = () => reject('Failed to load question mark image');
    });

    await Promise.all([...imagePromises, questionMarkPromise]);

    return images;
  } catch (error) {
    console.error('Error loading images:', error);
    throw error;
  }
};

export { loader };
