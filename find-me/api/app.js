import express from 'express';
import cors from 'cors';
import { prisma } from './prisma/client.js';

import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/validate', async (req, res) => {
  const { characterName, x, y } = req.body;

  console.log(`Validating: ${characterName} at X:${x}, Y:${y}`);

  try {
    const character = await prisma.character.findFirst({
      where: { name: characterName },
    });

    if (!character) {
      return res.status(404).json({ message: 'Character does not exist' });
    }

    const isFound =
      x >= character.minX &&
      x <= character.maxX &&
      y >= character.minY &&
      y <= character.maxY;

    if (isFound) {
      res.json({ found: true, message: `You found ${characterName}!` });
    } else {
      res.json({ found: false, message: 'Keep looking...' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/scores', async (req, res) => {
  const { username, time } = req.body;

  try {
    const newScore = await prisma.score.create({
      data: {
        username,
        time,
        levelId: 1,
      },
    });
    res.json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Error saving score' });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      where: { levelId: 1 },
      orderBy: { time: 'asc' },
      take: 10,
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving scores' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
