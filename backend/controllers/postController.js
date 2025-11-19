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
    res.status(500).json({ error: 'Error al crear el post' });
  }
};
