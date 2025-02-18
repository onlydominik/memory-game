import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Header } from '@components/Header';
import { GameProvider } from '@context/GameContext/GameContext';
import { ProtectedRoute } from '@components/ProtectedRoute';
import nProgress from 'nprogress';

const RootLayout = () => {
  const { state } = useNavigation();
  useEffect(() => {
    if (state === 'loading') {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [state]);

  return (
    <div className="relative max-w-screen-lg min-h-screen sm:pt-8 pb-10 mx-auto">
      <Header />
      <ProtectedRoute>
        <GameProvider>
          <Outlet />
        </GameProvider>
      </ProtectedRoute>
    </div>
  );
};

export default RootLayout;
