import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StartScreen, {
  action as startScreenAction,
} from './pages/StartScreen/StartScreen.tsx';
import RootLayout from './pages/RootLayout.tsx';
import LevelPickerPanel from './pages/LevelPickerPanel/LevelPickerPanel.tsx';
import { loader as LevelPickerPanelLoader } from './pages/LevelPickerPanel/LevelPickerPanel.loader.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <LevelPickerPanel />,
        loader: LevelPickerPanelLoader,
      },
    ],
  },
  {
    path: '/start',
    element: <StartScreen />,
    action: startScreenAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
