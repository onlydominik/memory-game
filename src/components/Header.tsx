import { Logo } from './Logo/Logo';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const navLinkBaseStyles = 'w-min text-lg sm:text-xl text-header-text';

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return `${navLinkBaseStyles} ${
      isActive
        ? 'underline underline-offset-8 decoration-1 text-header-textAccent'
        : ''
    }`;
  };

  return (
    <header
      className="flex flex-col items-center gap-4 sm:gap-0 pb-3 sm:pb-8 mx-auto max-w-2xl bg-header-bg rounded-b-3xl sm:rounded-3xl"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="w-3/4 max-w-xs py-2 pb-3 text-center shadow-logoShadow bg-header-logoBg rounded-b-[3rem]">
        <Logo isLink={true} />
      </div>
      <div className="flex gap-12 flex-col xs:flex-row sm:justify-between sm:px-10 sm:mt-[-1rem] sm:w-full">
        <NavLink
          to={'/'}
          className={getNavLinkClassName}
          aria-label="Challenges"
        >
          CHALLENGES
        </NavLink>
        <NavLink
          to={'/highscores'}
          className={getNavLinkClassName}
          aria-label="Highscores"
        >
          HIGHSCORES
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
