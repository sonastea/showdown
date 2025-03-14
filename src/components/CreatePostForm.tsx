'use client'

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Image from "next/image";

type CreatePostFormProps = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
};

export default function CreatePostForm({ user }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTagAdd = () => {
    const tag = tagInput.trim().replace(/\s+/g, "");
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the image to Supabase Storage
      // and submit the post data to your API
      console.log({
        title,
        content,
        tags,
        category,
        imageFile,
        authorId: user.id
      });
      
      // Reset form after successful submission
      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
      setCategory("");
      setImageFile(null);
      setImagePreview(null);
      setIsExpanded(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      {!isExpanded ? (
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <Avatar 
            src={user.image} 
            alt={user.name || "User"} 
            size="md" 
          />
          <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-slate-500 hover:bg-slate-200">
            What&apos;s on your mind?
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-3">
            <Avatar 
              src={user.image} 
              alt={user.name || "User"} 
              size="md" 
            />
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening in the K-pop world?"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                required
              />
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    disabled={!tagInput.trim()}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                >
                  <option value="">Select a category (optional)</option>
                  <option value="Iconic Moments">Iconic Moments</option>
                  <option value="Fandom Debates">Fandom Debates</option>
                  <option value="Personal Stories">Personal Stories</option>
                  <option value="News">News</option>
                  <option value="Performances">Performances</option>
                  <option value="Music">Music</option>
                </select>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                
                {imagePreview && (
                  <div className="relative w-full h-40 mb-3 border border-slate-200 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-slate-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
