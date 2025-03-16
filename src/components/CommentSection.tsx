"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";

type Comment = {
  id: number;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  _count: {
    votes: number;
  };
  userVote?: number | null;
  replies?: Comment[];
};

type CommentSectionProps = {
  comments: Comment[];
  postId: number;
};

export default function CommentSection({
  comments,
  postId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the comment to the server here
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Discussion</h2>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add to the discussion..."
          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} level={0} />
          ))
        ) : (
          <p className="text-slate-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

type CommentThreadProps = {
  comment: Comment;
  level: number;
};

function CommentThread({ comment, level }: CommentThreadProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the reply to the server here
    console.log("Submitting reply:", replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div
      className={`${level > 0 ? "ml-6 pl-4 border-l-2 border-slate-200" : ""}`}
    >
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Link href={`/profile/${comment.author.id}`}>
            <Avatar
              src={comment.author.image}
              alt={comment.author.name || "User"}
              size="sm"
            />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/profile/${comment.author.id}`}
                className="font-semibold text-slate-900 hover:underline"
              >
                {comment.author.name || "Anonymous"}
              </Link>

              <span className="text-slate-500 text-xs">
                @{comment.author.username || "user"}
              </span>

              <span className="text-slate-400 text-xs">·</span>

              <span className="text-slate-500 text-xs">
                {formatDate(comment.createdAt)}
              </span>
            </div>

            <div className="text-slate-700 whitespace-pre-wrap">
              {comment.content}
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
              <CommentVoteButtons
                commentId={comment.id}
                voteCount={comment._count.votes}
                userVote={comment.userVote}
              />

              <button
                onClick={() => setIsReplying(!isReplying)}
                className="hover:text-slate-700"
              >
                Reply
              </button>

              {comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="hover:text-slate-700"
                >
                  {showReplies
                    ? "Hide replies"
                    : `Show replies (${comment.replies.length})`}
                </button>
              )}
            </div>

            {isReplying && (
              <form onSubmit={handleSubmitReply} className="mt-3">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsReplying(false)}
                    className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyContent.trim()}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentVoteButtons({
  commentId,
  voteCount,
  userVote,
}: {
  commentId: number;
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
          width="16"
          height="16"
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

      <span className="mx-1 font-medium">{formatNumber(voteCount)}</span>

      <button
        className={`p-1 rounded hover:bg-slate-100 ${userVote === -1 ? "text-blue-500" : ""}`}
        aria-label="Downvote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
