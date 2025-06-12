import { IconProps } from '@types';

const Money = ({
  color = '#F53F76',
  width = 20,
  height = 20,
  className,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 30 31"
      className={className}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M2.5 9.6a3.75 3.75 0 0 1 3.75-3.75h12.5A3.75 3.75 0 0 1 22.5 9.6v1.25h1.25a3.75 3.75 0 0 1 3.75 3.75v7.5a3.75 3.75 0 0 1-3.75 3.75h-12.5A3.75 3.75 0 0 1 7.5 22.1v-1.25H6.25A3.75 3.75 0 0 1 2.5 17.1zM10 22.1c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25h-12.5c-.69 0-1.25.56-1.25 1.25zm10-11.25h-8.75A3.75 3.75 0 0 0 7.5 14.6v3.75H6.25c-.69 0-1.25-.56-1.25-1.25V9.6c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25zm-2.5 6.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-3.75 1.25a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Money;
