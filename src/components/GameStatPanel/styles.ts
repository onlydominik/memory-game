const styles = {
  container:
    'xl:absolute xl:left-[-7rem] grid gap-3 justify-center w-full xs:max-w-[30rem] xl:w-max px-4 py-4 bg-white/10 border-white border-[0.08rem] rounded-xl shadow-smoothShadow',
  timerContainer: (isPending: boolean) => `
      text-center content-center xl:py-14 h-[3rem] xl:h-[10rem] text-white 
      ${isPending ? 'text-2xl' : 'text-5xl'}
    `,
  statsContainer:
    'flex justify-center gap-10 py-4 px-6 sm:px-20 xl:px-6 xl:mb-12 text-xl text-gameStatPanel-textSecondary bg-gameStatPanel-bgAccent rounded-xl shadow-smoothShadow',
  statItem: 'grid justify-items-center',
};

export { styles };
