import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const categoriesData = [
  { name: 'Processors', description: 'Central Processing Units.' },
  {
    name: 'Graphics Cards',
    description: 'Graphics Processing Units.',
  },
  { name: 'Motherboards', description: 'Main board that connects everything.' },
];

const itemsData = [
  {
    name: 'AMD Ryzen 7 7800X3D',
    description: 'High-end gaming CPU with 3D V-Cache.',
    price: 399.99,
    stock: 50,
    category_name: 'Processors',
  },
  {
    name: 'NVIDIA GeForce RTX 4080',
    description: 'High-end GPU for ray tracing.',
    price: 1199.99,
    stock: 20,
    category_name: 'Graphics Cards',
  },
  {
    name: 'ASUS ROG Strix B650-E',
    description: 'AM5 motherboard for Ryzen 7000 CPUs.',
    price: 349.99,
    stock: 30,
    category_name: 'Motherboards',
  },
];

async function seedDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    console.log('Clearing tables...');
    await client.query(
      'TRUNCATE TABLE items, categories RESTART IDENTITY CASCADE'
    );

    console.log('Inserting categories...');
    const categoryIdMap = {};

    for (const cat of categoriesData) {
      const res = await client.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
        [cat.name, cat.description]
      );
      categoryIdMap[cat.name] = res.rows[0].id;
    }
    console.log('Categories inserted.');

    // 3. Insert Items
    console.log('Inserting items...');
    for (const item of itemsData) {
      const categoryId = categoryIdMap[item.category_name];
      if (!categoryId) {
        console.warn(`No ID found for category: ${item.category_name}`);
        continue;
      }

      await client.query(
        'INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5)',
        [item.name, item.description, item.price, item.stock, categoryId]
      );
    }
    console.log('Items inserted.');

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

seedDatabase();
