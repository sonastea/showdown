# KpopShowdown Database Seed Data

This directory contains the database schema and seed data for the KpopShowdown application.

## Database Schema

The database schema is defined in `schema.ts` using Drizzle ORM. It includes the following tables:

- `users`: User accounts
- `posts`: User-created posts
- `comments`: Comments on posts (including nested replies)
- `tags`: Post tags/categories
- `postTags`: Junction table for post-tag relationships
- `postVotes`: Votes on posts
- `commentVotes`: Votes on comments

## Seed Data

The seed data is organized into separate files for each table:

- `seed-data/users.ts`: 5 user accounts
- `seed-data/tags.ts`: 20 common K-pop related tags
- `seed-data/posts.ts`: 20 posts with various topics
- `seed-data/post-tags.ts`: Tag associations for posts
- `seed-data/comments.ts`: 40 comments (including nested replies)
- `seed-data/post-votes.ts`: Vote data for posts
- `seed-data/comment-votes.ts`: Vote data for comments

## Running the Seed Script

To seed your database with this data:

1. Make sure your database connection is configured in your environment variables or update the connection string in `seed.ts`

2. Run the seed script:

```bash
# From the project root
bun run src/db/seed.ts
```

This will populate your database with all the seed data in the correct order to respect foreign key constraints.

## Using in Development

You can import the seed data in your development environment to test features:

```typescript
import { db } from '@/db';
import seed from '@/db/seed';

// Seed the database
await seed();
```

## Customizing Seed Data

To modify or add more seed data, edit the corresponding files in the `seed` directory. Make sure to update the IDs and references correctly to maintain referential integrity.
