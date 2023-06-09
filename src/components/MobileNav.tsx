import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const MobileNav: React.FC<{ toggleForm: Function }> = ({ toggleForm }) => {
  const [isActive, setActive] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <div className="w-full sm:hidden pt-4 px-4 top-0 text-right bg-inherit">
        <button
          className="mobile-menu-toggle"
          onClick={() => setActive((open: boolean) => !open)}
          aria-label="Toggle mobile nav"
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
        onClick={() => setActive((open: boolean) => !open)}
      >
        <button className="absolute right-6 top-6">
          <XMarkIcon className="w-6 h-6 text-slate-100 hover:text-slate-300" />
        </button>
        <div
          id="mobileNav"
          className={`rounded-l-md shadow-slate-500 shadow-md w-2/3 flex place-items-end bg-slate-500 overflow-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="self-center w-full">
            <div className="border-slate-400/40 border-t mb-8 w-full absolute top-[6rem]" />
            <nav className="flex flex-col items-end space-y-4 w-full text-slate-100">
              <ul className="flex flex-col items-end w-full space-y-4">
                <li
                  className={`${
                    router.pathname === "/" ? "bg-slate-700/20 " : ""
                  }flex flex-wrap justify-between relative w-full group rounded-r-xl mr-2 py-1`}
                >
                  <Link
                    className="group-hover:text-slate-300 ml-10"
                    href="/"
                  >
                    Home
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
                    className="mr-10 sm:mr-6 group-hover:text-once-300"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>
                </li>
                <li className="flex flex-wrap justify-between w-full group mr-2">
                  <button
                    className="flex flex-wrap justify-between w-full cursor-default"
                    onClick={() => {
                      setActive(false);
                      toggleForm(true);
                    }}
                  >
                    <span className="ml-10 cursor-pointer group-hover:text-slate-300">
                      Submit Meme
                    </span>
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
                      className="mr-10 sm:mr-6 group-hover:text-mina-300"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <line x1="12" y1="11" x2="12" y2="17" />
                      <polyline points="9 14 12 11 15 14" />
                    </svg>
                  </button>
                </li>
                <li
                  className={`${
                    router.pathname === "/results" ? "bg-slate-700/20 " : ""
                  }flex flex-wrap justify-between relative w-full group rounded-r-xl mr-2 py-1`}
                >
                  <Link
                    className="ml-10 group-hover:text-slate-300"
                    href="/results"
                  >
                    Results
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
                    className="mr-10 group-hover:text-yellow-300"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 4v3m-4 -3v6m8 -6v6" />
                    <path d="M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
                  </svg>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
