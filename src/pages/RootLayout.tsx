import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
  return (
    <>
      <div className="max-w-screen-lg min-h-screen sm:pt-8 mx-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
