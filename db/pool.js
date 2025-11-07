import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const dbModule = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
};

export default dbModule;
