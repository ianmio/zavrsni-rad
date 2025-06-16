import { IconProps } from '@types';

const Users = ({
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
        d="M11.25 5.85a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M15 4.6a6.25 6.25 0 1 0 0 10 6.25 6.25 0 1 0 0-10m1.667 1.88c.53.919.833 1.984.833 3.12a6.2 6.2 0 0 1-.833 3.12 3.75 3.75 0 1 0 0-6.238M11.25 19.6A6.25 6.25 0 0 0 5 25.85h12.5a6.25 6.25 0 0 0-6.25-6.25M20 25.85h5a6.25 6.25 0 0 0-7.501-6.125A8.72 8.72 0 0 1 20 25.85m-5-7.908A8.75 8.75 0 0 0 2.5 25.85v1.25c0 .69.56 1.25 1.25 1.25h22.5c.69 0 1.25-.56 1.25-1.25v-1.25A8.75 8.75 0 0 0 15 17.942"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Users;
