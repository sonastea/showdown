// API utility functions for fetching data from the backend

/**
 * Fetch all posts with their details
 */
export async function fetchPosts() {
  const response = await fetch('/api/posts');
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

/**
 * Fetch a single post by ID
 */
export async function fetchPost(postId: number) {
  const response = await fetch(`/api/posts/${postId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
}

/**
 * Fetch comments for a post
 */
export async function fetchComments(postId: number) {
  const response = await fetch(`/api/posts/${postId}/comments`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
}

/**
 * Submit a vote for a post or comment
 */
export async function submitVote(data: {
  userId: string;
  postId?: number;
  commentId?: number;
  value: number;
}) {
  const response = await fetch('/api/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit vote');
  }
  
  return response.json();
}

/**
 * Get a user's vote for a post or comment
 */
export async function getUserVote(userId: string, postId?: number, commentId?: number) {
  const params = new URLSearchParams();
  params.append('userId', userId);
  
  if (postId) {
    params.append('postId', postId.toString());
  }
  
  if (commentId) {
    params.append('commentId', commentId.toString());
  }
  
  const response = await fetch(`/api/votes?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to get user vote');
  }
  
  return response.json();
}

/**
 * Create a new post
 */
export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
  category?: string;
}) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
}

/**
 * Create a new comment
 */
export async function createComment(data: {
  content: string;
  postId: number;
  authorId: string;
  parentId?: number;
}) {
  const response = await fetch(`/api/posts/${data.postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create comment');
  }
  
  return response.json();
}
