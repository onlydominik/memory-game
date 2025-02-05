import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './layouts/RootLayout';
import Fallback from './components/Fallback';
import Loader from './components/Loader/Loader';

const Login = lazy(() => import('./pages/auth/Login/Login'));
const Register = lazy(() => import('./pages/auth/Register/Register'));
const LevelPickerPanel = lazy(
  () => import('./pages/LevelPickerPanel/LevelPickerPanel')
);
const GamePanel = lazy(() => import('./pages/GamePanel/GamePanel'));
const HighscoresScreen = lazy(
  () => import('./pages/HighscoresScreen/HighscoresScreen')
);

import { loader as PlayAreaLoader } from './pages/GamePanel/PlayArea/PlayArea.loader';
import { loader as HighscoresScreenLoader } from './pages/HighscoresScreen/HighscoresScreen.loader';
import { AuthProvider, RedirectIfLoggedIn } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Fallback />,
    children: [
      {
        path: '',
        element: <LevelPickerPanel />,
      },
      {
        path: 'highscores',
        element: <HighscoresScreen />,
        loader: HighscoresScreenLoader,
      },
      {
        path: 'level/:difficulty',
        element: <GamePanel />,
        loader: PlayAreaLoader,
      },
    ],
  },
  {
    path: 'login',
    element: (
      <RedirectIfLoggedIn>
        <Login />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: 'signup',
    element: (
      <RedirectIfLoggedIn>
        <Register />
      </RedirectIfLoggedIn>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Loader size="lg" color="light" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
