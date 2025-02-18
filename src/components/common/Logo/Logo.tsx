import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface LogoProps {
  isLink: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isLink }) => {
  return isLink ? (
    <Link
      to={'/'}
      className={`block w-full text-2xl sm:text-3xl ${styles.textLogoColor}`}
      aria-label="Home"
    >
      MIND MELD
    </Link>
  ) : (
    <p
      className={`text-center text-5xl sm:text-6xl cursor-default ${styles.textLogoColor}`}
    >
      MIND MELD
    </p>
  );
};

export default memo(Logo, (prev, next) => prev.isLink === next.isLink);
