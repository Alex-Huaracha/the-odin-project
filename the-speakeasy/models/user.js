import pool from '../db/db.js';

export class User {
  static async create({ firstName, lastName, email, hashedPassword }) {
    const sql = `
      INSERT INTO users (firstName, lastName, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(sql, [
        firstName,
        lastName,
        email,
        hashedPassword,
      ]);
      return rows[0];
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  static async findByEmail({ email }) {
    const sql = `
    SELECT
      id,
      firstName AS "firstName",
      lastName AS "lastName",
      email,
      password,
      isMember AS "isMember",
      isAdmin AS "isAdmin"
    FROM users
    WHERE email = $1
  `;

    try {
      const { rows } = await pool.query(sql, [email]);
      return rows[0];
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  }

  static async findById({ id }) {
    const sql = `
    SELECT
      id,
      firstName AS "firstName",
      lastName AS "lastName",
      email,
      password,
      isMember AS "isMember",
      isAdmin AS "isAdmin"
    FROM users
    WHERE id = $1
  `;

    try {
      const { rows } = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      console.error('Error finding user by id:', err);
      throw err;
    }
  }

  static async updateMembership({ id }) {
    const sql = `
      UPDATE users
      SET isMember = true
      WHERE id = $1
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(sql, [id]);
      return rows[0];
    } catch (err) {
      console.error('Error updating membership status:', err);
      throw err;
    }
  }

  static async updateAdminStatus({ id, isAdmin }) {
    const sql = `
      UPDATE users
      SET isAdmin = $1
      WHERE id = $2
      RETURNING *
    `;

    try {
      const { rows } = await pool.query(sql, [isAdmin, id]);
      return rows[0];
    } catch (err) {
      console.error('Error updating admin status:', err);
      throw err;
    }
  }
}
