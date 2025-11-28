import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { prisma } from '../prisma/client.js';

// Initializations
const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get('/', (req, res) => {
  res.send('<h1>Spotter Server Active 🏋️</h1>');
});

app.get('/api/feed', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      // Search options:
      take: 20, // Fetch only the last 20
      orderBy: {
        createdAt: 'desc', // Newest first
      },
      // IMPLICIT JOIN (The magic of Prisma):
      // "Fetch the post, BUT ALSO the author's data"
      include: {
        author: {
          select: {
            username: true,
            avatarUrl: true,
            gymGoals: true, // To see if they are a Powerlifter or Crossfitter
          },
        },
        _count: {
          select: { likes: true, children: true }, // Count likes and comments
        },
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching the feed' });
  }
});

export default app;
