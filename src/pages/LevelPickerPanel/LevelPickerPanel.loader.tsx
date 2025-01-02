const loader = async () => {
  const res = await fetch('http://localhost:3000/challenges');
  return res;
};

export { loader };
