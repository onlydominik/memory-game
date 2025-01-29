import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login/Login.tsx';
import RootLayout from './pages/RootLayout.tsx';
import LevelPickerPanel from './pages/LevelPickerPanel/LevelPickerPanel.tsx';
import { loader as PlayAreaLoader } from './pages/GamePanel/PlayArea/PlayArea.loader.tsx';
import { loader as HighscoresScreenLoader } from './pages/HighscoresScreen/HighscoresScreen.loader.tsx';
import GamePanel from './pages/GamePanel/GamePanel.tsx';
import HighscoresScreen from './pages/HighscoresScreen/HighscoresScreen.tsx';
import Fallback from './components/Fallback.tsx';

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
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
