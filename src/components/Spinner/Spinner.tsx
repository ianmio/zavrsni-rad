import { cn } from '@utils/tailwind';

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        'animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-black-100 rounded-full',
        className
      )}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
