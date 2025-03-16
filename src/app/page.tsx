import CreatePostForm from "@/components/CreatePostForm";
import Navigation from "@/components/Navigation";
import { Suspense } from "react";
import { api } from "src/trpc/server";
import PostCard from "@/components/PostCard";

export default async function HomePage() {
  // In a real app, you would fetch posts from your database
  // and get the current user from your auth system
  const posts = await api.post.getHomepageFeed();

  console.log(posts);

  return (
    <main>
      <Navigation user={null} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="sr-only">
          KpopShowdown: The Ultimate K-Pop Moments Archive
        </h1>

        <CreatePostForm user={null} />

        <div className="space-y-4">
          <Suspense
            fallback={<div className="text-center py-10">Loading posts...</div>}
          >
            {posts?.map((post) => <PostCard key={post.id} post={post} />)}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
