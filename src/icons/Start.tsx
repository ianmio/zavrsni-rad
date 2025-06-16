import { IconProps } from '@types';

const Start = ({ color = '#F53F76', width = 20, height = 20, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        stroke={color}
        strokeWidth="3.2"
        d="M8.595 24.675V6.063c0-.723.8-1.158 1.407-.767l14.517 9.358a1.6 1.6 0 0 1 0 2.69l-13.457 8.674c-1.065.687-2.467-.078-2.467-1.344Z"
      ></path>
    </svg>
  );
};

export default Start;
