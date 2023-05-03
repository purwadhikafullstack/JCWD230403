const productController = require("./productController");
const userController = require("./userController");
const adminController = require("./adminController");
const categoryController = require("./categoryController");
const cartController = require('./cartController')


module.exports = {
    productController,
    categoryController,
    userController,
    adminController,
    cartController
}