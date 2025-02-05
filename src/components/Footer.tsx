import { useAuth } from '../hooks/useAuth';

const Footer = () => {
  const { currentUser } = useAuth();

  const onClickHandler = async () => {
    const { doSignOut } = await import('../firebase/auth');
    await doSignOut();
  };

  return (
    <footer className="md:absolute inset-x-0 bottom-5 font-sans text-xs text-center text-white cursor-default opacity-70">
      <div className="mb-8">
        {currentUser.isAnonymous
          ? 'You are playing as a guest'
          : `Logged as ${currentUser.displayName}`}
        {', '}
        <button
          onClick={onClickHandler}
          className="hover:text-logoTheme underline"
        >
          {currentUser.isAnonymous ? 'log in' : 'sign out'}
        </button>
        {currentUser.isAnonymous && (
          <p className="text-logoTheme">
            Your highscores are not being saved in the highscore table.
          </p>
        )}
      </div>

      <p>&copy; 2025 MIND MELD Dominik Kowalczyk</p>
      <p className="text-gray">Icons by Icons8</p>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
