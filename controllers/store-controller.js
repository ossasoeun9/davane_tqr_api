import { Certificate, Store, User } from "../models/index.js";
import jsonwebtoken from "jsonwebtoken";
import uploadBuffer from "../core/gcp/upload-buffer.js";

const sign = jsonwebtoken.sign;

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
      if (isUploaded) {
        await Store.update({ photo: path }, { where: { id: dataValues.id } });
      }
    }

    const user = await User.findByPk(req.user.id, {
      include: {
        model: Store,
        as: "store",
        attributes: { exclude: ["userId"] },
      },
    });

    const accessToken = sign(user.toJSON(), process.env.JWT_SECRET, {
      algorithm: "HS256",
    });
    return res.status(201).json({ accessToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStore = async (req, res) => {
  try {
    const id = req.user.store.id;
    const store = await Store.findByPk(id, {
      attributes: { exclude: ["userId"] },
      include: {
        model: Certificate,
        as: "certificates",
        attributes: { exclude: ["userId", "storeId"] },
      },
    });
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
      await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      data.photo = path;
    }

    await Store.update(data, { where: { id: store.id } });

    req.params.id = store.id;
    return await getStore(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createStore, getStore, editStore };
