import { prisma } from '../prisma/client.js';

export const createComment = async (req, res) => {
  const { content, username } = req.body;
  const { postId } = req.params;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        username: username || 'Anonymous',
        postId: postId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};
