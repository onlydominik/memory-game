import { doSignOut } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';

const Footer = () => {
  const { currentUser } = useAuth();
  return (
    <footer className="absolute inset-x-0 bottom-5 font-sans text-xs text-center text-white cursor-default opacity-70">
      <div className="mb-8">
        Logged as {currentUser.displayName}
        {', '}
        <button onClick={doSignOut} className="hover:text-logoTheme underline">
          sign out
        </button>
      </div>

      <p>&copy; 2025 MIND MELD Dominik Kowalczyk</p>
      <p className="text-gray">Icons by Icons8</p>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
