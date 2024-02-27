const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");


// en la tabla product se estara generando la columna categoryID
Product.belongsTo(Category)
Category.hasMany(Product)


//Cart tendra una fk de use
Cart.belongsTo(User)
User.hasMany(Cart)


//Cart tendra una fk de product
Cart.belongsTo(Product)
Product.hasMany(Cart)


//Purchase tendra una fk de user
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase tendra una fk de product
Purchase.belongsTo(Product)
Product.hasMany(Purchase)


//ProductImg - tendra una fk  de product
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)