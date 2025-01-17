const loader = async () => {
  const res = await fetch('http://localhost:3000/highscores');
  return res;
};

export { loader };
