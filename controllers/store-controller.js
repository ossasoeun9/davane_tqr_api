const { Store, User } = require("../models/index.js");
const jwt = require("jsonwebtoken");

const createStore = async (req, res) => {
  try {
    var { store } = req.user;

    store = await Store.findOne({ where: { userId: req.user.id } });
    if (store !== null) {
      return res.status(400).json({ message: "Store already exists" });
    }

    const { name, address, phoneNumber, email, facebook } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: "Name and address are required" });
    }

    await Store.create({
      name,
      address,
      phoneNumber,
      email,
      facebook,
      userId: req.user.id,
    });

    const user = await User.findByPk(req.user.id, {
      include: {
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] },
      },
    });

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    return res.status(201).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required in params" });
    }
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    return res.status(200).json(store);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editStore = async (req, res) => {
  try {
    const { store } = req.user;
    if (store === null) {
      return res.status(404).json({ message: "Store not found" });
    }
    const { name, address, phoneNumber, email, facebook } = req.body;

    const data = { phoneNumber, email, facebook };
    if (name) {
      data.name = name;
    }
    if (address) {
      data.address = address;
    }

    await Store.update(data, { where: { id: store.id } });

    return res.status(200).json({ message: "Store updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createStore, getStoreById, editStore };
