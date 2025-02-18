import { Header } from '@components/Header';
import { Loader } from '@components/common/Loader/Loader';

const FallbackElement = () => {
  return (
    <div className="relative max-w-screen-lg min-h-screen sm:pt-8 pb-10 mx-auto">
      <Header />
      <Loader size="lg" color="dark" />
    </div>
  );
};

export { FallbackElement };
