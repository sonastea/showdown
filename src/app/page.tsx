import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import CreatePostForm from '@/components/CreatePostForm';
import PostCard from '@/components/PostCard';

const MOCK_USER = {
  id: '1',
  name: 'K-Pop Fan',
  image: null,
};

const MOCK_POSTS = [
  {
    id: 1,
    title: "TWICE's \"The Feels\" Reaches 300 Million Views!",
    content: "TWICE's English single \"The Feels\" has officially surpassed 300 million views on YouTube! This is a huge milestone for the group. What do you think about their English tracks?",
    imageUrl: 'https://i.ytimg.com/vi/f5_wn8mexmM/maxresdefault.jpg',
    createdAt: new Date(2025, 2, 10),
    author: {
      id: '2',
      name: 'TWICE_Fan',
      username: 'twice_forever',
      image: null,
    },
    _count: {
      comments: 24,
      votes: 156,
    },
    userVote: 1,
    tags: ['TWICE', 'TheFeels', 'MusicVideo'],
    category: 'Music',
  },
  {
    id: 2,
    title: 'Unpopular Opinion: 4th Gen Stage Presence',
    content: 'I think 4th gen groups are focusing too much on complex choreography at the expense of genuine stage presence and audience interaction. What do you think? Is technique overtaking charisma?',
    imageUrl: null,
    createdAt: new Date(2025, 2, 13),
    author: {
      id: '3',
      name: 'K-Pop Critic',
      username: 'kpop_thoughts',
      image: null,
    },
    _count: {
      comments: 87,
      votes: 42,
    },
    userVote: null,
    tags: ['4thGen', 'Discussion', 'StageTalk'],
    category: 'Fandom Debates',
  },
  {
    id: 3,
    title: 'My first BLACKPINK concert experience!',
    content: "I just got back from my first ever BLACKPINK concert and I'm still processing everything! The energy was unreal, and Lisa's solo stage had me in tears. Has anyone else seen them live recently?",
    imageUrl: 'https://i.ytimg.com/vi/daRKtATemKo/maxresdefault.jpg',
    createdAt: new Date(2025, 2, 14, 8, 30),
    author: {
      id: '4',
      name: 'BLINK4Life',
      username: 'bp_forever',
      image: null,
    },
    _count: {
      comments: 32,
      votes: 128,
    },
    userVote: null,
    tags: ['BLACKPINK', 'Concert', 'Experience'],
    category: 'Personal Stories',
  },
];

export default function HomePage() {
  // In a real app, you would fetch posts from your database
  // and get the current user from your auth system
  
  return (
    <main>
      <Navigation user={MOCK_USER} />
      
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="sr-only">KpopShowdown: The Ultimate K-Pop Moments Archive</h1>
        
        <CreatePostForm user={MOCK_USER} />
        
        <div className="space-y-4">
          <Suspense fallback={<div className="text-center py-10">Loading posts...</div>}>
            {MOCK_POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </Suspense>
        </div>
      </div>
    </main>
  );
}