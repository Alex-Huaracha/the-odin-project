import pool from '../db/db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(500) NOT NULL,
    username VARCHAR(50) NOT NULL,
    added TIMESTAMP DEFAULT NOW()
  );
`;

const insertSampleData = `
  INSERT INTO messages (text, username, added) VALUES
    ('Hi there!', 'Alex', NOW()),
    ('Hello World!', 'Robo-Warrior', NOW()),
    ('Welcome to the message board!', 'Admin', NOW())
  ON CONFLICT DO NOTHING;
`;

async function initializeDatabase() {
  try {
    console.log('Creating messages table...');
    await pool.query(createTableQuery);
    await pool.query(insertSampleData);
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
