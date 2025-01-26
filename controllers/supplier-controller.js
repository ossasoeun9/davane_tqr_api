import { Supplier } from "../models/index.js";
import uploadBuffer from "../core/gcp/upload-buffer.js";
import { Op } from "sequelize";
import bucket from "../core/gcp/gcp-storage-bucket.js";

// Get suppliers by storeId
const getSuppliers = async (req, res) => {
  try {
    const storeId = req.user.store.id;
    const { page = 1, limit = 10, search = "" } = req.query; // Default to page 1 and limit 10
    const offset = (page - 1) * limit;

    const { count, rows: data } = await Supplier.findAndCountAll({
      offset,
      limit: parseInt(limit),
      where: {
        storeId,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { phoneNumber: { [Op.like]: `%${search}%` } },
        ],
      },
      attributes: { exclude: ["userId", "storeId"] },
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      data,
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      itemsPerPage: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new supplier
const createSupplier = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.user.store.id;
    const { name, phoneNumber, type, address, note } = req.body;
    if (!name || !phoneNumber || !address) {
      return res
        .status(400)
        .json({ message: "Name, phone number, address and type are required" });
    }

    const supplier = await Supplier.create({
      name,
      phoneNumber,
      type,
      address,
      note,
      storeId,
      userId,
    });

    const { photo } = req.files;
    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = `suppliers/${supplier.dataValues.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      if (isUploaded) {
        await supplier.update({ photo: path });
      }
    }

    delete supplier.dataValues.userId;
    delete supplier.dataValues.storeId;

    return res.status(201).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing supplier
const editSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, type, address, note } = req.body;
    const supplier = await Supplier.findByPk(id, {
      attributes: { exclude: ["userId", "storeId"] },
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const { photo } = req.files;
    if (photo) {
      const ext = photo[0].originalname.split(".").pop();
      const path = `suppliers/${supplier.dataValues.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photo[0].buffer,
        photo[0].mimetype,
        path
      );
      if (isUploaded) {
        supplier.photo = path;
      }
    }

    supplier.name = name || supplier.name;
    supplier.phoneNumber = phoneNumber || supplier.phoneNumber;
    supplier.type = type || supplier.type;
    supplier.address = address || supplier.address;
    supplier.note = note;
    await supplier.save();
    return res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    if (supplier.photo) {
      await bucket.file(supplier.photo).delete();
    }
    await supplier.destroy();
    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getSuppliers,
  createSupplier,
  editSupplier,
  deleteSupplier,
};
