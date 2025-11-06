import { messages, MessageModel } from '../models/message.js';
import { validateMessage } from '../schemas/messageSchema.js';

export class MessageController {
  static async getAll(req, res) {
    res.render('index', { title: 'Mini Messageboard', messages });
  }

  static async getNew(req, res) {
    res.render('form', { title: 'New Message' });
  }

  static async create(req, res) {
    const result = validateMessage(req.body);
    if (!result.success) {
      return res.render('form', { 
        title: 'New Message', 
        errors: result.error.errors 
      });
    }

    await MessageModel.create({ input: result.data });
    res.redirect('/');
  }

  static async getById(req, res) {
    const message = messages.find(m => m.id === req.params.id);
    if (!message) {
      return res.status(404).render('error', { message: 'Message not found' });
    }
    res.render('message', { title: 'Message Details', message });
  }
}
