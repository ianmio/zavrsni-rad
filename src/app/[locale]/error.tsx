'use client';

type ErrorPageProps = {
  error: {
    message: string;
  };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <main className="h-[100vh] flex items-center justify-center text-[#454553]">
      <div className="flex flex-col items-center justify-center max-w-[568px] w-full px-6 text-center">
        <p className="md:text-[32px] md:leading-[40px] text-[24px] leading-[30px] font-light italic md:mb-2 uppercase mb-8">
          something went wrong
        </p>
        <h1 className="font-flood md:text-[200px] md:leading-[200px] text-[160px] leading-[112px] md:mb-0 mb-2">
          oops!
        </h1>
        <p className="md:text-[20px] md:leading-[32px] text-[16px] leading-[25.6px] font-light tracking-[-0.02em] md:-mt-12 md:mb-8 mb-2">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="bg-[#454553] hover:bg-[#5a5a6b] active:bg-[#3a3a49] cursor-pointer h-[50px] text-center flex justify-center items-center text-white-100 text-base tracking-[-0.02em] font-light max-w-[400px] w-full"
        >
          Try again!
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
