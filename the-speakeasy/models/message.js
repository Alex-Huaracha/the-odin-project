import pool from '../db/db.js';

export class Message {
  static async findAll() {
    const sql = `
      SELECT
        messages.id,
        messages.title,
        messages.text,
        messages.timestamp,
        users.firstName AS "authorFirstName",
        users.lastName AS "authorLastName"
      FROM messages
      INNER JOIN users ON messages.author_id = users.id
      ORDER BY messages.timestamp DESC
    `;

    try {
      const { rows } = await pool.query(sql);
      return rows;
    } catch (err) {
      console.error('Error finding all messages:', err);
      throw err;
    }
  }

  static async create({ title, text, authorId }) {
    const sql = `
      INSERT INTO messages (title, text, author_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(sql, [title, text, authorId]);
      return rows[0];
    } catch (err) {
      console.error('Error creating message:', err);
      throw err;
    }
  }

  static async delete({ id }) {
    const sql = `
      DELETE FROM messages
      WHERE id = $1
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      console.error('Error deleting message:', err);
      throw err;
    }
  }
}
