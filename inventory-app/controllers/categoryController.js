import {
  findAllCategories,
  findCategoryById,
  findItemsByCategoryId,
  createCategory,
  updateCategory,
  deleteCategoryById,
} from '../models/categoryModel.js';

export const category_list = async (req, res, next) => {
  try {
    const allCategories = await findAllCategories();
    res.render('categories/index', {
      title: 'Category List',
      categories: allCategories,
    });
  } catch (err) {
    next(err);
  }
};

export const category_detail = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await findCategoryById(categoryId);
    const itemsInCategory = await findItemsByCategoryId(categoryId);

    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    res.render('categories/detail', {
      title: `Category Detail: ${category.name}`,
      category: category,
      items: itemsInCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const category_create_get = (req, res) => {
  res.render('categories/form', {
    title: 'Create New Category',
  });
};

export const category_create_post = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = await createCategory(name, description);
    res.redirect(`/catalog/category/${newCategory.id}`);
  } catch (err) {
    next(err);
  }
};

export const category_update_get = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    res.render('categories/form', {
      title: 'Update Category',
      category: category,
    });
  } catch (err) {
    next(err);
  }
};

export const category_update_post = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    await updateCategory(id, name, description);
    res.redirect(`/catalog/category/${id}`);
  } catch (err) {
    next(err);
  }
};

export const category_delete_get = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    const itemsInCategory = await findItemsByCategoryId(req.params.id);

    if (!category) {
      res.redirect('/catalog/categories');
      return;
    }

    res.render('categories/delete', {
      title: `Delete Category: ${category.name}`,
      category: category,
      items: itemsInCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const category_delete_post = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const itemsInCategory = await findItemsByCategoryId(categoryId);

    if (itemsInCategory.length > 0) {
      const category = await findCategoryById(categoryId);
      res.render('categories/delete', {
        title: `Delete Category: ${category.name}`,
        category: category,
        items: itemsInCategory,
        error: 'Cannot delete category while it contains items.',
      });
      return;
    }

    await deleteCategoryById(categoryId);
    res.redirect('/catalog/categories');
  } catch (err) {
    next(err);
  }
};
