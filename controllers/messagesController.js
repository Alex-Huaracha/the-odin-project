import { messages, MessageModel } from '../models/message.js';
import { validateMessage } from '../schemas/messageSchema.js';

export class MessageController {
  static async getAll(req, res) {
    res.json(messages);
  }

  static async create(req, res) {
    const result = validateMessage(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    const newMessage = await MessageModel.create({ input: result.data });
    res.status(201).json(newMessage);
  }
}
