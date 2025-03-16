import { comments } from "@/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

type CommentData = {
  id?: number;
  content: string;
  postId: number;
  authorId: string;
  parentId?: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export const commentsData: CommentData[] = [
  // Comments for Post 1: TWICE's "The Feels" Reaches 300 Million Views!
  {
    id: 1,
    content:
      "I love 'The Feels'! It's such a catchy song and the choreography is amazing. I think their English tracks have been really successful in reaching a wider audience.",
    authorId: "1",
    postId: 1,
    parentId: null,
    createdAt: new Date("2025-03-10T10:30:00Z"),
    updatedAt: new Date("2025-03-10T10:30:00Z"),
  },
  {
    id: 2,
    content:
      "Agreed! I think 'The Feels' is their best English track so far. The chorus is so addictive!",
    authorId: "3",
    postId: 1,
    parentId: 1,
    createdAt: new Date("2025-03-10T11:15:00Z"),
    updatedAt: new Date("2025-03-10T11:15:00Z"),
  },
  {
    id: 3,
    content:
      "I'm so proud of TWICE for this achievement! They've been working so hard and deserve all the success.",
    authorId: "5",
    postId: 1,
    parentId: null,
    createdAt: new Date("2025-03-10T12:45:00Z"),
    updatedAt: new Date("2025-03-10T12:45:00Z"),
  },

  // Comments for Post 2: Unpopular Opinion: 4th Gen Stage Presence
  {
    id: 4,
    content:
      "I partially agree. While the choreographies are impressive, I do miss the more spontaneous interactions with the audience that were common in earlier generations.",
    authorId: "1",
    postId: 2,
    parentId: null,
    createdAt: new Date("2025-03-08T15:20:00Z"),
    updatedAt: new Date("2025-03-08T15:20:00Z"),
  },
  {
    id: 5,
    content:
      "I disagree. I think 4th gen groups have amazing stage presence, just in a different way. The precision and synchronization they show require incredible skill and focus.",
    authorId: "4",
    postId: 2,
    parentId: null,
    createdAt: new Date("2025-03-08T16:10:00Z"),
    updatedAt: new Date("2025-03-08T16:10:00Z"),
  },
  {
    id: 6,
    content:
      "That's a fair point. I just think there should be a balance between technical perfection and genuine audience connection.",
    authorId: "3",
    postId: 2,
    parentId: 5,
    createdAt: new Date("2025-03-08T17:05:00Z"),
    updatedAt: new Date("2025-03-08T17:05:00Z"),
  },
  {
    id: 7,
    content:
      "I think it depends on the group. Some 4th gen groups like Stray Kids and (G)I-DLE have amazing stage presence and audience interaction.",
    authorId: "2",
    postId: 2,
    parentId: null,
    createdAt: new Date("2025-03-08T18:30:00Z"),
    updatedAt: new Date("2025-03-08T18:30:00Z"),
  },

  // Comments for Post 3: My first BLACKPINK concert experience!
  {
    id: 8,
    content:
      "I saw them in London last month and had the exact same experience! Lisa's solo stage was incredible. Did you get any merch?",
    authorId: "1",
    postId: 3,
    parentId: null,
    createdAt: new Date("2025-03-05T19:20:00Z"),
    updatedAt: new Date("2025-03-05T19:20:00Z"),
  },
  {
    id: 9,
    content:
      "Yes! I got a lightstick and a t-shirt. The prices were crazy but worth it for the memories!",
    authorId: "4",
    postId: 3,
    parentId: 8,
    createdAt: new Date("2025-03-05T20:15:00Z"),
    updatedAt: new Date("2025-03-05T20:15:00Z"),
  },
  {
    id: 10,
    content:
      "Which song had the best live performance in your opinion? I've heard 'Playing With Fire' hits different in concert.",
    authorId: "2",
    postId: 3,
    parentId: null,
    createdAt: new Date("2025-03-05T21:40:00Z"),
    updatedAt: new Date("2025-03-05T21:40:00Z"),
  },
  {
    id: 11,
    content:
      "'Playing With Fire' was amazing, but 'DDU-DU DDU-DU' with the live band arrangement blew me away! The energy was insane.",
    authorId: "4",
    postId: 3,
    parentId: 10,
    createdAt: new Date("2025-03-05T22:10:00Z"),
    updatedAt: new Date("2025-03-05T22:10:00Z"),
  },

  // Comments for Post 4: NewJeans breaks another record with "OMG"
  {
    id: 12,
    content:
      "NewJeans' success is so well-deserved! Their music is refreshing and unique in the current K-pop landscape.",
    authorId: "3",
    postId: 4,
    parentId: null,
    createdAt: new Date("2025-03-01T12:30:00Z"),
    updatedAt: new Date("2025-03-01T12:30:00Z"),
  },
  {
    id: 13,
    content:
      "I'm amazed at how quickly they've risen to the top. Their concepts are so cohesive and well-executed.",
    authorId: "5",
    postId: 4,
    parentId: null,
    createdAt: new Date("2025-03-01T13:45:00Z"),
    updatedAt: new Date("2025-03-01T13:45:00Z"),
  },

  // Comments for Post 5: Red Velvet's "Feel My Rhythm" is a masterpiece
  {
    id: 14,
    content:
      "The bridge is my favorite part! Wendy and Seulgi's vocals there are just heavenly.",
    authorId: "1",
    postId: 5,
    parentId: null,
    createdAt: new Date("2025-02-28T11:20:00Z"),
    updatedAt: new Date("2025-02-28T11:20:00Z"),
  },
  {
    id: 15,
    content:
      "I love how they always experiment with different sounds while maintaining their unique 'Red Velvet' style.",
    authorId: "2",
    postId: 5,
    parentId: null,
    createdAt: new Date("2025-02-28T12:40:00Z"),
    updatedAt: new Date("2025-02-28T12:40:00Z"),
  },

  // Comments for remaining posts
  {
    id: 16,
    content:
      "I'm hoping they'll do a world tour once everyone is back! It's been too long since we've seen them all together.",
    authorId: "3",
    postId: 6,
    parentId: null,
    createdAt: new Date("2025-02-25T17:15:00Z"),
    updatedAt: new Date("2025-02-25T17:15:00Z"),
  },
  {
    id: 17,
    content:
      "The styling is incredible! I'm getting elegant but edgy vibes from these concept photos.",
    authorId: "4",
    postId: 7,
    parentId: null,
    createdAt: new Date("2025-02-20T14:30:00Z"),
    updatedAt: new Date("2025-02-20T14:30:00Z"),
  },
  {
    id: 18,
    content:
      "They're coming to my city but tickets sold out in minutes! I'm devastated.",
    authorId: "5",
    postId: 8,
    parentId: null,
    createdAt: new Date("2025-02-15T10:20:00Z"),
    updatedAt: new Date("2025-02-15T10:20:00Z"),
  },
  {
    id: 19,
    content:
      "Keep checking! They might release more tickets closer to the date. That's how I got mine for their last tour.",
    authorId: "1",
    postId: 8,
    parentId: 18,
    createdAt: new Date("2025-02-15T11:05:00Z"),
    updatedAt: new Date("2025-02-15T11:05:00Z"),
  },
  {
    id: 20,
    content:
      "I think it adds an interesting layer to their concept, but I wish they would integrate it more meaningfully into their performances.",
    authorId: "2",
    postId: 9,
    parentId: null,
    createdAt: new Date("2025-02-10T15:10:00Z"),
    updatedAt: new Date("2025-02-10T15:10:00Z"),
  },
  {
    id: 21,
    content:
      "Their 'Home;Run' choreography is still one of my all-time favorites. The creativity and synchronization are unmatched!",
    authorId: "3",
    postId: 10,
    parentId: null,
    createdAt: new Date("2025-02-05T12:25:00Z"),
    updatedAt: new Date("2025-02-05T12:25:00Z"),
  },
  {
    id: 22,
    content:
      "I love watching ITZY's dance practices! Their energy and precision are always top-notch.",
    authorId: "4",
    postId: 11,
    parentId: null,
    createdAt: new Date("2025-01-30T16:15:00Z"),
    updatedAt: new Date("2025-01-30T16:15:00Z"),
  },
  {
    id: 23,
    content:
      "Day6's 'Zombie' got me through some really tough times last year. Their lyrics are so relatable.",
    authorId: "5",
    postId: 12,
    parentId: null,
    createdAt: new Date("2025-01-25T13:40:00Z"),
    updatedAt: new Date("2025-01-25T13:40:00Z"),
  },
  {
    id: 24,
    content:
      "TWICE's 'Cry For Me' should have been a title track! The concept, choreography, and song were all perfect.",
    authorId: "1",
    postId: 13,
    parentId: null,
    createdAt: new Date("2025-01-20T11:30:00Z"),
    updatedAt: new Date("2025-01-20T11:30:00Z"),
  },
  {
    id: 25,
    content:
      "I've noticed so many brands trying to capture their aesthetic. Their stylists deserve a raise!",
    authorId: "2",
    postId: 14,
    parentId: null,
    createdAt: new Date("2025-01-15T17:25:00Z"),
    updatedAt: new Date("2025-01-15T17:25:00Z"),
  },
  {
    id: 26,
    content:
      "I hope she goes with a different concept from 'POP!' to showcase her versatility.",
    authorId: "3",
    postId: 15,
    parentId: null,
    createdAt: new Date("2025-01-10T10:05:00Z"),
    updatedAt: new Date("2025-01-10T10:05:00Z"),
  },
  {
    id: 27,
    content:
      "This would be the collaboration of the century! Their vocal colors would complement each other so well.",
    authorId: "4",
    postId: 16,
    parentId: null,
    createdAt: new Date("2025-01-05T15:20:00Z"),
    updatedAt: new Date("2025-01-05T15:20:00Z"),
  },
  {
    id: 28,
    content:
      "f(x) had an incredible discography too! Their experimental sound was ahead of its time.",
    authorId: "5",
    postId: 17,
    parentId: null,
    createdAt: new Date("2024-12-30T12:15:00Z"),
    updatedAt: new Date("2024-12-30T12:15:00Z"),
  },
  {
    id: 29,
    content:
      "Han's flow in 'CHEESE' is absolutely insane. His ability to switch between singing and rapping so seamlessly is impressive.",
    authorId: "1",
    postId: 18,
    parentId: null,
    createdAt: new Date("2024-12-25T18:30:00Z"),
    updatedAt: new Date("2024-12-25T18:30:00Z"),
  },
  {
    id: 30,
    content:
      "Winter's high notes in their live stages have improved so much! She's really becoming more confident.",
    authorId: "2",
    postId: 19,
    parentId: null,
    createdAt: new Date("2024-12-20T14:05:00Z"),
    updatedAt: new Date("2024-12-20T14:05:00Z"),
  },
  {
    id: 31,
    content:
      "I'm hoping for something completely different from what we've seen from other HYBE groups. Maybe a rock concept?",
    authorId: "3",
    postId: 20,
    parentId: null,
    createdAt: new Date("2024-12-15T11:20:00Z"),
    updatedAt: new Date("2024-12-15T11:20:00Z"),
  },
  {
    id: 32,
    content:
      "That would be interesting! HYBE hasn't really explored rock concepts with their girl groups yet.",
    authorId: "4",
    postId: 20,
    parentId: 31,
    createdAt: new Date("2024-12-15T12:10:00Z"),
    updatedAt: new Date("2024-12-15T12:10:00Z"),
  },
  {
    id: 33,
    content:
      "I'm more interested in seeing if they'll follow the self-produced route like (G)I-DLE or have a more company-driven concept.",
    authorId: "5",
    postId: 20,
    parentId: null,
    createdAt: new Date("2024-12-15T13:45:00Z"),
    updatedAt: new Date("2024-12-15T13:45:00Z"),
  },
  {
    id: 34,
    content:
      "I think they'll probably go with a concept that's trendy but with a unique twist, similar to what they did with NewJeans.",
    authorId: "1",
    postId: 20,
    parentId: 33,
    createdAt: new Date("2024-12-15T14:30:00Z"),
    updatedAt: new Date("2024-12-15T14:30:00Z"),
  },
  {
    id: 35,
    content:
      "I'm excited to see what Nayeon does next! Her solo work has been fantastic so far.",
    authorId: "4",
    postId: 15,
    parentId: 26,
    createdAt: new Date("2025-01-10T11:15:00Z"),
    updatedAt: new Date("2025-01-10T11:15:00Z"),
  },
  {
    id: 36,
    content:
      "I've been listening to 'Feel My Rhythm' on repeat since it came out. The music video is a visual masterpiece too!",
    authorId: "3",
    postId: 5,
    parentId: 14,
    createdAt: new Date("2025-02-28T13:10:00Z"),
    updatedAt: new Date("2025-02-28T13:10:00Z"),
  },
  {
    id: 37,
    content:
      "I think TWICE has really found their groove with their English releases. 'Moonlight Sunrise' was great too!",
    authorId: "5",
    postId: 1,
    parentId: 2,
    createdAt: new Date("2025-03-10T14:25:00Z"),
    updatedAt: new Date("2025-03-10T14:25:00Z"),
  },
  {
    id: 38,
    content:
      "I'm curious to see if they'll continue releasing more English tracks or focus on their Korean/Japanese discography.",
    authorId: "4",
    postId: 1,
    parentId: null,
    createdAt: new Date("2025-03-10T15:40:00Z"),
    updatedAt: new Date("2025-03-10T15:40:00Z"),
  },
  {
    id: 39,
    content:
      "I think they'll balance both. Their global popularity is growing, but they know their Korean and Japanese markets are still their core fanbase.",
    authorId: "2",
    postId: 1,
    parentId: 38,
    createdAt: new Date("2025-03-10T16:20:00Z"),
    updatedAt: new Date("2025-03-10T16:20:00Z"),
  },
  {
    id: 40,
    content:
      "NewJeans' success is even more impressive considering they debuted without any pre-debut promotions. Their music just speaks for itself!",
    authorId: "1",
    postId: 4,
    parentId: 12,
    createdAt: new Date("2025-03-01T17:05:00Z"),
    updatedAt: new Date("2025-03-01T17:05:00Z"),
  },
];

export const insertCommentsData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding comments...");

  for (const comment of commentsData) {
    await db.insert(comments).values(comment);
  }

  console.log("Comments seeded successfully!");
};
