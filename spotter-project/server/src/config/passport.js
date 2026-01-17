import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (loginInput, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ username: loginInput }, { email: loginInput }],
        },
      });

      if (!user) {
        return done(null, false, { message: 'Username or email not found' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
