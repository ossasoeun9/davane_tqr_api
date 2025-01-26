"use strict";
import { Connector } from "@google-cloud/cloud-sql-connector";
import Sequelize, { DataTypes } from "@sequelize/core";
import user from "./user.js";
import store from "./store.js";
import certificate from "./certificate.js";
import category from "./category.js";
import ingredient from "./ingredient.js";
import product from "./product.js";
import qrCode from "./qrcode.js";
import supplier from "./supplier.js";
import productIngredient from "./productingredient.js";
import productCertificate from "./productcertificate.js";
import { MySqlDialect } from "@sequelize/mysql";

const connector = new Connector();
const clientOpts = await connector.getOptions({
  instanceConnectionName: process.env.DB_INSTANCE_CONNECTION_NAME,
  ipType: "PUBLIC",
});

const sequelize = new Sequelize({
  ...clientOpts,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  dialect: MySqlDialect,
  logging: process.env.DB_LOGGING === "true",
});

const User = user(sequelize, DataTypes);
const Store = store(sequelize, DataTypes);
const Certificate = certificate(sequelize, DataTypes);
const Category = category(sequelize, DataTypes);
const Ingredient = ingredient(sequelize, DataTypes);
const Product = product(sequelize, DataTypes);
const QrCode = qrCode(sequelize, DataTypes);
const Supplier = supplier(sequelize, DataTypes);
const ProductIngredient = productIngredient(sequelize, DataTypes);
const ProductCertificate = productCertificate(sequelize, DataTypes);

User.associate();
Store.associate();
Certificate.associate();
Category.associate();
Ingredient.associate();
Product.associate();
QrCode.associate();
Supplier.associate();
ProductIngredient.associate();
ProductCertificate.associate();

export {
  User,
  Store,
  Certificate,
  Category,
  Ingredient,
  Product,
  QrCode,
  Supplier,
  ProductIngredient,
  ProductCertificate,
};
