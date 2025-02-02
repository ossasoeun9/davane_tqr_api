import { QrCode, Product, Supplier, Category, Certificate, Ingredient } from "../models/index.js";
import { Op } from "@sequelize/core";

const getQrCodes = async (req, res) => {
  try {
    const storeId = req.user.store.id;
    const { page = 1, limit = 10, search = "" } = req.query; // Default to page 1, limit 10, and empty search
    const offset = (page - 1) * limit;

    const { count, rows: data } = await QrCode.findAndCountAll({
      offset,
      limit: parseInt(limit),
      where: { storeId },
      attributes: {
        exclude: [
          "userId",
          "storeId",
          "createdAt",
          "updatedAt",
          "productId",
          "supplierId",
          "note",
        ],
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Product,
          as: "product",
          where: {
            [Op.or]: [
              { nameEn: { [Op.like]: `%${search}%` } },
              { nameKh: { [Op.like]: `%${search}%` } },
            ],
          },
          attributes: {
            exclude: [
              "userId",
              "storeId",
              "createdAt",
              "updatedAt",
              "description",
              "note",
              "ingredientsNote",
              "categoryId",
            ],
          },
          include: {
            model: Category,
            attributes: {
              exclude: [
                "userId",
                "storeId",
                "createdAt",
                "updatedAt",
              ],
            },
          }
        },
        {
          model: Supplier,
          as: "supplier",
          where: { name: { [Op.like]: `%${search}%` } },
          attributes: {
            exclude: [
              "userId",
              "storeId",
              "createdAt",
              "updatedAt",
              "address",
              "categoryId",
              "note",
            ],
          },
        },
      ],
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
    res.status(500).json({ error: error.message });
  }
};

const getQrCodeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const qrCode = await QrCode.findByPk(id, {
      attributes: {
        exclude: [
          "userId",
          "storeId",
          "createdAt",
          "updatedAt",
          "productId",
          "supplierId",
        ],
      },
      include: [
        {
          model: Product,
          as: "product",
          attributes: { exclude: ["userId", "storeId", "categoryId"] },
          include: [
            {
              model: Category,
              as: "category",
              attributes: {
                exclude: ["userId", "storeId", "createdAt", "updatedAt"],
              },
            },
            // {
            //   model: Ingredient,
            //   as: "ingredients",
            //   through: { attributes: [] },
            //   attributes: {
            //     exclude: [
            //       "userId",
            //       "storeId",
            //       "createdAt",
            //       "updatedAt",
            //       "ProductHasIngredient",
            //     ],
            //   },
            // },
            {
              model: Certificate,
              as: "certificates",
              through: { attributes: [] },
              attributes: {
                exclude: [
                  "userId",
                  "storeId",
                  "createdAt",
                  "updatedAt",
                ],
              },
            },
          ],
        },
        {
          model: Supplier,
          as: "supplier",
          attributes: { exclude: ["userId", "storeId"] },
        },
      ],
    });
    if (qrCode) {
      res.status(200).json(qrCode);
    } else {
      res.status(404).json({ error: "QrCode not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQrCode = async (req, res) => {
  try {
    const { createDate, expireDate, supplierId, productId, note } = req.body;

    const isValid = createDate && expireDate && supplierId && productId;

    if (!isValid) {
      return res.status(400).json({
        message: "Create date, expire date, product and supplier are required",
      });
    }

    const userId = req.user.id;
    const storeId = req.user.store.id;

    const newQrCode = await QrCode.create({
      createDate,
      expireDate,
      supplierId,
      productId,
      note,
      userId,
      storeId,
    });

    res.status(201).json(newQrCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editQrCodeNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const [updated] = await QrCode.update({ note }, { where: { id } });
    if (updated) {
      const updatedQrCode = await QrCode.findByPk(id);
      res.status(200).json(updatedQrCode);
    } else {
      res.status(404).json({ error: "QrCode not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await QrCode.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({message: "Deleted"});
    } else {
      res.status(404).json({ error: "QrCode not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getQrCodes,
  getQrCodeDetail,
  createQrCode,
  editQrCodeNote,
  deleteQrCode,
};
