"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";

type CreatePostFormProps = {
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
};

export default function CreatePostForm({ user }: CreatePostFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the post data to your API
    console.log("Submitting post:", { title, content, tags, category });

    // Reset form
    setTitle("");
    setContent("");
    setTags("");
    setCategory("");
    setIsExpanded(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      {!isExpanded ? (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <Avatar src={user.image} alt={user.name || "User"} size="md" />
          <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-slate-500 hover:bg-slate-200">
            What&apos;s on your mind?
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 mb-4">
            <Avatar src={user.image} alt={user.name || "User"} size="md" />
            <span className="font-medium">{user.name || "Anonymous"}</span>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />

            <textarea
              placeholder="What do you want to share?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TWICE, NewJeans, Discussion"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="Music">Music</option>
                  <option value="Performance">Performance</option>
                  <option value="News">News</option>
                  <option value="Fandom Debates">Fandom Debates</option>
                  <option value="Personal Stories">Personal Stories</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
