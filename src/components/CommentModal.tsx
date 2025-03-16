"use client";

import { useState, useEffect, useRef } from "react";
import { formatDate, formatNumber } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";

type Comment = {
  id: number;
  content: string;
  createdAt: Date | string;
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

type CommentModalProps = {
  postTitle: string;
  postAuthor: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  onClose: () => void;
};

// Mock comments for demonstration
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    content:
      "I completely agree! Their English tracks have been getting better with each release.",
    createdAt: new Date(2025, 2, 12),
    author: {
      id: "5",
      name: "Music Lover",
      username: "melody_fan",
      image: null,
    },
    _count: {
      votes: 24,
    },
    userVote: 1,
    replies: [
      {
        id: 3,
        content:
          "I think 'The Feels' is their best English track so far. The chorus is so catchy!",
        createdAt: new Date(2025, 2, 12, 14, 30),
        author: {
          id: "7",
          name: "Pop Music Expert",
          username: "chart_watcher",
          image: null,
        },
        _count: {
          votes: 8,
        },
        userVote: null,
      },
    ],
  },
  {
    id: 2,
    content:
      "I'm hoping they release more English tracks in the future. It's great to see them reaching a wider audience.",
    createdAt: new Date(2025, 2, 11),
    author: {
      id: "6",
      name: "Global Fan",
      username: "worldwide_once",
      image: null,
    },
    _count: {
      votes: 15,
    },
    userVote: null,
  },
];

export default function CommentModal({
  postTitle,
  postAuthor,
  onClose,
}: CommentModalProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // In a real app, you would submit to the server here
    // using the postId to associate the comment with the post
    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      createdAt: new Date(),
      author: {
        id: "1", // Current user ID
        name: "K-Pop Fan",
        username: "kpop_enthusiast",
        image: null,
      },
      _count: {
        votes: 0,
      },
      userVote: null,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col"
      >
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">{postTitle}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Avatar
              src={postAuthor.image}
              alt={postAuthor.name || "User"}
              size="sm"
            />
            <span className="font-semibold">
              {postAuthor.name || "Anonymous"}
            </span>
            <span className="text-slate-500 text-sm">
              @{postAuthor.username || "user"}
            </span>
          </div>

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

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the reply to the server here
    // using the comment.id to associate the reply with the parent comment
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
          <Avatar
            src={comment.author.image}
            alt={comment.author.name || "User"}
            size="sm"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-900">
                {comment.author.name || "Anonymous"}
              </span>

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
  voteCount,
  userVote,
}: {
  voteCount: number;
  userVote?: number | null;
}) {
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
