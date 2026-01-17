import db from '../db/pool.js';

export async function findAllCategories() {
  const query = 'SELECT * FROM categories ORDER BY name ASC';
  const { rows } = await db.query(query);
  return rows;
}

export async function findCategoryById(id) {
  const query = 'SELECT * FROM categories WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

export async function findItemsByCategoryId(categoryId) {
  const query = 'SELECT * FROM items WHERE category_id = $1 ORDER BY name ASC';
  const { rows } = await db.query(query, [categoryId]);
  return rows;
}

export async function createCategory(name, description) {
  const query = `
    INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING * `;
  const { rows } = await db.query(query, [name, description]);
  return rows[0];
}

export async function updateCategory(id, name, description) {
  const query = `
    UPDATE categories
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await db.query(query, [name, description, id]);
  return rows[0];
}

export async function deleteCategoryById(id) {
  const query = 'DELETE FROM categories WHERE id = $1';
  await db.query(query, [id]);
}
