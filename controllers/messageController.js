import { body, validationResult } from 'express-validator';
import { Message } from '../models/message.js';

export const message_list_get = async (req, res, next) => {
  try {
    const messages = await Message.findAll();

    res.render('index', {
      title: 'The Speakeasy',
      messages: messages,
    });
  } catch (err) {
    return next(err);
  }
};

export const message_create_get = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/log-in');
  }

  res.render('message-form', {
    title: 'Create New Message',
  });
};

export const message_create_post = [
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('text', 'Message text must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.redirect('/log-in');
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render('message-form', {
          title: 'Create New Message',
          body: req.body,
          errors: errors.array(),
        });
      }

      await Message.create({
        title: req.body.title,
        text: req.body.text,
        authorId: req.user.id,
      });

      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];

export const message_delete_post = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.redirect('/');
    }

    await Message.delete({ id: req.body.messageId });

    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};
