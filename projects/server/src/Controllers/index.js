const productController = require("./productController");
const userController = require("./userController");
const adminController = require("./adminController");
const categoryController = require("./categoryController");
const cartController = require('./cartController')
const discountController = require('./discountController');
const addressController = require('./addressController');
const branchController = require('./branchController');

module.exports = {
    productController,
    categoryController,
    userController,
    adminController,
    cartController,
    discountController,
    addressController,
    branchController
}