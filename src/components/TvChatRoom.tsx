"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Mock data types
type User = {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
    preferred_username?: string;
    username?: string;
  };
};

type ChatMessage = {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    username: string | null;
    name: string | null;
    image: string | null;
  };
};

// Mock data
const MOCK_USER: User = {
  id: "123456",
  email: "user@example.com",
  user_metadata: {
    avatar_url: "/default_avatar.png",
    name: "Demo User",
    username: "demouser",
  },
};

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    content: "Hello everyone! Welcome to the TV Chat Room!",
    createdAt: new Date(Date.now() - 3600000),
    user: {
      id: "admin1",
      username: "admin",
      name: "Admin",
      image: "/default_avatar.png",
    },
  },
  {
    id: 2,
    content: "This is a cool retro TV design!",
    createdAt: new Date(Date.now() - 1800000),
    user: {
      id: "user1",
      username: "user1",
      name: "User One",
      image: "/default_avatar.png",
    },
  },
  {
    id: 3,
    content: "This is too legit to quit",
    createdAt: new Date(Date.now() - 900000),
    user: {
      id: "123456",
      username: "demouser",
      name: "Demo User",
      image: "/default_avatar.png",
    },
  },
];

export default function TvChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user and messages
  useEffect(() => {
    const fetchUserAndMessages = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set mock user
      setUser(MOCK_USER);

      // Set mock messages
      setMessages(MOCK_MESSAGES);

      setLoading(false);
    };

    fetchUserAndMessages();

    // Mock real-time subscription - add a new message every 20 seconds
    const interval = setInterval(() => {
      const newMockMessage: ChatMessage = {
        id: Date.now(),
        content: `Random message at ${new Date().toLocaleTimeString()}`,
        createdAt: new Date(),
        user: {
          id: `user${Math.floor(Math.random() * 10)}`,
          username: `user${Math.floor(Math.random() * 10)}`,
          name: `User ${Math.floor(Math.random() * 10)}`,
          image: "/default_avatar.png",
        },
      };

      setMessages((prev) => [...prev, newMockMessage]);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !user) return;

    try {
      // Create mock message
      const mockMessage: ChatMessage = {
        id: Date.now(),
        content: newMessage,
        createdAt: new Date(),
        user: {
          id: user.id,
          username: user.user_metadata?.username || null,
          name: user.user_metadata?.name || null,
          image: user.user_metadata?.avatar_url || null,
        },
      };

      // Add to messages
      setMessages((prev) => [...prev, mockMessage]);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* TV Frame */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
          <div className="bg-gray-900 rounded-lg p-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-white text-sm">LIVE CHAT</div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              </div>
            </div>

            {/* TV Screen with Chat */}
            <div className="bg-black rounded border-4 border-gray-700 relative overflow-hidden">
              {/* Chat messages area */}
              <div className="h-96 overflow-y-auto p-4 relative tv-scanlines">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-pulse text-gray-400">
                      Loading chat...
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="text-gray-400">
                      No messages yet. Be the first to chat!
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="mb-4 flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                          {message.user.image ? (
                            <Image
                              src={message.user.image}
                              alt={message.user.username || "User"}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <span>
                              {(
                                message.user.username?.[0] ||
                                message.user.name?.[0] ||
                                "U"
                              ).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline">
                          <span className="font-bold text-indigo-400">
                            {message.user.username ||
                              message.user.name ||
                              "Anonymous"}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-white break-words">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input area */}
              <div className="border-t border-gray-700 p-3 bg-gray-900">
                {user ? (
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-800 text-white rounded-l px-3 py-2 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r font-medium disabled:opacity-50"
                    >
                      Send
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-2 text-gray-400">
                    <button
                      onClick={handleLogin}
                      className="text-indigo-400 hover:underline"
                    >
                      Sign in
                    </button>{" "}
                    to join the chat
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TV Controls */}
          <div className="flex justify-center space-x-4">
            <div className="w-12 h-4 rounded-full bg-gray-700"></div>
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
          </div>
        </div>

        {/* TV Stand */}
        <div className="mx-auto w-32 h-16 bg-gray-800 clip-tv-stand"></div>
      </div>

      {/* Mock user controls (only for demo) */}
      {user && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white"
          >
            (Mock) Sign out
          </button>
        </div>
      )}
    </div>
  );
}
