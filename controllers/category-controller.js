import { Category, Product } from "../models/index.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { user, body } = req;
    const { name } = body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const { dataValues } = await Category.create({
      name,
      userId: user.id,
      storeId: user.store.id,
    });

    delete dataValues.userId;
    delete dataValues.storeId;
    delete dataValues.createdAt;
    delete dataValues.updatedAt;

    return res.status(200).json(dataValues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !id) {
      return res.status(400).json({ message: "ID and Name required" });
    }

    const response = await Category.update({ name }, { where: { id } });

    if (response[0] == 0) {
      return res.status(404).json({ message: "No category is updated" });
    }
    return res.status(200).json({ mesage: "Category is updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID and Name required" });
    }

    const products = await Product.findAll({
      where: { categoryId: id },
      limit: 1,
    });

    if (products.length > 0) {
      return res.status(400).json({ message: "Can not delete category" });
    }

    return res.status(200).json({ mesage: "Category is deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
