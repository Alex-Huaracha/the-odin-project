import pool from './db.js';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    console.log('Truncating tables...');
    await pool.query('TRUNCATE users, messages RESTART IDENTITY CASCADE');
    console.log('Tables truncated.');

    console.log('Creating users...');
    const userQuery = `
      INSERT INTO users (firstName, lastName, email, password, isMember, isAdmin)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const hashAdmin = await bcrypt.hash('admin101', 10);
    const admin = await pool.query(userQuery, [
      'Admin',
      'User',
      'admin@club.com',
      hashAdmin,
      true,
      true,
    ]);
    const adminId = admin.rows[0].id;
    console.log(`Created admin user with ID: ${adminId}`);

    const hashMember = await bcrypt.hash('member101', 10);
    const member = await pool.query(userQuery, [
      'Member',
      'Active',
      'member@club.com',
      hashMember,
      true,
      false,
    ]);
    const memberId = member.rows[0].id;
    console.log(`Created member user with ID: ${memberId}`);

    const hashGuest = await bcrypt.hash('guest101', 10);
    const guest = await pool.query(userQuery, [
      'Guest',
      'Newbie',
      'guest@club.com',
      hashGuest,
      false,
      false,
    ]);
    const guestId = guest.rows[0].id;
    console.log(`Created guest user with ID: ${guestId}`);

    console.log('Creating messages...');
    const messageQuery = `
      INSERT INTO messages (title, text, author_id)
      VALUES ($1, $2, $3)
    `;

    await pool.query(messageQuery, [
      'Welcome to the Club!',
      'As an admin, I wrote this. Members can see my name. Non-members cannot.',
      adminId,
    ]);

    await pool.query(messageQuery, [
      'I am a Member',
      'This is my first post. I can see who wrote the admin message! Can you see who I am?',
      memberId,
    ]);

    await pool.query(messageQuery, [
      'New here...',
      'I just signed up (as a non-member). I wonder who wrote these other posts...',
      guestId,
    ]);

    console.log('Created 3 messages.');
    console.log('Seeding finished successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
}

seedDatabase();
