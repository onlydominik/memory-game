const LevelPickerPanelLoadingCard = () => {
  return (
    <article className="bg-white/40 flex flex-col justify-between h-[18rem] sm:h-[23rem] rounded-lg border border-white opacity-50">
      <div className="grid gap-10 md:gap-20 h-full p-4 animate-pulse">
        <div className="text-lg flex items-baseline">
          <div className="h-10 w-10 bg-white rounded-full mr-2"></div>
          <div className="w-24 h-6 bg-white rounded"></div>
        </div>

        <div className="flex gap-2 w-max justify-self-center items-center justify-center">
          <div className="h-10 w-10 bg-white rounded-full "></div>
          <div className="h-10 w-10 bg-white rounded-full"></div>
          <div className="h-10 w-10 bg-white rounded-full"></div>
        </div>

        <div className="text-lg flex items-center">
          <div className="w-32 h-6 bg-white rounded"></div>
        </div>
      </div>

      <div className="block w-full text-center animate-pulse">
        <div className="w-full h-[3rem] bg-white/50 rounded"></div>
      </div>
    </article>
  );
};

export default LevelPickerPanelLoadingCard;
