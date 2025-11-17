import bcrypt from 'bcrypt';
import prisma from '../db/prismaClient.js';
import passport from 'passport';

export const getRegister = (req, res) => {
  // (Pronto crearemos la vista 'register.ejs')
  res.render('register');
};

export const postRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash('error_msg', 'Please fill in all the fields.');
      return res.redirect('/register');
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      req.flash('error_msg', 'That username is already taken.');
      return res.redirect('/register');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    res.redirect('/login');
  } catch (err) {
    return next(err);
  }
};

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export const getDashboard = (req, res) => {
  res.render('dashboard', { user: req.user });
};

export const getIndex = (req, res) => {
  res.render('index');
};
