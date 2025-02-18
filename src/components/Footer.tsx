import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

const Footer: React.FC = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    try {
      setIsLoading(true);
      const { doSignOut } = await import('@services/firebase/auth');
      await doSignOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  return (
    <footer className="md:absolute inset-x-0 bottom-5 font-sans text-xs text-center text-white cursor-default opacity-70">
      <div className="mb-8">
        {currentUser && currentUser.isAnonymous
          ? 'You are playing as a guest'
          : `Logged as ${currentUser?.displayName}`}
        {', '}
        <button
          onClick={onClickHandler}
          className="hover:text-logoTheme underline"
          disabled={isLoading}
        >
          {currentUser && currentUser.isAnonymous ? 'log in' : 'sign out'}
        </button>
        {currentUser && currentUser.isAnonymous && (
          <p className="text-logoTheme" role="alert" aria-live="polite">
            Your highscores are not being saved in the highscore table.
          </p>
        )}
      </div>

      <p>&copy; {currentYear} MIND MELD Dominik Kowalczyk</p>
      <p className="text-gray">
        <span className="sr-only">Credit: </span>Icons by Icons8
      </p>
    </footer>
  );
};

Footer.displayName = 'Footer';

export { Footer };
