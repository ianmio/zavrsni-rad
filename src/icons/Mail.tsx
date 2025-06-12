import { IconProps } from '@types';

const Mail = ({ width = 24, height = 24, color = '#E4EAEE' }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7m2 2.869V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.869l-6.336 4.224a3 3 0 0 1-3.328 0zm16-2.404-7.445 4.963a1 1 0 0 1-1.11 0L4 7.465V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Mail;
