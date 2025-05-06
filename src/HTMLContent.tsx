import React from 'react';

const HTMLContent: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="md:absolute top-0 left-0 w-full flex justify-between items-center py-4 px-15">
        <button className="rounded-lg bg-secondary hover:animate-wiggle-more hover:animate-infinite">
          <img src="R_200x200.png" alt="Logo" className="w-10 h-10" />
        </button>
        <div className="flex gap-4">
          <button className="rounded-lg p-1 py-1 bg-secondary hover:bg-gray-400 active:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          </button>
          <button className="rounded-lg p-1 bg-secondary hover:bg-gray-400 active:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row overflow-auto">
        <div className="flex justify-center items-center p-6 h-1/2 h-auto md:w-1/2">
          <div className="flex flex-col items-center items-start md:text-left space-y-2 select-none">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">Hi, my</div>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">name is Renato.</div>
            <div className="text-sm sm:text-base md:text-lg opacity-80 font-normal">Full Stack Developer</div>
          </div>
        </div>
        <div className="flex-1" />
      </div>

      {/* Footer */}
      <footer className="text-center py-2">
        Renato.S
      </footer>
    </div>
  );
};

export default HTMLContent;
