import { Link } from 'react-router-dom';
import { Header } from '@components/Header';

const baseParagraphClassname = 'text-lg font-sans';

const ErrorPage: React.FC = () => {
  return (
    <main className="relative max-w-screen-lg min-h-screen sm:pt-8 mx-auto">
      <Header />
      <div className="grid justify-center mx-2 xs:mx-auto w-fit p-8 sm:p-16 bg-white/20 border border-white text-white rounded-3xl cursor-default">
        <h1 className="text-8xl text-center mb-8">404</h1>
        <p className="text-3xl mb-4">Lost in the internet void?</p>
        <p className={baseParagraphClassname}>
          Looks like you're exploring uncharted territory.
        </p>
        <p className={`${baseParagraphClassname} mb-2`}>
          Don't worry, let's get you back on track:
        </p>
        <Link
          className={`${baseParagraphClassname} block w-fit text-logoTheme hover:underline hover:underline-offset-2`}
          aria-label="Return to home page"
          to={'/'}
        >
          Back to safety
        </Link>
      </div>
    </main>
  );
};

ErrorPage.displayName = 'ErrorPage';

export { ErrorPage };
