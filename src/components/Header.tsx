import { Logo } from './common/Logo/Logo';
import { NavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavigationLink = ({ to, children }: NavLinkProps) => {
  const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return `w-min text-lg sm:text-xl ${
      isActive
        ? 'underline underline-offset-8 decoration-1 text-header-textAccent hover:text-header-textAccent/100'
        : 'text-header-text hover:text-logoTheme/70'
    }`;
  };

  return (
    <NavLink to={to} className={getNavLinkClassName}>
      {children}
    </NavLink>
  );
};

const Header = () => {
  return (
    <header
      className="flex flex-col items-center gap-4 sm:gap-0 pb-3 sm:pb-8 mb-8 mx-auto max-w-2xl bg-header-bg rounded-b-3xl sm:rounded-3xl border border-dar"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="w-3/4 max-w-xs py-2 pb-3 text-center shadow-smoothShadow bg-header-logoBg rounded-b-[3rem]">
        <Logo isLink={true} />
      </div>
      <div className="flex gap-12 flex-col xs:flex-row sm:justify-between sm:px-10 sm:mt-[-1rem] sm:w-full">
        <NavigationLink to={'/'} aria-label="Challenges">
          CHALLENGES
          <span className="sr-only">Play memory game challenges</span>
        </NavigationLink>
        <NavigationLink to={'/highscores'} aria-label="Highscores">
          HIGHSCORES
          <span className="sr-only">View game highscores</span>
        </NavigationLink>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
