import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import { posts } from "../schema";

export const postsData = [
  {
    id: 1,
    title: 'TWICE\'s "The Feels" Reaches 300 Million Views!',
    content:
      'TWICE\'s English single "The Feels" has officially surpassed 300 million views on YouTube! This is a huge milestone for the group. What do you think about their English tracks?',
    authorId: 2,
    createdAt: new Date("2025-03-10T09:15:00Z"),
    updatedAt: new Date("2025-03-10T09:15:00Z"),
    category: "Music",
  },
  {
    id: 2,
    title: "Unpopular Opinion: 4th Gen Stage Presence",
    content:
      "I think 4th gen groups are focusing too much on complex choreography at the expense of genuine stage presence and audience interaction. What do you think? Is technique overtaking charisma?",
    authorId: 3,
    createdAt: new Date("2025-03-08T14:30:00Z"),
    updatedAt: new Date("2025-03-08T14:30:00Z"),
    category: "Fandom Debates",
  },
  {
    id: 3,
    title: "My first BLACKPINK concert experience!",
    content:
      "I just got back from my first ever BLACKPINK concert and I'm still processing everything! The energy was unreal, and Lisa's solo stage had me in tears. Has anyone else seen them live recently?",
    authorId: 4,
    createdAt: new Date("2025-03-05T18:45:00Z"),
    updatedAt: new Date("2025-03-05T18:45:00Z"),
    category: "Personal Stories",
  },
  {
    id: 4,
    title: 'NewJeans breaks another record with \"OMG\"',
    content:
      "NewJeans' 'OMG' has become the fastest 4th gen girl group song to reach 500 million streams on Spotify! Their impact on the industry in such a short time is incredible.",
    authorId: 1,
    createdAt: new Date("2025-03-01T11:20:00Z"),
    updatedAt: new Date("2025-03-01T11:20:00Z"),
    category: "News",
  },
  {
    id: 5,
    title: 'Red Velvet\'s "Feel My Rhythm" is a masterpiece',
    content:
      "I can't stop listening to 'Feel My Rhythm'! The way they incorporated Bach's 'Air on G String' with their signature sound is pure genius. What's your favorite part of the song?",
    authorId: 5,
    createdAt: new Date("2025-02-28T10:10:00Z"),
    updatedAt: new Date("2025-02-28T10:10:00Z"),
    category: "Music",
  },
  {
    id: 6,
    title: "BTS Jin's military discharge countdown begins!",
    content:
      "Only a few months until Jin is discharged from the military! I can't wait to see what he has in store for his return. What do you think BTS will do once all members complete their service?",
    authorId: 1,
    createdAt: new Date("2025-02-25T16:30:00Z"),
    updatedAt: new Date("2025-02-25T16:30:00Z"),
    category: "News",
  },
  {
    id: 7,
    title: "ITZY's new concept photos for comeback",
    content:
      "ITZY just dropped their concept photos for their upcoming comeback and I'm obsessed! The styling is so different from their previous concepts. Are you excited for their new era?",
    authorId: 3,
    createdAt: new Date("2025-02-20T13:45:00Z"),
    updatedAt: new Date("2025-02-20T13:45:00Z"),
    category: "Comeback",
  },
  {
    id: 8,
    title: "Stray Kids world tour announcement!",
    content:
      "Stray Kids just announced their world tour dates! They're coming to 20 cities across Asia, Europe, and North America. Who's planning to attend?",
    authorId: 2,
    createdAt: new Date("2025-02-15T09:30:00Z"),
    updatedAt: new Date("2025-02-15T09:30:00Z"),
    category: "News",
  },
  {
    id: 9,
    title: "aespa's AI concept: Innovative or gimmicky?",
    content:
      "I'm curious about everyone's thoughts on aespa's AI concept. Do you think it adds value to their music and performances, or is it just a marketing gimmick?",
    authorId: 5,
    createdAt: new Date("2025-02-10T14:20:00Z"),
    updatedAt: new Date("2025-02-10T14:20:00Z"),
    category: "Discussion",
  },
  {
    id: 10,
    title: "SEVENTEEN's choreography evolution",
    content:
      "I've been watching SEVENTEEN's choreography videos from debut until now, and their growth is incredible. Their synchronization has always been top-tier, but their recent concepts show so much maturity.",
    authorId: 1,
    createdAt: new Date("2025-02-05T11:10:00Z"),
    updatedAt: new Date("2025-02-05T11:10:00Z"),
    category: "Discussion",
  },
  {
    id: 11,
    title: 'IVE "I AM" dance practice hits 100M views',
    content:
      "IVE's 'I AM' dance practice video just hit 100 million views! Their choreography is always so satisfying to watch. Which K-pop dance practice videos do you find yourself rewatching?",
    authorId: 4,
    createdAt: new Date("2025-01-30T15:40:00Z"),
    updatedAt: new Date("2025-01-30T15:40:00Z"),
    category: "News",
  },
  {
    id: 12,
    title: "K-pop songs that got you through tough times?",
    content:
      "We all have those K-pop songs that helped us through difficult periods. For me, BTS's 'Magic Shop' and TWICE's 'Feel Special' were literal lifesavers. What songs helped you?",
    authorId: 2,
    createdAt: new Date("2025-01-25T12:30:00Z"),
    updatedAt: new Date("2025-01-25T12:30:00Z"),
    category: "Discussion",
  },
  {
    id: 13,
    title: "Favorite B-sides that deserved to be title tracks?",
    content:
      "Let's talk about B-sides that were so good they should have been title tracks! Red Velvet's 'Kingdom Come' and TWICE's 'Love Foolish' are at the top of my list.",
    authorId: 5,
    createdAt: new Date("2025-01-20T10:20:00Z"),
    updatedAt: new Date("2025-01-20T10:20:00Z"),
    category: "Discussion",
  },
  {
    id: 14,
    title: "NewJeans' impact on the fashion industry",
    content:
      "It's amazing how NewJeans has influenced fashion trends in such a short time. Their Y2K aesthetic has taken over street fashion, and even luxury brands are taking notice!",
    authorId: 3,
    createdAt: new Date("2025-01-15T16:50:00Z"),
    updatedAt: new Date("2025-01-15T16:50:00Z"),
    category: "Discussion",
  },
  {
    id: 15,
    title: "TWICE Nayeon's solo comeback rumors",
    content:
      "There are rumors circulating about Nayeon preparing for her second solo comeback! After the success of 'POP!', I'm so excited to see what concept she'll go with next.",
    authorId: 2,
    createdAt: new Date("2025-01-10T09:15:00Z"),
    updatedAt: new Date("2025-01-10T09:15:00Z"),
    category: "News",
  },
  {
    id: 16,
    title: "BLACKPINK Rosé's collaboration with IU?",
    content:
      "Industry insiders are hinting at a possible collaboration between Rosé and IU! Can you imagine the vocal powerhouse this would be? What kind of song do you think they would create together?",
    authorId: 4,
    createdAt: new Date("2025-01-05T14:30:00Z"),
    updatedAt: new Date("2025-01-05T14:30:00Z"),
    category: "News",
  },
  {
    id: 17,
    title: "K-pop groups with the best discography consistency",
    content:
      "Which K-pop groups do you think have the most consistent discography? For me, SHINee and Red Velvet rarely miss. Their albums are solid from start to finish with minimal skips.",
    authorId: 5,
    createdAt: new Date("2024-12-30T11:25:00Z"),
    updatedAt: new Date("2024-12-30T11:25:00Z"),
    category: "Discussion",
  },
  {
    id: 18,
    title: "Stray Kids' rap line appreciation post",
    content:
      "Can we take a moment to appreciate Stray Kids' rap line? Changbin, Han, and Felix bring such unique styles to the table, and their self-produced tracks showcase their incredible talent.",
    authorId: 1,
    createdAt: new Date("2024-12-25T17:40:00Z"),
    updatedAt: new Date("2024-12-25T17:40:00Z"),
    category: "Appreciation",
  },
  {
    id: 19,
    title: 'aespa\'s "Supernova" live stages are incredible',
    content:
      "I've been blown away by aespa's 'Supernova' live performances! Their vocals and stage presence have improved so much, and the choreography really highlights each member's strengths.",
    authorId: 3,
    createdAt: new Date("2024-12-20T13:10:00Z"),
    updatedAt: new Date("2024-12-20T13:10:00Z"),
    category: "Performance",
  },
  {
    id: 20,
    title: "HYBE's new girl group debut announcement",
    content:
      "HYBE just announced they're debuting a new girl group in 2025! With the success of NewJeans and LE SSERAFIM, expectations are high. What concept do you think they'll go with?",
    authorId: 2,
    createdAt: new Date("2024-12-15T10:05:00Z"),
    updatedAt: new Date("2024-12-15T10:05:00Z"),
    category: "News",
  },
];

export const insertPostsData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding posts...");

  for (const post of postsData) {
    await db.insert(posts).values(post).onConflictDoNothing();
  }

  console.log("Posts seeded successfully!");
};
