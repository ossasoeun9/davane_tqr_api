'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { console } = require('inspector');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     console.log(model)
//     db[model.name] = model;
//   });

// console.log(Object.keys(db))

db.User = require('./user.js')(sequelize, Sequelize.DataTypes);
db.Store = require('./store.js')(sequelize, Sequelize.DataTypes);
db.Certificate = require('./certificate.js')(sequelize, Sequelize.DataTypes);
db.Category = require('./category.js')(sequelize, Sequelize.DataTypes);
db.Ingredient = require('./ingredient.js')(sequelize, Sequelize.DataTypes);
db.Product = require('./product.js')(sequelize, Sequelize.DataTypes);
db.QrCode = require('./qrcode.js')(sequelize, Sequelize.DataTypes);
db.Supplier = require('./supplier.js')(sequelize, Sequelize.DataTypes);
db.ProductIngredient = require('./productingredient.js')(sequelize, Sequelize.DataTypes);
db.ProductCertificate = require('./productcertificate.js')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.User.associate(db);
// db.Store.associate(db);
// db.Certificate.associate(db);
// db.Category.associate(db);
// db.Ingredient.associate(db);
// db.Product.associate(db);
// db.QrCode.associate(db);
// db.Supplier.associate(db);
// db.ProductHasIngredient.associate(db);
// db.ProductHasCertificate.associate(db);

module.exports = db;
