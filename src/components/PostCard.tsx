"use client";

import CommentModal from "@/components/CommentModal";
import Avatar from "@/components/ui/Avatar";
import { formatDate, formatNumber } from "@/lib/utils";
import type { PostData } from "@/server/api/trpc";
import Link from "next/link";
import { useState } from "react";

export default function PostCard({ post }: { post: PostData }) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const voteCount = post._count.votes;

  if (!post) return null;

  return (
    <>
      <div className="border border-slate-200 rounded-lg p-4 mb-4 bg-white hover:bg-slate-50 transition-colors">
        <div className="flex items-start gap-3">
          <Link href={`/profile/${post.author.id}`}>
            <Avatar
              src={post.author.image}
              alt={post.author.name || "User"}
              size="md"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.author.id}`}
                className="font-semibold text-slate-900 hover:underline"
              >
                {post.author.name || "Anonymous"}
              </Link>

              <span className="text-slate-500 text-sm">
                @{post.author.username || "user"}
              </span>

              <span className="text-slate-400 text-sm">·</span>

              <span className="text-slate-500 text-sm">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <div className="mt-1">
              <h3 className="font-bold text-lg text-slate-900 mb-1">
                {post.title}
              </h3>
              <p className="text-slate-700 line-clamp-3">{post.content}</p>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center gap-6 mt-4 text-slate-500">
              <VoteButtons voteCount={voteCount} userVote={null} />

              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="flex items-center gap-2 hover:text-slate-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>{formatNumber(post._count.comments)}</span>
              </button>

              <button className="flex items-center gap-2 hover:text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isCommentModalOpen && (
        <CommentModal
          postTitle={post.title}
          postAuthor={post.author}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </>
  );
}

function VoteButtons({
  voteCount,
  userVote,
}: {
  voteCount: number;
  userVote?: number | null;
}) {
  // In a real app, you would handle the voting logic here
  // with server actions or API calls

  return (
    <div className="flex items-center">
      <button
        className={`p-1 rounded hover:bg-slate-100 ${userVote === 1 ? "text-orange-500" : ""}`}
        aria-label="Upvote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={userVote === 1 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
      </button>

      <span className="mx-2 font-medium">{formatNumber(voteCount)}</span>

      <button
        className={`p-1 rounded hover:bg-slate-100 ${userVote === -1 ? "text-blue-500" : ""}`}
        aria-label="Downvote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={userVote === -1 ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 5 7 7-7 7"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
    </div>
  );
}
