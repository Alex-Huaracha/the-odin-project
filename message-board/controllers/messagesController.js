import { MessageModel } from '../models/message.js';
import { validateMessage } from '../schemas/messageSchema.js';

export class MessageController {
  static async getAll(req, res) {
    try {
      const messages = await MessageModel.getAll();
      res.render('index', { title: 'Mini Messageboard', messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).render('error', { message: 'Error loading messages' });
    }
  }

  static async getNew(req, res) {
    res.render('form', { title: 'New Message' });
  }

  static async create(req, res) {
    const result = validateMessage(req.body);
    if (!result.success) {
      return res.render('form', {
        title: 'New Message',
        errors: result.error.errors,
      });
    }

    try {
      await MessageModel.create({ input: result.data });
      res.redirect('/');
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).render('form', {
        title: 'New Message',
        errors: [{ message: 'Error saving message. Please try again.' }],
      });
    }
  }

  static async getById(req, res) {
    try {
      const message = await MessageModel.getById(req.params.id);
      if (!message) {
        return res
          .status(404)
          .render('error', { message: 'Message not found' });
      }
      res.render('message', { title: 'Message Details', message });
    } catch (error) {
      console.error('Error fetching message:', error);
      res.status(500).render('error', { message: 'Error loading message' });
    }
  }
}
