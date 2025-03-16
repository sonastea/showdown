"use client";

import Link from "next/link";
import { useState } from "react";
import Avatar from "@/components/ui/Avatar";

type NavigationProps = {
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
};

export default function Navigation({ user }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">
                KpopShowdown
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-blue-500 text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/trending"
                className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Trending
              </Link>
              <Link
                href="/categories"
                className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Categories
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <Avatar
                        src={user.image}
                        alt={user.name || "User"}
                        size="sm"
                      />
                    </button>
                  </div>

                  {isProfileMenuOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        href={`/profile/${user.id}`}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        role="menuitem"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          // Handle sign out logic here
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    href="/auth/signin"
                    className="text-slate-500 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/trending"
            className="border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Trending
          </Link>
          <Link
            href="/categories"
            className="border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
        </div>

        {user ? (
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar src={user.image} alt={user.name || "User"} size="md" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800">
                  {user.name}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href={`/profile/${user.id}`}
                className="block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                className="w-full text-left block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Handle sign out logic here
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="flex items-center justify-around">
              <Link
                href="/auth/signin"
                className="text-slate-500 hover:text-slate-800 px-4 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
