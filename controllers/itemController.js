import {
  findAllItems,
  findItemById,
  createItem,
  updateItem,
  deleteItemById,
} from '../models/itemModel.js';

import { findAllCategories } from '../models/categoryModel.js';

export const item_list = async (req, res, next) => {
  try {
    const allItems = await findAllItems();
    res.render('items/index', {
      title: 'Item List',
      items: allItems,
    });
  } catch (err) {
    next(err);
  }
};

export const item_detail = async (req, res, next) => {
  try {
    const item = await findItemById(req.params.id);
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }
    res.render('items/detail', {
      title: `Details: ${item.name}`,
      item: item,
    });
  } catch (err) {
    next(err);
  }
};

export const item_create_get = async (req, res, next) => {
  try {
    const allCategories = await findAllCategories();
    res.render('items/form', {
      title: 'Create New Item',
      categories: allCategories,
    });
  } catch (err) {
    next(err);
  }
};

export const item_create_post = async (req, res, next) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    const newItem = await createItem(
      name,
      description,
      price,
      stock,
      category_id
    );
    res.redirect(`/catalog/item/${newItem.id}`);
  } catch (err) {
    next(err);
  }
};

export const item_update_get = async (req, res, next) => {
  try {
    const [item, allCategories] = await Promise.all([
      findItemById(req.params.id),
      findAllCategories(),
    ]);

    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('items/form', {
      title: 'Update Item',
      item: item,
      categories: allCategories,
    });
  } catch (err) {
    next(err);
  }
};

export const item_update_post = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category_id } = req.body;
    await updateItem(id, name, description, price, stock, category_id);
    res.redirect(`/catalog/item/${id}`);
  } catch (err) {
    next(err);
  }
};

export const item_delete_get = async (req, res, next) => {
  try {
    const item = await findItemById(req.params.id);
    if (!item) {
      res.redirect('/catalog/items');
      return;
    }
    res.render('items/delete', {
      title: `Delete Item: ${item.name}`,
      item: item,
    });
  } catch (err) {
    next(err);
  }
};

export const item_delete_post = async (req, res, next) => {
  try {
    await deleteItemById(req.params.id);
    res.redirect('/catalog/items');
  } catch (err) {
    next(err);
  }
};
