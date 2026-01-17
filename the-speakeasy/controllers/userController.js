import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import passport from 'passport';

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

      res.redirect('/log-in');
    } catch (err) {
      return next(err);
    }
  },
];

export const user_login_get = (req, res, next) => {
  const messages = req.flash('error');

  res.render('log-in', {
    title: 'Log In',
    errors: messages,
  });
};

export const user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true,
});

export const user_logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};

export const join_club_get = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/log-in');
  }

  res.render('join-club', {
    title: 'Join the Club',
  });
};

export const join_club_post = [
  body('passcode', 'Passcode must not be empty.')
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
        return res.render('join-club', {
          title: 'Join the Club',
          errors: errors.array(),
          body: req.body,
        });
      }

      if (req.body.passcode !== process.env.MEMBER_PASSCODE) {
        return res.render('join-club', {
          title: 'Join the Club',
          errors: [{ msg: 'Incorrect passcode. Try again.' }],
          body: req.body,
        });
      }

      await User.updateMembership({ id: req.user.id });
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];
