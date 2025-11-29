import { prisma } from '../../prisma/client.js';

export const likePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: postId } = req.params; // Comes from /api/posts/:id/like

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'You have already liked this post' });
    }

    await prisma.like.create({
      data: { userId, postId },
    });

    res.status(200).json({ message: 'Post liked' });
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(404).json({ message: 'Post not found' });
    }
    next(error);
  }
};

export const unlikePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: postId } = req.params;

    try {
      await prisma.like.delete({
        where: {
          userId_postId: { userId, postId },
        },
      });
      res.status(200).json({ message: 'Like removed' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(400).json({ message: 'You had not liked this post' });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
