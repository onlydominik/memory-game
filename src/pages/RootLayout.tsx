import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { GameProvider } from '../context/GameContext';

const RootLayout = () => {
  return (
    <div className="relative max-w-screen-lg min-h-screen sm:pt-8 pb-10 mx-auto">
      <Header />
      <GameProvider>
        <Outlet />
      </GameProvider>
    </div>
  );
};

export default RootLayout;
