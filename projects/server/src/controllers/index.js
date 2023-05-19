const productController = require('./productController');
const userController = require("./userController");
const adminController = require("./adminController");
const cartController = require('./cartController');
const shippingController = require('./shippingController')


module.exports = {
    productController,
    userController,
    adminController,
    cartController, 
    shippingController
}