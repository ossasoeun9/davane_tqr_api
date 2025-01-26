"use strict";

const Sequelize = require("sequelize");
const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  socketPath: process.env.DB_SOCKET_PATH,
  dialect: process.env.DB_DIALECT,
  logging: process.env.LOGGING,
};
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user.js")(sequelize, Sequelize.DataTypes);
db.Store = require("./store.js")(sequelize, Sequelize.DataTypes);
db.Certificate = require("./certificate.js")(sequelize, Sequelize.DataTypes);
db.Category = require("./category.js")(sequelize, Sequelize.DataTypes);
db.Ingredient = require("./ingredient.js")(sequelize, Sequelize.DataTypes);
db.Product = require("./product.js")(sequelize, Sequelize.DataTypes);
db.QrCode = require("./qrcode.js")(sequelize, Sequelize.DataTypes);
db.Supplier = require("./supplier.js")(sequelize, Sequelize.DataTypes);
db.ProductIngredient = require("./productingredient.js")(
  sequelize,
  Sequelize.DataTypes
);
db.ProductCertificate = require("./productcertificate.js")(
  sequelize,
  Sequelize.DataTypes
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
