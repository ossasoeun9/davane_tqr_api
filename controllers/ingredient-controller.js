const { Ingredient } = require("../models/index.js");

const getIngredients = async (req, res) => {
  try {
    const storeId = req.user.store.id;
    const ingredients = await Ingredient.findAll({
      where: { storeId },
      attributes: {
        exclude: ["userId", "storeId", "createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });
    if (!ingredients) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const userId = req.user.id;
    const storeId = req.user.store.id;
    const { dataValues } = await Ingredient.create({ name, storeId, userId });

    delete dataValues.userId;
    delete dataValues.storeId;
    delete dataValues.createdAt;
    delete dataValues.updatedAt;

    return res.status(201).json(dataValues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) {
      if (!name) {
        return res.status(400).json({ message: "ID is required" });
      }
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const ingredient = await Ingredient.findByPk(id, {
      attributes: {
        exclude: ["userId", "storeId", "createdAt", "updatedAt"],
      },
    });
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    ingredient.name = name;
    await ingredient.save();
    return res.status(200).json(ingredient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    await ingredient.destroy();
    return res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getIngredients,
  addIngredient,
  editIngredient,
  deleteIngredient,
};
