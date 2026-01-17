import { Pool } from 'pg';
import 'dotenv/config';

const config = {};

if (process.env.DATABASE_URL) {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = {
    rejectUnauthorized: false,
  };
} else {
  config.host = process.env.DATABASE_HOST;
  config.port = process.env.DATABASE_PORT;
  config.user = process.env.DATABASE_USER;
  config.password = process.env.DATABASE_PASSWORD;
  config.database = process.env.DATABASE_NAME;
}

const pool = new Pool(config);

const dbModule = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
};

export default dbModule;
