const loader = async () => {
  const res = await fetch('http://localhost:3000/images');
  return res;
};

export { loader };
