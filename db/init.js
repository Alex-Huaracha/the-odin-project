import pool from './db.js';

async function createTables() {
  console.log('Attempting to create tables...');

  const queryText = `
    DROP TABLE IF EXISTS messages;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      isMember BOOLEAN DEFAULT false,
      isAdmin BOOLEAN DEFAULT false
    );

    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      text TEXT NOT NULL,
      timestamp TIMESTAMPTZ DEFAULT NOW(),

      author_id INTEGER REFERENCES users(id)
    );
  `;

  try {
    await pool.query(queryText);
    console.log('Tables created successfully!');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    await pool.end();
  }
}

createTables();
