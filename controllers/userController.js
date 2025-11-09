// controllers/userController.js

import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

const validateUser = [
  body('firstName', 'First name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('lastName', 'Last name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body('email', 'Please enter a valid email address.')
    .trim()
    .isEmail()
    .normalizeEmail(),

  body('password', 'Password must be at least 8 characters long.')
    .trim()
    .isLength({ min: 8 }),

  body('confirmPassword', 'Passwords do not match.').custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }
  ),
];

export const user_signup_get = (req, res, next) => {
  res.render('sign-up', {
    title: 'Sign Up',
  });
};

export const user_signup_post = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render('sign-up', {
          title: 'Sign Up',
          body: req.body,
          errors: errors.array(),
        });
      }

      const existingUser = await User.findByEmail({ email: req.body.email });

      if (existingUser) {
        return res.render('sign-up', {
          title: 'Sign Up',
          body: req.body,
          errors: [{ msg: 'Email is already in use.' }],
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hashedPassword: hashedPassword,
      });

      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];
