import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { GameContextProvider } from '../context/GameContext';

const RootLayout = () => {
  return (
    <div className="max-w-screen-lg min-h-screen sm:pt-8 mx-auto">
      <Header />
      <GameContextProvider>
        <Outlet />
      </GameContextProvider>
    </div>
  );
};

export default RootLayout;
