import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts
import RootLayout from '@/layouts/RootLayout';

// Components
import { ErrorPage } from '@components/ErrorPage';
import { RedirectIfLoggedIn } from '@components/RedirectIfLoggedIn';
import { FallbackElement } from '@components/HydrateFallbackElement';
import { ProtectedRoute } from '@components/ProtectedRoute';

// Context
import { AuthProvider } from '@context/AuthContext/AuthContext';

// Lazy loaded components
const Login = lazy(() => import('@features/auth/pages/Login'));
const Register = lazy(() => import('@features/auth/pages/Register'));
const LevelPickerPanel = lazy(
  () => import('@features/game/pages/LevelPickerPanel')
);
const GamePanel = lazy(() => import('@features/game/pages/GamePanel'));
const HighscoresScreen = lazy(
  () => import('@features/highscores/pages/HighscoresScreen')
);

// Loaders
import { loader as PlayAreaLoader } from '@features/game/loaders/PlayArea.loader';
import { loader as HighscoresScreenLoader } from '@features/highscores/loaders/HighscoresScreen.loader';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <FallbackElement />,
    children: [
      {
        path: '',
        element: (
          <ProtectedRoute>
            <LevelPickerPanel />
          </ProtectedRoute>
        ),
      },
      {
        path: 'highscores',
        element: (
          <ProtectedRoute>
            <HighscoresScreen />
          </ProtectedRoute>
        ),
        loader: HighscoresScreenLoader,
      },
      {
        path: 'level/:difficulty',
        element: (
          <ProtectedRoute>
            <GamePanel />
          </ProtectedRoute>
        ),
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
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
