const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");


// en la tabla product se estara generando la columna categoryID
Product.belongsTo(Category)
Category.hasMany(Product)

