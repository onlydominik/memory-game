import styles from './Loader.module.css';
interface Loader {
  size: 'sm' | 'lg';
  color: 'light' | 'dark';
  className?: string;
}

const Loader = ({ size, color, className }: Loader) => {
  const classNameSize = size === 'sm' ? 'border-4 w-4' : 'border-8 w-20';
  const classNameColor = color === 'light' ? 'border-white' : 'border-black';
  return (
    <div
      className={`${styles.loader} ${classNameSize} ${classNameColor} ${className}`}
    ></div>
  );
};

export default Loader;
