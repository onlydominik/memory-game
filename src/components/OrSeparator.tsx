const OrSeparator: React.FC = () => {
  return (
    <div className="flex items-center my-6 cursor-default">
      <div className="flex-grow border-t border-gray"></div>
      <span className="px-3 text-white font-sans font-medium">or</span>
      <div className="flex-grow border-t border-gray"></div>
    </div>
  );
};

OrSeparator.displayName = 'OrSeparator';

export { OrSeparator };
