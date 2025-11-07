import db from '../db/pool.js';

export async function findAllItems() {
  const query = 'SELECT * FROM items ORDER BY name ASC';
  const { rows } = await db.query(query);
  return rows;
}

export async function findItemById(id) {
  const query = `
    SELECT
      items.*,
      categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.id = $1
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

export async function createItem(name, description, price, stock, categoryId) {
  const query = `
    INSERT INTO items (name, description, price, stock_quantity, category_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { rows } = await db.query(query, [
    name,
    description,
    price,
    stock,
    categoryId,
  ]);
  return rows[0];
}

export async function updateItem(
  id,
  name,
  description,
  price,
  stock,
  categoryId
) {
  const query = `
    UPDATE items
    SET name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5
    WHERE id = $6
    RETURNING *
  `;
  const { rows } = await db.query(query, [
    name,
    description,
    price,
    stock,
    categoryId,
    id,
  ]);
  return rows[0];
}

export async function deleteItemById(id) {
  const query = 'DELETE FROM items WHERE id = $1';
  await db.query(query, [id]);
}
