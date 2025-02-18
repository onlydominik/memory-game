import { Link } from 'react-router-dom';

const LevelNotFound = () => {
  const baseParagraphClassname = 'text-lg font-sans';
  return (
    <main className="relative max-w-screen-lg min-h-screen sm:pt-8 mx-auto">
      <div className="grid justify-center mx-2 xs:mx-auto w-fit p-8 sm:p-16 bg-white/20 border border-white text-white rounded-3xl cursor-default">
        <h1 className="text-8xl text-center mb-8">: (</h1>
        <p className="text-3xl mb-4">
          Looks like this level is lost in action!
        </p>
        <p className={baseParagraphClassname}>
          This level is hiding... or maybe it never existed!
        </p>

        <Link
          className={`${baseParagraphClassname} text-base mt-8 block w-fit text-logoTheme hover:underline hover:underline-offset-2`}
          aria-label="Return to home page"
          to={'/'}
        >
          Back to Main Menu
        </Link>
      </div>
    </main>
  );
};

export { LevelNotFound };
