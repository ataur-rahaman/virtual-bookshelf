import React from "react";

const SliderThree = () => {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-sky-50 dark:from-slate-900 dark:to-slate-900 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Watch Your Reading Journey Grow.{" "}
            <span className="text-sky-600 dark:text-sky-400">
              and feel happy.
            </span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 mb-6">
            Tired of scattered book lists? Build your own digital bookshelf to
            track what you've read, what you're reading, and what's next — all
            in one clean, user-friendly space.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2072/2072163.png"
            alt="Bookshelf illustration"
            className="w-80 h-auto drop-shadow-xl dark:invert"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderThree;
