import Navbar from "@/components/Navbar";
import TvChatRoom from "@/components/TvChatRoom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome to kpopshowdown
        </h1>

        <TvChatRoom />

        <div className="mt-12 text-center text-gray-400 max-w-2xl mx-auto">
          <p className="mb-4">
            Join the conversation in our retro TV chat room!
          </p>
          <p className="text-sm">
            This is a mock implementation with simulated authentication and
            messaging. Click &quot;Mock Login&quot; in the navigation bar to
            simulate signing in, and then you can send messages in the chat
            room.
          </p>
        </div>
      </div>
    </main>
  );
}
