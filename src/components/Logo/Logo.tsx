import { memo } from 'react';
import { Link } from 'react-router-dom';

import './logoStyles.css';
export const Logo = memo(
  ({ isLink }: { isLink: boolean }) => {
    return isLink ? (
      <Link
        to={'/'}
        className="block w-full text-2xl sm:text-3xl textLogoColor"
        aria-label="Home"
      >
        MIND MELD
      </Link>
    ) : (
      <p className="text-center text-5xl sm:text-6xl textLogoColor">
        MIND MELD
      </p>
    );
  },
  (prevProps, nextProps) => prevProps.isLink === nextProps.isLink
);
