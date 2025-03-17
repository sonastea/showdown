"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock user type
type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    name?: string;
    username?: string;
  };
};

// Mock user data
const MOCK_USER: User = {
  id: "123456",
  email: "user@example.com",
  user_metadata: {
    avatar_url: "/default_avatar.png",
    name: "Demo User",
    username: "demouser",
  },
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate getting user from localStorage
    const savedUser = localStorage.getItem("mockUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user:", e);
      }
    }
  }, []);

  const handleSignOut = async () => {
    // Mock sign out
    localStorage.removeItem("mockUser");
    setUser(null);
    setIsMenuOpen(false);
  };

  // Mock sign in function (for demo purposes)
  const handleMockSignIn = () => {
    setUser(MOCK_USER);
    localStorage.setItem("mockUser", JSON.stringify(MOCK_USER));
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">kpopshowdown</span>
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center">
                      {user.user_metadata?.avatar_url ? (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.user_metadata.avatar_url}
                          alt=""
                          width={32}
                          height={32}
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      {user.email}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleMockSignIn}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Mock Login
                </button>
                <Link
                  href="#"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
