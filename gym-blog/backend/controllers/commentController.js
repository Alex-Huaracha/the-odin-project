import { prisma } from '../prisma/client.js';

export const createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  const authorId = req.user.id;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: postId,
        authorId: authorId,
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
};
