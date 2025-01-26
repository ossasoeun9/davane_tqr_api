import { Product, Ingredient, Certificate, ProductCertificate, ProductIngredient, QrCode, Category } from "../models/index.js";
import uploadBuffer from "../core/gcp/upload-buffer.js";
import bucket from "../core/gcp/gcp-storage-bucket.js";
import { Op } from "sequelize";

// Get products with pagination and search
const getProducts = async (req, res) => {
  try {
    const storeId = req.user.store.id;
    const { page = 1, limit = 10, search = "" } = req.query; // Default to page 1, limit 10, and empty search
    const offset = (page - 1) * limit;

    const { count, rows: data } = await Product.findAndCountAll({
      offset,
      limit: parseInt(limit),
      where: {
        storeId,
        [Op.or]: [
          { nameEn: { [Op.like]: `%${search}%` } },
          { nameKh: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
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
          "categoryId",
        ],
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["userId", "storeId", "createdAt", "updatedAt"],
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
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get product detail by ID
const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      attributes: { exclude: ["userId", "storeId", "categoryId"] },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["userId", "storeId", "createdAt", "updatedAt"],
          },
        },
        {
          model: Ingredient,
          as: "ingredients",
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
              "ProductHasCertificate",
            ],
          },
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      nameEn,
      nameKh,
      extId,
      categoryId,
      description,
      unit,
      price,
      note,
      ingredients,
      certificates,
    } = req.body;

    const isValid = nameEn && nameKh && categoryId && unit && price;
    if (!isValid) {
      return res.status(400).json({
        message: "NameEn, NameKh, CategoryId, Unit and Price is required",
      });
    }

    const userId = req.user.id;
    const storeId = req.user.store.id;

    const newProduct = await Product.create({
      nameEn,
      nameKh,
      extId,
      categoryId,
      description,
      unit,
      price,
      note,
      storeId,
      userId,
    });

    if (ingredients && ingredients.length > 0) {
      const ingredientPromises = ingredients.map((IngredientId) =>
        ProductIngredient.create({ ProductId: newProduct.id, IngredientId })
      );
      await Promise.all(ingredientPromises);
    }

    if (certificates && certificates.length > 0) {
      const certificatePromises = certificates.map((CertificateId) =>
        ProductCertificate.create({
          ProductId: newProduct.id,
          CertificateId,
        })
      );
      await Promise.all(certificatePromises);
    }

    const { photo: photoFile } = req.files;
    if (photoFile) {
      const ext = photoFile[0].originalname.split(".").pop();
      const path = `products/${newProduct.dataValues.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photoFile[0].buffer,
        photoFile[0].mimetype,
        path
      );
      if (isUploaded) {
        await newProduct.update({ photo: path });
      }
    }

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nameEn,
      nameKh,
      extId,
      categoryId,
      description,
      unit,
      price,
      note,
      ingredients,
      certificates,
    } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.nameEn = nameEn || product.nameEn;
    product.nameKh = nameKh || product.nameKh;
    product.extId = extId;
    product.categoryId = categoryId || product.categoryId;
    product.description = description;
    product.unit = unit || product.unit;
    product.price = price || product.price;
    product.note = note;

    if (ingredients && ingredients.length > 0) {
      await ProductIngredient.destroy({ where: { ProductId: id } });
      const ingredientPromises = ingredients.map((IngredientId) =>
        ProductIngredient.create({ ProductId: id, IngredientId })
      );
      await Promise.all(ingredientPromises);
    } else {
      await ProductIngredient.destroy({ where: { ProductId: id } });
    }

    if (certificates && certificates.length > 0) {
      await ProductCertificate.destroy({ where: { ProductId: id } });
      const certificatePromises = certificates.map((CertificateId) =>
        ProductCertificate.create({ ProductId: id, CertificateId })
      );
      await Promise.all(certificatePromises);
    } else {
      await ProductCertificate.destroy({ where: { ProductId: id } });
    }

    const { photo: photoFile } = req.files;
    if (photoFile) {
      const ext = photoFile[0].originalname.split(".").pop();
      const path = `products/${product.dataValues.id}.${ext}`;
      const isUploaded = await uploadBuffer(
        photoFile[0].buffer,
        photoFile[0].mimetype,
        path
      );
      if (isUploaded) {
        product.photo = path;
      }
    }

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.photo) {
      await bucket.file(product.photo).delete();
    }
    await QrCode.destroy({ where: { productId: id } });
    await ProductCertificate.destroy({ where: { productId: id } });
    await ProductIngredient.destroy({ where: { productId: id } });
    await product.destroy();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProducts,
  getProductDetail,
  createProduct,
  editProduct,
  deleteProduct,
};
