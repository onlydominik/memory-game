import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StartScreen, {
  action as startScreenAction,
} from './pages/StartScreen/StartScreen.tsx';
import RootLayout from './pages/RootLayout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
