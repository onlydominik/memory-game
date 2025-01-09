import { colorVariants } from './PlayAreaCard.colors';
import styles from './PlayArea.module.css';
const PlayAreaCard = ({
  imageUrl,
  color,
}: {
  imageUrl: string;
  color: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center w-full  aspect-square bg-white ${colorVariants[color]} border-2 md:border-3 xl:border-4 rounded-lg ${styles.PlayAreaCard}`}
    >
      <img width="40" height="40" className="w-3/4 md:w-1/2" src={imageUrl} />
    </div>
  );
};

export default PlayAreaCard;
