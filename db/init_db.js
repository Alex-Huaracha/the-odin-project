import db from './pool.js';

async function createTables() {
  const categoryTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT
    );
  `;

  const itemTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INTEGER NOT NULL DEFAULT 0,

      category_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `;

  try {
    const client = await db.query('SELECT NOW()');
    console.log('Connection successful:', client.rows[0].now);

    await db.query(categoryTableQuery);
    console.log('Table "categories" created successfully.');

    await db.query(itemTableQuery);
    console.log('Table "items" created successfully.');

    console.log('Database initialization script completed!');
  } catch (err) {
    console.error('Error during database initialization:', err);
  } finally {
    await db.pool.end();
    console.log('Pool closed.');
  }
}

createTables();
