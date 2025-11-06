import pool from '../db/db.js';
export class MessageModel {
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM messages ORDER BY added DESC'
    );
    return rows;
  }

  static async create({ input }) {
    const { text, user } = input;
    const { rows } = await pool.query(
      'INSERT INTO messages (text, user, added) VALUES ($1, $2, NOW()) RETURNING *',
      [text, user]
    );
    return rows[0];
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }
}
