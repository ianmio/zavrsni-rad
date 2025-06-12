import { IconProps } from '@types';

const Call = ({ width = 24, height = 24, color = '#E4EAEE' }: IconProps) => (
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
      d="M2 5a3 3 0 0 1 3-3h3.28a2 2 0 0 1 1.897 1.368l1.497 4.493a2 2 0 0 1-1.002 2.421l-1.357.679a10.06 10.06 0 0 0 3.724 3.724l.679-1.357a2 2 0 0 1 2.421-1.002l4.494 1.497A2 2 0 0 1 22 15.721V19a3 3 0 0 1-3 3h-1C9.163 22 2 14.837 2 6zm3-1a1 1 0 0 0-1 1v1c0 7.732 6.268 14 14 14h1a1 1 0 0 0 1-1v-3.28l-4.493-1.497-1.13 2.257a1 1 0 0 1-1.305.465 12.04 12.04 0 0 1-6.017-6.017 1 1 0 0 1 .465-1.306l2.257-1.129L8.28 4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Call;
