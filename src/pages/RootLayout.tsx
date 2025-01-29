import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { GameProvider } from '../context/GameContext';
import { AuthProvider, ProtectedRoute } from '../context/AuthContext';

const RootLayout = () => {
  return (
    <div className="relative max-w-screen-lg min-h-screen sm:pt-8 pb-10 mx-auto">
      <Header />
      <AuthProvider>
        <ProtectedRoute>
          <GameProvider>
            <Outlet />
          </GameProvider>
        </ProtectedRoute>
      </AuthProvider>
    </div>
  );
};

export default RootLayout;
