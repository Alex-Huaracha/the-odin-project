import { prisma } from '../prisma/client.js';

export const getUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId;

    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId },
      },
      select: {
        id: true,
        username: true,
        bio: true,
        avatarUrl: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to load the user list' });
  }
};
