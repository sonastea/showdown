import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileNav: React.FC<{
  isActive: boolean;
  toggleActive: Function;
  toggleForm: Function;
}> = ({ isActive, toggleActive, toggleForm }) => {
  return (
    <>
      <div className="w-full sm:hidden p-4 top-0 text-right bg-inherit">
        <button
          className="mobile-menu-toggle"
          onClick={() => toggleActive((open: boolean) => !open)}
        >
          <svg
            className="w-8 h-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isActive ? "flex" : "hidden"
        } z-50 min-h-full min-w-full backdrop-blur-sm sm:hidden absolute justify-end right-0`}
        onClick={() => toggleActive((open: boolean) => !open)}
      >
        <button className="absolute right-6 top-6 w-4 h-4 text-white">
          <Image
            src="/x_mark_white.svg"
            layout="fill"
            alt="Toggle mobile nav"
          />
        </button>
        <div
          id="mobileNav"
          className={`shadow-slate-300 shadow-md w-1/2 place-items-end bg-slate-500`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="self-end mt-32">
            <div className="flex flex-col items-end space-y-5 w-full text-white">
              <div className="border-slate-400 border-t mb-8 w-full" />
              <button
                className="flex justify-between w-full mr-2"
                onClick={() => {
                  toggleForm(true);
                  toggleActive(false);
                }}
              >
                <span className="ml-10">Submit Meme</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 11 15 14" />
                </svg>
              </button>
              <div className="flex justify-between relative w-full mr-2">
                <Link href="/results">
                  <a className="ml-10"> Results</a>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4v3m-4 -3v6m8 -6v6" />
                  <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
