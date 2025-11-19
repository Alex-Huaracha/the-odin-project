import { prisma } from '../prisma/client.js';

export const getPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        comments: true,
        author: { select: { username: true } },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (!post.published) {
      return res.status(403).json({ error: 'This post is not public' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the post' });
  }
};

export const createPost = async (req, res) => {
  const { title, content, published } = req.body;

  const authorId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: authorId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the post' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title,
        content,
        published,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Error updating the post' });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: id },
    });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Error deleting the post' });
  }
};
