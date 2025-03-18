import Navbar from "@/components/Navbar";
import AuthenticatedTvChatRoom from "@/components/AuthenticatedTvChatRoom";
import UserProfile from "@/components/UserProfile";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome to kpopshowdown
        </h1>

        <div className="mb-8">
          <AuthenticatedTvChatRoom />
        </div>

        <div className="max-w-md mx-auto mb-8">
          <UserProfile />
        </div>

        <div className="mt-8 text-center text-gray-400 max-w-2xl mx-auto">
          <p className="mb-4">
            Join the conversation in our retro TV chat room!
          </p>
          <p className="text-sm">Sign in to participate in the chat.</p>
        </div>
      </div>
    </main>
  );
}
