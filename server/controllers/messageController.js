import { prisma } from '../prisma/client.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.userId;

    if (!receiverId || !content) {
      return res
        .status(400)
        .json({ error: 'Missing data (receiverId or content)' });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal error sending the message' });
  }
};

export const getConversation = async (req, res) => {
  try {
    const myId = req.user.userId;
    const { otherUserId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: myId },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Error loading messages' });
  }
};
