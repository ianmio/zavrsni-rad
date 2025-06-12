import { IconProps } from '@types';

const Pin = ({ width = 24, height = 24, color = '#E4EAEE' }: IconProps) => (
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
      d="M16.95 6.05a7 7 0 1 0-9.9 9.9l4.244 4.243a1 1 0 0 0 1.413 0l4.243-4.243a7 7 0 0 0 0-9.9M5.636 4.636a9 9 0 0 1 12.728 12.728l-3.502 3.502-.018.018-.723.723a3 3 0 0 1-4.241 0l-4.244-4.243a9 9 0 0 1 0-12.728M12 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Pin;
