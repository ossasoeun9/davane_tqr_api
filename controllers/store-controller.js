const { Store, User } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const uploadBuffer = require("../core/gcp/upload-buffer.js");

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

    const response = await Store.create({
      name,
      address,
      phoneNumber,
      email,
      facebook,
      userId: req.user.id,
    });

    const { dataValues } = response;
    if (!dataValues) {
      return res.status(500).json({ message: "Failed to create store" });
    }

    const { photo } = req.files;
    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = `stores/${dataValues.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      await Store.update({ photo: path }, { where: { id: dataValues.id } });
    }

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
    const { store } = req.user
    const { name, address, phoneNumber, email, facebook } = req.body;

    const data = { phoneNumber, email, facebook };
    if (name) {
      data.name = name;
    }
    if (address) {
      data.address = address;
    }

    const { photo } = req.files;
    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = `stores/${store.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      if (isUploaded) {
        data.photo = path
      }
    }

    await Store.update(data, { where: { id: store.id } });
    
    req.params.id = store.id
    return await getStoreById(req, res)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createStore, getStoreById, editStore };
