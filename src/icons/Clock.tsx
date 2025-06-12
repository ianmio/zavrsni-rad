import { IconProps } from '@types';

const Clock = ({
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
        d="M15 5.85c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10m-12.5 10c0-6.903 5.596-12.5 12.5-12.5s12.5 5.597 12.5 12.5c0 6.904-5.596 12.5-12.5 12.5S2.5 22.754 2.5 15.85M15 9.6c.69 0 1.25.56 1.25 1.25v4.482l3.384 3.384a1.25 1.25 0 0 1-1.768 1.768l-3.75-3.75a1.25 1.25 0 0 1-.366-.884v-5c0-.69.56-1.25 1.25-1.25"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Clock;
