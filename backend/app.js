import express from 'express';
import cors from 'cors';
import { prisma } from './prisma/client.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the Gym Blog API! 💪 ');
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

export default app;
